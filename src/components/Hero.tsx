import { ArrowRight, CheckCircle, Clock, Rocket, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import { useTranslation } from "@/i18n/LanguageProvider";
import { useCallback, useEffect, useRef, useState } from "react";

type HeroVideo = { key: string; mp4: string; webm: string };

const Hero = () => {
  const { t } = useTranslation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [needsVideoTap, setNeedsVideoTap] = useState(false);
  const [videoHardError, setVideoHardError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Use BASE_URL so this works both on root domains and sub-path deployments (e.g. /site/).
  const baseUrl = import.meta.env.BASE_URL || "/";
  const videoPlaylist: HeroVideo[] = [
    { key: "marlon", mp4: `${baseUrl}videos/marlon.mp4`, webm: `${baseUrl}videos/marlon.webm` },
    { key: "murilo", mp4: `${baseUrl}videos/murilo.mp4`, webm: `${baseUrl}videos/murilo.webm` },
  ];

  const benefits = [t("hero.benefit1"), t("hero.benefit2"), t("hero.benefit3")];

  const attemptPlay = useCallback(async (reason: string) => {
    const v = videoRef.current;
    if (!v) return false;

    try {
      // iOS/Safari can be picky: ensure muted is set *before* play()
      v.muted = true;
      v.defaultMuted = true;
      v.setAttribute("muted", "");
      v.setAttribute("playsinline", "");
      v.playsInline = true;

      await v.play();
      // Some browsers ignore playbackRate until playback starts.
      v.playbackRate = 2.0;
      setNeedsVideoTap(false);
      setVideoHardError(false);
      return true;
    } catch (err) {
      // Distinguish autoplay policy from real decode/network errors.
      const name = err instanceof Error ? err.name : String(err);
      if (name === "NotSupportedError") {
        // eslint-disable-next-line no-console
        console.warn("Vídeo não suportado (codec/formato) ao tentar play():", reason, err);
        setVideoHardError(true);
        setNeedsVideoTap(false);
        return false;
      }

      // Autoplay may be blocked until user gesture; show fallback button.
      // eslint-disable-next-line no-console
      console.warn("Autoplay bloqueado/adiado:", reason);
      setNeedsVideoTap(true);
      return false;
    }
  }, []);

  useEffect(() => {
    // When swapping sources, force reload on the element for more consistent behavior across browsers.
    const v = videoRef.current;
    if (v) {
      try {
        v.load();
      } catch {
        // ignore
      }
    }
  }, [currentVideoIndex]);

  useEffect(() => {
    // Try a few times after source swap (Railway/proxies sometimes delay readiness events).
    let cancelled = false;
    const delays = [0, 250, 1000, 2000];

    (async () => {
      for (const d of delays) {
        if (cancelled) return;
        if (d) await new Promise((r) => setTimeout(r, d));
        const ok = await attemptPlay(`index=${currentVideoIndex} delay=${d}`);
        if (ok) return;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [attemptPlay, currentVideoIndex]);

  useEffect(() => {
    // One-time user gesture hook: the first tap/click can unlock playback on mobile.
    const onFirstGesture = () => {
      void attemptPlay("first-gesture");
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("touchstart", onFirstGesture);
    };
    window.addEventListener("pointerdown", onFirstGesture, { passive: true });
    window.addEventListener("touchstart", onFirstGesture, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("touchstart", onFirstGesture);
    };
  }, [attemptPlay]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      // Resume playback when coming back to the tab (some browsers pause on background).
      if (document.visibilityState === "visible") {
        void attemptPlay("visibilitychange");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [attemptPlay]);

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
          <div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-3xl" />
              <div className="relative bg-card/10 backdrop-blur-xl border border-primary/20 rounded-3xl overflow-hidden">
                {/* Video Carousel */}
                <div className="relative aspect-video bg-gradient-hero overflow-hidden">
                  <video
                    key={videoPlaylist[currentVideoIndex].key}
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    preload="metadata"
                    poster={heroBg}
                    loop={false}
                    onLoadedMetadata={() => {
                      void attemptPlay("loadedmetadata");
                    }}
                    onCanPlay={(e) => {
                      void attemptPlay("canplay");
                    }}
                    onEnded={() => setCurrentVideoIndex((prev) => (prev + 1) % videoPlaylist.length)}
                    onPlay={() => setNeedsVideoTap(false)}
                    onError={(e) => {
                      // Keeps failures silent in prod, but helps during debugging.
                      // eslint-disable-next-line no-console
                      console.warn("Falha ao carregar vídeo do hero:", {
                        playlist: videoPlaylist[currentVideoIndex],
                        currentSrc: videoRef.current?.currentSrc,
                        networkState: videoRef.current?.networkState,
                        readyState: videoRef.current?.readyState,
                        mediaErrorCode: videoRef.current?.error?.code,
                        mediaErrorMessage: (videoRef.current?.error as any)?.message,
                      });

                      // If this is a real decode/load error, try the next video so we don't get stuck.
                      setVideoHardError(true);
                      setNeedsVideoTap(false);
                      setCurrentVideoIndex((prev) => (prev + 1) % videoPlaylist.length);
                    }}
                  >
                    {/* Prefer WebM when available (better compatibility in some Windows setups without H.264 decoders). */}
                    <source src={videoPlaylist[currentVideoIndex].webm} type="video/webm" />
                    <source src={videoPlaylist[currentVideoIndex].mp4} type="video/mp4" />
                    {t("video.unsupported")}
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />

                  {/* Fallback: alguns navegadores exigem interação do usuário para iniciar */}
                  {needsVideoTap && !videoHardError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        type="button"
                        variant="secondary"
                        className="gap-2"
                        onClick={(e) => {
                          e.preventDefault();
                          void attemptPlay("fallback-button");
                        }}
                      >
                        <Play className="h-4 w-4" />
                        {t("video.play")}
                      </Button>
                    </div>
                  )}

                  {/* Hard error fallback (codec/network): don't pretend it's autoplay. */}
                  {videoHardError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm backdrop-blur">
                        {t("video.unsupported")}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Stats below video */}
                <div className="p-6 md:p-8 space-y-4">
                  <h3 className="text-lg md:text-xl font-bold text-white text-center">
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
                        <div className="text-xs md:text-sm text-white/70">{stat.label}</div>
                      </div>
                    ))}
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

export default Hero;
