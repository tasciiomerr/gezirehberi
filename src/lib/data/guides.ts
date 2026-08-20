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
  {
    slug: "turkiye-vize-pasaport-bilgisi",
    title: "Türkiye'ye Seyahat İçin Vize ve Pasaport Bilgisi",
    summary:
      "Türkiye'yi ziyaret edecek yabancı turistler için vize gereklilikleri, e-Vize sistemi ve pasaport süresi hakkında genel bilgilendirme.",
    publishedAt: "2026-08-17",
    body: `Bu sayfa genel bir bilgilendirme amaçlıdır — vize kuralları ülkeden ülkeye ve zaman içinde değişebilir. Seyahatinizden önce mutlaka Türkiye Cumhuriyeti Dışişleri Bakanlığı'nın resmi e-Vize sitesini (evisa.gov.tr) veya bulunduğunuz ülkedeki Türk konsolosluğunu kontrol edin. Buradaki bilgiler yerine geçmez, sadece genel bir yönlendirmedir.

PASAPORT SÜRESİ
Türkiye'ye giriş için pasaportunuzun genellikle giriş tarihinden itibaren en az 60 gün geçerli olması istenir (bazı ülke vatandaşları için bu süre farklı olabilir). Pasaportunuzun son kullanma tarihini seyahatten önce mutlaka kontrol edin.

E-VİZE SİSTEMİ
Birçok ülke vatandaşı, Türkiye'nin resmi e-Vize (e-Visa) sistemi üzerinden internet üzerinden başvuru yaparak kısa süreli (genellikle 30 veya 90 gün) turistik vize alabilir. Başvuru tamamen evisa.gov.tr adresinden yapılır — bu, tek resmi kanaldır. Üçüncü parti "vize danışmanlığı" sitelerine ekstra ücret ödemenize gerek yoktur.

VİZE MUAFİYETİ
Bazı ülke vatandaşları (çoğunlukla belirli bir süre için, örneğin 90 gün) vizesiz giriş hakkına sahiptir. Ülkenize özel durumu resmi kaynaklardan doğrulayın.

GÜMRÜKTE DİKKAT EDİLECEKLER
Türkiye'ye girerken/çıkarken belirli miktarların üzerindeki nakit para, değerli eşya ve bazı ürünler (antika, bazı gıda/bitki ürünleri) beyan gerektirebilir. Kesin sınırlar için Ticaret Bakanlığı'nın gümrük mevzuatına bakın.

SEYAHAT SİGORTASI
Zorunlu olmasa da, sağlık giderlerini kapsayan bir seyahat sigortası yaptırmanız şiddetle önerilir.

ÖZETLE
Vize durumunuzu her zaman resmi kaynaktan (evisa.gov.tr veya konsolosluk) teyit edin, pasaportunuzun geçerlilik süresini kontrol edin, ve seyahat sigortası yaptırmayı ihmal etmeyin.`,
  },
  {
    slug: "turkiye-acil-durum-numaralari",
    title: "Türkiye'de Acil Durum Numaraları",
    summary:
      "Türkiye'de seyahat ederken ihtiyaç duyabileceğiniz tüm acil durum telefon numaraları tek sayfada.",
    publishedAt: "2026-08-17",
    body: `Türkiye'de acil bir durumla karşılaşırsanız aşağıdaki numaraları arayabilirsiniz. Tüm bu numaralar ücretsizdir ve Türkiye genelinde geçerlidir.

112 — TEK ACİL ÇAĞRI NUMARASI
Türkiye'de tüm acil durumlar (sağlık, yangın, polis, jandarma, afet) için önce 112'yi aramanız yeterlidir — operatör sizi doğru birime yönlendirir. Yabancı diller (özellikle İngilizce) genellikle destekleniyor olsa da, aceleyle arandığında dil bariyeri yaşanabilir; mümkünse bulunduğunuz konumu (şehir/ilçe adı) net şekilde belirtin.

155 — POLİS
Şehir merkezlerinde güvenlikle ilgili acil durumlar için.

156 — JANDARMA
Kırsal alanlarda ve şehir dışında güvenlik olayları için (jandarma, kırsal bölgelerin güvenliğinden sorumludur).

110 — İTFAİYE
Yangın ve bazı kurtarma operasyonları için.

122 — SAHİL GÜVENLİK
Denizde yaşanan acil durumlar için.

177 — ORMAN YANGINI İHBAR HATTI
Orman yangını gördüğünüzde.

184 — SAĞLIK BAKANLIĞI DANIŞMA HATTI
Acil olmayan sağlık soruları için.

DİĞER ÖNEMLİ NUMARALAR
AFAD (Afet ve Acil Durum Yönetimi) — 122
Alo Turist Hattı (turizm şikayeti/danışma) — 157

KONSOLOSLUK BİLGİSİ
Ciddi bir hukuki sorun, pasaport kaybı veya benzeri bir durumda kendi ülkenizin Türkiye'deki büyükelçilik veya konsolosluğuyla iletişime geçmeniz gerekebilir — seyahat öncesi konsolosluğunuzun İstanbul, Ankara veya en yakın şehirdeki iletişim bilgilerini not almanızı öneririz.

Bu numaraları seyahatinizden önce telefonunuza kaydetmeniz, acil bir durumda zaman kazandırır.`,
  },
  {
    slug: "bahsis-pazarlik-kulturu",
    title: "Türkiye'de Bahşiş ve Pazarlık Kültürü",
    summary:
      "Restoranlarda ne kadar bahşiş bırakmalısınız, çarşıda pazarlık nasıl yapılır? Türkiye'nin bahşiş ve pazarlık kültürüne kısa bir rehber.",
    publishedAt: "2026-08-17",
    body: `Türkiye'de bahşiş ve pazarlık, bölgeye ve mekana göre değişen, yazılı olmayan ama yaygın bilinen kurallara sahip bir kültür. İşte bilmeniz gerekenler.

BAHŞİŞ — NE ZAMAN, NE KADAR?
Restoranlarda bahşiş zorunlu değildir ama yaygındır. Hesabın yaklaşık %5-10'u kadar bahşiş bırakmak nazik karşılanır — özellikle turistik bölgelerde ve tam hizmet veren restoranlarda. Bazı işletmeler hesaba otomatik "servis ücreti" ekleyebilir; bu durumda ayrıca bahşiş bırakmak zorunda değilsiniz, hesabı kontrol edin.
Kafelerde ve büfelerde bahşiş genellikle beklenmez, ama üstü kalan bozuk parayı bırakmak yaygın bir davranıştır.
Taksilerde bahşiş genellikle beklenmez; ücreti yuvarlamak (örn. 47 TL yerine 50 TL) yeterlidir.
Otel personeline (kapıcı, oda temizliği) küçük banknotlarla (20-50 TL civarı) bahşiş bırakmak yaygındır.
Tur rehberlerine ve şoförlere, özellikle çok günlük turlarda, günlük bazlı bir bahşiş (rehber için genelde şoförden fazla) bırakmak gelenekseldir.

PAZARLIK — NEREDE YAPILIR, NEREDE YAPILMAZ?
Pazarlık kültürü Türkiye'de esas olarak kapalı çarşılar, turistik hediyelik eşya dükkanları, halı/kilim mağazaları ve bazı pazar tezgahlarında geçerlidir.
Süpermarketlerde, zincir mağazalarda, restoranlarda ve fiyat etiketi olan çoğu perakende dükkanda pazarlık yapılmaz — fiyat sabittir.
Pazarlık yaparken kaba olmayın; satıcının ilk söylediği fiyatın genellikle %20-40 üzerinde başladığını bilerek, kibarca karşı teklif verin. Gülümseyerek ve sohbet ederek pazarlık yapmak, Türkiye'de bu deneyimin bir parçasıdır — aceleci veya agresif bir tavır genellikle tam tersi etki yapar.
Bir ürünle ilgilenmiyorsanız fiyat sormaktan çekinmeyin; ancak bir fiyatta anlaştıktan sonra almaktan vazgeçmek nezaketsizlik sayılabilir.

KISA ÖZET
Restoran: %5-10 bahşiş normal. Taksi: yuvarlama yeterli. Kapalı çarşı/hediyelik eşya: pazarlık yapılabilir ve beklenir. Süpermarket/zincir mağaza: pazarlık yok, sabit fiyat.`,
  },
  {
    slug: "solo-gezgin-guvenlik-notlari",
    title: "Türkiye'de Solo Seyahat Edenler İçin Güvenlik Notları",
    summary:
      "Türkiye'yi tek başına gezenler için genel güvenlik tavsiyeleri: ulaşım, konaklama, gece güvenliği ve acil durum hazırlığı.",
    publishedAt: "2026-08-18",
    body: `Türkiye, tek başına seyahat edenler için genel olarak güvenli bir ülke olsa da, herhangi bir yerde olduğu gibi biraz hazırlık ve dikkat işinizi kolaylaştırır. İşte bilinen, genel-geçer seyahat güvenliği tavsiyeleri.

ULAŞIM
Resmi taksi uygulamalarını (BiTaksi, Uber) veya sarı/turkuaz resmi taksileri tercih edin; taksimetrenin açık olduğundan emin olun. Gece geç saatlerde, özellikle tanımadığınız bir şehirde, yürüyerek uzun mesafeler kat etmek yerine taksi/uygulama tercih edin.
Otobüs/tren biletlerinizi mümkünse önceden online alın — büyük terminallerde son dakika kalabalığı ve yönlendirme karmaşası yaşanabilir.

KONAKLAMA
Rezervasyon yaparken gerçek yorumları olan, puanı düşük olmayan yerleri tercih edin. Giriş yaptığınızda oda kapısının/kilidin sağlam çalıştığını kontrol edin.
Konumunuzu (otel adı, oda numarası değil ama şehir/semt) güvendiğiniz birine bildirmek, özellikle uzun süreli solo seyahatlerde iyi bir alışkanlıktır.

GECE GÜVENLİĞİ
Büyük şehirlerin turistik ve kalabalık ana caddeleri genelde gece de hareketlidir ve güvenlidir; ıssız, az aydınlatılmış sokaklardan gece kaçının.
Alkol tükettiğiniz mekanlarda içeceğinizi masada yalnız bırakmayın, tanımadığınız kişilerden içecek kabul ederken dikkatli olun — bu, dünyanın her yerinde geçerli genel bir tavsiyedir.

KADIN SOLO GEZGİNLER İÇİN
Türkiye'nin büyük şehir ve turistik bölgelerinde kadın solo gezginler yaygın; yine de muhafazakâr giyim kurallarının olduğu cami gibi mekanlarda buna uyum göstermek (omuz/diz kapatma, kadınlar için başörtüsü bazı camilerde) hem saygılı hem sorunsuz bir ziyaret sağlar.
Rahatsız edici bir yaklaşımla karşılaşırsanız kararlı ve net bir şekilde "hayır" demekten çekinmeyin; kalabalık, aydınlık bir mekana yönelin.

DİJİTAL HAZIRLIK
Pasaportunuzun ve önemli belgelerinizin fotoğrafını/taramasını bulutta (e-posta, güvenli bir uygulama) yedekleyin.
Türkiye'deki yerel bir SIM kart veya uluslararası veri paketi almak, çevrimdışı kalmadan harita/çeviri uygulamalarını kullanabilmenizi sağlar.
Acil durum numaralarını (bkz. "Türkiye'de Acil Durum Numaraları" rehberimiz — 112 tek acil çağrı numarası) telefonunuza önceden kaydedin.

GENEL SAĞDUYU
Değerli eşyalarınızı (pasaport, nakit, kart) tek bir çantada değil dağıtarak taşıyın. Kalabalık turistik alanlarda (çarşı, toplu taşıma) çantanızı önünüzde tutun.
Bir şey "çok iyi görünüyorsa" (aşırı ucuz tur, tanımadığınız birinin "özel indirim" teklifi), sağduyunuzu kullanın — bu, dünyanın her yerinde geçerli bir kural.

Bu notlar genel, herkesçe bilinen seyahat güvenliği tavsiyeleridir; herhangi bir şehre veya bölgeye özgü güncel bir güvenlik uyarısı için seyahat öncesi kendi ülkenizin dışişleri bakanlığının Türkiye seyahat tavsiyelerini kontrol etmenizi öneririz.`,
  },
];

// Şehir bazlı "1 gün, X TL bütçeyle" içerik serisi (madde ek — birkaç örnek
// şehirle başlanıyor). Rakamlar uydurma değil, ilgili şehrin kendi curated
// city.budget/budgetBreakdown alanlarından birebir alınmıştır (bkz.
// src/lib/data/cities/karadeniz.ts, marmara-extra4.ts) — bu makaleler o
// gerçek rakamları yeniden bir araya getirip yorumluyor, yeni bir fiyat
// icat etmiyor.
guides.push(
  {
    slug: "amasrada-1-gun-butce-rehberi",
    title: "Amasra'da 1 Gün, 1.000-1.500 TL Bütçeyle Neler Yapılır?",
    summary: "Amasra'yı günübirlik ziyaret edenler için gerçekçi bir bütçe planı: konaklama, yemek ve aktivite kalemleri.",
    publishedAt: "2026-08-17",
    relatedCitySlugs: ["amasra"],
    body: `Amasra, günübirlik ya da kısa bir kaçamak için ideal, kompakt bir Karadeniz kasabası. Kişi başı günlük 1.000-1.500 TL'lik orta segment bir bütçeyle rahat bir gün geçirebilirsiniz.

KONAKLAMA (eğer geceleyecekseniz)
2 yıldızlı bir pansiyon: 400-600 TL
3+ yıldızlı bir otel: 800-1.200 TL

YEME-İÇME
Yerel restoranlarda günlük: 150-300 TL. Küçük Liman ve Büyük Liman çevresindeki balıkçı lokantaları, taze av balığıyla bu aralıkta doyurucu bir öğün sunar.

AKTİVİTELER
Amasra Kalesi ve çevresindeki gezilecek yerlerin çoğu (kale surları, Küçük Liman, Çekiciler Çarşısı) ücretsizdir — bu kalemde günlük 50-150 TL yeterli, çünkü çoğu doğal/açık alan gezisi ücret gerektirmiyor.

ULAŞIM
Kasaba içi minibüs/yerel ulaşım: günlük 10-20 TL. Amasra'nın merkezi kompakt olduğu için çoğu yeri yürüyerek gezebilirsiniz.

GÜNÜN TOPLAMI
Konaklama hariç (günübirlik ziyaretçiyseniz) yaklaşık 250-450 TL'ye Amasra'nın tadını çıkarabilirsiniz; bir gece konaklamayı da eklerseniz toplam bütçe 1.000-1.500 TL aralığına oturur.`,
  },
  {
    slug: "safranboluda-1-gun-butce-rehberi",
    title: "Safranbolu'da 1 Gün, 900-1.800 TL Bütçeyle Neler Yapılır?",
    summary: "UNESCO'lu Safranbolu'yu bir günde gezmek isteyenler için gerçekçi bir bütçe kırılımı.",
    publishedAt: "2026-08-17",
    relatedCitySlugs: ["safranbolu"],
    body: `Safranbolu'nun tarihi çarşısını ve konaklarını bir günde gezmek, kişi başı 900-1.800 TL aralığında bir bütçeyle mümkün.

KONAKLAMA (isteğe bağlı)
Standart bir konak-otel: 500-800 TL
Üst segment bir konak deneyimi: 1.200 TL ve üzeri

YEME-İÇME
Günlük yerel restoran harcaması: 150-300 TL. Çarşı içindeki geleneksel Safranbolu mutfağı sunan restoranlar (köfte, höşmerim, kuyu kebabı) bu bütçeye rahatça sığar.

AKTİVİTELER VE MÜZE GİRİŞLERİ
Günlük 100-200 TL — Kaymakamlar Evi Müzesi gibi müze girişleri genelde 40 TL civarında, çoğu tarihi sokak gezisi ise ücretsiz.

ULAŞIM
Çarşı tamamen yaya dostu olduğu için günlük ulaşım maliyeti yaklaşık 50 TL (Yukarı Çarşı-Kıranköy arası taksi/dolmuş gibi kısa transferler için).

GÜNÜN TOPLAMI
Günübirlik bir ziyaret için (konaklama hariç) yaklaşık 300-550 TL yeterli; bir gece konaklamayı eklediğinizde toplam 900-1.800 TL aralığına ulaşır — bu da Safranbolu'nun kendi curated bütçe verisiyle birebir örtüşüyor.`,
  },
  {
    slug: "canakkalede-1-gun-butce-rehberi",
    title: "Çanakkale'de 1 Gün, 900-1.700 TL Bütçeyle Neler Yapılır?",
    summary: "Truva ve Çanakkale Boğazı'nı bir günde keşfetmek isteyenler için gerçekçi bir bütçe planı.",
    publishedAt: "2026-08-17",
    relatedCitySlugs: ["canakkale"],
    body: `Çanakkale merkezi kompakt bir şehir olduğu için, Truva'yı da içeren bir günü kişi başı 900-1.700 TL aralığında bir bütçeyle geçirebilirsiniz (Bozcaada/Gökçeada gibi feribotla ulaşılan adalar bu bütçenin dışında, ayrı bir gün planı gerektirir).

KONAKLAMA (isteğe bağlı)
Günlük konaklama: 600-1.000 TL

YEME-İÇME
Günlük yerel restoran harcaması: 200-350 TL. Boğaz kıyısındaki restoranlar taze deniz ürünleri ve meşhur Çanakkale peyniriyle bu aralıkta doyurucu seçenekler sunuyor.

AKTİVİTELER (müze, tur)
Günlük 100-300 TL — Truva Antik Kenti'nin giriş ücreti bu kalemin büyük kısmını oluşturur.

ULAŞIM
Günlük 50-90 TL — şehir merkezi kompakt olsa da Truva ve Gelibolu gibi merkez dışı noktalara araç kiralama veya organize tur önerilir, bu da ulaşım kalemini biraz yükseltir.

GÜNÜN TOPLAMI
Konaklama hariç günlük yaklaşık 350-650 TL; bir gece konaklamayla toplam bütçe 900-1.700 TL aralığında kalır.`,
  }
);

export function getAllGuides(): GuideArticle[] {
  return [...guides].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return guides.find((g) => g.slug === slug);
}

// Madde 84 — relatedCitySlugs'ın ters yönü: bir şehir sayfasından, o şehri
// referans alan rehber makalelerine link vermek için (rehberden şehre link
// zaten madde 85'te eklendi, bu onun karşı yönü).
export function getGuidesForCity(citySlug: string): GuideArticle[] {
  return guides.filter((g) => g.relatedCitySlugs?.includes(citySlug));
}
