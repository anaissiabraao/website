import { useEffect, useState, useRef } from "react";
import { TrendingDown, TrendingUp, Timer, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AnimatedCounter = ({ target, suffix, prefix = "", isVisible }: { target: number; suffix: string; prefix?: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, isVisible]);
  return <span>{prefix}{count}{suffix}</span>;
};

const results = [
  { icon: TrendingDown, value: 70, suffix: "%", label: "Redução de custos operacionais", color: "text-primary" },
  { icon: TrendingDown, value: 90, suffix: "%", label: "Redução de erros", color: "text-primary" },
  { icon: TrendingUp, value: 3, suffix: "x", label: "Aumento de produtividade", color: "text-primary" },
  { icon: Timer, value: 90, suffix: " dias", label: "ROI garantido", color: "text-primary" },
];

const ResultsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Resultados que <span className="text-gradient">impactam</span> seu negócio
          </h2>
          <p className="text-foreground/70 text-base md:text-lg">
            Números reais de empresas que transformaram sua operação com nossas soluções
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {results.map((result, i) => {
            const Icon = result.icon;
            return (
              <div
                key={i}
                className={cn(
                  "text-center p-6 md:p-8 rounded-2xl bg-card/5 backdrop-blur-sm border border-primary/10 transition-all duration-500",
                  isVisible && "animate-fade-in-up"
                )}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-2">
                  <AnimatedCounter target={result.value} suffix={result.suffix} isVisible={isVisible} />
                </div>
                <div className="text-foreground/70 text-xs md:text-sm">{result.label}</div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <Button variant="heroOutline" size="lg" asChild>
            <a href="#simulator">
              <DollarSign className="h-5 w-5" />
              Descubra quanto você pode economizar
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
