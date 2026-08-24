import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { BookOpenCheck, Clock3, FileSearch, Filter, Search, SlidersHorizontal, Target } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";

const disciplines = [
  ["all", "Programa misto"],
  ["matematica", "Matemática"],
  ["fisica", "Física"],
  ["quimica", "Química"],
  ["geometria", "Desenho e Geometria"],
  ["portugues", "Língua Portuguesa"],
  ["cultura", "Cultura Geral"],
] as const;

type Discipline = (typeof disciplines)[number][0];
type Difficulty = "all" | "Inicial" | "Intermédio" | "Avançado";
type Mode = "all" | "practice" | "exam";

function formatDuration(seconds: number) {
  const minutes = Math.max(0, Math.round(seconds / 60));
  return minutes ? `${minutes} min` : "Sem tempo registado";
}

function formatDate(value: Date | string) {
  return new Date(value).toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" });
}

export default function SimulationsExplorer() {
  const [, setLocation] = useLocation();
  const catalog = trpc.learning.catalog.useQuery();
  const history = trpc.learning.simulation.history.useQuery();
  const [discipline, setDiscipline] = useState<Discipline>("all");
  const [moduleId, setModuleId] = useState("all");
  const [topic, setTopic] = useState("all");
  const [difficulty, setDifficulty] = useState<Difficulty>("all");
  const [mode, setMode] = useState<Exclude<Mode, "all">>("practice");
  const [count, setCount] = useState(8);
  const [query, setQuery] = useState("");
  const [historyMode, setHistoryMode] = useState<Mode>("all");
  const [period, setPeriod] = useState<"all" | "week" | "month">("all");

  const availableModules = useMemo(() => (catalog.data?.modules ?? []).filter((module) => discipline === "all" || module.disciplineId === discipline), [catalog.data?.modules, discipline]);
  const availableTopics = useMemo(() => availableModules.find((module) => module.id === moduleId)?.officialTopics ?? [], [availableModules, moduleId]);
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-PT");
  const filteredHistory = useMemo(() => {
    const threshold = period === "week" ? Date.now() - 7 * 24 * 60 * 60 * 1000 : period === "month" ? Date.now() - 30 * 24 * 60 * 60 * 1000 : 0;
    return (history.data ?? []).filter((simulation) => {
      const searchable = `${simulation.questions.map((question) => `${question.prompt} ${question.topic}`).join(" ")} ${simulation.topics.join(" ")}`.toLocaleLowerCase("pt-PT");
      return (historyMode === "all" || simulation.mode === historyMode) &&
        (discipline === "all" || simulation.disciplines.includes(discipline)) &&
        (moduleId === "all" || simulation.moduleIds.includes(moduleId)) &&
        (topic === "all" || simulation.topics.includes(topic)) &&
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (!threshold || new Date(simulation.completedAt).getTime() >= threshold);
    });
  }, [discipline, history.data, historyMode, moduleId, normalizedQuery, period, topic]);

  const beginSimulation = () => {
    const params = new URLSearchParams({ count: String(count), mode });
    if (discipline !== "all") params.set("discipline", discipline);
    if (moduleId !== "all") params.set("module", moduleId);
    if (topic !== "all") params.set("topic", topic);
    if (difficulty !== "all") params.set("difficulty", difficulty);
    if (query.trim()) params.set("q", query.trim());
    setLocation(`/app/simulado?${params.toString()}`);
  };

  return (
    <DashboardLayout>
      <header className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="app-kicker">Simulados</p>
          <h1 className="mt-1 font-display text-3xl tracking-tight text-slate-950 sm:text-4xl">Encontre a prova certa e pratique com foco.</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Pesquise provas anteriores por termo, questão, tema ou disciplina. Depois, crie um novo simulado filtrado para o ponto que quer consolidar.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-2xl border border-[#D8E2FF] bg-[#F4F7FF] px-4 py-3 text-sm font-bold text-[#0A36A8]"><FileSearch className="h-4 w-4" />{history.data?.length ?? 0} provas guardadas</div>
      </header>

      <section className="rounded-3xl bg-[#0D1C4D] p-6 text-white shadow-[0_22px_55px_rgba(13,28,77,0.18)] sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="app-kicker text-[#FFCC5C]">Novo simulado focalizado</p><h2 className="mt-2 font-display text-3xl">Escolha o que quer testar.</h2></div><span className="inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-100"><SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" />Filtros aplicados à seleção de questões</span></div>
        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          <select value={discipline} onChange={(event) => { setDiscipline(event.target.value as Discipline); setModuleId("all"); setTopic("all"); }} className="h-11 rounded-xl border border-blue-300/40 bg-white/10 px-3 text-sm font-bold text-white"><option value="all" className="text-slate-900">Programa misto</option>{disciplines.slice(1).map(([id, label]) => <option key={id} value={id} className="text-slate-900">{label}</option>)}</select>
          <select value={moduleId} onChange={(event) => { setModuleId(event.target.value); setTopic("all"); }} className="h-11 rounded-xl border border-blue-300/40 bg-white/10 px-3 text-sm font-bold text-white"><option value="all" className="text-slate-900">Todos os módulos</option>{availableModules.map((module) => <option key={module.id} value={module.id} className="text-slate-900">{module.title}</option>)}</select>
          <select value={topic} onChange={(event) => setTopic(event.target.value)} disabled={moduleId === "all"} className="h-11 rounded-xl border border-blue-300/40 bg-white/10 px-3 text-sm font-bold text-white disabled:opacity-60"><option value="all" className="text-slate-900">Todos os tópicos</option>{availableTopics.map((item) => <option key={item} value={item} className="text-slate-900">{item}</option>)}</select>
          <select value={difficulty} onChange={(event) => setDifficulty(event.target.value as Difficulty)} className="h-11 rounded-xl border border-blue-300/40 bg-white/10 px-3 text-sm font-bold text-white"><option value="all" className="text-slate-900">Todas as dificuldades</option><option value="Inicial" className="text-slate-900">Inicial</option><option value="Intermédio" className="text-slate-900">Intermédio</option><option value="Avançado" className="text-slate-900">Avançado</option></select>
          <select value={count} onChange={(event) => setCount(Number(event.target.value))} className="h-11 rounded-xl border border-blue-300/40 bg-white/10 px-3 text-sm font-bold text-white"><option value={5} className="text-slate-900">5 questões</option><option value={8} className="text-slate-900">8 questões</option><option value={12} className="text-slate-900">12 questões</option><option value={15} className="text-slate-900">15 questões</option></select>
          <div className="grid grid-cols-2 gap-2"><button onClick={() => setMode("practice")} className={`rounded-xl border px-3 text-left text-xs font-bold ${mode === "practice" ? "border-[#FFCC5C] bg-white/10 text-white" : "border-white/20 text-blue-100"}`}>Prática<br /><span className="font-medium">Com explicações</span></button><button onClick={() => setMode("exam")} className={`rounded-xl border px-3 text-left text-xs font-bold ${mode === "exam" ? "border-[#FFCC5C] bg-white/10 text-white" : "border-white/20 text-blue-100"}`}>Modo Exame<br /><span className="font-medium">Sem assistência</span></button></div>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-blue-200" /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 border-blue-300/40 bg-white/10 pl-9 text-white placeholder:text-blue-200" placeholder="Procurar tema ou palavra-chave nas questões" /></div><Button onClick={beginSimulation} className="h-10 rounded-xl bg-white text-[#0A36A8] hover:bg-blue-50"><Target className="mr-1.5 h-4 w-4" />Iniciar simulado</Button></div>
      </section>

      <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="app-kicker text-slate-400">Biblioteca de provas</p><h2 className="mt-1 font-display text-3xl text-slate-950">Localize uma tentativa anterior.</h2></div><div className="flex flex-wrap gap-2"><select value={historyMode} onChange={(event) => setHistoryMode(event.target.value as Mode)} className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700"><option value="all">Todos os modos</option><option value="practice">Prática</option><option value="exam">Modo Exame</option></select><select value={period} onChange={(event) => setPeriod(event.target.value as typeof period)} className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700"><option value="all">Todo o período</option><option value="week">Últimos 7 dias</option><option value="month">Últimos 30 dias</option></select></div></div>
        {history.isLoading ? <div className="mt-6 h-40 animate-pulse rounded-2xl bg-slate-100" /> : filteredHistory.length ? <div className="mt-6 grid gap-4 lg:grid-cols-2">{filteredHistory.map((simulation) => <article key={simulation.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="flex items-start justify-between gap-3"><div><span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] ${simulation.mode === "exam" ? "bg-amber-100 text-amber-800" : "bg-[#E7EDFF] text-[#0A36A8]"}`}>{simulation.mode === "exam" ? "Modo Exame" : "Prática"}</span><h3 className="mt-3 text-lg font-bold text-slate-950">{simulation.correctAnswers}/{simulation.totalQuestions} correctas <span className="text-slate-400">· {simulation.percent}%</span></h3><p className="mt-1 text-xs text-slate-500">Concluído em {formatDate(simulation.completedAt)} · {formatDuration(simulation.durationSeconds)}</p></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#0A36A8]"><BookOpenCheck className="h-5 w-5" /></span></div><div className="mt-4 flex flex-wrap gap-2">{simulation.topics.slice(0, 3).map((item) => <span key={item} className="rounded-lg bg-white px-2 py-1 text-xs font-semibold text-slate-600">{item}</span>)}{simulation.topics.length > 3 ? <span className="rounded-lg bg-white px-2 py-1 text-xs font-semibold text-slate-500">+{simulation.topics.length - 3}</span> : null}</div><div className="mt-4 rounded-xl bg-white p-3"><p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Questão incluída</p><p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-700">{simulation.questions[0]?.prompt || "Questões não disponíveis."}</p></div></article>)}</div> : <div className="mt-6 grid min-h-48 place-items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center"><div><Filter className="mx-auto h-8 w-8 text-[#0A36A8]" /><p className="mt-3 font-bold text-slate-900">Nenhuma prova corresponde aos filtros.</p><p className="mt-1 text-sm text-slate-600">Ajuste a pesquisa ou crie um novo simulado focalizado.</p></div></div>}
      </section>
    </DashboardLayout>
  );
}
