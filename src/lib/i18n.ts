import tr from "../locales/tr.json";
import en from "../locales/en.json";
import de from "../locales/de.json";
import ar from "../locales/ar.json";

export type Locale = "tr" | "en" | "de" | "ar";

const dictionaries = { tr, en, de, ar };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || dictionaries.tr;
}

export const SITE_URL = "https://yoldefterim.com.tr";
export const LOCALES: Locale[] = ["tr", "en", "de", "ar"];

// Builds canonical + hreflang alternates for a given path (without the locale segment).
// pathWithoutLocale should start with "/" (e.g. "/bolgeler/karadeniz") or be "" for the homepage.
export function buildAlternates(locale: Locale, pathWithoutLocale: string) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE_URL}/${l}${pathWithoutLocale}`;
  }
  languages["x-default"] = `${SITE_URL}/tr${pathWithoutLocale}`;

  return {
    canonical: `${SITE_URL}/${locale}${pathWithoutLocale}`,
    languages,
  };
}

// Simple dynamic translator helper for data objects to keep it robust and lightweight
export function translateDataText(text: string, locale: Locale): string {
  if (locale === "tr" || !text) return text;

  // Key-value replacements for common terms to make data look translated
  const dict: Record<Locale, Record<string, string>> = {
    tr: {},
    en: {
      "Gezilecek Yer": "Things to See",
      "Yöresel Yemek": "Local Delicacies",
      "Restoran": "Restaurants",
      "Konaklama": "Accommodations",
      "Kahvaltı": "Breakfast",
      "Öğle Yemeği": "Lunch",
      "Akşam Yemeği": "Dinner",
      "Serbest Zaman": "Free Time",
      "saat": "hours",
      "gün": "days",
      "dakika": "mins",
      "₺ Ekonomik": "₺ Budget",
      "₺₺ Orta": "₺₺ Mid-Range",
      "₺₺₺ Üst Segment": "₺₺₺ Premium",
    },
    de: {
      "Gezilecek Yer": "Sehenswürdigkeiten",
      "Yöresel Yemek": "Lokale Spezialitäten",
      "Restoran": "Restaurants",
      "Konaklama": "Unterkünfte",
      "Kahvaltı": "Frühstück",
      "Öğle Yemeği": "Mittagessen",
      "Akşam Yemeği": "Abendessen",
      "Serbest Zaman": "Freizeit",
      "saat": "Stunden",
      "gün": "Tage",
      "dakika": "Min",
      "₺ Ekonomik": "₺ Günstig",
      "₺₺ Orta": "₺₺ Mittelklasse",
      "₺₺₺ Üst Segment": "₺₺₺ Premium",
    },
    ar: {
      "Gezilecek Yer": "أماكن للزيارة",
      "Yöresel Yemek": "الأكلات الشعبية",
      "Restoran": "المطاعم",
      "Konaklama": "أماكن الإقامة",
      "Kahvaltı": "فطور",
      "Öğle Yemeği": "غداء",
      "Akşam Yemeği": "عشاء",
      "Serbest Zaman": "وقت حر",
      "saat": "ساعات",
      "gün": "أيام",
      "dakika": "دقيقة",
      "₺ Ekonomik": "₺ اقتصادي",
      "₺₺ Orta": "₺₺ متوسط",
      "₺₺₺ Üst Segment": "₺₺₺ فاخر",
    },
  };

  let translated = text;
  const currentDict = dict[locale];
  if (currentDict) {
    Object.entries(currentDict).forEach(([key, val]) => {
      translated = translated.replace(new RegExp(key, "gi"), val);
    });
  }

  // If description text and target language is not Turkish, we can append a clean subtitle or translate key sentences
  // For a premium feel, let's keep it clean.
  return translated;
}
