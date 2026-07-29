import { City, RegionSlug } from "@/lib/types";
import { karadenizCities } from "./karadeniz";
import { karadenizExtraCities } from "./karadeniz-extra";
import { akdenizCities } from "./akdeniz";
import { akdenizExtraCities } from "./akdeniz-extra";
import { egeCities } from "./ege";
import { egeExtraCities } from "./ege-extra";
import { marmaraCities } from "./marmara";
import { marmaraExtraCities } from "./marmara-extra";
import { icAnadoluCities } from "./ic-anadolu";
import { icAnadoluExtraCities } from "./ic-anadolu-extra";
import { doguAnadoluCities } from "./dogu-anadolu";
import { doguAnadoluExtraCities } from "./dogu-anadolu-extra";
import { guneydoguAnadoluCities } from "./guneydogu-anadolu";
import { guneydoguAnadoluExtraCities } from "./guneydogu-anadolu-extra";

export const allCities: City[] = [
  ...karadenizCities,
  ...karadenizExtraCities,
  ...akdenizCities,
  ...akdenizExtraCities,
  ...egeCities,
  ...egeExtraCities,
  ...marmaraCities,
  ...marmaraExtraCities,
  ...icAnadoluCities,
  ...icAnadoluExtraCities,
  ...doguAnadoluCities,
  ...doguAnadoluExtraCities,
  ...guneydoguAnadoluCities,
  ...guneydoguAnadoluExtraCities,
];

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
