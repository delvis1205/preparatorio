# LUANDA PREP — plano de implementação

## Conteúdo e arquitectura

- [x] Reestruturar a arquitectura do produto para uma plataforma de estudo full-stack, não uma landing page institucional.
- [x] Usar o nome LUANDA PREP e o subtítulo oficial do plano em toda a experiência principal.
- [ ] Organizar a estrutura curricular oficial do PDF em disciplina → módulo → tópico → aula → exemplos → exercícios → quiz → revisão.
- [x] Manter separado e identificado qualquer conteúdo complementar que não venha do PDF.

## Conta e progresso

- [ ] Adicionar autenticação simples com nome, email e palavra-passe.
- [x] Persistir progresso, módulos, respostas, pontuações, favoritos, anotações, tempo e histórico de simulados.
- [ ] Construir dashboard com progresso geral, acerto, sequência, pontos fortes, pontos fracos e próxima acção.

## Aprendizagem

- [ ] Expor a contagem de exercícios por módulo e disciplina directamente na listagem de estudo.
- [ ] Criar aula didáctica com conceito, explicação, exemplos, fórmulas, erros comuns, dicas e mini quiz.
- [x] Renderizar equações matemáticas e mostrar resoluções passo a passo.

## Prática e avaliação

- [ ] Criar banco de questões com múltipla escolha, verdadeiro/falso, resposta numérica e resposta curta.
- [ ] Mostrar correcção detalhada, explicação do erro, nova tentativa, favorito e inclusão na revisão.
- [ ] Criar filtros por disciplina, módulo, tópico, dificuldade, erros, favoritos e não respondidas.
- [ ] Implementar quizzes configuráveis e resultados com recomendações.
- [x] Implementar “Meus Erros” com sessão de prática dedicada.
- [ ] Implementar revisão recomendada e revisão espaçada básica.
- [ ] Implementar simulados com cronómetro, navegação, marcação e confirmação antes de finalizar.
- [x] Implementar Modo Exame sem respostas, explicações ou tutor durante a prova.
- [ ] Expor no relatório visual do simulado o resumo agregado por tópico, além de disciplina, tempo, erros e recomendação.

## LUANDA AI

- [x] Criar tutor contextual que conduz o raciocínio antes de entregar a solução.
- [ ] Passar contexto de aula e questão para o tutor quando o estudante pedir ajuda.
- [ ] Criar gerador de exercícios por disciplina, assunto, dificuldade e quantidade.
- [x] Guardar histórico de conversas quando a integração estiver disponível.

## Qualidade

- [x] Resolver os conflitos do upgrade full-stack e confirmar auth, tRPC e base de dados operacionais.
- [x] Criar em código a estrutura curricular persistente derivada do PDF e ligá-la à experiência de estudo.
- [ ] Validar fluxos de login, estudo, resposta, revisão, quiz, simulado e tutor.
- [x] Validar responsividade mobile, estados vazios, acessibilidade, foco e feedback de erro.
- [x] Confirmar build de produção e preparar checkpoint antes da publicação pela UI.

## Concluído com a arquitectura da plataforma

- [x] Integrar autenticação Manus OAuth em vez de armazenar palavras-passe próprias.
- [x] Criar uma landing pública, dashboard autenticado e navegação persistente de estudante.
- [x] Criar o banco inicial de módulos e 15 questões de treino, identificadas como não oficiais.
- [x] Criar aula, prática com correcção, notas, favoritos de módulos, plano de estudo e relatório de simulado.
- [x] Disponibilizar a estrutura de contagem por módulo e resumo por tópico no backend, pronta para os próximos painéis visuais.
- [ ] Adicionar estados explícitos de carregamento, vazio e erro na experiência de Quiz Rápido.
- [ ] Validar no browser o fluxo completo do quiz, da configuração ao resultado persistido.

## Ampliação: TIC em Angola e Luanda

- [x] Pesquisar fontes oficiais e institucionais sobre TIC, inovação e eventos tecnológicos em Angola e Luanda.
- [x] Criar conteúdo factual e uma linha do tempo complementar para Cultura Geral → TIC em Angola.
- [x] Adicionar questões de treino verificadas sobre iniciativas, instituições, eventos e contexto de TI em Angola.
- [x] Ligar os novos conteúdos e exercícios ao módulo “TIC em Angola” na experiência de estudo e prática.
- [x] Validar o novo conteúdo no browser, na tipagem e no build de produção.

## Distribuição: GitHub e Render

- [x] Avaliar a configuração actual de servidor, autenticação e persistência para execução fora da Manus.
- [x] Criar ficheiros de configuração do Render e um modelo seguro de variáveis de ambiente.
- [x] Documentar o provisionamento de base de dados externa, migrações e os limites de compatibilidade da base Manus.
- [ ] Validar o fluxo local de cookies em um serviço Render real após configurar o domínio público e as variáveis privadas.
- [x] Executar build de produção no modo de deploy e sincronizar o código preparado com delvis1205/preparatorio.

## Acesso local e informações institucionais

- [x] Criar primeiro acesso único com nome, e-mail e palavra-passe, sem página de cadastro separada.
- [x] Guardar palavra-passe exclusivamente como hash e criar sessões locais seguras por cookie.
- [x] Substituir entradas Manus OAuth pela tela de acesso local e manter o perfil persistente.
- [x] Criar página pública de autor, contactos e apoio com os dados oficiais fornecidos.
- [x] Criar README do projeto com autoria, contactos, funcionalidades, execução local e deploy.
- [x] Capturar uma imagem actualizada da interface e disponibilizá-la no repositório.
- [x] Preparar um roteiro de deploy pós-configuração, incluindo base de dados e as variáveis privadas necessárias.

## Guia de configuração assistida

- [x] Verificar as instruções actuais do Render para Blueprints, variáveis, deploy hooks e health checks.
- [x] Documentar passo a passo a criação de uma base MySQL/TiDB externa e a obtenção de `DATABASE_URL`.
- [x] Documentar a origem, o preenchimento e a validação de cada variável de ambiente do LUANDA PREP.
- [x] Entregar o roteiro de deploy com verificações e resolução de falhas frequentes.
