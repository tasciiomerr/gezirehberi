import tr from "../locales/tr.json";
import en from "../locales/en.json";
import de from "../locales/de.json";
import ar from "../locales/ar.json";

export type Locale = "tr" | "en" | "de" | "ar";

const dictionaries = { tr, en, de, ar };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || dictionaries.tr;
}

export const SITE_URL = "https://www.yoldefterim.com.tr";
export const LOCALES: Locale[] = ["tr", "en", "de", "ar"];

// Only "tr" has real, human-authored content today. The en/de/ar routes exist and
// render, but their long-form content (title, meta description, city/place copy)
// is still raw Turkish text passed through — see report item 283. Until a real
// translation pipeline (report item 105) lands, these locales are temporarily
// noindexed and excluded from hreflang so Google isn't told "this is the English
// version" of a page that isn't actually in English.
const TRANSLATED_LOCALES: Locale[] = ["tr"];

export function isLocaleTranslated(locale: Locale): boolean {
  return TRANSLATED_LOCALES.includes(locale);
}

// robots directive to use in every generateMetadata() — noindex for untranslated
// locales, normal indexing for "tr". Always index/follow reachable so Google can
// still crawl and re-check once real translations ship.
export function buildRobots(locale: Locale) {
  if (isLocaleTranslated(locale)) {
    return {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    };
  }
  return { index: false, follow: true };
}

// Builds canonical + hreflang alternates for a given path (without the locale segment).
// pathWithoutLocale should start with "/" (e.g. "/bolgeler/karadeniz") or be "" for the homepage.
// Only lists translated locales in hreflang — pointing to a noindexed alternate
// would be a contradictory signal (see TRANSLATED_LOCALES above).
export function buildAlternates(locale: Locale, pathWithoutLocale: string) {
  const languages: Record<string, string> = {};
  for (const l of TRANSLATED_LOCALES) {
    languages[l] = `${SITE_URL}/${l}${pathWithoutLocale}`;
  }
  languages["x-default"] = `${SITE_URL}/tr${pathWithoutLocale}`;

  return {
    canonical: `${SITE_URL}/${locale}${pathWithoutLocale}`,
    languages,
  };
}

const OG_LOCALE: Record<Locale, string> = {
  tr: "tr_TR",
  en: "en_US",
  de: "de_DE",
  ar: "ar_AR",
};

// Builds page-specific openGraph.url + twitter tags so inner pages don't silently
// inherit the homepage's og:url/twitter:title from the root layout (see report items 10, 13).
export function buildPageSocialMeta(
  locale: Locale,
  pathWithoutLocale: string,
  title: string,
  description: string
) {
  const siteName = getDictionary(locale).nav.logo;
  return {
    openGraph: {
      type: "website" as const,
      locale: OG_LOCALE[locale],
      siteName,
      url: `${SITE_URL}/${locale}${pathWithoutLocale}`,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
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
