import { allCities } from "./cities";
import { getDistanceLinksForCity } from "./distances";
import { getAllPlacePairData } from "./placePairs";

// "X'e yakın günübirlik gidilecek yerler" sayfaları (2026-11-02). Search
// Console'da gezi sorguları neredeyse hiç görünmüyor (şehir sayfaları 813
// gösterim, mesafe sayfaları 378 bin); günübirlik gezi, hem arama hacmi olan
// hem de elimizdeki GERÇEK yol verisiyle (km/süre) cevaplanabilen bir niyet.
// Satırlar mevcut mesafe çiftlerinden gelir; olmayan çift uydurulmaz.
export const DAY_TRIP_MAX_MIN = 180;
export const DAY_TRIP_MIN_STOPS = 4;

export interface DayTripStop {
  kind: "city" | "place";
  name: string;
  distanceKm: number;
  durationMin: number;
  pairSlug: string;
  href: string; // locale'siz yol
  attractions: string[];
  note: string;
}

export function getDayTrips(citySlug: string): { city: (typeof allCities)[number]; stops: DayTripStop[] } | undefined {
  const city = allCities.find((c) => c.slug === citySlug);
  if (!city) return undefined;
  const stops: DayTripStop[] = [];
  for (const l of getDistanceLinksForCity(citySlug)) {
    if (l.durationMin > DAY_TRIP_MAX_MIN) continue;
    const other = allCities.find((c) => c.slug === l.otherCitySlug);
    stops.push({
      kind: "city",
      name: l.otherCityName,
      distanceKm: l.distanceKm,
      durationMin: l.durationMin,
      pairSlug: l.slug,
      href: `/bolgeler/${l.otherRegionSlug}/${l.otherCitySlug}`,
      attractions: l.otherTopAttractions,
      note: other ? other.whenToGo : "",
    });
  }
  for (const d of getAllPlacePairData()) {
    if (d.city.slug !== citySlug || d.durationMin > DAY_TRIP_MAX_MIN) continue;
    stops.push({
      kind: "place",
      name: d.place.name,
      distanceKm: d.distanceKm,
      durationMin: d.durationMin,
      pairSlug: d.slug,
      href: d.place.href,
      attractions: [],
      note: d.place.summary ?? "",
    });
  }
  stops.sort((a, b) => a.durationMin - b.durationMin);
  return { city, stops };
}

export function getDayTripSlugs(): string[] {
  return allCities.map((c) => c.slug).filter((s) => (getDayTrips(s)?.stops.length ?? 0) >= DAY_TRIP_MIN_STOPS);
}
