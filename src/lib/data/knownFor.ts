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
};

export function getCityKnownFor(citySlug: string): string | undefined {
  return CITY_KNOWN_FOR[citySlug];
}
