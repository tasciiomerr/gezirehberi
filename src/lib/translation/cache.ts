import { createHash } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { TranslationTargetLocale } from "./types";

// Batch/build-time cache, not a runtime cache — translation is triggered by a
// script (scripts/translate-content.ts), not per-request, so cost stays fixed
// regardless of traffic. One JSON file per target locale, keyed by a hash of
// the source Turkish text: unchanged source text is never re-translated even
// if the source data file it lives in is edited elsewhere.
const CACHE_DIR = path.join(process.cwd(), "src", "locales", "generated");

function hashText(text: string): string {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}

function cacheFilePath(locale: TranslationTargetLocale): string {
  return path.join(CACHE_DIR, `${locale}.cache.json`);
}

export async function loadCache(locale: TranslationTargetLocale): Promise<Record<string, string>> {
  try {
    const raw = await readFile(cacheFilePath(locale), "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function saveCache(
  locale: TranslationTargetLocale,
  cache: Record<string, string>
): Promise<void> {
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(cacheFilePath(locale), JSON.stringify(cache, null, 2) + "\n", "utf-8");
}

export function cacheKey(text: string): string {
  return hashText(text);
}

export function getCached(cache: Record<string, string>, text: string): string | undefined {
  return cache[cacheKey(text)];
}

export function setCached(cache: Record<string, string>, text: string, translated: string): void {
  cache[cacheKey(text)] = translated;
}
