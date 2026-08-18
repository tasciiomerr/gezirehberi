// Parti (madde 155-163) — bölge sayfaları için genel kültür/mutfak/tarih
// bilgisi bloğu. PİLOT: sadece 3 bölge, onay bekleniyor. Aynı dürüstlük
// kuralı: sadece genel bilinen, doğrulanabilir gerçekler; kesin sayısal/
// sıralama iddialarında ("dünyada 1 numara" gibi) temkinli dil kullanıldı
// ("önde gelen üreticilerden biri" gibi), emin olunmayan hiçbir rakam
// icat edilmedi.
export const REGION_CULTURE: Record<string, string> = {
  karadeniz:
    "Karadeniz Bölgesi, Türkiye'nin çay üretiminin merkezi konumundadır — özellikle Rize çevresinde yoğunlaşan çay tarımı, Türkiye'yi dünyanın önde gelen çay üreticilerinden biri haline getirir. Bölge aynı zamanda Türkiye'nin fındık üretiminin ağırlıklı olarak yapıldığı bölgedir. Yoğun yağış alan, yeşil ve dağlık coğrafyası (Kaçkar Dağları gibi) kendine özgü bir iklim ve bitki örtüsü oluşturur. Horon, bölgeye özgü canlı bir halk oyunudur. Safranbolu'nun ahşap Osmanlı konakları, bölgenin geleneksel mimarisinin en bilinen örnekleri arasındadır.",
  ege:
    "Ege Bölgesi, zeytin ve zeytinyağı üretimiyle ve antik Yunan/İon uygarlığına ait kalıntılarla (Efes, Bergama, Truva gibi) tanınır. Bölge, Batı felsefesinin ilk temsilcilerinden bazılarının (Milet'ten Thales, Efes'ten Herakleitos gibi) doğduğu topraklar olarak da bilinir. Kıyı şeridi, tatil beldeleri ve Alaçatı gibi rüzgar sörfü merkezleriyle popülerdir. İncir ve zeytin, bölge mutfağının ve tarımının simge ürünleri arasındadır; Ege mutfağı genel olarak zeytinyağlı sebze yemekleriyle tanınır.",
  akdeniz:
    "Akdeniz Bölgesi, narenciye (turunçgil) üretimi ve antik Likya ile Pamfilya uygarlıklarının kalıntılarıyla (kayaya oyulmuş Likya mezarları, Likya Yolu yürüyüş rotası gibi) bilinir. Antalya, bölgenin başlıca turizm merkezidir ve 'Türk Rivierası' olarak da anılan kıyı şeridinin kalbinde yer alır. Toros Dağları, bölgenin iç kesimlerinde uzanan başlıca dağ silsilesidir. Olympos antik kentindeki Chimaera (Yanartaş), doğal gaz sızıntısı nedeniyle sürekli yanan alevleriyle antik çağlardan beri bilinen doğal bir fenomendir.",
  marmara:
    "Marmara Bölgesi, Boğaziçi ve Çanakkale Boğazı üzerinden Avrupa ile Asya kıtalarını birbirine bağlayan bölgedir. İstanbul, Bursa ve Edirne, farklı dönemlerde Osmanlı Devleti'ne başkentlik yapmıştır. Trakya kesimi, ayçiçeği yağı üretimi ve bağcılığıyla tanınır. Bölge, tarih boyunca Bizans ve Osmanlı imparatorluklarının siyasi ve ticari merkezi olmuş, bu miras günümüzde yoğun bir tarihi doku olarak varlığını sürdürmektedir.",
  "ic-anadolu":
    "İç Anadolu Bölgesi, geniş buğday tarlaları ve bozkır coğrafyasıyla Türkiye'nin başlıca tahıl üretim alanlarından biridir. Kapadokya'nın peri bacaları ve yeraltı şehirleri, bölgenin en tanınan doğal ve tarihi miraslarındandır. Ankara'nın başkent oluşu ve Konya'nın Mevlevi tarikatı geleneğiyle özdeşleşmesi, bölgenin siyasi ve kültürel önemini yansıtır. Tuz Gölü, Türkiye'nin en büyük ikinci gölü ve önemli bir tuz üretim alanıdır. Selçuklu dönemine ait kervansaraylar, tarihi İpek Yolu'nun bölgeden geçtiğini gösterir.",
  "dogu-anadolu":
    "Doğu Anadolu Bölgesi, Türkiye'nin en yüksek rakımlı ve en dağlık bölgesidir; Fırat ve Dicle nehirlerinin kaynakları bu bölgededir. Ağrı Dağı, ülkenin en yüksek zirvesi olarak bölgenin simgesidir. Van Gölü, Türkiye'nin en büyük gölüdür. Bölge, tarih boyunca Türk, Kürt, Ermeni ve Gürcü kültürlerinin kesiştiği bir coğrafya olmuş, bu çok kültürlü miras günümüzde farklı dillerde ve mimari izlerde varlığını sürdürmektedir. Kış mevsimi sert ve uzun geçer.",
  "guneydogu-anadolu":
    "Güneydoğu Anadolu Bölgesi, Yukarı Mezopotamya olarak da anılan, insanlık tarihinin en eski yerleşim izlerini taşıyan bir coğrafyadır — Şanlıurfa'daki Göbeklitepe, bilinen en eski anıtsal yapılardan biri kabul edilir. Bölge, Antep fıstığı (Antep fıstığı/şam fıstığı) üretimiyle ve zengin, baharatlı mutfağıyla tanınır. Tarih boyunca Arap, Kürt, Türk ve Süryani kültürlerinin bir arada yaşadığı bölge, çok dilli ve çok dinli bir mirası günümüze taşır. İklimi yazın sıcak ve kurak geçer.",
};

export function getRegionCulture(regionSlug: string): string | undefined {
  return REGION_CULTURE[regionSlug];
}
