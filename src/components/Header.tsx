import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { useTranslation } from "@/i18n/LanguageProvider";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, lang, setLang, languages } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Inicializa dark mode como padrão
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    // Fecha o menu ao clicar fora
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('.menu-container')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const navLinks = [
    { href: "#home", label: t("nav.home") },
    { href: "#services", label: t("nav.services") },
    { href: "#about", label: t("nav.about") },
    { href: "#testimonials", label: t("testimonials.title") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
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

            {/* Menu Hamburguer Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-10 w-10 md:h-12 md:w-12 rounded-full menu-container"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 md:h-7 md:w-7 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 md:h-7 md:w-7 text-foreground" />
              )}
            </Button>
          </div>
        </nav>
      </header>

      {/* Menu Lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-background border-l border-border shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out menu-container ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header do Menu */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full"
            >
              <X className="h-5 w-5 text-foreground" />
            </Button>
          </div>

          {/* Conteúdo do Menu */}
          <div className="flex-1 overflow-y-auto p-6">
            <nav className="space-y-6">
              {/* Links de Navegação */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block py-3 px-4 text-foreground hover:bg-primary/10 hover:text-primary rounded-lg font-medium transition-all duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Divisor */}
              <div className="border-t border-border" />

              {/* Seletor de Idioma */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                  {t("nav.services")}
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {languages.map((language) => (
                    <Button
                      key={language.code}
                      variant={language.code === lang ? "default" : "outline"}
                      size="sm"
                      className="font-semibold"
                      onClick={() => setLang(language.code)}
                    >
                      {language.label}
                    </Button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
