import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import Header from "@/components/Header";
import { SERVICES } from "@/types/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/LanguageProvider";

const formatPriceRange = (min: number, max: number, unit?: string) => {
  if (!min && !max) return undefined;
  const formattedMin = `R$ ${min.toLocaleString("pt-BR")}`;
  const formattedMax = `R$ ${max.toLocaleString("pt-BR")}`;
  const unitText = unit ? ` ${unit}` : "";
  return min === max
    ? `${formattedMax}${unitText}`
    : `${formattedMin} - ${formattedMax}${unitText}`;
};

const ProposalGenerator = () => {
  const [searchParams] = useSearchParams();
  const preSelectedService = searchParams.get("servico");
  const { toast } = useToast();
  const { t } = useTranslation();

  const serviceOptions = useMemo(
    () =>
      SERVICES.map((service) => ({
        id: service.id,
        title: service.name,
        description: service.description,
        price: formatPriceRange(service.priceMin, service.priceMax, service.unit),
      })),
    []
  );

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectTitle: "",
    projectDescription: "",
    selectedServices: (preSelectedService ? [preSelectedService] : []) as string[],
    selectedServicesDetail: [] as string[],
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
    const option = serviceOptions.find((s) => s.id === serviceId);
    const label = option
      ? `${option.title}${option.price ? ` — ${option.price}` : ""}`
      : serviceId;

    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter((id) => id !== serviceId)
        : [...prev.selectedServices, serviceId],
      selectedServicesDetail: prev.selectedServices.includes(serviceId)
        ? prev.selectedServicesDetail.filter((item) => item !== label)
        : [...prev.selectedServicesDetail, label],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Falha no envio");
      }

      setIsSubmitted(true);
      toast({
        title: t("proposal.toast.successTitle"),
        description: t("proposal.toast.successDescription"),
      });
    } catch (error) {
      toast({
        title: t("proposal.toast.errorTitle"),
        description: t("proposal.toast.errorDescription"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                {t("proposal.success.title")}
              </h1>
              <p className="text-muted-foreground mb-8">
                {t("proposal.success.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/servicos">{t("proposal.success.moreServices")}</Link>
                </Button>
                <Button asChild>
                  <Link to="/">{t("proposal.success.backHome")}</Link>
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
            {t("proposal.backToCatalog")}
          </Link>
          <div className="max-w-2xl animate-slide-up">
            <h1 className="text-3xl sm:text-4xl font-bold font-display mb-4">
              {t("proposal.titlePrefix")} <span className="text-gradient">{t("proposal.titleHighlight")}</span>
            </h1>
            <p className="text-muted-foreground">
              {t("proposal.subtitle")}
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
                {t("proposal.contactInfoTitle")}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("proposal.fields.fullName")} *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t("proposal.placeholders.fullName")}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("proposal.fields.companyOptional")}
                  </label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder={t("proposal.placeholders.company")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("proposal.fields.email")} *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t("proposal.placeholders.email")}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("proposal.fields.phone")} *
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t("proposal.placeholders.phone")}
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
                {t("proposal.projectInfoTitle")}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("proposal.fields.projectTitle")} *
                  </label>
                  <Input
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    placeholder={t("proposal.placeholders.projectTitle")}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("proposal.fields.projectDescription")} *
                  </label>
                  <Textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    placeholder={t("proposal.placeholders.projectDescription")}
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
                {t("proposal.servicesInterestTitle")}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {t("proposal.servicesInterestSubtitle")}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {serviceOptions.map((service) => (
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
                      <h3 className="font-medium text-foreground">{service.title}</h3>
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
                  t("common.sending")
                ) : (
                  <>
                    {t("proposal.submit")}
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
