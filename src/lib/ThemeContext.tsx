"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Tek, paylaşılan tema state'i — önceden Header'da hem masaüstü hem mobil
// nav'da ayrı ayrı ThemeToggle instance'ı vardı, her biri kendi useState'ini
// tutuyordu; ilk mount'ta ikisi farklı anlarda localStorage okuyunca kısa
// süreliğine birbiriyle çelişen ikonlar gösterebiliyorlardı (rapor follow-up).
// Artık tek bir provider durumu tutuyor, her iki toggle da aynı context'i
// okuyor/yazıyor.
type Theme = "light" | "dark";
const THEME_KEY = "yoldefteri_theme";

interface ThemeContextValue {
  theme: Theme;
  mounted: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    const initial =
      stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  };

  return <ThemeContext.Provider value={{ theme, mounted, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
