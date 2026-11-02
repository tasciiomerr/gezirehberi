import { allCities } from "./cities";
import { getDistanceLinksForCity } from "./distances";
import { guides, type GuideArticle } from "./guides";

// "Sıradaki Rota Önerisi" (2026-11-02): kullanıcıyı sayfada tutmak için şehirden
// en yakın aynı bölge durağına, rehberden en çok şehir paylaşan diğer rota
// rehberine yönlendirme. Hepsi mevcut gerçek mesafe ve rehber verisinden.
export interface NextCityRoute {
  name: string;
  slug: string;
  regionSlug: string;
  pairSlug: string;
  km: number;
  min: number;
  top: string[];
}

export function getNextCityRoutes(citySlug: string, max = 3): NextCityRoute[] {
  const city = allCities.find((c) => c.slug === citySlug);
  if (!city) return [];
  const links = getDistanceLinksForCity(citySlug).filter((l) => l.durationMin <= 240);
  const sameRegion = links.filter((l) => l.otherRegionSlug === city.regionSlug);
  const picked = (sameRegion.length >= max ? sameRegion : [...sameRegion, ...links.filter((l) => l.otherRegionSlug !== city.regionSlug)]).slice(0, max);
  return picked.map((l) => ({
    name: l.otherCityName,
    slug: l.otherCitySlug,
    regionSlug: l.otherRegionSlug,
    pairSlug: l.slug,
    km: Math.round(l.distanceKm),
    min: l.durationMin,
    top: l.otherTopAttractions.slice(0, 3),
  }));
}

const isRouteGuide = (g: GuideArticle) => (g.relatedCitySlugs?.length ?? 99) <= 6;

export function getNextGuideRoutes(guide: GuideArticle, max = 3): GuideArticle[] {
  const mine = new Set(guide.relatedCitySlugs ?? []);
  return guides
    .filter((g) => g.slug !== guide.slug && isRouteGuide(g))
    .map((g) => ({ g, score: (g.relatedCitySlugs ?? []).filter((s) => mine.has(s)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (a.g.publishedAt < b.g.publishedAt ? 1 : -1))
    .slice(0, max)
    .map((x) => x.g);
}

export function getRouteGuidesForCity(citySlug: string, max = 3): GuideArticle[] {
  return guides.filter((g) => g.relatedCitySlugs?.includes(citySlug) && isRouteGuide(g)).slice(0, max);
}
