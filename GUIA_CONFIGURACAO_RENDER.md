# Guia detalhado de configuração — LUANDA PREP no Render

Este guia configura o **LUANDA PREP** para funcionar no Render com login local por nome, e-mail e palavra-passe. O repositório já contém `render.yaml`, migrações Drizzle e a rota de diagnóstico `/api/health`.

> **Não publique nenhum segredo no GitHub.** A palavra-passe da base de dados e o segredo de sessão pertencem somente ao painel privado do Render.

## 1. Criar a base de dados MySQL compatível

O projeto utiliza `mysql2` e Drizzle com dialeto MySQL. Por isso, escolha uma base **MySQL/TiDB**, não Render Postgres. A opção mais simples é o TiDB Cloud Starter, compatível com o protocolo MySQL.

| Passo | Onde clicar | Resultado esperado |
| --- | --- | --- |
| 1 | Abra [tidbcloud.com/free-trial](https://tidbcloud.com/free-trial) e crie a conta. | Acesso ao console TiDB Cloud. |
| 2 | No menu **My TiDB**, clique em **Create Resource**. | Formulário de nova instância. |
| 3 | Mantenha **Starter**, escolha um nome, provedor e região. | Uma instância TiDB Cloud Starter criada. |
| 4 | Abra a instância e clique em **Connect**. | Janela com métodos e strings de ligação. |
| 5 | Clique em **Generate Password** e guarde a senha num gestor de palavras-passe. | A senha aparece uma única vez. |
| 6 | Copie os dados de host, utilizador com prefixo da instância, porta, base e senha. | Dados necessários para `DATABASE_URL`. |

O TiDB exige TLS para conexões Starter/Essential. A documentação oficial explica que a string de conexão é apresentada na janela **Connect** e que a senha gerada não volta a ser exibida.[1]

### Montar `DATABASE_URL`

No Render, use a string recomendada na área **Connect** da sua instância TiDB. Para este projeto, a estrutura precisa seguir o formato MySQL abaixo. Substitua somente os valores entre sinais de maior/menor.

```dotenv
DATABASE_URL=mysql://<UTILIZADOR_COM_PREFIXO>:<SENHA_CODIFICADA>@<HOST>:4000/<BASE>?ssl={"rejectUnauthorized":true}
```

Se a senha contiver caracteres como `@`, `:`, `/`, `?` ou `#`, transforme-a com URL encoding antes de compor a URL. Por exemplo, `Minha@Senha` torna-se `Minha%40Senha`. Copie a forma final para um local seguro; não a envie por chat nem a coloque em ficheiros do repositório.

## 2. Criar o serviço no Render a partir do GitHub

1. Aceda a [dashboard.render.com](https://dashboard.render.com/) e entre com a sua conta.
2. Clique em **New +** e selecione **Blueprint**.
3. Escolha o repositório **`delvis1205/preparatorio`** e a branch **`main`**.
4. O Render encontra o ficheiro `render.yaml` na raiz. Confirme o serviço chamado **`luanda-prep`**.
5. Avance para a área de variáveis; o Build Command, o Start Command, o health check e as migrações já vêm do Blueprint.

O Render usa `render.yaml` na raiz do repositório por padrão e reconhece configurações como `buildCommand`, `preDeployCommand`, `startCommand`, `healthCheckPath` e `envVars`.[2]

## 3. Preencher as variáveis de ambiente

No serviço Render, abra **Environment** no menu lateral e clique em **+ Add Environment Variable**. O próprio painel permite guardar as variáveis e disparar um novo deploy.[3]

| Variável | Valor a inserir | Onde obter | Obrigatória |
| --- | --- | --- | --- |
| `DATABASE_URL` | A URL MySQL/TiDB completa com TLS. | Janela **Connect** da instância TiDB, ajustada ao formato acima. | Sim |
| `JWT_SECRET` | Não é necessário escrever um valor quando criar por Blueprint: o `render.yaml` usa `generateValue: true`. | O Render gera e guarda um segredo aleatório privado. | Sim |
| `NODE_ENV` | `production` | Já definido no `render.yaml`. | Sim |
| `NODE_VERSION` | `22.13.0` | Já definido no `render.yaml`. | Sim |

> Não crie `PORT` manualmente. O Render fornece essa variável ao serviço, e o servidor do LUANDA PREP já a utiliza automaticamente.

### Sobre o LUANDA AI

O tutor actual foi construído com o serviço de IA gerenciado da Manus. Essas chaves não podem ser exportadas para Render. O percurso de estudo, login, exercícios, revisão e simulados funcionam sem elas, mas o **LUANDA AI** requer uma futura integração com um provedor de IA externo. Não invente nem copie chaves Manus para o Render.

## 4. Primeiro deploy e migrações

1. Clique em **Create Blueprint Instance** ou **Apply**.
2. Aguarde o Build Log. O Render executa, em sequência, `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm exec drizzle-kit migrate` e `pnpm start`.
3. A migração cria as tabelas de utilizadores, perfis, progresso, respostas, simulados, favoritos, notas, plano e conversas. Ela também adiciona a coluna de hash de palavra-passe usada pelo acesso local.
4. Quando o estado mudar para **Live**, copie a URL pública gerada pelo Render.

O comando pré-deploy é o lugar apropriado para tarefas como migrações antes de uma nova versão entrar no ar.[4]

## 5. Verificar que o serviço funciona

Abra as seguintes URLs, substituindo `SEU-SERVICO` pela URL que o Render mostrar.

| Verificação | URL ou ação | Resultado esperado |
| --- | --- | --- |
| Saúde do servidor | `https://SEU-SERVICO.onrender.com/api/health` | JSON com `{"ok":true,"service":"luanda-prep"}`. |
| Página pública | `https://SEU-SERVICO.onrender.com/` | Página inicial LUANDA PREP. |
| Primeiro acesso | `https://SEU-SERVICO.onrender.com/entrar` | Campos Nome, E-mail e Palavra-passe. |
| Criação automática | Informe nome, e-mail e senha de 8+ caracteres e clique **Continuar**. | Perfil criado e redirecionamento para o percurso. |
| Segundo acesso | Saia e entre com o mesmo e-mail e senha. | Sessão restaurada sem pedir novo cadastro. |

## 6. Problemas frequentes

| Sintoma | Causa provável | Como resolver |
| --- | --- | --- |
| `Database not available` ou erro 500 no login | `DATABASE_URL` ausente, inválida ou sem TLS. | Revise host, porta `4000`, utilizador com prefixo, senha e a opção SSL. |
| Falha em `drizzle-kit migrate` | A base não aceita conexão ou a URL aponta para Postgres. | Use uma instância MySQL/TiDB e confirme a string exibida por TiDB. |
| Health check falha | Serviço não iniciou ou a build falhou. | Abra **Logs**, procure o primeiro erro e confirme `pnpm start`. |
| Login não mantém sessão | `JWT_SECRET` alterado depois de utilizadores entrarem. | Mantenha o segredo gerado pelo Render estável; só altere se aceitar invalidar sessões. |
| LUANDA AI retorna indisponível | As chaves internas Manus não existem no Render. | É esperado até integrar um provedor LLM externo; o restante do site continua funcional. |

## 7. Próximo passo

Depois de o serviço ficar **Live**, envie a URL pública do Render. A verificação final deve testar o health check, o primeiro acesso, o acesso repetido e a persistência do progresso com a base externa.

## Referências

[1]: https://docs.pingcap.com/developer/dev-guide-build-cluster-in-cloud/ "TiDB Cloud — Create a Starter Instance"
[2]: https://render.com/docs/blueprint-spec "Render — Blueprint YAML Reference"
[3]: https://render.com/docs/configure-environment-variables "Render — Environment Variables and Secrets"
[4]: https://render.com/docs/deploys "Render — Deploys and pre-deploy commands"
