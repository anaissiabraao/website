import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { useTranslation } from "@/i18n/LanguageProvider";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { t, lang, setLang, languages } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const navLinks = [
    { href: "#home", label: t("nav.home") },
    { href: "#services", label: t("nav.services") },
    { href: "#about", label: t("nav.about") },
    { href: "#testimonials", label: t("testimonials.title") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const LanguageSwitcher = ({ className }: { className?: string }) => (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      {languages.map((language) => (
        <Button
          key={language.code}
          variant={language.code === lang ? "secondary" : "ghost"}
          size="sm"
          className="h-8 px-3 text-xs font-semibold"
          onClick={() => setLang(language.code)}
        >
          {language.label}
        </Button>
      ))}
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="flex items-center gap-2 md:gap-3 group">
            <img
              src={logo}
              alt="Anaissi Data Strategy"
              className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-foreground/80 hover:text-primary font-medium transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="rounded-full"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button asChild>
              <a href="#contact">{t("nav.cta")}</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="rounded-full h-9 w-9"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-9 w-9"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-[400px] pb-6" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col gap-3 pt-4 bg-background/95 backdrop-blur-md rounded-xl p-4 mt-2">
            <li className="flex justify-end">
              <LanguageSwitcher />
            </li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-foreground/80 hover:text-primary font-medium transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Button asChild className="w-full mt-2">
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  {t("nav.cta")}
                </a>
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
