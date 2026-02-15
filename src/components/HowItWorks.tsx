import { Search, Lightbulb, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Diagnóstico Gratuito",
    description: "Analisamos seus processos atuais e identificamos oportunidades de automação com maior impacto.",
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Prova de Conceito Rápida",
    description: "Desenvolvemos um piloto funcional em poucos dias para você validar os resultados antes de investir.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Implementação e Suporte",
    description: "Implementamos a solução completa com acompanhamento contínuo e suporte dedicado 24/7.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como <span className="text-gradient">funciona</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Um processo simples e transparente para transformar sua operação
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative text-center group">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-border z-0" />
                )}

                <div className="relative z-10 bg-card rounded-2xl p-6 md:p-8 card-shadow border border-border hover:border-primary/30 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-primary/10 mb-2">{step.step}</div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <Button variant="hero" size="lg" asChild>
            <a href="#contact">
              Agendar Demonstração
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
