import { City } from "@/lib/types";

export const comprehensiveCities: City[] = [
  {
    slug: "amasra",
    regionSlug: "karadeniz",
    name: "Amasra",
    title: "Amasra Gezi Rehberi — Balıkçı Kasabası",
    summary: "Bartın''ın küçük liman kasabası, iki koyu ayıran kale ve balıkçı tekneleriyle Karadeniz''in en sakin tatil noktası",
    longDescription: "Amasra, Karadeniz''in en korunmuş ve turizmin etkilerinden uzak kasabalarından biridir. Ceneviz kalesi, balıkçı limanları ve yerel kültürü tam olarak koruyan bir yerleşim. Her mevsimde güzeldir ancak yaz aylarında kalabalık olur.",
    heroTagline: "İki koy arasında sakin bir liman kasabası",
    heroImage: "/images/amasra-hero.jpg",
    location: { lat: 41.7479, lng: 32.0208 },
    region: "Karadeniz",
    howToGetThere: "İstanbul''dan otobüs ile Bartın''a 4.5 saat, Bartın''dan minibüsle Amasra''ya 25 dakika. Ankara''dan 7 saat. Havalimanı: Zonguldak Çaycuma (65 km).",
    howToArrive: {
      byAir: "Zonguldak Çaycuma Havalimanı''ndan araba kiralayıp 65 km",
      byBus: "Kamil Koç, Kurtalan, Ulusoy otobüsleri İstanbul - Bartın hattında",
      byCar: "İstanbul D010 karayolu, Bartın - Amasra 25 km",
      byTrain: "Bartın''e tren var ama Amasra''ya doğrudan yok"
    },
    whenToGo: "Haziran-Eylül tatil sezonu, Mayıs-Ekim ideal, Eylül-Kasım az kalabalık ve hava güzel",
    climate: "Yazları ılık (24-26°C), kışları ılıman (5-8°C), yıl boyunca yağış var",
    whereToStay: "Kale içinde butik pansiyonlar (otantik), Büyük Liman''da deniz manzaralı oteller, Küçük Liman''da uygun fiyatlı pansiyon",
    budget: "Günlük 1.000-1.500 TL/kişi (3-yıldızlı konaklama, 3 öğün, aktiviteler dahil)",
    budgetBreakdown: {
      accommodation: "400-600 TL (2-yıldızlı) - 800-1.200 TL (3+ yıldızlı)",
      food: "150-300 TL/gün (yerel restoranlar)",
      activities: "50-150 TL (çoğu ücretiz)",
      transport: "Yerel: 10-20 TL (minibüs)"
    },
    transportation: "Kasaba tamamen yürüyerek gezilebilir (max 20 min). Bozköy, Tekkeönü: minibüs ve taksi",
    bestDuration: "2-3 gün ideal, 1 gün mini, 5 gün kapsamlı",
    attractions: [
      {
        id: "amasra-kale",
        name: "Amasra Kalesi",
        category: "historical",
        description: "300 metrelik kale yarımadası, Ceneviz ve Osmanlı dönemlerinden kalma surlar",
        longDescription: "14. yüzyılda Cenevililer tarafından inşa edilen, Osmanlı döneminde de kullanılan kale. Surların üzerinden iki limanın manzarası görülür. Erken saatlerde az kalabalık.",
        images: [
          { url: "/images/amasra-kale-1.jpg", alt: "Kale surları" },
          { url: "/images/amasra-kale-2.jpg", alt: "İç kale" }
        ],
        location: { lat: 41.7479, lng: 32.0208 },
        address: "Kale Mah., Amasra, Bartın",
        openingHours: "08:00 - 18:00",
        entranceFee: "Ücretsiz",
        duration: "1.5-2 saat",
        bestTime: "Sabah 8-10",
        importance: "must-see",
        tips: ["Terlik giyiniz", "Kamera tripodu getirin", "Hava durumunu kontrol edin (rüzgar)"],
        accessibility: "Merdivenler var, engelli erişimi kısıtlı",
        phone: "+90 378 515 1234"
      },
      {
        id: "amasra-liman",
        name: "Küçük Liman",
        category: "viewpoint",
        description: "Balıkçı tekneleriyle dolu, restoranlarla çevrili sakin liman",
        longDescription: "Amasra''nın kalbi. Balıkçılar sabah 5-7 arasında dönüyor. Gün batımı fotoğrafları mükemmel.",
        images: [],
        location: { lat: 41.7485, lng: 32.0195 },
        address: "Küçük Liman, Amasra",
        openingHours: "24/7 Açık",
        entranceFee: "Ücretsiz",
        duration: "1-2 saat",
        bestTime: "Sabah 6-8, Akşam 18-20",
        importance: "must-see",
        tips: ["Waterproof kamera al", "Balıkçıların erkenden başladıklarını bil"],
        accessibility: "Düz, engelli dostu"
      }
    ],
    restaurants: [
      {
        id: "amasra-balık-evi",
        name: "Liman Balık Evi",
        diningType: "restaurant",
        description: "Günlük av balıklarıyla ünlü",
        specialties: ["Amasra balık çorbası", "Hamsili pilav", "Levrek ızgara"],
        images: [],
        location: { lat: 41.7485, lng: 32.0195 },
        address: "Küçük Liman, Amasra",
        priceRange: "mid",
        averageCost: "250-400 TL/kişi",
        openingHours: "11:00 - 23:00",
        phone: "+90 378 515 2055",
        reservationNeeded: true,
        features: ["Deniz manzarası", "Açık havada masa", "Balık seçme"]
      }
    ],
    accommodations: [
      {
        id: "amasra-butik-pansiyon",
        name: "Eski Kale Butik Pansiyonu",
        type: "guesthouse",
        description: "Kale içinde restore edilmiş Osmanlı evi",
        images: [],
        location: { lat: 41.7479, lng: 32.0208 },
        address: "Kale İçi, Amasra",
        priceRange: "mid",
        pricePerNight: "400-600 TL",
        rating: 4.8,
        amenities: ["WiFi", "Kıta Kahvaltısı", "Hava Yastığı Bedtime"],
        phone: "+90 378 515 3344"
      }
    ],
    localFood: [
      {
        id: "amasra-hamsi",
        name: "Hamsili Pilav",
        description: "Hamsiyle yapılan pirinç pilavı",
        longDescription: "Karadeniz''in en meşhur yemeği. Hamsi balıklarıyla pirinç pilavı harmanlanır.",
        images: [],
        origin: "Karadeniz",
        ingredients: ["Hamsi", "Pirinç", "Ceviz"],
        whereToTry: [],
        bestSeason: "Eylül - Nisan",
        priceRange: "120-180 TL",
        tips: "Taze hamsiyle yapılanı tercih edin",
        importance: "must-see"
      }
    ],
    itineraries: [
      {
        id: "amasra-1day",
        title: "Amasra''da 1 Gün",
        description: "Sakin bir gün: Kale, liman, yemek",
        days: 1,
        summary: "Sabah kalesi, öğle balık çorbası, akşam gün batımı",
        importance: "quick-visit",
        dayPlans: [
          {
            day: 1,
            title: "Amasra''nın Kalbi",
            theme: "Tarihi ve Liman",
            stops: [
              { order: 1, title: "Amasra Kalesi", type: "attraction", duration: "1.5 saat" },
              { order: 2, title: "Küçük Liman Kahvaltısı", type: "dining", duration: "1 saat" },
              { order: 3, title: "Çarşıda Alışveriş", type: "shopping", duration: "1.5 saat" },
              { order: 4, title: "Balık Çorbası Öğle Yemeği", type: "dining", duration: "1.5 saat" },
              { order: 5, title: "Gün Batımında Balık Evi Çorbası", type: "dining", duration: "2 saat" }
            ],
            totalDuration: "8 saat",
            mealSuggestions: {
              breakfast: { id: "", name: "Küçük Liman Kahvesi", diningType: "cafe", description: "", specialties: [], images: [], location: { lat: 0, lng: 0 }, address: "", priceRange: "budget", averageCost: "", openingHours: "", features: [] },
              lunch: { id: "", name: "Liman Balık Evi", diningType: "restaurant", description: "", specialties: [], images: [], location: { lat: 0, lng: 0 }, address: "", priceRange: "mid", averageCost: "", openingHours: "", features: [] },
              dinner: { id: "", name: "Amasra Balık Evi", diningType: "restaurant", description: "", specialties: [], images: [], location: { lat: 0, lng: 0 }, address: "", priceRange: "mid", averageCost: "", openingHours: "", features: [] }
            },
            accommodationSuggestion: { id: "", name: "Eski Kale Pansiyonu", type: "guesthouse", description: "", images: [], location: { lat: 0, lng: 0 }, address: "", priceRange: "mid", pricePerNight: "", rating: 4.8, amenities: [] },
            notes: "Erken yatıp ertesi gün balıkçıları görmek tavsiye edilir"
          }
        ],
        bestSeason: "Mayıs - Ekim",
        budgetPerPerson: "600-800 TL",
        images: []
      }
    ],
    instagram: "@amasra_official",
    tags: ["Balık", "Liman", "Tarihi", "Sakin"],
    highlights: ["Kale Surları", "Balık Çorbası", "Gün Batımı", "Balıkçı Tekneleri"]
  }
];

export function getCityComprehensive(slug: string): City | undefined {
  return comprehensiveCities.find((c) => c.slug === slug);
}
