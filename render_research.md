# Referências verificadas — Render

## Blueprint

O Render usa por padrão um ficheiro `render.yaml` na raiz do repositório para definir serviços e variáveis. A especificação documenta campos como `buildCommand`, `preDeployCommand`, `startCommand`, `healthCheckPath` e `envVars`. Fonte: [Blueprint YAML Reference](https://render.com/docs/blueprint-spec).

## Variáveis e segredos

No painel do Render, as variáveis são geridas em **Environment → Environment Variables → Add Environment Variable**. O painel permite guardar e disparar um novo deploy, e a documentação recomenda não commitar segredos no `render.yaml`: para valores privados, use `sync: false` no Blueprint e preencha o valor no painel. A opção `generateValue: true` pode criar um segredo aleatório de 256 bits para uma chave de aplicação. Fonte: [Environment Variables and Secrets](https://render.com/docs/configure-environment-variables).

## Aplicação ao LUANDA PREP

O `render.yaml` já especifica build, start, health check e `JWT_SECRET` gerado. `DATABASE_URL` deve ser preenchida como variável privada no Render. A aplicação usa MySQL/TiDB via Drizzle; Render Postgres não é compatível sem uma conversão de schema e driver.

## Base de dados externa recomendada

Para obter uma `DATABASE_URL` compatível, o guia oficial do TiDB Cloud orienta criar uma instância **Starter** em **My TiDB → Create Resource**, abrir a instância, clicar em **Connect**, escolher o método de ligação e gerar a palavra-passe. A documentação exige TLS para a ligação e alerta que a palavra-passe gerada só é exibida uma vez. Fonte: [Create a TiDB Cloud Starter Instance](https://docs.pingcap.com/developer/dev-guide-build-cluster-in-cloud/).
