export interface GuideArticle {
  slug: string;
  title: string;
  summary: string;
  coverImage?: string;
  body: string;
  publishedAt: string; // ISO date
  relatedCitySlugs?: string[];
}

// Editorial list/blog content layer (report item 83 — "En iyi 10 Ege koyu",
// "Kasım ayında nereye gidilir" style articles). Architecture only: this
// stays empty until real, hand-written articles are added here — never
// auto-generate entries (same data-honesty rule as madde 34/167).
//
// İlk gerçek makale (madde 302 follow-up): Türkçe konuşma rehberi — şehir/
// bölge verisine bağlı olmayan, evergreen, veri-dürüstlüğü riski taşımayan
// (uydurma işletme/fiyat/onay bilgisi içermeyen) bir içerik türü. Standart
// Türkçe kelime/ifadelerin çevirisi — herkese açık, doğrulanabilir bilgi.
export const guides: GuideArticle[] = [
  {
    slug: "turkce-konusma-rehberi",
    title: "Türkiye'de Seyahat Edenler İçin Türkçe Konuşma Rehberi",
    summary:
      "Türkiye'yi ziyaret ederken işinize yarayacak temel Türkçe kelime ve ifadeler: selamlaşma, sayılar, yön sorma, restoran ve acil durum cümleleri.",
    publishedAt: "2026-08-17",
    body: `Türkçe, Türkiye'de İngilizce'nin her yerde konuşulmadığı küçük kasabalarda ve çarşılarda özellikle işinize yarayacak bir dil. Aşağıdaki temel ifadeleri öğrenmeniz, yerel halkla iletişiminizi kolaylaştıracak ve seyahatinizi daha keyifli hale getirecektir.

TELAFFUZ HAKKINDA KISA NOT
Türkçe, yazıldığı gibi okunan fonetik bir dildir. Birkaç harf İngilizce'den farklıdır: "c" harfi "j" gibi (örn. "cami" = "jami"), "ç" harfi "ch" gibi, "ş" harfi "sh" gibi, "ğ" (yumuşak g) genelde okunmaz, sadece önündeki ünlüyü uzatır, "ı" (noktasız i) İngilizce'deki "the" kelimesinin sonundaki belirsiz ünlüye benzer.

SELAMLAŞMA
Merhaba — Hello
Günaydın — Good morning
İyi akşamlar — Good evening
İyi geceler — Good night
Nasılsınız? — How are you? (resmi)
İyiyim, teşekkürler — I'm fine, thank you
Hoşça kalın — Goodbye (kalan kişi için)
Güle güle — Goodbye (giden kişi için)
Görüşürüz — See you

TEMEL İFADELER
Evet — Yes
Hayır — No
Lütfen — Please
Teşekkür ederim / Teşekkürler — Thank you
Rica ederim — You're welcome
Özür dilerim / Pardon — Excuse me / Sorry
Anlamadım — I don't understand
İngilizce biliyor musunuz? — Do you speak English?
Yardım edebilir misiniz? — Can you help me?

SAYILAR
Bir (1), İki (2), Üç (3), Dört (4), Beş (5), Altı (6), Yedi (7), Sekiz (8), Dokuz (9), On (10)
Yirmi (20), Otuz (30), Elli (50), Yüz (100), Bin (1000)

YÖN SORMA VE ULAŞIM
Nerede? — Where?
... nerede? — Where is ...?
Buradan uzak mı? — Is it far from here?
Sağa dönün — Turn right
Sola dönün — Turn left
Düz gidin — Go straight
Otobüs durağı nerede? — Where is the bus stop?
Bilet ne kadar? — How much is the ticket?
Taksi çağırabilir misiniz? — Can you call a taxi?

RESTORAN VE ALIŞVERİŞ
Menü, lütfen — Menu, please
Hesap, lütfen — The bill, please
Bu ne kadar? — How much is this?
Çok lezzetli — Very delicious
Su, lütfen — Water, please
Vejetaryen yemekleriniz var mı? — Do you have vegetarian dishes?
Kredi kartı geçiyor mu? — Do you accept credit cards?
Afiyet olsun — Enjoy your meal (yemekten önce/sonra söylenir)

ACİL DURUMLAR
İmdat! — Help!
Doktora ihtiyacım var — I need a doctor
En yakın hastane nerede? — Where is the nearest hospital?
Polis çağırın — Call the police
Kayboldum — I'm lost
Pasaportumu kaybettim — I lost my passport

GÜNLÜK HAYATTA SIK DUYACAKLARINIZ
Buyurun — Here you go / Please, go ahead (çok yönlü, kibar bir ifade)
Hoş geldiniz — Welcome
Hoş bulduk — Thank you (welcome'a karşılık verilen standart cevap)
Kolay gelsin — Said to someone working, roughly "may it be easy for you"
Allah'a emanet ol / Güle güle kullanın — informal well-wishing phrases you may hear from shopkeepers

Bu ifadeleri telefonunuza not almanız veya bir fotoğrafını çekmeniz, çevrimdışıyken bile elinizin altında olmasını sağlar. İyi yolculuklar!`,
  },
];

export function getAllGuides(): GuideArticle[] {
  return [...guides].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return guides.find((g) => g.slug === slug);
}
