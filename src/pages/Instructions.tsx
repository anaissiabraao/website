import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "@/i18n/LanguageProvider";

type InstructionVideo = {
  src: string;
  titleKey: string;
  descriptionKey: string;
};

const Instructions = () => {
  const { t } = useTranslation();
  const baseUrl = import.meta.env.BASE_URL || "/";

  const videos: InstructionVideo[] = [
    {
      src: `${baseUrl}videos/anaissi-intro-4k.mp4`,
      titleKey: "instructions.videos.intro.title",
      descriptionKey: "instructions.videos.intro.description",
    },
    {
      src: `${baseUrl}videos/anaissi-website-demo-4k.mp4`,
      titleKey: "instructions.videos.websiteDemo.title",
      descriptionKey: "instructions.videos.websiteDemo.description",
    },
    {
      src: `${baseUrl}videos/RPA1.mp4`,
      titleKey: "instructions.videos.rpa.title",
      descriptionKey: "instructions.videos.rpa.description",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-24 sm:pt-32 pb-10 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4 sm:mb-6">
              {t("instructions.title")}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("instructions.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 max-w-5xl mx-auto">
            {videos.map((v) => (
              <div
                key={v.src}
                className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden"
              >
                <div className="p-6 sm:p-8 border-b border-border/50">
                  <h2 className="text-xl sm:text-2xl font-bold font-display mb-2">
                    {t(v.titleKey)}
                  </h2>
                  <p className="text-muted-foreground">{t(v.descriptionKey)}</p>
                </div>

                <div className="relative aspect-video bg-black">
                  <video
                    className="w-full h-full object-contain bg-black"
                    controls
                    preload="metadata"
                    playsInline
                  >
                    <source src={v.src} type="video/mp4" />
                    {t("video.unsupported")}
                  </video>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Instructions;


