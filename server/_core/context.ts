import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { getLocalUserFromRequest } from "../localAuth";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    user = await getLocalUserFromRequest(opts.req);
  } catch {
    // A autenticação é opcional para procedimentos públicos.
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
