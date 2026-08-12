import { describe, expect, it } from "vitest";
import { createLocalSession } from "./_core/localAuth";

describe("sessão local", () => {
  it("assina um token com o segredo local configurado", async () => {
    const token = await createLocalSession(42);

    expect(token.split(".")).toHaveLength(3);
  });
});
