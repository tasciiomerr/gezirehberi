import Link from "next/link";
import type { ReactNode } from "react";
import type { City } from "@/lib/types";
import { CITY_CODES } from "@/lib/data/cityCodes";
import { getCityKnownFor } from "@/lib/data/knownFor";
import { getCityAirports } from "@/lib/data/airports";
import { getDistanceLinksForCity, formatDuration } from "@/lib/data/distances";
import { ablative, dative } from "@/lib/trSuffix";
import { withLocative } from "@/lib/turkish";

// "X plaka kodu", "X alan kodu", "X hangi bölgede", "İstanbul'dan X kaç km",
// "X neyle ünlü", "X'e en yakın havalimanı" gibi şehir hakkında en çok aranan,
// kısa cevaplı sorular (2026-11-02). Her cevap mevcut gerçek veriden; sayfada
// görünür metin olarak sunulur (FAQ şeması FAQSection'da zaten var).
const HUBS = [
  { slug: "istanbul", name: "İstanbul" },
  { slug: "ankara", name: "Ankara" },
  { slug: "izmir", name: "İzmir" },
];

function firstSentences(text: string, n: number) {
  const parts = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  return parts.slice(0, n).join(" ").trim();
}

export default function CityPopularQuestions({ city, locale }: { city: City; locale: string }) {
  const codes = CITY_CODES[city.slug];
  const links = getDistanceLinksForCity(city.slug);
  const known = getCityKnownFor(city.slug);
  const airports = getCityAirports(city.slug);
  const isDistrict = Boolean(codes) && codes[0] !== city.name;

  const qa: { q: string; a: ReactNode }[] = [];

  if (codes) {
    const [province, plate, area] = codes;
    const plateText = String(plate).padStart(2, "0");
    qa.push({
      q: `${city.name} plaka kodu kaç?`,
      a: isDistrict
        ? `${city.name}, ${province} iline bağlıdır; araç plaka kodu ${plateText}'dir.`
        : `${city.name} plaka kodu ${plateText}'dir.`,
    });
    qa.push({
      q: `${city.name} telefon alan kodu kaç?`,
      a: isDistrict
        ? `${city.name} için telefon alan kodu ${area} (${province} il kodu).`
        : `${city.name} telefon alan kodu ${area}.`,
    });
  }

  qa.push({
    q: isDistrict && codes ? `${city.name} hangi ilde, hangi bölgede?` : `${city.name} hangi bölgede?`,
    a:
      isDistrict && codes
        ? `${city.name}, ${codes[0]} iline bağlıdır ve ${city.region} bölgesinde yer alır.`
        : `${city.name}, ${city.region} bölgesinde yer alır.`,
  });

  if (known) {
    qa.push({ q: `${city.name} neyle ünlü, ne meşhur?`, a: firstSentences(known, 3) });
  }

  for (const h of HUBS) {
    if (h.slug === city.slug) continue;
    const l = links.find((x) => x.otherCitySlug === h.slug);
    if (!l) continue;
    qa.push({
      q: `${ablative(h.name)} ${dative(city.name)} kaç km, kaç saat?`,
      a: (
        <>
          {`${h.name} ile ${city.name} arası karayoluyla yaklaşık ${Math.round(l.distanceKm)} km, arabayla trafiksiz yaklaşık ${formatDuration(l.durationMin, "tr")}. `}
          <Link href={`/${locale}/mesafe/${l.slug}`} className="font-semibold text-kiremit hover:underline">
            Yol tarifi ve güzergah →
          </Link>
        </>
      ),
    });
  }

  if (airports.length > 0) {
    const a = airports[0];
    qa.push({
      q: `${city.name} en yakın havalimanı hangisi?`,
      a: `${city.name} için en yakın havalimanı ${a.airport.name} (${a.airport.iata}): karayoluyla yaklaşık ${Math.round(a.distanceKm)} km, ${formatDuration(a.durationMin, "tr")}.`,
    });
  }

  if (city.bestDuration) qa.push({ q: `${city.name} kaç günde gezilir?`, a: city.bestDuration });
  if (city.whenToGo) qa.push({ q: `${dative(city.name)} hangi ay gidilir?`, a: city.whenToGo });
  if (city.attractions.length > 0) {
    qa.push({
      q: `${withLocative(city.name)} ne yapılır, nereler gezilir?`,
      a: `Öne çıkan yerler: ${city.attractions.slice(0, 5).map((x) => x.name).join(", ")}.`,
    });
  }

  if (qa.length < 4) return null;

  return (
    <section className="mt-16 border-t border-ink/10 pt-16">
      <h2 className="mb-6 font-display text-3xl italic text-ink">{city.name} Hakkında En Çok Sorulanlar</h2>
      <dl className="grid gap-4 md:grid-cols-2">
        {qa.map((item) => (
          <div key={item.q} className="rounded-xl border border-ink/10 bg-paper p-5 shadow-sm">
            <dt className="text-base font-bold text-ink">{item.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-ink/75">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
