import { NextFunction, Request, Response } from "express";
import { getCookieName, verifyToken } from "../utils/auth.js";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: string;
    email: string;
  };
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.[getCookieName()];
  if (!token) {
    res.status(401).json({ error: "Não autenticado." });
    return;
  }

  try {
    const decoded = verifyToken(token);
    if (decoded.role !== "admin") {
      res.status(403).json({ error: "Acesso negado." });
      return;
    }
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido." });
  }
}
