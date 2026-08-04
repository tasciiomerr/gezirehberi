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

/**
 * Mock hava durumu — gerçek bir Weather API key'i olmadan, il koordinatına ve
 * gün indexine göre deterministik (her yenilemede aynı) bir tahmin üretir.
 *
 * NOT (uzun vadeli plan): Bir rota günlerce/haftalarca önceden planlandığı için
 * gerçek bir hava durumu API'si de bu ufukta güvenilir bir tahmin veremez —
 * API'ler genelde ~10 günden öteye gitmez. Asıl doğru çözüm muhtemelen bu mock
 * günlük tahmini "aylık ortalama iklim bilgisine" (örn. "Haziran'da ortalama
 * 24°C, yağış az") çevirmek olacak. Şimdilik burada yalnızca sıcaklık ile hava
 * koşulunun (örn. "19°C ve karlı" gibi) meteorolojik olarak tutarlı çıkmasını
 * sağlayan bir iç-tutarlılık düzeltmesi yapıldı; veri hâlâ gerçek değil.
 */
export interface MockWeather {
  tempC: number;
  condition: "güneşli" | "parçalı bulutlu" | "yağmurlu" | "karlı" | "sisli";
  icon: string;
  rainChance: number;
  windKmh: number;
}

const ICONS: Record<MockWeather["condition"], string> = {
  "güneşli": "☀️",
  "parçalı bulutlu": "⛅",
  "yağmurlu": "🌧️",
  "karlı": "❄️",
  "sisli": "🌫️",
};

function seededRandom(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h % 1000) / 1000;
}

export function getMockWeather(citySlug: string, day: number, avgTempHint = 18): MockWeather {
  const r1 = seededRandom(`${citySlug}-${day}-t`);
  const r2 = seededRandom(`${citySlug}-${day}-c`);
  const r3 = seededRandom(`${citySlug}-${day}-r`);
  const r4 = seededRandom(`${citySlug}-${day}-w`);

  const tempC = Math.round(avgTempHint - 6 + r1 * 12);

  // Only offer conditions that are meteorologically possible at this temperature
  // (e.g. "karlı" can no longer be picked at 19°C) before choosing among them.
  let eligible: MockWeather["condition"][];
  if (tempC <= 2) {
    eligible = ["karlı", "sisli", "parçalı bulutlu"];
  } else if (tempC <= 10) {
    eligible = ["yağmurlu", "sisli", "parçalı bulutlu", "güneşli"];
  } else if (tempC <= 22) {
    eligible = ["güneşli", "parçalı bulutlu", "yağmurlu", "sisli"];
  } else {
    eligible = ["güneşli", "parçalı bulutlu", "yağmurlu"];
  }
  const condition = eligible[Math.floor(r2 * eligible.length)];

  return {
    tempC,
    condition,
    icon: ICONS[condition],
    rainChance: Math.round(r3 * (condition === "yağmurlu" ? 80 : 25)),
    windKmh: Math.round(8 + r4 * 22),
  };
}
