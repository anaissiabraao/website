import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SERVICES, Service, CATEGORY_LABELS } from '@/types/services';
import { MessageSquare, Copy, Check, ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const QuoteGenerator = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [copiedFull, setCopiedFull] = useState(false);
  const [copiedShort, setCopiedShort] = useState(false);

  const handleServiceSelect = (serviceId: string) => {
    const service = SERVICES.find(s => s.id === serviceId);
    setSelectedService(service || null);
    setCopiedFull(false);
    setCopiedShort(false);
  };

  const generateFullMessage = (service: Service): string => {
    const priceRange = `R$ ${service.priceMin.toLocaleString('pt-BR')} até R$ ${service.priceMax.toLocaleString('pt-BR')}`;
    const deliveryTime = service.deliveryDays.min === service.deliveryDays.max 
      ? `${service.deliveryDays.min} dias úteis`
      : `${service.deliveryDays.min} a ${service.deliveryDays.max} dias úteis`;

    return `Olá! Tudo bem? 👋 Segue o orçamento da *Anaissi Data Strategy* para o serviço solicitado:

📋 *${service.name}*
${service.description}

💰 *Valor estimado:*
A partir de ${priceRange}${service.unit || ''}
(O valor exato depende das funcionalidades que você escolher.)

⏱️ *Prazo médio de entrega:*
${deliveryTime}

✨ *Próximos passos:*
Se quiser, posso montar uma proposta completa em PDF com todos os detalhes. Pode me enviar 3 informações:
• Objetivo do ${service.category === 'web' ? 'site/sistema' : 'projeto'}
• Referência (se tiver)
• Prazo desejado

Estou à disposição! 😊`;
  };

  const generateShortMessage = (service: Service): string => {
    const priceRange = `R$ ${service.priceMin.toLocaleString('pt-BR')}–${service.priceMax.toLocaleString('pt-BR')}`;
    const deliveryTime = service.deliveryDays.min === service.deliveryDays.max 
      ? `${service.deliveryDays.min}d`
      : `${service.deliveryDays.min}-${service.deliveryDays.max}d`;

    return `*${service.name}*: ${priceRange}${service.unit || ''} • Prazo: ${deliveryTime} • Quer proposta completa? 📄`;
  };

  const copyToClipboard = (text: string, isShort: boolean) => {
    navigator.clipboard.writeText(text).then(() => {
      if (isShort) {
        setCopiedShort(true);
        setTimeout(() => setCopiedShort(false), 2000);
      } else {
        setCopiedFull(true);
        setTimeout(() => setCopiedFull(false), 2000);
      }
      toast.success('Copiado para a área de transferência! ✓');
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gradient">Orçamentos para WhatsApp</h1>
                <p className="text-sm text-muted-foreground">Anaissi Data Strategy</p>
              </div>
            </div>
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Seleção de Serviço */}
        <Card>
          <CardHeader>
            <CardTitle>Selecione o Serviço</CardTitle>
            <CardDescription>
              Escolha o serviço para gerar um orçamento rápido para WhatsApp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="service">Serviço</Label>
              <Select onValueChange={handleServiceSelect}>
                <SelectTrigger id="service">
                  <SelectValue placeholder="Selecione um serviço..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(groupedServices).map(([category, services]) => (
                    <div key={category}>
                      <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                        {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
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
            </div>
          </CardContent>
        </Card>

        {/* Mensagens Geradas */}
        {selectedService && (
          <>
            {/* Mensagem Completa */}
            <Card className="border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Mensagem Principal
                    </CardTitle>
                    <CardDescription>
                      Versão completa e profissional para enviar no WhatsApp
                    </CardDescription>
                  </div>
                  <Button
                    variant={copiedFull ? "secondary" : "default"}
                    onClick={() => copyToClipboard(generateFullMessage(selectedService), false)}
                  >
                    {copiedFull ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generateFullMessage(selectedService)}
                  readOnly
                  className="min-h-[300px] font-mono text-sm bg-muted"
                />
              </CardContent>
            </Card>

            {/* Mensagem Curta */}
            <Card className="border-accent/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent" />
                      Versão Ultra Curta
                    </CardTitle>
                    <CardDescription>
                      Resposta rápida e direta para clientes apressados
                    </CardDescription>
                  </div>
                  <Button
                    variant={copiedShort ? "secondary" : "outline"}
                    onClick={() => copyToClipboard(generateShortMessage(selectedService), true)}
                  >
                    {copiedShort ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generateShortMessage(selectedService)}
                  readOnly
                  className="min-h-[80px] font-mono text-sm bg-muted"
                />
              </CardContent>
            </Card>

            {/* Dicas */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">💡 Dicas de Uso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• <strong>Mensagem Principal:</strong> Use quando o cliente pedir um orçamento detalhado</p>
                <p>• <strong>Versão Curta:</strong> Use para respostas rápidas ou quando o cliente já conhece o serviço</p>
                <p>• <strong>Personalização:</strong> Sinta-se livre para adaptar o texto conforme a conversa</p>
                <p>• <strong>Próximo passo:</strong> Se o cliente demonstrar interesse, use o Gerador de Propostas para criar um PDF completo</p>
              </CardContent>
            </Card>
          </>
        )}

        {/* Estado Vazio */}
        {!selectedService && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Selecione um serviço</h3>
              <p className="text-muted-foreground max-w-md">
                Escolha um serviço acima para gerar automaticamente mensagens prontas para enviar no WhatsApp
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default QuoteGenerator;
