import { ArrowRight, FileSpreadsheet, AlertTriangle, Unplug, RefreshCw, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const problems = [
  { icon: RefreshCw, title: "Tarefas repetitivas e manuais", description: "Funcionários gastando horas em atividades que poderiam ser automatizadas." },
  { icon: AlertTriangle, title: "Retrabalho e erros humanos", description: "Falhas manuais que geram custos e atrasos nos processos." },
  { icon: Unplug, title: "Falta de integração entre sistemas", description: "Dados isolados em plataformas que não se comunicam." },
  { icon: FileSpreadsheet, title: "Excesso de planilhas", description: "Controles manuais em Excel sem visibilidade em tempo real." },
  { icon: BarChart3, title: "Dificuldade em analisar dados", description: "Sem dashboards ou indicadores para decisões estratégicas." },
];

const ProblemsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sua empresa sofre com <span className="text-gradient">estes problemas?</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Se você se identificou com algum desses desafios, a automação pode transformar sua operação.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <div
                key={i}
                className="group p-5 md:p-6 rounded-xl bg-card border border-border hover:border-destructive/30 card-shadow hover:card-shadow-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{problem.title}</h3>
                <p className="text-sm text-muted-foreground">{problem.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <Button variant="hero" size="lg" asChild>
            <a href="#contact">
              Quero automatizar minha empresa
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
