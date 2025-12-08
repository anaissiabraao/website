import { useState } from "react";
import { Mail, Phone, MapPin, Rocket, Shield, Send, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/i18n/LanguageProvider";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    employees: "",
    interest: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.emailLabel"),
      value: "anaissiabraao@gmail.com",
    },
    {
      icon: Phone,
      label: t("contact.phoneLabel"),
      value: "+55 (47) 98839-5126",
    },
    {
      icon: MapPin,
      label: t("contact.locationLabel"),
      value: t("contact.location"),
    },
  ];

  const benefits = [
    t("form.benefit1"),
    t("form.benefit2"),
    t("form.benefit3"),
    t("form.benefit4"),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Enviar e-mail usando EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        employees: formData.employees,
        interest: formData.interest,
        message: formData.message,
        to_email: 'anaissiabraao@gmail.com'
      };

      // @ts-ignore - EmailJS is loaded via CDN
      const response = await emailjs.send(
        'service_us0gycu',
        'template_fddaqoi',
        templateParams
      );

      if (response.status === 200) {
        toast({
          title: "✅ Mensagem enviada com sucesso!",
          description: "Entraremos em contato em até 2 horas úteis.",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          employees: "",
          interest: "",
          message: "",
        });
      } else {
        throw new Error('Erro no envio');
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      toast({
        title: "❌ Erro ao enviar formulário",
        description: "Tente novamente ou entre em contato diretamente pelo e-mail.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
            {t("contact.title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
            <div className="space-y-4 md:space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-xl bg-card card-shadow border border-border hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm md:text-base mb-0.5 text-foreground">{item.label}</h4>
                      <p className="text-sm md:text-base text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="p-4 md:p-6 rounded-xl bg-card card-shadow border border-border">
              <h4 className="font-semibold mb-3 md:mb-4 text-foreground">Siga-nos</h4>
              <div className="flex gap-3 md:gap-4">
                <a
                  href="https://www.linkedin.com/in/abra%C3%A3o-anaissi-928735179/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/anaissids"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-5 sm:p-6 md:p-8 card-shadow border border-border order-1 lg:order-2">
            <div className="flex items-start gap-3 mb-5 md:mb-6">
              <Rocket className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg md:text-xl font-bold text-foreground">{t("form.title")}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {t("form.subtitle")}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                <Input
                  placeholder="Seu Nome Completo"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="h-10 md:h-11 text-sm md:text-base"
                />
                <Input
                  type="email"
                  placeholder="Seu Email Corporativo"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="h-10 md:h-11 text-sm md:text-base"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                <Input
                  placeholder="WhatsApp (47) 99999-9999"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="h-10 md:h-11 text-sm md:text-base"
                />
                <Input
                  placeholder="Nome da Empresa"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  required
                  className="h-10 md:h-11 text-sm md:text-base"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                <Select
                  value={formData.employees}
                  onValueChange={(value) =>
                    setFormData({ ...formData, employees: value })
                  }
                >
                  <SelectTrigger className="h-10 md:h-11 text-sm md:text-base">
                    <SelectValue placeholder={t("form.employeesPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">{t("form.employees1")}</SelectItem>
                    <SelectItem value="11-50">{t("form.employees2")}</SelectItem>
                    <SelectItem value="51-200">{t("form.employees3")}</SelectItem>
                    <SelectItem value="200+">{t("form.employees4")}</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={formData.interest}
                  onValueChange={(value) =>
                    setFormData({ ...formData, interest: value })
                  }
                >
                  <SelectTrigger className="h-10 md:h-11 text-sm md:text-base">
                    <SelectValue placeholder={t("form.interestPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rpa">{t("form.interestRpa")}</SelectItem>
                    <SelectItem value="sla">{t("form.interestSla")}</SelectItem>
                    <SelectItem value="melhoria">{t("form.interestImprovement")}</SelectItem>
                    <SelectItem value="todos">{t("form.interestAll")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                placeholder="Descreva brevemente seus principais desafios operacionais..."
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="text-sm md:text-base"
              />

              <div className="bg-muted/50 rounded-xl p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <Gift className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  <span className="font-semibold text-xs md:text-sm text-foreground">
                    {t("form.benefitsTitle")}
                  </span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 md:gap-2">
                  {benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground"
                    >
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-11 md:h-14 text-sm md:text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 md:h-5 md:w-5" />
                    {t("form.submitButton")}
                  </>
                )}
              </Button>

              <p className="text-center text-[10px] md:text-xs text-muted-foreground flex items-center justify-center gap-1.5 md:gap-2">
                <Shield className="h-3 w-3 md:h-4 md:w-4" />
                {t("form.disclaimer")}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
