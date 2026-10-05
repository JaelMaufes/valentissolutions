import { useEffect } from "react";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Plans from "@/pages/Plans";
import Diagnostic from "@/pages/Diagnostic";
import TrafegoPago from "@/pages/TrafegoPago";
import Systems from "@/pages/Systems";
import About from "@/pages/About";
import { Privacy, Terms } from "@/pages/Legal";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Navegação interna volta ao topo (exceto quando o link aponta para uma âncora)
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => { if (!window.location.hash) window.scrollTo(0, 0); }, [location]);
  return null;
}

function Router() {
  return (
    <WouterRouter base="/">
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/trafego-pago" component={TrafegoPago} />
        <Route path="/servicos" component={Services} />
        <Route path="/planos" component={Plans} />
        <Route path="/diagnostico" component={Diagnostic} />
        <Route path="/sistemas" component={Systems} />
        <Route path="/sobre" component={About} />
        <Route path="/privacidade" component={Privacy} />
        <Route path="/termos" component={Terms} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
