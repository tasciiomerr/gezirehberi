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

// Çeviri sağlayıcıları bazen HTML varlıklarıyla ("&#x27;", "&quot;") döndürür;
// metin düz metin olarak render edildiği için sayfada "It&#x27;s" görünüyordu
// (2026-11-02 denetimi: en.cache.json'da 305 yer). Okurken güvenle çözülür.
const ENTITIES: Record<string, string> = { "&#x27;": "'", "&#39;": "'", "&quot;": '"', "&amp;": "&", "&lt;": "<", "&gt;": ">" };
function decodeEntities(text: string): string {
  return text.replace(/&(?:#x27|#39|quot|amp|lt|gt);/g, (m) => ENTITIES[m] ?? m);
}

export async function loadCache(locale: TranslationTargetLocale): Promise<Record<string, string>> {
  try {
    const raw = await readFile(cacheFilePath(locale), "utf-8");
    const parsed = JSON.parse(raw) as Record<string, string>;
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed)) out[k] = typeof v === "string" ? decodeEntities(v) : v;
    return out;
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
