import slaAnalyticsImg from "@/assets/Gemini_Generated_Image_puni8spuni8spuni.png";
import continuousImprovementImg from "@/assets/Gemini_Generated_Image_bws48ubws48ubws4.png";
import dataAutomationImg from "@/assets/Gemini_Generated_Image_gafz0vgafz0vgafz.png";
import businessIntelligenceImg from "@/assets/Gemini_Generated_Image_cfgnm9cfgnm9cfgn.png";

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  image: string;
  icon: "chart" | "trending" | "automation" | "bi";
  price?: string;
  deliveryTime?: string;
  category: string;
}

export const services: Service[] = [
  {
    id: "analise-sla",
    title: "Análise de SLA",
    description:
      "Desenvolvemos dashboards e relatórios para monitoramento de indicadores de SLA e identificação de oportunidades de melhoria.",
    longDescription:
      "Nossa solução de Análise de SLA oferece uma visão completa dos seus indicadores de desempenho. Criamos dashboards interativos e relatórios automatizados que permitem acompanhar em tempo real o cumprimento dos acordos de nível de serviço, identificar gargalos e antecipar problemas antes que afetem seus clientes.",
    features: [
      "Monitoramento em tempo real",
      "Relatórios personalizados",
      "Alertas automáticos",
      "Análise preditiva",
      "Dashboards interativos",
      "Integração com múltiplas fontes de dados",
    ],
    benefits: [
      "Redução de até 40% no tempo de resposta a incidentes",
      "Visibilidade completa dos indicadores de desempenho",
      "Tomada de decisão baseada em dados",
      "Prevenção proativa de violações de SLA",
      "Relatórios automatizados para stakeholders",
    ],
    image: slaAnalyticsImg,
    icon: "chart",
    price: "A partir de R$ 2.500",
    deliveryTime: "7-14 dias úteis",
    category: "Análise de Dados",
  },
  {
    id: "melhoria-continua",
    title: "Melhoria Contínua",
    description:
      "Implementamos metodologias de melhoria contínua para otimizar processos e alcançar melhores resultados operacionais.",
    longDescription:
      "Nosso serviço de Melhoria Contínua utiliza metodologias comprovadas como Lean, Six Sigma e Kaizen para transformar seus processos. Identificamos oportunidades de otimização, eliminamos desperdícios e criamos uma cultura de evolução constante na sua organização.",
    features: [
      "Análise de processos",
      "Implementação de melhorias",
      "Treinamento de equipes",
      "Acompanhamento de resultados",
      "Metodologias Lean e Six Sigma",
      "Gestão de indicadores",
    ],
    benefits: [
      "Aumento de até 35% na eficiência operacional",
      "Redução de custos através da eliminação de desperdícios",
      "Equipes capacitadas em metodologias de melhoria",
      "Cultura de inovação e evolução constante",
      "Resultados mensuráveis e sustentáveis",
    ],
    image: continuousImprovementImg,
    icon: "trending",
    price: "A partir de R$ 3.500",
    deliveryTime: "14-30 dias úteis",
    category: "Consultoria",
  },
  {
    id: "automacao-dados",
    title: "Automação de Dados",
    description:
      "Automatizamos coleta, processamento e visualização de dados para aumentar a eficiência da sua operação.",
    longDescription:
      "Transforme dados em insights de forma automática. Nossa solução de automação elimina tarefas manuais repetitivas, integra diferentes fontes de dados e garante que você tenha sempre informações atualizadas para tomar as melhores decisões.",
    features: [
      "ETL automatizado",
      "Integração de APIs",
      "Pipelines de dados",
      "Agendamento de tarefas",
      "Validação de qualidade",
      "Notificações inteligentes",
    ],
    benefits: [
      "Economia de até 20 horas semanais em tarefas manuais",
      "Dados sempre atualizados e consistentes",
      "Redução de erros humanos",
      "Escalabilidade para grandes volumes",
      "Foco em análise estratégica ao invés de operacional",
    ],
    image: dataAutomationImg,
    icon: "automation",
    price: "A partir de R$ 4.000",
    deliveryTime: "14-21 dias úteis",
    category: "Automação",
  },
  {
    id: "business-intelligence",
    title: "Business Intelligence",
    description:
      "Criamos soluções de BI completas com dashboards executivos e relatórios estratégicos para sua empresa.",
    longDescription:
      "Nossos projetos de Business Intelligence transformam seus dados em vantagem competitiva. Desenvolvemos dashboards executivos, relatórios estratégicos e análises avançadas que permitem entender profundamente seu negócio e identificar oportunidades de crescimento.",
    features: [
      "Dashboards executivos",
      "Análise de vendas",
      "Relatórios financeiros",
      "KPIs personalizados",
      "Drill-down detalhado",
      "Exportação de dados",
    ],
    benefits: [
      "Visão 360° do negócio em tempo real",
      "Identificação de tendências e oportunidades",
      "Suporte à tomada de decisão estratégica",
      "Democratização do acesso a dados",
      "ROI mensurável em curto prazo",
    ],
    image: businessIntelligenceImg,
    icon: "bi",
    price: "A partir de R$ 5.000",
    deliveryTime: "21-45 dias úteis",
    category: "Análise de Dados",
  },
];

export const getServiceById = (id: string): Service | undefined =>
  services.find((service) => service.id === id);
