// Bölüm 2: kullanıcının check-off, not ve gün-kopyalama tercihlerini
// localStorage'da saklayan hafif bir overlay katmanı (backend yok).

export interface ItineraryLocalState {
  checked: Record<string, boolean>; // key: `${day}-${order}`
  notes: Record<number, string>; // key: day
  budgets?: Record<number, { accommodation: number; food: number; tickets: number; transport: number }>;
}

function keyFor(citySlug: string, days: number) {
  return `yoldefteri_itinerary_${citySlug}_${days}d`;
}

const EMPTY: ItineraryLocalState = { checked: {}, notes: {}, budgets: {} };

export function loadItineraryLocalState(citySlug: string, days: number): ItineraryLocalState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(keyFor(citySlug, days));
    return raw ? JSON.parse(raw) : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function saveItineraryLocalState(citySlug: string, days: number, state: ItineraryLocalState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(keyFor(citySlug, days), JSON.stringify(state));
}
