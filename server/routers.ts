import { ONE_YEAR_MS } from "../shared/const";
import { compare, hash } from "bcryptjs";
import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { LOCAL_SESSION_COOKIE, createLocalSession } from "./_core/localAuth";
import * as db from "./db";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { aiRouter } from "./routers/ai";
import { learningRouter } from "./routers/learning";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(({ ctx }) => {
      if (!ctx.user) return null;
      const { passwordHash: _passwordHash, ...safeUser } = ctx.user;
      return safeUser;
    }),
    localLogin: publicProcedure.input(z.object({
      name: z.string().trim().max(80).optional(),
      email: z.string().trim().email("Introduza um e-mail válido."),
      password: z.string().min(8, "A palavra-passe deve ter pelo menos 8 caracteres.").max(128),
    })).mutation(async ({ ctx, input }) => {
      const email = input.email.toLowerCase();
      let user = await db.getUserByEmail(email);
      if (!user) {
        if (!input.name || input.name.trim().length < 2) throw new Error("No primeiro acesso, informe o seu nome.");
        user = await db.createLocalUser({ name: input.name, email, passwordHash: await hash(input.password, 12) });
      } else {
        if (!user.passwordHash || !(await compare(input.password, user.passwordHash))) throw new Error("E-mail ou palavra-passe inválidos.");
        await db.touchLocalUser(user.id);
      }
      if (!user) throw new Error("Não foi possível criar a conta agora.");
      const token = await createLocalSession(user.id);
      ctx.res.cookie(LOCAL_SESSION_COOKIE, token, { ...getSessionCookieOptions(ctx.req), maxAge: ONE_YEAR_MS });
      const { passwordHash: _passwordHash, ...safeUser } = user;
      return safeUser;
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      ctx.res.clearCookie(LOCAL_SESSION_COOKIE, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  learning: learningRouter,
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;
