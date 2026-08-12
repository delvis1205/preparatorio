# LUANDA PREP

Plataforma web de preparação para o exame de admissão em **Informática de Gestão**. O projecto organiza o programa por disciplinas, módulos, aulas, exercícios de treino, revisão, simulados e tutor contextual.

![Página principal do LUANDA PREP](./docs/luanda-prep-inicio.png)

![Tela de primeiro acesso do LUANDA PREP](./docs/luanda-prep-primeiro-acesso.png)

## Autor e contactos

| Informação | Dados |
| --- | --- |
| Responsável | Delvis de Morais |
| Marca | MD Recargas / Morásio Digital |
| E-mail oficial | [recargas@morasio.shop](mailto:recargas@morasio.shop) |
| WhatsApp | [+244 973 929 712](https://wa.me/244973929712) |

## Funcionalidades

O LUANDA PREP dispõe de acesso local por nome, e-mail e palavra-passe, progresso persistente, módulos de Matemática, Língua Portuguesa e Cultura Geral, questões de treino, quizzes, revisão, simulados, Modo Exame, plano de estudo e LUANDA AI. As questões complementares são identificadas como materiais de treino, não como provas oficiais.

## Execução local

É necessário Node.js 22, PNPM e uma base MySQL/TiDB. Copie os nomes de variáveis descritos em [`RENDER_ENVIRONMENT.md`](./RENDER_ENVIRONMENT.md) para o ambiente local, preencha `DATABASE_URL` e `JWT_SECRET`, execute as migrações e inicie o servidor.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm exec drizzle-kit migrate
pnpm dev
```

## Deploy no Render

O repositório contém [`render.yaml`](./render.yaml) e o guia completo [`RENDER_DEPLOY.md`](./RENDER_DEPLOY.md). Utilize uma base MySQL/TiDB externa; a base gerenciada pela Manus não deve ser exposta nem reutilizada fora do ambiente da plataforma.

Para a configuração acompanhada, consulte [`GUIA_CONFIGURACAO_RENDER.md`](./GUIA_CONFIGURACAO_RENDER.md).

## Apoio

Os dados de apoio, bancos e IBANs oficiais são apresentados na página pública **Autor e apoio** dentro da aplicação. Confirme sempre o titular antes de efectuar qualquer transferência. A plataforma não processa pagamentos.
