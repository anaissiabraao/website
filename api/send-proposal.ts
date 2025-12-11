import nodemailer from "nodemailer";

interface ProposalPayload {
  name: string;
  company?: string;
  email: string;
  phone: string;
  projectTitle: string;
  projectDescription: string;
  selectedServices: string[];
}

const requiredEnv = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "PROPOSAL_TO",
  "PROPOSAL_FROM",
];

const hasEnv = () => requiredEnv.every((key) => !!process.env[key]);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!hasEnv()) {
    return res.status(500).json({ error: "Email not configured (env missing)" });
  }

  try {
    const data = req.body as ProposalPayload;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const servicesList =
      data.selectedServices?.length > 0
        ? data.selectedServices.map((s) => `- ${s}`).join("\n")
        : "Nenhum serviço selecionado";

    const html = `
      <h2>Nova solicitação de proposta</h2>
      <p><strong>Nome:</strong> ${data.name}</p>
      <p><strong>Empresa:</strong> ${data.company || "Não informado"}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Telefone:</strong> ${data.phone}</p>
      <p><strong>Título do projeto:</strong> ${data.projectTitle}</p>
      <p><strong>Descrição:</strong><br/>${data.projectDescription}</p>
      <p><strong>Serviços selecionados:</strong><br/>${servicesList.replace(/\n/g, "<br/>")}</p>
    `;

    await transporter.sendMail({
      from: process.env.PROPOSAL_FROM,
      to: process.env.PROPOSAL_TO,
      subject: `[Proposta] ${data.projectTitle || "Nova solicitação"}`,
      html,
      replyTo: data.email,
    });

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error("send-proposal error:", error);
    return res.status(500).json({ error: "Erro ao enviar proposta" });
  }
}
