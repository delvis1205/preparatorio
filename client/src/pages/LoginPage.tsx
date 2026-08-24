import { useEffect } from "react";
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import { startLogin } from "@/const";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";

export default function LoginPage() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) window.location.replace("/app");
  }, [loading, user]);

  return (
    <main className="min-h-screen bg-[#F7F9FC] text-slate-950">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <section className="relative overflow-hidden rounded-[2rem] bg-[#0A36A8] px-8 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-12 sm:py-16">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border-[28px] border-[#FFCC5C]/20" />
          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#FFCC5C]/10" />
          <div className="relative max-w-xl">
            <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide">
              <BookOpen className="h-4 w-4 text-[#FFCC5C]" />
              LUANDA PREP
            </div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#FFCC5C]">Estudo com direcção</p>
            <h1 className="max-w-lg text-4xl font-bold leading-tight sm:text-6xl">Prepare-se para o exame com clareza e consistência.</h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-blue-100">Módulos organizados, prática inteligente, revisão espaçada, simulados e apoio contextual do LUANDA AI numa única experiência.</p>
            <div className="mt-10 grid gap-4 text-sm text-blue-100 sm:grid-cols-3">
              <div><strong className="block text-2xl text-white">5</strong>disciplinas</div>
              <div><strong className="block text-2xl text-white">100%</strong>foco no percurso</div>
              <div><strong className="block text-2xl text-white">AI</strong>tutor contextual</div>
            </div>
          </div>
        </section>
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5 sm:p-10">
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0A36A8]">Área do estudante</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">Entre para continuar o seu percurso</h2>
            <p className="mt-3 leading-7 text-slate-600">Use a sua conta Manus para manter o perfil, o progresso, os favoritos, as revisões e os resultados sincronizados com segurança.</p>
          </div>
          <Button type="button" onClick={() => startLogin()} disabled={loading} className="h-12 w-full bg-[#0A36A8] text-base font-semibold text-white hover:bg-[#082d8d]">
            {loading ? "A preparar acesso…" : "Entrar com Manus"}
            {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-slate-600">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0A36A8]" />
            <span>A autenticação é gerida pela Manus. O LUANDA PREP não armazena palavras-passe próprias.</span>
          </div>
        </section>
      </div>
    </main>
  );
}
