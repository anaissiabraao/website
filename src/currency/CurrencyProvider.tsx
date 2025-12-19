import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/i18n/LanguageProvider";

export type CurrencyCode = "BRL" | "USD" | "EUR" | "MXN";
export type CurrencyMode = "auto" | "manual";

type RatesResponse = {
  base: "BRL";
  fetchedAt: number;
  ttlMs: number;
  rates: Record<string, number>;
  warning?: string;
};

type CurrencyContextValue = {
  currency: CurrencyCode;
  mode: CurrencyMode;
  setCurrency: (currency: CurrencyCode) => void;
  setMode: (mode: CurrencyMode) => void;
  rates: Record<CurrencyCode, number> | null; // BRL -> currency
  isLoadingRates: boolean;
  convertFromBRL: (valueBRL: number) => number;
  formatMoney: (valueBRL: number, opts?: { includeCode?: boolean }) => string;
  formatMoneyRange: (minBRL: number, maxBRL: number, unit?: string) => string | undefined;
};

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

const storageKey = "currency_settings";

const defaultCurrencyForLang = (lang: string): CurrencyCode => {
  if (lang === "en") return "USD";
  if (lang === "de") return "EUR";
  if (lang === "es") return "MXN";
  return "BRL";
};

const localeForLang = (lang: string): string => {
  if (lang === "en") return "en-US";
  if (lang === "de") return "de-DE";
  if (lang === "es") return "es-MX";
  return "pt-BR";
};

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useTranslation();

  const [mode, setModeState] = useState<CurrencyMode>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? (JSON.parse(raw) as { mode?: CurrencyMode }) : null;
      return parsed?.mode === "manual" ? "manual" : "auto";
    } catch {
      return "auto";
    }
  });

  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? (JSON.parse(raw) as { currency?: CurrencyCode }) : null;
      const saved = parsed?.currency;
      if (saved === "BRL" || saved === "USD" || saved === "EUR" || saved === "MXN") return saved;
      return defaultCurrencyForLang(lang);
    } catch {
      return defaultCurrencyForLang(lang);
    }
  });

  // Auto mode follows language.
  useEffect(() => {
    if (mode !== "auto") return;
    setCurrencyState(defaultCurrencyForLang(lang));
  }, [lang, mode]);

  // Persist settings.
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ mode, currency }));
    } catch {
      // ignore
    }
  }, [mode, currency]);

  const { data, isLoading } = useQuery<RatesResponse>({
    queryKey: ["fx", "BRL"],
    queryFn: async () => {
      const res = await fetch("/api/rates");
      if (!res.ok) throw new Error("fx fetch failed");
      return (await res.json()) as RatesResponse;
    },
    staleTime: 60 * 60 * 1000, // 1h
    refetchInterval: 60 * 60 * 1000,
    retry: 1,
  });

  const rates: Record<CurrencyCode, number> | null = useMemo(() => {
    const r = data?.rates || null;
    if (!r) return null;
    const USD = typeof r.USD === "number" ? r.USD : null;
    const EUR = typeof r.EUR === "number" ? r.EUR : null;
    const MXN = typeof r.MXN === "number" ? r.MXN : null;
    if (!USD || !EUR || !MXN) return null;
    return { BRL: 1, USD, EUR, MXN };
  }, [data]);

  const convertFromBRL = useMemo(() => {
    return (valueBRL: number) => {
      const v = Number(valueBRL || 0);
      if (!Number.isFinite(v)) return 0;
      if (!rates) return v; // fallback as BRL
      return v * (rates[currency] ?? 1);
    };
  }, [currency, rates]);

  const formatMoney = useMemo(() => {
    return (valueBRL: number, opts?: { includeCode?: boolean }) => {
      const locale = localeForLang(lang);
      const value = convertFromBRL(valueBRL);
      const formatted = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(value);
      return opts?.includeCode ? `${formatted} ${currency}` : formatted;
    };
  }, [convertFromBRL, currency, lang]);

  const formatMoneyRange = useMemo(() => {
    return (minBRL: number, maxBRL: number, unit?: string) => {
      if (!minBRL && !maxBRL) return undefined;
      const a = formatMoney(minBRL);
      const b = formatMoney(maxBRL);
      const unitText = unit ? ` ${unit}` : "";
      return minBRL === maxBRL ? `${b}${unitText}` : `${a} - ${b}${unitText}`;
    };
  }, [formatMoney]);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    setModeState("manual");
  };

  const setMode = (m: CurrencyMode) => {
    setModeState(m);
    if (m === "auto") setCurrencyState(defaultCurrencyForLang(lang));
  };

  const value: CurrencyContextValue = {
    currency,
    mode,
    setCurrency,
    setMode,
    rates,
    isLoadingRates: isLoading,
    convertFromBRL,
    formatMoney,
    formatMoneyRange,
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within a CurrencyProvider");
  return ctx;
};


