import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/LanguageProvider";

const Testimonials = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      content: t("testimonials.testimonial1"),
      author: "Maria Silva",
      role: t("testimonials.author1"),
      rating: 5,
    },
    {
      content: t("testimonials.testimonial2"),
      author: "Kevin Burrell",
      role: t("testimonials.author2"),
      rating: 5,
    },
    {
      content: t("testimonials.testimonial3"),
      author: "Marlon Marques",
      role: t("testimonials.author3"),
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
            {t("testimonials.title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-6 xl:p-8 card-shadow hover:card-shadow-hover transition-all duration-500 border border-border hover:border-primary/30"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 xl:h-12 xl:w-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
              
              <div className="flex gap-1 mb-4 xl:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 xl:h-5 xl:w-5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-sm xl:text-base text-foreground/80 mb-6 xl:mb-8 relative z-10">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3 xl:gap-4">
                <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-base xl:text-lg font-bold text-primary-foreground">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm xl:text-base text-foreground">{testimonial.author}</h4>
                  <p className="text-xs xl:text-sm text-muted-foreground line-clamp-1">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <div className="bg-card rounded-2xl p-5 sm:p-6 md:p-8 card-shadow border border-border">
                    <div className="flex gap-1 mb-4 md:mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-primary text-primary" />
                      ))}
                    </div>

                    <p className="text-sm md:text-base text-foreground/80 mb-6 md:mb-8">"{testimonial.content}"</p>

                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-base md:text-lg font-bold text-primary-foreground">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm md:text-base text-foreground">{testimonial.author}</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-6 md:mt-8">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="h-9 w-9 md:h-10 md:w-10">
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    index === currentIndex
                      ? "w-6 md:w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={nextTestimonial} className="h-9 w-9 md:h-10 md:w-10">
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
