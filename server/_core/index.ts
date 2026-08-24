import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { getLocalUserFromRequest } from "../localAuth";
import { generateModuleStudyGuidePdf, generateSimulatedExamPdf, generateErrorSheetPdf } from "../pdfExport";
import { getDb } from "../db";
import { questionAttempts } from "../../drizzle/schema";
import { automationConfig } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { requireCronTask } from "./cronAuth";
import { sendWeeklyProgressEmails } from "../emailAutomation";

function requestOrigin(req: express.Request) {
  const forwardedProto = typeof req.headers["x-forwarded-proto"] === "string" ? req.headers["x-forwarded-proto"].split(",")[0] : undefined;
  const forwardedHost = typeof req.headers["x-forwarded-host"] === "string" ? req.headers["x-forwarded-host"].split(",")[0] : undefined;
  return `${forwardedProto || req.protocol || "https"}://${forwardedHost || req.get("host")}`;
}

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
      const user = await getLocalUserFromRequest(req);
      if (!user) {
        res.status(401).json({ error: "Por favor faça login para descarregar os guias de estudo." });
        return;
      }
      const exportType = typeof req.query.type === "string" ? req.query.type : "guide";
      const moduleId = typeof req.query.moduleId === "string" ? req.query.moduleId : undefined;
      const discipline = typeof req.query.discipline === "string" ? req.query.discipline : undefined;
      const includeAnswers = req.query.answers !== "false";
      const title = typeof req.query.title === "string" ? req.query.title : undefined;

      let doc: PDFKit.PDFDocument;
      let filename = "luanda-prep-documento.pdf";

      if (exportType === "exam") {
        const rawIds = typeof req.query.questionIds === "string" ? req.query.questionIds : "";
        const questionIds = rawIds ? rawIds.split(",") : undefined;
        doc = generateSimulatedExamPdf({ questionIds, includeAnswers, title });
        filename = "luanda-prep-simulado-prova.pdf";
      } else if (exportType === "errors") {
        const db = await getDb();
        let errorQuestionIds: string[] = [];
        if (db) {
          const attempts = await db.select({ questionId: questionAttempts.questionId, isCorrect: questionAttempts.isCorrect }).from(questionAttempts).where(eq(questionAttempts.userId, user.id));
          const incorrectMap = new Set<string>();
          for (const a of attempts) {
            if (!a.isCorrect) {
              incorrectMap.add(a.questionId);
            }
          }
          errorQuestionIds = Array.from(incorrectMap);
        }
        doc = generateErrorSheetPdf({ questionIds: errorQuestionIds.length ? errorQuestionIds : ["q-mat-1"], includeAnswers: true });
        filename = "luanda-prep-ficha-erros.pdf";
      } else {
        doc = generateModuleStudyGuidePdf({ moduleId, discipline, includeAnswers });
        filename = moduleId ? `luanda-prep-modulo-${moduleId}.pdf` : discipline ? `luanda-prep-disciplina-${discipline}.pdf` : "luanda-prep-guia-geral.pdf";
      }

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
  app.post("/api/scheduled/weekly-progress", async (req, res) => {
    try {
      const cron = await requireCronTask(req);
      const db = await getDb();
      const config = db ? (await db.select().from(automationConfig).where(eq(automationConfig.configKey, "weekly_progress")).limit(1))[0] : null;
      if (!config || config.scheduleCronTaskUid !== cron.taskUid) return res.status(403).json({ error: "invalid scheduled task" });
      const result = await sendWeeklyProgressEmails(requestOrigin(req));
      return res.json({ ok: true, ...result });
    } catch (error) {
      console.error("[Weekly Progress Email]", error);
      return res.status(500).json({ error: String(error), timestamp: new Date().toISOString() });
    }
  });
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
