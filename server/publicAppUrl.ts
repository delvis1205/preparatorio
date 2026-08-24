type RequestOriginInput = {
  protocol?: string;
  headers: Record<string, unknown>;
  get?: (header: string) => string | undefined;
};

function normalizePublicUrl(value: string) {
  const url = new URL(value.trim());
  if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("APP_URL deve usar http ou https.");
  return url.origin;
}

export function getPublicAppOrigin(request: RequestOriginInput, configuredUrl = process.env.APP_URL ?? "") {
  if (configuredUrl.trim()) return normalizePublicUrl(configuredUrl);

  const forwardedProto = typeof request.headers["x-forwarded-proto"] === "string" ? request.headers["x-forwarded-proto"].split(",")[0] : undefined;
  const forwardedHost = typeof request.headers["x-forwarded-host"] === "string" ? request.headers["x-forwarded-host"].split(",")[0] : undefined;
  const host = forwardedHost || request.get?.("host") || (typeof request.headers.host === "string" ? request.headers.host : undefined);
  if (!host) throw new Error("Não foi possível criar o link de recuperação.");
  return `${forwardedProto || request.protocol || "https"}://${host}`;
}
