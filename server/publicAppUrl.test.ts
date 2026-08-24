import { describe, expect, it } from "vitest";
import { getPublicAppOrigin } from "./publicAppUrl";

describe("origem pública do LUANDA PREP", () => {
  const request = { protocol: "https", headers: { host: "luanda-prep.vercel.app" } };

  it("prioriza APP_URL para links enviados por e-mail", () => {
    expect(getPublicAppOrigin(request, "https://preparatorio.morasio.shop/")).toBe("https://preparatorio.morasio.shop");
  });

  it("mantém o host da requisição como alternativa local", () => {
    expect(getPublicAppOrigin(request, "")).toBe("https://luanda-prep.vercel.app");
  });
});
