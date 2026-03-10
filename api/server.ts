import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import nodemailer from "nodemailer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Stripe from "stripe";
import { z } from "zod";
import { prisma } from "./lib/prisma.js";
import { requireAdmin, type AuthenticatedRequest } from "../middleware/auth.js";
import { comparePassword, getCookieName, signToken, verifyToken } from "../utils/auth.js";

const app = express();
const port = Number(process.env.PORT ?? 3001);
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:8080";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "..", "..", "dist");
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

app.use(
  cors({
    origin: [frontendUrl, "https://anaissids.com.br", "https://www.anaissids.com.br"],
    credentials: true,
  }),
);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://challenges.cloudflare.com", "https://static.cloudflareinsights.com"],
        scriptSrcAttr: ["'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://challenges.cloudflare.com"],
        fontSrc: ["'self'", "data:"],
        frameSrc: ["'self'", "https://challenges.cloudflare.com"],
      },
    },
  }),
);
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/stripe-webhook", express.raw({ type: "application/json" }), async (req, res) => {
  if (!stripe || !stripeWebhookSecret) {
    res.status(500).json({ error: "Stripe não configurado." });
    return;
  }
  const signature = req.headers["stripe-signature"];
  if (!signature || Array.isArray(signature)) {
    res.status(400).json({ error: "Assinatura inválida." });
    return;
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, stripeWebhookSecret);
  } catch {
    res.status(400).json({ error: "Webhook inválido." });
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const quoteId = session.metadata?.quoteId;
    if (quoteId) {
      await prisma.$transaction([
        prisma.payment.upsert({
          where: { stripeId: session.id },
          update: {
            status: "paid",
            amount: (session.amount_total ?? 0) / 100,
          },
          create: {
            quoteId,
            stripeId: session.id,
            amount: (session.amount_total ?? 0) / 100,
            status: "paid",
          },
        }),
        prisma.quote.update({ where: { id: quoteId }, data: { status: "pago" } }),
        prisma.conversion.create({ data: { stage: "pagamento", refId: quoteId, amount: (session.amount_total ?? 0) / 100 } }),
      ]);
    }
  }

  if (event.type === "checkout.session.async_payment_failed" || event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    await prisma.payment.updateMany({
      where: { stripeId: session.id },
      data: { status: "failed" },
    });
  }

  res.json({ received: true });
});

app.use(express.json({ limit: "1mb" }));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitas tentativas de login. Tente novamente em 15 minutos." },
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  turnstileToken: z.string().optional(),
});

const serviceSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  price: z.number().positive(),
});

const clientSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  origin: z.string().optional().nullable(),
});

const quoteSchema = z.object({
  clientId: z.string().uuid(),
  status: z.enum(["rascunho", "enviado", "aprovado", "pago", "cancelado"]),
  items: z.array(
    z.object({
      serviceId: z.string().uuid(),
      price: z.number().positive(),
    }),
  ).min(1),
});

const siteVisitSchema = z.object({
  ip: z.string().default("unknown"),
  userAgent: z.string().default("unknown"),
  page: z.string().min(1),
  referrer: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
});

const pageViewSchema = z.object({
  siteVisitId: z.string().uuid().optional().nullable(),
  page: z.string().min(1),
  durationMs: z.number().int().nonnegative().optional().nullable(),
  referrer: z.string().optional().nullable(),
});

const eventSchema = z.object({
  siteVisitId: z.string().uuid().optional().nullable(),
  name: z.string().min(1),
  page: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
});

const heatmapSchema = z.object({
  siteVisitId: z.string().uuid().optional().nullable(),
  page: z.string().min(1),
  x: z.number(),
  y: z.number(),
});

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  company: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  turnstileToken: z.string().optional(),
});

function getReqIp(req: Request) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.ip ?? "unknown";
}

async function logAction(action: string, userId?: string, metadata?: Record<string, unknown>) {
  await prisma.activityLog.create({
    data: {
      action,
      userId,
      metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined,
    },
  });
}

async function verifyTurnstileToken(token: string | undefined, ip: string) {
  if (!turnstileSecret) return true;
  if (!token) return false;

  const form = new URLSearchParams();
  form.set("secret", turnstileSecret);
  form.set("response", token);
  form.set("remoteip", ip);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });

  if (!response.ok) return false;
  const data = (await response.json()) as { success?: boolean };
  return data.success === true;
}

async function ensureAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!email || !hash) return;

  const found = await prisma.user.findUnique({ where: { email } });
  if (!found) {
    await prisma.user.create({
      data: { email, password: hash, role: "admin" },
    });
  }
}

async function ensureDefaultServices() {
  const count = await prisma.service.count();
  if (count > 0) return;

  await prisma.service.createMany({
    data: [
      { name: "Automação de Processos com RPA", category: "Automação", price: 12000 },
      { name: "Integração de Sistemas", category: "Dados", price: 9000 },
      { name: "Dashboards Estratégicos", category: "Analytics", price: 7500 },
      { name: "Modelos de IA Aplicada", category: "IA", price: 15000 },
      { name: "Consultoria de Eficiência Operacional", category: "Consultoria", price: 5500 },
    ],
  });
}

app.post("/api/auth/login", loginLimiter, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Payload inválido." });
    return;
  }

  if (parsed.data.turnstileToken) {
    const human = await verifyTurnstileToken(parsed.data.turnstileToken, getReqIp(req));
    if (!human) {
      res.status(403).json({ error: "Validação humana falhou." });
      return;
    }
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || user.role !== "admin") {
    res.status(401).json({ error: "Credenciais inválidas." });
    return;
  }

  const valid = await comparePassword(parsed.data.password, user.password);
  if (!valid) {
    res.status(401).json({ error: "Credenciais inválidas." });
    return;
  }

  const token = signToken({ userId: user.id, role: user.role, email: user.email });
  res.cookie(getCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 12 * 60 * 60 * 1000,
  });
  await logAction("LOGIN_ADMIN", user.id, { email: user.email });
  res.json({ user: { userId: user.id, role: user.role, email: user.email } });
});

app.post("/api/auth/logout", requireAdmin, async (req: AuthenticatedRequest, res) => {
  res.clearCookie(getCookieName());
  await logAction("LOGOUT_ADMIN", req.user?.userId);
  res.json({ ok: true });
});

app.get("/api/auth/me", (req, res) => {
  try {
    const token = req.cookies?.[getCookieName()];
    if (!token) {
      res.status(401).json({ error: "Não autenticado." });
      return;
    }
    const user = verifyToken(token);
    res.json({ user });
  } catch {
    res.status(401).json({ error: "Não autenticado." });
  }
});

app.post("/api/analytics/site-visit", async (req, res) => {
  const parsed = siteVisitSchema.safeParse({
    ...req.body,
    ip: req.body?.ip ?? getReqIp(req),
    userAgent: req.body?.userAgent ?? req.get("user-agent") ?? "unknown",
  });
  if (!parsed.success) {
    res.status(400).json({ error: "Payload inválido." });
    return;
  }

  const visit = await prisma.siteVisit.create({ data: parsed.data });
  await prisma.conversion.create({ data: { stage: "visitante", refId: visit.id } });
  res.status(201).json({ siteVisitId: visit.id });
});

app.post("/api/analytics/page-view", async (req, res) => {
  const parsed = pageViewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Payload inválido." });
    return;
  }
  const pageView = await prisma.pageView.create({ data: parsed.data });
  res.status(201).json(pageView);
});

app.post("/api/analytics/event", async (req, res) => {
  const parsed = eventSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Payload inválido." });
    return;
  }
  const event = await prisma.event.create({
    data: {
      ...parsed.data,
      metadata: parsed.data.metadata ? JSON.parse(JSON.stringify(parsed.data.metadata)) : undefined,
    },
  });
  res.status(201).json(event);
});

app.post("/api/analytics/heatmap-click", async (req, res) => {
  const parsed = heatmapSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Payload inválido." });
    return;
  }
  const click = await prisma.heatmapClick.create({ data: parsed.data });
  res.status(201).json(click);
});

app.get("/api/analytics/heatmap", requireAdmin, async (req, res) => {
  const page = String(req.query.page ?? "/");
  const clicks = await prisma.heatmapClick.findMany({
    where: { page },
    orderBy: { createdAt: "desc" },
    take: 2000,
  });
  res.json(clicks);
});

app.post("/api/leads", async (req, res) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Payload inválido." });
    return;
  }

  const human = await verifyTurnstileToken(parsed.data.turnstileToken, getReqIp(req));
  if (!human) {
    res.status(403).json({ error: "Validação humana falhou." });
    return;
  }

  const existingClient = await prisma.client.findFirst({
    where: {
      OR: [{ email: parsed.data.email }, { phone: parsed.data.phone }],
    },
  });

  const client =
    existingClient ??
    (await prisma.client.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        company: parsed.data.company ?? undefined,
        origin: parsed.data.source ?? "form-site",
      },
    }));

  const lead = await prisma.lead.create({
    data: {
      ...parsed.data,
      clientId: client.id,
    },
  });

  await prisma.conversion.create({ data: { stage: "lead", refId: lead.id } });
  await logAction("LEAD_CREATED", undefined, { leadId: lead.id, email: lead.email });

  const transporterConfigured =
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.PROPOSAL_FROM;

  if (transporterConfigured) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const logoUrl = `${frontendUrl.replace(/\/$/, "")}/favicon.png`;
    await transporter.sendMail({
      from: process.env.PROPOSAL_FROM,
      to: lead.email,
      subject: "Recebemos seu contato - Anaissi Data Strategy",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <img src="${logoUrl}" alt="Anaissi DS" width="64" height="64" />
          <p>Olá ${lead.name},</p>
          <p>Recebemos seu contato.</p>
          <p>Em breve nossa equipe da Anaissi Data Strategy entrará em contato.</p>
          <p>Atenciosamente<br/>Anaissi DS</p>
        </div>
      `,
    });
  }

  res.status(201).json({ leadId: lead.id, clientId: client.id });
});

app.get("/api/leads", requireAdmin, async (_req, res) => {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { client: true },
  });
  res.json(leads);
});

app.get("/api/clients", requireAdmin, async (_req, res) => {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      quotes: true,
      leads: true,
    },
  });
  res.json(clients);
});

app.post("/api/clients", requireAdmin, async (req: AuthenticatedRequest, res) => {
  const parsed = clientSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Payload inválido." });
    return;
  }
  const client = await prisma.client.create({ data: parsed.data });
  await prisma.conversion.create({ data: { stage: "cliente", refId: client.id } });
  await logAction("CLIENT_CREATED", req.user?.userId, { clientId: client.id });
  res.status(201).json(client);
});

app.put("/api/clients/:id", requireAdmin, async (req: AuthenticatedRequest, res) => {
  const parsed = clientSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Payload inválido." });
    return;
  }
  const client = await prisma.client.update({
    where: { id: String(req.params.id) },
    data: parsed.data,
  });
  await logAction("CLIENT_UPDATED", req.user?.userId, { clientId: client.id });
  res.json(client);
});

app.get("/api/services", requireAdmin, async (_req, res) => {
  const services = await prisma.service.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });
  res.json(services);
});

app.post("/api/services", requireAdmin, async (req: AuthenticatedRequest, res) => {
  const parsed = serviceSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Payload inválido." });
    return;
  }
  const service = await prisma.service.create({ data: parsed.data });
  await logAction("SERVICE_CREATED", req.user?.userId, { serviceId: service.id });
  res.status(201).json(service);
});

app.post("/api/quotes", requireAdmin, async (req: AuthenticatedRequest, res) => {
  const parsed = quoteSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Payload inválido." });
    return;
  }

  const total = parsed.data.items.reduce((sum, item) => sum + item.price, 0);
  const quote = await prisma.quote.create({
    data: {
      clientId: parsed.data.clientId,
      status: parsed.data.status,
      total,
      quoteService: {
        create: parsed.data.items,
      },
    },
    include: {
      client: true,
      quoteService: { include: { service: true } },
      payments: true,
    },
  });

  await logAction("QUOTE_CREATED", req.user?.userId, { quoteId: quote.id, total });
  res.status(201).json(quote);
});

app.get("/api/quotes", requireAdmin, async (_req, res) => {
  const quotes = await prisma.quote.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      client: true,
      quoteService: { include: { service: true } },
      payments: true,
    },
  });
  res.json(quotes);
});

app.post("/api/create-checkout", requireAdmin, async (req: AuthenticatedRequest, res) => {
  if (!stripe) {
    res.status(500).json({ error: "Stripe não configurado." });
    return;
  }
  const parsed = z.object({ quoteId: z.string().uuid() }).safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "quoteId inválido." });
    return;
  }

  const quote = await prisma.quote.findUnique({
    where: { id: parsed.data.quoteId },
    include: { client: true },
  });
  if (!quote) {
    res.status(404).json({ error: "Orçamento não encontrado." });
    return;
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: `Orçamento ${quote.id.slice(0, 8)} - ${quote.client.name}`,
          },
          unit_amount: Math.round(quote.total * 100),
        },
        quantity: 1,
      },
    ],
    metadata: { quoteId: quote.id },
    success_url: `${frontendUrl}/admin/dashboard?checkout=success`,
    cancel_url: `${frontendUrl}/admin/dashboard?checkout=cancel`,
  });

  await prisma.payment.upsert({
    where: { stripeId: session.id },
    update: { status: "pending", amount: quote.total, quoteId: quote.id },
    create: { stripeId: session.id, status: "pending", amount: quote.total, quoteId: quote.id },
  });
  await logAction("PAYMENT_LINK_CREATED", req.user?.userId, { quoteId: quote.id, stripeId: session.id });
  res.status(201).json({ checkoutUrl: session.url, sessionId: session.id });
});

app.get("/api/payments", requireAdmin, async (_req, res) => {
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: { quote: { include: { client: true } } },
  });
  res.json(payments);
});

app.get("/api/admin/dashboard", requireAdmin, async (_req, res) => {
  const [visitors, leads, clients, revenueAgg, proposals, payments, visitsByDay, monthlyRevenue] =
    await Promise.all([
      prisma.siteVisit.count(),
      prisma.lead.count(),
      prisma.client.count(),
      prisma.payment.aggregate({ where: { status: "paid" }, _sum: { amount: true } }),
      prisma.quote.count({ where: { status: { not: "rascunho" } } }),
      prisma.payment.count({ where: { status: "paid" } }),
      prisma.$queryRaw<Array<{ day: Date; total: bigint }>>`
        SELECT date_trunc('day', "createdAt") AS day, COUNT(*)::bigint AS total
        FROM "SiteVisit"
        GROUP BY 1
        ORDER BY 1 ASC
      `,
      prisma.$queryRaw<Array<{ month: Date; total: number }>>`
        SELECT date_trunc('month', "createdAt") AS month, COALESCE(SUM("amount"), 0)::float AS total
        FROM "Payment"
        WHERE "status" = 'paid'
        GROUP BY 1
        ORDER BY 1 ASC
      `,
    ]);

  const conversionRate = visitors > 0 ? Number(((leads / visitors) * 100).toFixed(2)) : 0;

  res.json({
    cards: {
      visitors,
      leads,
      clients,
      proposals,
      payments,
      revenue: revenueAgg._sum.amount ?? 0,
      conversionRate,
    },
    visitsByDay: visitsByDay.map((item) => ({
      day: item.day.toISOString().slice(0, 10),
      total: Number(item.total),
    })),
    monthlyRevenue: monthlyRevenue.map((item) => ({
      month: item.month.toISOString().slice(0, 7),
      total: Number(item.total),
    })),
    funnel: {
      visitante: visitors,
      lead: leads,
      cliente: clients,
      pagamento: payments,
    },
  });
});

app.get("/api/activity-logs", requireAdmin, async (_req, res) => {
  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { user: true },
  });
  res.json(logs);
});

app.use(express.static(distDir));
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.use((err: unknown, _req: Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Erro interno." });
});

async function bootstrap() {
  await ensureAdmin();
  await ensureDefaultServices();
  app.listen(port, () => {
    console.log(`API iniciada em http://0.0.0.0:${port}`);
  });
}

bootstrap().catch((err) => {
  console.error("Falha ao iniciar:", err);
  process.exit(1);
});
