# Deploy no Render — LUANDA PREP

## O que já está preparado

O projecto contém `render.yaml`, um endpoint de saúde em `/api/health`, servidor ligado a `0.0.0.0`, o guia `RENDER_ENVIRONMENT.md` e build com `pnpm`. No Render, crie um **Web Service** a partir deste repositório ou use **New → Blueprint** para ler o `render.yaml`.

> A aplicação usa MySQL/TiDB através de Drizzle. O banco de dados interno da Manus é um recurso gerenciado do ambiente Manus e não deve ser tratado como uma base externa reutilizável. Para o Render, configure uma instância MySQL/TiDB compatível, com acesso de rede autorizado para o serviço Render.

## Variáveis necessárias

| Variável | Obrigatória | Finalidade |
| --- | --- | --- |
| `DATABASE_URL` | Sim | String MySQL/TiDB para dados de utilizador, progresso, respostas e simulados. |
| `JWT_SECRET` | Sim | Assinatura segura das sessões. O Blueprint gera um valor; mantenha-o privado e estável. |
| `NODE_ENV` | Sim | Use `production`. |
| `APP_ORIGIN` | Sim | URL pública final, por exemplo `https://luanda-prep.onrender.com`. |
| `VITE_APP_ID`, `VITE_OAUTH_PORTAL_URL`, `OAUTH_SERVER_URL` | Para login Manus | Necessárias ao fluxo OAuth actualmente usado no projecto. Registe `https://SEU-DOMINIO/api/oauth/callback` como callback permitido no provedor. |
| `OWNER_OPEN_ID` | Opcional | Identifica o administrador inicial na autenticação Manus. |
| `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY` | Para serviços Forge | Necessárias ao LUANDA AI baseado nos serviços gerenciados Manus. Não são preenchidas automaticamente no Render. |

## Migração de base de dados

1. Crie uma base MySQL/TiDB externa e copie a respectiva `DATABASE_URL` para o Render.
2. O Blueprint executa `pnpm exec drizzle-kit migrate` antes de iniciar uma nova versão.
3. Para uma primeira instalação ou diagnóstico, também pode executar `pnpm exec drizzle-kit migrate` no Shell do Render.

## Autenticação e IA

O login actual é Manus OAuth. Para continuar a utilizá-lo fora da Manus, é indispensável que a aplicação OAuth aceite o domínio Render no callback. Se isso não estiver disponível, migre o login para um provedor externo antes de tornar o serviço público.

O LUANDA AI actual utiliza a integração Forge da Manus. Não exponha as chaves Forge no cliente e não faça commit de segredos. Se desejar operar a IA sem qualquer dependência Manus, o próximo passo é integrar um provedor LLM externo e adicionar a respetiva chave somente nas variáveis privadas do Render.

## Passos no Render

1. Crie o Web Service via Blueprint ou defina manualmente `Build Command` como `corepack enable && pnpm install --frozen-lockfile && pnpm build` e `Start Command` como `pnpm start`.
2. Insira os valores privados enumerados acima no painel **Environment**; nunca utilize `.env` no GitHub.
3. Configure a URL final em `APP_ORIGIN` e no callback OAuth antes do primeiro login.
4. Após o deploy, abra `https://SEU-DOMINIO/api/health`. A resposta esperada é `{ "ok": true, "service": "luanda-prep" }`.

## Nota sobre hospedagem

A versão Manus continua hospedável no domínio integrado da plataforma. O Render é uma alternativa solicitada e requer a gestão separada de base de dados, OAuth e chaves de IA.
