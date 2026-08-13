import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { getLocalSessionUser } from "./localAuth";
import { generateModuleStudyGuidePdf } from "../pdfExport";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  app.set("trust proxy", 1);
  const server = createServer(app);
  app.get("/api/health", (_req, res) => res.status(200).json({ ok: true, service: "luanda-prep" }));

  // PDF Export Endpoint
  app.get("/api/export/pdf", async (req, res) => {
    try {
      const user = await getLocalSessionUser(req);
      if (!user) {
        res.status(401).json({ error: "Por favor faça login para descarregar os guias de estudo." });
        return;
      }
      const moduleId = typeof req.query.moduleId === "string" ? req.query.moduleId : undefined;
      const discipline = typeof req.query.discipline === "string" ? req.query.discipline : undefined;
      const includeAnswers = req.query.answers !== "false";

      const doc = generateModuleStudyGuidePdf({ moduleId, discipline, includeAnswers });
      const filename = moduleId ? `luanda-prep-modulo-${moduleId}.pdf` : discipline ? `luanda-prep-disciplina-${discipline}.pdf` : "luanda-prep-guia-geral.pdf";

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      doc.pipe(res);
      doc.end();
    } catch (error: any) {
      console.error("[PDF Export Error]", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Erro ao gerar o documento PDF. Tente novamente." });
      }
    }
  });
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
