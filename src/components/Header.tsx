import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Shield, MessageSquare, Moon, Sun, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import logo from "@/assets/logo.png";
import { useTranslation } from "@/i18n/LanguageProvider";
import { useCurrency } from "@/currency/CurrencyProvider";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { t, lang, setLang, languages } = useTranslation();
  const { currency, mode, setCurrency, setMode } = useCurrency();
  const navigate = useNavigate();

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
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

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

  const handleNav = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith("#")) {
      navigate(`/${href}`);
      return;
    }
    navigate(href);
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
            <Link to="/#home" className="flex items-center gap-2 md:gap-3 group">
              <img
                src={logo}
                alt="Anaissi Data Strategy"
                className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Links de Atalho - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/servicos')}
                className="gap-2 text-foreground hover:text-primary"
              >
                <ShoppingBag className="h-4 w-4" />
                {t("nav.catalog")}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/instrucoes')}
                className="gap-2 text-foreground hover:text-primary"
              >
                <Play className="h-4 w-4" />
                {t("nav.instructions")}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/privacidade')}
                className="gap-2 text-foreground hover:text-primary"
              >
                <Shield className="h-4 w-4" />
                {t("nav.privacy")}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://chatgpt.com/', '_blank', 'width=800,height=600')}
                className="gap-2 text-foreground hover:text-primary"
                title={t("nav.chatgptTooltip")}
              >
                <MessageSquare className="h-4 w-4" />
                {t("nav.chatgpt")}
              </Button>

              {/* Botão Dark/Light Mode */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark(!isDark)}
                className="h-10 w-10 rounded-full"
                title={isDark ? t("theme.light") : t("theme.dark")}
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-foreground" />
                ) : (
                  <Moon className="h-5 w-5 text-foreground" />
                )}
              </Button>

              {/* Seletor de Moeda (Desktop) */}
              <div className="min-w-[140px]">
                <Select
                  value={mode === "auto" ? "AUTO" : currency}
                  onValueChange={(v) => {
                    if (v === "AUTO") setMode("auto");
                    else setCurrency(v as any);
                  }}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder={t("currency.label")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AUTO">{t("currency.auto")}</SelectItem>
                    <SelectItem value="BRL">BRL</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="MXN">MXN</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Idiomas (Desktop - sempre visível no header) */}
              <div className="flex items-center gap-1">
                {languages.map((language) => (
                  <Button
                    key={language.code}
                    variant={language.code === lang ? "default" : "outline"}
                    size="sm"
                    className="font-semibold h-9 px-3"
                    onClick={() => setLang(language.code)}
                  >
                    {language.label}
                  </Button>
                ))}
              </div>

              {/* Menu Hamburguer Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="h-10 w-10 rounded-full menu-container"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-foreground" />
                ) : (
                  <Menu className="h-6 w-6 text-foreground" />
                )}
              </Button>
            </div>

            {/* Menu Hamburguer Button - Mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="h-10 w-10 rounded-full menu-container"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-foreground" />
                ) : (
                  <Menu className="h-6 w-6 text-foreground" />
                )}
              </Button>
            </div>
          </div>

          {/* Barra Mobile: Idioma + Moeda (sempre visível no mobile) */}
          <div className="lg:hidden pb-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                {languages.map((language) => (
                  <Button
                    key={language.code}
                    variant={language.code === lang ? "default" : "outline"}
                    size="sm"
                    className="font-semibold h-8 px-3"
                    onClick={() => setLang(language.code)}
                  >
                    {language.label}
                  </Button>
                ))}
              </div>

              <div className="min-w-[130px]">
                <Select
                  value={mode === "auto" ? "AUTO" : currency}
                  onValueChange={(v) => {
                    if (v === "AUTO") setMode("auto");
                    else setCurrency(v as any);
                  }}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder={t("currency.label")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AUTO">{t("currency.auto")}</SelectItem>
                    <SelectItem value="BRL">BRL</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="MXN">MXN</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
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
            <h2 className="text-xl font-bold text-foreground">{t("nav.menu")}</h2>
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
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => handleNav(link.href)}
                    className="block py-3 px-4 text-foreground hover:bg-primary/10 hover:text-primary rounded-lg font-medium transition-all duration-200"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handleNav("/instrucoes")}
                  className="block py-3 px-4 text-foreground hover:bg-primary/10 hover:text-primary rounded-lg font-medium transition-all duration-200"
                >
                  {t("nav.instructions")}
                </button>
              </div>

              {/* Divisor */}
              <div className="border-t border-border" />

              {/* Seletor de Idioma */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                  {t("nav.language")}
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
