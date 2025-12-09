import { ArrowRight, CheckCircle, Clock, Rocket, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import { useTranslation } from "@/i18n/LanguageProvider";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoPlaylist = ["/videos/marlon.mp4", "/videos/murilo.mp4"];

  const benefits = [t("hero.benefit1"), t("hero.benefit2"), t("hero.benefit3")];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playCurrentVideo = () => {
      video.src = videoPlaylist[currentVideoIndex];
      video.currentTime = 0;
      video.playbackRate = 2.0;
      video.muted = true;
      video.play().catch(() => {});
    };

    const handleVideoEnd = () => {
      setCurrentVideoIndex((prev) => (prev + 1) % videoPlaylist.length);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && video) {
        video.playbackRate = 2.0;
        video.muted = true;
        video.play().catch(() => {});
      }
    };

    video.addEventListener("ended", handleVideoEnd);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    playCurrentVideo();

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [currentVideoIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20 animate-float"
            style={{
              width: Math.random() * 8 + 4 + "px",
              height: Math.random() * 8 + 4 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 5 + "s",
              animationDuration: Math.random() * 10 + 10 + "s",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-8 md:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-5 md:space-y-8 animate-fade-in-up text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Rocket className="h-3 w-3 md:h-4 md:w-4 text-primary" />
              <span className="text-xs md:text-sm font-medium text-primary">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">{t("hero.title")}</span>
              <span className="block text-gradient mt-2">{t("hero.highlight")}</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-foreground/90 max-w-xl mx-auto lg:mx-0">
              {t("hero.preSavings")}{" "}
              <span className="font-bold text-primary">{t("hero.savings")}</span>{" "}
              {t("hero.postSavings")}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-foreground"
                >
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                  <span className="text-xs md:text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" asChild className="text-sm md:text-base px-6 md:px-10">
                <a href="#contact">
                  <Rocket className="h-4 w-4 md:h-5 md:w-5" />
                  {t("hero.cta1")}
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild className="text-sm md:text-base px-6 md:px-10">
                <a href="#services">
                  <Play className="h-4 w-4 md:h-5 md:w-5" />
                  {t("hero.cta2")}
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-foreground/80 text-xs md:text-sm">
              <Clock className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
              <span>
                <strong className="text-foreground">{t("hero.urgency")}</strong>{" "}
                {t("hero.urgencyText")}
              </span>
            </div>
          </div>

          {/* AI Video/Animation Card */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-3xl" />
              <div className="relative bg-card/10 backdrop-blur-xl border border-primary/20 rounded-3xl overflow-hidden">
                {/* Video Carousel */}
                <div className="relative aspect-video bg-gradient-hero overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                </div>
                
                {/* Stats below video */}
                <div className="p-6 md:p-8 space-y-4">
                  <h3 className="text-lg md:text-xl font-bold text-primary-foreground text-center">
                    {t("hero.resultsTitle")}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {[
                      { value: "95%", label: t("stats.timeReduction") },
                      { value: "114+", label: t("stats.projectsCompleted") },
                      { value: "99%", label: t("stats.accuracy") },
                      { value: "24/7", label: t("stats.support") },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="text-center p-3 md:p-4 rounded-xl bg-primary/5 border border-primary/10"
                      >
                        <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gradient">{stat.value}</div>
                        <div className="text-xs md:text-sm text-primary-foreground/70">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Stats Card */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "95%", label: "Redução de Tempo" },
                { value: "114+", label: "Projetos" },
                { value: "99%", label: "Precisão" },
                { value: "24/7", label: "Suporte" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-card/10 backdrop-blur-sm border border-primary/20"
                >
                  <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
