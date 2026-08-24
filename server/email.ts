import { ENV } from "./_core/env";

type EmailAction = { label: string; url: string };
type EmailFrame = { eyebrow: string; title: string; intro: string; body: string; action?: EmailAction; preheader: string };

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
const escapeUrl = (value: string) => escapeHtml(value).replace(/"/g, "%22");

function renderEmail(frame: EmailFrame) {
  const action = frame.action ? `<tr><td style="padding:28px 32px 8px;"><a href="${escapeUrl(frame.action.url)}" style="display:inline-block;border-radius:12px;background:#0A36A8;color:#ffffff;padding:14px 22px;font:700 15px Arial,sans-serif;text-decoration:none;">${escapeHtml(frame.action.label)} &rarr;</a></td></tr>` : "";
  return `<!doctype html><html lang="pt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><title>${escapeHtml(frame.title)}</title></head><body style="margin:0;background:#F5F7FC;color:#172033;font-family:Arial,Helvetica,sans-serif;"><span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;">${escapeHtml(frame.preheader)}</span><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F5F7FC;padding:28px 12px;"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;border-radius:24px;overflow:hidden;background:#ffffff;border:1px solid #E6EAF2;"><tr><td style="padding:26px 32px;background:#0A36A8;color:#ffffff;"><table role="presentation" cellspacing="0" cellpadding="0"><tr><td style="width:38px;height:38px;border-radius:50%;background:#FFCC5C;color:#0A36A8;text-align:center;font:800 18px Arial,sans-serif;">LP</td><td style="padding-left:12px;font:800 16px Georgia,serif;letter-spacing:.06em;">LUANDA<br>PREP</td></tr></table></td></tr><tr><td style="padding:30px 32px 0;"><p style="margin:0 0 10px;color:#0A36A8;font:800 11px Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;">${escapeHtml(frame.eyebrow)}</p><h1 style="margin:0;color:#111827;font:700 30px/1.22 Georgia,serif;">${escapeHtml(frame.title)}</h1><p style="margin:18px 0 0;color:#4B5563;font:16px/1.65 Arial,sans-serif;">${escapeHtml(frame.intro)}</p></td></tr><tr><td style="padding:20px 32px 0;"><div style="border-left:4px solid #FFCC5C;background:#F8FAFF;padding:18px 20px;color:#334155;font:15px/1.65 Arial,sans-serif;">${frame.body}</div></td></tr>${action}<tr><td style="padding:28px 32px 30px;color:#64748B;font:12px/1.6 Arial,sans-serif;">LUANDA PREP &middot; Preparação organizada para o exame de acesso<br>Este é um e-mail automático sobre a sua conta e percurso de estudo.</td></tr></table></td></tr></table></body></html>`;
}

async function sendEmail(input: { to: string; subject: string; text: string; frame: EmailFrame }) {
  if (!ENV.resendApiKey || !ENV.emailFrom) throw new Error("O serviço de e-mail não está configurado.");
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${ENV.resendApiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: ENV.emailFrom, to: [input.to], subject: input.subject, text: input.text, html: renderEmail(input.frame) }) });
  if (!response.ok) throw new Error(`Falha no envio de e-mail: ${response.status} ${await response.text()}`);
}

export async function sendPasswordResetEmail(input: { to: string; name: string | null; resetUrl: string }) {
  const name = input.name?.trim() || "estudante";
  return sendEmail({ to: input.to, subject: "Redefina a sua palavra-passe — LUANDA PREP", text: `Olá, ${name}. Recebemos um pedido para redefinir a palavra-passe. Use o link nos próximos 30 minutos: ${input.resetUrl}`, frame: { eyebrow: "Segurança da conta", title: "Redefina a sua palavra-passe", intro: `Olá, ${name}. Recebemos um pedido para alterar a palavra-passe da sua conta.`, body: "Use o botão abaixo para criar uma nova palavra-passe. Por segurança, o link expira em 30 minutos e só pode ser usado uma vez. Se não fez este pedido, pode ignorar este e-mail.", action: { label: "Redefinir palavra-passe", url: input.resetUrl }, preheader: "O seu link seguro de recuperação está pronto." } });
}

export async function sendWelcomeEmail(input: { to: string; name: string | null; appUrl: string }) {
  const name = input.name?.trim() || "estudante";
  return sendEmail({ to: input.to, subject: "Bem-vindo ao LUANDA PREP", text: `Olá, ${name}. A sua conta LUANDA PREP está pronta. Comece pelo seu percurso de estudo: ${input.appUrl}`, frame: { eyebrow: "Conta criada", title: "O seu percurso começa agora.", intro: `Olá, ${name}. A sua conta LUANDA PREP foi criada com sucesso.`, body: "Comece por abrir o seu painel, escolher uma aula e resolver uma questão de treino. O percurso guarda o seu progresso, sugere revisões e ajuda a decidir o próximo passo.", action: { label: "Abrir o meu percurso", url: input.appUrl }, preheader: "A sua conta LUANDA PREP está pronta para estudar." } });
}

export async function sendModuleCompleteEmail(input: { to: string; name: string | null; moduleTitle: string; mastery: number; appUrl: string }) {
  const name = input.name?.trim() || "estudante";
  return sendEmail({ to: input.to, subject: `Módulo concluído: ${input.moduleTitle} — LUANDA PREP`, text: `Olá, ${name}. Concluiu ${input.moduleTitle} e alcançou ${input.mastery}% de domínio atual. Continue o percurso em ${input.appUrl}`, frame: { eyebrow: "Marco de estudo", title: "Módulo concluído.", intro: `Muito bem, ${name}. Concluiu “${input.moduleTitle}”.`, body: `O seu domínio atual neste módulo é de <strong>${input.mastery}%</strong>. Reserve alguns minutos para praticar e rever os erros antes de avançar; é assim que a aula se transforma em retenção.`, action: { label: "Continuar a praticar", url: input.appUrl }, preheader: "Um módulo concluído é um passo real no seu percurso." } });
}

export async function sendSimulationEmail(input: { to: string; name: string | null; percent: number; correct: number; total: number; appUrl: string }) {
  const name = input.name?.trim() || "estudante";
  return sendEmail({ to: input.to, subject: `Resultado do simulado: ${input.percent}% — LUANDA PREP`, text: `Olá, ${name}. Terminou um simulado: ${input.correct}/${input.total} corretas (${input.percent}%). Consulte a revisão em ${input.appUrl}`, frame: { eyebrow: "Simulado concluído", title: "O resultado mostra o próximo passo.", intro: `Olá, ${name}. Terminou um simulado com ${input.correct} respostas corretas em ${input.total}.`, body: `A taxa de acerto foi de <strong>${input.percent}%</strong>. Veja as questões que precisam de revisão e faça uma sessão curta no tópico mais frágil antes do próximo simulado.`, action: { label: "Ver revisão", url: input.appUrl }, preheader: "O seu resultado do simulado já está disponível." } });
}

export async function sendWeeklyProgressEmail(input: { to: string; name: string | null; minutes: number; questions: number; accuracy: number; streak: number; nextTitle: string; appUrl: string }) {
  const name = input.name?.trim() || "estudante";
  return sendEmail({ to: input.to, subject: `O seu resumo semanal: ${input.minutes} min de estudo — LUANDA PREP`, text: `Olá, ${name}. Nesta semana: ${input.minutes} minutos, ${input.questions} questões, ${input.accuracy}% de acerto e sequência de ${input.streak} dias. Próximo passo: ${input.nextTitle}. ${input.appUrl}`, frame: { eyebrow: "Resumo semanal", title: "A sua semana em perspectiva.", intro: `Olá, ${name}. Este é o retrato do seu percurso nos últimos sete dias.`, body: `<strong>${input.minutes} min</strong> de estudo &nbsp;·&nbsp; <strong>${input.questions}</strong> questões &nbsp;·&nbsp; <strong>${input.accuracy}%</strong> de acerto &nbsp;·&nbsp; sequência de <strong>${input.streak} dias</strong>.<br><br>Próximo passo recomendado: <strong>${escapeHtml(input.nextTitle)}</strong>. Escolha uma sessão curta e mantenha o ritmo.`, action: { label: "Continuar o meu percurso", url: input.appUrl }, preheader: "Veja o seu resumo semanal de estudo." } });
}
