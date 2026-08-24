import { defineConfig } from "drizzle-kit";

const connectionString = process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
if (!connectionString) throw new Error("POSTGRES_URL ou DATABASE_URL é obrigatória para gerar migrações Supabase.");

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/supabase",
  dialect: "postgresql",
  dbCredentials: { url: connectionString },
});
