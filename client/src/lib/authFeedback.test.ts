import { describe, expect, it } from "vitest";
import { getAuthSubmissionMessage } from "./authFeedback";

describe("getAuthSubmissionMessage", () => {
  it("explica que a entrada está a ser processada", () => {
    expect(getAuthSubmissionMessage("login")).toContain("A verificar credenciais");
  });

  it("explica que o registo está a ser criado", () => {
    expect(getAuthSubmissionMessage("register")).toContain("A criar a sua conta");
  });
});
