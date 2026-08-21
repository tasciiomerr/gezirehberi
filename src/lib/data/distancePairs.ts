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

  // --- Madde 150/312 genişletmesi: +100 çift ---
  // Öncelik 1: ilk 50'de kapsanmayan, gerçek turizm önemi yüksek ve
  // coğrafi olarak mantıklı gezi rotası oluşturan şehir çiftleri.
  // Öncelik 2: aynı bölge içi kısa mesafeler — bir bölgeyi gezen birinin
  // gerçekten arayacağı çiftler. Aynı seçim yöntemi: gerçek arama hacmi
  // verisi yok, bilinen turizm coğrafyasına dayalı seçim.
  { cityA: "ankara", cityB: "istanbul" },
  { cityA: "ankara", cityB: "kapadokya" },
  { cityA: "ankara", cityB: "konya" },
  { cityA: "ankara", cityB: "safranbolu" },
  { cityA: "ankara", cityB: "kayseri" },
  { cityA: "ankara", cityB: "eskisehir" },
  { cityA: "ankara", cityB: "bolu" },
  { cityA: "ankara", cityB: "corum" },
  { cityA: "ankara", cityB: "kirsehir" },
  { cityA: "izmir", cityB: "manisa" },
  { cityA: "aydin", cityB: "izmir" },
  { cityA: "izmir", cityB: "kutahya" },
  { cityA: "izmir", cityB: "usak" },
  { cityA: "aydin", cityB: "denizli" },
  { cityA: "fethiye", cityB: "kas" },
  { cityA: "antalya", cityB: "kas" },
  { cityA: "antalya", cityB: "isparta" },
  { cityA: "antalya", cityB: "burdur" },
  { cityA: "burdur", cityB: "isparta" },
  { cityA: "isparta", cityB: "konya" },
  { cityA: "bursa", cityB: "yalova" },
  { cityA: "bursa", cityB: "kocaeli" },
  { cityA: "bursa", cityB: "eskisehir" },
  { cityA: "balikesir", cityB: "bursa" },
  { cityA: "istanbul", cityB: "kocaeli" },
  { cityA: "istanbul", cityB: "sakarya" },
  { cityA: "edirne", cityB: "istanbul" },
  { cityA: "bilecik", cityB: "istanbul" },
  { cityA: "istanbul", cityB: "tekirdag" },
  { cityA: "istanbul", cityB: "yalova" },
  { cityA: "istanbul", cityB: "kirklareli" },
  { cityA: "canakkale", cityB: "edirne" },
  { cityA: "balikesir", cityB: "canakkale" },
  { cityA: "kocaeli", cityB: "sakarya" },
  { cityA: "samsun", cityB: "sinop" },
  { cityA: "kastamonu", cityB: "sinop" },
  { cityA: "bolu", cityB: "safranbolu" },
  { cityA: "bolu", cityB: "duzce" },
  { cityA: "amasya", cityB: "samsun" },
  { cityA: "amasya", cityB: "tokat" },
  { cityA: "giresun", cityB: "trabzon" },
  { cityA: "giresun", cityB: "ordu" },
  { cityA: "bayburt", cityB: "trabzon" },
  { cityA: "gumushane", cityB: "trabzon" },
  { cityA: "amasra", cityB: "zonguldak" },
  { cityA: "kastamonu", cityB: "safranbolu" },
  { cityA: "amasya", cityB: "corum" },
  { cityA: "corum", cityB: "tokat" },
  { cityA: "samsun", cityB: "tokat" },
  { cityA: "kayseri", cityB: "sivas" },
  { cityA: "karaman", cityB: "konya" },
  { cityA: "kapadokya", cityB: "nigde" },
  { cityA: "aksaray", cityB: "kapadokya" },
  { cityA: "eskisehir", cityB: "kutahya" },
  { cityA: "kayseri", cityB: "kirsehir" },
  { cityA: "kayseri", cityB: "yozgat" },
  { cityA: "kayseri", cityB: "nigde" },
  { cityA: "aksaray", cityB: "konya" },
  { cityA: "erzurum", cityB: "kars" },
  { cityA: "erzurum", cityB: "trabzon" },
  { cityA: "erzurum", cityB: "van" },
  { cityA: "adiyaman", cityB: "malatya" },
  { cityA: "adiyaman", cityB: "sanliurfa" },
  { cityA: "elazig", cityB: "malatya" },
  { cityA: "diyarbakir", cityB: "elazig" },
  { cityA: "adana", cityB: "gaziantep" },
  { cityA: "adana", cityB: "hatay" },
  { cityA: "adana", cityB: "mersin" },
  { cityA: "hatay", cityB: "osmaniye" },
  { cityA: "adana", cityB: "kahramanmaras" },
  { cityA: "batman", cityB: "mardin" },
  { cityA: "batman", cityB: "siirt" },
  { cityA: "bitlis", cityB: "van" },
  { cityA: "bitlis", cityB: "mus" },
  { cityA: "agri", cityB: "kars" },
  { cityA: "agri", cityB: "igdir" },
  { cityA: "ardahan", cityB: "kars" },
  { cityA: "elazig", cityB: "tunceli" },
  { cityA: "erzincan", cityB: "erzurum" },
  { cityA: "erzincan", cityB: "tunceli" },
  { cityA: "gaziantep", cityB: "kahramanmaras" },
  { cityA: "adana", cityB: "osmaniye" },
  { cityA: "batman", cityB: "diyarbakir" },
  { cityA: "siirt", cityB: "sirnak" },
  { cityA: "hakkari", cityB: "van" },
  { cityA: "mus", cityB: "van" },
  { cityA: "gaziantep", cityB: "kilis" },
  { cityA: "erzincan", cityB: "sivas" },
  { cityA: "sivas", cityB: "tokat" },
  { cityA: "balikesir", cityB: "izmir" },
  { cityA: "aydin", cityB: "manisa" },
  { cityA: "afyonkarahisar", cityB: "kutahya" },
  { cityA: "afyonkarahisar", cityB: "isparta" },
  { cityA: "afyonkarahisar", cityB: "konya" },
  { cityA: "afyonkarahisar", cityB: "usak" },
  { cityA: "burdur", cityB: "denizli" },
  { cityA: "kahramanmaras", cityB: "osmaniye" },
  { cityA: "gaziantep", cityB: "hatay" },
  { cityA: "giresun", cityB: "samsun" },
  { cityA: "gumushane", cityB: "rize" },
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
