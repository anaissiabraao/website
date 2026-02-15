import { ArrowRight, Rocket, Calculator, Shield, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-tech-bg.jpg";

const Hero = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", contact: "" });

  const handleQuickForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // @ts-ignore
      await emailjs.send("service_us0gycu", "template_fddaqoi", {
        from_name: form.name,
        company: form.company,
        from_email: form.contact,
        phone: form.contact,
        message: "Solicitação de diagnóstico gratuito via formulário rápido do Hero",
        to_email: "anaissiabraao@gmail.com",
      });
      toast({ title: "✅ Solicitação enviada!", description: "Entraremos em contato em até 2 horas úteis." });
      setForm({ name: "", company: "", contact: "" });
    } catch {
      toast({ title: "❌ Erro ao enviar", description: "Tente novamente ou entre em contato pelo WhatsApp.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={1024}
          height={576}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 z-0 opacity-5" style={{
        backgroundImage: "linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-12 md:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Copy */}
          <div className="space-y-6 md:space-y-8 animate-fade-in-up text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-xs md:text-sm font-medium text-primary">
                Atendimento Nacional • +114 projetos entregues
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">Automatize processos e reduza custos operacionais em até </span>
              <span className="text-gradient">70%</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-foreground/80 max-w-xl mx-auto lg:mx-0">
              Integramos sistemas, eliminamos tarefas manuais e entregamos inteligência operacional para sua empresa crescer.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" asChild className="text-sm md:text-base px-6 md:px-10">
                <a href="#contact">
                  <Rocket className="h-4 w-4 md:h-5 md:w-5" />
                  Solicitar Diagnóstico Gratuito
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild className="text-sm md:text-base px-6 md:px-10">
                <a href="#simulator">
                  <Calculator className="h-4 w-4 md:h-5 md:w-5" />
                  Calcular Economia
                </a>
              </Button>
            </div>

            {/* Social proof mini */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-2">
              {[
                { value: "70%", label: "Redução de custos" },
                { value: "90%", label: "Menos erros" },
                { value: "15 dias", label: "Implementação" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Quick Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-3xl" />
              <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-6 md:p-8 card-shadow">
                <div className="text-center mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                    🚀 Receba sua Avaliação Gratuita
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Descubra quanto sua empresa pode economizar
                  </p>
                </div>

                <form onSubmit={handleQuickForm} className="space-y-4">
                  <Input
                    placeholder="Seu nome"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="h-12"
                  />
                  <Input
                    placeholder="Empresa"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    required
                    className="h-12"
                  />
                  <Input
                    placeholder="WhatsApp ou Email"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    required
                    className="h-12"
                  />
                  <Button type="submit" size="lg" className="w-full h-14 text-base" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Receber Avaliação Gratuita
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-center text-[10px] text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
                  <Shield className="h-3 w-3" />
                  Seus dados estão seguros. Sem spam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
