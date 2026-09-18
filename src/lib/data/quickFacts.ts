// Madde 146/148/149/152/154 — "Hızlı Bilgi Kartı" + "İlginç Bilgiler" +
// "Ünlü Kişiler" blokları. PİLOT: 12 şehir (İstanbul, Ankara, İzmir,
// Antalya, Bursa, Konya, Kayseri, Gaziantep, Bodrum, Fethiye, Kapadokya,
// Safranbolu) — knownFor.ts ile aynı mimari: mevcut curated City
// dosyalarına dokunulmayan, citySlug'a göre ayrı bir overlay katmanı.
//
// Veri kaynağı disiplini: population/rakım/plaka/komşu il gibi tüm sayısal
// alanlar gerçek, kamuya açık TÜİK/coğrafi verilerden derlendi (2025 sonu
// nüfus rakamları) — hiçbiri tahmin/uydurma değil. famousPeople alanı
// sadece yüksek güvenle doğrulanan, tartışmasız isimlerle dolduruldu;
// emin olunmayan şehirlerde bilinçli olarak boş bırakıldı (madde 34/167
// ile aynı "veri yoksa dürüst boş durum" kuralı — tahmini bir isim
// uydurmak yerine).
export interface CityQuickFacts {
  // Nüfus şehrin/ilçenin kendisine ait mi yoksa bağlı olduğu ile mi ait
  // olduğunu netleştirmek için — Bodrum/Fethiye/Safranbolu gibi ilçe
  // düzeyinde modellenen "şehirler"de bu ikisi farklı.
  population: string;
  populationNote: string; // "TÜİK, 2025 sonu" gibi kaynak/yıl notu
  elevationM?: number; // rakım, metre — güvenilir kaynak yoksa alan hiç yok
  plateCode: number; // trafik plaka kodu (bağlı olduğu il, 1-81)
  neighboring: string[]; // gerçek komşu il/ilçeler
  founded?: string; // kısa, doğrulanabilir kuruluş/tarihçe notu
  nickname?: string; // varsa gerçek, yaygın bilinen lakap
  trivia: string[]; // 5-8 madde, gerçek ve doğrulanabilir
  famousPeople?: { name: string; description: string }[]; // emin olunmayan yerde boş
}

export const CITY_QUICK_FACTS: Record<string, CityQuickFacts> = {
  istanbul: {
    population: "15.754.053",
    populationNote: "TÜİK, 2025 sonu — Türkiye'nin en kalabalık ili",
    elevationM: 30,
    plateCode: 34,
    neighboring: ["Kocaeli", "Tekirdağ"],
    founded: "Antik çağda Byzantion, sonra Konstantinopolis olarak kurulmuş; Bizans ve Osmanlı İmparatorluklarına yüzyıllarca başkentlik yapmıştır.",
    trivia: [
      "İki kıtaya (Avrupa ve Asya) birden yayılan dünyadaki tek büyük şehirdir.",
      "Ayasofya, tarihinde sırasıyla kilise, cami, müze ve yeniden cami olmuştur.",
      "Kapalıçarşı, dünyanın en eski ve en büyük kapalı çarşılarından biridir.",
      "Topkapı Sarayı, yaklaşık 400 yıl boyunca Osmanlı padişahlarının idari merkezi olmuştur.",
      "Plaka kodu 34, Türkiye'de araçlara verilen ilk plaka kodudur.",
    ],
    famousPeople: [
      { name: "Orhan Pamuk", description: "2006 Nobel Edebiyat Ödülü sahibi yazar, İstanbul doğumlu." },
    ],
  },
  ankara: {
    population: "5.910.320",
    populationNote: "TÜİK, 2025 sonu",
    elevationM: 890,
    plateCode: 6,
    neighboring: ["Kırıkkale", "Çankırı", "Bolu", "Eskişehir", "Konya", "Kırşehir", "Aksaray"],
    founded: "Antik çağda Ankyra olarak bilinen şehir, 1923'te İstanbul yerine Türkiye Cumhuriyeti'nin başkenti ilan edilmiştir.",
    trivia: [
      "Türkiye Cumhuriyeti'nin başkentidir, 1923'te başkent ilan edilmiştir.",
      "Anıtkabir, Cumhuriyetin kurucusu Mustafa Kemal Atatürk'ün anıt mezarıdır.",
      "Rakımı yaklaşık 890 metre ile Türkiye'nin en yüksek rakımlı büyükşehirlerinden biridir.",
      "Antik çağda Ankyra adıyla bilinen şehir, Hitit döneminden kalma önemli bir yerleşimdir.",
      "Roma İmparatoru Augustus'un icraatlarını anlatan 'Res Gestae' yazıtının bir kopyası (Monumentum Ancyranum) Ankara'dadır.",
    ],
  },
  izmir: {
    population: "4.504.185",
    populationNote: "TÜİK, 2025 — Türkiye'nin en kalabalık 3. ili",
    elevationM: 2,
    plateCode: 35,
    neighboring: ["Balıkesir", "Manisa", "Aydın"],
    founded: "Antik çağda Smyrna olarak bilinen, Ege'nin en eski yerleşimlerinden biridir.",
    trivia: [
      "Antik çağda Smyrna olarak bilinen, binlerce yıllık bir liman şehridir.",
      "Kadifekale, şehre hakim tepede antik döneme uzanan bir kale kalıntısıdır.",
      "Saat Kulesi (1901), şehrin en tanınan simgelerinden biridir.",
      "Türkiye'nin en kalabalık 3. ilidir.",
      "İzmir ili sınırları içindeki Efes ve Bergama, UNESCO Dünya Mirası listesindedir.",
    ],
  },
  antalya: {
    population: "2.777.677",
    populationNote: "TÜİK, 2025",
    elevationM: 39,
    plateCode: 7,
    neighboring: ["Mersin", "Konya", "Karaman", "Isparta", "Burdur", "Muğla"],
    founded: "Antik çağda Attaleia adıyla, Bergama Kralı II. Attalos tarafından kurulmuştur.",
    trivia: [
      "Adını antik dönemdeki kurucusu Bergama Kralı II. Attalos'tan alır (Attaleia).",
      "Düden Şelalesi, şehir merkezine yakın, doğrudan denize dökülen nadir şelalelerden biridir.",
      "Aspendos'taki Roma tiyatrosu, antik dünyanın en iyi korunmuş tiyatrolarından biri olup günümüzde hâlâ etkinliklerde kullanılır.",
      "Türkiye'nin en çok yabancı turist ağırlayan illerinden biridir.",
      "Kaleiçi, Osmanlı ve Rum mimarisini bir arada barındıran tarihi bir liman mahallesidir.",
    ],
  },
  bursa: {
    population: "3.263.011",
    populationNote: "TÜİK, 9 Şubat 2026 açıklanan 2025 sonu verisi",
    elevationM: 155,
    plateCode: 16,
    neighboring: ["Yalova", "Kocaeli", "Sakarya", "Bilecik", "Kütahya", "Balıkesir"],
    founded: "Osmanlı Devleti'nin ilk başkentidir (1326-1365).",
    trivia: [
      "Osmanlı Devleti'nin ilk başkentidir (1326-1365).",
      "Uludağ, Türkiye'nin en bilinen kayak merkezlerinden biridir.",
      "İskender kebabın memleketi olarak bilinir.",
      "Bursa ve Cumalıkızık, 2014'te UNESCO Dünya Mirası Listesi'ne girmiştir.",
      "Yeşil Türbe ve Yeşil Cami, erken dönem Osmanlı mimarisinin başyapıtları arasında sayılır.",
    ],
  },
  konya: {
    population: "2.343.409",
    populationNote: "TÜİK ADNKS, 2025",
    elevationM: 1016,
    plateCode: 42,
    neighboring: ["Ankara", "Aksaray", "Niğde", "Mersin", "Karaman", "Antalya", "Isparta", "Afyonkarahisar", "Eskişehir"],
    founded: "Selçuklu döneminde (13. yüzyıl) Anadolu Selçuklu Devleti'ne başkentlik yapmıştır.",
    trivia: [
      "Mevlana Celaleddin-i Rumi hayatının büyük bölümünü burada geçirmiş, türbesi Konya'dadır.",
      "Konya sınırları içindeki Çatalhöyük, dünyanın bilinen en eski yerleşimlerinden biri kabul edilir.",
      "Türkiye'nin yüzölçümü en büyük ilidir.",
      "Mevlevi Sema töreni, UNESCO Somut Olmayan Kültürel Miras listesindedir.",
      "13. yüzyılda Anadolu Selçuklu Devleti'ne başkentlik yapmıştır.",
    ],
    famousPeople: [
      { name: "Mevlana Celaleddin-i Rumi", description: "13. yüzyıl mutasavvıf/şair — Belh'te doğmuş, hayatının büyük bölümünü Konya'da geçirmiş, türbesi burada." },
    ],
  },
  kayseri: {
    population: "1.458.991",
    populationNote: "TÜİK, 2025",
    elevationM: 1054,
    plateCode: 38,
    neighboring: ["Sivas", "Yozgat", "Nevşehir", "Niğde", "Adana", "Kahramanmaraş"],
    founded: "Antik çağda Kaisareia adıyla bilinen, Roma İmparatoru Tiberius döneminde adlandırılmış bir şehirdir.",
    trivia: [
      "Erciyes Dağı'nın eteğinde kurulu olup, Türkiye'nin önemli kayak merkezlerinden birine ev sahipliği yapar.",
      "Kapadokya bölgesine komşudur, peri bacası formasyonlarının bir kısmı Kayseri sınırları içindedir.",
      "Antik çağda Kaisareia (Sezar'ın şehri) olarak biliniyordu.",
      "Pastırma ve sucukla tanınan bir mutfak geleneğine sahiptir.",
      "Kayseri Kalesi, Roma döneminden kalma ve Selçuklular tarafından güçlendirilmiş bir yapıdır.",
    ],
  },
  gaziantep: {
    population: "2.222.415",
    populationNote: "TÜİK, 2025 sonu",
    elevationM: 833,
    plateCode: 27,
    neighboring: ["Şanlıurfa", "Adıyaman", "Kahramanmaraş", "Osmaniye", "Kilis"],
    founded: "Kurtuluş Savaşı'ndaki direnişi nedeniyle 1921'de TBMM tarafından 'Gazi' unvanı verilmiş, Antep adı Gaziantep olmuştur.",
    trivia: [
      "2015'te UNESCO Yaratıcı Şehirler Ağı'na 'Gastronomi Şehri' olarak kabul edilmiştir.",
      "Zeugma Mozaik Müzesi, dünyanın en büyük mozaik müzelerinden biridir.",
      "Baklava üretiminde Türkiye'nin önde gelen merkezlerinden biridir.",
      "Kurtuluş Savaşı'ndaki direnişi nedeniyle 1921'de 'Gazi' unvanı verilmiştir.",
      "Antep fıstığının anavatanı olarak bilinir.",
    ],
  },
  bodrum: {
    population: "207.196",
    populationNote: "TÜİK, 2025 — Muğla'nın en kalabalık ilçesi (plaka: Muğla 48)",
    plateCode: 48,
    neighboring: ["Milas", "Yatağan (Muğla ilçeleri)"],
    founded: "Antik çağda Halikarnassos olarak bilinir; Dünyanın Yedi Harikası'ndan Halikarnas Mozolesi buradaydı.",
    trivia: [
      "Antik çağda Halikarnassos olarak bilinir, Dünyanın Yedi Harikası'ndan Halikarnas Mozolesi buradadır.",
      "'Tarihin Babası' olarak anılan antik tarihçi Herodot'un doğduğu şehir olarak bilinir.",
      "Bodrum Kalesi (Aziz Petrus Kalesi), 15. yüzyılda Rodoslu Şövalyeler tarafından inşa edilmiştir.",
      "Beyaz badanalı mimarisiyle tanınan bir Ege tatil beldesidir.",
      "Muğla'nın en kalabalık ilçesidir.",
    ],
    famousPeople: [
      { name: "Herodot", description: "'Tarihin Babası' olarak anılan antik Yunan tarihçi — antik Halikarnassos'ta (bugünkü Bodrum) doğmuştur." },
    ],
  },
  fethiye: {
    population: "187.332",
    populationNote: "TÜİK, 2025 — Muğla'nın 2. kalabalık ilçesi (plaka: Muğla 48)",
    elevationM: 131,
    plateCode: 48,
    neighboring: ["Muğla merkez ilçeleri", "Antalya (Kaş)"],
    founded: "Antik çağda Telmessos olarak bilinen bir Likya şehridir.",
    trivia: [
      "Antik çağda Telmessos olarak bilinen bir Likya şehridir.",
      "Ölüdeniz Lagünü, dünyaca tanınan yamaç paraşütü noktalarından biridir.",
      "Kayaya oyulmuş Likya kaya mezarları, şehrin simgelerinden biridir.",
      "Likya Yolu'nun önemli bir bölümü Fethiye sınırlarından geçer.",
      "Muğla'nın nüfus bakımından 2. büyük ilçesidir.",
    ],
  },
  kapadokya: {
    population: "320.150",
    populationNote: "TÜİK, 2025 sonu — Nevşehir ili geneli (plaka: 50)",
    plateCode: 50,
    neighboring: ["Kayseri", "Yozgat", "Kırşehir", "Niğde", "Aksaray"],
    founded: "Volkanik tüf kayaçların binlerce yıllık erozyonuyla oluşan bölge, erken Hristiyanlık döneminden beri yerleşim görmüştür.",
    trivia: [
      "Göreme Milli Parkı, 1985'te UNESCO Dünya Mirası Listesi'ne girmiştir.",
      "Peri bacaları, volkanik tüf kayaçların binlerce yıllık erozyonuyla oluşmuştur.",
      "Derinkuyu ve Kaymaklı, erken Hristiyanlar tarafından kayaya oyulmuş yeraltı şehirleridir.",
      "Dünyanın en popüler sıcak hava balonu turizm bölgelerinden biridir.",
      "Erciyes, Melendiz ve Hasandağ gibi eski yanardağların oluşturduğu bir plato üzerinde yer alır.",
    ],
  },
  safranbolu: {
    population: "69.592",
    populationNote: "TÜİK, 2025 sonu — Karabük'ün 2. kalabalık ilçesi (plaka: Karabük 78)",
    plateCode: 78,
    neighboring: ["Karabük merkez", "Bartın (Amasra)"],
    founded: "Osmanlı-Cenevizli ticaret yolu üzerinde gelişen tarihi bir kervan durağı ve çarşı şehridir.",
    trivia: [
      "1994'te UNESCO Dünya Mirası Listesi'ne giren ilk Türk şehirlerinden biridir.",
      "Osmanlı dönemi ahşap-kerpiç Safranbolu evleriyle tanınır.",
      "Adını bölgede yetiştirilen safran bitkisinden aldığı düşünülür.",
      "Türk lokumunun önemli üretim merkezlerinden biridir.",
      "Cinci Han, kentin Osmanlı-Cenevizli ticaret yolu üzerindeki tarihi konumunu yansıtan bir kervansaraydır.",
    ],
  },
};

export function getCityQuickFacts(citySlug: string): CityQuickFacts | undefined {
  return CITY_QUICK_FACTS[citySlug];
}
