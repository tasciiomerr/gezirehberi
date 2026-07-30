import { GeoPoint, TransferBlock } from "@/lib/types";

/**
 * Haversine formülüyle iki koordinat arası kuş uçuşu mesafe (km).
 * Gerçek karayolu mesafesi değildir — Mapbox/OSRM API entegrasyonu olmadan
 * en iyi tahmin budur; karayolu mesafesi genelde bunun 1.2-1.4 katıdır.
 */
export function haversineDistanceKm(a: GeoPoint, b: GeoPoint): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
}

const ROAD_FACTOR = 1.3; // kuş uçuşu -> tahmini karayolu mesafesi çarpanı
const WALK_SPEED_KMH = 4.5;
const DRIVE_SPEED_KMH = 32; // şehir içi ortalama

/**
 * İki durak arasındaki transfer bloğunu tahmin eder (Bölüm 1.3, 1.6, 1.7 mock).
 * Gerçek Mapbox/OSRM entegrasyonu olmadan, mesafeye göre yürüyüş/araç modunu
 * ve süresini tahmin eder. 1.5 km altı yürüyüş, üstü araç/toplu taşıma önerilir.
 */
export function estimateTransfer(
  fromOrder: number,
  toOrder: number,
  from?: GeoPoint,
  to?: GeoPoint
): TransferBlock | null {
  if (!from || !to) return null;

  const straightKm = haversineDistanceKm(from, to);
  if (straightKm < 0.05) return null; // aynı nokta sayılır, transfer gösterme

  const roadKm = straightKm * ROAD_FACTOR;
  const mode: "walk" | "drive" = roadKm <= 1.5 ? "walk" : "drive";
  const speed = mode === "walk" ? WALK_SPEED_KMH : DRIVE_SPEED_KMH;
  const estimatedMinutes = Math.max(3, Math.round((roadKm / speed) * 60));

  return {
    fromOrder,
    toOrder,
    distanceKm: Math.round(roadKm * 10) / 10,
    mode,
    estimatedMinutes,
    isLongTransfer: roadKm > 15,
  };
}

export function assignTimeSlot(order: number, totalStopsInDay: number): "morning" | "afternoon" | "evening" {
  const ratio = order / Math.max(totalStopsInDay, 1);
  if (ratio <= 0.4) return "morning";
  if (ratio <= 0.75) return "afternoon";
  return "evening";
}

export const TIME_SLOT_LABELS: Record<"morning" | "afternoon" | "evening", { label: string; range: string }> = {
  morning: { label: "Sabah", range: "09:00 – 12:30" },
  afternoon: { label: "Öğle", range: "13:30 – 17:00" },
  evening: { label: "Akşam", range: "18:30 – 22:00" },
};

/**
  * TSP (Traveling Salesperson) Solver using Nearest Neighbor algorithm.
  * Starts at the first stop (usually breakfast) and reorders subsequent stops
  * to minimize total travel distance and prevent backtracking.
  */
export function optimizeTSP(stops: any[]): any[] {
  if (stops.length <= 2) return stops;

  const result = [];
  const unvisited = [...stops];
  const start = unvisited.shift(); // Keep the first stop as starting point
  result.push(start);

  let current = start;
  while (unvisited.length > 0) {
    let closestIdx = 0;
    let minDist = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const candidate = unvisited[i];
      if (current.location && candidate.location) {
        const d = haversineDistanceKm(current.location, candidate.location);
        if (d < minDist) {
          minDist = d;
          closestIdx = i;
        }
      } else {
        // If there's no location, consider it close by default so it doesn't break
        minDist = 0;
        closestIdx = i;
        break;
      }
    }

    current = unvisited.splice(closestIdx, 1)[0];
    result.push(current);
  }

  // Re-assign slot orders
  return result.map((s, idx) => ({
    ...s,
    order: idx + 1,
  }));
}

