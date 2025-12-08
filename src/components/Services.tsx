import { Bot, ChartLine, Cog, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/LanguageProvider";
import rpaImage from "@/assets/rpa-automation.jpg";
import analyticsImage from "@/assets/data-analytics.jpg";
import improvementImage from "@/assets/improvement.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const serviceConfigs = [
  {
    icon: Bot,
    titleKey: "services.rpa.title",
    descriptionKey: "services.rpa.description",
    featureKeys: [
      "services.rpa.feature1",
      "services.rpa.feature2",
      "services.rpa.feature3",
      "services.rpa.feature4",
    ],
    image: rpaImage,
    video: "/videos/RPA1.mp4",
  },
  {
    icon: ChartLine,
    titleKey: "services.sla.title",
    descriptionKey: "services.sla.description",
    featureKeys: [
      "services.sla.feature1",
      "services.sla.feature2",
      "services.sla.feature3",
      "services.sla.feature4",
    ],
    image: analyticsImage,
  },
  {
    icon: Cog,
    titleKey: "services.improvement.title",
    descriptionKey: "services.improvement.description",
    featureKeys: [
      "services.improvement.feature1",
      "services.improvement.feature2",
      "services.improvement.feature3",
      "services.improvement.feature4",
    ],
    image: improvementImage,
  },
];

const Services = () => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isRpaModalOpen, setIsRpaModalOpen] = useState(false);

  const services = serviceConfigs.map((service) => ({
    ...service,
    title: t(service.titleKey),
    description: t(service.descriptionKey),
    features: service.featureKeys.map((key) => t(key)),
  }));

  const openRpaVideo = () => setIsRpaModalOpen(true);

  return (
    <>
      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t("services.title").split(" ")[0]} <span className="text-gradient">{t("services.title").split(" ").slice(1).join(" ")}</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t("services.subtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={index}
                  className={cn(
                    "group relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer",
                    "bg-card border border-border",
                    "hover:border-primary/50",
                    isHovered ? "card-shadow-hover scale-[1.02]" : "card-shadow"
                  )}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => service.video && openRpaVideo()}
                >
                  {/* Service Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    <div
                      className={cn(
                        "absolute bottom-4 left-4 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-500",
                        "bg-gradient-primary",
                        isHovered && "scale-110 glow"
                      )}
                    >
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 line-clamp-3">
                      {service.description}
                    </p>

                    <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-foreground/80"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all text-sm sm:text-base">
                      {t("services.learnMore")}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Dialog open={isRpaModalOpen} onOpenChange={setIsRpaModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{services[0].title}</DialogTitle>
            </DialogHeader>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
              <video
                src={serviceConfigs[0].video}
                controls
                className="w-full h-full"
                poster={rpaImage}
              />
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
};

export default Services;
