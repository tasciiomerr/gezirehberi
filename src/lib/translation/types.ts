import type { Locale } from "@/lib/i18n";

export type TranslationTargetLocale = Exclude<Locale, "tr">;

export interface TranslationProvider {
  readonly name: string;
  // Returns null (not a thrown error) when the provider has no key configured,
  // so callers can no-op gracefully instead of crashing a build.
  isConfigured(): boolean;
  translateBatch(texts: string[], target: TranslationTargetLocale): Promise<string[] | null>;
}
