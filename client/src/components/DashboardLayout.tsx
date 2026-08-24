import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/useMobile";
import {
  BookOpen,
  BrainCircuit,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronRight,
  Menu,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  PenLine,
  Route,
  UserRound,
} from "lucide-react";
import { useLocation } from "wouter";
import { ShareInviteButton } from "./ShareInviteButton";
import { DashboardLayoutSkeleton } from "./DashboardLayoutSkeleton";

const markUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath fill='%230A36A8' d='M32 4C18 4 7 15 7 29c0 15 12 27 25 31 13-4 25-16 25-31C57 15 46 4 32 4Z'/%3E%3Cpath fill='%23FFCC5C' d='M32 13c-8 0-15 7-15 16h6c0-5 4-9 9-9s9 4 9 9h6c0-9-7-16-15-16Z'/%3E%3Cpath fill='white' d='M20 35h24v6H20zm5 9h14v6H25z'/%3E%3C/svg%3E";

const menuItems = [
  { icon: LayoutDashboard, label: "Visão geral", path: "/app" },
  { icon: BookOpen, label: "Programa oficial", path: "/app/estudar" },
  { icon: BookOpen, label: "TIC em Angola", path: "/app/tic-angola" },
  { icon: PenLine, label: "Praticar", path: "/app/praticar" },
  { icon: ClipboardCheck, label: "Quiz rápido", path: "/app/quiz" },
  { icon: GraduationCap, label: "Desafios", path: "/app/desafios" },
  { icon: ClipboardCheck, label: "Revisão", path: "/app/revisao" },
  { icon: Route, label: "Simulados", path: "/app/simulados" },
  { icon: BrainCircuit, label: "LUANDA AI", path: "/app/ia" },
  { icon: CalendarDays, label: "Plano", path: "/app/plano" },
  { icon: ChartNoAxesCombined, label: "Progresso", path: "/app/progresso" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAuth();

  if (loading) return <DashboardLayoutSkeleton />;

  if (!user) {
    return (
      <main className="min-h-screen grid place-items-center px-5 app-surface">
        <section className="max-w-md rounded-[2rem] border border-white/70 bg-white/90 p-8 text-center shadow-[0_24px_80px_rgba(24,47,87,0.13)]">
          <img src={markUrl} alt="" className="mx-auto mb-5 h-14 w-14 object-contain" />
          <p className="app-kicker">LUANDA PREP</p>
          <h1 className="mt-2 font-display text-3xl text-slate-950">Entre para continuar o seu percurso.</h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">O seu progresso, respostas, simulados e notas ficam vinculados à sua conta.</p>
          <Button onClick={() => startLogin()} className="mt-7 w-full rounded-xl bg-[#0A36A8] py-6 text-white hover:bg-[#092e90]">Entrar com Manus</Button>
        </section>
      </main>
    );
  }

  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const active = menuItems.find((item) => item.path === location) ?? (location.startsWith("/app/aula/") ? menuItems[1] : undefined);

  return (
    <>
      <Sidebar collapsible="icon" className="border-r border-slate-200/70 bg-white">
        <SidebarHeader className="h-[82px] border-b border-slate-100 px-3">
          <button onClick={() => setLocation("/app")} className="flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A36A8]">
            <img src={markUrl} alt="" className="h-9 w-9 shrink-0 object-contain" />
            <span className="min-w-0 group-data-[collapsible=icon]:hidden">
              <span className="block text-[0.69rem] font-extrabold uppercase tracking-[0.2em] text-[#0A36A8]">LUANDA</span>
              <span className="block font-display text-xl leading-none text-slate-950">PREP</span>
            </span>
          </button>
        </SidebarHeader>

        <SidebarContent className="bg-white px-2 py-4">
          <div className="mb-4 rounded-2xl border border-[#D8E2FF] bg-[#F4F7FF] px-4 py-3 md:hidden">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-[#0A36A8]">Menu de estudo</p>
            <p className="mt-1 text-sm font-bold text-slate-900">Engenharia Informática</p>
          </div>
          <p className="px-3 pb-2 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-slate-400 group-data-[collapsible=icon]:hidden">Engenharia Informática</p>
          <SidebarMenu>
            {menuItems.map((item) => {
              const isActive = item.path === "/app/estudar" ? location === item.path || location.startsWith("/app/aula/") : location === item.path;
              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton isActive={isActive} tooltip={item.label} onClick={() => setLocation(item.path)} className="h-10 rounded-xl px-3 text-slate-600 hover:bg-[#EEF2FF] hover:text-[#0A36A8] data-[active=true]:bg-[#E7EDFF] data-[active=true]:font-bold data-[active=true]:text-[#0A36A8]">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
          <div className="mx-3 mt-6 rounded-2xl bg-[#0D1C4D] p-3 text-white group-data-[collapsible=icon]:hidden">
            <div className="flex items-center gap-2 text-xs font-bold"><GraduationCap className="h-4 w-4 text-[#FFCC5C]" /> Modo de preparação</div>
            <p className="mt-2 text-xs leading-5 text-blue-100">Preparatório gratuito com aulas, definições, prática e revisão.</p>
          </div>
          <div className="mx-3 mt-3 group-data-[collapsible=icon]:hidden"><ShareInviteButton compact className="w-full justify-center bg-[#E7EDFF] text-[#0A36A8] hover:bg-[#D8E2FF] hover:text-[#0A36A8]" /></div>
        </SidebarContent>

        <SidebarFooter className="border-t border-slate-100 p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A36A8]">
                <Avatar className="h-9 w-9 border border-slate-200 bg-[#EFF3FF]"><AvatarFallback className="bg-[#EFF3FF] text-xs font-bold text-[#0A36A8]">{user?.name?.charAt(0).toUpperCase() ?? "E"}</AvatarFallback></Avatar>
                <span className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden"><span className="block truncate text-sm font-bold text-slate-800">{user?.name || "Estudante"}</span><span className="block truncate text-xs text-slate-500">Minha conta</span></span>
                <ChevronRight className="h-4 w-4 text-slate-400 group-data-[collapsible=icon]:hidden" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setLocation("/app/perfil")} className="cursor-pointer"><UserRound className="mr-2 h-4 w-4" />Perfil</DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive"><LogOut className="mr-2 h-4 w-4" />Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-h-screen bg-[#F6F7FB]">
        {isMobile && (
          <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/70 bg-white/95 px-4 backdrop-blur">
            <div className="flex items-center gap-3"><SidebarTrigger aria-label="Abrir menu de estudo" title="Abrir menu de estudo" className="h-10 min-w-[88px] gap-2 rounded-xl bg-[#0A36A8] px-3 text-white shadow-sm hover:bg-[#092E90] hover:text-white focus-visible:ring-2 focus-visible:ring-[#FFCC5C]"><Menu className="h-5 w-5" /><span className="text-sm font-bold">Menu</span></SidebarTrigger><div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0A36A8]">LUANDA PREP</p><p className="text-sm font-bold text-slate-800">{active?.label ?? "Preparação"}</p></div></div>
            <button onClick={() => setLocation("/app/ia")} className="grid h-9 w-9 place-items-center rounded-xl bg-[#E7EDFF] text-[#0A36A8]" aria-label="Abrir LUANDA AI"><BrainCircuit className="h-4 w-4" /></button>
          </header>
        )}
        <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-10 lg:py-8">{children}</main>
      </SidebarInset>
    </>
  );
}
