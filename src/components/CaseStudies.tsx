import { ArrowRight, TrendingUp, Star, Quote } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const cases = [
  {
    company: "Empresa de Logística",
    before: "Processos manuais de entrada de dados, 6 funcionários dedicados, alta taxa de erros.",
    after: "Automação RPA completa com integração entre ERP e WMS.",
    result: "Economia de R$ 30.000/mês e 80% de redução de erros.",
    testimonial: '"A ANAISSI automatizou nossos processos financeiros e economizamos R$ 30.000/mês. ROI em apenas 2 meses!"',
    author: "Maria Silva",
    role: "CFO - TechCorp",
    rating: 5,
  },
  {
    company: "Multinacional de Transporte",
    before: "SLAs monitorados manualmente em planilhas, sem visibilidade em tempo real.",
    after: "Dashboard inteligente com alertas automáticos e análise preditiva.",
    result: "Melhoria de 95% nos SLAs em 30 dias.",
    testimonial: '"Reduzimos 80% do tempo em processos administrativos. A equipe agora foca no que realmente importa."',
    author: "Kevin Burrell",
    role: "Area Managing Director - Maersk",
    rating: 5,
  },
  {
    company: "Operador Portuário",
    before: "Controle manual de operações com retrabalho frequente e custos elevados.",
    after: "Automação de processos operacionais e integração de sistemas.",
    result: "Aumento de 3x na produtividade e ROI em 60 dias.",
    testimonial: '"Implementação rápida e suporte excepcional. Nossos SLAs melhoraram 95% em 30 dias."',
    author: "Marlon Marques",
    role: "CEO - PortoEx",
    rating: 5,
  },
];

const CaseStudies = () => {
  const [activeCase, setActiveCase] = useState(0);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Casos de <span className="text-gradient">Sucesso</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Resultados reais de empresas que transformaram sua operação
          </p>
        </div>

        {/* Case tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {cases.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveCase(i)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                activeCase === i
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50"
              )}
            >
              {c.company}
            </button>
          ))}
        </div>

        {/* Active case */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <div className="bg-card rounded-xl p-5 md:p-6 card-shadow border border-border">
              <div className="text-xs font-semibold text-destructive uppercase tracking-wide mb-2">Antes</div>
              <p className="text-sm text-foreground/80">{cases[activeCase].before}</p>
            </div>
            <div className="bg-card rounded-xl p-5 md:p-6 card-shadow border border-primary/20">
              <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Depois</div>
              <p className="text-sm text-foreground/80">{cases[activeCase].after}</p>
            </div>
            <div className="bg-gradient-primary rounded-xl p-5 md:p-6 text-primary-foreground">
              <div className="flex items-center gap-1 mb-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">Resultado</span>
              </div>
              <p className="text-sm font-medium">{cases[activeCase].result}</p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-card rounded-2xl p-6 md:p-8 card-shadow border border-border relative">
            <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" />
            <div className="flex gap-1 mb-4">
              {[...Array(cases[activeCase].rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground/80 mb-6 italic">{cases[activeCase].testimonial}</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">{cases[activeCase].author.charAt(0)}</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">{cases[activeCase].author}</h4>
                <p className="text-xs text-muted-foreground">{cases[activeCase].role}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10 md:mt-12">
          <Button size="lg" asChild>
            <a href="#contact">
              Quero resultados assim
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
