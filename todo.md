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

## Guia de estudo em PDF (Exportação por módulo/aula/tema)

- [x] Criar gerador de PDF no servidor para guias de estudo com sumário, teoria, exercícios e espaço para resolução manual.
- [x] Incluir marca d’água institucional e identificação do autor (LUANDA PREP, Delvis de Morais, Morásio Digital, +244 973 929 712).
- [x] Suportar cadernos de exercícios limpos (sem respostas para resolver manualmente) e guias completos com respostas e explicações.
- [x] Adicionar botão e modal de exportação na página de estudo e na visão geral, permitindo escolher o módulo e o formato.
- [x] Validar a geração do PDF, compilação, testes unitários, salvamento de checkpoint e sincronização com o GitHub.

## Simulados em PDF e Ficha de Erros personalizada

- [x] Auditar dados de simulados e tentativas incorretas na base de dados.
- [x] Implementar em `server/pdfExport.ts` os geradores `generateSimulatedExamPdf` e `generateErrorSheetPdf`.
- [x] Atualizar o endpoint `/api/export/pdf` em `server/_core/index.ts` para suportar `type=exam` e `type=errors`.
- [x] Adicionar opções de exportação na página de Simulados, na página de Revisão e no Modal de PDF.
- [x] Elaborar a secção de instruções claras no site para que qualquer estudante saiba como exportar seus guias, exames e fichas de erros.
- [x] Validar compilação, testes, checkpoint e publicação no domínio público.

## Restauração na Manus — sessão actual
- [x] Importar e adaptar todo o código e conteúdo do repositório preparatorio ao projecto full-stack Manus
- [x] Preservar o nome LUANDA PREP e a identidade visual azul #0A36A8 e dourado #FFCC5C
- [x] Configurar autenticação Manus e sessões protegidas nas áreas pessoais
- [x] Aplicar o esquema gerido de banco para perfis, tentativas, progresso, favoritos, revisões espaçadas, simulados e planos de estudo
- [x] Restaurar e validar módulos, aulas, prática filtrável, quiz rápido, revisão, simulados, modo exame e painel de progresso
- [x] Restaurar e validar exportação autenticada de guias, provas de simulado e fichas de erros em PDF
- [x] Integrar e validar o tutor contextual LUANDA AI em aulas, módulos e questões
- [x] Usar somente variáveis e credenciais provisionadas pela Manus, sem segredos no código
- [x] Executar migrações no banco gerido da Manus
- [x] Executar validação de tipos, testes automatizados e build de produção
- [x] Verificar rotas públicas e autenticadas no preview
- [x] Salvar checkpoint final antes da publicação
- [x] Orientar a publicação da versão validada

## Pendências identificadas antes do checkpoint
- [x] Validar no preview autenticado as rotas de aulas, prática filtrável, revisão, simulados e modo exame
- [x] Validar o LUANDA AI autenticado a partir de uma aula e de uma questão, confirmando contexto e resposta
- [x] Alinhar o histórico de migrações Drizzle com o schema aplicado no banco Manus
- [x] Reexecutar a verificação manual das rotas protegidas após login Manus

## Evolução de simulados, IA e conteúdo pedagógico
- [x] Auditar todos os módulos e identificar aulas, exemplos, respostas e materiais ainda genéricos
- [x] Implementar busca textual e filtros por disciplina, módulo, tópico, dificuldade e estado na área de simulados
- [x] Persistir e apresentar histórico de conversas do LUANDA AI por estudante
- [x] Adicionar efeito de digitação acessível e cancelável às respostas do LUANDA AI
- [x] Criar painel de estatísticas diárias na página inicial autenticada, baseado na atividade real do estudante
- [x] Substituir conteúdos genéricos por materiais específicos, explicações, respostas e exercícios em todos os módulos
- [x] Cobrir as novas regras e rotas com testes, validar a interface e salvar checkpoint final
- [x] Orientar a publicação da atualização validada

## Autenticação própria e recuperação de acesso
- [x] Definir a recuperação segura por link de uso único enviado por e-mail
- [x] Configurar o serviço de e-mail transacional para o envio do link de recuperação
- [x] Adaptar o esquema de utilizador para nome, e-mail ou telefone, palavra-passe protegida e tokens de recuperação
- [x] Implementar registo com nome, e-mail ou telefone e palavra-passe no primeiro acesso
- [x] Implementar entrada e término de sessão por credenciais locais, sem OAuth Manus
- [x] Implementar solicitação, validação e redefinição de palavra-passe esquecida
- [x] Proteger as áreas pessoais com sessão local e preservar os dados existentes por utilizador
- [x] Cobrir o novo fluxo de autenticação com testes e validar no preview
- [x] Salvar checkpoint final e orientar a publicação

## Gestão de conta e experiência de credenciais
- [x] Auditar a página de perfil e os formulários locais de entrada e registo
- [x] Criar procedimentos protegidos para atualizar e-mail e telefone da conta
- [x] Criar procedimento protegido para alterar palavra-passe com confirmação da palavra-passe atual
- [x] Adicionar ao perfil uma seção de dados de acesso com atualização de e-mail e telefone
- [x] Adicionar ao perfil uma seção de alteração de palavra-passe com validação de confirmação
- [x] Melhorar estados de carregamento e mensagens de erro para entrada e registo
- [x] Cobrir os novos procedimentos e fluxos de interface com testes e validação no preview
- [x] Salvar checkpoint final e entregar a atualização

## Comunicações LUANDA PREP e aprofundamento pedagógico
- [x] Definir gatilhos imediatos por marcos e resumo semanal automático de progresso
- [x] Criar um template HTML responsivo com a identidade azul e dourada do LUANDA PREP
- [x] Atualizar o e-mail de recuperação de palavra-passe com o novo template de marca
- [x] Enviar e-mail de boas-vindas automaticamente após o registo
- [x] Implementar e-mail de progresso com métricas reais, próximo passo e CTA de retorno ao estudo
- [x] Configurar a automação semanal de progresso para e-mails de resumo
- [x] Auditar os módulos e substituir explicações, exemplos, perguntas e respostas genéricas
- [x] Adicionar geração contextual de aula com IA, sempre ancorada no conteúdo curricular do módulo
- [x] Cobrir os novos fluxos de e-mail e conteúdo com testes e validação
- [x] Salvar checkpoint final e entregar a atualização

## Aprofundamentos complementares do LUANDA AI
- [x] Modelar o armazenamento privado de aprofundamentos complementares por estudante e aula
- [x] Permitir guardar e consultar aprofundamentos no contexto de cada aula
- [x] Permitir exportar um aprofundamento guardado em formato PDF
- [x] Cobrir salvamento e exportação com testes, validação visual e publicação

## Sincronização GitHub e implantação Vercel
- [x] Auditar a configuração de execução e as variáveis necessárias fora da Manus
- [x] Adaptar as rotas de servidor e a configuração de implantação para Vercel
- [x] Sincronizar todos os arquivos atualizados no repositório GitHub conectado
- [x] Criar ou atualizar a implantação Vercel e verificar a publicação
- [x] Preparar no repositório o modelo e o roteiro para configurar no Vercel as variáveis privadas de banco, sessão, e-mail e IA

## Groq e modelos de ambiente Vercel
- [x] Auditar a integração do LUANDA AI e o estado do projeto Vercel após a alteração serverless
- [x] Migrar o LUANDA AI de OpenAI para Groq sem expor a chave de API
- [x] Criar arquivo de variáveis de exemplo e placeholders seguros para configuração no Vercel
- [x] Corrigir e validar o deploy publicado após a adaptação do provedor de IA

## Entrega de configuração externa
- [x] Documentar o único conjunto de passos manuais restantes para ativar os fluxos externos no Vercel

## Valores-modelo e Supabase no Vercel
- [x] Inspecionar a integração Supabase criada no Vercel e identificar a string de conexão correta
- [x] Preparar valores-modelo seguros para todas as variáveis de ambiente Vercel
- [x] Compatibilizar a camada de persistência com a base Supabase externa e aplicar o esquema necessário
- [x] Validar a conexão e a implantação com as novas configurações

## Correção de recuperação de acesso em produção
- [x] Diagnosticar o erro de resposta não JSON no pedido de recuperação de palavra-passe
- [x] Verificar de forma segura as variáveis de e-mail, sessão e URL pública no ambiente Vercel
- [x] Corrigir e validar o envio do link de recuperação sem expor credenciais

## Domínio dos e-mails e favicon
- [x] Configurar a URL pública canónica para links de recuperação e e-mails no domínio preparatorio.morasio.shop
- [x] Criar e aplicar favicon alinhado ao símbolo do logotipo LUANDA PREP
- [x] Validar o link enviado por e-mail e o favicon publicados no domínio personalizado

## Revisão curricular completa
- [x] Inventariar aulas, definições, exemplos, fórmulas, perguntas e respostas por módulo
- [x] Identificar e substituir conteúdos genéricos, lacunas pedagógicas e respostas sem explicação
- [x] Reestruturar prioritariamente Matemática e Língua Portuguesa com conteúdo disciplinar correto
- [x] Completar os demais módulos com conceitos, exemplos resolvidos, prática e critérios de resposta
- [x] Cobrir a revisão curricular com testes de consistência, validar a experiência de estudo e publicar a atualização

## Auditoria final de produção
- [x] Verificar o deployment Vercel, o domínio personalizado e a saúde da API em produção
- [x] Analisar erros de build e de execução relacionados à versão curricular publicada
- [x] Corrigir, publicar e retestar qualquer falha identificada
- [x] Corrigir a tipagem da entrada serverless `api/index.ts` reportada pelo build Vercel
