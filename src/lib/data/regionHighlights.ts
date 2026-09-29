import type { Attraction, City } from "../types";
import { getCitiesByRegion } from "./cities";
import { getAllDistancePageData, IMPORTANCE_RANK, type DistancePageData } from "./distances";

// Search Console (2026-09-29): bölge sayfaları sıra ~73-77'de; sorgular
// "marmara bölgesi", "güneydoğu anadolu bölgesi tarihi yerler" gibi. Sayfa
// iki cümlelik açıklama + şehir kartlarından ibaretti. Aşağıdakiler bölge
// sayfasına gerçek veriden (şehirlerin curated attraction'ları ve Mapbox
// mesafe cache'i) içerik ve iç link üretir — uydurma metin yok.

export interface RegionAttraction {
  attraction: Attraction;
  city: City;
}

// Önem sırasına göre, şehirler arasında sırayla (round-robin) seçim — tek bir
// büyük şehrin (İstanbul) listeyi tamamen doldurmasını engeller.
export function getRegionTopAttractions(regionSlug: string, limit: number): RegionAttraction[] {
  const queues = getCitiesByRegion(regionSlug).map((city) =>
    [...city.attractions]
      .sort((a, b) => IMPORTANCE_RANK[a.importance] - IMPORTANCE_RANK[b.importance])
      .map((attraction) => ({ attraction, city }))
  );
  const result: RegionAttraction[] = [];
  for (const level of [0, 1, 2]) {
    let added = true;
    while (added && result.length < limit) {
      added = false;
      for (const q of queues) {
        if (result.length >= limit) break;
        if (q.length > 0 && IMPORTANCE_RANK[q[0].attraction.importance] === level) {
          result.push(q.shift()!);
          added = true;
        }
      }
    }
  }
  return result;
}

// İki ucu da bu bölgede olan mesafe sayfaları, kısadan uzuna.
export function getRegionDistances(regionSlug: string, limit: number): DistancePageData[] {
  return getAllDistancePageData()
    .filter((d) => d.cityA.regionSlug === regionSlug && d.cityB.regionSlug === regionSlug)
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
}
