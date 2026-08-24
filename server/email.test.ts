import { afterEach, describe, expect, it, vi } from "vitest";
import { sendPasswordResetEmail } from "./email";

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
    const payload = JSON.parse((options as RequestInit).body as string);
    expect(payload.to).toEqual(["estudante@example.com"]);
    expect(payload.html).toContain("redefinir-senha?token=seguro");
  });
});
