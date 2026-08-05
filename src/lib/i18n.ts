import tr from "../locales/tr.json";
import en from "../locales/en.json";
import de from "../locales/de.json";
import ar from "../locales/ar.json";
import ru from "../locales/ru.json";
import type { AccommodationType } from "./types";

export type Locale = "tr" | "en" | "de" | "ar" | "ru";

const dictionaries = { tr, en, de, ar, ru };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || dictionaries.tr;
}

export const SITE_URL = "https://www.yoldefterim.com.tr";
export const LOCALES: Locale[] = ["tr", "en", "de", "ar", "ru"];

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
//
// `contentTranslated` lets a specific page override the locale-wide default —
// used by city pages once real per-city translation data exists in the cache
// (see getTranslatedCity/cityHasTranslation in lib/translation/pipeline.ts):
// a city that has been through the real DeepL/Google pipeline is indexable
// even while the locale as a whole (TRANSLATED_LOCALES) is still noindexed,
// and a city with no cache entry yet stays noindexed even for an otherwise
// "translated" locale. Also used the other direction (report item 83) — a
// page can pass contentTranslated=false to stay noindexed even under "tr" if
// it genuinely has no real content yet (e.g. the empty rehberler list),
// since isLocaleTranslated("tr") alone would otherwise default it to indexed.
export function buildRobots(locale: Locale, contentTranslated?: boolean) {
  const indexable = contentTranslated ?? isLocaleTranslated(locale);
  if (indexable) {
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
//
// `extraLocales` lets a page add locales beyond the site-wide TRANSLATED_LOCALES
// default — used by city pages once a specific city has real per-locale
// translation data (see cityHasTranslation/buildRobots's contentTranslated
// override): its hreflang set should match exactly the locales that are
// actually indexable for that city, never a locale that's still noindexed.
export function buildAlternates(locale: Locale, pathWithoutLocale: string, extraLocales: Locale[] = []) {
  const languages: Record<string, string> = {};
  const allLangs = new Set<Locale>([...TRANSLATED_LOCALES, ...extraLocales]);
  for (const l of allLangs) {
    languages[l] = `${SITE_URL}/${l}${pathWithoutLocale}`;
  }
  languages["x-default"] = `${SITE_URL}/tr${pathWithoutLocale}`;

  return {
    canonical: `${SITE_URL}/${locale}${pathWithoutLocale}`,
    languages,
  };
}

export const OG_LOCALE_MAP: Record<Locale, string> = {
  tr: "tr_TR",
  en: "en_US",
  de: "de_DE",
  ar: "ar_AR",
  ru: "ru_RU",
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
  // Pages that set their own `openGraph` object (as this helper does) stop
  // inheriting the sibling opengraph-image.tsx file convention from Next.js,
  // so the generated branded image has to be referenced explicitly here
  // (report items 275-277 — hakkimizda/iletisim/gizlilik/cerez/bolgeler had
  // no og:image at all before this).
  const image = `${SITE_URL}/${locale}/opengraph-image`;
  return {
    openGraph: {
      type: "website" as const,
      locale: OG_LOCALE_MAP[locale],
      siteName,
      url: `${SITE_URL}/${locale}${pathWithoutLocale}`,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [image],
    },
  };
}

// Fixed, small vocabulary (accommodation type enum → display label) — same
// low-risk category as the cookie banner strings, not per-city data.
const ACCOMMODATION_TYPE_LABELS: Record<AccommodationType, Record<Locale, string>> = {
  hotel: { tr: "Otel", en: "Hotel", de: "Hotel", ar: "فندق", ru: "Отель" },
  guesthouse: { tr: "Pansiyon", en: "Guesthouse", de: "Gästehaus", ar: "بيت ضيافة", ru: "Гостевой дом" },
  boutique: { tr: "Butik Otel", en: "Boutique Hotel", de: "Boutique-Hotel", ar: "فندق بوتيك", ru: "Бутик-отель" },
  resort: { tr: "Resort", en: "Resort", de: "Resort", ar: "منتجع", ru: "Курортный отель" },
};

export function getAccommodationTypeLabel(type: AccommodationType, locale: Locale): string {
  return ACCOMMODATION_TYPE_LABELS[type]?.[locale] ?? type;
}

// Simple dynamic translator helper for data objects to keep it robust and lightweight
export function translateDataText(text: string, locale: Locale): string {
  if (locale === "tr" || !text) return text;

  // Key-value replacements for common terms to make data look translated
  const dict: Record<Locale, Record<string, string>> = {
    tr: {},
    ru: {
      "Gezilecek Yer": "Достопримечательности",
      "Yöresel Yemek": "Местная кухня",
      "Restoran": "Рестораны",
      "Konaklama": "Проживание",
      "Kahvaltı": "Завтрак",
      "Öğle Yemeği": "Обед",
      "Akşam Yemeği": "Ужин",
      "Serbest Zaman": "Свободное время",
      "saat": "часов",
      "gün": "дней",
      "dakika": "мин",
      "₺ Ekonomik": "₺ Бюджетный",
      "₺₺ Orta": "₺₺ Средний",
      "₺₺₺ Üst Segment": "₺₺₺ Премиум",
    },
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
      // Word-boundary match so short keys (e.g. "gün") don't also match inside
      // longer words (e.g. "günlük") — plain \b doesn't work here since \w
      // excludes Turkish/Cyrillic/Arabic letters, so we match against any
      // adjacent Unicode letter instead via lookaround.
      const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`(?<![\\p{L}])${escaped}(?![\\p{L}])`, "giu");
      translated = translated.replace(pattern, val);
    });
  }

  // If description text and target language is not Turkish, we can append a clean subtitle or translate key sentences
  // For a premium feel, let's keep it clean.
  return translated;
}
