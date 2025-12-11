import { ChangeEvent, FormEvent, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import Header from "@/components/Header";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const ProposalGenerator = () => {
  const [searchParams] = useSearchParams();
  const preSelectedService = searchParams.get("servico");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectTitle: "",
    projectDescription: "",
    selectedServices: (preSelectedService ? [preSelectedService] : []) as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter((id) => id !== serviceId)
        : [...prev.selectedServices, serviceId],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Proposta enviada!",
      description: "Entraremos em contato em breve.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto text-center animate-slide-up">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-accent" />
              </div>
              <h1 className="text-3xl font-bold font-display mb-4">
                Proposta Enviada!
              </h1>
              <p className="text-muted-foreground mb-8">
                Obrigado pelo interesse! Nossa equipe analisará seu projeto e
                entrará em contato em até 24 horas úteis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/servicos">Ver mais serviços</Link>
                </Button>
                <Button asChild>
                  <Link to="/">Voltar ao início</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="max-w-2xl animate-slide-up">
            <h1 className="text-3xl sm:text-4xl font-bold font-display mb-4">
              Solicitar <span className="text-gradient">Proposta</span>
            </h1>
            <p className="text-muted-foreground">
              Preencha o formulário abaixo e receba uma proposta personalizada
              para o seu projeto.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto space-y-8"
          >
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border/50 shadow-card animate-slide-up">
              <h2 className="text-xl font-bold font-display mb-6">
                Informações de Contato
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nome completo *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="João Silva"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Empresa (opcional)
                  </label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Empresa Ltda"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    E-mail *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="joao@empresa.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Telefone *
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(47) 99999-9999"
                    required
                  />
                </div>
              </div>
            </div>

            <div
              className="bg-card rounded-2xl p-6 sm:p-8 border border-border/50 shadow-card animate-slide-up"
              style={{ animationDelay: "100ms" }}
            >
              <h2 className="text-xl font-bold font-display mb-6">
                Informações do Projeto
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Título do projeto *
                  </label>
                  <Input
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    placeholder="Ex: Dashboard de Vendas"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Descrição do projeto *
                  </label>
                  <Textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    placeholder="Descreva os objetivos e funcionalidades principais..."
                    rows={4}
                    required
                  />
                </div>
              </div>
            </div>

            <div
              className="bg-card rounded-2xl p-6 sm:p-8 border border-border/50 shadow-card animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <h2 className="text-xl font-bold font-display mb-2">
                Serviços de Interesse
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Selecione os serviços que deseja incluir na proposta
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <label
                    key={service.id}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300",
                      formData.selectedServices.includes(service.id)
                        ? "border-primary bg-primary/5"
                        : "border-border/50 hover:border-primary/30"
                    )}
                  >
                    <Checkbox
                      checked={formData.selectedServices.includes(service.id)}
                      onCheckedChange={() => handleServiceToggle(service.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                      {service.price && (
                        <span className="text-xs text-primary mt-2 inline-block">
                          {service.price}
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="shadow-glow min-w-[200px]"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    Enviar Proposta
                    <Send className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ProposalGenerator;
