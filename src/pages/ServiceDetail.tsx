import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS, SERVICES } from "@/types/services";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find((s) => s.id === (id || ""));

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Serviço não encontrado</h1>
          <Link to="/servicos" className="text-primary hover:underline">
            Voltar ao catálogo
          </Link>
        </div>
      </div>
    );
  }

  const otherServices = SERVICES.filter((item) => item.id !== service.id).slice(0, 2);

  const formatPriceRange = (): string | undefined => {
    if (!service.priceMin && !service.priceMax) return undefined;
    const min = `R$ ${service.priceMin.toLocaleString("pt-BR")}`;
    const max = `R$ ${service.priceMax.toLocaleString("pt-BR")}`;
    const unit = service.unit ? ` ${service.unit}` : "";
    return service.priceMin === service.priceMax ? `${max}${unit}` : `${min} - ${max}${unit}`;
  };

  const priceLabel = formatPriceRange();
  const deliveryLabel =
    service.deliveryDays.min === service.deliveryDays.max
      ? `${service.deliveryDays.min} dias úteis`
      : `${service.deliveryDays.min}-${service.deliveryDays.max} dias úteis`;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-24 sm:pt-32 pb-8 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/servicos"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao catálogo
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-slide-up">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {CATEGORY_LABELS[service.category]}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4 sm:mb-6">
                {service.name}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                {service.longDescription || service.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                {priceLabel && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/50">
                    <BadgeDollarSign className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{priceLabel}</span>
                  </div>
                )}
                {deliveryLabel && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/50">
                    <Clock className="h-5 w-5 text-accent" />
                    <span className="text-sm font-medium">{deliveryLabel}</span>
                  </div>
                )}
              </div>

              <Button asChild size="lg" className="shadow-glow">
                <Link to="/propostas">
                  Solicitar este serviço
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="relative animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border/50 shadow-card animate-slide-up">
              <h2 className="text-xl sm:text-2xl font-bold font-display mb-6 text-foreground">
                O que está incluído
              </h2>
              <ul className="space-y-4">
                {(service.features || []).map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-foreground/90"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="bg-card rounded-2xl p-6 sm:p-8 border border-border/50 shadow-card animate-slide-up"
              style={{ animationDelay: "100ms" }}
            >
              <h2 className="text-xl sm:text-2xl font-bold font-display mb-6 text-foreground">
                Benefícios
              </h2>
              <ul className="space-y-4">
                {(service.benefits || []).map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-foreground/90"
                  >
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold font-display mb-8 text-center">
              Outros serviços
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {otherServices.map((item) => (
                <Link
                  key={item.id}
                  to={`/servicos/${item.id}`}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 shadow-card hover:shadow-card-hover"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold font-display text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold font-display mb-4">
              Interessado neste serviço?
            </h2>
            <p className="text-muted-foreground mb-8">
              Solicite uma proposta personalizada e transforme seus dados em resultados.
            </p>
            <Button asChild size="lg" className="shadow-glow">
              <Link to="/propostas">Solicitar Proposta</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
