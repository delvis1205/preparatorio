import { describe, expect, it } from "vitest";

describe("credencial Groq", () => {
  it("autentica no endpoint de modelos sem expor a chave", async () => {
    const apiKey = process.env.GROQ_API_KEY;
    expect(apiKey).toBeTruthy();

    const response = await fetch("https://api.groq.com/openai/v1/models", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    expect(response.status).toBe(200);
    const body = (await response.json()) as { data?: Array<{ id?: string }> };
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data?.some(model => model.id === "openai/gpt-oss-20b")).toBe(true);
  }, 20_000);
});
