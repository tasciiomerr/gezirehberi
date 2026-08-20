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

// Madde 83 — liste formatında 5 yeni makale. Hedef kitle (Rusya/Almanya/
// İngiltere/İran'dan gelen ziyaretçiler) göz önünde bulundurularak konu
// seçildi: sahil kasabaları (İngiltere/Rusya paket turizmi), Karadeniz'in
// yeşil/serin iklimi (İran'dan gelen ziyaretçiler arasında bilinen bir
// tercih nedeni — sıcak iklimden kaçış), UNESCO listesi (milliyet-bağımsız,
// saf gerçek), doğa yürüyüşü (Almanya'nın güçlü trekking kültürü), balon
// turu/manzara (görsel çekicilik, tüm kitlelerde ortak). Her madde bu
// oturumda zaten doğrulanmış/curate edilmiş gerçek yerlerden derlendi —
// yeni bir gerçek uydurulmadı. relatedCitySlugs sadece GERÇEK, bağımsız
// City kaydı olan yerlere işaret ediyor (ilçe-only yerler metinde
// anılabilir ama linklenebilir olmadığı için relatedCitySlugs'a alınmadı).
guides.push(
  {
    slug: "turkiyede-en-iyi-10-sahil-kasabasi",
    title: "Türkiye'de Gezilecek En İyi 10 Sahil Kasabası",
    summary:
      "Ege ve Akdeniz kıyısından Karadeniz'e, Türkiye'nin en sevilen 10 sahil kasabası — kale, koy, marina ve balıkçı limanlarıyla.",
    publishedAt: "2026-08-18",
    relatedCitySlugs: ["amasra", "kas", "bodrum", "fethiye", "marmaris", "cesme", "canakkale"],
    body: `Türkiye'nin kıyı şeridi boyunca, her biri kendine özgü bir karaktere sahip onlarca sahil kasabası bulunur. İşte en çok tercih edilenlerden 10 tanesi.

1. AMASRA (KARADENİZ)
İki koyu ayıran bir kale yarımadası üzerine kurulu, balıkçı tekneleriyle dolu sakin bir Karadeniz kasabası.

2. KAŞ (AKDENİZ)
Berrak sularıyla dalış tutkunlarının favorisi, antik Likya kalıntılarına ve kayaya oyulmuş mezarlara ev sahipliği yapıyor.

3. BODRUM (EGE)
Antik Halikarnassos, Dünyanın Yedi Harikası'ndan Halikarnas Mozolesi'ne ev sahipliği yapmıştı; bugün beyaz badanalı mimarisi ve marinasıyla tanınıyor.

4. FETHİYE (AKDENİZ)
Ölüdeniz'in mavi lagünü ve Babadağ'dan yamaç paraşütüyle bilinir; Likya Yolu yürüyüş rotası buradan başlar.

5. MARMARİS (EGE)
Çam ormanlarının denizle buluştuğu koyları ve Netsel Marina'sıyla, Mavi Yolculuk (gulet) turlarının önemli bir başlangıç noktası.

6. ÇEŞME (EGE)
Alaçatı'nın taş sokakları ve dünya çapında tanınan rüzgar sörfü rüzgarlarıyla ünlü.

7. AYVALIK VE CUNDA ADASI (EGE)
Zeytin bahçeleri ve tarihi Rum mimarisiyle bilinen, Balıkesir'e bağlı şirin bir kıyı beldesi.

8. ÇANAKKALE (MARMARA)
Antik Truva kentine ve I. Dünya Savaşı'nın Gelibolu cephesine ev sahipliği yapan, Dardanel Boğazı kıyısındaki tarihi kent.

9. BOZCAADA (ÇANAKKALE)
Kuzey Ege'de, tarihi Venedik kalesi ve üzüm bağlarıyla bilinen sakin bir ada kasabası.

10. ALANYA (AKDENİZ)
Selçuklu dönemine ait kalesi, Kızıl Kule'si ve altın kumlu Kleopatra Plajı'yla Akdeniz'in büyük tatil merkezlerinden biri.

Bu kasabaların çoğunda konaklama, ulaşım ve gezilecek yer bilgilerini sitemizin ilgili şehir sayfalarında bulabilirsiniz.`,
  },
  {
    slug: "karadenizde-en-yesil-10-yer",
    title: "Türkiye'nin Karadeniz Kıyısında Gezilecek En Yeşil 10 Yer",
    summary:
      "Sıcak iklimden kaçıp serin, yeşil bir doğa deneyimi arayanlar için Karadeniz Bölgesi'nin en bilinen yayla ve doğa noktaları.",
    publishedAt: "2026-08-18",
    relatedCitySlugs: ["trabzon", "rize", "artvin", "giresun", "ordu", "amasra", "sinop"],
    body: `Türkiye'nin Karadeniz kıyısı, yoğun yağış alan iklimi sayesinde ülkenin en yeşil ve serin bölgesidir — özellikle sıcak ve kurak bir iklimden gelenler için belirgin bir kontrast sunar.

1. UZUNGÖL (TRABZON)
Dağların arasına sıkışmış, sisli ve yeşil bir göl manzarasıyla bölgenin en tanınmış doğa noktalarından biri.

2. AYDER YAYLASI (RİZE)
Kaçkar Dağları'nın eteğinde, kaplıcaları ve yayla evleriyle bilinen bir yükseklik turizmi merkezi. Rize ili genelinde uzanan çay bahçeleri de bölgenin karakteristik yeşil dokusunu oluşturur.

3. KAÇKAR DAĞLARI VE KARAGÖL (ARTVİN)
Derin vadileri, Karagöl Milli Parkı ve el değmemiş yaylalarıyla Türkiye'nin en yeşil illerinden biri.

4. GİRESUN ADASI VE FINDIK BAHÇELERİ (GİRESUN)
Türkiye'nin fındık üretiminin kalbi olan bölge, yemyeşil tepeleriyle de tanınır.

5. BOZTEPE (ORDU)
Teleferikle çıkılan, kente ve fındık bahçelerine tepeden bakan panoramik bir seyir noktası.

6. AMASRA VE KIYI ORMANLARI (BARTIN)
Sahil ile orman dokusunun iç içe geçtiği, sakin bir Batı Karadeniz kasabası.

7. SİNOP YARIMADASI
Türkiye'nin en kuzey noktasında, koyları ve yeşil doğasıyla bilinen bir yarımada kenti.

8. EFTENİ GÖLÜ (DÜZCE)
Göçmen kuşların konakladığı, sulak alan ekosistemine sahip bir doğa gözlem noktası.

9. MUNZUR VADİSİ MİLLİ PARKI (TUNCELİ)
Karadeniz'in değil Doğu Anadolu'nun bir parçası olsa da, benzer şekilde yoğun yeşil doku ve akarsu vadileriyle bilinir.

10. KÜRE DAĞLARI MİLLİ PARKI (KASTAMONU)
El değmemiş orman örtüsüyle bilinen, Batı Karadeniz'in doğa turizmi noktalarından biri.

Bu bölgeyi ziyaret etmeyi planlıyorsanız, yoğun yağış alan bir iklim olduğu için yanınıza yağmurluk almanız faydalı olacaktır.`,
  },
  {
    slug: "turkiyede-unesco-dunya-mirasi-yerleri",
    title: "Türkiye'de UNESCO Dünya Mirası Listesindeki Yerler",
    summary:
      "Türkiye'de UNESCO Dünya Mirası Listesi'ne kayıtlı, tarihi ve doğal açıdan evrensel değere sahip başlıca yerler.",
    publishedAt: "2026-08-18",
    relatedCitySlugs: ["safranbolu", "canakkale", "kapadokya", "denizli", "kars", "diyarbakir", "adiyaman", "sanliurfa", "malatya", "istanbul"],
    body: `UNESCO Dünya Mirası Listesi, evrensel değere sahip kültürel ve doğal alanları tanımlar. Türkiye, bu listede çok sayıda yerle temsil edilir — işte bilinen başlıcaları.

SAFRANBOLU (1994)
İyi korunmuş Osmanlı dönemi sivil mimarisi — ahşap konaklar ve tarihi çarşı dokusuyla.

TRUVA ANTİK KENTİ, ÇANAKKALE (1998)
Homeros'un İlyada'sına konu olan, dokuz farklı yerleşim katmanına sahip antik kent.

GÖREME MİLLİ PARKI VE KAPADOKYA KAYA SİTLERİ (1985)
Peri bacaları, kaya oyma kiliseler ve yeraltı şehirleriyle bilinen benzersiz bir jeolojik ve tarihi alan.

HİERAPOLİS-PAMUKKALE, DENİZLİ (1988)
Beyaz traverten terasları ve üzerindeki Roma dönemi kaplıca kenti Hierapolis'in kalıntıları.

ANİ ARKEOLOJİK ALANI, KARS (2016)
Orta Çağ'da önemli bir Ermeni krallık başkenti olan, günümüzde harabe halindeki tarihi kent.

DİYARBAKIR SURLARI VE HEVSEL BAHÇELERİ (2015)
Dünyanın en uzun ve iyi korunmuş şehir surlarından biri, Dicle Nehri kıyısındaki tarihi bahçelerle birlikte.

NEMRUT DAĞI, ADIYAMAN (1987)
Kommagene Kralı I. Antiokhos'un anıt-mezarındaki dev taş heykel başlarıyla bilinen ikonik arkeolojik alan.

GÖBEKLİTEPE, ŞANLIURFA (2018)
Bilinen en eski anıtsal tapınak komplekslerinden biri, insanlık tarihinin en eski yerleşim izlerini taşır.

ARSLANTEPE HÖYÜĞÜ, MALATYA (2021)
Erken devlet organizasyonuna dair önemli arkeolojik buluntularıyla bilinen bir höyük.

İSTANBUL'UN TARİHİ ALANLARI (1985)
Sultanahmet bölgesindeki Ayasofya, Topkapı Sarayı ve çevresindeki tarihi doku dahil olmak üzere kentin çok katmanlı mirası.

Bu listedeki her alan, ülke çapında farklı bölgelere dağılmış durumda — bir gezi planı yaparken birkaçını aynı bölge içinde birleştirmek mümkün (örn. Kapadokya ve çevresi, ya da Güneydoğu Anadolu'daki Diyarbakır-Nemrut-Göbeklitepe üçgeni).`,
  },
  {
    slug: "turkiyede-doga-yuruyusu-icin-en-iyi-bolgeler",
    title: "Türkiye'de Doğa Yürüyüşü ve Trekking İçin En İyi Bölgeler",
    summary:
      "Likya Yolu'ndan Kaçkar Dağları'na, Türkiye'de doğa yürüyüşü ve trekking için bilinen başlıca rotalar ve bölgeler.",
    publishedAt: "2026-08-18",
    relatedCitySlugs: ["kas", "fethiye", "rize", "artvin", "aksaray", "tunceli", "antalya"],
    body: `Türkiye, farklı zorluk seviyelerinde uzun mesafe yürüyüş rotalarına ve doğal güzelliklere sahip birçok bölge sunar.

LİKYA YOLU (FETHİYE - ANTALYA)
Türkiye'nin en bilinen uzun mesafe yürüyüş rotalarından biri; antik Likya uygarlığının kalıntıları boyunca Akdeniz kıyısını takip eder, Fethiye'den başlar.

KAÇKAR DAĞLARI (RİZE - ARTVİN)
Yüksek dağ gölleri, yaylalar ve zengin bitki örtüsüyle bilinen, daha zorlu rotalar arayan yürüyüşçüler için popüler bir dağ silsilesi.

IHLARA VADİSİ (AKSARAY)
Kanyonun tabanında ilerleyen, kayaya oyulmuş kiliselerin eşlik ettiği daha kolay ve erişilebilir bir vadi yürüyüşü.

MUNZUR VADİSİ MİLLİ PARKI (TUNCELİ)
Akarsu vadileri ve zengin doğasıyla bilinen, daha az bilinen ama etkileyici bir doğa yürüyüşü alanı.

KAPADOKYA VADİLERİ (NEVŞEHİR)
Kızıl Vadi, Güvercinlik Vadisi gibi rotalarda peri bacaları arasında yürüyüş yapma imkanı sunar; genellikle gün batımı manzarasıyla birleştirilir.

TOROS DAĞLARI (ANTALYA VE ISPARTA ÇEVRESİ)
Akdeniz kıyı şeridinin hemen arkasında yükselen dağ silsilesi, hem kısa hem uzun rotalar için çeşitli seçenekler barındırır.

Yürüyüş rotalarına çıkmadan önce mevsim koşullarını (özellikle yüksek rakımlı rotalarda kar/erime dönemleri) ve güncel yol durumunu yerel kaynaklardan teyit etmenizi öneririz.`,
  },
  {
    slug: "balon-turu-ve-nefes-kesen-manzaralar",
    title: "Türkiye'de Balon Turu ve Nefes Kesen Manzaralar İçin En İyi Yerler",
    summary:
      "Sıcak hava balonu turlarından gün doğumu manzaralarına, Türkiye'nin en etkileyici görsel deneyimlerini sunan yerler.",
    publishedAt: "2026-08-18",
    relatedCitySlugs: ["kapadokya", "adiyaman", "trabzon", "denizli", "rize"],
    body: `Türkiye, sıcak hava balonu turlarından doğal terasların ve dağ zirvelerinin sunduğu manzaralara kadar birçok görsel açıdan etkileyici deneyim sunar.

KAPADOKYA'DA SICAK HAVA BALONU TURU (NEVŞEHİR)
Türkiye'nin en tanınmış balon turu rotası — gün doğumunda yüzlerce rengarenk balonun peri bacaları üzerinde süzülmesi dünya çapında bilinen bir manzaradır.

NEMRUT DAĞI'NDA GÜN DOĞUMU (ADIYAMAN)
Dev taş heykel başlarının siluetleri eşliğinde izlenen gün doğumu, bölgenin en bilinen deneyimlerinden biri.

SÜMELA MANASTIRI (TRABZON)
Bir kayalığın dik yamacına inşa edilmiş Rum Ortodoks manastırı, hem mimarisi hem konumuyla etkileyici bir manzara sunar.

PAMUKKALE'NİN BEYAZ TRAVERTENLERİ (DENİZLİ)
Pamuk gibi beyaz kalsiyum teraslarının güneş ışığıyla aldığı görünüm, dünya çapında tanınan bir doğa manzarasıdır.

AYDER YAYLASI VE KAÇKAR DAĞLARI (RİZE)
Sisli dağ manzaraları ve yeşil yaylalarıyla, özellikle bulutların vadiler arasında süzüldüğü anlarda etkileyici bir görsel deneyim sunar.

Bu deneyimlerin çoğu mevsime ve hava koşullarına bağlıdır — özellikle balon turları rüzgar nedeniyle sık sık iptal edilebilir, bu yüzden esnek bir seyahat planı yapmanız önerilir.`,
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
