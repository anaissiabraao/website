import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SERVICES, CATEGORY_LABELS, Service } from '@/types/services';
import { ArrowLeft, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/i18n/LanguageProvider';

const ServicesPage = () => {
  const navigate = useNavigate();
  const { t, lang } = useTranslation();

  const formatCurrency = (value: number) => {
    if (lang === 'en') return `$${value.toLocaleString('en-US')}`;
    if (lang === 'es') return `$${value.toLocaleString('es-ES')}`;
    if (lang === 'de') return `€${value.toLocaleString('de-DE')}`;
    return `R$ ${value.toLocaleString('pt-BR')}`;
  };

  const groupedServices = SERVICES.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gradient">{t('servicesPage.title')}</h1>
              <p className="text-sm text-muted-foreground">Anaissi Data Strategy</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('servicesPage.subtitle')}
          </p>
        </div>

        {/* Services by Category */}
        <div className="space-y-12">
          {Object.entries(groupedServices).map(([category, services]) => (
            <div key={category}>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-gradient">{t(`services.${category}`)}</span>
                <Badge variant="outline" className="text-sm">
                  {services.length} {services.length === 1 ? t('nav.services').slice(0, -1) : t('nav.services')}
                </Badge>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className="group hover:shadow-card-hover transition-all duration-300 hover:border-primary/50"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {service.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Price */}
                      <div className="flex items-start gap-2">
                        <DollarSign className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-muted-foreground">
                            {t('quote.priceRange')}
                          </p>
                          <p className="text-lg font-bold text-primary">
                            {formatCurrency(service.priceMin)} - {formatCurrency(service.priceMax)}
                            {service.unit && (
                              <span className="text-sm text-muted-foreground">{service.unit}</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Delivery Time */}
                      <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-muted-foreground">
                            {t('quote.deliveryTime')}
                          </p>
                          <p className="text-sm font-medium">
                            {service.deliveryDays.min === service.deliveryDays.max
                              ? `${service.deliveryDays.min} ${t('quote.days')}`
                              : `${service.deliveryDays.min} - ${service.deliveryDays.max} ${t('quote.days')}`}
                          </p>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        className="w-full mt-4"
                        onClick={() => navigate('/orcamento')}
                      >
                        {t('servicesPage.getQuote')}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-primary/5 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">{t('whatsapp.help')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('contact.subtitle')}
              </p>
              <Button size="lg" onClick={() => navigate('/orcamento')}>
                {t('servicesPage.getQuote')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ServicesPage;
