// Parti 5, madde 15 — "sıkça karıştırılan yerler" uyarısı. Bilinçli olarak
// bir edit-distance/benzerlik algoritmasıyla OTOMATİK üretilmedi — deneme
// script'i (isim benzerliğine göre) "Çorum <-> Bodrum", "Bitlis <-> Kilis"
// gibi gerçekte hiç kimsenin karıştırmadığı, yanlış/gülünç çiftler üretti.
// Bunun yerine, Türkiye'de seyahat planlarken gerçekten yaygın olarak
// karıştırılan, herkesçe bilinen isim/coğrafya benzerliği çiftleri elle
// seçildi (madde 34/167 ile aynı disiplin: uydurmak yerine gerçek, savunulabilir
// bilgi). Her çift iki yönlü.
export interface ConfusablePlace {
  slug: string;
  regionSlug: string;
  citySlug?: string; // set when this entry is a district — href needs /region/citySlug/slug
  name: string;
  reason: string;
}

export const CONFUSABLE_PLACES: Record<string, ConfusablePlace[]> = {
  amasra: [
    {
      slug: "amasya",
      regionSlug: "karadeniz",
      name: "Amasya",
      reason: "İsimleri çok benzer ama farklı şehirler — Amasra bir Karadeniz sahil kasabası, Amasya ise Yeşilırmak kıyısında iç kesimde tarihi bir şehir.",
    },
  ],
  amasya: [
    {
      slug: "amasra",
      regionSlug: "karadeniz",
      name: "Amasra",
      reason: "İsimleri çok benzer ama farklı şehirler — Amasya Yeşilırmak kıyısında iç kesimde tarihi bir şehir, Amasra ise bir Karadeniz sahil kasabası.",
    },
  ],
  mersin: [
    {
      slug: "mardin",
      regionSlug: "guneydogu-anadolu",
      name: "Mardin",
      reason: "Yazılışları benzer olduğu için uçuş/otobüs bileti alırken karıştırılabiliyor — Mersin Akdeniz kıyısında bir liman şehri, Mardin ise Güneydoğu Anadolu'da taş mimarisiyle bilinen bir şehir.",
    },
  ],
  mardin: [
    {
      slug: "mersin",
      regionSlug: "akdeniz",
      name: "Mersin",
      reason: "Yazılışları benzer olduğu için uçuş/otobüs bileti alırken karıştırılabiliyor — Mardin Güneydoğu Anadolu'da taş mimarisiyle bilinen bir şehir, Mersin ise Akdeniz kıyısında bir liman şehri.",
    },
  ],
  kars: [
    {
      slug: "kas",
      regionSlug: "akdeniz",
      citySlug: "antalya",
      name: "Kaş",
      reason: "Söylenişleri benzer olduğu için yabancı ziyaretçiler tarafından karıştırılabiliyor — Kars Doğu Anadolu'da soğuk, dağlık bir şehir, Kaş ise Akdeniz kıyısında bir dalış/tatil kasabası.",
    },
  ],
  kas: [
    {
      slug: "kars",
      regionSlug: "dogu-anadolu",
      name: "Kars",
      reason: "Söylenişleri benzer olduğu için yabancı ziyaretçiler tarafından karıştırılabiliyor — Kaş Akdeniz kıyısında bir dalış/tatil kasabası, Kars ise Doğu Anadolu'da soğuk, dağlık bir şehir.",
    },
  ],
};

export function getConfusablePlaces(slug: string): ConfusablePlace[] {
  return CONFUSABLE_PLACES[slug] ?? [];
}
