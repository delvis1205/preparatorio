import { parse as parseCookie } from "cookie";
import { jwtVerify } from "jose";
import type { Request } from "express";
import { ENV } from "./env";

export async function requireCronTask(req: Request) {
  const authorization = req.headers.authorization;
  if (ENV.cronSecret && authorization === `Bearer ${ENV.cronSecret}`) {
    return { taskUid: "vercel-weekly-progress" };
  }
  const cookieToken = parseCookie(req.headers.cookie ?? "").app_session_id;
  const headerToken = typeof authorization === "string" && authorization.startsWith("Bearer ") ? authorization.slice(7) : undefined;
  const token = cookieToken ?? headerToken;
  if (!token) throw new Error("missing scheduled task token");
  const { payload } = await jwtVerify(token, new TextEncoder().encode(ENV.cookieSecret), { algorithms: ["HS256"] });
  const openId = typeof payload.openId === "string" ? payload.openId : "";
  if (!openId.startsWith("cron_")) throw new Error("scheduled task authentication required");
  const response = await fetch(`${ENV.oAuthServerUrl}/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ jwtToken: token, projectId: ENV.appId }) });
  if (!response.ok) throw new Error(`scheduled task validation failed: ${response.status}`);
  const info = await response.json() as { taskUid?: string };
  if (!info.taskUid) throw new Error("scheduled task missing task uid");
  return { taskUid: info.taskUid };
}
