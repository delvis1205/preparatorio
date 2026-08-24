import type { DisciplineId } from "./content";

export type TopicGuide = {
  definition: string;
  explanation: string;
  example: string;
  checkpoint: string;
  answer: string;
  practiceAction: string;
  formula?: string;
  formulaLatex?: string;
};

export type TopicGuideContext = {
  moduleId: string;
  moduleTitle: string;
  disciplineId: DisciplineId;
  topic: string;
  moduleDescription: string;
};

const normalized = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase();

const guide = (definition: string, explanation: string, example: string, checkpoint: string, answer: string, practiceAction: string, formula?: string, formulaLatex?: string): TopicGuide => ({ definition, explanation, example, checkpoint, answer, practiceAction, formula, formulaLatex });

const canonicalTopic = (value: string) => normalized(value)
  .replace(/coes\b/g, "cao")
  .replace(/oes\b/g, "ao")
  .replace(/ais\b/g, "al");

const topicMatches = (topic: string, expressions: string[]) => {
  const source = normalized(topic);
  const canonicalSource = canonicalTopic(topic);
  return expressions.some((expression) => source.includes(normalized(expression)) || canonicalSource.includes(canonicalTopic(expression)));
};

function mathematicsGuide(context: TopicGuideContext): TopicGuide | undefined {
const topic = normalized(context.topic);
  if (topicMatches(topic, ["polinom", "termo semelhante"]) || context.moduleId === "mat-polinomios") return guide(
    "Polinómio é uma soma finita de monómios com expoentes inteiros não negativos; termos semelhantes têm a mesma parte literal e o mesmo expoente.",
    "Na adição e na subtracção só se combinam termos semelhantes. Na multiplicação, use a distributiva e, para potências de mesma base, some os expoentes.",
    "Em (2x² − 3x + 1) + (x² + 5x − 4), agrupe x², x e constantes: obtém-se 3x² + 2x − 3.",
    "Quais termos podem ser reduzidos juntos em 4x³ − 2x + 7x³?",
    "4x³ e 7x³ são semelhantes; somam-se para 11x³. O termo −2x permanece porque tem expoente diferente.",
    "Reescreva cada polinómio em ordem decrescente de expoentes antes de operar.",
  );
  if (topicMatches(topic, ["d alembert", "dalembert", "raiz de um polinomio", "divisao de polinom"])) return guide(
    "Pelo teorema do resto, o resto da divisão de P(x) por x − a é P(a); portanto a é raiz de P quando P(a)=0.",
    "Substitua a no polinómio para testar uma raiz. Se o valor for zero, x−a é factor e a divisão pode prosseguir por Briot-Ruffini ou divisão algébrica.",
    "Para P(x)=x²−5x+6, P(2)=4−10+6=0; logo 2 é raiz e x−2 é factor.",
    "Que cálculo decide se 3 é raiz de P(x)?",
    "Calcule P(3). Se P(3)=0, 3 é raiz; se não, 3 não é raiz.",
    "Teste candidatos inteiros e confirme a fatorização multiplicando novamente os factores.",
    "Resto de P(x) por (x−a) = P(a)",
    "\text{resto}=P(a)",
  );
  if (topicMatches(topic, ["proposic", "logica bivalente", "principio fundamental", "principios fundamentais"]) || context.moduleId === "mat-logica") return guide(
    "Proposição é uma frase declarativa que admite exatamente um valor lógico: verdadeiro ou falso.",
    "Ordens, perguntas e frases abertas não são proposições enquanto a variável não receber valor. Os princípios de identidade, não contradição e terceiro excluído sustentam a lógica bivalente.",
    "“Luanda é a capital de Angola” é uma proposição verdadeira; “x > 3” só se torna proposição depois de fixar x.",
    "A frase “Fecha a janela!” pode entrar numa tabela de verdade?",
    "Não. É uma ordem e não possui valor de verdade; uma tabela usa proposições declarativas.",
    "Classifique primeiro cada frase como declarativa, interrogativa, imperativa ou aberta.",
  );
  if (topicMatches(topic, ["conjuncao", "disjuncao", "negacao", "operacoes logicas", "tabela da verdade", "leis de morgan", "quantificador"])) return guide(
    "Conjunção P ∧ Q exige duas proposições verdadeiras; disjunção inclusiva P ∨ Q exige ao menos uma; a negação ¬P inverte o valor lógico.",
    "Construa a tabela com todas as combinações de P e Q. Nas leis de De Morgan, negar uma conjunção troca “e” por “ou”, e negar uma disjunção troca “ou” por “e”. Quantificadores indicam existência (∃) ou universalidade (∀).",
    "Se P é verdadeira e Q é falsa, P ∧ Q é falsa, P ∨ Q é verdadeira e ¬Q é verdadeira.",
    "Qual equivalência representa ¬(P ∨ Q)?",
    "¬(P ∨ Q) equivale a ¬P ∧ ¬Q, pela lei de De Morgan.",
    "Faça quatro linhas para P e Q e calcule as colunas internas antes do conectivo principal.",
    "¬(P ∨ Q) ≡ ¬P ∧ ¬Q",
    "\neg(P\lor Q)\equiv\neg P\land\neg Q",
  );
  if (topicMatches(topic, ["conjunto", "interseccao", "reuniao", "complement", "condicoes em r", "condicoes como"])) return guide(
    "Conjunto é uma coleção de elementos; união reúne elementos de A ou B, intersecção reúne os que pertencem simultaneamente a A e B, e complemento reúne os elementos do universo fora de A.",
    "Traduza conectivos: “e” costuma indicar intersecção, “ou” união e “não” complemento. Em condições no plano, transforme cada desigualdade numa região e procure a intersecção das restrições.",
    "Se A={1,2,3} e B={3,4}, então A∩B={3} e A∪B={1,2,3,4}.",
    "Que operação representa os números que pertencem a A e a B?",
    "A intersecção A∩B, porque o elemento deve satisfazer as duas condições ao mesmo tempo.",
    "Desenhe diagramas de Venn ou semiplanos e teste um ponto para cada região.",
  );
  if (topicMatches(topic, ["referencia", "coordenada", "plano cartesiano", "distancia entre dois pontos", "declive", "recta", "mediatriz", "circunferencia", "circulo", "elipse", "lugares geometricos", "superficie esferica", "plano mediador"])) return guide(
    "No plano cartesiano, um ponto é um par ordenado (x,y). A distância mede a separação entre pontos e o declive mede a variação vertical por unidade de variação horizontal.",
    "Para uma recta por dois pontos, calcule m=(y₂−y₁)/(x₂−x₁). A mediatriz é o lugar dos pontos equidistantes das extremidades de um segmento; a circunferência reúne pontos a distância fixa do centro.",
    "A distância entre A(1,2) e B(4,6) é √[(4−1)²+(6−2)²]=5. A recta por esses pontos tem declive 4/3.",
    "Como se reconhece a mediatriz de AB?",
    "É a recta perpendicular a AB que passa pelo seu ponto médio; qualquer ponto dela está à mesma distância de A e B.",
    "Antes de substituir valores, identifique se a questão pede distância, declive, ponto médio ou equação de lugar geométrico.",
    "d=√[(x₂−x₁)²+(y₂−y₁)²]; m=(y₂−y₁)/(x₂−x₁)",
    "d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2};\quad m=\frac{y_2-y_1}{x_2-x_1}",
  );
  if (topicMatches(topic, ["vector", "produto escalar", "perpendicularidade", "equacoes vectoriais", "interseccao de planos", "planos perpendiculares", "r3", "espaco"])) return guide(
    "Vector é um objeto definido por direção, sentido e norma; em coordenadas, as suas componentes resultam da diferença entre ponto final e inicial.",
    "O produto escalar u·v é zero quando vetores não nulos são perpendiculares. Equações vetoriais descrevem retas por um ponto e um vetor diretor; em R³, mantenha a ordem x, y, z.",
    "Para A(1,0,2) e B(4,2,2), AB=(3,2,0). Se u=(1,2) e v=(2,−1), u·v=2−2=0, logo são perpendiculares.",
    "Que resultado do produto escalar confirma perpendicularidade?",
    "O valor zero, desde que os vetores não sejam nulos.",
    "Escreva as componentes em colunas e conserve a mesma ordem em todas as operações.",
    "u·v=u₁v₁+u₂v₂(+u₃v₃)",
    "\vec u\cdot\vec v=u_1v_1+u_2v_2(+u_3v_3)",
  );
  if (topicMatches(topic, ["poligono", "poliedro", "solido", "projeccao ortogonal", "rectas e planos no espaco", "posicoes relativas"]) || context.moduleId === "mat-geometria-espacial") return guide(
    "Poliedro é um sólido limitado por faces poligonais; projeção ortogonal representa um ponto ou figura num plano por projetantes perpendiculares.",
    "Em geometria espacial, uma afirmação deve ser justificada por paralelismo, perpendicularidade, incidência ou interseção. Não conclua apenas pela aparência do desenho em perspetiva.",
    "Num cubo, duas arestas que partem do mesmo vértice e pertencem a faces adjacentes são perpendiculares; arestas opostas de uma face são paralelas.",
    "Que informação comprova que duas rectas no espaço são reversas?",
    "Elas não são paralelas, não se intersetam e não pertencem ao mesmo plano.",
    "Faça um esboço, nomeie planos e linhas, e indique explicitamente a propriedade usada.",
  );
  if (topicMatches(topic, ["potenciacao", "potencia", "radical", "expoente racional"])) return guide(
    "Potência representa multiplicação repetida; expoente racional relaciona potência e raiz: a^(m/n) é a raiz n-ésima de a^m, quando definida no conjunto em estudo.",
    "Em produto de potências de mesma base some os expoentes; em potência de potência multiplique-os. Uma raiz de índice par exige radicando não negativo nos reais.",
    "16^(3/4)=(⁴√16)³=2³=8.",
    "Por que (a+b)² não é a²+b²?",
    "Porque a expansão correta é a²+2ab+b²; o termo cruzado 2ab não pode ser omitido.",
    "Mantenha parênteses à volta de toda a base antes de aplicar propriedades de expoentes.",
    "a^(m/n)=ⁿ√(a^m)",
    "a^{m/n}=\sqrt[n]{a^m}",
  );
  if (topicMatches(topic, ["sucess", "progressao aritmetica", "pa", "progressao geometrica", "pg", "interpolacao", "limite de uma sucessao", "numero de neper", "inducao"])) return guide(
    "Sucessão é uma lista ordenada de termos. Numa PA a diferença é constante; numa PG o quociente entre termos consecutivos é constante. Indução prova uma afirmação verificando uma base e um passo n→n+1.",
    "Use aₙ=a₁+(n−1)r na PA e aₙ=a₁q^(n−1) na PG. Em limites, procure o comportamento dos termos quando n cresce, em vez de substituir um valor finito arbitrário.",
    "Na PA 4,7,10,…, r=3 e a₅=4+4·3=16. Na PG 2,6,18,…, q=3 e a₄=54.",
    "Quais são as duas etapas indispensáveis de uma prova por indução?",
    "O caso base e o passo indutivo: assumir a proposição para n e demonstrá-la para n+1.",
    "Teste o termo n=1 depois de obter a fórmula; isso revela erros de índice.",
    "PA: aₙ=a₁+(n−1)r; PG: aₙ=a₁q^(n−1)",
    "a_n=a_1+(n-1)r;\quad a_n=a_1q^{n-1}",
  );
  if (topicMatches(topic, ["funcao afim", "funcao linear", "funcao constante", "funcao modulo", "funcao quadratica", "parabola", "vertice", "zeros", "inequacao do 2", "dominio", "contradominio", "assimptota", "representacao grafica", "transformacoes", "funcao como", "funcoes racionais", "funcoes irracionais", "operacoes com funcoes", "extremos de uma funcao"]) || context.moduleId === "mat-funcoes") return guide(
    "Função associa a cada entrada do domínio exatamente uma saída. A função quadrática f(x)=ax²+bx+c, com a≠0, tem gráfico parabólico; o sinal de a define a concavidade.",
    "Para funções racionais exclua os zeros do denominador; para raízes quadradas imponha radicando não negativo. Numa parábola, calcule zeros e vértice para esboçar o gráfico com segurança.",
    "Em f(x)=x²−4, os zeros são −2 e 2; o vértice é (0,−4) e a parábola abre para cima.",
    "Que valores devem ser excluídos do domínio de 1/(x−3)?",
    "x=3, porque anula o denominador e a divisão por zero não está definida.",
    "Comece pelo domínio antes de manipular a expressão e desenhe os pontos notáveis do gráfico.",
    "xᵥ=−b/(2a); yᵥ=f(xᵥ); x=(−b±√Δ)/(2a)",
    "x_v=-\frac b{2a};\quad y_v=f(x_v);\quad x=\frac{-b\pm\sqrt{\Delta}}{2a}",
  );
  if (topicMatches(topic, ["logarit", "exponencial", "equacoes exponenciais", "equacoes logaritmicas"])) return guide(
    "Logaritmo logₐ(b) é o expoente x tal que aˣ=b, com a>0, a≠1 e b>0. Funções exponenciais têm a variável no expoente e são inversas das logarítmicas.",
    "Antes de resolver, imponha argumento logarítmico positivo. Use propriedades apenas em produtos, quocientes e potências; nunca distribua logaritmo sobre uma soma.",
    "log₂(8)=3 porque 2³=8; em ln(x−1), o domínio exige x>1.",
    "Que condição deve cumprir o argumento de um logaritmo real?",
    "Deve ser estritamente positivo; log(0) e log de número negativo não existem nos reais.",
    "Converta logaritmos para a forma exponencial quando a igualdade ficar mais clara.",
    "logₐ(b)=x ⇔ aˣ=b",
    "\log_a(b)=x\Longleftrightarrow a^x=b",
  );
  if (topicMatches(topic, ["trigonometric", "seno", "cosseno", "tangente", "circulo trigonometric", "equacao trigonometrica", "transformacoes trigonometric", "formula fundamental"])) return guide(
    "No triângulo retângulo, seno é oposto/hipotenusa, cosseno é adjacente/hipotenusa e tangente é oposto/adjacente. No círculo unitário, cos θ e sen θ são as coordenadas x e y do ponto associado ao ângulo.",
    "Escolha a razão pelos lados conhecidos e procurados. Para identidades e equações, respeite o domínio e os sinais nos quadrantes; sen²θ+cos²θ=1 é a identidade fundamental.",
    "Se sen θ=3/5 e θ é agudo, cos θ=4/5 porque cos²θ=1−9/25=16/25.",
    "Quando a tangente não está definida?",
    "Quando cos θ=0, pois tan θ=sen θ/cos θ e não se divide por zero.",
    "Desenhe o triângulo ou círculo e indique explicitamente o quadrante antes de decidir o sinal.",
    "sen²θ+cos²θ=1; tan θ=sen θ/cos θ",
    "\sin^2\theta+\cos^2\theta=1;\quad\tan\theta=\frac{\sin\theta}{\cos\theta}",
  );
  if (topicMatches(topic, ["limite", "continuidade", "indeterminacao", "infinitesimo"])) return guide(
    "Limite é o valor a que f(x) se aproxima quando x se aproxima de um número. Continuidade em a exige f(a) definida, limite existente e igualdade entre os dois valores.",
    "A forma 0/0 é indeterminação, não resposta. Fatorize, racionalize ou simplifique antes de substituir; quando relevante, compare os limites laterais.",
    "lim x→2 (x²−4)/(x−2)=lim x→2 (x+2)=4 após fatorizar x²−4.",
    "0/0 significa que o limite é zero?",
    "Não. Significa que a expressão precisa ser transformada; limites diferentes podem produzir 0/0 na substituição direta.",
    "Indique o ponto de aproximação e teste primeiro substituição direta, sem confundir limite com valor da função.",
  );
  if (topicMatches(topic, ["derivad", "regra da cadeia", "regras de derivacao", "aplicacoes das derivadas"])) return guide(
    "Derivada mede a taxa de variação instantânea de uma função e corresponde ao declive da reta tangente ao gráfico.",
    "Use a regra da potência termo a termo; em composição f(g(x)), derive a função exterior e multiplique pela derivada da interior. Aplicações incluem crescimento, extremos e velocidade instantânea.",
    "Se f(x)=(3x²+1)⁵, então f'(x)=5(3x²+1)⁴·6x=30x(3x²+1)⁴.",
    "Qual é a derivada de uma constante?",
    "É zero, porque uma constante não varia com x.",
    "Escreva a função como soma de termos e assinale as composições antes de derivar.",
    "d(xⁿ)/dx=n·xⁿ⁻¹",
    "\frac{d}{dx}(x^n)=nx^{n-1}",
  );
  if (topicMatches(topic, ["integral", "primitiva", "substituicao", "por partes", "calculo de area"]) || context.moduleId === "mat-integrais") return guide(
    "Integral indefinida é uma família de primitivas: funções cuja derivada recupera o integrando. A integral definida acumula variação num intervalo e pode representar área orientada.",
    "Na regra da potência, aumente o expoente e divida pelo novo expoente; não se aplica a x⁻¹, cuja primitiva é ln|x|. Use substituição para compostas e partes para produtos adequados.",
    "∫4x³ dx=x⁴+C. Para ∫₀² x dx, [x²/2]₀²=2.",
    "Por que uma integral indefinida termina com +C?",
    "Porque derivadas de funções que diferem por uma constante são iguais; C representa todas essas primitivas.",
    "Derive a resposta final para verificar se recupera a função inicial.",
    "∫xⁿdx=xⁿ⁺¹/(n+1)+C, n≠−1",
    "\int x^n\,dx=\frac{x^{n+1}}{n+1}+C,\;n\ne-1",
  );
  if (topicMatches(topic, ["estatistica", "organizacao", "medidas de localizacao", "medidas de dispersao", "binomial", "distribuicoes binominais"])) return guide(
    "Estatística organiza e interpreta dados. Média resume o centro aritmético, mediana é o valor central ordenado e variância/desvio-padrão medem dispersão.",
    "Na distribuição binomial há n ensaios independentes, duas categorias por ensaio e probabilidade p constante. Use a combinação para contar arranjos com k sucessos.",
    "Nos dados 2,4,4,6, a média é 4 e a mediana é 4; em Bin(3,1/2), P(X=2)=C(3,2)(1/2)²(1/2)=3/8.",
    "O que uma medida de dispersão informa além da média?",
    "Indica quão afastados os dados ficam de um centro; médias iguais podem esconder dispersões muito diferentes.",
    "Ordene os dados e declare a unidade antes de interpretar média, mediana ou desvio-padrão.",
    "P(X=k)=C(n,k)pᵏ(1−p)ⁿ⁻ᵏ",
    "P(X=k)=\binom nk p^k(1-p)^{n-k}",
  );
  return undefined;
}

function portugueseGuide(context: TopicGuideContext): TopicGuide | undefined {
  const topic = normalized(context.topic);
  if (topicMatches(topic, ["elementos de comunicacao", "funcoes da linguagem", "tipos de linguagem", "linguagem oral", "linguagem verbal"])) return guide(
    "Comunicação envolve emissor, receptor, mensagem, código, canal e contexto. A função da linguagem predominante depende da intenção que organiza a mensagem.",
    "A função referencial privilegia a informação; a emotiva evidencia o emissor; a apelativa busca influenciar o receptor; a fática mantém o contacto; a metalinguística fala do código; a poética valoriza a forma da mensagem.",
    "Em “Entreguem o relatório amanhã”, predomina a função apelativa, pois a mensagem procura orientar o receptor para uma ação.",
    "Qual elemento é o meio físico ou tecnológico por que a mensagem circula?",
    "O canal: por exemplo, voz, papel, telefone ou plataforma digital.",
    "Sublinhe verbos de ordem, marcas de emoção, explicações sobre palavras ou pedidos de contacto antes de escolher a função.",
  );
  if (topicMatches(topic, ["interpretacao", "texto literario", "texto nao literario", "organizacao do texto", "informacao explicita", "inferencia"])) return guide(
    "Informação explícita está declarada no texto; inferência é uma conclusão sustentada por pistas textuais. Texto literário privilegia construção estética e conotativa; texto não literário tende a cumprir finalidade informativa, instrucional ou argumentativa.",
    "Para interpretar, identifique tema, tese ou ideia principal, conectores, referentes pronominais e evidências. Não substitua a leitura por opinião pessoal quando o enunciado pede resposta segundo o texto.",
    "Se o texto afirma “a biblioteca abre às 8h”, a abertura às 8h é explícita. Concluir que estudantes podem chegar antes é inferência possível apenas se o contexto a sustentar.",
    "Em que deve apoiar-se uma inferência correta?",
    "Em marcas linguísticas e relações presentes no texto, não em informação externa sem apoio textual.",
    "Volte ao excerto e cite mentalmente a palavra, frase ou conector que justifica cada resposta.",
  );
  if (topicMatches(topic, ["acentuacao", "pontuacao", "tempos", "modos dos verbos", "verbal", "divisoes da gramatica"])) return guide(
    "Acentuação gráfica distingue padrões de tonicidade e, em casos específicos, sentidos; pontuação organiza unidades sintáticas e relações de sentido. Tempos e modos verbais situam a ação e expressam atitude do falante.",
    "A vírgula não separa sujeito de predicado nem é simples pausa oral. O indicativo apresenta fatos, o conjuntivo/subjuntivo apresenta hipótese, desejo ou possibilidade, e o imperativo expressa ordem, pedido ou conselho.",
    "“Vamos comer, alunos.” chama os alunos; sem a vírgula, “Vamos comer alunos.” altera radicalmente o sentido.",
    "A vírgula pode separar sujeito e verbo sem motivo sintático?",
    "Não. Sujeito e predicado constituem uma unidade e não devem ser separados por vírgula sem construção intercalada específica.",
    "Localize o verbo principal antes de decidir a pontuação ou classificar o tempo verbal.",
  );
  if (topicMatches(topic, ["fonetica", "grafica", "semantica", "formacao", "classe de palavras", "palavras", "relacoes lexicais"])) return guide(
    "A relação fonética diz respeito aos sons; a gráfica, à escrita; a semântica, aos sentidos. Classes de palavras são identificadas pela forma e, sobretudo, pela função no contexto.",
    "Na formação, reconheça derivação por prefixos/sufixos e composição. Uma mesma forma pode mudar de classe: “o jantar” é substantivo; “jantar cedo” usa verbo.",
    "Em “O estudo transforma”, “estudo” é substantivo. Em “Eu estudo todos os dias”, a mesma forma é verbo.",
    "Por que não é seguro classificar uma palavra isolada?",
    "Porque a função sintática e o sentido podem mudar de acordo com a frase em que ela ocorre.",
    "Reescreva a palavra em uma frase curta e pergunte que papel ela desempenha.",
  );
  if (topicMatches(topic, ["tipos e formas de frases", "coordenacao", "subordinacao", "funcoes sintacticas", "constituinte", "pronominalizacao", "regencia", "concordancia", "voz ativa", "voz passiva", "vozes activas", "tipos de discurso", "oracoes", "frase"])) return guide(
    "Uma oração organiza-se em torno de um verbo. Coordenação reúne orações sintaticamente independentes; subordinação faz uma oração exercer função na principal. Regência indica a preposição exigida por um termo; concordância ajusta flexões entre termos relacionados.",
    "Classifique pela função e pelo sentido, não apenas pelo conector. Na passagem de discurso direto para indireto, ajuste pronomes, tempos verbais, advérbios e conectores mantendo o conteúdo comunicado.",
    "Em “Estudei porque queria melhorar”, “porque queria melhorar” é oração subordinada causal. Em “Gosto de leitura”, o verbo gostar exige a preposição de.",
    "Que pergunta ajuda a localizar um complemento exigido pelo verbo?",
    "Formule a pergunta a partir do verbo e verifique se a resposta pede preposição: quem gosta, gosta de algo.",
    "Circule os verbos, separe as orações e sublinhe conectores e preposições antes de classificar.",
  );
  if (topicMatches(topic, ["figuras de estilo", "agostinho neto", "antonio jacinto", "manuel rui", "menas abrantes", "oscar ribas", "pepetela", "literatura"])) return guide(
    "Figura de estilo é um recurso que produz efeito de sentido, imagem, intensidade ou ritmo. A leitura literária articula escolhas de linguagem, voz, tema e contexto, sem reduzir o texto a uma biografia do autor.",
    "Metáfora aproxima termos sem conectivo comparativo; personificação atribui traço humano ao não humano; antítese aproxima ideias contrastantes. Em autores angolanos, observe temas de identidade, memória, sociedade, colonialismo, independência ou pós-independência quando estiverem efetivamente no excerto.",
    "Em “a cidade acordou”, há personificação porque uma ação humana é atribuída à cidade.",
    "O que deve acompanhar o nome de uma figura de estilo numa resposta?",
    "A citação ou descrição do trecho e a explicação do efeito de sentido produzido no contexto.",
    "Leia o excerto duas vezes: primeiro para o tema, depois para localizar palavras, repetições e contrastes que sustentam a interpretação.",
  );
  return undefined;
}

function physicsGuide(context: TopicGuideContext): TopicGuide | undefined {
  const topic = normalized(context.topic);
  if (topicMatches(topic, ["trabalho", "potencia", "energia cinetica", "energia potencial", "conservacao da energia", "choque"]) || context.moduleId === "fis-energia-trabalho") return guide(
    "Trabalho é a transferência de energia por uma força com componente na direção do deslocamento. Energia cinética depende da massa e da velocidade; energia potencial depende da configuração do sistema.",
    "Use o sistema e o referencial definidos. O trabalho resultante é igual à variação da energia cinética; sem forças não conservativas, a energia mecânica pode conservar-se.",
    "Uma força de 10 N na direção do movimento por 3 m realiza W=30 J. Se a força é perpendicular ao deslocamento, o trabalho é zero.",
    "Que unidade SI é comum ao trabalho e à energia?",
    "O joule (J), equivalente a newton·metro (N·m).",
    "Desenhe força e deslocamento; registre o ângulo antes de usar o cosseno.",
    "W=F·d·cosθ; Eₖ=mv²/2",
    "W=Fd\cos\theta;\quad E_k=\frac{mv^2}{2}",
  );
  if (topicMatches(topic, ["gas ideal", "clapeyron", "boyle", "charles", "gay lussac", "isoprocesso", "termodin", "entropia", "carnot", "lei zero"]) || context.moduleId === "fis-gases-termodinamica") return guide(
    "Um gás ideal é um modelo em que p, V, n e T se relacionam por pV=nRT. Temperatura nas leis dos gases deve ser absoluta, em kelvin.",
    "Numa transformação isotérmica T é constante; numa isobárica p é constante; numa isocórica V é constante. A primeira lei relaciona calor, trabalho e energia interna segundo a convenção de sinais adotada.",
    "Para 27 °C, use T=300 K antes de aplicar pV=nRT. Em isotérmica de gás ideal, pV permanece constante.",
    "Por que não se deve usar graus Celsius diretamente em pV=nRT?",
    "Porque as proporções termodinâmicas exigem a escala absoluta; 0 °C não significa ausência de energia térmica.",
    "Monte uma tabela com estado inicial e final: p, V, T e tipo de transformação.",
    "pV=nRT; ΔU=Q−W (trabalho feito pelo sistema)",
    "pV=nRT;\quad\Delta U=Q-W",
  );
  if (topicMatches(topic, ["corrente", "resistencia", "resistividade", "tensao", "lei de ohm", "kirchhoff", "associacao", "potencia dissipada"]) || context.moduleId === "fis-corrente-redes") return guide(
    "Corrente elétrica é a taxa de passagem de carga; tensão representa diferença de potencial; resistência é oposição ao movimento de carga num circuito.",
    "Em série, a corrente é a mesma e resistências somam. Em paralelo, a tensão é a mesma nos ramos e somam-se os inversos das resistências. As leis de Kirchhoff preservam corrente nos nós e energia nas malhas.",
    "Dois resistores de 2 Ω e 3 Ω em série têm 5 Ω. Sob 10 V, a corrente é I=10/5=2 A.",
    "Que grandeza é igual em componentes em série?",
    "A corrente elétrica que atravessa cada componente da mesma malha em série.",
    "Reduza o circuito por etapas e anote sempre unidades: V, A, Ω e W.",
    "U=RI; P=UI=RI²",
    "U=RI;\quad P=UI=RI^2",
  );
  if (topicMatches(topic, ["movimento", "velocidade", "aceleracao", "queda livre", "newton", "momento linear", "impulso", "circular"])) return guide(
    "Velocidade descreve variação da posição; aceleração descreve variação da velocidade. A resultante das forças determina a aceleração pela segunda lei de Newton.",
    "Escolha referencial e sentido positivo. Em movimento circular uniforme, há aceleração centrípeta dirigida ao centro. Impulso é a variação do momento linear.",
    "Se Fᵣ=12 N atua em m=3 kg, a=F/m=4 m/s². Em queda livre sem resistência do ar, a aceleração é aproximadamente g para baixo.",
    "Uma velocidade constante implica ausência de todas as forças?",
    "Não. Implica resultante nula; forças individuais podem existir e equilibrar-se.",
    "Faça o diagrama de corpo livre antes de escrever qualquer equação.",
    "Fᵣ=ma; p=mv; J=Δp",
    "F_R=ma;\quad p=mv;\quad J=\Delta p",
  );
  if (topicMatches(topic, ["oscil", "onda", "ressonancia", "interferencia", "difraccao", "reflexao", "refraccao", "lente", "doppler", "polarizacao"]) || context.moduleId === "fis-oscilacoes-ondas-luz") return guide(
    "Onda é uma perturbação que transporta energia. Frequência é o número de ciclos por segundo, período é a duração de um ciclo e comprimento de onda é a distância entre pontos em fase.",
    "Use v=λf e f=1/T. Reflexão mantém a onda no meio; refração altera direção ou velocidade ao mudar de meio; interferência resulta da superposição de ondas.",
    "Uma onda com f=5 Hz tem T=0,2 s. Se λ=2 m e f=3 Hz, v=6 m/s.",
    "Qual a diferença entre amplitude e comprimento de onda?",
    "Amplitude mede afastamento máximo da oscilação; comprimento de onda mede a repetição espacial de um ciclo.",
    "Desenhe uma onda e marque eixo de equilíbrio, amplitude, crista, vale e λ.",
    "v=λf; f=1/T",
    "v=\lambda f;\quad f=\frac1T",
  );
  if (topicMatches(topic, ["fluido", "arquimedes", "bernoulli", "pressao", "empuxo", "projetil", "atrito", "centro de massa", "momento angular"])) return guide(
    "Pressão é força por área; em fluido em repouso aumenta com a profundidade. Empuxo é a força vertical para cima igual ao peso do fluido deslocado.",
    "A equação de Bernoulli relaciona pressão, velocidade e altura ao longo de uma linha de corrente em escoamento ideal. Em projéteis, separe movimentos horizontal e vertical.",
    "Um corpo que desloca 0,020 m³ de água recebe empuxo aproximadamente 1000·9,8·0,020=196 N.",
    "De que depende diretamente o empuxo?",
    "Da densidade do fluido, do volume deslocado e da aceleração gravitacional.",
    "Isole o corpo e desenhe peso, normal, tensão, atrito e empuxo com sentidos coerentes.",
    "E=ρgV; p+ρv²/2+ρgh=constante",
    "E=\rho gV;\quad p+\frac{\rho v^2}{2}+\rho gh=\text{constante}",
  );
  if (topicMatches(topic, ["magnet", "faraday", "lenz", "inducao", "solenoide", "transformador", "gerador", "motor", "fluxo"])) return guide(
    "Campo magnético descreve a influência sobre cargas em movimento e correntes. Indução eletromagnética ocorre quando o fluxo magnético através de um circuito varia.",
    "A lei de Faraday relaciona força eletromotriz induzida à taxa de variação do fluxo; a lei de Lenz determina que a corrente induzida se opõe à mudança que a produz.",
    "Aproximar um íman de uma espira aumenta o fluxo; surge corrente cujo campo magnético se opõe a esse aumento.",
    "Um campo magnético constante numa espira parada induz corrente?",
    "Não. É necessário que o fluxo magnético varie no tempo.",
    "Desenhe setas do campo, normal da espira, movimento e sentido da corrente induzida.",
    "ε=−N·ΔΦ/Δt",
    "\varepsilon=-N\frac{\Delta\Phi}{\Delta t}",
  );
  if (topicMatches(topic, ["corrente alternada", "impedancia", "rlc", "valor eficaz", "maxwell", "hertz", "espectro electromagnetico"]) || context.moduleId === "fis-ca-ondas-em") return guide(
    "Corrente alternada sinusoidal muda de sentido periodicamente. Valor eficaz é o valor contínuo equivalente em efeito térmico; impedância é a oposição total em circuitos AC.",
    "Em transformador ideal, a razão das tensões acompanha a razão do número de espiras. Ondas eletromagnéticas propagam-se no vácuo com c=λf e diferem por frequência e comprimento de onda.",
    "Se Nₛ/Nₚ=2, então Vₛ/Vₚ=2 num transformador ideal: o secundário duplica a tensão do primário.",
    "O que muda quando aumenta a frequência de uma onda eletromagnética no vácuo?",
    "O comprimento de onda diminui, pois c é aproximadamente constante e c=λf.",
    "Diferencie grandeza máxima, instantânea e eficaz antes de calcular em AC.",
    "Vₛ/Vₚ=Nₛ/Nₚ; c=λf",
    "\frac{V_s}{V_p}=\frac{N_s}{N_p};\quad c=\lambda f",
  );
  return undefined;
}

function chemistryGuide(context: TopicGuideContext): TopicGuide | undefined {
  const topic = normalized(context.topic);
  if (topicMatches(topic, ["equacao quimica", "estequiometr", "velocidade", "reversibilidade", "equilibrio", "le chatelier"]) || context.moduleId === "qui-equacoes-cinetica-equilibrio") return guide(
    "Equação química balanceada conserva o número de átomos de cada elemento. Equilíbrio químico é dinâmico: reações direta e inversa continuam, com velocidades iguais.",
    "Ajuste coeficientes, nunca índices. Na estequiometria, converta dados para mol e use a razão dos coeficientes. Pelo princípio de Le Chatelier, o sistema responde a uma perturbação reduzindo o seu efeito.",
    "N₂+3H₂⇌2NH₃ tem 4 mols gasosos à esquerda e 2 à direita; aumentar pressão favorece o lado com menos mols de gás, em condições adequadas.",
    "No equilíbrio, as concentrações de reagentes e produtos precisam ser iguais?",
    "Não. O que se iguala são as velocidades das reações direta e inversa.",
    "Conte átomos antes e depois; em cálculos, escreva a unidade mol em cada conversão.",
  );
  if (topicMatches(topic, ["acido", "base", "ph", "dissociacao", "hidroxido", "neutralizacao", "sal"])) return guide(
    "Pelo modelo de Brønsted-Lowry, ácido doa H⁺ e base aceita H⁺; pH expressa a acidez de uma solução em escala logarítmica.",
    "Ácidos e bases fortes ionizam quase completamente em água; fracos estabelecem equilíbrio. Numa neutralização simples, H₃O⁺ e OH⁻ formam água, enquanto os outros iões originam um sal.",
    "Para [H₃O⁺]=1,0×10⁻³ mol/L, pH=3. A reação HCl+NaOH→NaCl+H₂O é uma neutralização.",
    "pH 2 é apenas uma unidade mais ácido que pH 3?",
    "Não. Uma unidade de pH corresponde a um fator 10 na concentração de H₃O⁺.",
    "Distingua concentração, força do ácido/base e quantidade de matéria; são ideias diferentes.",
    "pH=−log[H₃O⁺]; Kw=[H₃O⁺][OH⁻]",
    "pH=-\log[H_3O^+];\quad K_w=[H_3O^+][OH^-]",
  );
  if (topicMatches(topic, ["bohr", "atomo", "estrutura electronica", "espectro", "ionizacao", "distribuicao electronica", "ligacao"]) || context.moduleId === "qui-atomo-ligacoes") return guide(
    "Número atómico Z indica prótons; átomo neutro tem igual número de elétrons. Configuração eletrónica descreve a ocupação de níveis e subníveis de energia.",
    "Ligações iónicas envolvem atração entre iões formados por transferência predominante de eletrões; covalentes resultam de pares partilhados. Energia de ionização mede a energia necessária para remover um eletrão de um átomo gasoso.",
    "Na tende a perder um eletrão e Cl a ganhar um, formando Na⁺ e Cl⁻ num composto iónico.",
    "Qual a diferença entre número atómico e número de massa?",
    "Número atómico é o número de prótons; número de massa é prótons mais neutrões.",
    "Use a tabela periódica para conferir grupo, período e eletrões de valência antes de prever uma ligação.",
  );
  if (topicMatches(topic, ["oxidacao", "reducao", "redox", "pilha", "electrolise", "eletrolise", "complex", "werner", "ligante", "iao central", "geometria e estabilidade"]) || context.moduleId === "qui-eletroquimica-coordenacao") return guide(
    "Oxidação é perda de eletrões e aumento do número de oxidação; redução é ganho de eletrões e diminuição desse número. Em complexos, o metal central aceita pares eletrónicos de ligantes.",
    "Numa pilha galvânica a reação espontânea produz corrente: oxidação no ânodo e redução no cátodo. Na eletrólise, uma fonte externa força uma reação não espontânea.",
    "Zn→Zn²⁺+2e⁻ é oxidação. Cu²⁺+2e⁻→Cu é redução. Os eletrões fluem do ânodo para o cátodo no circuito externo da pilha.",
    "Que espécie sofre redução numa reação redox?",
    "A espécie que ganha eletrões e reduz o seu número de oxidação.",
    "Escreva semirreações e eletrões explicitamente antes de memorizar sinais de eletrodos.",
  );
  if (topicMatches(topic, ["grupo 14", "carbono", "silicio", "vidro", "cimento", "hidrocarboneto", "composto organico", "alcool", "aldeido", "cetona", "carbox", "eter", "ester", "amina", "amida", "polimero", "adicao", "substituicao", "esterificacao", "hidrolise"]) || context.moduleId === "qui-carbono-organica" || context.moduleId === "qui-funcoes-reacoes-organicas") return guide(
    "Química orgânica estuda principalmente compostos de carbono. Grupo funcional é a parte da molécula que determina propriedades e reatividade características.",
    "Hidrocarbonetos contêm apenas C e H. Identifique a cadeia, as ligações simples/duplas/triplas e o grupo funcional antes de nomear ou prever reação. Esterificação combina ácido carboxílico e álcool, produzindo éster e água.",
    "CH₃CH₂OH tem grupo −OH ligado a carbono saturado: é o álcool etanol. CH₃COOH+CH₃CH₂OH pode formar etanoato de etilo e água.",
    "Que parte de uma molécula orienta a classificação numa função orgânica?",
    "O grupo funcional característico, e não apenas a presença de um átomo como o oxigénio.",
    "Circule o grupo funcional e marque a cadeia principal antes de escolher o nome ou a reação.",
  );
  if (topicMatches(topic, ["aminoacido", "proteina", "glicido", "lipido", "forcas intermoleculares", "estado gasoso", "liquido vapor", "coligativa", "solucao"]) || context.moduleId === "qui-biomoleculas-solucoes") return guide(
    "Biomoléculas incluem glícidos, lípidos, proteínas e aminoácidos, com estrutura ligada à função biológica. Forças intermoleculares ocorrem entre moléculas e influenciam propriedades físicas.",
    "Ligações de hidrogénio, dipolo-dipolo e dispersão ajudam a explicar solubilidade, viscosidade e pontos de fusão/ebulição. Propriedades coligativas dependem principalmente do número de partículas de soluto.",
    "A água tem ponto de ebulição alto para a sua massa por causa das ligações de hidrogénio entre moléculas.",
    "Ligação covalente e força intermolecular são a mesma coisa?",
    "Não. Ligação covalente une átomos dentro da molécula; força intermolecular atua entre moléculas.",
    "Ao comparar substâncias, indique polaridade e interação intermolecular predominante antes de concluir.",
  );
  return undefined;
}

function descriptiveGeometryGuide(context: TopicGuideContext): TopicGuide | undefined {
  const topic = normalized(context.topic);
  if (topicMatches(topic, ["projecc", "projec", "sistema", "ponto", "recta", "plano", "interseccao", "poliedro", "cone", "cilindro", "axonometr"]) || context.moduleId === "geo-projecoes" || context.moduleId === "geo-dupla-projecao") return guide(
    "Projeção é a representação plana de elementos espaciais segundo regras de correspondência. Na dupla projeção ortogonal, as projeções horizontal e frontal do mesmo ponto são ligadas por uma projetante perpendicular à linha de terra.",
    "Classifique pontos, retas e planos pela posição relativa aos planos de projeção. Para interseções, construa em ambas as vistas e mantenha alinhamento rigoroso entre projetantes.",
    "Uma reta horizontal tem projeção frontal paralela à linha de terra; essa propriedade ajuda a classificá-la antes da construção completa.",
    "O que garante que duas projeções representam o mesmo ponto?",
    "A projetante comum, perpendicular à linha de terra, que alinha a projeção horizontal e a frontal.",
    "Trace linhas auxiliares finas e confira a correspondência entre vistas a cada etapa.",
  );
  if (topicMatches(topic, ["rebatimento", "mudanca dos planos", "rotacao", "metodo auxiliar", "metodo metrico"]) || context.moduleId === "geo-metodos-metricos") return guide(
    "Rebatimento, rotação e mudança de planos são métodos auxiliares usados para revelar verdadeira grandeza de segmentos, figuras e ângulos no espaço.",
    "O objeto não muda: muda a posição de observação ou do plano de referência. Preserve charneira, distâncias e projetantes para não alterar a construção geométrica.",
    "Para ver a forma verdadeira de uma figura num plano oblíquo, rebata o plano sobre um plano de projeção em torno da charneira.",
    "Que elemento deve permanecer fixo num rebatimento?",
    "A charneira, que funciona como eixo da rotação do plano.",
    "Marque charneira e arcos de rotação antes de transportar qualquer ponto.",
  );
  if (topicMatches(topic, ["figura plana", "solido", "circunferencia", "plano de topo", "plano vertical", "perfil", "visibilidade"])) return guide(
    "Uma figura surge em verdadeira grandeza quando o seu plano é paralelo ao plano de projeção. Sólidos exigem coerência entre base, altura, projetantes e convenções de visibilidade.",
    "Construa primeiro a vista onde a base está mais favorável; projete vértices e arestas para as outras vistas. Arestas ocultas usam traço interrompido conforme a convenção gráfica.",
    "Um prisma com base paralela ao plano horizontal mostra a base em verdadeira grandeza na projeção horizontal.",
    "Quando uma figura plana aparece sem deformação numa projeção?",
    "Quando o plano da figura é paralelo ao plano de projeção que a recebe.",
    "Diferencie sempre arestas visíveis e ocultas antes de finalizar o desenho.",
  );
  return undefined;
}

function cultureGuide(context: TopicGuideContext): TopicGuide | undefined {
  const topic = normalized(context.topic);
  if (topicMatches(topic, ["institu", "regulacao", "minttics", "inacom"])) return guide(
    "No setor das TIC em Angola, o MINTTICS está associado à formulação e condução de políticas setoriais, enquanto o INACOM regula, supervisiona e fiscaliza comunicações eletrónicas e serviços postais.",
    "Em questões de cultura geral, diferencie órgão público, projeto, infraestrutura e evento. Associe cada sigla à sua função antes de memorizar datas isoladas.",
    "MINTTICS formula políticas; INACOM regula o setor. ANGOTIC, por sua vez, é um evento e não uma entidade reguladora.",
    "Qual instituição regula o mercado de comunicações eletrónicas e serviços postais?",
    "O INACOM, conforme a sua função institucional no setor.",
    "Crie cartões com a estrutura: entidade, função e exemplo de atuação.",
  );
  if (topicMatches(topic, ["angotic", "evento", "luanda"])) return guide(
    "O ANGOTIC é um fórum e exposição de tecnologias de informação e comunicação realizado em Luanda, voltado ao debate, exposição e ligação entre agentes do ecossistema digital.",
    "Diferencie o evento das instituições que regulam ou executam políticas. Em perguntas sobre edições, confirme ano, local e tema em fontes institucionais atualizadas.",
    "ANGOTIC não é satélite nem regulador: é uma iniciativa de encontro e exposição de TIC.",
    "ANGOTIC é instituição reguladora, projeto de satélite ou evento de TIC?",
    "É um evento de TIC, composto por fórum e exposição.",
    "Evite decorar detalhes de uma edição sem registrar ano e fonte de atualização.",
  );
  if (topicMatches(topic, ["conectividade", "angosat", "angola online", "centros moveis", "cidadao digital", "projecto"])) return guide(
    "Projetos de inclusão digital procuram ampliar conectividade, acesso e competências de uso das TIC. ANGOSAT-2 relaciona-se à infraestrutura satelital; iniciativas de formação e acesso tratam da inclusão de pessoas e comunidades.",
    "Associe a iniciativa ao seu objetivo: infraestrutura, acesso, capacitação ou serviços. Dados quantitativos devem ser estudados com a data e a fonte que os publicou.",
    "Uma pergunta sobre ANGOSAT-2 aponta para conectividade via satélite; uma sobre Centros Móveis aponta para formação e acesso itinerante.",
    "Que informação deve acompanhar um indicador de acesso à internet?",
    "A fonte institucional e a data de atualização, pois indicadores variam ao longo do tempo.",
    "Mantenha uma tabela de revisão com projeto, objetivo, instituição relacionada e fonte.",
  );
  return undefined;
}

function moduleFocusedGuide(context: TopicGuideContext): TopicGuide {
  return guide(
    `${context.topic} é um tópico curricular de ${context.moduleTitle} e deve ser dominado pela sua definição, representação e condições de aplicação.`,
    `${context.moduleDescription} Nesta sessão, relacione ${context.topic} ao método próprio de ${context.moduleTitle}; explique a ideia antes de executar qualquer cálculo, classificação ou construção.`,
    `Num exercício de ${context.moduleTitle}, comece por identificar o que o enunciado pede sobre “${context.topic}”, registe os dados técnicos e aplique a propriedade correspondente.`,
    `Que definição ou condição de ${context.topic} decide o procedimento nesta questão?`,
    `A resposta deve apresentar a propriedade específica de ${context.topic}, explicar por que ela se aplica aos dados do enunciado e só então efetuar o procedimento.`,
    `Escolha um exercício de ${context.topic}, escreva a definição em uma frase e justifique cada passo da resolução.`,
  );
}

function subjectFallbackGuide(context: TopicGuideContext): TopicGuide {
  const approaches: Record<DisciplineId, { noun: string; operation: string; check: string }> = {
    matematica: { noun: "relação matemática", operation: "represente variáveis, condições de existência e relações simbólicas", check: "verifique sinais, unidades e se a solução respeita as condições iniciais" },
    portugues: { noun: "fenómeno linguístico", operation: "localize marcas linguísticas, relações sintáticas e efeitos de sentido no excerto", check: "apoie a conclusão no texto e reveja concordância, regência ou pontuação quando aplicável" },
    fisica: { noun: "fenómeno físico", operation: "identifique sistema, grandezas, unidades SI, direção e sentido antes de selecionar a relação física", check: "teste coerência dimensional, sinal e ordem de grandeza" },
    quimica: { noun: "processo químico", operation: "identifique espécies, conservação de átomos, partículas e condições da transformação", check: "confirme cargas, coeficientes, unidades e estado físico quando informado" },
    geometria: { noun: "construção geométrica", operation: "determine os planos de projeção, elementos determinantes e linhas auxiliares necessárias", check: "confirme alinhamento entre vistas, verdadeira grandeza e convenções de visibilidade" },
    cultura: { noun: "referência de cultura geral", operation: "associe a informação à instituição, finalidade, data e fonte institucional correspondente", check: "registre a data de atualização e diferencie entidade, projeto, infraestrutura e evento" },
  };
  const approach = approaches[context.disciplineId];
  return guide(
    `Em ${context.disciplineId === "portugues" ? "Língua Portuguesa" : context.moduleTitle}, “${context.topic}” deve ser compreendido como ${approach.noun} inserido no bloco de estudo ${context.moduleTitle}.`,
    `Para estudar “${context.topic}”, ${approach.operation}. A explicação deve ligar a definição do tópico ao objetivo do módulo, sem saltar diretamente para uma resposta pronta.`,
    `Ao resolver uma questão sobre “${context.topic}”, escreva primeiro a ideia central; depois ${approach.operation} e conclua apenas com base nesses elementos.`,
    `Qual elemento próprio de “${context.topic}” deve orientar a resolução ou a análise?`,
    `A resposta deve nomear a propriedade, regra, evidência ou representação de “${context.topic}” e explicar como ela se aplica ao enunciado.`,
    `Produza um resumo de três linhas de “${context.topic}” e resolva uma questão justificando cada etapa; ${approach.check}.`,
  );
}

function disciplineConsolidationGuide(context: TopicGuideContext): TopicGuide {
  const material: Record<DisciplineId, Omit<TopicGuide, "definition">> = {
    matematica: {
      explanation: "Em Matemática, uma resolução válida explicita dados, incógnitas, condições de existência e a relação simbólica que conecta esses elementos. A verificação final deve confirmar sinais, domínio, unidades e coerência do resultado.",
      example: "Escreva as variáveis e condições do enunciado, selecione a propriedade ou fórmula do módulo e substitua os valores linha a linha, justificando cada transformação.",
      checkpoint: "Que condição matemática precisa ser verificada antes de aplicar a relação escolhida?",
      answer: "A condição depende de “${topic}”: verifique domínio, denominadores não nulos, radicandos permitidos, sinais, índices ou hipóteses geométricas indicadas.",
      practiceAction: "Resolva dois itens de “${topic}”: no primeiro, destaque as condições; no segundo, confira o resultado por substituição ou representação gráfica.",
    },
    portugues: {
      explanation: "Em Língua Portuguesa, a análise deve partir de marcas concretas do enunciado ou do texto: escolhas lexicais, verbos, conectores, pronomes, pontuação e relações entre orações. A resposta precisa explicar o efeito ou a regra, não apenas nomeá-la.",
      example: "Localize no enunciado uma palavra, expressão ou estrutura que exemplifique “${topic}”; classifique-a e justifique a classificação pelo contexto.",
      checkpoint: "Que marca linguística do texto comprova a análise de “${topic}”?",
      answer: "Apresente a marca linguística, explique a sua função sintática ou semântica e relacione-a ao sentido do enunciado.",
      practiceAction: "Sublinhe a marca textual que sustenta “${topic}” e escreva uma justificativa completa em duas frases.",
    },
    fisica: {
      explanation: "Em Física, descreva o sistema, o referencial e as grandezas envolvidas antes de escolher uma lei. Toda expressão deve usar unidades SI e toda conclusão deve indicar direção, sentido ou interpretação física quando isso for relevante.",
      example: "Faça um esquema do fenómeno, rotule grandezas conhecidas e incógnita, converta unidades e só depois aplique a relação física apropriada.",
      checkpoint: "Que grandezas e unidades são necessárias para interpretar “${topic}”?",
      answer: "Identifique as grandezas físicas que definem o fenómeno, converta-as para unidades coerentes e explicite a lei ou princípio que as relaciona.",
      practiceAction: "Desenhe o esquema de uma situação de “${topic}”, indique vetores ou sentidos e verifique dimensionalmente o resultado.",
    },
    quimica: {
      explanation: "Em Química, a explicação deve identificar espécies, partículas, ligações ou condições de reação e respeitar conservação de átomos e carga. A classificação só é válida quando ligada à estrutura, à equação ou à evidência experimental adequada.",
      example: "Escreva as espécies químicas de “${topic}”, indique o que se conserva ou se transforma e associe a observação à regra química correspondente.",
      checkpoint: "Que espécie, estrutura ou conservação química decide a análise de “${topic}”?",
      answer: "Nomeie as espécies envolvidas, descreva a transformação ou interação e confirme o balanceamento, a carga ou a propriedade que fundamenta a conclusão.",
      practiceAction: "Represente “${topic}” com fórmula, equação ou estrutura quando aplicável e justifique a classificação em cada etapa.",
    },
    geometria: {
      explanation: "Em Geometria Descritiva, a construção deve conservar correspondência entre projeções, relações de incidência e convenções gráficas. A verdadeira grandeza só pode ser afirmada após colocar o elemento em posição favorável ou aplicar o método auxiliar adequado.",
      example: "Nomeie pontos, retas e planos; construa projetantes coerentes entre vistas e destaque a propriedade geométrica que a solução pretende revelar.",
      checkpoint: "Que vista, projetante ou método revela a relação espacial de “${topic}”?",
      answer: "Indique o plano de projeção e a construção auxiliar necessários; a conclusão deve ser visível e coerente nas projeções correspondentes.",
      practiceAction: "Refaça uma construção de “${topic}” com linhas auxiliares, verifique alinhamentos e marque separadamente arestas visíveis e ocultas.",
    },
    cultura: {
      explanation: "Em Cultura Geral, a resposta deve relacionar factos, instituições, projetos e indicadores a uma fonte e a uma data. O objetivo é compreender função e impacto, não memorizar isoladamente uma sigla ou um número.",
      example: "Associe “${topic}” à entidade, ao propósito e ao período a que a informação se refere; confirme detalhes dinâmicos em fonte institucional.",
      checkpoint: "Que instituição, finalidade e data permitem contextualizar “${topic}”?",
      answer: "A resposta identifica a entidade ou iniciativa, descreve a finalidade e informa a data ou atualização da fonte consultada.",
      practiceAction: "Crie um cartão de revisão com “${topic}”, entidade relacionada, objetivo, fonte e data de atualização.",
    },
  };
  const guideMaterial = material[context.disciplineId];
  const interpolate = (value: string | undefined) => value?.replaceAll("${topic}", context.topic);
  return {
    ...guideMaterial,
    definition: `“${context.topic}” integra o módulo ${context.moduleTitle}. A sua definição deve ser estudada juntamente com a representação, a condição de aplicação e o vocabulário técnico próprio da disciplina.`,
    explanation: interpolate(guideMaterial.explanation) ?? "",
    example: interpolate(guideMaterial.example) ?? "",
    checkpoint: interpolate(guideMaterial.checkpoint) ?? "",
    answer: interpolate(guideMaterial.answer) ?? "",
    practiceAction: interpolate(guideMaterial.practiceAction) ?? "",
  };
}

export function getTopicGuide(context: TopicGuideContext): TopicGuide {
  const byDiscipline: Partial<Record<DisciplineId, (value: TopicGuideContext) => TopicGuide | undefined>> = {
    matematica: mathematicsGuide,
    portugues: portugueseGuide,
    fisica: physicsGuide,
    quimica: chemistryGuide,
    geometria: descriptiveGeometryGuide,
    cultura: cultureGuide,
  };
  return byDiscipline[context.disciplineId]?.(context) ?? disciplineConsolidationGuide(context);
}
