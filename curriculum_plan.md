# LUANDA PREP — estrutura curricular e regras pedagógicas

## Posicionamento do produto

O LUANDA PREP será uma plataforma independente de preparação para o exame de admissão em **Informática de Gestão**, e não um site oficial da UNILUANDA nem uma promessa de aprovação. O produto deverá responder continuamente às perguntas do estudante: o que estudar agora, como está, onde erra e qual é o próximo passo recomendado.

## Conteúdo oficial identificado no PDF

| Disciplina | Módulos oficiais | Transformação na plataforma |
| --- | --- | --- |
| Matemática | Polinómios; Lógica Matemática; Geometria Analítica; Trigonometria; Sucessões e Progressões; Funções; Limites; Derivadas; Integrais | Módulo → tópicos oficiais → aula didáctica → exemplos complementares → questões de treino → revisão |
| Língua Portuguesa | Comunicação e Linguagem; Textos; Gramática; Palavras; Frases | Módulo → tópicos oficiais → aula didáctica → questões de treino → mini quiz |
| Cultura Geral | Datas, eventos e acontecimentos relacionados com as TIC em Angola | Módulo → referências de estudo → questões de treino contextualizadas → revisão |

O PDF define os tópicos e a hierarquia curricular, mas não contém enunciados de provas, gabaritos ou questões oficiais. Por isso, todo exercício, exemplo, quiz e simulado criado pela plataforma será explicitamente rotulado como **Questão de treino** ou **Conteúdo complementar**, nunca como questão oficial.

## Lógica de aprendizagem

O percurso obrigatório do produto será: **Aprender → Praticar → Corrigir → Entender o erro → Revisar → Repetir → Simular → Melhorar**. O domínio não será calculado apenas por aulas abertas; usará tentativas, taxa de acerto, dificuldade, revisão e recência de estudo.

## Limite e escolha técnica de autenticação

O ambiente disponibiliza autenticação segura via Manus OAuth e sessão por cookie, sem necessidade de armazenar palavras-passe. A primeira versão usará este fluxo, associado a um perfil editável do estudante, para garantir persistência entre dispositivos sem criar uma implementação paralela de credenciais.

## Escopo funcional da primeira versão

A primeira versão utilizável deverá permitir entrada segura, definição de perfil, navegação por disciplinas, leitura de aulas, resolução e correcção de exercícios, quizzes, área de erros, revisão, simulado com cronómetro, progresso persistente, plano de estudo e LUANDA AI contextual. A arquitectura de dados também prevê favoritos, notas, conversas e conteúdo administrável posteriormente.
