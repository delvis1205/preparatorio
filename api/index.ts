import type { Request, Response } from "express";

type ServerBundle = { createApp: () => Promise<(req: Request, res: Response) => unknown> };
type ImportedServerBundle = ServerBundle & { default?: ServerBundle };
const loadServerBundle = Function("return import('./server.cjs')") as () => Promise<ImportedServerBundle>;
let appPromise: ReturnType<ServerBundle["createApp"]> | undefined;

export default async function handler(req: Request, res: Response) {
  const routedPath = typeof req.query.path === "string" ? req.query.path.replace(/^\/+/, "") : "";
  if (routedPath) {
    const url = new URL(req.url ?? "/api", "http://localhost");
    url.searchParams.delete("path");
    req.url = `/api/${routedPath}${url.search}`;
  }
  if (!appPromise) {
    const server = await loadServerBundle();
    const createApp = server.createApp ?? server.default?.createApp;
    if (!createApp) throw new Error("O bundle do servidor não expõe createApp.");
    appPromise = createApp();
  }
  const app = await appPromise;
  return app(req, res);
}
