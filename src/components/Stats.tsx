import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/LanguageProvider";

const AnimatedCounter = ({
  target,
  suffix,
  isVisible,
}: {
  target: number;
  suffix: string;
  isVisible: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, isVisible]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const Stats = () => {
  const { t } = useTranslation();
  const stats = [
    { value: 95, suffix: "%", label: t("stats.timeReduction") },
    { value: 114, suffix: "+", label: t("stats.projectsCompleted") },
    { value: 99, suffix: "%", label: t("stats.accuracy") },
    { value: 24, suffix: "/7", label: t("stats.support") },
  ];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "text-center p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl bg-card/5 backdrop-blur-sm border border-primary/10 transition-all duration-500",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-1 md:mb-2">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>
              <div className="text-primary-foreground/70 text-xs sm:text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
