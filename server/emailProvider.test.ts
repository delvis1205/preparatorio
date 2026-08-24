import { describe, expect, it } from "vitest";

describe("provedor de e-mail transacional", () => {
  it("aceita a credencial Resend configurada", async () => {
    const apiKey = process.env.RESEND_API_KEY;
    expect(apiKey, "RESEND_API_KEY deve estar configurada").toBeTruthy();

    const response = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    expect(response.ok, `A credencial Resend foi rejeitada com status ${response.status}`).toBe(true);
  }, 15_000);
});
