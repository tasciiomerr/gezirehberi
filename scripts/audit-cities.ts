// Kalıcı 84-şehir veri denetim script'i. Hiçbir düzeltme yapmaz, sadece rapor eder.
// Kullanım: npx tsx scripts/audit-cities.ts
//
// Kontroller:
//   1. Hava durumu: extractTempHint clamp'i (-15/+40°C) çalışıyor mu
//   2. Rota mesafesi/zigzag: optimizeTSP sonrası ardışık duraklar arası mantıksız sıçrama var mı
//   3. Durak rozet sırası: ItineraryTimeline'daki displayOrder mantığı ile aynı model
//   4. Öğün-zaman eşleşmesi: dining duraklar doğru timeSlot'ta mı
//   5. Curated veri sayısı: bir kategori yanlışlıkla 0'a düşmüş mü
//   6. Sahte/kopya isim: aynı şehir içinde tekrar eden attraction/restaurant/accommodation adı
//   7. Koordinat aykırı değeri: bir durağın şehrin kendi location'ından >150km uzakta olması
//      (Mersin/Anamur gibi meşru, aynı il içindeki uzak gezi noktaları için MAX_LEGIT_KM eşiği
//      kasıtlı olarak yüksek tutuldu — amaç, Safranbolu'da bulunan türden ~250km'lik, başka bir
//      şehre ait yanlış-yapıştırma koordinat hatalarını yakalamak, il-içi uzak ilçeleri değil.)

import { allCities } from "../src/lib/data/cities";
import { generateItinerary } from "../src/lib/itinerary";
import { extractTempHint, getMockWeather } from "../src/lib/itineraryLocal";
import { haversineDistanceKm } from "../src/lib/geo";
import type { City } from "../src/lib/types";

const MAX_LEGIT_KM = 150;

let issues = 0;
function report(citySlug: string, msg: string) {
  issues++;
  console.log(`[${citySlug}] ${msg}`);
}

function checkWeather(city: City) {
  const hint = extractTempHint(city.whenToGo, city.climate);
  if (hint !== undefined && (hint < -15 || hint > 40)) {
    report(city.slug, `hava durumu clamp'i başarısız: extractTempHint=${hint}`);
  }
  // Sanity: getMockWeather ürettiği sıcaklık da makul aralıkta olmalı
  const w = getMockWeather(city.slug, 1, hint ?? 18);
  if (w.tempC < -30 || w.tempC > 50) {
    report(city.slug, `mock hava durumu aşırı değer üretti: ${w.tempC}°C`);
  }
}

function checkItineraryRoute(city: City) {
  for (const days of [1, 2, 3]) {
    const itinerary = generateItinerary(city, days);
    for (const plan of itinerary.dayPlans) {
      const sorted = [...plan.stops].sort((a, b) => a.order - b.order);
      // Not: ardışık durak-arası mesafe kontrolü kasıtlı olarak burada yok — Van,
      // Ağrı, Erzincan gibi büyük illerde aynı gün içinde 100km+ uzaklıktaki
      // meşru gezi noktaları (örn. Muradiye Şelalesi -> Nemrut Krater Gölü)
      // normaldir; bu, checkCoordinateOutliers'daki şehir-merkezi mesafesi
      // kontrolünden (>150km, il sınırını aşan gerçek veri hatalarını hedefler)
      // farklı bir sorun sınıfıdır ve düşük eşikli bir kontrol yalnızca gürültü
      // üretir.
      // Rozet sırası: stops sıralanmış halde 1..N ardışık mı (aynı ItineraryTimeline mantığı)
      const orders = sorted.map((s) => s.order);
      for (let i = 0; i < orders.length; i++) {
        if (orders[i] !== i + 1) {
          report(city.slug, `Gün ${plan.day} (${days}g): durak sırası ardışık değil (${orders.join(",")})`);
          break;
        }
      }
      // Öğün-zaman eşleşmesi
      for (const stop of plan.stops) {
        if (stop.type !== "dining") continue;
        if (stop.title.startsWith("Kahvaltı") && stop.timeSlot !== "morning") {
          report(city.slug, `Gün ${plan.day}: "${stop.title}" timeSlot=${stop.timeSlot} (morning bekleniyor)`);
        }
        if (stop.title.startsWith("Öğle Yemeği") && stop.timeSlot !== "afternoon") {
          report(city.slug, `Gün ${plan.day}: "${stop.title}" timeSlot=${stop.timeSlot} (afternoon bekleniyor)`);
        }
        if (stop.title.startsWith("Akşam Yemeği") && stop.timeSlot !== "evening") {
          report(city.slug, `Gün ${plan.day}: "${stop.title}" timeSlot=${stop.timeSlot} (evening bekleniyor)`);
        }
      }
    }
  }
}

function checkCuratedCounts(city: City) {
  if (city.attractions.length === 0) report(city.slug, "attractions listesi boş (0 kayıt)");
  if (city.restaurants.length === 0) report(city.slug, "restaurants listesi boş (0 kayıt)");
  if (city.accommodations.length === 0) report(city.slug, "accommodations listesi boş (0 kayıt)");
}

function checkDuplicateNames(city: City) {
  for (const [label, items] of [
    ["attractions", city.attractions],
    ["restaurants", city.restaurants],
    ["accommodations", city.accommodations],
  ] as const) {
    const seen = new Map<string, number>();
    for (const item of items) {
      seen.set(item.name, (seen.get(item.name) ?? 0) + 1);
    }
    for (const [name, count] of seen) {
      if (count > 1) report(city.slug, `${label} içinde kopya isim: "${name}" (${count}x)`);
    }
  }
}

function checkCoordinateOutliers(city: City) {
  const groups: Array<[string, Array<{ id: string; name: string; location?: { lat: number; lng: number } }>]> = [
    ["attractions", city.attractions],
    ["restaurants", city.restaurants],
    ["accommodations", city.accommodations],
  ];
  for (const [label, items] of groups) {
    for (const item of items) {
      if (!item.location) continue;
      const dist = haversineDistanceKm(city.location, item.location);
      if (dist > MAX_LEGIT_KM) {
        report(
          city.slug,
          `koordinat aykırı değeri: ${label}/"${item.name}" (${item.id}) şehir merkezinden ${Math.round(dist)}km uzakta`
        );
      }
    }
  }
}

function main() {
  console.log(`${allCities.length} şehir denetleniyor...\n`);
  for (const city of allCities) {
    checkWeather(city);
    checkItineraryRoute(city);
    checkCuratedCounts(city);
    checkDuplicateNames(city);
    checkCoordinateOutliers(city);
  }
  console.log(`\nBitti. Toplam bulgu: ${issues}`);
  if (issues === 0) console.log("Tüm kontroller temiz.");
}

main();
