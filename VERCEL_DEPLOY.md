# Implantação no Vercel

O repositório está preparado para gerar o cliente Vite em `dist/public` e executar a API Express por meio da função serverless `api/index.ts`. O ficheiro `vercel.json` encaminha chamadas a `/api/*` para a função, serve a aplicação React e agenda o resumo semanal para segunda-feira às 08:00 UTC.

## Variáveis de ambiente obrigatórias

Configure as variáveis abaixo nos ambientes **Preview** e **Production** do projeto Vercel. Não reutilize o banco ou as chaves internas provisionadas pela Manus fora da plataforma.

| Variável | Finalidade |
| --- | --- |
| `DATABASE_URL` | String de conexão MySQL/TiDB externa, com SSL conforme o provedor. |
| `JWT_SECRET` | Segredo forte e aleatório para a sessão local dos estudantes. |
| `OPENAI_API_KEY` | Chave de uma conta OpenAI para o LUANDA AI, usando `gpt-5-mini`. |
| `RESEND_API_KEY` | Chave Resend para recuperação, boas-vindas e e-mails de progresso. |
| `EMAIL_FROM` | Remetente verificado no Resend, por exemplo `LUANDA PREP <noreply@dominio.example>`. |
| `CRON_SECRET` | Segredo longo para autenticar o cron semanal do Vercel. |
| `OPENAI_BASE_URL` | Opcional; só use para um endpoint OpenAI compatível. |

## Base de dados e primeiro deploy

Antes de usar a versão Vercel, crie ou selecione uma base MySQL/TiDB externa e aplique as migrações a partir de uma máquina com `DATABASE_URL` configurada: `pnpm drizzle-kit migrate`. O Vercel não deve executar migrações automaticamente durante o build.

Depois de adicionar as variáveis e concluir o primeiro deploy, confira `/api/health`, faça login, gere um aprofundamento com o LUANDA AI e valide a exportação de PDF. A rota de storage da Manus continua exclusiva da hospedagem Manus; se a aplicação passar a receber uploads de utilizadores no Vercel, configure armazenamento S3 compatível antes de habilitar esse fluxo.
