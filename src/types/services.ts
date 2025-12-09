export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'web' | 'design' | 'marketing' | 'content' | 'ai';
  priceMin: number;
  priceMax: number;
  unit?: string;
  deliveryDays: {
    min: number;
    max: number;
  };
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

export const SERVICES: Service[] = [
  // Desenvolvimento Web
  {
    id: 'site-institucional',
    name: 'Criação de site institucional',
    description: 'Site profissional para apresentar sua empresa, com design moderno e responsivo',
    category: 'web',
    priceMin: 1000,
    priceMax: 5000,
    deliveryDays: { min: 7, max: 21 },
  },
  {
    id: 'site-comercial',
    name: 'Site comercial (5–15 páginas)',
    description: 'Site completo com múltiplas páginas, ideal para empresas que precisam de mais conteúdo',
    category: 'web',
    priceMin: 2000,
    priceMax: 10000,
    deliveryDays: { min: 14, max: 45 },
  },
  {
    id: 'landing-page',
    name: 'Landing page profissional',
    description: 'Página de conversão otimizada para campanhas de marketing e captação de leads',
    category: 'web',
    priceMin: 300,
    priceMax: 1500,
    deliveryDays: { min: 3, max: 7 },
  },
  {
    id: 'blog',
    name: 'Blog integrado',
    description: 'Sistema de blog completo integrado ao seu site para publicação de conteúdo',
    category: 'web',
    priceMin: 300,
    priceMax: 900,
    deliveryDays: { min: 5, max: 10 },
  },
  {
    id: 'pagamentos',
    name: 'Implementação de pagamentos',
    description: 'Integração com Mercado Pago, PayPal ou Stripe para receber pagamentos online',
    category: 'web',
    priceMin: 200,
    priceMax: 1200,
    deliveryDays: { min: 3, max: 7 },
  },
  {
    id: 'whatsapp-api',
    name: 'Integração com WhatsApp API',
    description: 'Conecte seu site ao WhatsApp Business API para atendimento automatizado',
    category: 'web',
    priceMin: 300,
    priceMax: 900,
    deliveryDays: { min: 3, max: 7 },
  },
  {
    id: 'crm',
    name: 'Integração com CRM',
    description: 'Integração com RD Station, Pipedrive, HubSpot ou outros CRMs',
    category: 'web',
    priceMin: 400,
    priceMax: 1200,
    deliveryDays: { min: 5, max: 10 },
  },
  {
    id: 'hospedagem',
    name: 'Configuração de hospedagem + domínio + e-mail',
    description: 'Setup completo de infraestrutura: hospedagem, domínio e e-mails profissionais',
    category: 'web',
    priceMin: 150,
    priceMax: 600,
    deliveryDays: { min: 1, max: 3 },
  },
  {
    id: 'manutencao',
    name: 'Manutenção mensal',
    description: 'Suporte técnico, atualizações e backups mensais do seu site',
    category: 'web',
    priceMin: 200,
    priceMax: 800,
    unit: '/mês',
    deliveryDays: { min: 1, max: 1 },
  },
  // Design
  {
    id: 'identidade-visual',
    name: 'Identidade visual completa',
    description: 'Logo, paleta de cores, tipografia e manual de marca',
    category: 'design',
    priceMin: 500,
    priceMax: 3000,
    deliveryDays: { min: 7, max: 21 },
  },
  {
    id: 'banners',
    name: 'Banners profissionais',
    description: 'Criação de banners para site, redes sociais ou anúncios',
    category: 'design',
    priceMin: 100,
    priceMax: 600,
    deliveryDays: { min: 2, max: 5 },
  },
  {
    id: 'redesign',
    name: 'Redesign de site',
    description: 'Modernização completa do design do seu site existente',
    category: 'design',
    priceMin: 1200,
    priceMax: 6000,
    deliveryDays: { min: 10, max: 30 },
  },
  // Marketing Digital
  {
    id: 'seo-inicial',
    name: 'SEO inicial',
    description: 'Otimização completa do site para mecanismos de busca (setup único)',
    category: 'marketing',
    priceMin: 400,
    priceMax: 1200,
    deliveryDays: { min: 5, max: 10 },
  },
  {
    id: 'seo-mensal',
    name: 'SEO mensal',
    description: 'Otimização contínua, análise de palavras-chave e relatórios mensais',
    category: 'marketing',
    priceMin: 300,
    priceMax: 1000,
    unit: '/mês',
    deliveryDays: { min: 1, max: 1 },
  },
  {
    id: 'redes-sociais',
    name: 'Gestão de redes sociais',
    description: 'Criação de conteúdo, agendamento e gestão de redes sociais',
    category: 'marketing',
    priceMin: 300,
    priceMax: 2000,
    unit: '/mês',
    deliveryDays: { min: 1, max: 1 },
  },
  {
    id: 'anuncios',
    name: 'Criação de anúncios Google/Meta',
    description: 'Setup e otimização de campanhas de anúncios no Google Ads e Meta Ads',
    category: 'marketing',
    priceMin: 200,
    priceMax: 1000,
    deliveryDays: { min: 3, max: 7 },
  },
  // Conteúdo
  {
    id: 'copywriting',
    name: 'Copywriting para páginas',
    description: 'Textos persuasivos e otimizados para conversão',
    category: 'content',
    priceMin: 80,
    priceMax: 350,
    unit: '/página',
    deliveryDays: { min: 2, max: 5 },
  },
  {
    id: 'redacao',
    name: 'Redação institucional',
    description: 'Textos profissionais para apresentação da empresa',
    category: 'content',
    priceMin: 100,
    priceMax: 300,
    unit: '/página',
    deliveryDays: { min: 2, max: 5 },
  },
  {
    id: 'lgpd',
    name: 'Políticas LGPD',
    description: 'Política de privacidade, cookies e termos de uso em conformidade com a LGPD',
    category: 'content',
    priceMin: 100,
    priceMax: 500,
    deliveryDays: { min: 3, max: 7 },
  },
  // Inteligência Artificial
  {
    id: 'chatbot-basico',
    name: 'Chatbot básico',
    description: 'Chatbot com respostas automáticas pré-programadas',
    category: 'ai',
    priceMin: 200,
    priceMax: 900,
    deliveryDays: { min: 5, max: 10 },
  },
  {
    id: 'chatbot-ia',
    name: 'Chatbot avançado com IA',
    description: 'Chatbot inteligente com processamento de linguagem natural',
    category: 'ai',
    priceMin: 600,
    priceMax: 3000,
    deliveryDays: { min: 10, max: 21 },
  },
];

export const CATEGORY_LABELS = {
  web: 'Desenvolvimento Web',
  design: 'Design',
  marketing: 'Marketing Digital',
  content: 'Conteúdo',
  ai: 'Inteligência Artificial',
};
