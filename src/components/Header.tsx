import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { useTranslation } from "@/i18n/LanguageProvider";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { lang, setLang, languages, t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const navLinks = [
    { href: "#home", label: t("nav.home") },
    { href: "#services", label: t("nav.services") },
    { href: "/servicos", label: t("nav.catalog") },
    { href: "#about", label: t("nav.about") },
    { href: "#testimonials", label: t("nav.testimonials") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const handleNav = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith("#")) {
      if (window.location.pathname !== "/") navigate("/");
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logo}
                alt="Anaissi Data Strategy"
                className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                width={512}
                height={512}
                decoding="async"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button key={link.href} onClick={() => handleNav(link.href)} className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
                  {link.label}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-2">
              {/* Language selector */}
              <div className="flex gap-1 mr-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`px-2 py-1 text-xs font-medium rounded transition-colors ${l.code === lang ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)} className="h-9 w-9 rounded-full">
                {isDark ? <Sun className="h-4 w-4 text-foreground" /> : <Moon className="h-4 w-4 text-foreground" />}
              </Button>

              <Button size="sm" asChild>
                <a href="#contact">{t("nav.cta")}</a>
              </Button>
            </div>

            {/* Mobile toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)} className="h-9 w-9 rounded-full">
                {isDark ? <Sun className="h-4 w-4 text-foreground" /> : <Moon className="h-4 w-4 text-foreground" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="h-10 w-10">
                {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-[55]" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 bg-background border-b border-border shadow-lg z-[60] p-4 space-y-1">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => handleNav(link.href)} className="block w-full text-left px-4 py-3 text-foreground hover:bg-primary/10 hover:text-primary rounded-lg font-medium transition-colors">
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-border mt-3">
              <div className="flex gap-2 px-4 mb-3">
                {languages.map((l) => (
                  <button key={l.code} onClick={() => setLang(l.code)} className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${l.code === lang ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {l.label}
                  </button>
                ))}
              </div>
              <Button size="sm" className="w-full" asChild>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>{t("nav.cta")}</a>
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
