import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { availableLanguages, LanguageCode, translate } from "./translations";

type LanguageContextValue = {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (key: string) => string;
  languages: typeof availableLanguages;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") return "pt";
    const saved = localStorage.getItem("language") as LanguageCode | null;
    return saved ?? "pt";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("language", lang);
  }, [lang]);

  const t = useMemo(() => (key: string) => translate(lang, key), [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      languages: availableLanguages,
    }),
    [lang, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useTranslation = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return ctx;
};

