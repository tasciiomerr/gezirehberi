import { allCities } from "./cities";
import { getDistanceLinksForCity } from "./distances";
import { guides, type GuideArticle } from "./guides";

// Rota rehberleri ile mesafe sayfaları arasında karşılıklı iç bağlantı
// (2026-11-02). Rehberin relatedCitySlugs listesindeki şehir çiftleri için
// gerçek mesafe sayfaları (distanceCache) bağlanır; mesafe sayfasından da iki
// şehri birden kapsayan rehbere link verilir. Veri dışı çift uydurulmaz.
export interface GuideDistanceLink {
  slug: string;
  label: string;
  distanceKm: number;
}

export function getGuideDistanceLinks(guide: GuideArticle, max = 8): GuideDistanceLink[] {
  const related = new Set(guide.relatedCitySlugs ?? []);
  const seen = new Map<string, GuideDistanceLink>();
  for (const slug of related) {
    const city = allCities.find((c) => c.slug === slug);
    if (!city) continue;
    for (const l of getDistanceLinksForCity(slug)) {
      if (!related.has(l.otherCitySlug) || seen.has(l.slug)) continue;
      seen.set(l.slug, { slug: l.slug, label: `${city.name} ${l.otherCityName} arası kaç km`, distanceKm: l.distanceKm });
    }
  }
  return [...seen.values()].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, max);
}

export function getGuidesCoveringPair(slugA: string, slugB: string): GuideArticle[] {
  // Yalnızca rota odaklı (en fazla 6 şehirli) rehberler; "10 yer" gibi geniş
  // liste rehberleri belirli bir rotaya ait sayılmaz.
  return guides.filter(
    (g) => (g.relatedCitySlugs?.length ?? 99) <= 6 && g.relatedCitySlugs?.includes(slugA) && g.relatedCitySlugs?.includes(slugB)
  );
}
