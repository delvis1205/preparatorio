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
};

export type CurriculumModule = {
  id: string;
  disciplineId: "matematica" | "portugues" | "cultura";
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
    id: "cg-tic-angola", disciplineId: "cultura", discipline: "Cultura Geral", title: "TIC em Angola", estimatedMinutes: 40, difficulty: "Inicial",
    description: "Datas, eventos e acontecimentos relacionados com as TIC em Angola.",
    officialTopics: ["Principais datas, eventos e acontecimentos relacionados com as TIC em Angola"],
    lesson: { id: "aula-tic-angola", title: "Construir uma linha do tempo de TIC", objective: "Organizar a revisão de datas, eventos e acontecimentos do tema oficial.", officialTopics: ["Principais datas, eventos e acontecimentos relacionados com as TIC em Angola"], explanation: "O tema exige revisão contextual e organizada. Use uma linha do tempo pessoal para ligar datas, eventos, instituições e impactos sem confundir factos ou períodos.", steps: ["Separe as referências por período.", "Registe o acontecimento e a sua relevância.", "Associe cada item ao contexto das TIC em Angola.", "Revise em intervalos curtos usando perguntas de recordação."], commonError: "Memorizar datas isoladas sem associá-las a acontecimentos e contexto.", examTip: "Crie cartões de revisão com data de um lado e acontecimento do outro." },
  },
];

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
];

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
