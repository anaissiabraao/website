import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, MessageSquare, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ToolsSection = () => {
  const navigate = useNavigate();

  const tools = [
    {
      title: 'Gerador de Propostas',
      description: 'Crie propostas comerciais completas em PDF com identidade visual profissional',
      icon: FileText,
      path: '/propostas',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Orçamentos para WhatsApp',
      description: 'Gere orçamentos rápidos e profissionais prontos para enviar no WhatsApp',
      icon: MessageSquare,
      path: '/orcamentos',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ferramentas <span className="text-gradient">Comerciais</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Utilize nossas ferramentas para criar propostas e orçamentos profissionais de forma rápida e eficiente
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card 
                key={tool.path}
                className="group hover:shadow-card-hover transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
                onClick={() => navigate(tool.path)}
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-lg ${tool.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-7 w-7 ${tool.color}`} />
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription className="text-base">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    variant="outline"
                  >
                    Acessar Ferramenta
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
