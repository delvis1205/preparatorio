import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import LoginPage from "@/pages/LoginPage";
import QuizPage from "@/pages/QuizPage";
import ChallengesPage from "@/pages/ChallengesPage";
import TicTimelinePage from "@/pages/TicTimelinePage";
import SimulationsExplorer from "@/pages/SimulationsExplorer";
import StudentDashboardPlus from "@/pages/StudentDashboardPlus";
import {
  AiPage,
  ExamSessionPage,
  LessonPage,
  PlanPage,
  PracticePage,
  ProfilePage,
  ProgressPage,
  ReviewPage,
  SimulationsPage,
  StudentDashboard,
  StudyPage,
} from "@/pages/StudentApp";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sobre" component={AboutPage} />
      <Route path="/entrar" component={LoginPage} />
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
      <Route path="/app/perfil" component={ProfilePage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
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
