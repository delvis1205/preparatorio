// Direção visual: Editorial académico atlântico — rigor documental, calor institucional e leitura em camadas.
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Calculator,
  Check,
  ChevronDown,
  Compass,
  FileText,
  Globe2,
  GraduationCap,
  Languages,
  Menu,
  Search,
  Sparkles,
  Target,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ASSETS = {
  hero: "/manus-storage/luanda-academic-hero_278477a7.png",
  math: "/manus-storage/luanda-math-visual_48a32812.png",
  language: "/manus-storage/luanda-language-visual_88112c72.png",
  culture: "/manus-storage/luanda-culture-visual_50270290.png",
  signet: "/manus-storage/ul-signet_1edf4125.png",
};

type SubjectId = "math" | "portuguese" | "culture";

type Chapter = {
  id: string;
  numeral: string;
  title: string;
  description: string;
  topics: string[];
};

type Subject = {
  id: SubjectId;
  label: string;
  eyebrow: string;
  short: string;
  description: string;
  icon: LucideIcon;
  image: string;
  accent: string;
  chapters: Chapter[];
};

const subjects: Subject[] = [
  {
    id: "math",
    label: "Matemática",
    eyebrow: "Programa I",
    short: "Raciocínio, cálculo e representação.",
    description:
      "Uma progressão que começa nos polinómios e percorre lógica, geometria, funções, derivadas e integrais.",
    icon: Calculator,
    image: ASSETS.math,
    accent: "blue",
    chapters: [
      {
        id: "math-1",
        numeral: "I",
        title: "Polinómios",
        description: "As operações algébricas fundamentais e o teorema que organiza as raízes.",
        topics: [
          "Definição",
          "Adição e subtracção de polinómios",
          "Multiplicação de polinómios",
          "Divisão de polinómios",
          "Teorema de D’Alembert",
        ],
      },
      {
        id: "math-2",
        numeral: "II",
        title: "Noções de lógica matemática",
        description: "A linguagem das proposições, operações e condições de verdade.",
        topics: [
          "Introdução à lógica bivalente",
          "Princípios fundamentais da lógica",
          "Operações lógicas elementares",
          "Tabela da verdade",
          "Leis de De Morgan",
          "Quantificadores",
        ],
      },
      {
        id: "math-3",
        numeral: "III",
        title: "Geometria analítica no plano",
        description: "Coordenadas, vectores e equações para compreender o espaço no plano.",
        topics: [
          "Métodos cartesianos no plano, referenciais ortogonais e monométricos",
          "Vectores livres",
          "Norma de um vector",
          "Distância entre dois pontos",
          "Equações da recta",
          "Declive ou coeficiente angular da recta",
          "Mediatriz de um segmento de recta",
          "Equação da circunferência",
          "Domínios planos",
        ],
      },
      {
        id: "math-4",
        numeral: "IV",
        title: "Trigonometria",
        description: "Relações, círculos e funções que medem ângulos e triângulos.",
        topics: [
          "Razões trigonométricas de um ângulo agudo no triângulo rectângulo",
          "Fórmula fundamental da trigonometria",
          "Problemas que envolvem triângulos rectângulos",
          "Círculo trigonométrico",
          "Equações trigonométricas",
          "Estudo das funções trigonométricas",
        ],
      },
      {
        id: "math-5",
        numeral: "V",
        title: "Sucessões e progressões",
        description: "Padrões numéricos, termos, somas, interpolação e limites.",
        topics: [
          "Conceito de sucessões",
          "Progressão aritmética (PA)",
          "Termo geral de uma PA",
          "Interpolação aritmética",
          "Soma dos n primeiros termos de uma PA",
          "Progressão geométrica (PG)",
          "Termo geral de uma PG",
          "Interpolação geométrica",
          "Soma dos n primeiros termos de uma PG",
          "Limites de sucessões",
        ],
      },
      {
        id: "math-6",
        numeral: "VI",
        title: "Funções",
        description: "As relações entre grandezas, os seus conjuntos e a leitura gráfica.",
        topics: [
          "Conceito de função",
          "Domínio",
          "Contradomínio",
          "Assímptotas",
          "Representação gráfica",
        ],
      },
      {
        id: "math-7",
        numeral: "VII",
        title: "Limites",
        description: "Continuidade, indeterminações e o comportamento de funções.",
        topics: [
          "Limites e continuidades de funções",
          "Tipos de indeterminações",
          "Limites fundamentais",
          "Infinitésimos",
        ],
      },
      {
        id: "math-8",
        numeral: "VIII",
        title: "Derivadas",
        description: "Variação, regras de cálculo e aplicações práticas das derivadas.",
        topics: [
          "Conceito de derivadas",
          "Definição da derivada de uma função",
          "Regras de derivação",
          "Regra da cadeia",
          "Aplicações das derivadas",
        ],
      },
      {
        id: "math-10",
        numeral: "X",
        title: "Integrais",
        description: "A operação inversa da derivação e o cálculo de áreas.",
        topics: [
          "Definição",
          "Integrais imediatas",
          "Integrais de funções algébricas",
          "Integrais de funções transcendentes",
          "Integrais por substituição",
          "Integrais por partes",
          "Cálculo de área",
        ],
      },
    ],
  },
  {
    id: "portuguese",
    label: "Língua Portuguesa",
    eyebrow: "Programa II",
    short: "Compreensão, expressão e estrutura.",
    description:
      "Cinco temas para dominar a comunicação, a leitura, a gramática, as palavras e a construção de frases.",
    icon: Languages,
    image: ASSETS.language,
    accent: "gold",
    chapters: [
      {
        id: "pt-1",
        numeral: "01",
        title: "Comunicação e linguagem",
        description: "A base para reconhecer como comunicamos e como a linguagem funciona.",
        topics: [
          "Elementos de comunicação",
          "Tipos de linguagem (oral e verbal)",
          "Funções da linguagem",
        ],
      },
      {
        id: "pt-2",
        numeral: "02",
        title: "Textos",
        description: "Leitura atenta para distinguir vozes, intenções e organizações textuais.",
        topics: [
          "Interpretação de textos",
          "Texto literário e não literário",
          "Organização do texto",
        ],
      },
      {
        id: "pt-3",
        numeral: "03",
        title: "Gramática",
        description: "As estruturas que sustentam uma escrita clara, correcta e consciente.",
        topics: [
          "As principais divisões da gramática",
          "Acentuação e pontuação",
          "Tempos e modos dos verbos",
        ],
      },
      {
        id: "pt-4",
        numeral: "04",
        title: "Palavras",
        description: "Som, forma, sentido e as famílias que dão origem ao vocabulário.",
        topics: [
          "Relação fonética e gráfica entre as palavras",
          "Relação semântica entre as palavras",
          "Formação e classe de palavras",
        ],
      },
      {
        id: "pt-5",
        numeral: "05",
        title: "Frases",
        description: "A arquitectura da oração, da coordenação à subordinação.",
        topics: [
          "Tipos e formas de frases",
          "Coordenação e subordinação",
          "Funções sintácticas dos constituintes da oração",
        ],
      },
    ],
  },
  {
    id: "culture",
    label: "Cultura Geral",
    eyebrow: "Programa III",
    short: "Contexto, memória e tecnologia.",
    description:
      "Um tema de actualidade para situar o candidato nos principais marcos ligados às TIC em Angola.",
    icon: Globe2,
    image: ASSETS.culture,
    accent: "terracotta",
    chapters: [
      {
        id: "culture-1",
        numeral: "01",
        title: "Datas, eventos e acontecimentos relacionados com as TIC em Angola",
        description: "Uma leitura contextual dos marcos que ajudam a compreender o país tecnológico.",
        topics: [
          "Principais datas relacionadas com as TIC em Angola",
          "Eventos marcantes do sector tecnológico",
          "Acontecimentos relevantes para a sociedade digital angolana",
        ],
      },
    ],
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [activeSubject, setActiveSubject] = useState<SubjectId>("math");
  const [query, setQuery] = useState("");
  const [openChapters, setOpenChapters] = useState<string[]>(["math-1"]);
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("programa-ul-reviewed");
      if (saved) setReviewed(JSON.parse(saved) as string[]);
    } catch {
      // O progresso é opcional e não deve bloquear a leitura do programa.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("programa-ul-reviewed", JSON.stringify(reviewed));
    } catch {
      // Ambientes com armazenamento indisponível continuam totalmente navegáveis.
    }
  }, [reviewed]);

  const currentSubject = subjects.find((subject) => subject.id === activeSubject) ?? subjects[0];
  const totalChapters = subjects.reduce((total, subject) => total + subject.chapters.length, 0);
  const totalTopics = subjects.reduce(
    (total, subject) => total + subject.chapters.reduce((subtotal, chapter) => subtotal + chapter.topics.length, 0),
    0,
  );

  const filteredChapters = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt");
    if (!normalized) return currentSubject.chapters;
    return currentSubject.chapters.filter((chapter) =>
      [chapter.title, chapter.description, ...chapter.topics].some((item) =>
        item.toLocaleLowerCase("pt").includes(normalized),
      ),
    );
  }, [currentSubject, query]);

  const toggleChapter = (chapterId: string) => {
    setOpenChapters((current) =>
      current.includes(chapterId) ? current.filter((id) => id !== chapterId) : [...current, chapterId],
    );
  };

  const toggleReviewed = (chapterId: string) => {
    setReviewed((current) =>
      current.includes(chapterId) ? current.filter((id) => id !== chapterId) : [...current, chapterId],
    );
  };

  const changeSubject = (subjectId: SubjectId) => {
    setActiveSubject(subjectId);
    setQuery("");
    setMobileNavOpen(false);
    window.setTimeout(() => scrollToId("programa"), 20);
  };

  return (
    <div className="site-shell min-h-screen overflow-x-hidden bg-paper text-ink">
      <header className="site-header sticky top-0 z-50 border-b border-white/10 bg-ink/95 text-white backdrop-blur-xl">
        <div className="container flex h-[76px] items-center justify-between gap-5">
          <a href="#topo" className="brand-lockup flex min-w-0 items-center gap-3" aria-label="Programa de acesso — início">
            <span className="brand-mark grid size-11 shrink-0 place-items-center rounded-full bg-gold/15 ring-1 ring-gold/60">
              <img src={ASSETS.signet} alt="" className="size-7 object-contain" />
            </span>
            <span className="hidden min-w-0 leading-none sm:block">
              <span className="block font-display text-lg tracking-tight">Universidade de Luanda</span>
              <span className="mt-1 block truncate text-[9px] font-extrabold uppercase tracking-[0.22em] text-white/55">
                Programa do exame de acesso
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
            <a className="nav-link" href="#programa">O programa</a>
            <a className="nav-link" href="#metodo">Como usar</a>
            <a className="nav-link" href="#contactos">Contactos</a>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden h-10 rounded-full border-white/25 bg-transparent px-4 text-xs font-extrabold uppercase tracking-[0.12em] text-white hover:bg-white hover:text-ink sm:flex"
              onClick={() => scrollToId("programa")}
            >
              Ver tópicos <ArrowDownRight className="ml-2 size-4" />
            </Button>
            <button
              className="grid size-10 place-items-center rounded-full border border-white/20 text-white transition hover:border-gold hover:text-gold md:hidden"
              aria-label={mobileNavOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              {mobileNavOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <nav className="border-t border-white/10 bg-ink px-5 py-4 md:hidden" aria-label="Navegação móvel">
            <div className="container flex flex-col gap-1">
              {[{ href: "#programa", label: "O programa" }, { href: "#metodo", label: "Como usar" }, { href: "#contactos", label: "Contactos" }].map((item) => (
                <a key={item.href} href={item.href} className="rounded-xl px-3 py-3 text-sm font-bold text-white/75 hover:bg-white/10 hover:text-white" onClick={() => setMobileNavOpen(false)}>
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main>
        <section id="topo" className="hero-section relative isolate overflow-hidden bg-ink text-white">
          <div className="hero-image absolute inset-y-0 right-0 w-full opacity-75 lg:w-[68%]" style={{ backgroundImage: `url(${ASSETS.hero})` }} aria-hidden="true" />
          <div className="hero-shade absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/20 lg:to-transparent" aria-hidden="true" />
          <div className="hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="container relative z-10 grid min-h-[min(770px,calc(100vh-76px))] items-center gap-10 py-16 lg:grid-cols-[minmax(0,1.06fr)_minmax(320px,0.64fr)] lg:py-24">
            <div className="max-w-3xl">
              <div className="reveal flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.26em] text-gold">
                <span className="h-px w-10 bg-gold" />
                Departamento dos Assuntos Académicos
              </div>
              <div className="hero-seal absolute right-5 top-8 hidden items-center gap-3 text-right lg:flex" aria-hidden="true">
                <span className="text-[9px] font-extrabold uppercase leading-4 tracking-[0.18em] text-white/40">Selo<br />institucional</span>
                <span className="grid size-16 place-items-center rounded-full border border-gold/60 bg-ink/30 p-2"><img src={ASSETS.signet} alt="" className="size-full object-contain" /></span>
              </div>
              <h1 className="reveal reveal-delay-1 mt-6 max-w-4xl font-display text-[clamp(3.55rem,8vw,7.45rem)] leading-[0.88] tracking-[-0.06em] text-white">
                O programa começa com um <em className="text-gold">mapa.</em>
              </h1>
              <p className="reveal reveal-delay-2 mt-8 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
                Uma leitura clara e orientada dos tópicos para o exame de acesso. Encontre a disciplina, abra o capítulo e transforme um documento denso num próximo passo concreto.
              </p>
              <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
                <Button className="h-12 rounded-full bg-gold px-6 text-sm font-extrabold text-ink shadow-[0_16px_35px_rgba(199,164,91,0.2)] transition hover:-translate-y-0.5 hover:bg-[#d4b66f]" onClick={() => scrollToId("programa")}>
                  Explorar o programa <ArrowDownRight className="ml-2 size-4" />
                </Button>
                <button className="group flex h-12 items-center gap-3 rounded-full border border-white/20 px-5 text-sm font-bold text-white/85 transition hover:border-white/55 hover:bg-white/10" onClick={() => scrollToId("metodo")}>
                  Como estudar melhor <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </div>
              <div className="reveal reveal-delay-4 mt-14 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-6 text-xs text-white/50">
                <span><strong className="mr-2 text-lg text-white">03</strong> áreas de exame</span>
                <span><strong className="mr-2 text-lg text-white">{totalChapters}</strong> blocos de estudo</span>
                <span><strong className="mr-2 text-lg text-white">{totalTopics}+</strong> tópicos catalogados</span>
              </div>
            </div>

            <aside className="hero-index reveal reveal-delay-2 relative ml-auto w-full max-w-[420px] border border-white/20 bg-ink/60 p-6 backdrop-blur-md lg:mt-16" aria-label="Índice rápido do programa">
              <div className="index-seal absolute -right-4 -top-5 grid size-12 place-items-center rounded-full bg-gold p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.25)]"><img src={ASSETS.signet} alt="" className="size-full object-contain" /></div>
              <div className="flex items-start justify-between gap-5 border-b border-white/15 pb-5">
                <div>
                  <span className="eyebrow text-gold">Índice rápido</span>
                  <h2 className="mt-2 font-display text-3xl text-white">Três entradas.</h2>
                </div>
                <Compass className="size-7 text-gold" strokeWidth={1.4} />
              </div>
              <div className="mt-2">
                {subjects.map((subject, index) => {
                  const Icon = subject.icon;
                  return (
                    <button key={subject.id} className="index-row group flex w-full items-center gap-4 border-b border-white/10 py-4 text-left last:border-b-0" onClick={() => changeSubject(subject.id)}>
                      <span className="font-display text-2xl text-white/30 transition group-hover:text-gold">0{index + 1}</span>
                      <span className="grid size-9 place-items-center rounded-full bg-white/10 text-gold transition group-hover:bg-gold group-hover:text-ink"><Icon className="size-4" /></span>
                      <span className="flex-1 text-sm font-bold text-white/80 transition group-hover:text-white">{subject.label}</span>
                      <ArrowUpRight className="size-4 text-white/35 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
                    </button>
                  );
                })}
              </div>
              <p className="mt-5 text-xs leading-5 text-white/45">Use este índice como ponto de partida. O conteúdo mantém a ordem e a nomenclatura do programa enviado.</p>
            </aside>
          </div>
          <div className="hero-bottom-line absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-coral to-transparent" />
        </section>

        <section className="intro-strip border-b border-ink/10 bg-paper-deep">
          <div className="container grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-start gap-4">
              <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full bg-blue/10 text-blue"><FileText className="size-5" /></span>
              <div>
                <p className="eyebrow text-blue">Documento de referência</p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/65">A experiência foi estruturada a partir do programa de Matemática, Língua Portuguesa e Cultura Geral do material fornecido, com foco em consulta rápida e preparação autónoma.</p>
              </div>
            </div>
            <button className="group flex items-center gap-2 text-sm font-extrabold text-blue" onClick={() => scrollToId("programa")}>Ir para os tópicos <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></button>
          </div>
        </section>

        <section id="programa" className="program-section section-anchor relative bg-paper py-20 sm:py-28">
          <div className="program-seal absolute right-[6%] top-24 hidden opacity-[0.07] lg:block" aria-hidden="true"><img src={ASSETS.signet} alt="" className="size-40 grayscale" /></div>
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
              <div>
                <p className="eyebrow text-blue">O percurso completo</p>
                <h2 className="section-title mt-4 max-w-xl font-display text-5xl leading-[0.95] tracking-[-0.045em] text-ink sm:text-6xl">Estude por <em className="text-blue">camadas.</em></h2>
              </div>
              <div className="flex items-end justify-between gap-6 lg:pb-1">
                <p className="max-w-md text-sm leading-6 text-ink/60">Comece com a visão geral. Depois, aprofunde cada disciplina e marque os capítulos que já reviu.</p>
                <div className="hidden shrink-0 text-right sm:block"><span className="block font-display text-4xl text-blue">{reviewed.length.toString().padStart(2, "0")}</span><span className="eyebrow text-ink/45">revistos</span></div>
              </div>
            </div>

            <div className="mt-12 grid gap-4 border-y border-ink/15 py-5 md:grid-cols-3">
              {subjects.map((subject) => {
                const Icon = subject.icon;
                const isActive = activeSubject === subject.id;
                return (
                  <button key={subject.id} className={`subject-tab group flex items-center gap-4 border-l-2 px-4 py-3 text-left transition ${isActive ? `subject-tab-active ${subject.accent}` : "border-transparent opacity-60 hover:opacity-100"}`} onClick={() => changeSubject(subject.id)} aria-pressed={isActive}>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink/5 text-blue transition group-hover:bg-blue group-hover:text-white"><Icon className="size-5" /></span>
                    <span className="min-w-0 flex-1"><span className="block text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink/45">{subject.eyebrow}</span><span className="mt-1 block truncate font-display text-xl text-ink">{subject.label}</span></span>
                    <span className="text-xs font-extrabold text-ink/35">{subject.chapters.length.toString().padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(190px,0.3fr)_minmax(0,1fr)]">
              <aside className="program-aside lg:sticky lg:top-28 lg:self-start">
                <div className="relative pl-8">
                  <div className="absolute bottom-0 left-[7px] top-1 w-px bg-ink/15" aria-hidden="true" />
                  {subjects.map((subject, index) => (
                    <button key={subject.id} className={`relative mb-6 flex w-full items-start gap-4 text-left last:mb-0 ${activeSubject === subject.id ? "text-blue" : "text-ink/35 hover:text-ink/70"}`} onClick={() => changeSubject(subject.id)}>
                      <span className={`absolute -left-8 top-1 grid size-4 place-items-center rounded-full border-2 bg-paper ${activeSubject === subject.id ? "border-blue" : "border-ink/25"}`}><span className={`size-1.5 rounded-full ${activeSubject === subject.id ? "bg-blue" : "bg-transparent"}`} /></span>
                      <span><span className="block text-[10px] font-extrabold uppercase tracking-[0.16em]">0{index + 1}</span><span className="mt-1 block font-display text-xl leading-none">{subject.label}</span></span>
                    </button>
                  ))}
                </div>
                <div className="mt-12 border-t border-ink/10 pt-5">
                  <span className="eyebrow text-ink/40">Estado de leitura</span>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10"><div className="h-full bg-coral transition-all duration-500" style={{ width: `${Math.min((reviewed.length / totalChapters) * 100, 100)}%` }} /></div>
                  <p className="mt-3 text-xs leading-5 text-ink/55">Marque capítulos revistos e construa um ritmo de estudo que seja seu.</p>
                </div>
              </aside>

              <div>
                <div className="relative mb-9 grid gap-7 border-b border-ink/10 pb-9 md:grid-cols-[1fr_0.78fr] md:items-end">
                  <div>
                    <span className="eyebrow text-blue">{currentSubject.eyebrow}</span>
                    <h3 className="mt-2 font-display text-4xl leading-none tracking-[-0.035em] text-ink sm:text-5xl">{currentSubject.label}</h3>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-ink/60">{currentSubject.description}</p>
                  </div>
                  <div className={`subject-visual subject-visual-${currentSubject.id} h-36 overflow-hidden md:h-28`} aria-hidden="true"><span className="subject-visual-label">{currentSubject.eyebrow}</span><span className="subject-visual-mark">{currentSubject.id === "math" ? "∑" : currentSubject.id === "portuguese" ? "Aa" : "∞"}</span><span className="subject-visual-line subject-visual-line-one" /><span className="subject-visual-line subject-visual-line-two" /></div>
                </div>

                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-bold text-ink/55"><span className="font-display text-2xl text-blue">{filteredChapters.length.toString().padStart(2, "0")}</span> {filteredChapters.length === 1 ? "bloco" : "blocos"} nesta área</p>
                  <label className="relative block w-full sm:max-w-[260px]">
                    <span className="sr-only">Pesquisar nos tópicos de {currentSubject.label}</span>
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/35" />
                    <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar tópico" className="h-10 w-full rounded-full border border-ink/15 bg-transparent pl-10 pr-4 text-sm outline-none transition placeholder:text-ink/35 focus:border-blue focus:ring-2 focus:ring-blue/10" />
                  </label>
                </div>

                <div className="chapter-list space-y-3">
                  {filteredChapters.length === 0 ? (
                    <div className="border border-dashed border-ink/20 p-8 text-center"><Search className="mx-auto size-5 text-ink/30" /><p className="mt-3 text-sm text-ink/55">Nenhum tópico encontrado nesta disciplina.</p><button className="mt-3 text-sm font-bold text-blue" onClick={() => setQuery("")}>Limpar pesquisa</button></div>
                  ) : filteredChapters.map((chapter, index) => {
                    const isOpen = openChapters.includes(chapter.id);
                    const isReviewed = reviewed.includes(chapter.id);
                    return (
                      <article key={chapter.id} className={`chapter-card group border transition ${isOpen ? "border-blue/40 bg-white shadow-[0_16px_40px_rgba(13,79,115,0.07)]" : "border-ink/10 bg-paper-deep hover:border-ink/25"}`}>
                        <div className="flex items-start gap-4 p-5 sm:gap-6 sm:p-6">
                          <span className={`chapter-number shrink-0 font-display text-3xl leading-none ${isOpen ? "text-blue" : "text-ink/25"}`}>{chapter.numeral}</span>
                          <button className="min-w-0 flex-1 text-left" onClick={() => toggleChapter(chapter.id)} aria-expanded={isOpen}>
                            <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink/40">Bloco {String(index + 1).padStart(2, "0")}</span>
                            <span className="mt-1 block font-display text-[1.55rem] leading-tight tracking-[-0.025em] text-ink">{chapter.title}</span>
                            <span className="mt-2 block max-w-2xl text-sm leading-6 text-ink/55">{chapter.description}</span>
                          </button>
                          <button className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border transition ${isOpen ? "border-blue bg-blue text-white" : "border-ink/15 text-ink/40 hover:border-blue hover:text-blue"}`} onClick={() => toggleChapter(chapter.id)} aria-label={isOpen ? `Fechar ${chapter.title}` : `Abrir ${chapter.title}`}>
                            <ChevronDown className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                          </button>
                        </div>
                        {isOpen && (
                          <div className="chapter-detail border-t border-ink/10 px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
                            <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
                              <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                                {chapter.topics.map((topic, topicIndex) => (
                                  <div key={topic} className="flex gap-3 text-sm leading-5 text-ink/70"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" /><span><span className="mr-2 text-[10px] font-extrabold text-blue/50">{String(topicIndex + 1).padStart(2, "0")}</span>{topic}</span></div>
                                ))}
                              </div>
                              <button className={`flex shrink-0 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.08em] transition ${isReviewed ? "border-coral bg-coral text-white" : "border-ink/15 text-ink/55 hover:border-coral hover:text-coral"}`} onClick={() => toggleReviewed(chapter.id)}>
                                {isReviewed ? <Check className="size-4" /> : <Target className="size-4" />}
                                {isReviewed ? "Revisto" : "Marcar como revisto"}
                              </button>
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="metodo" className="method-section section-anchor relative overflow-hidden bg-blue py-20 text-white sm:py-28">
          <div className="method-pattern absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="container relative z-10 grid gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
            <div>
              <p className="eyebrow text-gold">Um método simples</p>
              <h2 className="mt-4 max-w-md font-display text-5xl leading-[0.92] tracking-[-0.045em] text-white sm:text-6xl">Menos ruído. Mais <em className="text-gold">direcção.</em></h2>
              <p className="mt-6 max-w-sm text-sm leading-6 text-white/65">O programa é extenso, mas o estudo pode ser organizado. Use a interface como uma mesa de trabalho e não como uma lista para decorar.</p>
            </div>
            <div className="grid divide-y divide-white/15 border-y border-white/15">
              {[
                { number: "01", title: "Escolha uma entrada", body: "Comece pela disciplina que precisa de maior atenção. O índice lateral mantém o contexto sempre à vista.", icon: Compass },
                { number: "02", title: "Abra um bloco de cada vez", body: "Leia a descrição, percorra os tópicos e transforme cada linha do programa numa pequena sessão de estudo.", icon: BookOpen },
                { number: "03", title: "Registe o que já reviu", body: "O marcador fica guardado neste navegador. Volte à página e retome o seu percurso sem perder a referência.", icon: Check },
              ].map((step) => {
                const Icon = step.icon;
                return <div key={step.number} className="group grid gap-4 py-6 sm:grid-cols-[60px_1fr_auto] sm:items-center"><span className="font-display text-3xl text-gold/70">{step.number}</span><div><h3 className="font-display text-2xl text-white">{step.title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-white/55">{step.body}</p></div><span className="hidden size-11 place-items-center rounded-full border border-white/15 text-gold transition group-hover:border-gold group-hover:bg-gold group-hover:text-blue sm:grid"><Icon className="size-5" /></span></div>;
              })}
            </div>
          </div>
        </section>

        <section className="closing-section bg-paper-deep py-20 sm:py-28">
          <div className="container grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div className="relative overflow-hidden border border-ink/10 bg-paper p-8 sm:p-12">
              <Sparkles className="absolute -right-3 -top-3 size-24 text-gold/20" strokeWidth={1} />
              <p className="eyebrow text-blue">Uma preparação com contexto</p>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[0.98] tracking-[-0.04em] text-ink sm:text-5xl">O próximo capítulo começa quando a dúvida fica <em className="text-coral">visível.</em></h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-ink/60">Volte sempre que precisar. O programa não muda de lugar: a cada visita, ele mostra apenas o ponto onde quer continuar.</p>
              <Button className="mt-8 h-11 rounded-full bg-blue px-5 text-sm font-extrabold text-white hover:bg-ink" onClick={() => scrollToId("programa")}>Voltar ao programa <ArrowUpRight className="ml-2 size-4" /></Button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              <div className="stat-block bg-ink p-6 text-white"><span className="eyebrow text-gold">Áreas</span><strong className="mt-5 block font-display text-5xl">03</strong><span className="mt-2 block text-xs leading-5 text-white/55">Matemática, Português e Cultura Geral</span></div>
              <div className="stat-block border border-ink/10 bg-paper p-6 text-ink"><span className="eyebrow text-blue/65">Tópicos</span><strong className="mt-5 block font-display text-5xl text-blue">{totalTopics}+</strong><span className="mt-2 block text-xs leading-5 text-ink/60">organizados numa só leitura</span></div>
              <div className="stat-block col-span-2 border border-ink/10 bg-paper p-6 text-ink sm:col-span-1 lg:col-span-2"><span className="eyebrow text-coral/75">Ritmo</span><strong className="mt-5 block font-display text-5xl text-coral">{reviewed.length.toString().padStart(2, "0")}</strong><span className="mt-2 block text-xs leading-5 text-ink/60">blocos marcados como revistos</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contactos" className="border-t border-white/10 bg-ink text-white">
        <div className="container grid gap-10 py-12 md:grid-cols-[1.1fr_0.9fr_0.8fr] md:items-start">
          <div>
            <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-gold/15 ring-1 ring-gold/50"><img src={ASSETS.signet} alt="" className="size-7" /></span><span className="font-display text-2xl">Universidade de Luanda</span></div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/50">Instituto de Tecnologias de Informação e Comunicação. Um guia digital para ler melhor o programa do exame de acesso.</p>
          </div>
          <div><p className="eyebrow text-gold">Departamento</p><p className="mt-3 text-sm leading-6 text-white/65">Assuntos Académicos<br />Bairro dos CTT’s, km 7, Rangel<br />Luanda — Angola</p></div>
          <div><p className="eyebrow text-gold">Contactos</p><p className="mt-3 text-sm leading-6 text-white/65">222 041 728<br /><a className="transition hover:text-gold" href="mailto:instic2020@gmail.com">instic2020@gmail.com</a></p></div>
        </div>
        <div className="border-t border-white/10"><div className="container flex flex-col gap-3 py-5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/35 sm:flex-row sm:items-center sm:justify-between"><span>Programa do exame de acesso · 2026</span><span>Conteúdo organizado a partir do documento fornecido</span></div></div>
      </footer>
    </div>
  );
}
