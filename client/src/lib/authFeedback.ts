export type AuthSubmissionMode = "login" | "register";

export function getAuthSubmissionMessage(mode: AuthSubmissionMode) {
  return mode === "login"
    ? "A verificar credenciais e a preparar o seu painel…"
    : "A criar a sua conta e a preparar o seu percurso…";
}
