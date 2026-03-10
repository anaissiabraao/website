import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const COOKIE_NAME = "admin_token";

export interface TokenPayload {
  userId: string;
  role: string;
  email: string;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: TokenPayload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET ausente.");
  return jwt.sign(payload, secret, { expiresIn: "12h" });
}

export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET ausente.");
  return jwt.verify(token, secret) as TokenPayload;
}

export function getCookieName() {
  return COOKIE_NAME;
}
