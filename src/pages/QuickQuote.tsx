import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SERVICES, Service, COMPANY_INFO } from '@/types/services';
import { FileDown, MessageSquare, ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from '@/i18n/LanguageProvider';
import { useCurrency } from '@/currency/CurrencyProvider';
import { getServiceText } from '@/i18n/serviceText';
import { jsPDF } from 'jspdf';

const QuickQuote = () => {
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const { formatMoney } = useCurrency();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [copied, setCopied] = useState(false);

  const handleServiceSelect = (serviceId: string) => {
    const service = SERVICES.find(s => s.id === serviceId);
    setSelectedService(service || null);
    setCopied(false);
  };

  const generateWhatsAppMessage = (service: Service): string => {
    const st = getServiceText(t, service);
    const priceRange = `${formatMoney(service.priceMin)} ${t('quote.to')} ${formatMoney(service.priceMax)}`;
    const deliveryTime = service.deliveryDays.min === service.deliveryDays.max 
      ? `${service.deliveryDays.min} ${t('quote.days')}`
      : `${service.deliveryDays.min}-${service.deliveryDays.max} ${t('quote.days')}`;

    return `${t('quote.whatsappMessage')} *${st.name}*

📋 ${st.description}

💰 ${t('quote.priceRange')}: ${priceRange}${service.unit || ''}

⏱️ ${t('quote.deliveryTime')}: ${deliveryTime}

${COMPANY_INFO.phone}`;
  };

  const generatePDF = (service: Service) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Cores
    const primaryColor = [0, 168, 214];
    const darkColor = [31, 41, 55];

    // Cabeçalho
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('ANAISSI DATA STRATEGY', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text(t('quote.title').toUpperCase(), pageWidth / 2, 30, { align: 'center' });

    yPos = 60;

    // Título do serviço
    doc.setTextColor(...darkColor);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(service.name, pageWidth - 40);
    doc.text(titleLines, 20, yPos);
    yPos += titleLines.length * 8 + 10;

    // Descrição
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(service.description, pageWidth - 40);
    doc.text(descLines, 20, yPos);
    yPos += descLines.length * 6 + 20;

    // Faixa de investimento
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text(`${t('quote.priceRange')}:`, 20, yPos);
    yPos += 10;

    doc.setFontSize(20);
    const priceText = `${formatMoney(service.priceMin)} ${t('quote.to')} ${formatMoney(service.priceMax)}${service.unit || ''}`;
    doc.text(priceText, 20, yPos);
    yPos += 20;

    // Prazo de entrega
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text(`${t('quote.deliveryTime')}:`, 20, yPos);
    yPos += 10;

    doc.setFontSize(16);
    doc.setTextColor(...darkColor);
    const deliveryText = service.deliveryDays.min === service.deliveryDays.max 
      ? `${service.deliveryDays.min} ${t('quote.days')}`
      : `${service.deliveryDays.min} ${t('quote.to')} ${service.deliveryDays.max} ${t('quote.days')}`;
    doc.text(deliveryText, 20, yPos);
    yPos += 30;

    // Informações de contato
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text(t('contact.title'), 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkColor);
    doc.text(`${t('contact.emailLabel')}: ${COMPANY_INFO.email}`, 20, yPos);
    yPos += 6;
    doc.text(`${t('contact.phoneLabel')}: ${COMPANY_INFO.phone}`, 20, yPos);
    yPos += 6;
    doc.text(`${t('contact.locationLabel')}: ${COMPANY_INFO.address}`, 20, yPos);

    // Rodapé
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text(
      new Date().toLocaleDateString(lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : lang === 'de' ? 'de-DE' : 'en-US'),
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );

    // Salvar
    const fileName = `Orcamento_${service.name.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
    doc.save(fileName);
    toast.success(t('quote.downloadPDF') + ' ✓');
  };

  const copyToWhatsApp = (service: Service) => {
    const message = generateWhatsAppMessage(service);
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success(t('quote.copied') + ' ✓');
    });
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gradient">{t('quote.title')}</h1>
                <p className="text-sm text-muted-foreground">Anaissi Data Strategy</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Seleção de Serviço */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t('quote.selectService')}</CardTitle>
            <CardDescription>{t('quote.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={handleServiceSelect}>
              <SelectTrigger>
                <SelectValue placeholder={t('quote.selectPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(groupedServices).map(([category, services]) => (
                  <div key={category}>
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                      {t(`services.${category}`)}
                    </div>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Detalhes do Serviço */}
        {selectedService && (
          <div className="space-y-6 animate-fade-in-up">
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle className="text-2xl">{selectedService.name}</CardTitle>
                <CardDescription className="text-base">
                  {selectedService.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preço */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                    {t('quote.priceRange')}
                  </h3>
                  <p className="text-3xl font-bold text-primary">
                    {formatMoney(selectedService.priceMin)} {t('quote.to')}{' '}
                    {formatMoney(selectedService.priceMax)}
                    {selectedService.unit && (
                      <span className="text-lg text-muted-foreground">{selectedService.unit}</span>
                    )}
                  </p>
                </div>

                {/* Prazo */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                    {t('quote.deliveryTime')}
                  </h3>
                  <p className="text-xl font-semibold">
                    {selectedService.deliveryDays.min === selectedService.deliveryDays.max
                      ? `${selectedService.deliveryDays.min} ${t('quote.days')}`
                      : `${selectedService.deliveryDays.min} ${t('quote.to')} ${selectedService.deliveryDays.max} ${t('quote.days')}`}
                  </p>
                </div>

                {/* Botões de Ação */}
                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <Button
                    size="lg"
                    onClick={() => generatePDF(selectedService)}
                    className="w-full"
                  >
                    <FileDown className="h-5 w-5 mr-2" />
                    {t('quote.downloadPDF')}
                  </Button>
                  <Button
                    size="lg"
                    variant={copied ? 'secondary' : 'outline'}
                    onClick={() => copyToWhatsApp(selectedService)}
                    className="w-full"
                  >
                    {copied ? (
                      <>
                        <Check className="h-5 w-5 mr-2" />
                        {t('quote.copied')}
                      </>
                    ) : (
                      <>
                        <MessageSquare className="h-5 w-5 mr-2" />
                        {t('quote.copyWhatsApp')}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Informações de Contato */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">{t('contact.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>{t('contact.emailLabel')}:</strong> {COMPANY_INFO.email}
                </p>
                <p>
                  <strong>{t('contact.phoneLabel')}:</strong> {COMPANY_INFO.phone}
                </p>
                <p>
                  <strong>{t('contact.locationLabel')}:</strong> {COMPANY_INFO.address}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuickQuote;
