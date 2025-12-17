import { ReactNode } from "react";
import { BarChart3, PieChart, TrendingUp, Workflow } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import Header from "@/components/Header";
import { SERVICES } from "@/types/services";

const iconMap: Record<string, ReactNode> = {
  chart: <BarChart3 className="h-6 w-6" />,
  trending: <TrendingUp className="h-6 w-6" />,
  automation: <Workflow className="h-6 w-6" />,
  bi: <PieChart className="h-6 w-6" />,
};

const placeholderImage = "/placeholder.svg";

const formatPriceRange = (
  min: number,
  max: number,
  unit?: string
): string | undefined => {
  if (!min && !max) return undefined;
  const formattedMin = `R$ ${min.toLocaleString("pt-BR")}`;
  const formattedMax = `R$ ${max.toLocaleString("pt-BR")}`;
  const unitText = unit ? ` ${unit}` : "";
  return min === max
    ? `${formattedMax}${unitText}`
    : `${formattedMin} - ${formattedMax}${unitText}`;
};

const ServicesPage = () => {
  const allCards = SERVICES.map((service, index) => ({
    id: service.id,
    title: service.name,
    description: service.description,
    features: [] as string[],
    image: service.image || placeholderImage,
    icon: iconMap[service.icon || "trending"] || <TrendingUp className="h-6 w-6" />,
    price: formatPriceRange(service.priceMin, service.priceMax, service.unit),
    delay: index * 100,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4 sm:mb-6">
              Nossos <span className="text-gradient">Serviços</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluções completas para automação e otimização de processos.
              Transforme dados em decisões estratégicas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="space-y-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold font-display mb-2">
                Catálogo Principal
              </h2>
              <p className="text-muted-foreground">
                Todos os serviços disponíveis em um só lugar.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {allCards.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-display mb-4">
              Pronto para transformar seus dados?
            </h2>
          <p className="text-muted-foreground mb-8">
              Entre em contato e descubra como podemos ajudar sua empresa a alcançar resultados extraordinários.
            </p>
            <a
              href="/propostas"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-glow"
            >
              Solicitar Proposta
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
