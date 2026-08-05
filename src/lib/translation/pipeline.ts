import { getCached, loadCache, saveCache, setCached } from "./cache";
import { deeplProvider } from "./providers/deepl";
import { googleTranslateProvider } from "./providers/googleTranslate";
import type { TranslationProvider, TranslationTargetLocale } from "./types";

// Provider routing decided in report follow-up (Faz 9a): DeepL covers EN/DE/RU,
// Google Cloud Translation covers AR (DeepL has no Arabic support).
const PROVIDER_FOR_LOCALE: Record<TranslationTargetLocale, TranslationProvider> = {
  en: deeplProvider,
  de: deeplProvider,
  ru: deeplProvider,
  ar: googleTranslateProvider,
};

export interface TranslationRunSummary {
  locale: TranslationTargetLocale;
  requested: number;
  cached: number;
  translated: number;
  skippedNoProvider: boolean;
}

// Translates a flat list of Turkish source strings for one target locale,
// using the content-hash cache so unchanged text is never re-sent to the API.
// Returns null (and leaves the cache untouched) if no API key is configured
// yet — callers must treat that as "not ready", not as an error, since keys
// have not arrived at the time this pipeline was built.
export async function translateTexts(
  texts: string[],
  target: TranslationTargetLocale
): Promise<{ translated: string[]; summary: TranslationRunSummary } | null> {
  const provider = PROVIDER_FOR_LOCALE[target];
  if (!provider.isConfigured()) {
    return null;
  }

  const cache = await loadCache(target);
  const result: string[] = new Array(texts.length);
  const toFetch: { index: number; text: string }[] = [];

  texts.forEach((text, index) => {
    const hit = getCached(cache, text);
    if (hit !== undefined) {
      result[index] = hit;
    } else {
      toFetch.push({ index, text });
    }
  });

  let translatedCount = 0;
  if (toFetch.length > 0) {
    const translations = await provider.translateBatch(
      toFetch.map((t) => t.text),
      target
    );
    if (!translations) {
      // Provider reported configured but returned null (e.g. race condition) —
      // treat as not-ready rather than silently losing untranslated entries.
      return null;
    }
    toFetch.forEach((t, i) => {
      result[t.index] = translations[i];
      setCached(cache, t.text, translations[i]);
      translatedCount++;
    });
    await saveCache(target, cache);
  }

  return {
    translated: result,
    summary: {
      locale: target,
      requested: texts.length,
      cached: texts.length - toFetch.length,
      translated: translatedCount,
      skippedNoProvider: false,
    },
  };
}

// Curated-content-only scope (report items 34/167 data-honesty decision): only
// the hand-authored fields on City and its curated attraction/restaurant/
// accommodation/localFood arrays are ever translated. The 500-per-category
// generated filler places (ids containing "-gen-", see src/lib/places.ts)
// are deliberately never passed through this pipeline — translating
// procedurally-generated placeholder text would just be fabricated content
// in a different language.
export const CURATED_CITY_TEXT_FIELDS = [
  "title",
  "summary",
  "longDescription",
  "heroTagline",
  "howToGetThere",
  "whenToGo",
  "climate",
  "whereToStay",
  "budget",
  "transportation",
] as const;

export const CURATED_ITEM_TEXT_FIELDS = ["description", "longDescription", "tips"] as const;

export function isGeneratedFillerId(id: string): boolean {
  return id.includes("-gen-");
}

// Cheap per-page indexability check for buildRobots's `contentTranslated`
// override: a city counts as "really translated" for a locale if its title
// has a cache entry. translateCityCurated() only ever writes to the cache
// after a full successful batch for that city (translateTexts saves once,
// at the end — a mid-batch API failure throws before saveCache runs), so a
// cached title is a reliable proxy for "the rest of this city's curated
// fields are cached too," without re-checking every field on every request.
export async function cityHasTranslation(
  city: Record<string, unknown>,
  locale: TranslationTargetLocale | "tr"
): Promise<boolean> {
  if (locale === "tr") return true;
  const title = city.title;
  if (typeof title !== "string" || !title.trim()) return false;
  const cache = await loadCache(locale);
  return getCached(cache, title) !== undefined;
}

// Bulk variant for sitemap.ts — loads the target locale's cache once instead
// of once per city, then returns the slugs of every city that has actually
// been translated for it. Same title-presence proxy as cityHasTranslation.
export async function getTranslatedCitySlugs(
  target: TranslationTargetLocale,
  cities: { slug: string; title: string }[]
): Promise<Set<string>> {
  const cache = await loadCache(target);
  const slugs = new Set<string>();
  for (const c of cities) {
    if (getCached(cache, c.title) !== undefined) slugs.add(c.slug);
  }
  return slugs;
}

function collectFieldTexts(obj: Record<string, unknown>, fields: readonly string[]): string[] {
  const texts: string[] = [];
  for (const field of fields) {
    const value = obj[field];
    if (typeof value === "string" && value.trim()) {
      texts.push(value);
    } else if (Array.isArray(value)) {
      for (const v of value) {
        if (typeof v === "string" && v.trim()) texts.push(v);
      }
    }
  }
  return texts;
}

// Batch-translates one City's curated (non-generated) text — top-level
// descriptive fields plus attractions/restaurants/accommodations/localFood —
// for a single target locale, and writes everything into that locale's cache
// file. Meant to be run from a one-off script once real API keys exist, never
// at request time. City-level curated arrays only (never the 500-per-category
// generated filler places from src/lib/places.ts).
export async function translateCityCurated(
  city: Record<string, unknown>,
  target: TranslationTargetLocale
): Promise<TranslationRunSummary | null> {
  const texts: string[] = collectFieldTexts(city, CURATED_CITY_TEXT_FIELDS);

  const itemLists = [
    (city.attractions as Record<string, unknown>[]) || [],
    (city.restaurants as Record<string, unknown>[]) || [],
    (city.accommodations as Record<string, unknown>[]) || [],
    (city.localFood as Record<string, unknown>[]) || [],
  ];
  for (const list of itemLists) {
    for (const item of list) {
      texts.push(...collectFieldTexts(item, CURATED_ITEM_TEXT_FIELDS));
    }
  }

  // Dedupe — many attractions share boilerplate phrasing, no need to pay to
  // translate the same string twice within one run (the cache also dedupes
  // across runs, this just avoids padding a single batch).
  const uniqueTexts = Array.from(new Set(texts));
  if (uniqueTexts.length === 0) return null;

  const result = await translateTexts(uniqueTexts, target);
  return result ? result.summary : null;
}

// Render-time helper (cache reads only, never calls a translation API): returns
// a shallow-translated copy of a City for a target locale, using whatever is
// already in that locale's cache file. Fields/items with no cache entry yet
// silently fall back to the original Turkish text rather than throwing.
export async function getTranslatedCity<T extends object>(
  city: T,
  locale: TranslationTargetLocale | "tr"
): Promise<T> {
  if (locale === "tr") return city;

  const cache = await loadCache(locale);
  const translateField = (value: unknown): unknown => {
    if (typeof value === "string" && value.trim()) {
      return getCached(cache, value) ?? value;
    }
    if (Array.isArray(value)) {
      return value.map((v) => (typeof v === "string" ? getCached(cache, v) ?? v : v));
    }
    return value;
  };

  const translateFields = (obj: Record<string, unknown>, fields: readonly string[]): Record<string, unknown> => {
    const clone: Record<string, unknown> = { ...obj };
    for (const field of fields) {
      if (field in obj) clone[field] = translateField(obj[field]);
    }
    return clone;
  };

  const cityRecord = city as unknown as Record<string, unknown>;
  const translated: Record<string, unknown> = translateFields(cityRecord, CURATED_CITY_TEXT_FIELDS);

  for (const key of ["attractions", "restaurants", "accommodations", "localFood"] as const) {
    const list = cityRecord[key];
    if (Array.isArray(list)) {
      translated[key] = list.map((item) => translateFields(item as Record<string, unknown>, CURATED_ITEM_TEXT_FIELDS));
    }
  }

  return translated as unknown as T;
}
