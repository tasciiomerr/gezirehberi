import { Region } from "@/lib/types";

export const regions: Region[] = [
  {
    slug: "karadeniz",
    name: "Karadeniz",
    tagline: "Yeşilin bin tonu, bulutlara değen yaylalar",
    description:
      "Sisli yaylalar, çay bahçeleri ve Karadeniz'e dik inen vadileriyle Türkiye'nin en yemyeşil bölgesi. Amasra'nın koylarından Ayder'in yaylalarına, her köşesinde farklı bir doğa deneyimi var.",
    gradientFrom: "#0F5257",
    gradientTo: "#16909C",
    cityCount: 2,
  },
  {
    slug: "ege",
    name: "Ege",
    tagline: "Zeytinlikler, antik kentler ve turkuaz koylar",
    description:
      "Antik uygarlıkların izleri, zeytin ağaçları arasında saklı köyler ve gün batımıyla altın rengine bürünen sahiller. Ege, tarih ile deniz tatilini aynı rotada buluşturur.",
    gradientFrom: "#B7791F",
    gradientTo: "#16909C",
    cityCount: 0,
  },
  {
    slug: "akdeniz",
    name: "Akdeniz",
    tagline: "Turkuaz sular, dağ başında antik şehirler",
    description:
      "Toroslar'ın denize dik indiği koylar, Likya uygarlığından kalma antik kentler ve yıl boyu güneşli plajlar. Akdeniz, macera ile dinlenmeyi bir arada sunar.",
    gradientFrom: "#0F5257",
    gradientTo: "#B33A25",
    cityCount: 0,
  },
  {
    slug: "marmara",
    name: "Marmara",
    tagline: "İki kıtanın, iki denizin buluştuğu bölge",
    description:
      "İstanbul'un tarihi dokusundan Bursa'nın Osmanlı mirasına, Gelibolu'nun sessizliğinden Bozcaada'nın bağlarına uzanan çeşitlilik.",
    gradientFrom: "#8A3A2B",
    gradientTo: "#B33A25",
    cityCount: 0,
  },
  {
    slug: "ic-anadolu",
    name: "İç Anadolu",
    tagline: "Peri bacaları, bozkır ve yüzyıllık kervansaraylar",
    description:
      "Kapadokya'nın peri bacalarından Konya'nın Mevlevi mirasına, bozkırın ortasında yükselen tarih ve gelenek.",
    gradientFrom: "#B7791F",
    gradientTo: "#E4A335",
    cityCount: 0,
  },
  {
    slug: "dogu-anadolu",
    name: "Doğu Anadolu",
    tagline: "Yüksek dağlar, buz tutmuş göller, el değmemiş doğa",
    description:
      "Ağrı Dağı'nın gölgesinde, Van Gölü'nün kıyısında, Türkiye'nin en vahşi ve en az keşfedilmiş coğrafyası.",
    gradientFrom: "#0F5257",
    gradientTo: "#8A2B45",
    cityCount: 0,
  },
  {
    slug: "guneydogu-anadolu",
    name: "Güneydoğu Anadolu",
    tagline: "Bin yıllık taş şehirler, mezopotamya lezzetleri",
    description:
      "Mardin'in taş evleri, Göbeklitepe'nin gizemi ve Gaziantep'in mutfağıyla Türkiye'nin en köklü topraklarından biri.",
    gradientFrom: "#8A2B45",
    gradientTo: "#B33A5E",
    cityCount: 0,
  },
];

export function getRegion(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}
