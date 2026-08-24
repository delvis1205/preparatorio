import { jwtVerify } from "jose";
import { describe, expect, it } from "vitest";
import { createLocalSessionToken } from "./localAuth";

describe("sessão local", () => {
  it("assina um token de sessão com o identificador do utilizador", async () => {
    const token = await createLocalSessionToken(42);
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });

    expect(payload.sub).toBe("42");
    expect(payload.type).toBe("local");
    expect(payload.exp).toBeGreaterThan(payload.iat ?? 0);
  });
});
