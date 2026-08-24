# Referências verificadas — Render

## Blueprint

O Render usa por padrão um ficheiro `render.yaml` na raiz do repositório para definir serviços e variáveis. A especificação documenta campos como `buildCommand`, `preDeployCommand`, `startCommand`, `healthCheckPath` e `envVars`. Fonte: [Blueprint YAML Reference](https://render.com/docs/blueprint-spec).

## Variáveis e segredos

No painel do Render, as variáveis são geridas em **Environment → Environment Variables → Add Environment Variable**. O painel permite guardar e disparar um novo deploy, e a documentação recomenda não commitar segredos no `render.yaml`: para valores privados, use `sync: false` no Blueprint e preencha o valor no painel. A opção `generateValue: true` pode criar um segredo aleatório de 256 bits para uma chave de aplicação. Fonte: [Environment Variables and Secrets](https://render.com/docs/configure-environment-variables).

## Aplicação ao LUANDA PREP

O `render.yaml` já especifica build, start, health check e `JWT_SECRET` gerado. `DATABASE_URL` deve ser preenchida como variável privada no Render. A aplicação usa MySQL/TiDB via Drizzle; Render Postgres não é compatível sem uma conversão de schema e driver.

## Base de dados externa recomendada

Para obter uma `DATABASE_URL` compatível, o guia oficial do TiDB Cloud orienta criar uma instância **Starter** em **My TiDB → Create Resource**, abrir a instância, clicar em **Connect**, escolher o método de ligação e gerar a palavra-passe. A documentação exige TLS para a ligação e alerta que a palavra-passe gerada só é exibida uma vez. Fonte: [Create a TiDB Cloud Starter Instance](https://docs.pingcap.com/developer/dev-guide-build-cluster-in-cloud/).

## Bloqueio de criação no Render

A documentação oficial confirma que **Web Services** podem usar instâncias **Free** e que a criação manual é feita por **New → Web Service**, escolhendo o tipo de instância gratuito. Como o painel exibiu “This action is not allowed” antes de qualquer build ou log de deploy, a `DATABASE_URL`, os comandos e o código ainda não foram executados. O próximo diagnóstico deve concentrar-se na conta, workspace, seleção de instância e política do Render. Fontes: [Deploy for Free](https://render.com/docs/free) e [Deploy a Node Express App](https://render.com/docs/deploy-node-express-app).

## Alternativa externa

O Koyeb mantém documentação de deploy por Git para Express, mas a página de preços atual não apresenta uma instância de computação gratuita contínua. Portanto, não é a opção indicada quando o requisito é custo zero. Já o Cloud Run oferece deploy de aplicações Node.js a partir do código-fonte e uma franquia mensal para serviços sob requisição: 180.000 vCPU-segundos, 360.000 GiB-segundos e 2 milhões de requisições em regiões de preço Tier 1. O Cloud Run requer uma conta de faturamento ativa e cobra somente o excedente da franquia. Fontes: [Koyeb Express](https://www.koyeb.com/docs/deploy/express), [Koyeb Pricing](https://www.koyeb.com/pricing), [Cloud Run Node.js](https://docs.cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service) e [Cloud Run pricing](https://cloud.google.com/run/pricing).
