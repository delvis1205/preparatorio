import { eq } from "drizzle-orm";
import { parse as parseCookie } from "cookie";
import { SignJWT, jwtVerify } from "jose";
import type { Request } from "express";
import type { User } from "../drizzle/schema";
import { users } from "../drizzle/schema";
import { getDb } from "./db";
import { ENV } from "./_core/env";

export const LOCAL_SESSION_COOKIE = "luanda_prep_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 14;

function sessionKey() {
  if (!ENV.cookieSecret) throw new Error("JWT_SECRET não está configurado.");
  return new TextEncoder().encode(ENV.cookieSecret);
}

export async function createLocalSessionToken(userId: number) {
  const now = Date.now();
  return new SignJWT({ type: "local" })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(String(userId))
    .setIssuedAt(Math.floor(now / 1000))
    .setExpirationTime(Math.floor((now + SESSION_DURATION_MS) / 1000))
    .sign(sessionKey());
}

export async function getLocalUserFromRequest(req: Request): Promise<User | null> {
  const token = parseCookie(req.headers.cookie ?? "")[LOCAL_SESSION_COOKIE];
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, sessionKey(), { algorithms: ["HS256"] });
    if (payload.type !== "local" || typeof payload.sub !== "string" || !/^\d+$/.test(payload.sub)) return null;
    const db = await getDb();
    if (!db) return null;
    const result = await db.select().from(users).where(eq(users.id, Number(payload.sub))).limit(1);
    return result[0] ?? null;
  } catch {
    return null;
  }
}

export const LOCAL_SESSION_MAX_AGE_MS = SESSION_DURATION_MS;
