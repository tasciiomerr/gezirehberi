// Parti (madde 82-83, 146-154) — "Bu şehir neyle ünlü?" kısa, Google öne
// çıkan snippet formatına uygun paragraflar. PİLOT: sadece 6 şehir, onay
// bekleniyor. Kural: sadece genel bilinen, doğrulanabilir gerçekler
// (tarihi olaylar, UNESCO statüsü, ünlü yöresel ürün) — hiçbir nüfus
// rakamı, istatistik, tarih uydurulmadı; emin olunmayan kesin sayısal
// iddialardan (örn. "dünyada 1 numara") kaçınılıp "önde gelen" gibi
// temkinli ifadeler kullanıldı. Mevcut curated City dosyalarına
// dokunulmadı — ayrı bir overlay katmanı (contentDates.json/confusablePlaces.ts
// ile aynı desen), sadece bu listedeki citySlug'lar için şehir sayfasında
// render ediliyor.
export const CITY_KNOWN_FOR: Record<string, string> = {
  istanbul:
    "İstanbul, biri Avrupa'da biri Asya'da olmak üzere iki kıtaya birden yayılan tek büyük şehir olmasıyla tanınır. Bizans İmparatorluğu (Konstantinopolis olarak) ve ardından Osmanlı İmparatorluğu'na yüzyıllarca başkentlik yapmıştır. Ayasofya — önce bir Bizans katedrali, sonra cami, uzun süre müze, günümüzde yeniden cami — ve Sultanahmet (Mavi) Camii şehrin simge yapılarındandır. Kapalıçarşı, dünyanın en eski ve en büyük kapalı çarşılarından biri kabul edilir. Topkapı Sarayı, yaklaşık 400 yıl boyunca Osmanlı padişahlarının idari ve ikametgah merkezi olmuştur. Boğaziçi, şehri fiziksel olarak iki kıtaya ayıran boğazdır.",
  kapadokya:
    "Kapadokya, volkanik tüf kayaçların binlerce yıllık erozyonuyla oluşan 'peri bacası' adı verilen ilginç kaya formasyonlarıyla ünlüdür. Bölge, sıcak hava balonu turlarının dünya çapında en tanınmış rotalarından biri haline gelmiştir. Erken dönem Hristiyanların sığınak ve ibadet amacıyla kayaları oyarak inşa ettiği Derinkuyu ve Kaymaklı gibi yeraltı şehirleri ile duvarlarında Bizans dönemi fresklerini barındıran kaya kiliseleri bölgenin tarihi zenginliğini gösterir. Göreme Milli Parkı ve Kapadokya Kaya Sitleri, 1985 yılında UNESCO Dünya Mirası Listesi'ne alınmıştır.",
  antalya:
    "Antalya, Türkiye'nin Akdeniz kıyısındaki en bilinen turizm merkezlerinden biridir ve antik Pamfilya bölgesinde yer alır. Roma dönemine ait Hadrian Kapısı ve şehir merkezindeki Düden Şelalesi başlıca simgeleri arasındadır. Çevresindeki antik kentler — bugün hâlâ etkinliklerde kullanılan Roma tiyatrosuyla Aspendos, dağ yamacına kurulu Termessos ve liman kenti Perge — bölgeyi antik dünya mirası açısından da önemli kılar. Şehir, modern plaj turizminin Türkiye'deki başlıca kapılarından biri olarak bilinir.",
  safranbolu:
    "Safranbolu, iyi korunmuş Osmanlı dönemi sivil mimarisiyle tanınır ve 1994 yılında UNESCO Dünya Mirası Listesi'ne alınmıştır. Geleneksel ahşap-kerpiç Safranbolu evleri ve tarihi Cinci Han kervansarayı, kentin Osmanlı-Cenevizli ticaret yolu üzerindeki tarihi konumunu yansıtır. Adını, bölgede yetiştirilen safran bitkisinden aldığı düşünülür. Safranbolu ayrıca Türk lokumu ve geleneksel el sanatlarıyla da bilinir.",
  bodrum:
    "Bodrum, antik çağda Halikarnassos olarak bilinirdi ve Dünyanın Yedi Harikası'ndan biri sayılan Halikarnas Mozolesi'ne (Kral Mausolos'un anıt mezarı — 'mozole' kelimesinin kökeni) ev sahipliği yapmıştır. Bodrum Kalesi (Aziz Petrus Kalesi), Rodoslu Şövalyeler tarafından inşa edilmiştir ve günümüzde Sualtı Arkeoloji Müzesi'ne ev sahipliği yapmaktadır. Beyaz badanalı mimarisi ve hareketli gece hayatıyla Türkiye'nin en tanınmış Ege tatil beldelerinden biri haline gelmiştir.",
  trabzon:
    "Trabzon, tarihi İpek Yolu'nun Karadeniz'deki önemli liman şehirlerinden biriydi ve 1204-1461 yılları arasında Bizans'ın ardıl devleti olan Trabzon İmparatorluğu'na başkentlik yapmıştır. Şehrin en tanınmış simgelerinden biri, bir kayalığın yamacına inşa edilmiş Rum Ortodoks manastırı Sümela Manastırı'dır. Ayrıca kendi Ayasofyası (İstanbul'dakinden farklı, Bizans dönemine ait, cami-müze-cami dönüşümü yaşamış bir yapı) ile bilinir. Bölge, Türkiye'nin önde gelen fındık üretim merkezlerinden biri olarak da tanınır.",

  // --- Parti 2/Karadeniz (kalan 16 şehir) ---
  amasra:
    "Amasra, antik çağda Amastris olarak bilinen küçük bir Karadeniz sahil kasabasıdır; adını, bölgeyi yöneten bir Pers prensesinden aldığı düşünülür. Bizans ve Ceneviz dönemlerinden kalma sur ve kale kalıntılarının bulunduğu bir yarımada üzerinde kuruludur. Kasabanın Büyük Liman ve Küçük Liman adlı iki doğal koyu, karakteristik görünümünü oluşturur. Küçük ölçeği, balıkçı kasabası dokusu ve tarihi dokusuyla Karadeniz kıyısının bilinen günübirlik gezi noktalarından biridir.",
  amasya:
    "Amasya, Yeşilırmak vadisine hakim kayalıklara oyulmuş Pontus Krallığı dönemi kral mezarlarıyla tanınır. Antik coğrafyacı ve tarihçi Strabon'un doğduğu şehir (antik adıyla Amaseia) olması, kentin antik dönemdeki önemini gösterir. Osmanlı döneminde şehzadelerin sancak eğitimi için gönderildiği şehirlerden biri olmuştur. Nehir kıyısı boyunca sıralanan tarihi Osmanlı konakları, kentin en tanınmış görüntülerinden biridir.",
  artvin:
    "Artvin, Kafkasya'ya yakınlığı nedeniyle Gürcü ve Laz kültürlerinin izlerini taşıyan, dağlık ve ormanlık bir Karadeniz ilidir. Çoruh Nehri vadisi boyunca uzanan derin kanyonlarıyla bilinir. Karagöl Milli Parkı ve yüksek yaylaları (Kafkasör Yaylası gibi), doğa ve yayla turizminin önemli noktalarındandır. Her yıl düzenlenen geleneksel yayla şenlikleri, bölgenin canlı halk kültürünün bir yansımasıdır.",
  bayburt:
    "Bayburt, tarihi İpek Yolu'nun Trabzon'u Erzurum ve İran'a bağlayan koluna hakim, yüksek rakımlı bir Doğu Karadeniz ilidir. Şehre adını veren Bayburt Kalesi, kenti tepeden gören, Bizans ve sonrasında Selçuklu-Osmanlı dönemlerinde kullanılmış tarihi bir kaledir. Sarp ve dağlık coğrafyası, tarih boyunca şehrin stratejik bir geçit noktası olmasını sağlamıştır.",
  bolu:
    "Bolu, İstanbul ile Ankara arasındaki tarihi kervan ve karayolu güzergahı üzerinde yer alan, ormanlarıyla tanınan bir ildir. Abant Gölü, doğa yürüyüşü ve göl turizmiyle ülke genelinde bilinen bir varış noktasıdır. Bolu'nun Mengen ilçesi, Türkiye'de geleneksel olarak profesyonel aşçı yetiştirmesiyle tanınır ve bu yüzden şehir halk arasında 'aşçılar diyarı' olarak anılır.",
  corum:
    "Çorum ili sınırları içinde yer alan Hattuşa (Boğazköy), eski Hitit İmparatorluğu'nun başkentiydi ve 1986'da UNESCO Dünya Mirası Listesi'ne alınmıştır; yakınındaki Yazılıkaya açık hava kaya tapınağıyla birlikte bölgenin en önemli arkeolojik alanlarındandır. Şehir ayrıca kendine özgü bir leblebi (kavrulmuş nohut) üretim geleneğiyle de tanınır.",
  duzce:
    "Düzce, yoğun orman örtüsü ve akarsularıyla bilinen, Batı Karadeniz'in girişinde yer alan bir ildir. Efteni Gölü, göçmen kuşların konakladığı sulak alanlardan biri olarak doğa gözlemciliği açısından tanınır. Bölgenin yeşil, dağlık coğrafyası; yayla turizmi ve doğa yürüyüşü rotalarıyla öne çıkar.",
  giresun:
    "Giresun'un antik adı Kerasus'tur ve kirazın Roma'ya bu bölgeden götürüldüğü, İngilizcedeki 'cherry' (kiraz) kelimesinin kökeninin bu antik isme dayandığı kabul edilir. Şehir açıklarındaki Giresun Adası, Karadeniz'in tek büyük adasıdır ve yerel efsanelerle ilişkilendirilir. Bölge, Türkiye'nin başlıca fındık üretim alanlarından biridir.",
  gumushane:
    "Gümüşhane, adını (gümüş + hane, 'gümüş evi/ocağı') tarihi gümüş madenciliğinden alan, dağlık bir Doğu Karadeniz ilidir. Osmanlı döneminde bölgedeki maden işletmeleri, kentin ekonomik önemini uzun süre belirlemiştir. Yükseklerdeki yaylaları ve tarihi maden yerleşimleri, günümüzde doğa ve kültür turizmi açısından ilgi görmektedir.",
  kastamonu:
    "Kastamonu, iyi korunmuş Osmanlı dönemi ahşap konaklarıyla tanınan tarihi bir Karadeniz şehridir. Tepede yer alan Kastamonu Kalesi, kentin simgelerinden biridir. İlin Ilgaz Dağı Milli Parkı, kayak ve doğa sporları için bilinen bir merkezdir.",
  ordu:
    "Ordu, Türkiye'nin önde gelen fındık üretim bölgelerinden biri olan Orta Karadeniz'de yer alan bir sahil kentidir. Şehir merkezine hakim Boztepe tepesi, teleferikle ulaşılan bir seyir noktası olarak bilinir. Kıyı boyunca uzanan yeşil tepeler, bölgenin karakteristik manzarasını oluşturur.",
  rize:
    "Rize, Türkiye'nin çay üretiminin ağırlıklı olarak yapıldığı ildir; yamaçları boyunca uzanan yeşil çay bahçeleri bölgenin en tanınmış görüntüsüdür. Kaçkar Dağları'nın eteklerinde yer alan Ayder Yaylası, kaplıcaları ve yayla evleriyle bilinen bir doğa turizmi merkezidir. Bölge, Türkiye'nin en yüksek yağış alan bölgelerinden biridir.",
  samsun:
    "Samsun, Mustafa Kemal Atatürk'ün 19 Mayıs 1919'da karaya çıktığı ve Türk Kurtuluş Savaşı'nın sembolik başlangıcı kabul edilen olayın yaşandığı şehirdir; bu tarih Türkiye'de her yıl ulusal bayram olarak anılır. Tarih boyunca Karadeniz kıyısının önemli ticaret limanlarından biri olmuştur.",
  sinop:
    "Sinop, Türkiye'nin Karadeniz kıyısındaki en kuzey noktasında, bir yarımada üzerinde kurulu antik bir liman kentidir. Antik dönemde önemli bir Yunan kolonisiydi ve kinik felsefe okulunun kurucusu Sinoplu Diyojen'in doğduğu yer olarak bilinir. Tarihi Sinop Kalesi ve daha sonra hapishane olarak kullanılan kale binası, kentin simgelerindendir.",
  tokat:
    "Tokat, Osmanlı dönemine ait kervansaray ve tarihi çarşı dokusuyla tanınan bir Orta Karadeniz-Anadolu geçiş şehridir. Geleneksel el baskısı kumaş sanatı 'Tokat yazması', kentin bilinen el sanatlarından biridir. Yakınlardaki Ballıca Mağarası, sarkıt ve dikitleriyle bilinen doğal bir mağaradır.",
  zonguldak:
    "Zonguldak, Türkiye'nin tarihi taşkömürü (maden kömürü) üretiminin merkezi olan sanayi ve liman kentidir. Kömür madenciliği, 19. yüzyıldan itibaren kentin ekonomisini ve kimliğini büyük ölçüde şekillendirmiştir. Karadeniz kıyısındaki konumu, kenti aynı zamanda bir liman şehri yapar.",

  // --- Akdeniz (kalan 9 şehir) ---
  kas:
    "Kaş, berrak sularında yapılan dalış turlarıyla tanınan sakin bir Akdeniz kasabasıdır; çevresinde antik batıklar ve kayalara oyulmuş Likya lahitleri bulunur. Deniz üzerinden ulaşılan, kısmen sular altında kalmış antik Kekova kenti, bölgenin en bilinen gezi noktalarından biridir. Karşı kıyıdaki Yunanistan'a ait Meis (Kastellorizo) adası, Kaş'tan çıplak gözle görülebilir.",
  fethiye:
    "Fethiye, antik dönemde Telmessos olarak bilinen, kayalıklara oyulmuş görkemli Likya kaya mezarlarıyla (özellikle Amyntas Kaya Mezarı) tanınan bir kenttir. Ölüdeniz (Mavi Lagün) plajı ve üzerindeki Babadağ'dan yapılan yamaç paraşütü, bölgenin en bilinen aktivitelerindendir. Likya Yolu uzun mesafe yürüyüş rotası buradan başlar. Yakınındaki Kayaköy, 1923 nüfus mübadelesi sonrası terk edilmiş bir Rum köyü olarak bilinir.",
  adana:
    "Adana, adını taşıyan ve Türkiye'nin uluslararası tanınan yemeklerinden biri olan baharatlı kıyma kebabı Adana kebabıyla ünlüdür. Roma dönemine ait, Seyhan Nehri üzerinde hâlâ kullanılan Taşköprü kentin tarihi simgelerindendir. Sabancı Merkez Camii, Türkiye'nin en büyük camilerinden biridir. Şehir tarihsel olarak önemli bir pamuk tarımı ve dokuma merkezi olmuştur.",
  mersin:
    "Mersin, Türkiye'nin Akdeniz kıyısındaki başlıca liman kentlerinden biridir ve ülkenin en büyük konteyner limanlarından birine ev sahipliği yapar. Kent yakınındaki antik Soli/Pompeiopolis, sütunlu antik caddesiyle bilinen bir arkeolojik alandır.",
  hatay:
    "Hatay, antik çağda Antakya (Antiochia) olarak bilinen, erken Hristiyanlığın en önemli merkezlerinden biridir — Yeni Ahit'e göre 'Hristiyan' adı ilk kez burada kullanılmıştır. Habib-i Neccar/Aziz Petrus Kilisesi, dünyanın en eski kiliselerinden biri kabul edilir. Bölge, çok dinli ve çok kültürlü tarihi mirası ile kendine özgü, zengin bir mutfak kültürüyle tanınır.",
  kahramanmaras:
    "Kahramanmaraş, Türkiye genelinde tanınan, sakızlı ve salepli, özel bir teknikle sunulan 'Maraş dondurması' ile ünlüdür. Bölgede yetişen ve uluslararası mutfaklarda da bilinen Maraş biberi, kentin bir diğer simge ürünüdür.",
  osmaniye:
    "Osmaniye, yakınındaki Karatepe-Aslantaş açık hava müzesiyle tanınır — Hitit dönemine ait, iki dilli (Fenike-Hiyeroglif Luvi) yazıtlar ve rölyeflerle bilinen önemli bir arkeolojik alandır. İl, 1996 yılında Adana'dan ayrılarak kurulmuş görece genç bir vilayettir.",
  isparta:
    "Isparta, Türkiye'nin gül yağı ve gül ürünleri üretiminin merkezi olarak bilinir; ilkbaharda geniş gül bahçeleri bölgenin karakteristik görüntüsüdür. Eğirdir Gölü, kıyısındaki yerleşimiyle bölgenin bilinen doğal güzelliklerinden biridir.",
  burdur:
    "Burdur, yakınlarındaki Sagalassos antik kentiyle tanınır — dağ yamacına kurulu, iyi korunmuş Helenistik ve Roma dönemi kalıntılarıyla bilinen önemli bir arkeolojik alandır. Burdur Gölü, göçmen kuşlar için önemli bir sulak alan olarak bilinir.",

  // --- Ege (kalan 8 şehir) ---
  cesme:
    "Çeşme, adını kentteki tarihi çeşmelerden alan, Ceneviz-Osmanlı dönemi Çeşme Kalesi'yle tanınan bir Ege sahil kasabasıdır. Bölge, kendine özgü lezzetiyle bilinen Çeşme karpuzu ve rüzgar sörfüne elverişli koylarıyla tanınır.",
  izmir:
    "İzmir, antik çağda Smyrna olarak bilinen, birçok antik kaynakta Homeros'un doğum yeri olarak anılan köklü bir Ege liman kentidir. Konak Meydanı'ndaki İzmir Saat Kulesi, kentin en tanınan simgesidir. Tarihi boyunca çok uluslu, kozmopolit bir liman şehri kimliğiyle bilinmiştir ve antik Efes kentine giden yolun önemli bir kapısıdır.",
  manisa:
    "Manisa, Amasya'ya benzer şekilde Osmanlı döneminde şehzadelerin sancak eğitimi için gönderildiği şehirlerden biridir. İlçesi Sart (antik Sardis), ilk madeni paranın basıldığı yer olarak kabul edilen antik Lidya Krallığı'nın başkentiydi. Kentte her yıl düzenlenen ve UNESCO Somut Olmayan Kültürel Miras Listesi'nde yer alan Mesir Macunu Festivali, Osmanlı dönemine dayanan geleneksel bir şifa macunu kutlamasıdır.",
  aydin:
    "Aydın, dünyaca tanınan kuru incir üretimiyle ünlüdür. İlçesi Karacasu yakınlarındaki antik Afrodisias kenti, mermer heykelcilik okuluyla bilinir ve 2017'de UNESCO Dünya Mirası Listesi'ne alınmıştır. Antik Nysa kentinin tiyatrosu da bölgenin bilinen arkeolojik miraslarındandır.",
  denizli:
    "Denizli, beyaz traverten teraslarıyla tanınan Pamukkale ve hemen yanındaki antik Roma kaplıca kenti Hierapolis'e ev sahipliği yapar; ikisi birlikte 1988'de UNESCO Dünya Mirası Listesi'ne alınmıştır. Kent ayrıca Türkiye'nin havlu ve tekstil üretiminde tanınan merkezlerinden biridir.",
  afyonkarahisar:
    "Afyonkarahisar, adını (afyon + kara + hisar) şehre hakim kara volkanik kayalık üzerindeki kaleden ve tarihsel olarak bölgede yasal haşhaş yetiştiriciliğinden alır. Ağustos 1922'deki Büyük Taarruz'un ve Dumlupınar Meydan Muharebesi'nin (Türk Kurtuluş Savaşı'nın dönüm noktalarından biri) yaşandığı bölgededir.",
  kutahya:
    "Kütahya, Osmanlı döneminden bu yana süregelen çini ve seramik sanatıyla tanınır; elle boyanmış Kütahya çinileri Türkiye'nin bilinen geleneksel el sanatları arasındadır.",
  usak:
    "Uşak, Osmanlı döneminde önemli bir halı dokumacılığı merkeziydi ve 'Uşak halıları' dünya halı tarihinde tanınan bir terimdir. Kent yakınlarında bulunan ve antik Lidya dönemine ait altın eserlerden oluşan 'Karun Hazinesi', uluslararası bir iade davasıyla da gündeme gelmiş önemli bir arkeolojik buluntudur.",

  // --- Marmara (kalan 10 şehir) ---
  bursa:
    "Bursa, Osmanlı Devleti'nin ilk büyük başkentidir (Edirne ve İstanbul'dan önce). Erken dönem Osmanlı mimarisinin başyapıtları arasında sayılan Yeşil Cami ve Yeşil Türbe kentin simgeleridir. Yoğurtlu ve domates soslu İskender kebabın burada icat edildiği kabul edilir. Kent, tarihi İpek Yolu üzerinde önemli bir ipek ticareti merkeziydi; tarihi Koza Han bu geleneğin günümüze kalan izlerindendir. Uludağ, hem antik dönemde hem günümüzde kayak merkezi olarak bilinir.",
  edirne:
    "Edirne, Bursa'dan sonra, İstanbul'un fethinden önceki Osmanlı başkentiydi. Mimar Sinan'ın kendi ustalık eseri saydığı Selimiye Camii, 2011 yılında UNESCO Dünya Mirası Listesi'ne alınmıştır. Şehirde her yıl düzenlenen Kırkpınar Yağlı Güreşleri, dünyanın kesintisiz düzenlenen en eski spor organizasyonlarından biri kabul edilir.",
  kirklareli:
    "Kırklareli, Trakya'nın kendine özgü longoz (taşkın) ormanlarıyla tanınan, Bulgaristan sınırındaki bir ilidir. Bölge, Trakya şarap üretim bölgesinin önemli bir parçası olarak bilinir; üzüm bağları kırsal manzaranın karakteristik bir parçasıdır.",
  tekirdag:
    "Tekirdağ, Türkiye genelinde tanınan kendine özgü bir tarifle hazırlanan Tekirdağ köftesiyle ünlüdür. Kent, Trakya bölgesinin önemli bağcılık ve şarap üretim merkezlerinden biridir. Macar asilzadesi II. Rákóczi Ferenc'in sürgün yıllarını geçirdiği ev, bugün müze olarak ziyaret edilebilmektedir.",
  yalova:
    "Yalova, kaplıcalarıyla tanınan, İstanbul'a yakınlığıyla bilinen küçük bir Marmara ilidir. Termal ilçesindeki tarihi kaplıcalar Roma döneminden beri kullanılmaktadır; Atatürk'ün zaman zaman kaldığı köşk de bu ilçededir.",
  kocaeli:
    "Kocaeli'nin merkezi İzmit, antik çağda Nikomedia olarak bilinirdi ve Roma İmparatoru Diocletianus döneminde kısa süreliğine imparatorluğun idari merkezlerinden biri olmuştur. Günümüzde İzmit Körfezi kıyısında, Türkiye'nin önemli sanayi ve liman şehirlerinden biridir.",
  sakarya:
    "Sakarya, Türk Kurtuluş Savaşı'nın dönüm noktalarından biri olan Sakarya Meydan Muharebesi'nin yaşandığı bölgededir. Sapanca Gölü, İstanbul'a yakınlığıyla bilinen bir doğa ve hafta sonu kaçamağı noktasıdır. İlçesi Taraklı, korunmuş Osmanlı dönemi ahşap evleriyle tanınır.",
  bilecik:
    "Bilecik'in Söğüt ilçesi, Osmanlı Devleti'nin kuruluş yeri olarak kabul edilir — Osman Gazi'nin boyunun bu bölgeye yerleşmesiyle beylik burada temellenmiştir. Bu nedenle Söğüt, Türkiye'de 'Osmanlı'nın beşiği' olarak anılır.",
  balikesir:
    "Balıkesir, Yunan mitolojisinde Paris'in Hükmü efsanesinin geçtiği dağ olarak bilinen Kaz Dağları'na (antik adıyla İda Dağı) ev sahipliği yapar. İl, Ege kıyısı boyunca uzanan zeytin ve zeytinyağı üretimiyle de tanınır.",
  canakkale:
    "Çanakkale, I. Dünya Savaşı'nın en kanlı cephelerinden biri olan Çanakkale Muharebeleri'nin (1915) yaşandığı, Türkiye'de her 18 Mart'ta anılan bir kenttir. İl sınırları içindeki antik Truva kenti, 1998'de UNESCO Dünya Mirası Listesi'ne alınmıştır. Çanakkale Boğazı (Dardanel), Avrupa ile Asya kıtalarını ayıran iki boğazdan biridir.",

  // --- İç Anadolu (kalan 12 şehir) ---
  konya:
    "Konya, Mevlana Celaleddin Rumi'nin türbesinin bulunduğu ve Mevlevi tarikatının (Whirling Dervishes / semazenlerin) doğduğu şehirdir; Mevlana Müzesi bu mirası yaşatan en bilinen ziyaret noktasıdır. Kent, Anadolu Selçuklu Sultanlığı'na uzun süre başkentlik yapmıştır. Geniş ve verimli Konya Ovası, Türkiye'nin başlıca tahıl üretim bölgelerinden biri olarak bilinir.",
  ankara:
    "Ankara, 1923'te Türkiye Cumhuriyeti'nin başkenti ilan edilmiştir; Anıtkabir, Cumhuriyet'in kurucusu Mustafa Kemal Atatürk'ün anıt mezarıdır. Antik çağda Ankyra olarak bilinen kentte, Roma İmparatoru Augustus'un siyasi vasiyetinin (Res Gestae) korunmuş bir kopyasını taşıyan Augustus Tapınağı bulunur.",
  kayseri:
    "Kayseri, eteğinde kurulu olduğu Erciyes Dağı (bugün bir kayak merkezi) ile ve Selçuklu dönemine ait kümbet mimarisiyle tanınır. Kent, pastırma ve sucuk üretimiyle ve Kayseri mantısıyla bilinir; tarih boyunca İpek Yolu üzerinde önemli bir ticaret merkezi olmuştur.",
  eskisehir:
    "Eskişehir, dünyaca tanınan lületaşı (meerschaum) oymacılığının merkezidir — bölge, pipo yapımında kullanılan bu değerli taşın önde gelen kaynaklarından biridir. Yakınlarındaki Frigya dönemine ait Midas Şehri (Yazılıkaya) kaya anıtları bölgenin antik mirasını yansıtır. Kent, büyük üniversiteleriyle tanınan bir öğrenci şehridir.",
  sivas:
    "Sivas, Selçuklu dönemine ait Gök Medrese ve Çifte Minareli Medrese gibi taş işçiliğiyle bilinen yapılara ev sahipliği yapar. Kent, 1919'da Mustafa Kemal Atatürk önderliğinde toplanan ve Türk Kurtuluş Savaşı'nın örgütlenmesinde kritik bir adım olan Sivas Kongresi'nin yapıldığı yerdir.",
  kirikkale:
    "Kırıkkale, Türkiye'nin savunma sanayi ve mühimmat üretiminde tarihsel olarak önemli bir merkezi olarak bilinir; ilin sanayi kimliği büyük ölçüde bu üretim tesisleri etrafında şekillenmiştir.",
  aksaray:
    "Aksaray, Kapadokya bölgesinin bir parçası sayılan, kanyonu boyunca kayaya oyulmuş kiliseleriyle bilinen Ihlara Vadisi'ne ev sahipliği yapar. İl sınırlarındaki Acemhöyük, Hitit öncesi döneme ait önemli bir arkeolojik höyüktür.",
  karaman:
    "Karaman, Anadolu Selçuklu sonrası dönemde kurulan ve Osmanlı birleşmesinden önce bölgenin en güçlü beyliklerinden biri olan Karamanoğulları Beyliği'ne başkentlik yapmıştır. İl sınırlarındaki Binbirkilise, erken Bizans dönemine ait çok sayıda kilise kalıntısıyla bilinir.",
  kirsehir:
    "Kırşehir, Anadolu'daki ahi teşkilatının (esnaf ve zanaatkarları ahlaki ilkeler etrafında örgütleyen ortaçağ loncası geleneği) kurucusu kabul edilen Ahi Evran'ın türbesine ev sahipliği yapar ve bu gelenekle özdeşleşmiştir.",
  nigde:
    "Niğde, iyi korunmuş fresklere sahip kaya oyma Eski Gümüşler Manastırı ile tanınır. İl, Kapadokya bölgesinin güney ucunda, Ihlara Vadisi'ne de yakın konumdadır.",
  cankiri:
    "Çankırı, Türkiye'nin tarihi kaya tuzu (taş tuz) madenciliğiyle tanınan illerinden biridir; bölgedeki tuz yatakları yüzyıllardır işletilmektedir.",
  yozgat:
    "Yozgat, 18.-19. yüzyıllarda bölgeye hükmeden Çapanoğulları ailesinin inşa ettirdiği külliye ve camilerle tanınır. Çamlık Milli Parkı, kent merkezine yakın bir orman ve doğa alanı olarak bilinir.",

  // --- Doğu Anadolu (14 şehir) ---
  van:
    "Van, Türkiye'nin en büyük gölü olan Van Gölü kıyısında kuruludur. Gölün ortasındaki Akdamar Adası'nda yer alan tarihi Ermeni Kutsal Haç Kilisesi, bölgenin bilinen mimari miraslarındandır. Kent, antik Urartu Krallığı'nın başkenti Tuşpa'nın kalıntılarını barındıran Van Kalesi ile tanınır. Farklı renkte gözlere sahip olabilen Van kedisi, bölgeye özgü bir kedi ırkı olarak bilinir.",
  erzurum:
    "Erzurum, 1919'da Mustafa Kemal Atatürk önderliğinde toplanan ve Türk Kurtuluş Savaşı'nın örgütlenmesinde önemli bir adım olan Erzurum Kongresi'nin yapıldığı şehirdir. Selçuklu dönemine ait Çifte Minareli Medrese kentin simge yapılarındandır. Palandöken, Türkiye'nin bilinen kayak merkezlerinden biridir. Kent, kendine özgü cağ kebabıyla da tanınır.",
  erzincan:
    "Erzincan, Fırat Nehri'nin kollarından birinin kaynak bölgesinde, dağlarla çevrili bir ovada kuruludur. İlçesi Kemah, tarihi kalesi ve eski yerleşim dokusuyla bilinir.",
  kars:
    "Kars, Orta Çağ'da önemli bir Ermeni krallık başkenti olan ve 2016'da UNESCO Dünya Mirası Listesi'ne alınan Ani Harabeleri'ne ev sahipliği yapar. Kent merkezi, 1878-1918 yılları arasındaki Rus idaresi döneminden kalma, Türkiye'de alışılmadık bir ızgara planlı Rus/Baltık tarzı mimariyle tanınır. Kars kaşarı, ülke genelinde bilinen bir peynir türüdür.",
  igdir:
    "Iğdır, Türkiye'nin en yüksek dağı olan Ağrı Dağı'nın eteklerine yakın, verimli bir ovada yer alır. Bölge, kayısı bahçeleriyle de tanınır.",
  agri:
    "Ağrı, Türkiye'nin en yüksek zirvesi olan ve dini gelenekte Nuh'un Gemisi'nin karaya oturduğu yer olarak anılan Ağrı Dağı'na (Ararat) ev sahipliği yapar. 18. yüzyıla ait İshak Paşa Sarayı, farklı mimari üslupları bir araya getiren yapısıyla bölgenin bilinen tarihi eserlerindendir.",
  mus:
    "Muş'un Malazgirt ilçesi, 1071'de Selçuklu Türkleri ile Bizans İmparatorluğu arasında yapılan ve Anadolu'nun Türkler tarafından yurt edinilmesinin önünü açan tarihî Malazgirt Meydan Muharebesi'nin yaşandığı yerdir.",
  bitlis:
    "Bitlis, tarihi ticaret yollarının geçtiği dağlık bir geçit üzerinde kurulu, kalesiyle tanınan bir şehirdir. İl sınırlarındaki Nemrut Krater Gölü, sönmüş bir yanardağın kalderasında oluşmuş büyük bir göldür.",
  bingol:
    "Bingöl, adını (bin + göl) yüksek yaylalarında bulunan çok sayıda küçük buzul ve krater gölünden alır; bu göller bölgenin karakteristik doğal özelliğidir.",
  tunceli:
    "Tunceli, Munzur Vadisi Milli Parkı'na ev sahipliği yapar; Munzur Gözeleri, parkın bilinen kaynak sularından biridir. İl, dağlık ve akarsu vadileriyle zengin bir coğrafyaya sahiptir.",
  elazig:
    "Elazığ'ın tarihi çekirdeği olan Harput, kalesi ve eski yerleşim dokusuyla tanınan antik bir kenttir. Hazar Gölü, bölgenin bilinen doğal göllerinden biridir.",
  malatya:
    "Malatya, dünyanın önde gelen kayısı üretim bölgelerinden biri olarak tanınır. İl sınırlarındaki Arslantepe Höyüğü, erken devlet organizasyonuna dair önemli buluntularıyla 2021'de UNESCO Dünya Mirası Listesi'ne alınmıştır.",
  hakkari:
    "Hakkari, Cilo ve Sat dağ silsileleriyle Türkiye'nin en sarp ve dağlık bölgelerinden birinde yer alır; yüksek zirveleri ve buzulları dağcılık ve doğa turizmi açısından bilinir.",
  ardahan:
    "Ardahan, kışın buz tutan yüzeyinde at arabası ve kızak gezintilerinin yapıldığı Çıldır Gölü ile tanınır. Yüksek rakımlı, geniş yaylaları bölgenin karakteristik coğrafyasını oluşturur.",

  // --- Güneydoğu Anadolu (9 şehir) ---
  mardin:
    "Mardin, Mezopotamya ovasına bakan bir tepeye kurulu, sarımsı kireçtaşından yapılmış tarihi taş evleriyle tanınır. Kent, çok dinli ve çok kültürlü mirasıyla bilinir; Süryani Ortodoks Deyrulzafaran Manastırı bu mirasın bilinen örneklerindendir.",
  sanliurfa:
    "Şanlıurfa, günümüze kadar bilinen en eski anıtsal tapınak kompleksi olan ve 2018'de UNESCO Dünya Mirası Listesi'ne alınan Göbeklitepe'ye ev sahipliği yapar. Kent, İbrahim peygamber geleneğiyle ilişkilendirilen Balıklıgöl ile de bilinir. Kerpiç kubbeli evleriyle tanınan antik Harran, dünyanın en eski yerleşimlerinden biri kabul edilir.",
  gaziantep:
    "Gaziantep, baklavası ve zengin mutfağıyla tanınır; kent 2015'te UNESCO Gastronomi Şehri unvanı almıştır. Zeugma Mozaik Müzesi, antik Zeugma kentinden çıkarılan ünlü 'Çingene Kızı' mozaiği de dahil olmak üzere dünyanın en büyük mozaik koleksiyonlarından birine ev sahipliği yapar. Kent ayrıca geleneksel bakırcılık zanaatıyla da bilinir.",
  diyarbakir:
    "Diyarbakır, dünyanın en uzun ve en iyi korunmuş şehir surlarından biri olan Diyarbakır Surları ile tanınır; surlar ve yanındaki Hevsel Bahçeleri 2015'te UNESCO Dünya Mirası Listesi'ne alınmıştır. Kent, Dicle Nehri kıyısında kuruludur ve iri karpuzlarıyla ülke genelinde bilinir.",
  batman:
    "Batman, adını kıyısından geçen Batman Çayı'ndan alan, büyük ölçüde petrol sanayisi etrafında gelişmiş görece modern bir kenttir. İl sınırlarına yakın, Dicle kıyısındaki antik Hasankeyf yerleşimi, binlerce yıllık tarihiyle bilinen bir yerleşim yeridir.",
  siirt:
    "Siirt, yavaş pişirilen kuzu etiyle hazırlanan büryan kebabı ve pilavıyla tanınan bir Güneydoğu Anadolu şehridir. Geleneksel Siirt battaniyeleri, bölgenin bilinen el dokuması ürünlerindendir.",
  adiyaman:
    "Adıyaman, Kommagene Kralı I. Antiokhos'un anıt-mezarını taşıyan ve dev taş heykel başlarıyla tanınan Nemrut Dağı'na ev sahipliği yapar; alan 1987'de UNESCO Dünya Mirası Listesi'ne alınmıştır.",
  kilis:
    "Kilis, Suriye sınırındaki konumu nedeniyle tarihsel olarak Halep bölgesiyle ortak bir kültürel dokuyu paylaşan bir şehirdir. Zeytinyağı esaslı geleneksel sabun yapımı, bölgenin bilinen el sanatları arasındadır.",
  sirnak:
    "Şırnak, İslami gelenekte Nuh'un Gemisi'nin karaya oturduğu yerlerden biri olarak anılan Cudi Dağı'na ev sahipliği yapar. İl, Irak sınırındaki dağlık ve sarp coğrafyasıyla bilinir.",
};

export function getCityKnownFor(citySlug: string): string | undefined {
  return CITY_KNOWN_FOR[citySlug];
}
