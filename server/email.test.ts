import { afterEach, describe, expect, it, vi } from "vitest";
import { sendPasswordResetEmail, sendWelcomeEmail } from "./email";

describe("e-mail de recuperação", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("envia um link de uso único pelo provedor transacional", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await sendPasswordResetEmail({
      to: "estudante@example.com",
      name: "Ana",
      resetUrl: "https://luandaprep.example/redefinir-senha?token=seguro",
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [, options] = fetchMock.mock.calls[0] ?? [];
    expect(options).toMatchObject({ method: "POST" });
    expect((options as RequestInit).signal).toBeInstanceOf(AbortSignal);
    const payload = JSON.parse((options as RequestInit).body as string);
    expect(payload.to).toEqual(["estudante@example.com"]);
    expect(payload.html).toContain("redefinir-senha?token=seguro");
    expect(payload.html).toContain("LUANDA");
    expect(payload.html).toContain("#0A36A8");
  });

  it("envia boas-vindas com ligação ao percurso de estudo", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    await sendWelcomeEmail({ to: "estudante@example.com", name: "Ana", appUrl: "https://luandaprep.example/app" });

    const [, options] = fetchMock.mock.calls[0] ?? [];
    const payload = JSON.parse((options as RequestInit).body as string);
    expect(payload.subject).toContain("Bem-vindo");
    expect(payload.html).toContain("Abrir o meu percurso");
    expect(payload.html).toContain("https://luandaprep.example/app");
  });
});
