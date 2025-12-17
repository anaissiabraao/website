import { services as catalogServices } from "@/data/services";

// Imagens (cards + detalhes)
import imgSiteInstitucional from "@/assets/Gemini_Generated_Image_7wqsqz7wqsqz7wqs (1).png";
import imgSiteComercial from "@/assets/Gemini_Generated_Image_gw2saogw2saogw2s.png";
import imgLandingPage from "@/assets/Gemini_Generated_Image_9qtwl89qtwl89qtw.png";
import imgBlogIntegrado from "@/assets/Gemini_Generated_Image_ybp8v2ybp8v2ybp8.png";
import imgPagamentos from "@/assets/Gemini_Generated_Image_poemt4poemt4poem.png";
import imgWhatsappApi from "@/assets/Gemini_Generated_Image_qzk8uoqzk8uoqzk8.png";
import imgCrm from "@/assets/Gemini_Generated_Image_y6ixupy6ixupy6ix.png";
import imgHospedagem from "@/assets/Gemini_Generated_Image_40bh7t40bh7t40bh.png";
import imgManutencao from "@/assets/Gemini_Generated_Image_db7tpkdb7tpkdb7t.png";
import imgIdentidadeVisual from "@/assets/Gemini_Generated_Image_82ec2382ec2382ec.png";
import imgBanners from "@/assets/Gemini_Generated_Image_y6vi2by6vi2by6vi.png";
import imgRedesign from "@/assets/Gemini_Generated_Image_geti8pgeti8pgeti.png";
import imgSeoInicial from "@/assets/Gemini_Generated_Image_tlaki5tlaki5tlak.png";
import imgSeoMensal from "@/assets/Gemini_Generated_Image_f55iwuf55iwuf55i.png";
import imgRedesSociais from "@/assets/Gemini_Generated_Image_vbysfmvbysfmvbys.png";
import imgAnuncios from "@/assets/Gemini_Generated_Image_skjn9zskjn9zskjn.png";
import imgCopywriting from "@/assets/Gemini_Generated_Image_256e2j256e2j256e.png";
import imgRedacao from "@/assets/Gemini_Generated_Image_7jkcqc7jkcqc7jkc.png";
import imgLgpd from "@/assets/Gemini_Generated_Image_fwitzffwitzffwit.png";
import imgChatbotBasico from "@/assets/Gemini_Generated_Image_wvlc1ywvlc1ywvlc.png";
import imgChatbotIa from "@/assets/Gemini_Generated_Image_7s5mda7s5mda7s5m.png";

export interface Service {
  id: string;
  name: string;
  description: string;
  category: "web" | "design" | "marketing" | "content" | "ai";
  priceMin: number;
  priceMax: number;
  unit?: string;
  deliveryDays: {
    min: number;
    max: number;
  };
  image?: string;
  icon?: "chart" | "trending" | "automation" | "bi";
  longDescription?: string;
  features?: string[];
  benefits?: string[];
}

export interface SelectedService extends Service {
  customPrice?: number;
  quantity?: number;
  notes?: string;
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  cnpj: string;
  address: string;
  email: string;
  phone: string;
  responsible: string;
}

export interface ProposalData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany?: string;
  projectTitle: string;
  projectDescription: string;
  services: SelectedService[];
  paymentTerms: string;
  deliveryDate: string;
  observations?: string;
}

export const COMPANY_INFO: CompanyInfo = {
  name: 'Anaissi Data Strategy',
  legalName: '60.267.746 Abraão de Oliveira Costa Anaissi Moura',
  cnpj: '60.267.746/0001-98',
  address: 'Servidão Sebastião do Rozário, 31 – Ressacada – Itajaí/SC – CEP 88307-386',
  email: 'anaissiabraao@gmail.com',
  phone: '(47) 98839-5126',
  responsible: 'Abraão de Oliveira Costa Anaissi Moura',
};

const parsePriceMin = (price?: string): number => {
  if (!price) return 0;
  const digits = price.replace(/[^0-9]/g, "");
  return digits ? parseInt(digits, 10) : 0;
};

const parseDeliveryRange = (delivery?: string): { min: number; max: number } => {
  if (!delivery) return { min: 0, max: 0 };
  const matches = delivery.match(/\d+/g)?.map(Number) || [];
  if (matches.length >= 2) return { min: matches[0], max: matches[1] };
  if (matches.length === 1) return { min: matches[0], max: matches[0] };
  return { min: 0, max: 0 };
};

const defaultLongDescription = (service: Service): string =>
  `${service.description} Ideal para empresas que buscam qualidade, agilidade e resultados, com um processo claro do início ao fim.`;

const defaultFeatures = (category: Service["category"]): string[] => {
  switch (category) {
    case "web":
      return [
        "Design responsivo (mobile/desktop)",
        "Performance e boas práticas",
        "Integração com ferramentas (WhatsApp/CRM)",
        "Publicação e orientações finais",
      ];
    case "design":
      return [
        "Criação alinhada à sua marca",
        "Arquivos prontos para uso",
        "Revisões combinadas",
        "Entrega organizada e editável (quando aplicável)",
      ];
    case "marketing":
      return [
        "Estratégia e planejamento",
        "Configuração e otimizações",
        "Acompanhamento e relatórios",
        "Melhorias contínuas orientadas a resultado",
      ];
    case "content":
      return [
        "Texto profissional e claro",
        "Adequação ao tom da marca",
        "Estrutura pensada para conversão",
        "Revisões e ajustes finais",
      ];
    case "ai":
    default:
      return [
        "Configuração e parametrização",
        "Integrações (quando aplicável)",
        "Treinamento/ajustes iniciais",
        "Suporte de implantação",
      ];
  }
};

const defaultBenefits = (category: Service["category"]): string[] => {
  switch (category) {
    case "web":
      return [
        "Mais credibilidade online",
        "Melhor experiência para o cliente",
        "Aumento de leads e conversões",
        "Base pronta para crescer com o negócio",
      ];
    case "design":
      return [
        "Identidade visual consistente",
        "Comunicação mais profissional",
        "Melhor reconhecimento de marca",
        "Materiais prontos para campanhas e ações",
      ];
    case "marketing":
      return [
        "Mais alcance e visibilidade",
        "Tráfego qualificado",
        "Otimização de investimento",
        "Decisões orientadas a dados",
      ];
    case "content":
      return [
        "Mensagem mais clara e persuasiva",
        "Melhor posicionamento e confiança",
        "Aumento de engajamento",
        "Suporte a SEO e conversão",
      ];
    case "ai":
    default:
      return [
        "Mais agilidade no atendimento",
        "Padronização de processos",
        "Escalabilidade com menor custo",
        "Melhoria contínua com base em dados",
      ];
  }
};

const LEGACY_SERVICES: Service[] = [
  // Desenvolvimento Web
  {
    id: "site-institucional",
    name: "Criação de site institucional",
    description: "Site profissional para apresentar sua empresa, com design moderno e responsivo",
    category: "web",
    priceMin: 1000,
    priceMax: 5000,
    deliveryDays: { min: 7, max: 21 },
  },
  {
    id: "site-comercial",
    name: "Site comercial (5–15 páginas)",
    description: "Site completo com múltiplas páginas, ideal para empresas que precisam de mais conteúdo",
    category: "web",
    priceMin: 2000,
    priceMax: 10000,
    deliveryDays: { min: 14, max: 45 },
  },
  {
    id: "landing-page",
    name: "Landing page profissional",
    description: "Página de conversão otimizada para campanhas de marketing e captação de leads",
    category: "web",
    priceMin: 300,
    priceMax: 1500,
    deliveryDays: { min: 3, max: 7 },
  },
  {
    id: "blog",
    name: "Blog integrado",
    description: "Sistema de blog completo integrado ao seu site para publicação de conteúdo",
    category: "web",
    priceMin: 300,
    priceMax: 900,
    deliveryDays: { min: 5, max: 10 },
  },
  {
    id: "pagamentos",
    name: "Implementação de pagamentos",
    description: "Integração com Mercado Pago, PayPal ou Stripe para receber pagamentos online",
    category: "web",
    priceMin: 200,
    priceMax: 1200,
    deliveryDays: { min: 3, max: 7 },
  },
  {
    id: "whatsapp-api",
    name: "Integração com WhatsApp API",
    description: "Conecte seu site ao WhatsApp Business API para atendimento automatizado",
    category: "web",
    priceMin: 300,
    priceMax: 900,
    deliveryDays: { min: 3, max: 7 },
  },
  {
    id: "crm",
    name: "Integração com CRM",
    description: "Integração com RD Station, Pipedrive, HubSpot ou outros CRMs",
    category: "web",
    priceMin: 400,
    priceMax: 1200,
    deliveryDays: { min: 5, max: 10 },
  },
  {
    id: "hospedagem",
    name: "Configuração de hospedagem + domínio + e-mail",
    description: "Setup completo de infraestrutura: hospedagem, domínio e e-mails profissionais",
    category: "web",
    priceMin: 150,
    priceMax: 600,
    deliveryDays: { min: 1, max: 3 },
  },
  {
    id: "manutencao",
    name: "Manutenção mensal",
    description: "Suporte técnico, atualizações e backups mensais do seu site",
    category: "web",
    priceMin: 200,
    priceMax: 800,
    unit: "/mês",
    deliveryDays: { min: 1, max: 1 },
  },
  // Design
  {
    id: "identidade-visual",
    name: "Identidade visual completa",
    description: "Logo, paleta de cores, tipografia e manual de marca",
    category: "design",
    priceMin: 500,
    priceMax: 3000,
    deliveryDays: { min: 7, max: 21 },
  },
  {
    id: "banners",
    name: "Banners profissionais",
    description: "Criação de banners para site, redes sociais ou anúncios",
    category: "design",
    priceMin: 100,
    priceMax: 600,
    deliveryDays: { min: 2, max: 5 },
  },
  {
    id: "redesign",
    name: "Redesign de site",
    description: "Modernização completa do design do seu site existente",
    category: "design",
    priceMin: 1200,
    priceMax: 6000,
    deliveryDays: { min: 10, max: 30 },
  },
  // Marketing Digital
  {
    id: "seo-inicial",
    name: "SEO inicial",
    description: "Otimização completa do site para mecanismos de busca (setup único)",
    category: "marketing",
    priceMin: 400,
    priceMax: 1200,
    deliveryDays: { min: 5, max: 10 },
  },
  {
    id: "seo-mensal",
    name: "SEO mensal",
    description: "Otimização contínua, análise de palavras-chave e relatórios mensais",
    category: "marketing",
    priceMin: 300,
    priceMax: 1000,
    unit: "/mês",
    deliveryDays: { min: 1, max: 1 },
  },
  {
    id: "redes-sociais",
    name: "Gestão de redes sociais",
    description: "Criação de conteúdo, agendamento e gestão de redes sociais",
    category: "marketing",
    priceMin: 300,
    priceMax: 2000,
    unit: "/mês",
    deliveryDays: { min: 1, max: 1 },
  },
  {
    id: "anuncios",
    name: "Criação de anúncios Google/Meta",
    description: "Setup e otimização de campanhas de anúncios no Google Ads e Meta Ads",
    category: "marketing",
    priceMin: 200,
    priceMax: 1000,
    deliveryDays: { min: 3, max: 7 },
  },
  // Conteúdo
  {
    id: "copywriting",
    name: "Copywriting para páginas",
    description: "Textos persuasivos e otimizados para conversão",
    category: "content",
    priceMin: 80,
    priceMax: 350,
    unit: "/página",
    deliveryDays: { min: 2, max: 5 },
  },
  {
    id: "redacao",
    name: "Redação institucional",
    description: "Textos profissionais para apresentação da empresa",
    category: "content",
    priceMin: 100,
    priceMax: 300,
    unit: "/página",
    deliveryDays: { min: 2, max: 5 },
  },
  {
    id: "lgpd",
    name: "Políticas LGPD",
    description: "Política de privacidade, cookies e termos de uso em conformidade com a LGPD",
    category: "content",
    priceMin: 100,
    priceMax: 500,
    deliveryDays: { min: 3, max: 7 },
  },
  // Inteligência Artificial
  {
    id: "chatbot-basico",
    name: "Chatbot básico",
    description: "Chatbot com respostas automáticas pré-programadas",
    category: "ai",
    priceMin: 200,
    priceMax: 900,
    deliveryDays: { min: 5, max: 10 },
  },
  {
    id: "chatbot-ia",
    name: "Chatbot avançado com IA",
    description: "Chatbot inteligente com processamento de linguagem natural",
    category: "ai",
    priceMin: 600,
    priceMax: 3000,
    deliveryDays: { min: 10, max: 21 },
  },
];

const CATALOG_SERVICES_MAPPED: Service[] = catalogServices.map((service) => {
  const priceMin = parsePriceMin(service.price);
  const priceMax = priceMin > 0 ? Math.round(priceMin * 1.8) : priceMin;
  const delivery = parseDeliveryRange(service.deliveryTime);

  return {
    id: service.id,
    name: service.title,
    description: service.description,
    category: "ai",
    priceMin: priceMin || 0,
    priceMax: priceMax || priceMin || 0,
    deliveryDays: {
      min: delivery.min || 7,
      max: delivery.max || 14,
    },
    image: service.image,
    icon: service.icon,
    longDescription: service.longDescription,
    features: service.features,
    benefits: service.benefits,
  };
});

const LEGACY_SERVICE_MEDIA: Record<
  string,
  { image: string; icon?: Service["icon"] }
> = {
  "site-institucional": { image: imgSiteInstitucional, icon: "trending" },
  "site-comercial": { image: imgSiteComercial, icon: "trending" },
  "landing-page": { image: imgLandingPage, icon: "trending" },
  blog: { image: imgBlogIntegrado, icon: "trending" },
  pagamentos: { image: imgPagamentos, icon: "automation" },
  "whatsapp-api": { image: imgWhatsappApi, icon: "automation" },
  crm: { image: imgCrm, icon: "automation" },
  hospedagem: { image: imgHospedagem, icon: "automation" },
  manutencao: { image: imgManutencao, icon: "automation" },
  "identidade-visual": { image: imgIdentidadeVisual, icon: "trending" },
  banners: { image: imgBanners, icon: "trending" },
  redesign: { image: imgRedesign, icon: "trending" },
  "seo-inicial": { image: imgSeoInicial, icon: "chart" },
  "seo-mensal": { image: imgSeoMensal, icon: "chart" },
  "redes-sociais": { image: imgRedesSociais, icon: "trending" },
  anuncios: { image: imgAnuncios, icon: "trending" },
  copywriting: { image: imgCopywriting, icon: "trending" },
  redacao: { image: imgRedacao, icon: "trending" },
  lgpd: { image: imgLgpd, icon: "chart" },
  "chatbot-basico": { image: imgChatbotBasico, icon: "automation" },
  "chatbot-ia": { image: imgChatbotIa, icon: "bi" },
};

const enrichService = (service: Service): Service => {
  const media = LEGACY_SERVICE_MEDIA[service.id];
  return {
    ...service,
    image: service.image || media?.image,
    icon: service.icon || media?.icon || "trending",
    longDescription: service.longDescription || defaultLongDescription(service),
    features: service.features || defaultFeatures(service.category),
    benefits: service.benefits || defaultBenefits(service.category),
  };
};

export const SERVICES: Service[] = [...LEGACY_SERVICES, ...CATALOG_SERVICES_MAPPED].map(enrichService);

export const CATEGORY_LABELS = {
  web: 'Desenvolvimento Web',
  design: 'Design',
  marketing: 'Marketing Digital',
  content: 'Conteúdo',
  ai: 'Inteligência Artificial',
};
