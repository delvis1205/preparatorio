import { jwtVerify, SignJWT } from "jose";
import type { Request } from "express";
import { parse as parseCookieHeader } from "cookie";
import * as db from "../db";
import { ENV } from "./env";

export const LOCAL_SESSION_COOKIE = "luanda_prep_session";
const encoder = new TextEncoder();

function secret() {
  if (!ENV.localSessionSecret || ENV.localSessionSecret.length < 32) {
    throw new Error("LOCAL_SESSION_SECRET não está configurado com segurança.");
  }
  return encoder.encode(ENV.localSessionSecret);
}

export async function createLocalSession(userId: number) {
  return new SignJWT({ auth: "local" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(secret());
}

export async function getLocalSessionUser(req: Request) {
  const token = parseCookieHeader(req.headers.cookie ?? "")[LOCAL_SESSION_COOKIE];
  if (!token) return null;
  try {
    const verified = await jwtVerify(token, secret());
    if (verified.payload.auth !== "local" || !verified.payload.sub) return null;
    return (await db.getUserById(Number(verified.payload.sub))) ?? null;
  } catch {
    return null;
  }
}
