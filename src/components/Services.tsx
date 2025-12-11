import { ReactNode } from "react";
import { ArrowRight, BarChart3, PieChart, TrendingUp, Workflow } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
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

const Services = () => {
  const previewCards = SERVICES.map((service, index) => ({
    id: service.id,
    title: service.name,
    description: service.description,
    features: [] as string[],
    image: (service as any).image || placeholderImage,
    icon: iconMap[(service as any).icon] || <TrendingUp className="h-6 w-6" />,
    price: formatPriceRange(service.priceMin, service.priceMax, service.unit),
    delay: index * 100,
  })).slice(0, 6);

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
            Nossos <span className="text-gradient">Serviços</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça nossas soluções especializadas para transformar a gestão de dados da sua empresa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {previewCards.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-border bg-transparent text-foreground hover:bg-secondary hover:border-primary/50 h-12 rounded-lg px-8 text-base"
            href="/servicos"
          >
            Ver todos os serviços
            <ArrowRight className="h-4 w-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
