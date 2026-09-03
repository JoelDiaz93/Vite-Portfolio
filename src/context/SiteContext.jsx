import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SiteContext = createContext(null);

const languageFromPath = () => {
  if (typeof window === "undefined") return "en";
  const match = window.location.pathname.match(/^\/(en|es)(?:\/|$)/);
  if (match) return match[1];
  const saved = window.localStorage.getItem("portfolio-language");
  if (saved === "en" || saved === "es") return saved;
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
};

const themeFromPreference = () => {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("portfolio-theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia?.("(prefers-color-scheme: light)")?.matches ? "light" : "dark";
};

export function SiteProvider({ children }) {
  const [theme, setTheme] = useState(themeFromPreference);
  const [language, setLanguage] = useState(languageFromPath);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  const value = useMemo(
    () => ({
      theme,
      language,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
      setTheme,
      setLanguage,
    }),
    [theme, language]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used inside SiteProvider");
  return context;
}
