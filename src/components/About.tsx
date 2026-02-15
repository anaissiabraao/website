import { CheckCircle, Award, Users, Zap } from "lucide-react";
import logo from "@/assets/logo.png";

const features = [
  { icon: Award, text: "Casos reais com ROI em até 90 dias" },
  { icon: Zap, text: "Framework ágil de implementação (15 dias)" },
  { icon: Users, text: "Suporte sênior 24/7" },
  { icon: CheckCircle, text: "Resultados monitorados e mensuráveis" },
];

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Sobre a <span className="text-gradient">Anaissi Data Strategy</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Especialistas em IA aplicada a processos. Combinamos RPA, análise de dados e automação inteligente para escalar eficiência e qualidade com governança.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <p className="text-sm font-medium text-foreground/80 pt-2">{feature.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-primary opacity-10 blur-3xl rounded-full" />
            <div className="relative bg-card rounded-2xl p-8 md:p-12 card-shadow border border-border text-center">
              <img
                src={logo}
                alt="Anaissi Data Strategy"
                className="w-40 md:w-48 h-auto mx-auto mb-6 animate-float"
                width={512}
                height={512}
                loading="lazy"
                decoding="async"
              />
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground">Data Strategy</h3>
              <p className="text-sm text-muted-foreground mb-6">Transformando dados em decisões inteligentes</p>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
                <div><div className="text-2xl font-bold text-gradient">5+</div><div className="text-xs text-muted-foreground">Anos de Experiência</div></div>
                <div><div className="text-2xl font-bold text-gradient">50+</div><div className="text-xs text-muted-foreground">Clientes Satisfeitos</div></div>
                <div><div className="text-2xl font-bold text-gradient">100%</div><div className="text-xs text-muted-foreground">Comprometimento</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
