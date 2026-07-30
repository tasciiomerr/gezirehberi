import { City, RegionSlug } from "@/lib/types";
import { karadenizCities } from "./karadeniz";
import { karadenizExtraCities } from "./karadeniz-extra";
import { karadenizExtra2Cities } from "./karadeniz-extra2";
import { karadenizExtra3Cities } from "./karadeniz-extra3";
import { karadenizExtra4Cities } from "./karadeniz-extra4";
import { karadenizExtra5Cities } from "./karadeniz-extra5";
import { karadenizExtra6Cities } from "./karadeniz-extra6";
import { akdenizCities } from "./akdeniz";
import { akdenizExtraCities } from "./akdeniz-extra";
import { akdenizExtra2Cities } from "./akdeniz-extra2";
import { egeCities } from "./ege";
import { egeExtraCities } from "./ege-extra";
import { egeExtra2Cities } from "./ege-extra2";
import { egeExtra3Cities } from "./ege-extra3";
import { marmaraCities } from "./marmara";
import { marmaraExtra2Cities } from "./marmara-extra2";
import { marmaraExtra3Cities } from "./marmara-extra3";
import { marmaraExtra4Cities } from "./marmara-extra4";
import { icAnadoluCities } from "./ic-anadolu";
import { icAnadoluExtraCities } from "./ic-anadolu-extra";
import { icAnadoluExtra2Cities } from "./ic-anadolu-extra2";
import { icAnadoluExtra3Cities } from "./ic-anadolu-extra3";
import { doguAnadoluCities } from "./dogu-anadolu";
import { doguAnadoluExtraCities } from "./dogu-anadolu-extra";
import { doguAnadoluExtra2Cities } from "./dogu-anadolu-extra2";
import { doguAnadoluExtra3Cities } from "./dogu-anadolu-extra3";
import { guneydoguAnadoluCities } from "./guneydogu-anadolu";
import { guneydoguAnadoluExtraCities } from "./guneydogu-anadolu-extra";
import { guneydoguAnadoluExtra2Cities } from "./guneydogu-anadolu-extra2";

export const allCities: City[] = [
  ...karadenizCities,
  ...karadenizExtraCities,
  ...karadenizExtra2Cities,
  ...karadenizExtra3Cities,
  ...karadenizExtra4Cities,
  ...karadenizExtra5Cities,
  ...karadenizExtra6Cities,
  ...akdenizCities,
  ...akdenizExtraCities,
  ...akdenizExtra2Cities,
  ...egeCities,
  ...egeExtraCities,
  ...egeExtra2Cities,
  ...egeExtra3Cities,
  ...marmaraCities,
  ...marmaraExtra2Cities,
  ...marmaraExtra3Cities,
  ...marmaraExtra4Cities,
  ...icAnadoluCities,
  ...icAnadoluExtraCities,
  ...icAnadoluExtra2Cities,
  ...icAnadoluExtra3Cities,
  ...doguAnadoluCities,
  ...doguAnadoluExtraCities,
  ...doguAnadoluExtra2Cities,
  ...doguAnadoluExtra3Cities,
  ...guneydoguAnadoluCities,
  ...guneydoguAnadoluExtraCities,
  ...guneydoguAnadoluExtra2Cities,
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
