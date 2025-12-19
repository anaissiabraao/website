import express from "express";
import nodemailer from "nodemailer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, "..", "dist");
const indexHtml = path.join(distDir, "index.html");

const requiredEnv = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "PROPOSAL_TO",
  "PROPOSAL_FROM",
];

const hasEnv = () => requiredEnv.every((key) => !!process.env[key]);

const app = express();
app.disable("x-powered-by");

app.use(express.json({ limit: "2mb" }));

app.post("/api/send-proposal", async (req, res) => {
  if (!hasEnv()) {
    return res.status(500).json({ error: "Email not configured (env missing)" });
  }

  const data = req.body || {};
  const requiredFields = ["name", "email", "phone", "projectTitle", "projectDescription"];
  const missing = requiredFields.filter((k) => !data[k]);
  if (missing.length) {
    return res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });
  }

  try {
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
      Array.isArray(data.selectedServicesDetail) && data.selectedServicesDetail.length
        ? data.selectedServicesDetail.map((s) => `- ${s}`).join("\n")
        : Array.isArray(data.selectedServices) && data.selectedServices.length
          ? data.selectedServices.map((s) => `- ${s}`).join("\n")
          : "Nenhum serviço selecionado";

    const html = `
      <h2>Nova solicitação de proposta</h2>
      <p><strong>Nome:</strong> ${data.name}</p>
      <p><strong>Empresa:</strong> ${data.company || "Não informado"}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Telefone:</strong> ${data.phone}</p>
      <p><strong>Título do projeto:</strong> ${data.projectTitle}</p>
      <p><strong>Descrição:</strong><br/>${String(data.projectDescription).replace(/\n/g, "<br/>")}</p>
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
  } catch (err) {
    console.error("send-proposal error:", err);
    return res.status(500).json({ error: "Erro ao enviar proposta" });
  }
});

// Robust video streaming for Railway/proxies (explicit Range support).
// This avoids issues where some platforms/proxies mishandle Range for large MP4s (e.g., moov atom at the end).
app.get("/videos/:file", (req, res) => {
  try {
    const file = String(req.params.file || "");
    // Basic safety: only allow simple file names.
    if (!/^[a-zA-Z0-9._-]+$/.test(file)) {
      return res.status(400).send("Invalid file");
    }

    const videoPath = path.join(distDir, "videos", file);
    if (!fs.existsSync(videoPath)) {
      return res.status(404).send("Not found");
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    const ext = path.extname(videoPath).toLowerCase();
    const contentType =
      ext === ".mp4"
        ? "video/mp4"
        : ext === ".webm"
          ? "video/webm"
          : ext === ".ogv"
            ? "video/ogg"
            : "application/octet-stream";

    res.setHeader("Content-Type", contentType);
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

    const range = req.headers.range;
    if (req.method === "HEAD") {
      res.setHeader("Content-Length", String(fileSize));
      return res.status(200).end();
    }

    if (!range) {
      res.setHeader("Content-Length", String(fileSize));
      return fs.createReadStream(videoPath).pipe(res);
    }

    // Parse Range: bytes=start-end
    const match = /^bytes=(\d+)-(\d*)$/.exec(range);
    if (!match) {
      return res.status(416).end();
    }

    const start = Number(match[1]);
    const end = match[2] ? Math.min(Number(match[2]), fileSize - 1) : fileSize - 1;

    if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= fileSize) {
      res.setHeader("Content-Range", `bytes */${fileSize}`);
      return res.status(416).end();
    }

    const chunkSize = end - start + 1;
    res.status(206);
    res.setHeader("Content-Range", `bytes ${start}-${end}/${fileSize}`);
    res.setHeader("Content-Length", String(chunkSize));

    return fs.createReadStream(videoPath, { start, end }).pipe(res);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("video stream error:", e);
    return res.status(500).end();
  }
});

// Static assets + SPA fallback
app.use(
  express.static(distDir, {
    setHeaders: (res, filePath) => {
      // Ensure correct playback/streaming for video assets on Railway/proxies.
      if (filePath.endsWith(".mp4")) {
        res.setHeader("Content-Type", "video/mp4");
        res.setHeader("Accept-Ranges", "bytes");
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (filePath.endsWith(".webm")) {
        res.setHeader("Content-Type", "video/webm");
        res.setHeader("Accept-Ranges", "bytes");
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (filePath.endsWith(".ogv")) {
        res.setHeader("Content-Type", "video/ogg");
        res.setHeader("Accept-Ranges", "bytes");
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (filePath.endsWith("index.html")) {
        // Avoid caching HTML aggressively in SPA deploys.
        res.setHeader("Cache-Control", "no-cache");
      }
    },
  }),
);
app.get("*", (_req, res) => res.sendFile(indexHtml));

const port = Number(process.env.PORT || 10000);
app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${port}`);
});


