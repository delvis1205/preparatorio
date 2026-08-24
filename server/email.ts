import { ENV } from "./_core/env";

export async function sendPasswordResetEmail(input: { to: string; name: string | null; resetUrl: string }) {
  if (!ENV.resendApiKey || !ENV.emailFrom) throw new Error("O serviço de e-mail de recuperação não está configurado.");
  const recipientName = input.name?.trim() || "estudante";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ENV.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: ENV.emailFrom,
      to: [input.to],
      subject: "Redefina a sua palavra-passe — LUANDA PREP",
      text: `Olá, ${recipientName}.\n\nRecebemos um pedido para redefinir a palavra-passe da sua conta LUANDA PREP. Use este link uma única vez nos próximos 30 minutos:\n${input.resetUrl}\n\nSe não fez este pedido, ignore este e-mail.`,
      html: `<p>Olá, ${recipientName}.</p><p>Recebemos um pedido para redefinir a palavra-passe da sua conta <strong>LUANDA PREP</strong>.</p><p><a href="${input.resetUrl}">Redefinir palavra-passe</a></p><p>Este link expira em 30 minutos e só pode ser usado uma vez.</p><p>Se não fez este pedido, ignore este e-mail.</p>`,
    }),
  });
  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Falha no envio do e-mail de recuperação: ${response.status} ${details}`);
  }
}
