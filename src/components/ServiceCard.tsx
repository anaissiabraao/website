import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  icon: ReactNode;
  price?: string;
  delay?: number;
}

const ServiceCard = ({
  id,
  title,
  description,
  features,
  image,
  icon,
  price,
  delay = 0,
}: ServiceCardProps) => {
  return (
    <Link
      to={`/servicos/${id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl",
        "bg-card border border-border/50",
        "shadow-card hover:shadow-card-hover",
        "transition-all duration-500 ease-out",
        "hover:border-primary/30 hover:-translate-y-2",
        "card-shine animate-slide-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

        <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-card/90 backdrop-blur-sm border border-border/50 text-primary shadow-glow">
          {icon}
        </div>

        {price && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/30 text-primary text-sm font-medium">
            {price}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold font-display mb-2 sm:mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 line-clamp-3">
          {description}
        </p>

        <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-1">
          {features.slice(0, 4).map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-foreground/80"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all duration-300 text-sm sm:text-base mt-auto">
          Saiba mais
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
