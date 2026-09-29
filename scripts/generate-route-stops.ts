// Search Console (2026-09-29): mesafe sayfaları gösterimlerin %97'sini alıyor
// ama "X Y arası kaç km" sorgusunu Google kendi kutusunda cevapladığı için
// neredeyse hiç tıklanmıyor. Sorgularda "aksaray peri bacaları", "sümela
// manastırı gümüşhane", "burdur ısparta havalimanı" gibi yol üstü yer
// aramaları da var — Google'ın kutusunun veremediği bilgi bu.
//
// Bu script her mesafe çifti için GERÇEK Mapbox güzergah çizgisini çekip
// (kuş uçuşu tahmin değil — düz çizgi Bodrum-Fethiye'ye Marmaris'i, Gaziantep-
// Mardin'e Adıyaman'ı "yol üstü" diye koyuyordu, ikisi de yanlış) çizgiye
// gerçekten yakın şehirleri ve gezilecek yerleri hesaplar, sonucu
// src/lib/data/routeStops.json'a yazar. Geometrinin kendisi saklanmıyor
// (sayfada kullanılmıyor, JSON'u şişirirdi) — sadece hesaplanan sonuç.
//
// Çalıştırma: node --env-file=.env.local --import tsx scripts/generate-route-stops.ts
// Her çalıştırmada tüm çiftler yeniden hesaplanır (şehir/yer verisi
// değişince sonuç da değişmeli); Mapbox'tan başarısız dönen çift atlanır ve
// raporlanır, uydurma sonuç yazılmaz.
import { writeFile } from "fs/promises";
import path from "path";
import { allCities } from "../src/lib/data/cities";
import { distancePairs, distancePairSlug } from "../src/lib/data/distancePairs";
import type { GeoPoint } from "../src/lib/types";

// Şehir merkezi güzergaha bu kadar yakınsa "yol üstü" sayılıyor — çevre yolu
// şehir merkezinin birkaç km dışından geçebildiği için 0 değil. 12 km, gerçek
// rotalarda çevre yolundan geçilen Şanlıurfa/Afyon/Bursa'yı (~9-10 km) alıp
// rotanın gerçekten uğramadığı Manisa/Uşak/Isparta'yı (15-17 km) dışarıda
// bırakan eşik (2026-09-29 tanı çalıştırması).
const CITY_MAX_OFFSET_KM = 12;
// Başka bir şehre ait gezilecek yer, yoldan en fazla bu kadar sapmayla
// görülebiliyorsa "yol üstünde görülecek yer" sayılıyor.
const ATTRACTION_MAX_OFFSET_KM = 10;
// Başlangıç/varış şehrinin hemen dibindeki noktalar ara durak değil.
const ENDPOINT_MARGIN_KM = 25;

export interface RouteStopCity {
  slug: string;
  kmFromA: number;
}
export interface RouteStopAttraction {
  citySlug: string;
  attractionId: string;
  kmFromA: number;
  offsetKm: number;
}
export interface RouteStops {
  cities: RouteStopCity[];
  attractions: RouteStopAttraction[];
}

const OUT_PATH = path.join(process.cwd(), "src", "lib", "data", "routeStops.json");

// Kısa mesafelerde yeterince doğru, hızlı düzlem yaklaşımı (equirectangular).
function toXY(p: GeoPoint, lat0: number): [number, number] {
  const kx = 111.32 * Math.cos((lat0 * Math.PI) / 180);
  return [p.lng * kx, p.lat * 110.574];
}

// Noktanın polyline'a en yakın mesafesi ve o noktanın rota başından
// itibaren yol boyunca kaçıncı km'de olduğu.
function projectOnRoute(point: GeoPoint, line: GeoPoint[]): { offsetKm: number; alongKm: number } {
  const lat0 = point.lat;
  const [px, py] = toXY(point, lat0);
  let best = { offsetKm: Infinity, alongKm: 0 };
  let cumulative = 0;
  for (let i = 0; i < line.length - 1; i++) {
    const [ax, ay] = toXY(line[i], lat0);
    const [bx, by] = toXY(line[i + 1], lat0);
    const dx = bx - ax;
    const dy = by - ay;
    const segLen = Math.hypot(dx, dy);
    const t = segLen === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (segLen * segLen)));
    const d = Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
    if (d < best.offsetKm) best = { offsetKm: d, alongKm: cumulative + t * segLen };
    cumulative += segLen;
  }
  return best;
}

async function fetchGeometry(from: GeoPoint, to: GeoPoint, token: string): Promise<{ line: GeoPoint[]; lengthKm: number } | undefined> {
  const coordStr = `${from.lng},${from.lat};${to.lng},${to.lat}`;
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordStr}?access_token=${token}&overview=full&geometries=geojson`;
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) {
    console.error(`  Mapbox API hatası: ${res.status}`);
    return undefined;
  }
  const data = await res.json();
  const route = data.routes?.[0];
  const coords: [number, number][] | undefined = route?.geometry?.coordinates;
  if (!coords || coords.length < 2) return undefined;
  return { line: coords.map(([lng, lat]) => ({ lat, lng })), lengthKm: route.distance / 1000 };
}

async function main() {
  const token = process.env.MAPBOX_ACCESS_TOKEN;
  if (!token) {
    console.error("MAPBOX_ACCESS_TOKEN bulunamadı (.env.local kontrol et). Durduruldu.");
    process.exit(1);
  }

  const result: Record<string, RouteStops> = {};
  const missing: string[] = [];

  for (const pair of distancePairs) {
    const slug = distancePairSlug(pair);
    // Yön, sayfanın kullandığı pair.cityA → pair.cityB ile aynı olmalı
    // ("A'dan X km" değerleri sayfada cityA'ya göre gösteriliyor).
    const cityA = allCities.find((c) => c.slug === pair.cityA);
    const cityB = allCities.find((c) => c.slug === pair.cityB);
    if (!cityA || !cityB) {
      missing.push(slug);
      continue;
    }

    let geo;
    try {
      geo = await fetchGeometry(cityA.location, cityB.location, token);
    } catch (err) {
      console.error(`[${slug}] Hata: ${err instanceof Error ? err.message : err}`);
    }
    if (!geo) {
      missing.push(slug);
      continue;
    }
    // Polyline uzunluğu (düzlem yaklaşımı) ile Mapbox'ın km'si arasındaki
    // küçük farkı, "A'dan X km" değerlerini gerçek yol km'sine oturtmak için
    // ölçekleyerek gideriyoruz.
    const polyLen = projectOnRoute(cityB.location, geo.line).alongKm || geo.lengthKm;
    const scale = geo.lengthKm / polyLen;
    const inMiddle = (km: number) => km > ENDPOINT_MARGIN_KM && km < geo.lengthKm - ENDPOINT_MARGIN_KM;

    const cities: RouteStopCity[] = allCities
      .filter((c) => c.slug !== cityA.slug && c.slug !== cityB.slug)
      .map((c) => {
        const p = projectOnRoute(c.location, geo.line);
        return { slug: c.slug, kmFromA: Math.round(p.alongKm * scale), offsetKm: p.offsetKm };
      })
      .filter((c) => c.offsetKm <= CITY_MAX_OFFSET_KM && inMiddle(c.kmFromA))
      .sort((x, y) => x.kmFromA - y.kmFromA)
      .map(({ slug, kmFromA }) => ({ slug, kmFromA }));

    const attractions: RouteStopAttraction[] = allCities
      .filter((c) => c.slug !== cityA.slug && c.slug !== cityB.slug)
      .flatMap((c) =>
        c.attractions.map((a) => {
          const p = projectOnRoute(a.location, geo.line);
          return {
            citySlug: c.slug,
            attractionId: a.id,
            kmFromA: Math.round(p.alongKm * scale),
            offsetKm: Math.round(p.offsetKm * 10) / 10,
          };
        })
      )
      .filter((a) => a.offsetKm <= ATTRACTION_MAX_OFFSET_KM && inMiddle(a.kmFromA))
      .sort((x, y) => x.kmFromA - y.kmFromA);

    result[slug] = { cities, attractions };
    console.log(
      `[${slug}] ${cities.map((c) => `${c.slug}@${c.kmFromA}`).join(", ") || "-"} | ${attractions.length} yer`
    );
    await new Promise((r) => setTimeout(r, 300));
  }

  await writeFile(OUT_PATH, JSON.stringify(result, null, 2) + "\n", "utf-8");
  console.log(`\nYazıldı: ${OUT_PATH} (${Object.keys(result).length}/${distancePairs.length})`);
  if (missing.length > 0) console.log(`Eksik kalan çiftler (${missing.length}): ${missing.join(", ")}`);
}

main();
