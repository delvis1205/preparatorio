import type { Request, Response } from "express";
import { createApp } from "../server/_core/index";

let appPromise: ReturnType<typeof createApp> | undefined;

export default async function handler(req: Request, res: Response) {
  const routedPath = typeof req.query.path === "string" ? req.query.path.replace(/^\/+/, "") : "";
  if (routedPath) {
    const url = new URL(req.url ?? "/api", "http://localhost");
    url.searchParams.delete("path");
    req.url = `/api/${routedPath}${url.search}`;
  }
  appPromise ??= createApp();
  const app = await appPromise;
  return app(req, res);
}
