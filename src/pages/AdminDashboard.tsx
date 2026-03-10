import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Payment, Quote } from "@/types/saas";
import { Button } from "@/components/ui/button";

interface DashboardData {
  cards: {
    visitors: number;
    leads: number;
    clients: number;
    proposals: number;
    payments: number;
    revenue: number;
    conversionRate: number;
  };
  visitsByDay: Array<{ day: string; total: number }>;
  monthlyRevenue: Array<{ month: string; total: number }>;
  funnel: {
    visitante: number;
    lead: number;
    cliente: number;
    pagamento: number;
  };
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const [data, setData] = useState<DashboardData | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    Promise.all([
      api.get<DashboardData>("/api/admin/dashboard"),
      api.get<Quote[]>("/api/quotes"),
      api.get<Payment[]>("/api/payments"),
    ])
      .then(([dashboardData, quotesData, paymentsData]) => {
        setData(dashboardData);
        setQuotes(quotesData);
        setPayments(paymentsData);
      })
      .catch((error) =>
        toast({
          title: "Erro ao carregar dashboard",
          description: error instanceof Error ? error.message : "Tente novamente.",
          variant: "destructive",
        }),
      );
  }, [toast]);

  const approvedQuotes = useMemo(
    () => quotes.filter((quote) => quote.status === "aprovado"),
    [quotes],
  );

  const funnelData = data
    ? [
        { name: "Visitantes", value: data.funnel.visitante },
        { name: "Leads", value: data.funnel.lead },
        { name: "Clientes", value: data.funnel.cliente },
        { name: "Pagamentos", value: data.funnel.pagamento },
      ]
    : [];

  const createCheckout = async (quoteId: string) => {
    try {
      const response = await api.post<{ checkoutUrl: string }>("/api/create-checkout", { quoteId });
      window.open(response.checkoutUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      toast({
        title: "Erro ao criar checkout",
        description: error instanceof Error ? error.message : "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Visitantes</p><p className="text-2xl font-bold">{data?.cards.visitors ?? 0}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Leads</p><p className="text-2xl font-bold">{data?.cards.leads ?? 0}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Clientes</p><p className="text-2xl font-bold">{data?.cards.clients ?? 0}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Faturamento</p><p className="text-2xl font-bold">R$ {(data?.cards.revenue ?? 0).toLocaleString("pt-BR")}</p></CardContent></Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Visitas por dia</CardTitle></CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.visitsByDay ?? []}>
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Receita mensal</CardTitle></CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.monthlyRevenue ?? []}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Funil de conversão</CardTitle></CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={funnelData} dataKey="value" nameKey="name" outerRadius={90} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Orçamentos aprovados (checkout)</CardTitle></CardHeader>
          <CardContent className="space-y-2 max-h-[260px] overflow-auto">
            {approvedQuotes.length === 0 && (
              <p className="text-sm text-muted-foreground">Nenhum orçamento aprovado pendente.</p>
            )}
            {approvedQuotes.map((quote) => (
              <div key={quote.id} className="border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">{quote.client.name}</p>
                  <p className="text-sm text-muted-foreground">R$ {quote.total.toLocaleString("pt-BR")}</p>
                </div>
                <Button size="sm" onClick={() => createCheckout(quote.id)}>Gerar link</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Pagamentos recentes</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {payments.slice(0, 8).map((payment) => (
            <div key={payment.id} className="border rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="font-medium">{payment.quote.client.name}</p>
                <p className="text-sm text-muted-foreground">{new Date(payment.createdAt).toLocaleString("pt-BR")}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">R$ {payment.amount.toLocaleString("pt-BR")}</p>
                <p className="text-xs uppercase">{payment.status}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
