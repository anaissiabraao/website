import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ServiceSelector } from '@/components/ServiceSelector';
import { SelectedService, ProposalData } from '@/types/services';
import { generateProposalPDF } from '@/utils/pdfGenerator';
import { FileText, Download, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProposalGenerator = () => {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCompany: '',
    projectTitle: '',
    projectDescription: '',
    paymentTerms: '50% no início do projeto e 50% na entrega final',
    deliveryDate: '',
    observations: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGeneratePDF = () => {
    // Validações
    if (!formData.clientName.trim()) {
      toast.error('Por favor, preencha o nome do cliente');
      return;
    }
    if (!formData.clientEmail.trim()) {
      toast.error('Por favor, preencha o e-mail do cliente');
      return;
    }
    if (!formData.projectTitle.trim()) {
      toast.error('Por favor, preencha o título do projeto');
      return;
    }
    if (!formData.projectDescription.trim()) {
      toast.error('Por favor, preencha a descrição do projeto');
      return;
    }
    if (selectedServices.length === 0) {
      toast.error('Por favor, selecione pelo menos um serviço');
      return;
    }
    if (!formData.deliveryDate.trim()) {
      toast.error('Por favor, preencha o prazo de entrega');
      return;
    }

    const proposalData: ProposalData = {
      ...formData,
      services: selectedServices,
    };

    try {
      generateProposalPDF(proposalData);
      toast.success('Proposta gerada com sucesso! 🎉');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro ao gerar a proposta. Tente novamente.');
    }
  };

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
                <h1 className="text-2xl font-bold text-gradient">Gerador de Propostas</h1>
                <p className="text-sm text-muted-foreground">Anaissi Data Strategy</p>
              </div>
            </div>
            <FileText className="h-8 w-8 text-primary" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Informações do Cliente */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Cliente</CardTitle>
            <CardDescription>
              Preencha os dados do cliente para quem a proposta será enviada
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="clientName">Nome do Cliente *</Label>
                <Input
                  id="clientName"
                  placeholder="João Silva"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientCompany">Empresa (opcional)</Label>
                <Input
                  id="clientCompany"
                  placeholder="Empresa Ltda"
                  value={formData.clientCompany}
                  onChange={(e) => handleInputChange('clientCompany', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">E-mail *</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  placeholder="joao@empresa.com"
                  value={formData.clientEmail}
                  onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientPhone">Telefone *</Label>
                <Input
                  id="clientPhone"
                  placeholder="(47) 99999-9999"
                  value={formData.clientPhone}
                  onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações do Projeto */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Projeto</CardTitle>
            <CardDescription>
              Descreva o projeto que será desenvolvido
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectTitle">Título do Projeto *</Label>
              <Input
                id="projectTitle"
                placeholder="Ex: Desenvolvimento de Site Institucional"
                value={formData.projectTitle}
                onChange={(e) => handleInputChange('projectTitle', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectDescription">Descrição do Projeto *</Label>
              <Textarea
                id="projectDescription"
                placeholder="Descreva os objetivos, funcionalidades e características principais do projeto..."
                value={formData.projectDescription}
                onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                rows={6}
              />
            </div>
          </CardContent>
        </Card>

        {/* Seleção de Serviços */}
        <Card>
          <CardHeader>
            <CardTitle>Serviços Incluídos</CardTitle>
            <CardDescription>
              Selecione os serviços que farão parte desta proposta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ServiceSelector
              selectedServices={selectedServices}
              onServicesChange={setSelectedServices}
            />
          </CardContent>
        </Card>

        {/* Condições Comerciais */}
        <Card>
          <CardHeader>
            <CardTitle>Condições Comerciais</CardTitle>
            <CardDescription>
              Defina as condições de pagamento e prazo de entrega
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Condições de Pagamento *</Label>
              <Textarea
                id="paymentTerms"
                placeholder="Ex: 50% no início do projeto e 50% na entrega final"
                value={formData.paymentTerms}
                onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryDate">Prazo de Entrega *</Label>
              <Input
                id="deliveryDate"
                placeholder="Ex: 30 dias úteis após aprovação"
                value={formData.deliveryDate}
                onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="observations">Observações Adicionais (opcional)</Label>
              <Textarea
                id="observations"
                placeholder="Informações extras, requisitos especiais, etc..."
                value={formData.observations}
                onChange={(e) => handleInputChange('observations', e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Botão de Gerar */}
        <div className="flex justify-center pb-8">
          <Button
            size="lg"
            onClick={handleGeneratePDF}
            className="text-lg px-8 py-6"
          >
            <Download className="h-5 w-5 mr-2" />
            Gerar Proposta em PDF
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProposalGenerator;
