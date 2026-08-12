import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, KeyRound, Mail, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();
  const utils = trpc.useUtils();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = trpc.auth.localLogin.useMutation({ onSuccess: async (data) => { utils.auth.me.setData(undefined, data); await utils.auth.me.invalidate(); setLocation("/app"); } });
  useEffect(() => { if (user) setLocation("/app"); }, [user, setLocation]);
  const submit = (event: React.FormEvent) => { event.preventDefault(); login.mutate({ name: name || undefined, email, password }); };
  return <main className="app-surface grid min-h-screen place-items-center px-5 py-10"><section className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/95 p-7 shadow-[0_24px_80px_rgba(24,47,87,0.14)] sm:p-9"><Link href="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-[#0A36A8]"><ArrowLeft className="mr-1 h-4 w-4" />Voltar ao início</Link><p className="mt-7 app-kicker text-[#0A36A8]">Acesso ao estudante</p><h1 className="mt-2 font-display text-4xl text-slate-950">Entre no seu percurso.</h1><p className="mt-3 text-sm leading-6 text-slate-600">No primeiro acesso, informe o nome, o e-mail e uma palavra-passe. O perfil é criado automaticamente, sem página de cadastro separada.</p><form onSubmit={submit} className="mt-7 space-y-4"><div><Label htmlFor="name">Nome <span className="font-normal text-slate-400">(necessário no primeiro acesso)</span></Label><div className="relative mt-2"><UserRound className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><Input id="name" value={name} onChange={(event) => setName(event.target.value)} className="h-11 pl-9" placeholder="O seu nome" autoComplete="name" /></div></div><div><Label htmlFor="email">E-mail</Label><div className="relative mt-2"><Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-11 pl-9" placeholder="nome@exemplo.com" autoComplete="email" required /></div></div><div><Label htmlFor="password">Palavra-passe</Label><div className="relative mt-2"><KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-11 pl-9" placeholder="Mínimo de 8 caracteres" autoComplete="current-password" minLength={8} required /></div></div>{login.error && <p className="rounded-xl bg-rose-50 p-3 text-sm font-medium text-rose-700">{login.error.message}</p>}<Button type="submit" disabled={loading || login.isPending} className="mt-2 h-11 w-full rounded-xl bg-[#0A36A8] text-white hover:bg-[#092e90]">{login.isPending ? "A guardar…" : "Continuar"}</Button></form><p className="mt-5 text-center text-xs leading-5 text-slate-500">A sua palavra-passe é guardada somente como hash de segurança e nunca é apresentada na plataforma.</p></section></main>;
}
