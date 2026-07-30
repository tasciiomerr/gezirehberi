import { RegionSlug } from "@/lib/types";

export interface RegionTheme {
  primary: string;
  secondary: string;
  accent: string;
  label: string;
}

/**
 * Bölüm 5.1: Her coğrafi bölgeye özel renk kimliği.
 * Bu değişkenler city/region sayfalarında --color-kiremit/--color-deniz/--color-turkuaz
 * üzerine scoped olarak inline style ile bindirilir, global paleti bozmaz.
 */
export const REGION_THEMES: Record<RegionSlug, RegionTheme> = {
  karadeniz: {
    primary: "#1B4D3E",
    secondary: "#0F5257",
    accent: "#6B8F71",
    label: "Derin çam yeşili",
  },
  akdeniz: {
    primary: "#0077B6",
    secondary: "#023E8A",
    accent: "#F4A300",
    label: "Turkuaz ve safir",
  },
  "ic-anadolu": {
    primary: "#C86D51",
    secondary: "#8A4B32",
    accent: "#E4A335",
    label: "Bozkır toprağı",
  },
  ege: {
    primary: "#556B2F",
    secondary: "#20B2AA",
    accent: "#F2E9D8",
    label: "Zeytin ve Ege mavisi",
  },
  "dogu-anadolu": {
    primary: "#5B6470",
    secondary: "#3A4046",
    accent: "#D9A441",
    label: "Karlı zirve ve bazalt",
  },
  "guneydogu-anadolu": {
    primary: "#B85D19",
    secondary: "#8A2B45",
    accent: "#D9A441",
    label: "Mezopotamya bakırı",
  },
  marmara: {
    primary: "#1E293B",
    secondary: "#0F172A",
    accent: "#B33A25",
    label: "Boğaziçi gece mavisi",
  },
};

export function getRegionThemeStyle(regionSlug: RegionSlug): React.CSSProperties {
  const theme = REGION_THEMES[regionSlug];
  if (!theme) return {};
  return {
    ["--color-kiremit" as string]: theme.primary,
    ["--color-deniz" as string]: theme.secondary,
    ["--color-turkuaz" as string]: theme.accent,
  };
}
