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
};

export function getRegionCulture(regionSlug: string): string | undefined {
  return REGION_CULTURE[regionSlug];
}
