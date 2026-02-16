import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Rocket, Bot, BarChart3, GraduationCap, Globe, ArrowRight,
  Sparkles, CheckCircle, Users, Clock, BookOpen, Award,
  Cpu, Database, LineChart, Zap, Play, Star, Shield, TrendingUp,
} from "lucide-react";
import academyDashboard from "@/assets/academy-dashboard.jpg";
import academyLearning from "@/assets/academy-learning.jpg";
import academyCertificate from "@/assets/academy-certificate.jpg";

const courses = [
  {
    icon: Bot,
    title: "Automação com RPA",
    description: "Aprenda a criar robôs que executam tarefas repetitivas automaticamente, do zero ao avançado.",
    modules: 12,
    hours: 40,
    level: "Iniciante ao Avançado",
  },
  {
    icon: BarChart3,
    title: "Data Analytics & BI",
    description: "Domine dashboards, KPIs e ferramentas de Business Intelligence para decisões estratégicas.",
    modules: 10,
    hours: 35,
    level: "Intermediário",
  },
  {
    icon: Cpu,
    title: "Inteligência Artificial Aplicada",
    description: "IA prática para negócios: machine learning, NLP e automação inteligente.",
    modules: 14,
    hours: 50,
    level: "Intermediário ao Avançado",
  },
  {
    icon: Database,
    title: "Integração de Sistemas",
    description: "Conecte ERPs, CRMs e APIs para criar fluxos de dados contínuos na sua empresa.",
    modules: 8,
    hours: 28,
    level: "Intermediário",
  },
  {
    icon: LineChart,
    title: "Logística & Supply Chain",
    description: "Otimize operações logísticas com dados e automação para máxima eficiência.",
    modules: 9,
    hours: 32,
    level: "Iniciante ao Intermediário",
  },
  {
    icon: Zap,
    title: "Transformação Digital",
    description: "Lidere a transformação digital na sua empresa com frameworks e estratégias comprovadas.",
    modules: 7,
    hours: 24,
    level: "Todos os níveis",
  },
];

const benefits = [
  { icon: Play, title: "Aulas Práticas", desc: "Aprenda fazendo com projetos reais do mercado" },
  { icon: Users, title: "Comunidade Ativa", desc: "Network com profissionais e mentores" },
  { icon: Clock, title: "Acesso Vitalício", desc: "Estude no seu ritmo, quando quiser" },
  { icon: Award, title: "Certificado", desc: "Certificação reconhecida pelo mercado" },
  { icon: Shield, title: "Suporte Dedicado", desc: "Tire dúvidas diretamente com instrutores" },
  { icon: TrendingUp, title: "Atualização Contínua", desc: "Conteúdo sempre atualizado com o mercado" },
];

const stats = [
  { value: "500+", label: "Alunos capacitados" },
  { value: "50+", label: "Horas de conteúdo" },
  { value: "6", label: "Trilhas de aprendizado" },
  { value: "98%", label: "Satisfação dos alunos" },
];

const AcademyPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,50%,8%)] via-[hsl(210,60%,12%)] to-[hsl(195,60%,15%)]" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(195 100% 50%) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <div className="absolute top-20 -left-40 w-80 h-80 rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-10 -right-40 w-80 h-80 rounded-full bg-accent/15 blur-[120px]" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm mb-6">
                  <Sparkles className="h-4 w-4" />
                  Plataforma Educacional
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                  Anaissi Academy
                </h1>
                <p className="text-lg md:text-xl text-white/70 mb-3">
                  Aprenda Tecnologia com Quem Vive Dados e Inovação
                </p>
                <p className="text-white/40 mb-8 max-w-lg">
                  Capacite-se com cursos práticos em dados, automação, logística, tecnologia e transformação digital. Do iniciante ao avançado.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="group text-base px-8" asChild>
                    <a href="https://www.anaissiacademy.com.br/" target="_blank" rel="noopener noreferrer">
                      Explorar Cursos
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button size="lg" variant="heroOutline" asChild>
                    <a href="#courses">Ver Trilhas</a>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/10">
                  <img src={academyDashboard} alt="Plataforma Anaissi Academy" className="w-full h-auto" loading="lazy" />
                </div>
                <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-white text-sm font-semibold">4.9/5</span>
                    <span className="text-white/40 text-xs">avaliação</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={academyLearning} alt="Profissionais aprendendo tecnologia" className="w-full h-auto object-cover" loading="lazy" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Por que escolher a <span className="text-gradient">Academy?</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Uma experiência de aprendizado projetada para profissionais que querem resultados reais.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {benefits.map((b, i) => {
                    const Icon = b.icon;
                    return (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">{b.title}</h3>
                          <p className="text-xs text-muted-foreground">{b.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses */}
        <section id="courses" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Trilhas de <span className="text-gradient">Aprendizado</span>
              </h2>
              <p className="text-muted-foreground">
                Cursos completos do básico ao avançado, com projetos práticos e certificação.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {courses.map((course, i) => {
                const Icon = course.icon;
                return (
                  <div key={i} className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 card-shadow hover:card-shadow-hover transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{course.modules} módulos</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.hours}h</span>
                    </div>
                    <div className="mt-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">{course.level}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Button size="lg" className="group" asChild>
                <a href="https://www.anaissiacademy.com.br/" target="_blank" rel="noopener noreferrer">
                  Acessar Plataforma
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Certificate */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Certificação <span className="text-gradient">Profissional</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Ao concluir cada trilha, você recebe um certificado reconhecido pelo mercado que comprova suas habilidades.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Certificado digital verificável",
                    "Reconhecido por empresas do setor",
                    "Comprova habilidades práticas",
                    "Valorize seu currículo profissional",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground/80">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="group" asChild>
                  <a href="https://www.anaissiacademy.com.br/" target="_blank" rel="noopener noreferrer">
                    Começar Agora
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="relative w-72 h-72 md:w-80 md:h-80">
                  <img src={academyCertificate} alt="Certificação Anaissi Academy" className="w-full h-full object-contain rounded-2xl" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,50%,8%)] via-[hsl(210,60%,12%)] to-[hsl(195,60%,15%)]" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(195 100% 50%) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <GraduationCap className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Pronto para dar o próximo passo?
            </h2>
            <p className="text-white/50 max-w-lg mx-auto mb-8">
              Junte-se a centenas de profissionais que já estão transformando suas carreiras com a Anaissi Academy.
            </p>
            <Button size="lg" className="group text-base px-10" asChild>
              <a href="https://www.anaissiacademy.com.br/" target="_blank" rel="noopener noreferrer">
                Explorar Cursos Agora
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AcademyPage;
