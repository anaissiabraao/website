import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Scatter, ScatterChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface HeatmapPoint {
  id: string;
  x: number;
  y: number;
  page: string;
  createdAt: string;
}

export default function AdminAnalytics() {
  const { toast } = useToast();
  const [page, setPage] = useState("/");
  const [points, setPoints] = useState<HeatmapPoint[]>([]);
  const [logs, setLogs] = useState<Array<{ id: string; action: string; createdAt: string; metadata?: unknown }>>([]);

  const load = async () => {
    const [heatmap, activity] = await Promise.all([
      api.get<HeatmapPoint[]>(`/api/analytics/heatmap?page=${encodeURIComponent(page)}`),
      api.get<Array<{ id: string; action: string; createdAt: string; metadata?: unknown }>>("/api/activity-logs"),
    ]);
    setPoints(heatmap);
    setLogs(activity);
  };

  useEffect(() => {
    load().catch((error) =>
      toast({
        title: "Erro ao carregar analytics",
        description: error instanceof Error ? error.message : "Tente novamente.",
        variant: "destructive",
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics Interno</h1>
      <Card>
        <CardHeader>
          <CardTitle>Heatmap de cliques</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="max-w-sm">
            <Input value={page} onChange={(e) => setPage(e.target.value)} placeholder="Página, ex: /" />
          </div>
          <div className="h-[340px] border rounded-lg bg-muted/20">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <XAxis dataKey="x" type="number" name="X" />
                <YAxis dataKey="y" type="number" name="Y" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={points} fill="hsl(var(--primary))" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground">Total de cliques registrados: {points.length}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logs administrativos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 max-h-[420px] overflow-auto">
          {logs.map((log) => (
            <div key={log.id} className="border rounded-lg p-3">
              <p className="font-medium">{log.action}</p>
              <p className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString("pt-BR")}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
