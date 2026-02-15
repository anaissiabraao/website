import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quanto tempo leva para implementar a automação?",
    answer: "O tempo varia conforme a complexidade do processo. Projetos simples são implementados em 15 dias. Projetos mais complexos podem levar de 30 a 60 dias. Começamos com um diagnóstico gratuito para dimensionar o prazo exato.",
  },
  {
    question: "Preciso trocar meus sistemas atuais?",
    answer: "Não! Nossas soluções são projetadas para integrar com os sistemas que você já utiliza — ERP, CRM, planilhas, e-mail, etc. Não é necessário substituir nenhuma ferramenta.",
  },
  {
    question: "Qual o custo da automação?",
    answer: "O investimento depende do escopo do projeto. Oferecemos uma consultoria gratuita onde analisamos seus processos e apresentamos uma proposta transparente com estimativa de ROI. A maioria dos clientes recupera o investimento em menos de 90 dias.",
  },
  {
    question: "É seguro automatizar meus processos?",
    answer: "Sim. Utilizamos as melhores práticas de segurança da informação, incluindo criptografia, controle de acesso e conformidade com a LGPD. Todos os processos são auditáveis e rastreáveis.",
  },
  {
    question: "Minha empresa é pequena, vale a pena automatizar?",
    answer: "Sim! Empresas de qualquer porte se beneficiam da automação. Para empresas menores, o impacto pode ser ainda mais significativo proporcionalmente, pois libera a equipe enxuta para focar no crescimento do negócio.",
  },
  {
    question: "Como funciona o suporte após a implementação?",
    answer: "Oferecemos suporte técnico 24/7 com equipe especializada. Incluímos monitoramento proativo, manutenção preventiva e atualizações contínuas para garantir que sua automação funcione perfeitamente.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Tire suas dúvidas sobre automação de processos
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-xl border border-border px-5 md:px-6 card-shadow data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-sm md:text-base font-medium text-foreground hover:text-primary hover:no-underline py-4 md:py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4 md:pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
