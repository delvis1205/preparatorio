import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

const NotFound = lazy(() => import("@/pages/NotFound"));
const Home = lazy(() => import("@/pages/Home"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const PasswordRecoveryPage = lazy(() => import("@/pages/LoginPage").then(module => ({ default: module.PasswordRecoveryPage })));
const ResetPasswordPage = lazy(() => import("@/pages/LoginPage").then(module => ({ default: module.ResetPasswordPage })));
const AccountSettingsPage = lazy(() => import("@/pages/AccountSettingsPage"));
const QuizPage = lazy(() => import("@/pages/QuizPage"));
const ChallengesPage = lazy(() => import("@/pages/ChallengesPage"));
const TicTimelinePage = lazy(() => import("@/pages/TicTimelinePage"));
const SimulationsExplorer = lazy(() => import("@/pages/SimulationsExplorer"));
const StudentDashboardPlus = lazy(() => import("@/pages/StudentDashboardPlus"));
const AiPage = lazy(() => import("@/pages/StudentApp").then(module => ({ default: module.AiPage })));
const ExamSessionPage = lazy(() => import("@/pages/StudentApp").then(module => ({ default: module.ExamSessionPage })));
const LessonPage = lazy(() => import("@/pages/StudentApp").then(module => ({ default: module.LessonPage })));
const PlanPage = lazy(() => import("@/pages/StudentApp").then(module => ({ default: module.PlanPage })));
const PracticePage = lazy(() => import("@/pages/StudentApp").then(module => ({ default: module.PracticePage })));
const ProfilePage = lazy(() => import("@/pages/StudentApp").then(module => ({ default: module.ProfilePage })));
const ProgressPage = lazy(() => import("@/pages/StudentApp").then(module => ({ default: module.ProgressPage })));
const ReviewPage = lazy(() => import("@/pages/StudentApp").then(module => ({ default: module.ReviewPage })));
const StudyPage = lazy(() => import("@/pages/StudentApp").then(module => ({ default: module.StudyPage })));

function PageLoading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#F7F9FC] px-6 text-center" role="status" aria-live="polite">
      <div className="w-full max-w-xs rounded-2xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/5">
        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-blue-100 border-t-[#0A36A8]" />
        <p className="mt-4 font-semibold text-slate-900">A preparar a sua experiência de estudo…</p>
        <p className="mt-1 text-sm text-slate-500">O conteúdo é carregado apenas quando necessário.</p>
      </div>
    </main>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/sobre" component={AboutPage} />
        <Route path="/entrar" component={LoginPage} />
        <Route path="/recuperar-acesso" component={PasswordRecoveryPage} />
        <Route path="/redefinir-senha" component={ResetPasswordPage} />
        <Route path="/app" component={StudentDashboardPlus} />
        <Route path="/app/estudar" component={StudyPage} />
        <Route path="/app/aula/:moduleId" component={LessonPage} />
        <Route path="/app/praticar" component={PracticePage} />
        <Route path="/app/quiz" component={QuizPage} />
        <Route path="/app/desafios" component={ChallengesPage} />
        <Route path="/app/tic-angola" component={TicTimelinePage} />
        <Route path="/app/revisao" component={ReviewPage} />
        <Route path="/app/simulados" component={SimulationsExplorer} />
        <Route path="/app/simulado" component={ExamSessionPage} />
        <Route path="/app/ia" component={AiPage} />
        <Route path="/app/plano" component={PlanPage} />
        <Route path="/app/progresso" component={ProgressPage} />
        <Route path="/app/perfil" component={AccountSettingsPage} />
        <Route path="/app/preferencias" component={ProfilePage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
