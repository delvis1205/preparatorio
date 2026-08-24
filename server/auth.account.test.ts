import { beforeEach, describe, expect, it, vi } from "vitest";

const { getDbMock, compareMock } = vi.hoisted(() => ({ getDbMock: vi.fn(), compareMock: vi.fn() }));

vi.mock("./db", () => ({ getDb: getDbMock }));
vi.mock("bcryptjs", () => ({ default: { compare: compareMock, hash: vi.fn() } }));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(): TrpcContext {
  return {
    user: { id: 7, name: "Ana", email: "ana@example.com", phone: "+244900000000", passwordHash: "hash-atual", loginMethod: "local", role: "user", openId: null, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { cookie: vi.fn(), clearCookie: vi.fn() } as TrpcContext["res"],
  };
}

describe("segurança de dados de conta", () => {
  beforeEach(() => { getDbMock.mockReset(); compareMock.mockReset(); });

  it("exige a palavra-passe atual antes de alterar dados de contacto", async () => {
    getDbMock.mockResolvedValue({}); compareMock.mockResolvedValue(false);
    const caller = appRouter.createCaller(createContext());

    await expect(caller.auth.updateContact({ name: "Ana", email: "novo@example.com", phone: "+244911111111", currentPassword: "palavra-secreta" })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("impede reutilizar a palavra-passe atual", async () => {
    getDbMock.mockResolvedValue({}); compareMock.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
    const caller = appRouter.createCaller(createContext());

    await expect(caller.auth.changePassword({ currentPassword: "palavra-secreta", newPassword: "palavra-secreta" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
