import type { TranslationProvider, TranslationTargetLocale } from "../types";

// Used for Arabic, which DeepL does not support. Also serves as the fallback
// for en/de/ru if DeepL's Russian coverage or key setup ever changes.
const GOOGLE_TARGET_CODE: Record<TranslationTargetLocale, string> = {
  en: "en",
  de: "de",
  ru: "ru",
  ar: "ar",
};

const GOOGLE_API_URL = "https://translation.googleapis.com/language/translate/v2";

export const googleTranslateProvider: TranslationProvider = {
  name: "google-cloud-translation",

  isConfigured() {
    return Boolean(process.env.GOOGLE_TRANSLATE_API_KEY);
  },

  async translateBatch(texts, target) {
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    if (!apiKey || texts.length === 0) return null;

    const res = await fetch(`${GOOGLE_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: texts,
        source: "tr",
        target: GOOGLE_TARGET_CODE[target],
        format: "html",
      }),
    });

    if (!res.ok) {
      throw new Error(`Google Cloud Translation failed: ${res.status} ${await res.text()}`);
    }

    const data = (await res.json()) as {
      data: { translations: { translatedText: string }[] };
    };
    return data.data.translations.map((t) => t.translatedText);
  },
};
