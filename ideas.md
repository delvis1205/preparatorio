# Direção visual do site

## Abordagens consideradas

### Abordagem 1 — Editorial académico atlântico

Uma identidade institucional contemporânea que combina azul profundo, marfim e dourado suave, com tipografia editorial e composição assimétrica inspirada em capas de programas universitários. A sensação é de rigor, orientação e confiança, sem parecer burocrática.

**Probability:** 0.06

### Abordagem 2 — Caderno de estudo modular

Uma linguagem mais táctil e pedagógica, baseada em folhas, marcações, cartões de revisão e pequenos sinais de progresso. O resultado seria mais próximo de uma ferramenta de estudo individual do que de um portal institucional.

**Probability:** 0.03

### Abordagem 3 — Observatório de preparação

Uma interface escura e tecnológica, com mapas de tópicos, linhas de ligação e acentos luminosos para transmitir uma visão de percurso e desempenho. É expressiva, mas pode afastar-se da solenidade do documento oficial.

**Probability:** 0.08

## Direção escolhida — Editorial académico atlântico

### Design Movement

**Modernismo editorial institucional**, reinterpretado para um contexto académico angolano: grelhas de publicação, títulos serifados, barras de navegação compactas, grandes áreas de respiro e detalhes geométricos que fazem referência a diagramas matemáticos e ao desenho de um selo universitário.

### Core Principles

1. **Rigor visível:** a hierarquia deve permitir localizar qualquer capítulo rapidamente, preservando a organização do PDF.
2. **Calor institucional:** o azul académico será equilibrado por marfim e dourado, para que a experiência seja acolhedora sem perder autoridade.
3. **Assimetria funcional:** o layout usa blocos deslocados, uma régua lateral de progresso e painéis editoriais; não dependerá de uma composição centralizada genérica.
4. **Leitura em camadas:** a página apresenta primeiro a visão geral e depois permite aprofundar cada disciplina em accordions e cartões de tópicos.

### Color Philosophy

O **azul Luanda** comunica estabilidade, confiança e concentração; o **marfim papel** aproxima a interface do carácter documental do programa; o **dourado selo** ecoa a identidade institucional sem transformar o site numa reprodução literal do PDF; e o **coral terracota** será usado apenas como sinal de progresso ou acção. A paleta deve parecer impressa, não digitalmente saturada.

### Layout Paradigm

Uma página longa com uma **faixa editorial de abertura**: navegação lateral discreta, hero dividido entre narrativa e índice numérico, seguido por uma linha de progresso que atravessa as três áreas do exame. As disciplinas entram como secções em offset, com uma coluna de meta-informação e uma coluna maior de conteúdo expansível. No mobile, a régua lateral transforma-se em um carrossel horizontal de etapas.

### Signature Elements

- **Régua de percurso:** um traço vertical/horizontal com capítulos numerados e marcadores activos.
- **Selo em linha:** uma marca circular com “UL” em negativo, repetida no cabeçalho e no rodapé como assinatura.
- **Microdiagramas:** linhas finas, pontos e arcos matemáticos como textura de fundo, sempre com baixo contraste.

### Interaction Philosophy

As interacções devem parecer uma orientação cuidadosa, não um jogo. O utilizador abre apenas o bloco que precisa, filtra por disciplina e pode marcar um capítulo como revisto localmente no navegador. Cada acção fornece resposta curta e clara; nada se move sem necessidade.

### Animation

A entrada do hero deve revelar texto e régua em sequência curta, com deslocamentos pequenos e opacidade. Os cartões de disciplina elevam-se dois a quatro pixels no hover, enquanto as linhas dos microdiagramas podem fazer um traço subtil ao entrar no viewport. Accordions devem abrir em menos de 260 ms e respeitar `prefers-reduced-motion`.

### Typography System

- **Display:** `DM Serif Display`, para títulos de grande escala e nomes de secção.
- **Interface:** `Manrope`, para navegação, métricas, botões e texto corrido.
- **Hierarquia:** eyebrow em caixa alta com tracking amplo; H1 em clamp(3.4rem, 8vw, 7.4rem); H2 entre 2.4rem e 4rem; corpo com largura controlada e line-height confortável; números de capítulo em peso 800.

### Brand Essence

**Um guia de preparação para candidatos ao exame de acesso, construído sobre o programa académico oficial e pensado para transformar um documento denso em um percurso claro.**

Personalidade: **rigorosa, acolhedora, orientadora**.

### Brand Voice

Os títulos são directos e confiantes, os CTAs são verbos de orientação e o microcopy reduz a ansiedade com instruções práticas. Evitar slogans vazios e promessas de aprovação.

Exemplos:

> **Veja o que precisa dominar antes de entrar na sala.**

> **Escolha uma área e comece pelo próximo capítulo.**

### Wordmark & Logo

O logotipo será um selo geométrico com as iniciais **UL** construídas por duas hastes paralelas e um arco aberto, acompanhado de uma linha horizontal fina. A marca funcionará sem texto em tamanhos pequenos e será combinada com o wordmark institucional em tipografia serifada apenas no cabeçalho.

### Signature Brand Color

**Azul Luanda — `#0D4F73`**, um azul petróleo luminoso o suficiente para interfaces claras e profundo o bastante para funcionar como assinatura institucional.

## Regra de decisão

Cada escolha de interface deve responder positivamente à pergunta: **“Isto torna o programa mais claro, confiável e navegável, ou apenas adiciona decoração?”**

## Style Decisions

- O selo geométrico UL é a assinatura visual principal e deve reaparecer no cabeçalho, no hero, nos painéis editoriais e no rodapé.
- A régua numerada é o sistema de navegação transversal: liga áreas, capítulos e estados de revisão por meio de linhas finas e marcadores.
- Terracota fica reservada para progresso e feedback de acção; superfícies informativas usam azul Luanda, marfim e dourado discreto.
