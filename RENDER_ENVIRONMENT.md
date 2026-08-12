# Variáveis de ambiente para Render

Copie os nomes abaixo para o painel **Environment** do serviço Render. Não envie este conteúdo com valores reais ao GitHub e não use os valores de exemplos em produção.

```dotenv
# Runtime
NODE_ENV=production
PORT=10000

# Base de dados MySQL/TiDB externa
# Exemplo de estrutura: mysql://UTILIZADOR:SENHA@HOST:3306/NOME_DA_BASE?ssl={"rejectUnauthorized":true}
DATABASE_URL=

# Sessão: gerar aleatoriamente e manter privado
JWT_SECRET=

# Serviços gerenciados Forge da Manus — opcionais no Render
BUILT_IN_FORGE_API_URL=
BUILT_IN_FORGE_API_KEY=
```

## Valores que o Render pode gerar

No Blueprint, `JWT_SECRET` está configurado com `generateValue: true`. Para configuração manual, gere um segredo criptograficamente aleatório, com pelo menos 32 bytes, e não o altere depois que utilizadores iniciarem sessão.

## Valores que não podem ser copiados da Manus

As credenciais da base de dados e as chaves integradas da Manus pertencem ao ambiente gerenciado e não devem ser exportadas para o Render. Utilize uma `DATABASE_URL` própria de uma instância externa MySQL/TiDB. O serviço só deve receber segredos pelo painel privado do Render. O acesso principal da aplicação usa agora nome, e-mail e palavra-passe local, sem depender de OAuth Manus.
