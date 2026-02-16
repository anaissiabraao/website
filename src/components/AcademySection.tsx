import { Rocket, Bot, BarChart3, GraduationCap, Globe, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  { icon: Rocket, title: "Conteúdos Práticos", desc: "Atualizados com o mercado" },
  { icon: Bot, title: "Automação & IA", desc: "Inteligência artificial aplicada" },
  { icon: BarChart3, title: "Data & BI", desc: "Analytics e Business Intelligence" },
  { icon: GraduationCap, title: "Certificação", desc: "Certificado profissional" },
  { icon: Globe, title: "Acesso Online", desc: "Estude de qualquer lugar" },
];

const AcademySection = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,50%,8%)] via-[hsl(210,60%,12%)] to-[hsl(195,60%,15%)]" />
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(195 100% 50%) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      
      {/* Glow orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-accent/15 blur-[100px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Plataforma Educacional
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-4 leading-tight">
            Anaissi Academy
          </h2>
          <p className="text-center text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-4">
            Aprenda Tecnologia com Quem Vive Dados e Inovação
          </p>
          <p className="text-center text-white/40 max-w-xl mx-auto mb-12 text-sm md:text-base">
            Capacite-se com cursos práticos em dados, automação, logística, tecnologia e transformação digital.
          </p>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-12">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="group flex flex-col items-center text-center p-4 md:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.08] hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-white/40">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button size="lg" className="group text-base px-8 py-6 rounded-xl shadow-lg shadow-primary/25" asChild>
              <a href="https://www.anaissiacademy.com.br/" target="_blank" rel="noopener noreferrer">
                Explorar Cursos Agora
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="heroOutline" className="text-base px-8 py-6 rounded-xl" asChild>
              <a href="/academy">
                Saiba Mais
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademySection;
