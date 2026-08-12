import { OFFICIAL_PDF_SUBTOPICS } from "./officialPdfSubtopics";

export type Lesson = {
  id: string;
  title: string;
  objective: string;
  officialTopics: string[];
  explanation: string;
  steps: string[];
  formula?: string;
  formulaLatex?: string;
  commonError: string;
  examTip: string;
  examples?: { title: string; prompt: string; walkthrough: string }[];
  quickCheck?: { prompt: string; answer: string };
  concepts?: { term: string; definition: string; application: string }[];
  conceptQuestions?: { prompt: string; answer: string }[];
  topicSessions?: { topic: string; focus: string; definition: string; explanation: string; example: string; checkpoint: string; answer: string; practiceAction: string }[];
};

export type DisciplineId = "matematica" | "portugues" | "cultura" | "fisica" | "quimica" | "geometria";

export type CurriculumModule = {
  id: string;
  disciplineId: DisciplineId;
  discipline: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  difficulty: "Inicial" | "Intermédio" | "Avançado";
  officialTopics: string[];
  lesson: Lesson;
};

export type TrainingQuestion = {
  id: string;
  disciplineId: CurriculumModule["disciplineId"];
  moduleId: string;
  topic: string;
  type: "multiple_choice" | "true_false" | "numeric";
  difficulty: "Inicial" | "Intermédio" | "Avançado";
  prompt: string;
  options: string[];
  correctOption: number;
  explanation: string;
  errorHint: string;
  recommendedSeconds: number;
};

const math = "Matemática";
const portuguese = "Língua Portuguesa";

export const CURRICULUM: CurriculumModule[] = [
  {
    id: "mat-polinomios", disciplineId: "matematica", discipline: math, title: "Polinómios", estimatedMinutes: 50, difficulty: "Intermédio",
    description: "Operações algébricas, divisão e o teorema que ajuda a verificar raízes.",
    officialTopics: ["Definição", "Adição e subtracção de polinómios", "Multiplicação de polinómios", "Divisão de polinómios", "Teorema de D’Alembert"],
    lesson: { id: "aula-polinomios", title: "Operar polinómios com método", objective: "Reconhecer termos semelhantes e efectuar operações com segurança.", officialTopics: ["Definição", "Adição e subtracção de polinómios", "Multiplicação de polinómios"], explanation: "Um polinómio reúne termos algébricos somados. Para somar ou subtrair, agrupamos apenas termos semelhantes; para multiplicar, cada termo do primeiro factor multiplica cada termo do segundo.", steps: ["Identifique a variável e os expoentes de cada termo.", "Agrupe termos com a mesma parte literal.", "Some ou subtraia somente os coeficientes desses termos.", "Na multiplicação, aplique a distributiva a todos os termos."], formula: "(a + b)(c + d) = ac + ad + bc + bd", formulaLatex: "(a+b)(c+d)=ac+ad+bc+bd", commonError: "Somar x² com x como se fossem termos semelhantes. Os expoentes diferentes representam termos diferentes.", examTip: "Escreva cada linha da operação: isso reduz perdas de sinal e facilita a conferência." },
  },
  {
    id: "mat-logica", disciplineId: "matematica", discipline: math, title: "Noções de Lógica Matemática", estimatedMinutes: 45, difficulty: "Inicial",
    description: "Proposições, tabelas de verdade, operações lógicas, leis de De Morgan e quantificadores.",
    officialTopics: ["Introdução à lógica bivalente", "Princípios fundamentais da lógica", "Operações lógicas elementares", "Tabela da verdade", "Leis de De Morgan", "Quantificadores"],
    lesson: { id: "aula-logica", title: "Ler uma proposição antes de calcular", objective: "Distinguir conectivos lógicos e testar a verdade de uma expressão.", officialTopics: ["Operações lógicas elementares", "Tabela da verdade", "Leis de De Morgan"], explanation: "Na lógica bivalente, uma proposição recebe valor verdadeiro ou falso. Os conectivos alteram esse valor de acordo com regras que podem ser verificadas numa tabela de verdade.", steps: ["Defina as proposições simples, como P e Q.", "Identifique o conectivo principal da expressão.", "Preencha os casos possíveis de P e Q.", "Aplique a regra do conectivo linha a linha."], formula: "¬(P ∧ Q) ≡ ¬P ∨ ¬Q", commonError: "Confundir 'e' com 'ou'. Uma conjunção exige ambas as proposições verdadeiras; uma disjunção aceita pelo menos uma verdadeira.", examTip: "Quando a frase parecer longa, reescreva-a usando P, Q e conectivos antes de decidir." },
  },
  {
    id: "mat-geometria", disciplineId: "matematica", discipline: math, title: "Geometria Analítica no Plano", estimatedMinutes: 60, difficulty: "Intermédio",
    description: "Coordenadas, vectores, distância, rectas, circunferência e domínios planos.",
    officialTopics: ["Métodos cartesianos no plano, referenciais ortogonais e monométricos", "Vectores livres", "Norma de um vector", "Distância entre dois pontos", "Equações da recta", "Declive ou coeficiente angular da recta", "Mediatriz de um segmento de recta", "Equação da circunferência", "Domínios planos"],
    lesson: { id: "aula-geometria", title: "Do ponto à distância", objective: "Aplicar a fórmula da distância entre dois pontos no plano cartesiano.", officialTopics: ["Distância entre dois pontos", "Equações da recta", "Declive ou coeficiente angular da recta"], explanation: "A distância entre dois pontos resulta da aplicação do teorema de Pitágoras às diferenças horizontal e vertical entre as coordenadas.", steps: ["Subtraia as coordenadas x dos dois pontos.", "Subtraia as coordenadas y dos dois pontos.", "Eleve as duas diferenças ao quadrado e some.", "Calcule a raiz quadrada do resultado."], formula: "d = √[(x₂ − x₁)² + (y₂ − y₁)²]", formulaLatex: "d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}", commonError: "Trocar uma coordenada x por y. Registe os pontos ordenadamente antes de substituir na fórmula.", examTip: "Faça um esboço rápido dos pontos: ele ajuda a perceber se uma distância muito pequena ou negativa faz sentido." },
  },
  {
    id: "mat-trigonometria", disciplineId: "matematica", discipline: math, title: "Trigonometria", estimatedMinutes: 55, difficulty: "Intermédio",
    description: "Razões trigonométricas, triângulos rectângulos, círculo e funções trigonométricas.",
    officialTopics: ["Razões trigonométricas de um ângulo agudo no triângulo rectângulo", "Fórmula fundamental da trigonometria", "Problemas que envolvem triângulos rectângulos", "Círculo trigonométrico", "Equações trigonométricas", "Estudo das funções trigonométricas"],
    lesson: { id: "aula-trigonometria", title: "Escolher a razão certa", objective: "Relacionar seno, cosseno e tangente aos lados de um triângulo rectângulo.", officialTopics: ["Razões trigonométricas de um ângulo agudo no triângulo rectângulo", "Problemas que envolvem triângulos rectângulos"], explanation: "As razões trigonométricas ligam um ângulo aos lados do triângulo rectângulo. A escolha depende de quais lados são conhecidos e de qual lado se procura.", steps: ["Marque o ângulo de referência.", "Identifique hipotenusa, cateto oposto e cateto adjacente.", "Escolha seno, cosseno ou tangente.", "Substitua os valores e isole a incógnita."], formula: "sen(θ) = oposto/hipotenusa; cos(θ) = adjacente/hipotenusa; tg(θ) = oposto/adjacente", formulaLatex: "\\sin(\\theta)=\\frac{oposto}{hipotenusa};\\quad \\cos(\\theta)=\\frac{adjacente}{hipotenusa};\\quad \\tan(\\theta)=\\frac{oposto}{adjacente}", commonError: "Trocar o cateto oposto pelo adjacente. Eles são definidos em relação ao ângulo escolhido.", examTip: "Antes da conta, escreva SOH–CAH–TOA ao lado do desenho." },
  },
  {
    id: "mat-sucessoes", disciplineId: "matematica", discipline: math, title: "Sucessões e Progressões", estimatedMinutes: 55, difficulty: "Intermédio",
    description: "PA, PG, termos gerais, interpolação, somas e limites de sucessões.",
    officialTopics: ["Conceito de sucessões", "Progressão aritmética (PA)", "Termo geral de uma PA", "Interpolação aritmética", "Soma dos n primeiros termos de uma PA", "Progressão geométrica (PG)", "Termo geral de uma PG", "Interpolação geométrica", "Soma dos n primeiros termos de uma PG", "Limites de sucessões"],
    lesson: { id: "aula-sucessoes", title: "Reconhecer o padrão de uma PA", objective: "Distinguir uma progressão aritmética e calcular um termo geral.", officialTopics: ["Progressão aritmética (PA)", "Termo geral de uma PA", "Soma dos n primeiros termos de uma PA"], explanation: "Numa progressão aritmética, cada termo é obtido ao adicionar uma razão constante ao termo anterior.", steps: ["Compare dois termos consecutivos.", "Confirme se a diferença é constante.", "Identifique o primeiro termo a₁ e a razão r.", "Substitua a posição n na fórmula do termo geral."], formula: "aₙ = a₁ + (n − 1)r", formulaLatex: "a_n=a_1+(n-1)r", commonError: "Usar n em vez de n − 1. A posição do primeiro termo deve devolver exactamente a₁.", examTip: "Teste a fórmula com n = 1 para verificar a montagem." },
  },
  {
    id: "mat-funcoes", disciplineId: "matematica", discipline: math, title: "Funções", estimatedMinutes: 50, difficulty: "Intermédio",
    description: "Conceito de função, domínio, contradomínio, assíntotas e representação gráfica.",
    officialTopics: ["Conceito de função", "Domínio", "Contradomínio", "Assímptotas", "Representação gráfica"],
    lesson: { id: "aula-funcoes", title: "Ler uma função como relação", objective: "Identificar domínio e imagem antes de manipular uma expressão.", officialTopics: ["Conceito de função", "Domínio", "Contradomínio", "Representação gráfica"], explanation: "Uma função associa a cada elemento do domínio exactamente um elemento do contradomínio. O domínio indica quais entradas são permitidas.", steps: ["Observe a expressão ou gráfico.", "Procure valores que tornariam a expressão impossível.", "Exclua esses valores do domínio.", "Relacione entradas permitidas e saídas obtidas."], formula: "f: A → B", commonError: "Chamar domínio ao conjunto de valores de saída. O domínio corresponde às entradas permitidas.", examTip: "Em fracções, verifique primeiro os valores que anulam o denominador." },
  },
  {
    id: "mat-limites", disciplineId: "matematica", discipline: math, title: "Limites", estimatedMinutes: 45, difficulty: "Avançado",
    description: "Continuidade, indeterminações, limites fundamentais e infinitésimos.",
    officialTopics: ["Limites e continuidades de funções", "Tipos de indeterminações", "Limites fundamentais", "Infinitésimos"],
    lesson: { id: "aula-limites", title: "Observar aproximações", objective: "Interpretar limite como valor de aproximação de uma função.", officialTopics: ["Limites e continuidades de funções", "Tipos de indeterminações"], explanation: "O limite descreve para que valor f(x) se aproxima quando x se aproxima de um ponto. Não exige, necessariamente, que a função esteja definida nesse ponto.", steps: ["Identifique o ponto de aproximação.", "Teste a substituição directa.", "Se surgir indeterminação, escolha uma técnica adequada.", "Confirme a aproximação pelos dois lados quando necessário."], commonError: "Confundir o valor da função com o limite. Eles podem ser diferentes.", examTip: "Se a substituição produzir 0/0, não conclua o resultado: reconheça a indeterminação." },
  },
  {
    id: "mat-derivadas", disciplineId: "matematica", discipline: math, title: "Derivadas", estimatedMinutes: 60, difficulty: "Avançado",
    description: "Definição, regras, regra da cadeia e aplicações da derivada.",
    officialTopics: ["Conceito de derivadas", "Definição da derivada de uma função", "Regras de derivação", "Regra da cadeia", "Aplicações das derivadas"],
    lesson: { id: "aula-derivadas", title: "Variação em cada ponto", objective: "Aplicar regras elementares de derivação a potências.", officialTopics: ["Conceito de derivadas", "Regras de derivação", "Regra da cadeia"], explanation: "A derivada mede a taxa de variação de uma função. Nas potências, a regra básica multiplica pelo expoente e reduz esse expoente em uma unidade.", steps: ["Separe os termos da função.", "Identifique cada potência de x.", "Multiplique o coeficiente pelo expoente.", "Reduza o expoente em uma unidade e simplifique."], formula: "d/dx (xⁿ) = n·xⁿ⁻¹", formulaLatex: "\\frac{d}{dx}(x^n)=n x^{n-1}", commonError: "Manter o mesmo expoente após derivar. A regra reduz o expoente em uma unidade.", examTip: "Depois de derivar, reveja constantes: a derivada de uma constante é zero." },
  },
  {
    id: "mat-integrais", disciplineId: "matematica", discipline: math, title: "Integrais", estimatedMinutes: 60, difficulty: "Avançado",
    description: "Integrais imediatas, algébricas, transcendentes, substituição, partes e áreas.",
    officialTopics: ["Definição", "Integrais imediatas", "Integrais de funções algébricas", "Integrais de funções transcendentes", "Integrais por substituição", "Integrais por partes", "Cálculo de área"],
    lesson: { id: "aula-integrais", title: "Reconhecer a operação inversa", objective: "Integrar potências simples e acrescentar a constante de integração.", officialTopics: ["Definição", "Integrais imediatas", "Integrais de funções algébricas"], explanation: "A integral indefinida procura uma família de funções cuja derivada é a expressão dada. Ao integrar uma potência, aumentamos o expoente em uma unidade e dividimos pelo novo expoente.", steps: ["Escreva a potência como xⁿ.", "Aumente o expoente para n + 1.", "Divida pelo novo expoente.", "Acrescente a constante C."], formula: "∫xⁿ dx = xⁿ⁺¹/(n + 1) + C, para n ≠ −1", formulaLatex: "\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C,\\quad n\\ne -1", commonError: "Esquecer a constante C numa integral indefinida.", examTip: "Derive rapidamente a resposta final: se recuperar a função original, a integral está consistente." },
  },
  {
    id: "pt-comunicacao", disciplineId: "portugues", discipline: portuguese, title: "Comunicação e Linguagem", estimatedMinutes: 35, difficulty: "Inicial",
    description: "Elementos de comunicação, tipos e funções da linguagem.",
    officialTopics: ["Elementos de comunicação", "Tipos de linguagem (oral e verbal)", "Funções da linguagem"],
    lesson: { id: "aula-comunicacao", title: "Quem comunica, para quem e com que intenção", objective: "Identificar elementos e funções predominantes numa situação comunicativa.", officialTopics: ["Elementos de comunicação", "Funções da linguagem"], explanation: "Uma situação de comunicação envolve emissor, receptor, mensagem, código, canal e contexto. A função predominante depende da intenção da mensagem.", steps: ["Leia a situação com atenção.", "Identifique quem envia e quem recebe a mensagem.", "Observe o foco da mensagem.", "Relacione esse foco à função de linguagem correspondente."], commonError: "Escolher uma função apenas por aparecer uma emoção. O foco central da mensagem é que orienta a resposta.", examTip: "Sublinhe palavras que indiquem ordem, emoção, explicação ou contacto antes de classificar." },
  },
  {
    id: "pt-textos", disciplineId: "portugues", discipline: portuguese, title: "Textos", estimatedMinutes: 40, difficulty: "Intermédio",
    description: "Interpretação, texto literário e não literário, e organização textual.",
    officialTopics: ["Interpretação de textos", "Texto literário e não literário", "Organização do texto"],
    lesson: { id: "aula-textos", title: "Interpretar antes de responder", objective: "Distinguir informação explícita, inferência e organização de um texto.", officialTopics: ["Interpretação de textos", "Texto literário e não literário", "Organização do texto"], explanation: "Interpretar é relacionar o que está dito, como está organizado e o que se pode concluir com apoio no texto. Uma boa resposta evita extrapolar além das evidências.", steps: ["Leia o texto uma primeira vez para compreender o tema.", "Localize palavras-chave e conectores.", "Diferencie informação explícita de inferência sustentada.", "Volte ao trecho que apoia a resposta."], commonError: "Responder com opinião pessoal quando a pergunta pede informação textual.", examTip: "Procure no enunciado verbos como 'segundo o texto' ou 'infere-se' para saber o tipo de leitura pedido." },
  },
  {
    id: "pt-gramatica", disciplineId: "portugues", discipline: portuguese, title: "Gramática", estimatedMinutes: 45, difficulty: "Intermédio",
    description: "Divisões da gramática, acentuação, pontuação, tempos e modos verbais.",
    officialTopics: ["As principais divisões da gramática", "Acentuação e pontuação", "Tempos e modos dos verbos"],
    lesson: { id: "aula-gramatica", title: "A forma também constrói sentido", objective: "Reconhecer como acentuação, pontuação e flexão verbal ajudam a construir significado.", officialTopics: ["Acentuação e pontuação", "Tempos e modos dos verbos"], explanation: "A gramática oferece regras para organizar palavras e sentidos. Pontuação e forma verbal podem modificar a clareza, o tempo e a intenção de uma frase.", steps: ["Observe a estrutura da frase.", "Identifique o verbo e o seu tempo ou modo.", "Verifique os sinais de pontuação e as pausas que criam.", "Compare o efeito de uma alteração na escrita."], commonError: "Tratar vírgula como pausa aleatória. Ela deve respeitar a estrutura da oração.", examTip: "Ao rever uma frase, encontre primeiro o verbo principal; ele organiza o restante da análise." },
  },
  {
    id: "pt-palavras", disciplineId: "portugues", discipline: portuguese, title: "Palavras", estimatedMinutes: 35, difficulty: "Inicial",
    description: "Relações fonética, gráfica e semântica; formação e classe de palavras.",
    officialTopics: ["Relação fonética e gráfica entre as palavras", "Relação semântica entre as palavras", "Formação e classe de palavras"],
    lesson: { id: "aula-palavras", title: "Ver a palavra em contexto", objective: "Relacionar forma, som, sentido e classe gramatical das palavras.", officialTopics: ["Relação fonética e gráfica entre as palavras", "Relação semântica entre as palavras", "Formação e classe de palavras"], explanation: "Palavras podem aproximar-se pelo som, pela grafia ou pelo sentido. O contexto ajuda a determinar a classe e o valor de cada uma.", steps: ["Observe a palavra dentro da frase.", "Pergunte qual papel ela exerce.", "Compare forma, som e sentido com palavras próximas.", "Verifique se há afixos ou composição na formação."], commonError: "Classificar uma palavra isoladamente sem considerar a função que desempenha na frase.", examTip: "Teste a palavra numa frase curta: o contexto torna a classe mais visível." },
  },
  {
    id: "pt-frases", disciplineId: "portugues", discipline: portuguese, title: "Frases", estimatedMinutes: 40, difficulty: "Intermédio",
    description: "Tipos e formas de frases, coordenação, subordinação e funções sintácticas.",
    officialTopics: ["Tipos e formas de frases", "Coordenação e subordinação", "Funções sintácticas dos constituintes da oração"],
    lesson: { id: "aula-frases", title: "Montar a arquitectura da oração", objective: "Reconhecer relações entre orações e funções dos constituintes.", officialTopics: ["Coordenação e subordinação", "Funções sintácticas dos constituintes da oração"], explanation: "Uma frase pode conter uma ou várias orações. A relação entre elas pode ser de independência relativa, como na coordenação, ou de dependência, como na subordinação.", steps: ["Localize os verbos para contar as orações.", "Observe conectores entre as orações.", "Verifique se uma oração depende da outra para completar o sentido.", "Identifique a função dos constituintes principais."], commonError: "Classificar pela extensão da frase. O critério é a relação sintáctica, não o tamanho.", examTip: "Circule os conectores: eles oferecem pistas rápidas sobre a relação entre orações." },
  },
  {
    id: "cg-tic-angola", disciplineId: "cultura", discipline: "Cultura Geral", title: "TIC em Angola", estimatedMinutes: 70, difficulty: "Inicial",
    description: "Instituições, conectividade, projectos estruturantes e eventos tecnológicos em Angola e Luanda.",
    officialTopics: ["Principais datas, eventos e acontecimentos relacionados com as TIC em Angola", "Instituições e regulação", "Conectividade e inclusão digital", "Eventos tecnológicos em Luanda"],
    lesson: { id: "aula-tic-angola", title: "TIC em Angola: instituições, conectividade e eventos", objective: "Relacionar acontecimentos, projectos e instituições ao desenvolvimento das TIC em Angola, com atenção aos eventos realizados em Luanda.", officialTopics: ["Principais datas, eventos e acontecimentos relacionados com as TIC em Angola", "Instituições e regulação", "Conectividade e inclusão digital", "Eventos tecnológicos em Luanda"], explanation: "Para este tema, organize a revisão em quatro blocos: instituições, conectividade, projectos e eventos. O MINTTICS formula e conduz políticas sectoriais; o INACOM regula, supervisiona e fiscaliza as comunicações electrónicas e os serviços postais. Entre os projectos e referências de revisão estão o ANGOSAT-2, o CONECTA ANGOLA, Angola Online, Andando Com as TIC/Centros Móveis e o Programa Cidadão Digital. Em Luanda, o ANGOTIC reúne fórum e exposição de TIC; a edição de 2026 foi anunciada para o Centro de Convenções de Talatona, de 11 a 13 de junho, sob o lema “Na rota da transformação digital”. Fontes de estudo: INACOM, MINTTICS e Observatório TIC do INACOM.", steps: ["Comece pelas instituições: MINTTICS define políticas e INACOM regula o sector.", "Ligue o ANGOSAT-2 e o CONECTA ANGOLA à conectividade via satélite, sobretudo em zonas remotas.", "Associe Angola Online, Centros Móveis e Cidadão Digital a inclusão e literacia digital.", "Registe o ANGOTIC como fórum e exposição de TIC em Luanda; revise local, propósito e lema.", "Use cartões de revisão com uma fonte institucional por acontecimento."], commonError: "Memorizar números ou datas sem os associar ao projecto, à instituição responsável e ao impacto esperado.", examTip: "Quando a questão mencionar Luanda, verifique se trata de evento, sede institucional ou lançamento de iniciativa. Para números de acesso, observe sempre a data de actualização da fonte." },
  },
];

function topicDefinition(topic: string, disciplineId: DisciplineId): string {
  const value = topic.toLowerCase();
  if (value.includes("projec")) return "É uma técnica de representação que transforma relações espaciais numa figura plana segundo regras geométricas.";
  if (value.includes("vector")) return "É uma entidade com direção, sentido e intensidade, representável por componentes em um referencial.";
  if (value.includes("distância")) return "É a medida não negativa da separação entre dois pontos, retas, planos ou objetos geométricos.";
  if (value.includes("polinóm")) return "É uma expressão algébrica formada pela soma de termos cujos expoentes inteiros são não negativos.";
  if (value.includes("função quadrática") || value.includes("parábola")) return "É uma relação de segundo grau cujo gráfico é uma parábola, determinada por coeficientes, vértice, eixo e zeros.";
  if (value.includes("logarit")) return "É o expoente ao qual uma base positiva deve ser elevada para produzir um número dado.";
  if (value.includes("sucess") || value.includes("progress")) return "É uma sequência ordenada de termos definida por uma regra de formação ou por uma razão constante.";
  if (value.includes("derivad")) return "É a taxa de variação instantânea de uma função e corresponde ao declive da tangente ao gráfico.";
  if (value.includes("integral") || value.includes("primitiva")) return "É uma operação que procura uma função cuja derivada recupera a expressão dada; em áreas, acumula variações.";
  if (value.includes("trigonom")) return "É o estudo das relações entre ângulos, lados e funções periódicas, como seno, cosseno e tangente.";
  if (value.includes("trabalho mecânico")) return "É a energia transferida por uma força quando ela produz deslocamento na direção da sua componente.";
  if (value.includes("energia")) return "É a grandeza associada à capacidade de produzir transformações, podendo ocorrer sob formas cinética, potencial, térmica ou elétrica.";
  if (value.includes("gás ideal")) return "É um modelo em que partículas têm volume desprezável e interações simplificadas, obedecendo aproximadamente a pV=nRT.";
  if (value.includes("termodin")) return "É a área que estuda trocas de calor, trabalho, energia interna e as leis que regem processos térmicos.";
  if (value.includes("corrente eléctrica") || value.includes("lei de ohm") || value.includes("resist")) return "É um conceito de circuitos elétricos que relaciona movimento de carga, diferença de potencial, oposição ao fluxo e energia transferida.";
  if (value.includes("newton") || value.includes("movimento") || value.includes("acelera")) return "É um tema de mecânica que descreve o movimento e relaciona forças, massa, velocidade, aceleração e interações.";
  if (value.includes("onda") || value.includes("interfer") || value.includes("difrac") || value.includes("doppler")) return "É um fenómeno de propagação de perturbações e energia, caracterizado por amplitude, frequência, período e comprimento de onda.";
  if (value.includes("magnet") || value.includes("indução") || value.includes("faraday") || value.includes("lenz")) return "É o estudo de campos magnéticos e da geração de tensão elétrica pela variação do fluxo magnético.";
  if (value.includes("equação química") || value.includes("estequiom")) return "É a representação simbólica de uma reação, usada para relacionar reagentes, produtos e suas proporções quantitativas.";
  if (value.includes("velocidade") && disciplineId === "quimica") return "É a rapidez com que reagentes são consumidos ou produtos são formados numa reação química.";
  if (value.includes("equilíbrio") && disciplineId === "quimica") return "É o estado dinâmico em que as velocidades das reações direta e inversa se igualam.";
  if (value.includes("ácido") || value.includes("ph") || value.includes("neutraliza")) return "É um tema ácido-base que estuda espécies que doam ou aceitam protões, a acidez de soluções e reações de neutralização.";
  if (value.includes("átomo") || value.includes("electrón") || value.includes("ionização")) return "É o estudo da estrutura eletrónica dos átomos, dos níveis de energia e das propriedades periódicas dos elementos.";
  if (value.includes("ligação química")) return "É a interação que mantém átomos unidos em moléculas ou redes, associada à distribuição de eletrões.";
  if (value.includes("oxidação") || value.includes("redox") || value.includes("pilha") || value.includes("electról")) return "É um processo de transferência de eletrões, estudado em reações redox, pilhas eletroquímicas e eletrólise.";
  if (value.includes("orgânic") || value.includes("hidrocarbon") || value.includes("álcool") || value.includes("amina") || value.includes("polímero")) return "É o estudo de compostos de carbono, seus grupos funcionais, reações características e aplicações.";
  if (value.includes("projecção") || value.includes("rebatimento") || value.includes("rotação") || value.includes("plano de")) return "É uma técnica da geometria descritiva usada para representar e resolver relações entre objetos e planos no espaço.";
  if (value.includes("frase") || value.includes("oração") || value.includes("concordância") || value.includes("regência") || value.includes("pronom")) return "É um tópico de sintaxe que analisa as relações entre palavras, funções dos constituintes e organização das orações.";
  if (value.includes("verbal") || value.includes("acentua") || value.includes("pontua")) return "É um tópico de gramática que organiza a forma escrita e a expressão de tempo, modo, ênfase e relações de sentido.";
  if (value.includes("literatura") || value.includes("figuras de estilo") || value.includes("neto") || value.includes("jacinto") || value.includes("pepetela")) return "É o estudo da linguagem literária, dos recursos expressivos e de autores angolanos indicados no programa.";
  return `É um tópico oficial de ${disciplineId} que deve ser compreendido pelas suas propriedades, condições de aplicação e relações com os demais conceitos do módulo.`;
}

function topicExample(topic: string, moduleTitle: string, concept: string): string {
  return `Exemplo de aplicação: numa questão que mencione ${topic}, destaque primeiro os dados, termos técnicos e condições apresentados; depois relacione-os com ${concept} e escolha o procedimento adequado a ${moduleTitle}.`;
}

function makeOfficialModule(input: { id: string; disciplineId: DisciplineId; discipline: string; title: string; description: string; topics: string[]; concept: string; definition: string; difficulty?: CurriculumModule["difficulty"]; formula?: string; formulaLatex?: string }): CurriculumModule {
  const firstTopic = input.topics[0] ?? input.title;
  const secondTopic = input.topics[1] ?? firstTopic;
  const supportingTopic = input.topics.find((topic) => topic !== input.concept) ?? secondTopic;
  return {
    id: input.id,
    disciplineId: input.disciplineId,
    discipline: input.discipline,
    title: input.title,
    description: input.description,
    estimatedMinutes: 55,
    difficulty: input.difficulty ?? "Intermédio",
    officialTopics: input.topics,
    lesson: {
      id: `aula-${input.id}`,
      title: `Fundamentos de ${input.title}`,
      objective: `Compreender os conceitos essenciais e aplicar os tópicos oficiais de ${input.title}.`,
      officialTopics: input.topics,
      explanation: input.description,
      steps: [`Comece por definir ${input.concept.toLowerCase()} com as suas próprias palavras.`, `Organize os dados, propriedades ou grandezas relevantes em ${firstTopic}.`, `Aplique o método ou relação adequado ao tópico ${secondTopic}.`, "Verifique unidades, sinais, condições e coerência do resultado antes de avançar."],
      formula: input.formula,
      formulaLatex: input.formulaLatex,
      commonError: "Aplicar uma fórmula ou regra sem antes identificar as grandezas, condições e conceitos envolvidos.",
      examTip: "Transforme cada subtema oficial numa pergunta curta de revisão e pratique explicá-lo sem consultar o resumo.",
      concepts: [
        { term: input.concept, definition: input.definition, application: `Use esta definição como ponto de partida antes de resolver exercícios de ${input.title}.` },
        { term: supportingTopic, definition: `É um dos tópicos oficiais de ${input.title} no programa de acesso.`, application: `Relacione-o com ${input.concept} e indique que dados ou propriedades devem ser usados.` },
      ],
      conceptQuestions: [
        { prompt: `Que ideia central deve ser dominada antes de resolver um problema de ${input.title}?`, answer: `${input.concept}: ${input.definition}` },
        { prompt: `Qual tópico oficial de ${input.title} deve orientar a próxima revisão?`, answer: `Revise ${firstTopic} e, em seguida, ligue-o a ${secondTopic}.` },
      ],
      topicSessions: input.topics.map((topic, index) => ({
        topic,
        focus: `Sessão ${index + 1}: ${topic}`,
        definition: topicDefinition(topic, input.disciplineId),
        explanation: `${topic} faz parte do bloco ${input.title}. Estude a definição, identifique os dados, propriedades ou relações associados e conecte-o ao conceito central de ${input.concept}.`,
        example: topicExample(topic, input.title, input.concept),
        checkpoint: `Numa questão sobre ${topic}, qual deve ser a primeira verificação?`,
        answer: `Identifique o conceito pedido, os dados e as condições do enunciado antes de selecionar uma regra ou procedimento de ${input.title}.`,
        practiceAction: `Resolva uma questão de treino de ${input.title} e explique em voz alta como ${topic} orientou a sua escolha de método.`,
      })),
      examples: [{ title: "Exemplo guiado", prompt: `Como iniciar uma questão sobre ${input.title}?`, walkthrough: `Identifique o que a questão pede, registe os dados e condições, selecione o conceito ${input.concept} e aplique o método adequado a ${firstTopic}. Por fim, confirme se o resultado respeita as unidades e as condições do problema.` }],
      quickCheck: { prompt: `Antes de resolver um exercício de ${input.title}, que dois elementos deve identificar?`, answer: `O conceito principal (${input.concept}) e os dados, condições ou propriedades fornecidos pela questão.` },
    },
  };
}

const OFFICIAL_ENGINEERING_MODULES: CurriculumModule[] = [
  makeOfficialModule({ id: "mat-geometria-espacial", disciplineId: "matematica", discipline: "Matemática", title: "Geometria no Plano e no Espaço", description: "Estratégias de resolução, sólidos, rectas, planos, projecções ortogonais e posições relativas no espaço.", topics: ["Problemas geométricos e estratégias de resolução", "Polígonos e poliedros regulares", "Representação de sólidos", "Rectas e planos no espaço", "Projecção ortogonal", "Plano mediador", "Posições relativas de rectas e planos"], concept: "Projecção ortogonal", definition: "É a representação de um ponto ou figura sobre uma recta ou plano por meio de uma perpendicular." }),
  makeOfficialModule({ id: "mat-conjuntos-condicoes", disciplineId: "matematica", discipline: "Matemática", title: "Conjuntos, Condições e Lógica", description: "Condições matemáticas, operações lógicas, conjuntos numéricos e representação de conjuntos no plano.", topics: ["Referências no plano", "Condições como expressões matemáticas", "Proposições e operações lógicas", "Conjunção e intersecção", "Disjunção e reunião", "Negação e complementação", "Leis de Morgan", "Conjuntos numéricos", "Condições em R²"], concept: "Condição matemática", definition: "É uma expressão que pode ser verdadeira ou falsa para determinados elementos de um conjunto." }),
  makeOfficialModule({ id: "mat-coordenadas-vetores-espaco", disciplineId: "matematica", discipline: "Matemática", title: "Coordenadas e Vectores no Espaço", description: "Sistema de coordenadas R³, vectores, equações vectoriais, produto escalar, perpendicularidade e intersecções no espaço.", topics: ["Sistema de coordenadas no espaço", "Conjunto R³", "Condições no espaço", "Vectores no plano e no espaço", "Equações vectoriais", "Produto escalar", "Perpendicularidade", "Intersecção de planos e rectas"], concept: "Vector", definition: "É um objecto matemático caracterizado por direção, sentido e intensidade, representável por componentes." }),
  makeOfficialModule({ id: "mat-lugares-geometricos", disciplineId: "matematica", discipline: "Matemática", title: "Distâncias e Lugares Geométricos", description: "Distância no plano e no espaço, mediatriz, circunferência, elipse, plano mediador e superfície esférica.", topics: ["Distância entre dois pontos", "Mediatriz", "Circunferência e círculo", "Elipse", "Plano mediador", "Superfície esférica e esfera"], concept: "Lugar geométrico", definition: "É o conjunto de pontos que satisfaz uma mesma condição geométrica." }),
  makeOfficialModule({ id: "mat-potencias-radicais", disciplineId: "matematica", discipline: "Matemática", title: "Potências e Radicais", description: "Potenciação com expoentes inteiros e racionais e cálculo com radicais.", topics: ["Potenciação de expoente inteiro", "Potenciação com expoente racional", "Cálculo com radicais"], concept: "Expoente racional", definition: "É um expoente fracionário que relaciona potências e raízes de um número.", formula: "a^(m/n) = ⁿ√(a^m)", formulaLatex: "a^{m/n}=\\sqrt[n]{a^m}" }),
  makeOfficialModule({ id: "mat-graficos-quadratica", disciplineId: "matematica", discipline: "Matemática", title: "Funções, Gráficos e Parábola", description: "Funções afim, linear, constante, módulo e quadrática; leitura de gráficos, vértice, zeros e inequações.", topics: ["Função como correspondência", "Funções afim, linear e constante", "Função módulo", "Extremos e transformações", "Função quadrática", "Parábola", "Eixo de simetria e vértice", "Zeros e equações do 2.º grau", "Inequações do 2.º grau"], concept: "Função quadrática", definition: "É uma função da forma ax²+bx+c, com a diferente de zero, cujo gráfico é uma parábola.", formula: "x = (−b ± √(b² − 4ac)) / 2a", formulaLatex: "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}" }),
  makeOfficialModule({ id: "mat-estatistica-inducao", disciplineId: "matematica", discipline: "Matemática", title: "Limites de Sucessões, Indução e Estatística", description: "Limites de sucessões, número de Neper, indução matemática, organização de dados, medidas e distribuição binomial.", topics: ["Limite de uma sucessão", "Número de Neper", "Indução matemática", "Conceitos básicos de estatística", "Organização e apresentação de dados", "Medidas de localização", "Medidas de dispersão", "Distribuição binomial"], concept: "Indução matemática", definition: "É um método de demonstração que prova uma afirmação num caso inicial e mostra que, se vale para n, então vale para n+1." }),
  makeOfficialModule({ id: "mat-exp-log-trig", disciplineId: "matematica", discipline: "Matemática", title: "Funções Exponenciais, Logarítmicas e Trigonométricas", description: "Funções exponenciais, logarítmicas e trigonométricas, equações e transformações de expressões.", topics: ["Funções exponenciais", "Funções logarítmicas", "Equações exponenciais e logarítmicas", "Funções trigonométricas", "Equações trigonométricas", "Transformações trigonométricas"], concept: "Logaritmo", definition: "É o expoente ao qual uma base positiva deve ser elevada para produzir um número dado.", formula: "logₐ(b) = x ⇔ aˣ = b", formulaLatex: "\\log_a(b)=x\\Leftrightarrow a^x=b" }),
  makeOfficialModule({ id: "fis-energia-trabalho", disciplineId: "fisica", discipline: "Física", title: "Trabalho, Energia e Conservação", description: "Trabalho mecânico, potência, energias cinética, potencial e mecânica, conservação e choques.", topics: ["Trabalho mecânico", "Potência", "Energia cinética", "Energia potencial gravítica e elástica", "Conservação da energia mecânica", "Forças conservativas e não conservativas", "Choques elásticos e inelásticos"], concept: "Trabalho mecânico", definition: "É a energia transferida por uma força quando produz deslocamento.", formula: "W = F·d·cos(θ)", formulaLatex: "W=F d\\cos(\\theta)" }),
  makeOfficialModule({ id: "fis-gases-termodinamica", disciplineId: "fisica", discipline: "Física", title: "Gases e Termodinâmica", description: "Gás ideal, leis dos gases, equação de Clapeyron, isoprocessos, calor, energia interna e leis da termodinâmica.", topics: ["Gás ideal", "Escala absoluta de temperatura", "Leis de Boyle, Charles e Gay-Lussac", "Equação de Clapeyron", "Isoprocessos", "Primeira e Segunda Lei da Termodinâmica", "Motor térmico e refrigerador", "Ciclo de Carnot", "Entropia", "Lei Zero"], concept: "Gás ideal", definition: "É um modelo de gás cujas partículas têm volume desprezável e interações simplificadas.", formula: "pV = nRT", formulaLatex: "pV=nRT" }),
  makeOfficialModule({ id: "fis-corrente-redes", disciplineId: "fisica", discipline: "Física", title: "Corrente Eléctrica e Redes", description: "Corrente, tensão, resistência, Lei de Ohm, potência, associações de resistências e leis de Kirchhoff.", topics: ["Corrente eléctrica", "Intensidade de corrente", "Resistência e resistividade", "Tensão", "Lei de Ohm", "Potência dissipada", "Associação de resistências", "Leis de Kirchhoff"], concept: "Corrente eléctrica", definition: "É o movimento ordenado de cargas eléctricas através de um condutor.", formula: "U = R·I", formulaLatex: "U=RI" }),
  makeOfficialModule({ id: "fis-cinematica-newton", disciplineId: "fisica", discipline: "Física", title: "Movimento, Forças e Leis de Newton", description: "Movimentos rectilíneo, circular e de queda, velocidade, aceleração, momento linear, impulso e leis de Newton.", topics: ["Movimento rectilíneo uniformemente variado", "Movimento circular", "Velocidade linear e angular", "Aceleração centrípeta", "Queda livre", "Leis de Newton", "Momento linear", "Impulso", "Conservação do momento linear"], concept: "Força resultante", definition: "É a soma vetorial das forças que atuam num corpo e determina a sua aceleração.", formula: "F = m·a", formulaLatex: "F=ma" }),
  makeOfficialModule({ id: "fis-oscilacoes-ondas-luz", disciplineId: "fisica", discipline: "Física", title: "Oscilações, Ondas e Luz", description: "Movimento harmónico, ressonância, ondas, reflexão, refracção, lentes, interferência, difracção e efeito Doppler.", topics: ["Movimento harmónico simples", "Oscilações livres, amortecidas e forçadas", "Ressonância", "Ondas progressivas", "Interferência e difracção", "Reflexão e refracção", "Lentes", "Efeito Doppler", "Polarização"], concept: "Onda", definition: "É uma perturbação que transporta energia sem transportar matéria de forma permanente.", formula: "v = λ·f", formulaLatex: "v=\\lambda f" }),
  makeOfficialModule({ id: "fis-dinamica-fluidos", disciplineId: "fisica", discipline: "Física", title: "Dinâmica e Mecânica dos Fluidos", description: "Projéteis, movimento relativo, atrito, sistemas de partículas, momento angular, hidrostática, Arquimedes e Bernoulli.", topics: ["Movimento de projéctil", "Movimento relativo", "Força de atrito", "Centro de massa", "Momento angular", "Pressão nos fluidos", "Lei de Arquimedes", "Equação de Bernoulli"], concept: "Centro de massa", definition: "É o ponto que representa a posição média ponderada da massa de um sistema.", formula: "p + ½ρv² + ρgh = constante", formulaLatex: "p+\\frac{1}{2}\\rho v^2+\\rho gh=\\text{constante}" }),
  makeOfficialModule({ id: "fis-magnetismo-inducao", disciplineId: "fisica", discipline: "Física", title: "Magnetismo e Indução Electromagnética", description: "Campo magnético, força sobre cargas, fluxo, Faraday, Lenz, transformadores, motores e geradores.", topics: ["Campo magnético B", "Campo de condutores e solenoides", "Força magnética", "Movimento de cargas em campo magnético", "Fluxo magnético", "Lei de Faraday", "Lei de Lenz", "Autoindução", "Transformadores", "Geradores e motores"], concept: "Indução electromagnética", definition: "É a produção de força eletromotriz por variação do fluxo magnético através de um circuito." }),
  makeOfficialModule({ id: "fis-ca-ondas-em", disciplineId: "fisica", discipline: "Física", title: "Corrente Alternada e Ondas Electromagnéticas", description: "Corrente alternada, impedância, circuitos RLC, oscilações, ressonância, rádio e espectro electromagnético.", topics: ["Corrente alternada sinusoidal", "Valores eficazes", "Circuitos RL, RC e RLC", "Impedância", "Oscilações electromagnéticas", "Ressonância eléctrica", "Ondas electromagnéticas", "Hipótese de Maxwell", "Experiência de Hertz", "Espectro electromagnético"], concept: "Impedância", definition: "É a oposição total que um circuito em corrente alternada oferece à passagem da corrente." }),
  makeOfficialModule({ id: "qui-equacoes-cinetica-equilibrio", disciplineId: "quimica", discipline: "Química", title: "Equações, Cinética e Equilíbrio Químico", description: "Equações químicas, cálculos, velocidade das reações, reversibilidade, equilíbrio e princípio de Le Chatelier.", topics: ["Significado de equação química", "Cálculos estequiométricos", "Velocidade das reacções", "Factores que influenciam a velocidade", "Reversibilidade", "Equilíbrio homogéneo e heterogéneo", "Princípio de Le Chatelier"], concept: "Equilíbrio químico", definition: "É o estado dinâmico em que as velocidades das reações direta e inversa são iguais." }),
  makeOfficialModule({ id: "qui-acidos-bases", disciplineId: "quimica", discipline: "Química", title: "Ácidos, Bases e pH", description: "Ácidos em solução, pH, dissociação, sais, hidróxidos e neutralização.", topics: ["Ácidos em solução aquosa", "pH e concentração de H+", "Dissociação completa e incompleta", "Ácidos polipróticos", "Sais", "Hidróxidos solúveis", "Reacções de neutralização"], concept: "pH", definition: "É uma medida logarítmica da acidez de uma solução relacionada com a concentração de iões H+.", formula: "pH = −log[H⁺]", formulaLatex: "pH=-\\log[H^+]" }),
  makeOfficialModule({ id: "qui-atomo-ligacoes", disciplineId: "quimica", discipline: "Química", title: "Estrutura Atómica e Ligações", description: "Modelo de Bohr, mecânica quântica, configuração electrónica, tabela periódica e ligações em moléculas.", topics: ["Modelo atómico de Bohr", "Estrutura electrónica", "Átomos polielectrónicos", "Espetro do hidrogénio", "Energia de ionização", "Distribuição electrónica", "Ligações diatómicas e poliatómicas"], concept: "Configuração electrónica", definition: "É a distribuição dos eletrões de um átomo pelos seus níveis e orbitais de energia." }),
  makeOfficialModule({ id: "qui-eletroquimica-coordenacao", disciplineId: "quimica", discipline: "Química", title: "Electroquímica e Compostos de Coordenação", description: "Oxidação-redução, pilhas, eletrólise, complexos, teoria de Werner, ligantes e estabilidade.", topics: ["Oxidação e redução", "Acerto de equação redox", "Pilhas electroquímicas", "Electrólise", "Iões complexos", "Teoria de Werner", "Ião central e ligante", "Geometria e estabilidade dos complexos"], concept: "Oxidação", definition: "É a perda de eletrões por uma espécie química numa reação redox." }),
  makeOfficialModule({ id: "qui-carbono-organica", disciplineId: "quimica", discipline: "Química", title: "Carbono, Silício e Química Orgânica", description: "Grupo 14, carbono, silício, vidro, cimento, hidrocarbonetos e introdução aos compostos orgânicos.", topics: ["Grupo 14", "Carbono", "Silício", "Indústria do vidro e cimento", "Hidrocarbonetos", "Compostos orgânicos"], concept: "Hidrocarboneto", definition: "É um composto orgânico formado apenas por átomos de carbono e hidrogénio." }),
  makeOfficialModule({ id: "qui-funcoes-reacoes-organicas", disciplineId: "quimica", discipline: "Química", title: "Funções e Reações Orgânicas", description: "Álcoois, aldeídos, cetonas, ácidos, éteres, ésteres, aminas, amidas, reações e polímeros.", topics: ["Álcoois", "Aldeídos e cetonas", "Ácidos carboxílicos", "Éteres e ésteres", "Aminas e amidas", "Oxidação", "Substituição", "Adição", "Esterificação", "Hidrólise", "Polímeros"], concept: "Grupo funcional", definition: "É o átomo ou conjunto de átomos responsável pelas propriedades e reatividade características de uma família orgânica." }),
  makeOfficialModule({ id: "qui-biomoleculas-solucoes", disciplineId: "quimica", discipline: "Química", title: "Biomoléculas, Forças e Soluções", description: "Aminoácidos, proteínas, glícidos, lípidos, forças intermoleculares, gases, equilíbrio líquido-vapor e propriedades coligativas.", topics: ["Aminoácidos", "Proteínas", "Glícidos", "Lípidos", "Forças intermoleculares", "Estado gasoso", "Equilíbrio líquido-vapor", "Propriedades coligativas"], concept: "Força intermolecular", definition: "É uma interação entre moléculas que influencia estados físicos, pontos de ebulição e solubilidade." }),
  makeOfficialModule({ id: "geo-projecoes", disciplineId: "geometria", discipline: "Desenho e Geometria Descritiva", title: "Projecções e Representação Espacial", description: "Geometria descritiva, múltiplas projecções ortogonais e sistemas axonométricos.", topics: ["Geometria descritiva", "Variações num sistema de projecções", "Múltipla projecção ortogonal", "Projecções axonométricas"], concept: "Projecção", definition: "É a representação plana de um objeto espacial segundo regras geométricas definidas." }),
  makeOfficialModule({ id: "geo-dupla-projecao", disciplineId: "geometria", discipline: "Desenho e Geometria Descritiva", title: "Dupla Projecção Ortogonal", description: "Organização do espaço, ponto, recta, plano, intersecções, visibilidade e representação de sólidos.", topics: ["Organização do espaço", "Representação do ponto", "Representação da recta", "Representação do plano", "Intersecção de rectas com planos", "Poliedros", "Cones e cilindros"], concept: "Dupla projecção ortogonal", definition: "É um sistema que representa objetos por projeções em dois planos perpendiculares entre si." }),
  makeOfficialModule({ id: "geo-metodos-metricos", disciplineId: "geometria", discipline: "Desenho e Geometria Descritiva", title: "Métodos Geométricos e Problemas Métricos", description: "Métodos de mudança de planos, rotação e rebatimento para resolver problemas espaciais.", topics: ["Métodos auxiliares", "Mudança dos planos de projecção", "Métodos de rotação", "Métodos de rebatimentos"], concept: "Rebatimento", definition: "É um método que roda um plano em torno de uma charneira até o fazer coincidir com um plano de projeção." }),
  makeOfficialModule({ id: "geo-formas-solidos", disciplineId: "geometria", discipline: "Desenho e Geometria Descritiva", title: "Representação de Formas e Sólidos", description: "Figuras planas em planos não paralelos e sólidos assentes em planos de topo, verticais ou de perfil.", topics: ["Figuras planas em planos não paralelos", "Método de rebatimento", "Mudança dos planos", "Circunferências em planos verticais", "Poliedros", "Sólidos em planos de topo e perfil"], concept: "Plano de projeção", definition: "É o plano de referência onde se constrói uma representação geométrica de um objeto espacial." }),
  makeOfficialModule({ id: "pt-sintaxe-regencia-discurso", disciplineId: "portugues", discipline: "Língua Portuguesa", title: "Sintaxe, Regência e Discurso", description: "Constituintes da frase, pronominalização, regência, orações, concordância, vozes e tipos de discurso.", topics: ["Constituintes da frase", "Pronominalização", "Regência nominal e verbal", "Classificação das orações", "Concordância", "Voz ativa e passiva", "Tipos de discurso"], concept: "Regência", definition: "É a relação de dependência entre palavras, especialmente entre um termo regente e o seu complemento." }),
  makeOfficialModule({ id: "pt-literatura-angolana", disciplineId: "portugues", discipline: "Língua Portuguesa", title: "Literatura e Autores Angolanos", description: "Figuras de estilo e leitura orientada de autores angolanos indicados no programa oficial.", topics: ["Figuras de estilo", "Agostinho Neto", "António Jacinto", "Manuel Rui Monteiro", "Menas Abrantes", "Óscar Ribas", "Pepetela"], concept: "Figura de estilo", definition: "É um recurso expressivo que cria efeitos de sentido e intensidade na linguagem literária." }),
];

CURRICULUM.push(...OFFICIAL_ENGINEERING_MODULES);

for (const subtopic of OFFICIAL_PDF_SUBTOPICS) {
  const module = CURRICULUM.find((item) => item.id === subtopic.moduleId);
  if (!module || module.disciplineId !== subtopic.disciplineId) {
    throw new Error(`Subtema oficial sem módulo compatível: ${subtopic.sourceId}`);
  }
  if (!module.officialTopics.includes(subtopic.sourceText)) {
    module.officialTopics.push(subtopic.sourceText);
  }
  module.lesson.officialTopics = module.officialTopics;
}

const LESSON_EXTENSIONS: Record<string, Pick<Lesson, "examples" | "quickCheck">> = {
  "aula-polinomios": { examples: [{ title: "Exemplo guiado", prompt: "Simplifique (2x² + 3x − 4) + (x² − x + 1).", walkthrough: "Agrupe termos semelhantes: 2x² + x² = 3x²; 3x − x = 2x; −4 + 1 = −3. Resultado: 3x² + 2x − 3." }], quickCheck: { prompt: "Em 4x² + 2x − x², quais termos são semelhantes?", answer: "4x² e −x² são semelhantes, pois têm a mesma variável e o mesmo expoente." } },
  "aula-logica": { examples: [{ title: "Exemplo guiado", prompt: "Negue a expressão P ∧ Q.", walkthrough: "Pela lei de De Morgan, a negação de uma conjunção troca “e” por “ou”: ¬(P ∧ Q) equivale a ¬P ∨ ¬Q." }], quickCheck: { prompt: "Se P é verdadeiro e Q é falso, P ∧ Q é verdadeiro ou falso?", answer: "É falso, porque uma conjunção só é verdadeira quando as duas proposições são verdadeiras." } },
  "aula-geometria": { examples: [{ title: "Exemplo guiado", prompt: "Calcule a distância entre A(2, 1) e B(5, 5).", walkthrough: "As diferenças são 3 e 4. Portanto d = √(3² + 4²) = √25 = 5." }], quickCheck: { prompt: "A distância entre dois pontos pode ser negativa?", answer: "Não. A distância é sempre igual ou maior que zero." } },
  "aula-trigonometria": { examples: [{ title: "Exemplo guiado", prompt: "Num triângulo rectângulo, o cateto oposto vale 6 e a hipotenusa vale 10. Determine o seno.", walkthrough: "Use seno = oposto/hipotenusa. Assim, sen(θ) = 6/10 = 3/5." }], quickCheck: { prompt: "Se conhece o cateto adjacente e a hipotenusa, qual razão deve tentar primeiro?", answer: "O cosseno, pois cos(θ) = cateto adjacente/hipotenusa." } },
  "aula-sucessoes": { examples: [{ title: "Exemplo guiado", prompt: "Numa PA com a₁ = 7 e r = 2, determine a₄.", walkthrough: "a₄ = a₁ + (4−1)r = 7 + 3×2 = 13." }], quickCheck: { prompt: "Qual é a razão da PA 5, 8, 11, 14, …?", answer: "A razão é 3, pois cada termo aumenta três unidades." } },
  "aula-funcoes": { examples: [{ title: "Exemplo guiado", prompt: "Determine uma restrição do domínio de f(x) = 4/(x + 1).", walkthrough: "O denominador não pode ser zero. Logo x + 1 ≠ 0 e x ≠ −1." }], quickCheck: { prompt: "O domínio corresponde às entradas ou às saídas de uma função?", answer: "Às entradas permitidas para a função." } },
  "aula-limites": { examples: [{ title: "Exemplo guiado", prompt: "Em (x²−4)/(x−2), a substituição em x = 2 dá 0/0. O que fazer?", walkthrough: "Factorize x²−4 = (x−2)(x+2), simplifique o factor comum e só então substitua: o limite é 4." }], quickCheck: { prompt: "0/0 é um resultado do limite?", answer: "Não. É uma indeterminação que exige outra técnica." } },
  "aula-derivadas": { examples: [{ title: "Exemplo guiado", prompt: "Derive f(x) = 4x³ − 5.", walkthrough: "A derivada de 4x³ é 12x² e a da constante −5 é zero. Portanto f'(x) = 12x²." }], quickCheck: { prompt: "Qual é a derivada de uma constante?", answer: "É zero." } },
  "aula-integrais": { examples: [{ title: "Exemplo guiado", prompt: "Calcule ∫4x³ dx.", walkthrough: "Aumente o expoente para 4 e divida pelo novo expoente: 4·x⁴/4 + C = x⁴ + C." }], quickCheck: { prompt: "O que não deve faltar numa integral indefinida?", answer: "A constante de integração C." } },
  "aula-comunicacao": { examples: [{ title: "Exemplo guiado", prompt: "Na mensagem “Entreguem o trabalho amanhã”, qual função se destaca?", walkthrough: "O foco é orientar o receptor para uma acção; predomina a função apelativa ou conativa." }], quickCheck: { prompt: "Quem recebe uma mensagem é chamado de quê?", answer: "Receptor." } },
  "aula-textos": { examples: [{ title: "Exemplo guiado", prompt: "Se o texto afirma que a biblioteca abre às 8h, o que é informação explícita?", walkthrough: "A abertura às 8h está declarada directamente no texto e não precisa de inferência." }], quickCheck: { prompt: "Uma inferência deve apoiar-se em quê?", answer: "Em pistas ou evidências presentes no próprio texto." } },
  "aula-gramatica": { examples: [{ title: "Exemplo guiado", prompt: "Compare “Vamos comer, alunos.” e “Vamos comer alunos.”", walkthrough: "A vírgula chama os alunos; sem ela, a frase muda de sentido. A pontuação organiza relações entre os termos." }], quickCheck: { prompt: "A vírgula deve ser usada apenas para representar qualquer pausa da fala?", answer: "Não. Ela deve respeitar a estrutura sintáctica da frase." } },
  "aula-palavras": { examples: [{ title: "Exemplo guiado", prompt: "Na frase “O estudo transforma”, qual é a classe de “estudo”?", walkthrough: "Neste contexto, “estudo” nomeia uma actividade e funciona como substantivo. O contexto decide a classificação." }], quickCheck: { prompt: "Por que não se deve classificar uma palavra isoladamente?", answer: "Porque a função e o sentido podem mudar conforme o contexto da frase." } },
  "aula-frases": { examples: [{ title: "Exemplo guiado", prompt: "Em “Estudei porque queria melhorar”, que relação o conector apresenta?", walkthrough: "“Porque” introduz a razão de ter estudado; a segunda oração tem valor de causa." }], quickCheck: { prompt: "Qual é uma pista rápida para reconhecer relações entre orações?", answer: "Os conectores, como porque, mas, quando e embora." } },
  "aula-tic-angola": { examples: [{ title: "Exemplo guiado", prompt: "Associe MINTTICS, INACOM e ANGOTIC às suas funções.", walkthrough: "MINTTICS formula e conduz políticas sectoriais; INACOM regula o sector; ANGOTIC é um fórum e exposição de TIC em Luanda." }], quickCheck: { prompt: "Ao estudar uma iniciativa de TIC, que três elementos devem ser associados?", answer: "O projecto ou evento, a instituição ligada a ele e o impacto ou propósito esperado." } },
};

const CONCEPTUAL_EXTENSIONS: Record<string, Pick<Lesson, "concepts" | "conceptQuestions">> = {
  "aula-polinomios": {
    concepts: [
      { term: "Termo algébrico", definition: "É cada parcela de uma expressão algébrica, formada por coeficiente, variável e eventual expoente.", application: "Antes de operar, compare a parte literal e o expoente de cada termo." },
      { term: "Polinómio", definition: "É uma soma finita de termos algébricos em que os expoentes das variáveis são inteiros não negativos.", application: "Use esta definição para distinguir expressões polinomiais de frações com variável no denominador." },
    ],
    conceptQuestions: [
      { prompt: "Por que 3x² e −5x² podem ser somados, mas 3x² e −5x não?", answer: "Os dois primeiros têm a mesma parte literal, x²; no segundo caso os expoentes são diferentes, por isso representam termos diferentes." },
      { prompt: "Qual é o coeficiente do termo −7x³?", answer: "O coeficiente é −7; x³ é a parte literal do termo." },
    ],
  },
  "aula-logica": {
    concepts: [
      { term: "Proposição", definition: "É uma frase declarativa à qual se pode atribuir valor verdadeiro ou falso.", application: "Comece por separar as proposições simples antes de analisar uma expressão lógica." },
      { term: "Conectivo lógico", definition: "É o símbolo ou palavra que liga proposições, como e, ou, não, se... então.", application: "O conectivo principal determina a última operação na tabela de verdade." },
    ],
    conceptQuestions: [
      { prompt: "A frase “Fecha a porta!” é uma proposição?", answer: "Não. É uma ordem, não uma frase declarativa que possa ser classificada como verdadeira ou falsa." },
      { prompt: "Quando P ∧ Q é verdadeira?", answer: "A conjunção é verdadeira apenas quando P e Q são ambas verdadeiras." },
    ],
  },
  "aula-geometria": {
    concepts: [
      { term: "Plano cartesiano", definition: "É um sistema de eixos perpendiculares usado para localizar pontos por pares ordenados (x, y).", application: "Escreva sempre primeiro a coordenada horizontal e depois a vertical." },
      { term: "Distância", definition: "É a medida não negativa que separa dois pontos no plano.", application: "Calcule as diferenças em x e y antes de aplicar Pitágoras." },
    ],
    conceptQuestions: [
      { prompt: "O que representa o primeiro número do ponto A(−2, 4)?", answer: "Representa a coordenada x, isto é, a posição horizontal do ponto." },
      { prompt: "Por que a fórmula da distância usa quadrados?", answer: "Porque deriva do teorema de Pitágoras e os quadrados tornam positivas as diferenças de coordenadas." },
    ],
  },
  "aula-trigonometria": {
    concepts: [
      { term: "Hipotenusa", definition: "É o lado oposto ao ângulo reto e o maior lado de um triângulo retângulo.", application: "Identifique-a antes de escolher seno ou cosseno." },
      { term: "Ângulo de referência", definition: "É o ângulo agudo em relação ao qual se definem os catetos oposto e adjacente.", application: "Mudar o ângulo de referência pode mudar qual cateto é oposto ou adjacente." },
    ],
    conceptQuestions: [
      { prompt: "O cateto oposto é sempre o mesmo lado?", answer: "Não. Ele é definido em relação ao ângulo de referência escolhido." },
      { prompt: "Qual razão usa cateto oposto e cateto adjacente?", answer: "A tangente: tg(θ) = oposto/adjacente." },
    ],
  },
  "aula-sucessoes": {
    concepts: [
      { term: "Sucessão", definition: "É uma lista ordenada de números associada às posições 1, 2, 3 e assim por diante.", application: "Observe a regra que liga um termo ao seguinte para identificar o padrão." },
      { term: "Razão de uma PA", definition: "É a diferença constante entre dois termos consecutivos de uma progressão aritmética.", application: "Subtraia termos vizinhos para confirmar se a sucessão é uma PA." },
    ],
    conceptQuestions: [
      { prompt: "A sucessão 10, 7, 4, 1 é uma PA?", answer: "Sim. A diferença entre termos consecutivos é sempre −3." },
      { prompt: "O que acontece a uma PA quando a razão é zero?", answer: "Todos os termos permanecem iguais ao primeiro termo." },
    ],
  },
  "aula-funcoes": {
    concepts: [
      { term: "Função", definition: "É uma relação que associa a cada elemento do domínio exatamente uma imagem.", application: "Verifique se cada entrada recebe uma única saída." },
      { term: "Domínio", definition: "É o conjunto de entradas para as quais uma expressão ou relação está definida.", application: "Exclua valores que anulem denominadores ou tornem raízes pares impossíveis no conjunto real." },
    ],
    conceptQuestions: [
      { prompt: "Uma mesma entrada pode ter duas imagens numa função?", answer: "Não. Cada elemento do domínio deve ter exatamente uma imagem." },
      { prompt: "Por que x = 3 não pertence ao domínio de 1/(x−3)?", answer: "Porque nesse valor o denominador seria zero e a divisão não estaria definida." },
    ],
  },
  "aula-limites": {
    concepts: [
      { term: "Limite", definition: "É o valor de aproximação de uma função quando a variável se aproxima de determinado ponto.", application: "Analise o comportamento próximo do ponto, não apenas o valor no próprio ponto." },
      { term: "Indeterminação", definition: "É uma forma como 0/0 que não determina sozinha o resultado de um limite.", application: "Factorize, simplifique ou use outra técnica antes de concluir." },
    ],
    conceptQuestions: [
      { prompt: "O limite pode existir se a função não estiver definida no ponto?", answer: "Sim. O limite depende da aproximação ao ponto, não necessariamente do valor nele." },
      { prompt: "O que indica encontrar 0/0 por substituição direta?", answer: "Indica que é preciso transformar a expressão; não é o resultado do limite." },
    ],
  },
  "aula-derivadas": {
    concepts: [
      { term: "Derivada", definition: "É a medida da taxa de variação instantânea de uma função.", application: "Use-a para interpretar crescimento, declive de tangentes e taxas de mudança." },
      { term: "Regra da potência", definition: "Para xⁿ, a derivada é n·xⁿ⁻¹.", application: "Aplique-a termo a termo em polinómios." },
    ],
    conceptQuestions: [
      { prompt: "O que representa geometricamente a derivada num ponto?", answer: "Representa o declive da reta tangente ao gráfico da função nesse ponto." },
      { prompt: "Qual é a derivada de 9?", answer: "É zero, pois uma constante não varia." },
    ],
  },
  "aula-integrais": {
    concepts: [
      { term: "Primitiva", definition: "É uma função cuja derivada recupera a expressão que se pretende integrar.", application: "Verifique uma integral derivando a resposta encontrada." },
      { term: "Constante de integração", definition: "É o termo C acrescentado a integrais indefinidas porque constantes desaparecem ao derivar.", application: "Nunca omita C quando a integral não tiver limites de integração." },
    ],
    conceptQuestions: [
      { prompt: "Por que integrais indefinidas têm + C?", answer: "Porque várias funções que diferem por uma constante têm a mesma derivada." },
      { prompt: "Qual operação ajuda a confirmar uma integral?", answer: "Derivar a resposta para verificar se se recupera a função original." },
    ],
  },
  "aula-comunicacao": {
    concepts: [
      { term: "Emissor e receptor", definition: "O emissor produz a mensagem e o receptor a interpreta ou recebe.", application: "Identifique esses papéis no contexto antes de classificar a comunicação." },
      { term: "Função da linguagem", definition: "É a finalidade predominante da mensagem, como informar, emocionar, convencer ou manter contacto.", application: "Observe em que elemento da comunicação a mensagem concentra a atenção." },
    ],
    conceptQuestions: [
      { prompt: "Que elemento permite que emissor e receptor compreendam os mesmos sinais?", answer: "O código, como a língua portuguesa ou um sistema de sinais partilhado." },
      { prompt: "Uma mensagem que procura convencer o destinatário destaca qual função?", answer: "A função apelativa ou conativa." },
    ],
  },
  "aula-textos": {
    concepts: [
      { term: "Informação explícita", definition: "É a informação declarada diretamente no texto.", application: "Localize-a e confirme o trecho antes de responder." },
      { term: "Inferência", definition: "É uma conclusão construída a partir de pistas textuais, sem ultrapassar as evidências.", application: "Justifique a inferência com palavras, conectores ou fatos do texto." },
    ],
    conceptQuestions: [
      { prompt: "Qual a diferença entre opinião e inferência?", answer: "A inferência é sustentada pelo texto; a opinião pode não ter apoio nas evidências apresentadas." },
      { prompt: "Por que os conectores ajudam na interpretação?", answer: "Eles mostram relações como causa, oposição, consequência e conclusão entre ideias." },
    ],
  },
  "aula-gramatica": {
    concepts: [
      { term: "Pontuação", definition: "É o conjunto de sinais que organiza relações sintáticas, pausas e sentidos na escrita.", application: "Leia a estrutura da oração antes de inserir vírgulas ou outros sinais." },
      { term: "Modo verbal", definition: "É a forma que expressa a atitude do falante perante a ação, como certeza, ordem ou hipótese.", application: "Observe a intenção da frase ao distinguir indicativo, imperativo e conjuntivo." },
    ],
    conceptQuestions: [
      { prompt: "Uma vírgula deve separar sujeito e verbo?", answer: "Em regra, não; sujeito e verbo formam uma unidade essencial da oração." },
      { prompt: "Que modo verbal aparece em “Estuda para o exame”?", answer: "O imperativo, pois a frase exprime uma orientação ou ordem." },
    ],
  },
  "aula-palavras": {
    concepts: [
      { term: "Classe de palavras", definition: "É a categoria gramatical de uma palavra, como substantivo, verbo, adjetivo ou advérbio.", application: "Classifique pela função exercida no contexto, não apenas pela forma." },
      { term: "Relação semântica", definition: "É a relação de sentido entre palavras, como sinonímia, antonímia ou polissemia.", application: "Use o contexto para decidir qual sentido uma palavra assume." },
    ],
    conceptQuestions: [
      { prompt: "Por que “estudo” pode mudar de classe conforme a frase?", answer: "Porque uma mesma forma pode nomear uma atividade ou indicar a ação de estudar, dependendo do contexto." },
      { prompt: "O que caracteriza duas palavras sinónimas?", answer: "Elas têm sentidos próximos em determinado contexto, embora nem sempre possam ser trocadas em qualquer frase." },
    ],
  },
  "aula-frases": {
    concepts: [
      { term: "Oração", definition: "É um enunciado organizado em torno de um verbo ou locução verbal.", application: "Conte os verbos para começar a identificar as orações de um período." },
      { term: "Subordinação", definition: "É a relação em que uma oração depende sintaticamente de outra para completar ou precisar o sentido.", application: "Observe conectores e pergunte se uma oração exerce função na outra." },
    ],
    conceptQuestions: [
      { prompt: "O que ajuda a identificar quantas orações há num período?", answer: "A identificação dos verbos ou locuções verbais." },
      { prompt: "Na coordenação, as orações são necessariamente dependentes?", answer: "Não. A coordenação liga orações relativamente independentes." },
    ],
  },
  "aula-tic-angola": {
    concepts: [
      { term: "Política pública de TIC", definition: "É o conjunto de orientações e iniciativas que promove o desenvolvimento digital de um país.", application: "Associe a política à instituição responsável e ao objetivo social ou económico." },
      { term: "Regulação das comunicações", definition: "É a supervisão das regras e do funcionamento do sector das comunicações eletrónicas e serviços postais.", application: "Diferencie regulador, projeto de conectividade e evento tecnológico nas questões." },
    ],
    conceptQuestions: [
      { prompt: "Qual a diferença entre MINTTICS e INACOM no estudo do sector?", answer: "O MINTTICS conduz políticas sectoriais; o INACOM regula, supervisiona e fiscaliza o mercado das comunicações." },
      { prompt: "Por que relacionar um projeto de TIC ao seu impacto é importante?", answer: "Porque questões de Cultura Geral avaliam não só o nome do projeto, mas também sua finalidade, público e contributo para inclusão ou conectividade." },
    ],
  },
};

for (const module of CURRICULUM) {
  Object.assign(module.lesson, LESSON_EXTENSIONS[module.lesson.id]);
  Object.assign(module.lesson, CONCEPTUAL_EXTENSIONS[module.lesson.id]);
  const concepts = module.lesson.concepts ?? [];
  const questions = module.lesson.conceptQuestions ?? [];
  if (questions.length) {
    module.lesson.examples = [
      ...(module.lesson.examples ?? []),
      ...questions.map((question, index) => ({
        title: `Pergunta de compreensão ${index + 1}`,
        prompt: question.prompt,
        walkthrough: `Resposta explicada: ${question.answer}`,
      })),
    ];
  }

  const existingSessions = new Map((module.lesson.topicSessions ?? []).map((session) => [session.topic, session]));
  module.lesson.topicSessions = module.officialTopics.map((topic, index) => existingSessions.get(topic) ?? ({
    topic,
    focus: `Sessão ${index + 1}: ${topic}`,
    definition: topicDefinition(topic, module.disciplineId),
    explanation: `${topic} integra o módulo ${module.title}. Relacione a definição com o objetivo da aula e identifique as condições ou propriedades que uma questão pode fornecer.`,
    example: topicExample(topic, module.title, module.lesson.concepts?.[0]?.term ?? module.title),
    checkpoint: `Qual conceito, regra ou relação deve ser identificado primeiro numa questão sobre ${topic}?`,
    answer: `Comece pela definição de ${topic}, recolha os dados do enunciado e confirme quais condições permitem aplicar o procedimento do módulo ${module.title}.`,
    practiceAction: `Resolva uma questão de treino de ${module.title}, indicando em que passo utilizou ${topic}.`,
  }));
}

export const TRAINING_QUESTIONS: TrainingQuestion[] = [
  { id: "q-pol-1", disciplineId: "matematica", moduleId: "mat-polinomios", topic: "Adição e subtracção de polinómios", type: "multiple_choice", difficulty: "Inicial", prompt: "Qual é o resultado de (3x² + 2x − 1) + (x² − 5x + 4)?", options: ["4x² − 3x + 3", "4x² + 7x − 5", "3x² − 3x + 3", "4x² − 3x − 5"], correctOption: 0, explanation: "Somamos termos semelhantes: 3x² + x² = 4x²; 2x − 5x = −3x; −1 + 4 = 3.", errorHint: "Agrupe os termos por expoente antes de somar os coeficientes.", recommendedSeconds: 90 },
  { id: "q-log-1", disciplineId: "matematica", moduleId: "mat-logica", topic: "Leis de De Morgan", type: "multiple_choice", difficulty: "Intermédio", prompt: "Qual expressão é equivalente a ¬(P ∧ Q)?", options: ["¬P ∧ ¬Q", "¬P ∨ ¬Q", "P ∨ Q", "P ∧ ¬Q"], correctOption: 1, explanation: "Pela lei de De Morgan, a negação de uma conjunção é a disjunção das negações.", errorHint: "Ao negar 'e', o conectivo transforma-se em 'ou'.", recommendedSeconds: 60 },
  { id: "q-geo-1", disciplineId: "matematica", moduleId: "mat-geometria", topic: "Distância entre dois pontos", type: "multiple_choice", difficulty: "Intermédio", prompt: "Qual é a distância entre A(1, 2) e B(4, 6)?", options: ["3", "4", "5", "7"], correctOption: 2, explanation: "d = √[(4−1)² + (6−2)²] = √(9 + 16) = 5.", errorHint: "Calcule primeiro as diferenças em x e y, depois aplique a raiz quadrada.", recommendedSeconds: 90 },
  { id: "q-trig-1", disciplineId: "matematica", moduleId: "mat-trigonometria", topic: "Razões trigonométricas", type: "multiple_choice", difficulty: "Inicial", prompt: "Num triângulo rectângulo, se o cateto oposto mede 3 e a hipotenusa mede 5, qual é o seno do ângulo de referência?", options: ["3/5", "5/3", "3/2", "2/5"], correctOption: 0, explanation: "O seno é o cateto oposto dividido pela hipotenusa: 3/5.", errorHint: "Lembre-se: seno = oposto / hipotenusa.", recommendedSeconds: 60 },
  { id: "q-pa-1", disciplineId: "matematica", moduleId: "mat-sucessoes", topic: "Termo geral de uma PA", type: "numeric", difficulty: "Intermédio", prompt: "Numa PA com a₁ = 4 e razão r = 3, qual é o 5.º termo?", options: ["13", "16", "19", "20"], correctOption: 1, explanation: "a₅ = 4 + (5−1)×3 = 4 + 12 = 16.", errorHint: "Use n − 1 na fórmula do termo geral da PA.", recommendedSeconds: 75 },
  { id: "q-func-1", disciplineId: "matematica", moduleId: "mat-funcoes", topic: "Domínio", type: "multiple_choice", difficulty: "Intermédio", prompt: "Qual valor deve ser excluído do domínio de f(x) = 1/(x − 2)?", options: ["0", "1", "2", "−2"], correctOption: 2, explanation: "O denominador não pode ser zero. Logo, x − 2 ≠ 0 e x ≠ 2.", errorHint: "Procure o valor que anula o denominador.", recommendedSeconds: 60 },
  { id: "q-lim-1", disciplineId: "matematica", moduleId: "mat-limites", topic: "Indeterminações", type: "true_false", difficulty: "Inicial", prompt: "Verdadeiro ou falso: obter 0/0 numa substituição directa significa que o limite é igual a zero.", options: ["Verdadeiro", "Falso"], correctOption: 1, explanation: "0/0 é uma indeterminação; é preciso transformar a expressão ou aplicar outra técnica antes de concluir.", errorHint: "Uma indeterminação não é um resultado final.", recommendedSeconds: 45 },
  { id: "q-der-1", disciplineId: "matematica", moduleId: "mat-derivadas", topic: "Regras de derivação", type: "multiple_choice", difficulty: "Intermédio", prompt: "Qual é a derivada de f(x) = 3x²?", options: ["3x", "6x", "6x²", "x³"], correctOption: 1, explanation: "Pela regra da potência, 3×2×x^(2−1) = 6x.", errorHint: "Multiplique o coeficiente pelo expoente e diminua o expoente em uma unidade.", recommendedSeconds: 45 },
  { id: "q-int-1", disciplineId: "matematica", moduleId: "mat-integrais", topic: "Integrais imediatas", type: "multiple_choice", difficulty: "Intermédio", prompt: "Qual é uma primitiva de 2x?", options: ["x² + C", "2x² + C", "x + C", "2 + C"], correctOption: 0, explanation: "A derivada de x² é 2x; por isso ∫2x dx = x² + C.", errorHint: "Verifique a resposta derivando-a.", recommendedSeconds: 60 },
  { id: "q-com-1", disciplineId: "portugues", moduleId: "pt-comunicacao", topic: "Elementos de comunicação", type: "multiple_choice", difficulty: "Inicial", prompt: "Numa mensagem enviada por uma professora a uma turma, quem é o receptor?", options: ["A professora", "A turma", "A mensagem", "O canal"], correctOption: 1, explanation: "O receptor é quem recebe a mensagem. Neste caso, é a turma.", errorHint: "Pergunte: quem recebe a informação?", recommendedSeconds: 40 },
  { id: "q-text-1", disciplineId: "portugues", moduleId: "pt-textos", topic: "Interpretação de textos", type: "multiple_choice", difficulty: "Inicial", prompt: "Quando uma resposta deve ser dada 'segundo o texto', qual atitude é mais adequada?", options: ["Responder apenas com opinião pessoal", "Procurar evidências no próprio texto", "Ignorar os conectores", "Escolher a alternativa mais longa"], correctOption: 1, explanation: "A formulação exige uma resposta apoiada nas informações e pistas do texto.", errorHint: "Volte ao trecho que fundamenta a resposta.", recommendedSeconds: 45 },
  { id: "q-gram-1", disciplineId: "portugues", moduleId: "pt-gramatica", topic: "Pontuação", type: "true_false", difficulty: "Inicial", prompt: "Verdadeiro ou falso: a pontuação pode alterar a clareza e o sentido de uma frase.", options: ["Verdadeiro", "Falso"], correctOption: 0, explanation: "Os sinais de pontuação organizam pausas, relações e intenções na escrita.", errorHint: "Compare frases iguais com pontuação diferente para perceber o efeito.", recommendedSeconds: 40 },
  { id: "q-pal-1", disciplineId: "portugues", moduleId: "pt-palavras", topic: "Classe de palavras", type: "multiple_choice", difficulty: "Inicial", prompt: "Para identificar a classe de uma palavra numa questão, o primeiro passo mais seguro é:", options: ["Olhar apenas a última letra", "Observar o contexto da frase", "Escolher a classe mais comum", "Ignorar o verbo"], correctOption: 1, explanation: "A função e o sentido da palavra dependem do contexto em que ela aparece.", errorHint: "Uma mesma forma pode desempenhar papéis diferentes conforme a frase.", recommendedSeconds: 45 },
  { id: "q-frase-1", disciplineId: "portugues", moduleId: "pt-frases", topic: "Coordenação e subordinação", type: "multiple_choice", difficulty: "Intermédio", prompt: "Qual elemento costuma oferecer uma pista importante sobre a relação entre orações?", options: ["A cor do texto", "O número de linhas", "Os conectores", "O tamanho da margem"], correctOption: 2, explanation: "Conectores como 'porque', 'mas' e 'quando' ajudam a identificar relações sintácticas e de sentido.", errorHint: "Circule palavras que unem as orações antes de classificar.", recommendedSeconds: 45 },
  { id: "q-tic-1", disciplineId: "cultura", moduleId: "cg-tic-angola", topic: "TIC em Angola", type: "multiple_choice", difficulty: "Inicial", prompt: "Qual tema de Cultura Geral é indicado no programa oficial fornecido?", options: ["História da arte europeia", "Datas, eventos e acontecimentos relacionados com as TIC em Angola", "Programação em Java", "Contabilidade financeira"], correctOption: 1, explanation: "O programa indica explicitamente as principais datas, eventos e acontecimentos relacionados com as TIC em Angola.", errorHint: "Volte ao enunciado do tema de Cultura Geral no programa.", recommendedSeconds: 45 },
  { id: "q-tic-2", disciplineId: "cultura", moduleId: "cg-tic-angola", topic: "Instituições e regulação", type: "multiple_choice", difficulty: "Inicial", prompt: "Qual instituição regula, supervisiona e fiscaliza o mercado das comunicações electrónicas e os serviços postais em Angola?", options: ["INACOM", "ANGOTIC", "ANGOSAT-2", "Cidadão Digital"], correctOption: 0, explanation: "O INACOM apresenta essa função institucional no sector das comunicações electrónicas e serviços postais. Fonte de estudo: INACOM.", errorHint: "Diferencie instituição reguladora de evento, satélite ou programa.", recommendedSeconds: 50 },
  { id: "q-tic-3", disciplineId: "cultura", moduleId: "cg-tic-angola", topic: "Eventos tecnológicos em Luanda", type: "multiple_choice", difficulty: "Intermédio", prompt: "O ANGOTIC é melhor descrito como:", options: ["Um satélite de comunicações", "Um fórum e exposição de TIC", "Uma operadora móvel", "Um regulador de telecomunicações"], correctOption: 1, explanation: "O MINTTICS descreve o ANGOTIC como combinação de fórum e exposição global de TIC voltada à transformação digital e ao networking tecnológico.", errorHint: "Observe se a opção descreve um evento, uma infraestrutura ou uma instituição.", recommendedSeconds: 50 },
  { id: "q-tic-4", disciplineId: "cultura", moduleId: "cg-tic-angola", topic: "Eventos tecnológicos em Luanda", type: "multiple_choice", difficulty: "Intermédio", prompt: "Segundo o anúncio institucional do ANGOTIC 2026, em que local de Luanda estava prevista a realização do evento?", options: ["Centro de Convenções de Talatona", "Aeroporto Internacional Dr. António Agostinho Neto", "Palácio de Ferro", "Porto de Luanda"], correctOption: 0, explanation: "A INACOM informou que o Angola ICT Forum 2026 decorreria no Centro de Convenções de Talatona, em Luanda, de 11 a 13 de junho.", errorHint: "Relacione o ANGOTIC ao Centro de Convenções de Talatona, não a equipamentos de transporte ou património cultural.", recommendedSeconds: 60 },
  { id: "q-tic-5", disciplineId: "cultura", moduleId: "cg-tic-angola", topic: "Conectividade e inclusão digital", type: "multiple_choice", difficulty: "Intermédio", prompt: "O CONECTA ANGOLA comercial está associado principalmente à exploração das capacidades de qual infraestrutura?", options: ["ANGOSAT-2", "ANGOTIC", "INACOM", "Livro Branco das TIC"], correctOption: 0, explanation: "A comunicação institucional indica que o CONECTA ANGOLA comercial explora capacidades do ANGOSAT-2 para reforçar a conectividade via satélite.", errorHint: "Procure a infraestrutura espacial associada à expansão de serviços de comunicação.", recommendedSeconds: 55 },
  { id: "q-tic-6", disciplineId: "cultura", moduleId: "cg-tic-angola", topic: "Conectividade e inclusão digital", type: "true_false", difficulty: "Inicial", prompt: "Verdadeiro ou falso: a versão social do CONECTA ANGOLA é apresentada como iniciativa para levar gratuitamente serviços de comunicação a zonas de difícil acesso.", options: ["Verdadeiro", "Falso"], correctOption: 0, explanation: "Segundo a INACOM, a versão social deverá prosseguir levando gratuitamente serviços de comunicação a zonas de difícil acesso.", errorHint: "A finalidade destacada é inclusão e conectividade em áreas remotas.", recommendedSeconds: 45 },
  { id: "q-tic-7", disciplineId: "cultura", moduleId: "cg-tic-angola", topic: "Projectos estruturantes", type: "multiple_choice", difficulty: "Intermédio", prompt: "Qual é um objectivo associado ao projecto Angola Online, segundo o MINTTICS?", options: ["Inserir jovens na vida digital e apoiar acesso a cultura e empreendedorismo", "Regular tarifas de telefonia móvel", "Lançar satélites geoestacionários", "Organizar o ANGOTIC"], correctOption: 0, explanation: "O MINTTICS enquadra Angola Online na inserção dos jovens na vida digital, com uso das TIC para acesso à cultura e ao empreendedorismo.", errorHint: "Associe Angola Online a inclusão e uso das tecnologias por jovens.", recommendedSeconds: 55 },
  { id: "q-tic-8", disciplineId: "cultura", moduleId: "cg-tic-angola", topic: "Projectos estruturantes", type: "multiple_choice", difficulty: "Intermédio", prompt: "O projecto Andando Com as TIC/Centros Móveis utiliza sobretudo que formato para levar formação informática a escolas e comunidades?", options: ["Salas de aula móveis com computadores e energia solar", "Cabos submarinos privados", "Uma rede exclusiva de televisão", "Satélites meteorológicos"], correctOption: 0, explanation: "O MINTTICS descreve o projecto como salas de aula móveis, com computadores alimentados por energia solar, destinadas a escolas e comunidades sem esses recursos.", errorHint: "A expressão “Centros Móveis” indica mobilidade e formação, não uma infraestrutura fixa de telecomunicações.", recommendedSeconds: 60 },
  { id: "q-tic-9", disciplineId: "cultura", moduleId: "cg-tic-angola", topic: "Indicadores do sector", type: "multiple_choice", difficulty: "Avançado", prompt: "O Observatório TIC do INACOM apresentava, com dados actualizados até 31 de dezembro de 2025, qual total aproximado de acessos à internet fixa e móvel em Angola?", options: ["1,8 milhão", "18,1 milhões", "28,5 milhões", "181 milhões"], correctOption: 1, explanation: "O Observatório TIC apresentou 18,1 milhões de acessos à internet, somando internet fixa e móvel, com atualização indicada até 31/12/2025.", errorHint: "Não confunda o total de acessos à internet com o indicador de telefonia.", recommendedSeconds: 65 },
  { id: "q-pol-2", disciplineId: "matematica", moduleId: "mat-polinomios", topic: "Multiplicação de polinómios", type: "multiple_choice", difficulty: "Intermédio", prompt: "Qual é o resultado de x(x + 3)?", options: ["x² + 3", "x² + 3x", "2x + 3", "x² + 3x²"], correctOption: 1, explanation: "Pela propriedade distributiva, x multiplica cada termo: x·x = x² e x·3 = 3x.", errorHint: "Distribua o factor externo por todos os termos do parêntesis.", recommendedSeconds: 50 },
  { id: "q-log-2", disciplineId: "matematica", moduleId: "mat-logica", topic: "Tabela da verdade", type: "true_false", difficulty: "Inicial", prompt: "Verdadeiro ou falso: numa conjunção P ∧ Q, o resultado só é verdadeiro se P e Q forem verdadeiros.", options: ["Verdadeiro", "Falso"], correctOption: 0, explanation: "A conjunção exige que as duas proposições tenham valor verdadeiro.", errorHint: "Lembre-se de que o conectivo 'e' é exigente: ambos os lados precisam ser verdadeiros.", recommendedSeconds: 40 },
  { id: "q-geo-2", disciplineId: "matematica", moduleId: "mat-geometria", topic: "Declive", type: "multiple_choice", difficulty: "Intermédio", prompt: "Qual é o declive da recta que passa por (1, 2) e (3, 6)?", options: ["1", "2", "3", "4"], correctOption: 1, explanation: "m = (6−2)/(3−1) = 4/2 = 2.", errorHint: "Calcule primeiro a variação em y e depois divida pela variação em x.", recommendedSeconds: 75 },
  { id: "q-trig-2", disciplineId: "matematica", moduleId: "mat-trigonometria", topic: "Fórmula fundamental", type: "multiple_choice", difficulty: "Avançado", prompt: "Se sen(θ) = 3/5 e θ é agudo, qual é cos(θ)?", options: ["3/5", "4/5", "5/3", "2/5"], correctOption: 1, explanation: "Pela identidade sen²θ + cos²θ = 1: cos²θ = 1 − 9/25 = 16/25, logo cosθ = 4/5.", errorHint: "Use a fórmula fundamental e lembre-se de que o cosseno de ângulo agudo é positivo.", recommendedSeconds: 100 },
  { id: "q-func-2", disciplineId: "matematica", moduleId: "mat-funcoes", topic: "Domínio", type: "multiple_choice", difficulty: "Avançado", prompt: "Qual é o domínio real de f(x) = √(x − 4)?", options: ["x > 4", "x ≥ 4", "x ≤ 4", "Todos os reais"], correctOption: 1, explanation: "Para a raiz quadrada real existir, x − 4 deve ser maior ou igual a zero.", errorHint: "Imponha que a expressão dentro da raiz seja não negativa.", recommendedSeconds: 65 },
  { id: "q-der-2", disciplineId: "matematica", moduleId: "mat-derivadas", topic: "Regras de derivação", type: "multiple_choice", difficulty: "Avançado", prompt: "Qual é a derivada de f(x) = 5x³ − 2x?", options: ["15x² − 2", "5x² − 2", "15x³ − 2", "15x²"], correctOption: 0, explanation: "A derivada de 5x³ é 15x² e a derivada de −2x é −2.", errorHint: "Derive cada termo separadamente e trate x como x¹.", recommendedSeconds: 70 },
  { id: "q-int-2", disciplineId: "matematica", moduleId: "mat-integrais", topic: "Integrais imediatas", type: "multiple_choice", difficulty: "Avançado", prompt: "Qual é a integral indefinida de 3x²?", options: ["x³ + C", "3x³ + C", "6x + C", "x² + C"], correctOption: 0, explanation: "Ao integrar 3x², aumente o expoente para 3 e divida por 3: 3·x³/3 = x³, acrescentando C.", errorHint: "Aumente o expoente e divida pelo novo expoente antes de simplificar.", recommendedSeconds: 70 },
  { id: "q-text-2", disciplineId: "portugues", moduleId: "pt-textos", topic: "Informação explícita e inferência", type: "multiple_choice", difficulty: "Intermédio", prompt: "Uma inferência bem construída numa interpretação de texto deve:", options: ["Contradizer o texto", "Basear-se em pistas do texto", "Ignorar o título", "Ser apenas uma opinião pessoal"], correctOption: 1, explanation: "Uma inferência vai além da frase literal, mas precisa de evidências e pistas do próprio texto.", errorHint: "Pergunte sempre: que trecho sustenta esta conclusão?", recommendedSeconds: 55 },
  { id: "q-gram-2", disciplineId: "portugues", moduleId: "pt-gramatica", topic: "Tempos verbais", type: "multiple_choice", difficulty: "Intermédio", prompt: "Na frase “Amanhã estudarei matemática”, o verbo indica principalmente:", options: ["Acção passada", "Acção presente", "Acção futura", "Uma ordem"], correctOption: 2, explanation: "“Estudarei” está no futuro do presente e aponta para uma acção que ainda ocorrerá.", errorHint: "Observe a terminação verbal e o marcador temporal “amanhã”.", recommendedSeconds: 45 },
  { id: "q-frase-2", disciplineId: "portugues", moduleId: "pt-frases", topic: "Coordenação e subordinação", type: "multiple_choice", difficulty: "Avançado", prompt: "Em “Estudei porque queria melhorar”, a oração introduzida por “porque” expressa:", options: ["Causa", "Oposição", "Conclusão", "Condição"], correctOption: 0, explanation: "O conector “porque” apresenta a razão ou causa de ter estudado.", errorHint: "Relacione a segunda oração à pergunta “por que estudei?”.", recommendedSeconds: 55 },
  { id: "q-tic-10", disciplineId: "cultura", moduleId: "cg-tic-angola", topic: "Instituições e regulação", type: "multiple_choice", difficulty: "Avançado", prompt: "Qual associação está correcta no contexto das TIC em Angola?", options: ["MINTTICS — formula e conduz políticas sectoriais; INACOM — regula o sector", "ANGOTIC — regula operadoras; INACOM — organiza satélites", "ANGOSAT-2 — é um fórum de TIC", "Cidadão Digital — é o regulador postal"], correctOption: 0, explanation: "O MINTTICS conduz políticas do sector e o INACOM regula, supervisiona e fiscaliza comunicações electrónicas e serviços postais.", errorHint: "Diferencie quem formula política de quem regula o mercado.", recommendedSeconds: 70 },
];

TRAINING_QUESTIONS.push(...OFFICIAL_ENGINEERING_MODULES.flatMap((module) => {
  const primaryTopic = module.officialTopics[0] ?? module.title;
  const secondaryTopic = module.officialTopics[1] ?? primaryTopic;
  return [
    {
      id: `q-${module.id}-fundamentos`,
      disciplineId: module.disciplineId,
      moduleId: module.id,
      topic: primaryTopic,
      type: "multiple_choice" as const,
      difficulty: module.difficulty,
      prompt: `Ao iniciar uma questão sobre ${module.title}, qual é a atitude mais adequada?`,
      options: [
        `Identificar o conceito principal e relacionar os dados com ${primaryTopic}.`,
        "Aplicar a primeira fórmula lembrada, sem ler as condições.",
        "Ignorar unidades, relações e termos técnicos do enunciado.",
        "Escolher uma resposta apenas pela extensão do texto.",
      ],
      correctOption: 0,
      explanation: `O estudo de ${module.title} deve começar pela identificação do conceito e dos dados relevantes, com atenção especial a ${primaryTopic}.`,
      errorHint: `Reveja a definição principal e organize os dados antes de aplicar uma regra de ${module.title}.`,
      recommendedSeconds: 55,
    },
    {
      id: `q-${module.id}-revisao`,
      disciplineId: module.disciplineId,
      moduleId: module.id,
      topic: secondaryTopic,
      type: "true_false" as const,
      difficulty: "Inicial" as const,
      prompt: `Verdadeiro ou falso: rever ${primaryTopic} antes de aplicar ${secondaryTopic} ajuda a organizar a resolução de uma questão de ${module.title}.`,
      options: ["Verdadeiro", "Falso"],
      correctOption: 0,
      explanation: `Verdadeiro. A revisão de conceitos e tópicos relacionados permite selecionar métodos e dados com mais segurança.`,
      errorHint: `Use a sequência conceito → dados → método → verificação ao resolver questões deste módulo.`,
      recommendedSeconds: 40,
    },
  ];
}));

TRAINING_QUESTIONS.push(...CURRICULUM.flatMap((module) => module.officialTopics.map((topic, index): TrainingQuestion => ({
  id: `q-${module.id}-topico-${index + 1}`,
  disciplineId: module.disciplineId,
  moduleId: module.id,
  topic,
  type: "multiple_choice",
  difficulty: index % 3 === 0 ? "Inicial" : index % 3 === 1 ? "Intermédio" : "Avançado",
  prompt: `Ao estudar o tópico “${topic}” no módulo ${module.title}, qual procedimento mostra uma preparação mais adequada?`,
  options: [
    `Definir o conceito, identificar os dados ou propriedades relevantes e justificar o método escolhido.`,
    "Memorizar uma fórmula isolada sem verificar quando ela se aplica.",
    "Ignorar as condições do enunciado e escolher uma resposta por aproximação.",
    "Repetir uma regra sem relacioná-la ao tópico apresentado.",
  ],
  correctOption: 0,
  explanation: `A preparação para ${topic} exige compreender o conceito, ler as condições e selecionar um método compatível com os dados da questão.`,
  errorHint: `Volte à sessão “${topic}”, identifique a ideia central e só depois escolha uma regra, fórmula ou procedimento.`,
  recommendedSeconds: 50,
}))));

export type OfficialPdfCoverage = {
  sourceId: string;
  sourceReference: string;
  sourceText: string;
  disciplineId: DisciplineId;
  discipline: string;
  moduleId: string;
  moduleTitle: string;
  topic: string;
  lessonId: string;
  questionId: string;
};

// Matriz canónica 1:1: cada linha do PDF possui identificador estável, módulo,
// sessão temática e questão de treino associados de forma exacta.
export const OFFICIAL_PDF_COVERAGE: OfficialPdfCoverage[] = OFFICIAL_PDF_SUBTOPICS.map((subtopic) => {
  const module = CURRICULUM.find((item) => item.id === subtopic.moduleId);
  const question = TRAINING_QUESTIONS.find((item) => item.moduleId === subtopic.moduleId && item.topic === subtopic.sourceText);
  if (!module || !question) throw new Error(`Cobertura canónica incompleta: ${subtopic.sourceId}`);
  return {
    sourceId: subtopic.sourceId,
    sourceReference: subtopic.sourceReference,
    sourceText: subtopic.sourceText,
    disciplineId: module.disciplineId,
    discipline: module.discipline,
    moduleId: module.id,
    moduleTitle: module.title,
    topic: subtopic.sourceText,
    lessonId: module.lesson.id,
    questionId: question.id,
  };
});

export function getModule(moduleId: string) {
  return CURRICULUM.find((module) => module.id === moduleId);
}

export function getQuestion(questionId: string) {
  return TRAINING_QUESTIONS.find((question) => question.id === questionId);
}

export function withoutAnswers(question: TrainingQuestion) {
  const { correctOption: _correctOption, explanation: _explanation, errorHint: _errorHint, ...publicQuestion } = question;
  return publicQuestion;
}
