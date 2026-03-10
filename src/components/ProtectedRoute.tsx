import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-10 text-muted-foreground">Carregando...</div>;
  if (!user || user.role !== "admin") return <Navigate to="/admin-login" replace />;
  return <>{children}</>;
}
