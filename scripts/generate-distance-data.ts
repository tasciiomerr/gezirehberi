// Madde 150 — 50 şehir çifti için GERÇEK Mapbox Directions verisini
// (mesafe/süre/gerçek karayolu adları) tek seferlik çeker ve
// src/lib/data/distanceCache.json'a yazar. Bu, mevcut madde 53-60
// altyapısının (Mapbox Directions API) build-time kullanımı — runtime'daki
// /api/directions route'unun 24 saatlik in-memory cache'i her deploy'da
// sıfırlanıyor ve statik sayfa üretimine uygun değil; bunun yerine burada
// sonuç bir kere hesaplanıp dosyaya yazılıyor (translation cache.ts'teki
// "build-time, commit'li JSON cache" deseniyle birebir aynı yaklaşım).
//
// Çalıştırma: node --env-file=.env.local --import tsx scripts/generate-distance-data.ts
// MAPBOX_ACCESS_TOKEN .env.local'den okunur (gerçek, çalışan bir token
// gerekiyor — sahte/tahmini veri üretilmiyor, API başarısız olursa script
// o çifti atlar ve hangi çiftin eksik kaldığını raporlar).
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { allCities } from "../src/lib/data/cities";
import { distancePairs, distancePairSlug } from "../src/lib/data/distancePairs";

interface DistanceCacheEntry {
  distanceKm: number;
  durationMin: number;
  roadNames: string[];
}

const CACHE_PATH = path.join(process.cwd(), "src", "lib", "data", "distanceCache.json");

async function fetchRoute(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  token: string
): Promise<DistanceCacheEntry | undefined> {
  const coordStr = `${from.lng},${from.lat};${to.lng},${to.lat}`;
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordStr}?access_token=${token}&overview=false&steps=true&geometries=geojson`;

  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) {
    console.error(`  Mapbox API hatası: ${res.status}`);
    return undefined;
  }
  const data = await res.json();
  const route = data.routes?.[0];
  if (!route || !Array.isArray(route.legs) || route.legs.length === 0) {
    console.error(`  Rota bulunamadı`);
    return undefined;
  }

  const leg = route.legs[0];
  const distanceKm = Math.round((route.distance / 1000) * 10) / 10;
  const durationMin = Math.max(1, Math.round(route.duration / 60));

  // Gerçek karayolu isimlerini adımlardan çıkar (madde 150'nin "hangi
  // güzergah üzerinden" isteği — Mapbox'un gerçek step verisi, tahmin değil).
  const roadNames = Array.from(
    new Set(
      (leg.steps || [])
        .map((s: any) => s.name as string)
        .filter((name: string) => name && name.trim().length > 0)
    )
  ) as string[];

  return { distanceKm, durationMin, roadNames };
}

async function main() {
  const token = process.env.MAPBOX_ACCESS_TOKEN;
  if (!token) {
    console.error("MAPBOX_ACCESS_TOKEN bulunamadı (.env.local kontrol et). Durduruldu.");
    process.exit(1);
  }

  // Zaten cache'lenmiş çiftleri atla — genişletme senaryosunda (madde 150/312)
  // sadece yeni eklenen çiftler için gerçek Mapbox isteği yapılıyor, mevcut
  // 50 çiftin verisi tekrar çekilip boşa API çağrısı harcanmıyor.
  let cache: Record<string, DistanceCacheEntry> = {};
  try {
    const existingRaw = await readFile(CACHE_PATH, "utf-8");
    cache = JSON.parse(existingRaw);
    console.log(`Mevcut cache'te ${Object.keys(cache).length} çift bulundu, sadece eksikler çekilecek.\n`);
  } catch {
    // Cache dosyası yok — ilk çalıştırma, sıfırdan başlanıyor.
  }

  const missing: string[] = [];
  const toFetch = distancePairs.filter((pair) => !cache[distancePairSlug(pair)]);
  console.log(`Çekilecek yeni çift sayısı: ${toFetch.length}\n`);

  for (const pair of toFetch) {
    const slug = distancePairSlug(pair);
    const cityA = allCities.find((c) => c.slug === pair.cityA);
    const cityB = allCities.find((c) => c.slug === pair.cityB);
    if (!cityA || !cityB) {
      console.error(`[${slug}] Şehir kaydı bulunamadı (${pair.cityA} / ${pair.cityB}) — atlandı`);
      missing.push(slug);
      continue;
    }

    console.log(`[${slug}] Mapbox'tan çekiliyor...`);
    try {
      const entry = await fetchRoute(cityA.location, cityB.location, token);
      if (entry) {
        cache[slug] = entry;
        console.log(`  -> ${entry.distanceKm} km, ${entry.durationMin} dk, yollar: ${entry.roadNames.join(", ") || "(isimsiz)"}`);
      } else {
        missing.push(slug);
      }
    } catch (err: any) {
      console.error(`  Hata: ${err?.message || err}`);
      missing.push(slug);
    }
    // Mapbox rate limit'e nazik davran — 100 yeni istekte art arda gitmemek için.
    await new Promise((r) => setTimeout(r, 350));
  }

  await writeFile(CACHE_PATH, JSON.stringify(cache, null, 2) + "\n", "utf-8");
  console.log(`\nYazıldı: ${CACHE_PATH}`);
  console.log(`Toplam cache: ${Object.keys(cache).length}/${distancePairs.length}`);
  if (missing.length > 0) {
    console.log(`Eksik kalan çiftler (${missing.length}): ${missing.join(", ")}`);
  }
}

main();
