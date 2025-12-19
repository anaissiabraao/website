import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProposalGenerator from "./pages/ProposalGenerator";
import QuickQuote from "./pages/QuickQuote";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetail from "./pages/ServiceDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Confidentiality from "./pages/Confidentiality";
import Instructions from "./pages/Instructions";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/servicos" element={<ServicesPage />} />
            <Route path="/servicos/:id" element={<ServiceDetail />} />
            <Route path="/instrucoes" element={<Instructions />} />
            <Route path="/propostas" element={<ProposalGenerator />} />
            <Route path="/orcamento" element={<QuickQuote />} />
            <Route path="/privacidade" element={<PrivacyPolicy />} />
            <Route path="/confidencialidade" element={<Confidentiality />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

export default App;
