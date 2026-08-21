import distanceCacheRaw from "./distanceCache.json";
import { allCities } from "./cities";
import { distancePairs, distancePairSlug, type DistancePair } from "./distancePairs";
import type { City } from "../types";
import type { Locale } from "../i18n";

export interface DistanceCacheEntry {
  distanceKm: number;
  durationMin: number;
  roadNames: string[];
}

const distanceCache = distanceCacheRaw as Record<string, DistanceCacheEntry>;

export interface DistancePageData {
  slug: string;
  cityA: City;
  cityB: City;
  distanceKm: number;
  durationMin: number;
  majorRoads: string[];
}

// Ham step isimleri arasından ("Tevkifhane Sokağı" gibi lokal sokaklar dahil)
// gerçekten güzergahı tanımlayan ana yolları seçiyor — otoyol/karayolu/yol/
// bulvar/D-numarası içerenler. Sokak/cadde isimleri (şehir içi başlangıç-
// bitiş noktaları) dışarıda bırakılıyor, "hangi güzergah üzerinden" sorusuna
// gerçekten cevap veren kısım bu.
function extractMajorRoads(roadNames: string[]): string[] {
  const majorPattern = /otoyol|karayolu|çevre ?yolu| yolu|bulvar|^D\d/i;
  return roadNames.filter((n) => majorPattern.test(n)).slice(0, 5);
}

export function getAllDistancePairSlugs(): string[] {
  return distancePairs.map(distancePairSlug);
}

export function getDistancePageData(slug: string): DistancePageData | undefined {
  const pair: DistancePair | undefined = distancePairs.find((p) => distancePairSlug(p) === slug);
  if (!pair) return undefined;

  const cityA = allCities.find((c) => c.slug === pair.cityA);
  const cityB = allCities.find((c) => c.slug === pair.cityB);
  if (!cityA || !cityB) return undefined;

  const entry = distanceCache[slug];
  if (!entry) return undefined; // Gerçek Mapbox verisi yoksa sayfa hiç üretilmez — uydurma yok.

  return {
    slug,
    cityA,
    cityB,
    distanceKm: entry.distanceKm,
    durationMin: entry.durationMin,
    majorRoads: extractMajorRoads(entry.roadNames),
  };
}

export function getAllDistancePageData(): DistancePageData[] {
  return getAllDistancePairSlugs()
    .map(getDistancePageData)
    .filter((d): d is DistancePageData => Boolean(d));
}

function formatDuration(minutes: number, locale: Locale): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (locale === "tr") {
    if (h === 0) return `${m} dakika`;
    if (m === 0) return `${h} saat`;
    return `${h} saat ${m} dakika`;
  }
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
}

// Şablon + gerçek veri harmanı — 150-200 kelimelik, sayfaya özel açıklama.
// Sabit kalıp kısmı asgari, değişen kısım her iki şehrin GERÇEK curated
// alanlarından (summary/highlights/howToArrive) ve gerçek Mapbox verisinden
// (mesafe/süre/yol adları) geliyor. Hiçbir sayı/coğrafi iddia uydurma değil.
export function buildDistanceDescription(data: DistancePageData, locale: Locale): string {
  const { cityA, cityB, distanceKm, durationMin, majorRoads } = data;
  const durationText = formatDuration(durationMin, locale);
  const sameRegion = cityA.regionSlug === cityB.regionSlug;

  if (locale !== "tr") {
    // Bu içerik tipi ilk etapta TR-only (çeviri altyapısı henüz yok, DeepL
    // kotası tükendi) — İngilizce/diğer dillerde kısa, gerçek verilerden
    // oluşan minimal bir özet gösteriliyor, tam editöryel metin değil.
    const roadsText = majorRoads.length > 0 ? ` via ${majorRoads.slice(0, 2).join(" and ")}` : "";
    return `${cityA.name} and ${cityB.name} are approximately ${distanceKm} km apart, a drive of about ${durationText}${roadsText}.`;
  }

  const roadsSentence =
    majorRoads.length > 0
      ? `Güzergahın büyük bölümü ${majorRoads.slice(0, 3).join(", ")} üzerinden geçiyor.`
      : "";

  const regionSentence = sameRegion
    ? `${cityA.name} ve ${cityB.name}, ikisi de ${cityA.region} bölgesinde yer alıyor — bu, aynı gezi rotası içinde birbirine yakın iki durak olarak planlanabileceği anlamına geliyor.`
    : `${cityA.name}, ${cityA.region} bölgesinde; ${cityB.name} ise ${cityB.region} bölgesinde yer alıyor, yani bu güzergah iki farklı bölgeyi birbirine bağlıyor.`;

  // Her iki şehrin gerçek curated summary'si — sayfaya özel, en uzun/en
  // bilgilendirici gerçek metin kaynağı, kelime sayısını organik olarak
  // artırıyor (uydurma cümle eklemek yerine zaten var olan veriyi kullanmak).
  const summarySentence = `${cityA.name}, ${cityA.summary}. ${cityB.name} ise ${cityB.summary}.`;

  const arrivalA = cityA.howToArrive.byAir || cityA.howToArrive.byBus || cityA.howToArrive.byCar;
  const arrivalB = cityB.howToArrive.byAir || cityB.howToArrive.byBus || cityB.howToArrive.byCar;
  const arrivalSentence =
    arrivalA || arrivalB
      ? [
          arrivalA ? `${cityA.name} tarafında ulaşım: ${arrivalA}.` : null,
          arrivalB ? `${cityB.name} tarafında ulaşım: ${arrivalB}.` : null,
        ]
          .filter(Boolean)
          .join(" ")
      : "";

  const highlightsA = cityA.highlights.slice(0, 3).join(", ");
  const highlightsB = cityB.highlights.slice(0, 3).join(", ");
  const highlightsSentence =
    highlightsA || highlightsB
      ? `Yol boyunca planlarken aklında bulunsun: ${cityA.name} denince akla ${highlightsA || cityA.summary} geliyor; ${cityB.name} denince ise ${highlightsB || cityB.summary} öne çıkıyor.`
      : "";

  const whenToGoSentence = `${cityA.name} için en iyi ziyaret zamanı: ${cityA.whenToGo}. ${cityB.name} için ise: ${cityB.whenToGo}.`;
  const climateSentence = `İklim açısından ${cityA.name}: ${cityA.climate}. ${cityB.name}: ${cityB.climate}.`;
  const durationRecommendationSentence = `Gezi süresi olarak ${cityA.name} için ${cityA.bestDuration}, ${cityB.name} için ise ${cityB.bestDuration} önerilir.`;

  // Çekirdek cümleler (mesafe, güzergah, bölge, summary, ulaşım, highlights)
  // her zaman ekleniyor. whenToGo/climate/süre önerisi ise sadece hedef
  // 150-200 kelime aralığına ulaşmak için gerektiği kadar ekleniyor — bazı
  // şehirlerin curated metinleri (özellikle küçük illerin) kısa olduğu için
  // hepsini her zaman eklemek bazı sayfaları 200'ün üstüne taşıyordu.
  const core = [
    `${cityA.name} ile ${cityB.name} arası karayoluyla yaklaşık ${distanceKm} km, ortalama sürüş süresi ise ${durationText} civarında.`,
    roadsSentence,
    regionSentence,
    summarySentence,
    arrivalSentence,
    highlightsSentence,
  ].filter((s) => s && s.trim().length > 0);

  const fillers = [whenToGoSentence, climateSentence, durationRecommendationSentence];

  const countWords = (parts: string[]) => parts.join(" ").split(/\s+/).filter(Boolean).length;

  const result = [...core];
  for (const filler of fillers) {
    if (countWords(result) >= 175) break;
    result.push(filler);
  }

  return result.join(" ");
}
