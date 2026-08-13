# LUANDA PREP — plano de implementação

## Conteúdo e arquitectura

- [x] Reestruturar a arquitectura do produto para uma plataforma de estudo full-stack, não uma landing page institucional.
- [x] Usar o nome LUANDA PREP e o subtítulo oficial do plano em toda a experiência principal.
- [x] Organizar a estrutura curricular oficial do PDF em disciplina → módulo → tópico → aula → exemplos → exercícios → quiz → revisão.
- [x] Manter separado e identificado qualquer conteúdo complementar que não venha do PDF.

## Conta e progresso

- [x] Adicionar autenticação simples com nome, email e palavra-passe.
- [x] Persistir progresso, módulos, respostas, pontuações, favoritos, anotações, tempo e histórico de simulados.
- [x] Construir dashboard com progresso geral, acerto, sequência, pontos fortes, pontos fracos e próxima acção.
- [x] Adicionar ao dashboard uma métrica explícita de sequência de estudo e destaques visíveis de pontos fortes e pontos fracos.
- [x] Validar no browser o dashboard com sequência, pontos fortes, pontos fracos e próxima acção visíveis ao estudante.

## Aprendizagem

- [x] Expor a contagem de exercícios por módulo directamente na listagem de estudo.
- [x] Exibir na listagem de estudo a contagem agregada de questões por disciplina e validá-la no browser.
- [x] Criar aula didáctica com conceito, explicação, exemplos, fórmulas, erros comuns, dicas e mini quiz.
- [x] Renderizar equações matemáticas e mostrar resoluções passo a passo.

## Prática e avaliação

- [x] Criar banco de questões com múltipla escolha, verdadeiro/falso, resposta numérica e resposta curta.
- [x] Mostrar correcção detalhada, explicação do erro, nova tentativa, favorito e inclusão na revisão.
- [x] Criar filtros por disciplina, módulo, tópico, dificuldade, erros, favoritos e não respondidas.
- [x] Implementar quizzes configuráveis e resultados com recomendações.
- [x] Implementar “Meus Erros” com sessão de prática dedicada.
- [x] Implementar revisão recomendada e revisão espaçada básica.
- [x] Implementar simulados com cronómetro, navegação, marcação e confirmação antes de finalizar.
- [x] Implementar Modo Exame sem respostas, explicações ou tutor durante a prova.
- [x] Expor no relatório visual do simulado o resumo agregado por tópico, além de disciplina, tempo, erros e recomendação.

## LUANDA AI

- [x] Criar tutor contextual que conduz o raciocínio antes de entregar a solução.
- [x] Passar contexto de aula e questão para o tutor quando o estudante pedir ajuda.
- [x] Criar gerador de exercícios por disciplina, assunto, dificuldade e quantidade.
- [x] Guardar histórico de conversas quando a integração estiver disponível.

## Qualidade

- [x] Resolver os conflitos do upgrade full-stack e confirmar auth, tRPC e base de dados operacionais.
- [x] Criar em código a estrutura curricular persistente derivada do PDF e ligá-la à experiência de estudo.
- [x] Validar fluxos de login, estudo, resposta, revisão, quiz, simulado e tutor.
- [x] Validar responsividade mobile, estados vazios, acessibilidade, foco e feedback de erro.
- [x] Confirmar build de produção e preparar checkpoint antes da publicação pela UI.

## Concluído com a arquitectura da plataforma

- [x] Integrar autenticação Manus OAuth em vez de armazenar palavras-passe próprias.
- [x] Criar uma landing pública, dashboard autenticado e navegação persistente de estudante.
- [x] Criar o banco inicial de módulos e 15 questões de treino, identificadas como não oficiais.
- [x] Criar aula, prática com correcção, notas, favoritos de módulos, plano de estudo e relatório de simulado.
- [x] Disponibilizar a estrutura de contagem por módulo e resumo por tópico no backend, pronta para os próximos painéis visuais.
- [x] Adicionar estados explícitos de carregamento, vazio e erro na experiência de Quiz Rápido.
- [x] Validar no browser o fluxo completo do quiz, da configuração ao resultado persistido.

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
- [x] Encerrar a validação de cookies no Render sem execução, pois a hospedagem escolhida para a versão operacional é a Manus.
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

## Deploy gratuito sem Blueprint

- [x] Verificar o fluxo actual de criação manual de um Web Service gratuito no Render.
- [x] Criar um guia alternativo com campos de repositório, branch, comandos e variáveis preenchidos manualmente.
- [x] Orientar a utilização segura dos dados TiDB Cloud já criados pelo utilizador sem solicitar a senha no chat.

## Bloqueio no Render

- [x] Registar que o bloqueio “This action is not allowed” deixou de ser impeditivo porque o projecto foi mantido na Manus.
- [x] Encerrar a orientação de verificação do Render por decisão de não prosseguir com esse deploy.
- [x] Definir a Manus como alternativa operacional gratuita escolhida para o projecto após o bloqueio do Render.

## Alternativa gratuita de hospedagem

- [x] Encerrar a pesquisa de backend alternativo, mantendo servidor e base de dados na configuração Manus já operacional.
- [x] Registar que a comparação de alternativas deixou de ser necessária após a escolha da Manus como hospedagem operacional.
- [x] Manter a opção recomendada na Manus sem migração adicional da base de dados.

## Correção de login na Manus

- [x] Diagnosticar o bloqueio “JWT_SECRET não está configurado com segurança” no primeiro acesso.
- [x] Corrigir a sessão local para usar de forma segura o segredo exclusivo gerenciado pela Manus.
- [x] Validar no site publicado a exibição do primeiro acesso sem erro de segredo.
- [x] Validar no site publicado a criação automática do perfil com nome, e-mail e palavra-passe e confirmar o redirecionamento e a sessão.
- [x] Validar no site publicado o logout e o novo login com a mesma conta, confirmando limpeza do cookie, retorno à tela de entrada e restauração da sessão sem erros.

## Expansão pedagógica

- [x] Migrar ou regenerar planos persistidos para garantir o novo ciclo semanal também aos estudantes com plano antigo.
- [x] Ampliar as aulas com exemplos adicionais, erros frequentes e verificação rápida de aprendizagem.
- [x] Implementar desafios por disciplina além dos níveis globais, com seleção clara de Matemática, Língua Portuguesa e Cultura Geral.
- [x] Criar desafios de recuperação a partir de erros e tópicos com domínio baixo.
- [x] Exibir recomendações de próximo passo e acesso aos desafios no plano de estudo.
- [x] Adicionar lógica persistente de desafio diário, com rotação por data e conclusão visível ao estudante.
- [x] Validar visualmente e por testes o novo ciclo de estudo, desafio e revisão.
- [x] Validar no domínio publicado uma aula enriquecida e confirmar visualmente o exemplo guiado e a verificação rápida; os desafios por disciplina e o desafio diário já foram confirmados.

## Domínio personalizado

- [x] Associação de preparatorio.morasio.shop suspensa a pedido do utilizador.
- [x] Configuração DNS suspensa a pedido do utilizador.
- [x] Validação HTTPS do domínio personalizado adiada a pedido do utilizador.

## Aulas completas por sessão

- [x] Incluir definições e conceitos fundamentais em todos os módulos, além de exercícios de treino.
- [x] Adicionar perguntas de compreensão com resposta explicada em cada aula.
- [x] Exibir na interface uma sequência pedagógica clara: conceito → definição → exemplo → pergunta → exercício.
- [x] Validar conteúdo, tipagem, testes e visualização de aulas das três disciplinas.

## Preparatório de Engenharia Informática

- [x] Analisar integralmente o PDF exactas.pdf e mapear cada disciplina, tema e subtema do programa oficial.
- [x] Atualizar títulos, mensagens públicas e navegação para Preparatório de Engenharia Informática.
- [x] Exibir a autoria: Delvis de Morais, projeto Morásio Digital, contacto 973 929 712 e o caráter gratuito da plataforma.
- [x] Criar as aulas e os módulos ausentes identificados no PDF, preservando e aprofundando os conteúdos existentes.
- [x] Acrescentar definições, conceitos, exemplos, perguntas de compreensão e questões de treino a cada tópico novo ou revisto.
- [x] Validar todo o currículo contra o PDF, executar testes e publicar a versão final funcional.
- [x] Validar módulo a módulo o exactas.pdf contra server/content.ts, registando explicitamente cada tema e subtema coberto.
- [x] Desdobrar os módulos agregados em aulas e tópicos específicos sempre que necessário para representar os subtemas do PDF.
- [x] Garantir definições, exemplos, perguntas de compreensão e questões de treino para cada tópico oficial novo, e não apenas por módulo agregado.
- [x] Validar tema a tema e subtema a subtema o exactas.pdf contra server/content.ts, registando cobertura explícita de cada item do programa oficial.
- [x] Atualizar docs/cobertura_exactas.md com uma matriz exaustiva por subtema oficial, não apenas por blocos agregados.
- [x] Adicionar asserções que comprovem cobertura curricular completa por subtema oficial, além de build e publicação.

## Melhoria de navegação mobile

- [x] Tornar o botão do menu lateral mobile claramente visível com contraste, rótulo e área de toque adequados.
- [x] Garantir que o painel lateral móvel apresenta fundo opaco, título de navegação e nomes completos das disciplinas e secções.
- [x] Validar o menu mobile em smartphone e o layout de navegação em desktop após a correcção.
- [x] Publicar a correcção mobile e sincronizar a versão actualizada no repositório.
- [x] Rever sugestões de evolução da experiência e priorizar melhorias futuras sem inventar dados de utilizadores.

## Novos recursos: Partilha e Gráfico de Tempo de Estudo

- [x] Implementar componente de partilha rápida com link da plataforma e mensagens prontas para WhatsApp e redes sociais.
- [x] Adicionar o botão de convite visível na barra lateral e na visão geral do estudante.
- [x] Implementar o gráfico de estatísticas semanais de tempo de estudo no painel de progresso com base na actividade real.
- [x] Validar a compilação, executar os testes e guardar um checkpoint com os novos recursos.
- [x] Sincronizar o repositório GitHub e confirmar o funcionamento publicado.
- [x] Verificar no domínio público publicado que o botão de partilha aparece na visão geral e na barra lateral após o checkpoint 6a72fb38.
- [x] Validar no domínio público o gráfico semanal de tempo de estudo na página de progresso após a publicação.
- [x] Implementar e comprovar na UI de prática os filtros por módulo, dificuldade e erros, além de disciplina, tópico, favoritos e não respondidas.
- [x] Ligar explicitamente os botões de ajuda das aulas e das questões ao LUANDA AI com moduleId e questionId preenchidos.
- [x] Adicionar ou comprovar no Quiz Rápido estados explícitos de carregamento, vazio e erro, com validação no browser do fluxo completo.
- [x] Ligar explicitamente o botão ou acção de ajuda da página de aula ao LUANDA AI com moduleId preenchido e validar esse percurso no browser.
- [x] Se existir ajuda contextual a partir de exercícios dentro da aula, enviar também questionId quando aplicável.
- [x] Validar no browser o botão de ajuda da página de aula, confirmando navegação para /app/ia?module=... e abertura do LUANDA AI com contexto do módulo activo.
- [x] Validar no browser o fluxo completo do LUANDA AI: abrir a partir da aula ou questão com contexto, enviar uma mensagem e confirmar a resposta do tutor sem erro.
- [x] Após validar a conversa do LUANDA AI, confirmar a validação integrada de login, estudo, resposta, revisão, quiz, simulado e tutor.
