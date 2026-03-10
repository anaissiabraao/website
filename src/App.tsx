import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout";
import { useAnalyticsTracker } from "@/hooks/useAnalyticsTracker";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProposalGenerator from "./pages/ProposalGenerator";
import QuickQuote from "./pages/QuickQuote";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetail from "./pages/ServiceDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Confidentiality from "./pages/Confidentiality";
import AcademyPage from "./pages/AcademyPage";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCRM from "./pages/AdminCRM";
import AdminAnalytics from "./pages/AdminAnalytics";

const queryClient = new QueryClient();

function AppRoutes() {
  useAnalyticsTracker();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/servicos" element={<ServicesPage />} />
      <Route path="/servicos/:id" element={<ServiceDetail />} />
      <Route path="/propostas" element={<ProposalGenerator />} />
      <Route path="/orcamento" element={<QuickQuote />} />
      <Route path="/privacidade" element={<PrivacyPolicy />} />
      <Route path="/confidencialidade" element={<Confidentiality />} />
      <Route path="/academy" element={<AcademyPage />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Navigate to="/admin/dashboard" replace />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/crm"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminCRM />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminAnalytics />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <LanguageProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
            <WhatsAppButton />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  </LanguageProvider>
);

export default App;
