import { describe, expect, it } from "vitest";
import { getDefaultLlmModel, invokeLLM } from "./_core/llm";

describe("LUANDA AI com Groq", () => {
  it("obtém uma resposta de chat do modelo configurado", async () => {
    expect(getDefaultLlmModel()).toBe("openai/gpt-oss-20b");

    const response = await invokeLLM({
      model: getDefaultLlmModel(),
      maxTokens: 256,
      messages: [
        { role: "system", content: "Responda em português, em uma frase curta." },
        { role: "user", content: "Diga apenas: LUANDA PREP pronto." },
      ],
    });

    const content = response.choices[0]?.message.content;
    expect(typeof content === "string" ? content.trim().length : 0).toBeGreaterThan(0);
  }, 30_000);
});
