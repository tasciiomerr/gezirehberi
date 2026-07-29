import { City, RegionSlug } from "@/lib/types";
import { karadenizCities } from "./karadeniz";
import { akdenizCities } from "./akdeniz";
import { egeCities } from "./ege";

export const allCities: City[] = [...karadenizCities, ...akdenizCities, ...egeCities];

export function getCity(regionSlug: string, citySlug: string): City | undefined {
  return allCities.find((c) => c.regionSlug === regionSlug && c.slug === citySlug);
}

export function getCitiesByRegion(regionSlug: string): City[] {
  return allCities.filter((c) => c.regionSlug === regionSlug);
}

export function getCityCount(regionSlug: RegionSlug): number {
  return allCities.filter((c) => c.regionSlug === regionSlug).length;
}

export function getAllCitySlugs(): { region: string; city: string }[] {
  return allCities.map((c) => ({ region: c.regionSlug, city: c.slug }));
}
