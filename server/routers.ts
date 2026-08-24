import { COOKIE_NAME } from "@shared/const";
import { and, eq, isNull, ne } from "drizzle-orm";
import { randomBytes, createHash } from "node:crypto";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { aiRouter } from "./routers/ai";
import { learningRouter } from "./routers/learning";
import { passwordResetTokens, users } from "../drizzle/schema";
import { getDb } from "./db";
import { LOCAL_SESSION_COOKIE, LOCAL_SESSION_MAX_AGE_MS, createLocalSessionToken } from "./localAuth";
import { sendPasswordResetEmail } from "./email";
import { z } from "zod";

const passwordSchema = z.string().min(8, "Use pelo menos 8 caracteres.").max(128);
const phoneSchema = z.string().trim().min(7).max(32).optional().transform((value) => value ? value.replace(/[\s()\-]/g, "") : undefined);
const normalizeEmail = (email: string) => email.trim().toLowerCase();
const tokenHash = (token: string) => createHash("sha256").update(token).digest("hex");

function safeUser(user: typeof users.$inferSelect) {
  const { passwordHash: _passwordHash, openId: _openId, ...publicUser } = user;
  return publicUser;
}

function getRequestOrigin(req: { protocol?: string; headers: Record<string, unknown>; get?: (header: string) => string | undefined }) {
  const forwardedProto = typeof req.headers["x-forwarded-proto"] === "string" ? req.headers["x-forwarded-proto"].split(",")[0] : undefined;
  const forwardedHost = typeof req.headers["x-forwarded-host"] === "string" ? req.headers["x-forwarded-host"].split(",")[0] : undefined;
  const host = forwardedHost || req.get?.("host") || (typeof req.headers.host === "string" ? req.headers.host : undefined);
  const protocol = forwardedProto || req.protocol || "https";
  if (!host) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Não foi possível criar o link de recuperação." });
  return `${protocol}://${host}`;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(({ ctx }) => {
      if (!ctx.user) return null;
      return safeUser(ctx.user);
    }),
    register: publicProcedure.input(z.object({ name: z.string().trim().min(2).max(80), email: z.string().email(), phone: phoneSchema, password: passwordSchema })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      const email = normalizeEmail(input.email);
      const existing = await db.select().from(users).where(and(eq(users.email, email), isNull(users.passwordHash))).limit(1);
      if (existing[0]) throw new TRPCError({ code: "CONFLICT", message: "Esta conta já existe. Use “Esqueci a palavra-passe” para definir o seu acesso local." });
      const existingEmail = await db.select().from(users).where(eq(users.email, email)).limit(1);
      const existingPhone = input.phone ? await db.select().from(users).where(eq(users.phone, input.phone)).limit(1) : [];
      if (existingEmail[0] || existingPhone[0]) throw new TRPCError({ code: "CONFLICT", message: "Já existe uma conta com este e-mail ou telefone." });
      const passwordHash = await bcrypt.hash(input.password, 12);
      const result = await db.insert(users).values({ name: input.name, email, phone: input.phone ?? null, passwordHash, loginMethod: "local", role: "user", lastSignedIn: new Date() });
      const userId = Number((result as unknown as [{ insertId: number }])[0].insertId);
      const token = await createLocalSessionToken(userId);
      ctx.res.cookie(LOCAL_SESSION_COOKIE, token, { ...getSessionCookieOptions(ctx.req), maxAge: LOCAL_SESSION_MAX_AGE_MS });
      const created = await db.select().from(users).where(eq(users.id, userId)).limit(1);
      return safeUser(created[0]!);
    }),
    login: publicProcedure.input(z.object({ identifier: z.string().trim().min(3).max(320), password: passwordSchema })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      const identifier = input.identifier.includes("@") ? normalizeEmail(input.identifier) : input.identifier.replace(/[\s()\-]/g, "");
      const found = input.identifier.includes("@") ? await db.select().from(users).where(eq(users.email, identifier)).limit(1) : await db.select().from(users).where(eq(users.phone, identifier)).limit(1);
      const user = found[0];
      if (!user?.passwordHash || !(await bcrypt.compare(input.password, user.passwordHash))) throw new TRPCError({ code: "UNAUTHORIZED", message: "E-mail ou telefone e palavra-passe não correspondem." });
      await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, user.id));
      const token = await createLocalSessionToken(user.id);
      ctx.res.cookie(LOCAL_SESSION_COOKIE, token, { ...getSessionCookieOptions(ctx.req), maxAge: LOCAL_SESSION_MAX_AGE_MS });
      return safeUser(user);
    }),
    requestPasswordReset: publicProcedure.input(z.object({ email: z.string().email() })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      const email = normalizeEmail(input.email);
      const found = await db.select().from(users).where(eq(users.email, email)).limit(1);
      const user = found[0];
      if (user) {
        const rawToken = randomBytes(32).toString("base64url");
        const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
        await db.delete(passwordResetTokens).where(and(eq(passwordResetTokens.userId, user.id), isNull(passwordResetTokens.usedAt)));
        await db.insert(passwordResetTokens).values({ userId: user.id, tokenHash: tokenHash(rawToken), expiresAt });
        const resetUrl = `${getRequestOrigin(ctx.req)}/redefinir-senha?token=${encodeURIComponent(rawToken)}`;
        try {
          await sendPasswordResetEmail({ to: email, name: user.name, resetUrl });
        } catch (error) {
          console.error("[Auth] Falha ao enviar e-mail de recuperação", error);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Não foi possível enviar o e-mail de recuperação. Tente novamente em instantes." });
        }
      }
      return { success: true } as const;
    }),
    resetPassword: publicProcedure.input(z.object({ token: z.string().min(20).max(200), password: passwordSchema })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      const found = await db.select().from(passwordResetTokens).where(eq(passwordResetTokens.tokenHash, tokenHash(input.token))).limit(1);
      const reset = found[0];
      if (!reset || reset.usedAt || reset.expiresAt.getTime() < Date.now()) throw new TRPCError({ code: "BAD_REQUEST", message: "Este link de recuperação é inválido ou expirou. Solicite um novo link." });
      const passwordHash = await bcrypt.hash(input.password, 12);
      await db.update(users).set({ passwordHash, loginMethod: "local", lastSignedIn: new Date() }).where(eq(users.id, reset.userId));
      await db.update(passwordResetTokens).set({ usedAt: new Date() }).where(eq(passwordResetTokens.id, reset.id));
      const user = (await db.select().from(users).where(eq(users.id, reset.userId)).limit(1))[0];
      if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "Conta não encontrada." });
      const sessionToken = await createLocalSessionToken(user.id);
      ctx.res.cookie(LOCAL_SESSION_COOKIE, sessionToken, { ...getSessionCookieOptions(ctx.req), maxAge: LOCAL_SESSION_MAX_AGE_MS });
      return safeUser(user);
    }),
    updateContact: protectedProcedure.input(z.object({ name: z.string().trim().min(2).max(80), email: z.string().email(), phone: phoneSchema, currentPassword: passwordSchema })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db || !ctx.user) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      if (!ctx.user.passwordHash || !(await bcrypt.compare(input.currentPassword, ctx.user.passwordHash))) throw new TRPCError({ code: "UNAUTHORIZED", message: "A palavra-passe atual não está correta." });
      const email = normalizeEmail(input.email);
      const duplicateEmail = await db.select({ id: users.id }).from(users).where(and(eq(users.email, email), ne(users.id, ctx.user.id))).limit(1);
      const duplicatePhone = input.phone ? await db.select({ id: users.id }).from(users).where(and(eq(users.phone, input.phone), ne(users.id, ctx.user.id))).limit(1) : [];
      if (duplicateEmail[0] || duplicatePhone[0]) throw new TRPCError({ code: "CONFLICT", message: "Já existe uma conta com este e-mail ou telefone." });
      await db.update(users).set({ name: input.name, email, phone: input.phone ?? null, updatedAt: new Date() }).where(eq(users.id, ctx.user.id));
      const updated = (await db.select().from(users).where(eq(users.id, ctx.user.id)).limit(1))[0];
      if (!updated) throw new TRPCError({ code: "NOT_FOUND", message: "Conta não encontrada." });
      return safeUser(updated);
    }),
    changePassword: protectedProcedure.input(z.object({ currentPassword: passwordSchema, newPassword: passwordSchema })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db || !ctx.user) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      if (!ctx.user.passwordHash || !(await bcrypt.compare(input.currentPassword, ctx.user.passwordHash))) throw new TRPCError({ code: "UNAUTHORIZED", message: "A palavra-passe atual não está correta." });
      if (await bcrypt.compare(input.newPassword, ctx.user.passwordHash)) throw new TRPCError({ code: "BAD_REQUEST", message: "Escolha uma palavra-passe diferente da atual." });
      const passwordHash = await bcrypt.hash(input.newPassword, 12);
      await db.update(users).set({ passwordHash, updatedAt: new Date(), lastSignedIn: new Date() }).where(eq(users.id, ctx.user.id));
      const sessionToken = await createLocalSessionToken(ctx.user.id);
      ctx.res.cookie(LOCAL_SESSION_COOKIE, sessionToken, { ...getSessionCookieOptions(ctx.req), maxAge: LOCAL_SESSION_MAX_AGE_MS });
      return { success: true } as const;
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(LOCAL_SESSION_COOKIE, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  learning: learningRouter,
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;
