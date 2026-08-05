import type { TranslationProvider, TranslationTargetLocale } from "../types";

// DeepL supports EN/DE/RU but has never supported Arabic — AR is routed to
// Google Cloud Translation instead (see providers/googleTranslate.ts and
// pipeline.ts's PROVIDER_FOR_LOCALE map).
const DEEPL_TARGET_CODE: Partial<Record<TranslationTargetLocale, string>> = {
  en: "EN-US",
  de: "DE",
  ru: "RU",
};

const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";

export const deeplProvider: TranslationProvider = {
  name: "deepl",

  isConfigured() {
    return Boolean(process.env.DEEPL_API_KEY);
  },

  async translateBatch(texts, target) {
    const apiKey = process.env.DEEPL_API_KEY;
    const targetCode = DEEPL_TARGET_CODE[target];
    if (!apiKey || !targetCode || texts.length === 0) return null;

    const res = await fetch(DEEPL_API_URL, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: texts,
        source_lang: "TR",
        target_lang: targetCode,
        tag_handling: "html",
      }),
    });

    if (!res.ok) {
      throw new Error(`DeepL translation failed: ${res.status} ${await res.text()}`);
    }

    const data = (await res.json()) as { translations: { text: string }[] };
    return data.translations.map((t) => t.text);
  },
};
