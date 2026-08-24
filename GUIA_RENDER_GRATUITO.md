# LUANDA PREP no Render gratuito — sem Blueprint

Este é o caminho a utilizar no plano gratuito: você cria **manualmente** um Web Service ligado ao GitHub. Não use **Blueprint**, não carregue `render.yaml` e não envie os dados TiDB pelo chat.

> Mantenha os dados do TiDB Cloud no seu gestor de palavras-passe. Eles serão colados apenas no campo privado **Environment** do Render.

## Antes de começar

Você já tem os dados TiDB Cloud. Na página **Connect** da sua instância, tenha à mão: host, porta, base de dados, utilizador (incluindo o prefixo da instância) e a palavra-passe gerada. O TiDB Cloud requer TLS.[1]

## Criar o serviço gratuito

1. Abra [dashboard.render.com](https://dashboard.render.com/).
2. Clique em **New +** e depois em **Web Service** — **não** selecione Blueprint.
3. Conecte o GitHub caso o Render peça autorização e escolha **`delvis1205/preparatorio`**.
4. Preencha a criação usando esta tabela.

| Campo do Render | Valor para preencher |
| --- | --- |
| **Name** | `luanda-prep` (ou outro nome disponível) |
| **Branch** | `main` |
| **Region** | Escolha a região mais próxima dos seus utilizadores; se estiver em dúvida, mantenha a sugestão do Render. |
| **Root Directory** | Deixe vazio. |
| **Runtime** | `Node` |
| **Build Command** | `pnpm install --frozen-lockfile && pnpm build` |
| **Start Command** | `pnpm exec drizzle-kit migrate && pnpm start` |
| **Instance Type** | Selecione **Free**. |
| **Health Check Path** | `/api/health` |
| **Auto-Deploy** | `Yes` (recomendado para publicar cada envio à branch `main`). |

O guia oficial do Render confirma que a criação manual começa em **New > Web Service**, com o repositório Git ligado, e permite informar os comandos reais de build e start da aplicação.[2]

O Start Command inclui a migração antes de iniciar o servidor. Isso é adequado ao serviço gratuito com uma instância única e garante que tabelas e a coluna de hash de palavra-passe existam antes do primeiro login.

## Preencher variáveis de ambiente

Antes de clicar em **Create Web Service**, abra a secção **Advanced** ou **Environment Variables** e adicione os itens abaixo um de cada vez.

| Chave | Valor | Onde obter |
| --- | --- | --- |
| `DATABASE_URL` | A conexão MySQL/TiDB completa. | Monte com os dados que já tem do painel **Connect** do TiDB Cloud. Veja o exemplo abaixo. |
| `JWT_SECRET` | Uma frase aleatória longa, com 48+ caracteres. | Gere com o seu gestor de palavras-passe em modo senha aleatória e cole aqui. Não reutilize uma senha pessoal. |
| `NODE_ENV` | `production` | Escreva exatamente este valor. |
| `NODE_VERSION` | `22.13.0` | Escreva exatamente este valor. |

Não crie `PORT`. O Render fornece essa variável automaticamente e o servidor já a respeita.

### Valor de `DATABASE_URL`

Use o host, utilizador, senha e nome da base da janela **Connect**. O formato necessário ao LUANDA PREP é:

```dotenv
mysql://UTILIZADOR:SENHA@HOST:4000/NOME_DA_BASE?ssl={"rejectUnauthorized":true}
```

Substitua apenas as partes em maiúsculas. Se a sua senha tiver `@`, `:`, `/`, `?` ou `#`, converta esses caracteres para URL encoding antes de montar a URL. Exemplos: `@` torna-se `%40`; `#` torna-se `%23`; espaço torna-se `%20`.

> A senha e a URL nunca devem entrar no GitHub, em `README.md`, capturas de tela ou mensagens. O painel **Environment** do Render é o local certo para elas.[3]

## Publicar e conferir

1. Clique em **Create Web Service**.
2. Acompanhe a página **Logs**. Primeiro haverá instalação, depois build, migração e início do serviço.
3. Quando o status ficar **Live**, copie a URL `https://...onrender.com`.
4. Abra `https://SEU-SERVICO.onrender.com/api/health`. O resultado deve conter `"ok": true`.
5. Abra `https://SEU-SERVICO.onrender.com/entrar`, informe um nome, e-mail e palavra-passe de pelo menos oito caracteres. O perfil será criado automaticamente, sem página de cadastro.
6. Saia e entre novamente com o mesmo e-mail e palavra-passe para confirmar que o TiDB está a guardar a conta.

## Se aparecer erro

| O que aparece no Render | Ação imediata |
| --- | --- |
| Erro de conexão no `drizzle-kit migrate` | Verifique `DATABASE_URL`, porta `4000`, utilizador com prefixo, senha e TLS. |
| Health check falha | Confirme que o caminho é exatamente `/api/health` e abra o primeiro erro em **Logs**. |
| A página abre mas o login retorna erro 500 | A migração não concluiu ou a URL TiDB está errada. Revise os logs do Start Command. |
| Build falha em `pnpm` | Confirme `NODE_VERSION=22.13.0` e os comandos da tabela. |
| LUANDA AI indisponível | O tutor depende de uma integração externa de IA. O login, estudo, prática, quiz e simulados continuam funcionais. |

Depois de o serviço ficar Live, envie apenas a URL pública do Render. Não envie a senha ou a `DATABASE_URL`; com a URL eu consigo orientar a última validação de forma segura.

## Referências

[1]: https://docs.pingcap.com/developer/dev-guide-build-cluster-in-cloud/ "TiDB Cloud Starter — criação e conexão TLS"
[2]: https://render.com/docs/deploy-node-express-app "Render — Deploy a Node Express App"
[3]: https://render.com/docs/configure-environment-variables "Render — Environment Variables and Secrets"
