import { CheckCircle, Award, Users, Zap, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";
import teamImage from "@/assets/team-working.jpg";
import { useTranslation } from "@/i18n/LanguageProvider";

const About = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Award,
      text: t("about.feature1"),
    },
    {
      icon: Zap,
      text: t("about.feature2"),
    },
    {
      icon: Users,
      text: t("about.feature3"),
    },
    {
      icon: CheckCircle,
      text: t("about.feature4"),
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
                {t("about.title")}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                {t("about.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-background card-shadow hover:card-shadow-hover transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-foreground/80 pt-1 md:pt-2">
                      {feature.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute -inset-4 md:-inset-8 bg-gradient-primary opacity-10 blur-3xl rounded-full" />
            
            {/* Team Image */}
            <div className="relative rounded-2xl overflow-hidden mb-6 card-shadow">
              <img
                src={teamImage}
                alt={t("about.teamAlt")}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
            </div>
            
            {/* AI Animation */}
            <div className="relative rounded-2xl overflow-hidden mb-6 card-shadow">
              <div className="relative aspect-video bg-gradient-hero flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Animated rings */}
                  <div className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: "3s" }} />
                  <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: "4s" }} />
                  <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-primary/10 animate-ping" style={{ animationDuration: "5s" }} />
                  
                  {/* Center logo */}
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <img src={logo} alt="Anaissi" className="w-24 md:w-32 h-auto animate-float" />
                    <div className="flex items-center gap-2 text-foreground">
                      <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                      <span className="text-sm md:text-base font-medium">{t("about.aiInAction")}</span>
                      <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                    </div>
                  </div>
                </div>
                
                {/* Floating data particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {["01", "10", "AI", "RPA", "SLA", "DATA", "→", "◆"].map((text, i) => (
                    <div
                      key={i}
                      className="absolute text-primary/60 text-xs font-mono animate-float"
                      style={{
                        left: `${10 + i * 12}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${3 + i * 0.5}s`,
                      }}
                    >
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative bg-card rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 card-shadow border border-border">
              <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
                <img
                  src={logo}
                  alt="Anaissi Data Strategy"
                  className="w-32 sm:w-40 md:w-48 h-auto animate-float"
                />
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground">Data Strategy</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {t("about.tagline")}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 md:gap-8 pt-4 md:pt-6 border-t border-border w-full">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-gradient">5+</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">{t("about.stats.experience")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-gradient">50+</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">{t("about.stats.clients")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-gradient">100%</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">{t("about.stats.commitment")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
