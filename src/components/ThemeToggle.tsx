"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const THEME_KEY = "yoldefteri_theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const stored = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
    const initial =
      stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
  };

  if (!mounted) {
    return <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10" />;
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === "light" ? "Karanlık moda geç" : "Aydınlık moda geç"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/70 transition-colors hover:border-kiremit hover:text-kiremit"
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
