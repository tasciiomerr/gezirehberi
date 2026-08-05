// One-off trigger script — never runs at request time. Usage:
//   node --env-file=.env.local --import tsx scripts/translate-content.ts <citySlug> [citySlug...]
// Translates each city's curated (non-generated) content into every
// TranslationTargetLocale whose provider is configured (has an API key in
// .env.local), and writes results into src/locales/generated/<locale>.cache.json.
import { allCities } from "../src/lib/data/cities";
import { translateCityCurated } from "../src/lib/translation/pipeline";
import type { TranslationTargetLocale } from "../src/lib/translation/types";

const ALL_TARGETS: TranslationTargetLocale[] = ["en", "de", "ru", "ar"];

async function main() {
  const slugs = process.argv.slice(2);
  if (slugs.length === 0) {
    console.error("Usage: npx tsx scripts/translate-content.ts <citySlug> [citySlug...]");
    process.exit(1);
  }

  for (const slug of slugs) {
    const city = allCities.find((c) => c.slug === slug);
    if (!city) {
      console.warn(`Skipping unknown city slug: ${slug}`);
      continue;
    }

    for (const target of ALL_TARGETS) {
      const summary = await translateCityCurated(city as unknown as Record<string, unknown>, target);
      if (summary === null) {
        console.log(`[${slug}] ${target}: skipped (no API key configured yet)`);
      } else {
        console.log(
          `[${slug}] ${target}: ${summary.translated} translated, ${summary.cached} from cache (of ${summary.requested} total strings)`
        );
      }
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
