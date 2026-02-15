import { Bot, Workflow, BarChart3, Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const solutions = [
  {
    icon: Bot,
    title: "Automação de Processos (RPA)",
    description: "Robôs executam tarefas repetitivas automaticamente, liberando sua equipe para atividades estratégicas.",
    benefits: ["Redução de 70% em tarefas manuais", "Zero erros de digitação", "Operação 24/7 sem parar"],
  },
  {
    icon: Workflow,
    title: "Integração de Sistemas",
    description: "Conectamos suas plataformas e eliminamos retrabalho, criando um fluxo de dados contínuo.",
    benefits: ["ERP, CRM, e-commerce conectados", "Dados sincronizados em tempo real", "Eliminação de retrabalho"],
  },
  {
    icon: BarChart3,
    title: "Dashboards Inteligentes",
    description: "Dados em tempo real para decisões estratégicas com visualizações claras e indicadores de performance.",
    benefits: ["KPIs em tempo real", "Relatórios automáticos", "Alertas inteligentes"],
  },
  {
    icon: Brain,
    title: "Inteligência Artificial Aplicada",
    description: "Automação inteligente e preditiva que aprende com seus dados e otimiza processos continuamente.",
    benefits: ["Análise preditiva", "Classificação automática", "Otimização contínua"],
  },
];

const SolutionsSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossas <span className="text-gradient">Soluções</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Tecnologia de ponta para transformar sua operação
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {solutions.map((solution, i) => {
            const Icon = solution.icon;
            return (
              <div
                key={i}
                className="group relative bg-card rounded-2xl p-6 md:p-8 card-shadow hover:card-shadow-hover border border-border hover:border-primary/30 transition-all duration-500"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{solution.description}</p>
                  </div>
                </div>

                <ul className="space-y-2 ml-[4.5rem]">
                  {solution.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <Button size="lg" asChild>
            <a href="#contact">
              Fale com um especialista
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
