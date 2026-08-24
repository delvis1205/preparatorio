# Variáveis de ambiente no Vercel

No painel **Vercel → luanda-prep → Settings → Environment Variables**, crie as chaves abaixo para os ambientes **Production** e **Preview**. Os valores ilustrativos não são segredos e devem ser substituídos antes de usar os fluxos autenticados.

| Variável | Valor de exemplo | Uso |
| --- | --- | --- |
| `POSTGRES_URL` | `postgres://USER:PASSWORD@HOST:6543/postgres?sslmode=require` | Variável fornecida pela integração Supabase no Vercel; a aplicação usa-a automaticamente. |
| `DATABASE_URL` | `postgres://USER:PASSWORD@HOST:6543/postgres?sslmode=require` | Alternativa somente se não usar a variável `POSTGRES_URL` criada pela integração Supabase. |
| `JWT_SECRET` | `substitua-por-um-segredo-longo-e-aleatorio` | Assinatura das sessões locais. |
| `GROQ_API_KEY` | `gsk_substitua-pela-sua-chave` | Chave privada do LUANDA AI. |
| `GROQ_MODEL` | `openai/gpt-oss-20b` | Modelo padrão do tutor. |
| `RESEND_API_KEY` | `re_substitua-pela-sua-chave` | Envio de e-mails transacionais. |
| `EMAIL_FROM` | `LUANDA PREP <noreply@seu-dominio.example>` | Remetente validado no Resend. |
| `CRON_SECRET` | `substitua-por-outro-segredo-longo-e-aleatorio` | Proteção do resumo semanal. |

> Nunca grave chaves reais no GitHub. Depois de salvar as variáveis, faça um novo deploy no Vercel para carregá-las nas funções serverless.
