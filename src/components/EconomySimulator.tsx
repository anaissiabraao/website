import { useState } from "react";
import { Calculator, ArrowRight, Send, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

const EconomySimulator = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState(10);
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const avgHourCost = 35; // R$/hora médio
  const automationRate = 0.7;
  const monthlySaving = employees * hoursPerDay * avgHourCost * 22 * automationRate;
  const annualSaving = monthlySaving * 12;

  const handleSendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      // @ts-ignore
      await emailjs.send("service_us0gycu", "template_fddaqoi", {
        from_name: "Simulador de Economia",
        from_email: email,
        message: `Simulação: ${employees} funcionários, ${hoursPerDay}h/dia em tarefas manuais. Economia estimada: R$ ${monthlySaving.toLocaleString("pt-BR")}/mês (R$ ${annualSaving.toLocaleString("pt-BR")}/ano).`,
        to_email: "anaissiabraao@gmail.com",
      });
      toast({ title: "✅ Relatório enviado!", description: "Confira seu email com o diagnóstico completo." });
      setEmail("");
    } catch {
      toast({ title: "❌ Erro", description: "Tente novamente.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="simulator" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Calculator className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Simulador de Economia</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quanto sua empresa pode <span className="text-gradient">economizar?</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Ajuste os valores abaixo e descubra o potencial de economia com automação
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl p-6 md:p-10 card-shadow border border-border">
            <div className="space-y-8">
              {/* Employees slider */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">Nº de funcionários em tarefas manuais</label>
                  <span className="text-lg font-bold text-primary">{employees}</span>
                </div>
                <Slider value={[employees]} onValueChange={(v) => setEmployees(v[0])} min={1} max={100} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1</span><span>100</span>
                </div>
              </div>

              {/* Hours slider */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">Horas gastas em tarefas manuais/dia</label>
                  <span className="text-lg font-bold text-primary">{hoursPerDay}h</span>
                </div>
                <Slider value={[hoursPerDay]} onValueChange={(v) => setHoursPerDay(v[0])} min={1} max={8} step={0.5} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1h</span><span>8h</span>
                </div>
              </div>

              {/* Results */}
              <div className="bg-muted/50 rounded-xl p-6 border border-border">
                <p className="text-sm text-muted-foreground mb-2">Economia estimada com automação:</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-gradient flex items-center gap-1">
                      <DollarSign className="h-6 w-6" />
                      {monthlySaving.toLocaleString("pt-BR")}
                    </div>
                    <div className="text-xs text-muted-foreground">por mês</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-gradient flex items-center gap-1">
                      <DollarSign className="h-6 w-6" />
                      {annualSaving.toLocaleString("pt-BR")}
                    </div>
                    <div className="text-xs text-muted-foreground">por ano</div>
                  </div>
                </div>
              </div>

              {/* Email form */}
              <form onSubmit={handleSendReport} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Seu email para receber o relatório completo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 flex-1"
                />
                <Button type="submit" size="lg" className="h-12 px-6" disabled={sending}>
                  {sending ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Receber Relatório
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EconomySimulator;
