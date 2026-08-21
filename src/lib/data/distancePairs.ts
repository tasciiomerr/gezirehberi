// Madde 150 — 50 el ile seçilmiş şehir çifti (tüm C(85,2)=3570 kombinasyon
// değil, thin-content riskini azaltmak için). Seçim kriteri: büyük giriş
// noktaları (İstanbul/Antalya/İzmir) → popüler tatil/kültür şehirleri, aynı
// bölge içi klasik kıyaslamalar (Bodrum-Fethiye), bilinen kültür rotaları
// (GAP: Gaziantep-Şanlıurfa-Mardin-Diyarbakır). Gerçek arama hacmi verisine
// erişim yok — bu, bilinen turizm coğrafyasına dayalı bir seçim, ölçülmüş
// bir veri değil.
//
// Her çift alfabetik sırayla (cityA < cityB) yazılıyor — bu, sayfa slug'ının
// kanonik yönünü belirliyor (istanbul-antalya var, antalya-istanbul yok),
// A-B/B-A duplicate content'i baştan engelliyor.
export interface DistancePair {
  cityA: string; // slug, allCities içinde
  cityB: string; // slug, allCities içinde
}

export const distancePairs: DistancePair[] = [
  // İstanbul merkezli
  { cityA: "antalya", cityB: "istanbul" },
  { cityA: "bodrum", cityB: "istanbul" },
  { cityA: "istanbul", cityB: "izmir" },
  { cityA: "istanbul", cityB: "kapadokya" },
  { cityA: "canakkale", cityB: "istanbul" },
  { cityA: "bursa", cityB: "istanbul" },
  { cityA: "istanbul", cityB: "trabzon" },
  { cityA: "istanbul", cityB: "safranbolu" },
  { cityA: "amasra", cityB: "istanbul" },
  { cityA: "istanbul", cityB: "konya" },
  { cityA: "fethiye", cityB: "istanbul" },
  { cityA: "istanbul", cityB: "marmaris" },
  { cityA: "cesme", cityB: "istanbul" },
  { cityA: "istanbul", cityB: "mardin" },
  { cityA: "istanbul", cityB: "sanliurfa" },

  // Antalya merkezli
  { cityA: "antalya", cityB: "bodrum" },
  { cityA: "antalya", cityB: "fethiye" },
  { cityA: "antalya", cityB: "marmaris" },
  { cityA: "antalya", cityB: "kapadokya" },
  { cityA: "antalya", cityB: "konya" },
  { cityA: "antalya", cityB: "mersin" },
  { cityA: "antalya", cityB: "denizli" },

  // Ege üçgeni
  { cityA: "bodrum", cityB: "fethiye" },
  { cityA: "bodrum", cityB: "marmaris" },
  { cityA: "bodrum", cityB: "cesme" },
  { cityA: "bodrum", cityB: "izmir" },
  { cityA: "cesme", cityB: "izmir" },
  { cityA: "fethiye", cityB: "izmir" },
  { cityA: "denizli", cityB: "izmir" },
  { cityA: "fethiye", cityB: "marmaris" },
  { cityA: "cesme", cityB: "fethiye" },

  // Kapadokya / İç Anadolu
  { cityA: "kapadokya", cityB: "konya" },
  { cityA: "kapadokya", cityB: "kayseri" },
  { cityA: "kapadokya", cityB: "mersin" },
  { cityA: "konya", cityB: "kayseri" },

  // Karadeniz kıyı rotası
  { cityA: "amasra", cityB: "safranbolu" },
  { cityA: "rize", cityB: "trabzon" },
  { cityA: "artvin", cityB: "rize" },
  { cityA: "artvin", cityB: "trabzon" },
  { cityA: "samsun", cityB: "trabzon" },
  { cityA: "ordu", cityB: "samsun" },
  { cityA: "ordu", cityB: "trabzon" },

  // GAP kültür rotası
  { cityA: "gaziantep", cityB: "sanliurfa" },
  { cityA: "mardin", cityB: "sanliurfa" },
  { cityA: "diyarbakir", cityB: "mardin" },
  { cityA: "gaziantep", cityB: "mardin" },
  { cityA: "diyarbakir", cityB: "sanliurfa" },

  // Diğer
  { cityA: "bursa", cityB: "canakkale" },
  { cityA: "kars", cityB: "van" },
  { cityA: "diyarbakir", cityB: "van" },
];

// Depolanan sırayı değil, her zaman alfabetik sırayı kullanır — yukarıdaki
// listede elle yazım hatası olsa bile A-B/B-A duplicate'i garantili önler.
export function distancePairSlug(pair: DistancePair): string {
  const [a, b] = [pair.cityA, pair.cityB].sort();
  return `${a}-${b}`;
}

export function parseDistancePairSlug(slug: string): DistancePair | undefined {
  return distancePairs.find((p) => distancePairSlug(p) === slug);
}
