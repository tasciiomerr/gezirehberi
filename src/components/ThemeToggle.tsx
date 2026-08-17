"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

export default function ThemeToggle() {
  const { theme, mounted, toggle } = useTheme();

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
