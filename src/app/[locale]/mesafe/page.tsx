import Link from "next/link";
import { Route as RouteIcon } from "lucide-react";
import { Locale, buildAlternates, buildRobots, buildPageSocialMeta, translateDataText } from "@/lib/i18n";
import { getAllDistancePageData } from "@/lib/data/distances";
import Breadcrumbs from "@/components/Breadcrumbs";

// Denetim bulgusu (2026-09): 150 mesafe sayfasının (madde 150) crawl edilebilir
// bir merkezi yoktu (/mesafe 404) — sadece şehir sayfalarındaki bloklar ve
// sitemap üzerinden keşfediliyordu. Bu hub, hepsine tek sayfadan iç link verir
// ve "şehirler arası mesafe" genel sorgusuna hedef sayfa olur. Tüm km/süre
// değerleri distanceCache.json'daki gerçek Mapbox verisinden okunur.
export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const total = getAllDistancePageData().length;
  const title =
    locale === "tr"
      ? `Şehirler Arası Mesafe Tablosu — ${total} Rota, Km ve Süre`
      : `Distances Between Turkish Cities — ${total} Routes`;
  const description =
    locale === "tr"
      ? `Türkiye'de popüler ${total} şehir çifti arasındaki karayolu mesafesi ve ortalama sürüş süresi — gerçek rota verisiyle, tek tabloda.`
      : `Real driving distance and average drive time for ${total} popular city pairs in Turkey.`;
  return {
    title,
    description,
    robots: buildRobots(locale),
    alternates: buildAlternates(locale, "/mesafe"),
    ...buildPageSocialMeta(locale, "/mesafe", title, description),
  };
}

function formatDuration(min: number, locale: Locale): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (locale === "tr") return [h > 0 ? `${h} sa` : null, m > 0 ? `${m} dk` : null].filter(Boolean).join(" ");
  return [h > 0 ? `${h}h` : null, m > 0 ? `${m}min` : null].filter(Boolean).join(" ");
}

export default async function DistanceHubPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const isTr = locale === "tr";
  const all = getAllDistancePageData();

  // Her şehir için, dahil olduğu tüm çiftler (bir çift iki şehrin altında da
  // görünür — kullanıcı iki yönde de arar, aynı kanonik URL'e link verir).
  const byCity = new Map<string, { name: string; rows: { slug: string; other: string; km: number; min: number }[] }>();
  for (const d of all) {
    for (const [self, other] of [[d.cityA, d.cityB], [d.cityB, d.cityA]] as const) {
      if (!byCity.has(self.slug)) byCity.set(self.slug, { name: self.name, rows: [] });
      byCity.get(self.slug)!.rows.push({ slug: d.slug, other: other.name, km: d.distanceKm, min: d.durationMin });
    }
  }
  const groups = Array.from(byCity.values())
    .map((g) => ({ ...g, rows: g.rows.sort((a, b) => a.km - b.km) }))
    .sort((a, b) => a.name.localeCompare(b.name, "tr"));

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Breadcrumbs
        items={[
          { label: isTr ? "Ana Sayfa" : "Home", href: `/${locale}` },
          { label: isTr ? "Mesafeler" : "Distances" },
        ]}
      />
      <h1 className="font-display text-3xl italic text-ink sm:text-4xl mb-4">
        {isTr ? "Şehirler Arası Mesafe Tablosu" : "Distances Between Turkish Cities"}
      </h1>
      <p className="mb-10 max-w-3xl text-base leading-relaxed text-ink/75">
        {isTr
          ? `Türkiye'nin popüler ${all.length} şehir çifti için karayoluyla gerçek mesafe ve ortalama sürüş süresi. Bir çifte tıklayarak güzergah üzerindeki ana yolları, ulaşım seçeneklerini ve her iki şehrin gezi bilgilerini görebilirsin.`
          : `Real road distance and average driving time for ${all.length} popular city pairs in Turkey. Open a pair for the main roads, transport options and travel info for both cities.`}
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {groups.map((g) => (
          <section key={g.name} className="rounded-xl border border-ink/10 bg-paper p-5 shadow-sm">
            <h2 className="mb-3 font-display text-xl italic text-ink">
              {isTr ? `${translateDataText(g.name, locale)} — Diğer Şehirlere Mesafe` : `From ${translateDataText(g.name, locale)}`}
            </h2>
            <ul className="divide-y divide-ink/5 text-sm">
              {g.rows.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${locale}/mesafe/${r.slug}`}
                    className="flex items-center justify-between gap-3 py-2 text-ink/80 hover:text-kiremit transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <RouteIcon size={13} className="shrink-0 text-kiremit" />
                      {translateDataText(g.name, locale)} – {translateDataText(r.other, locale)}
                    </span>
                    <span className="shrink-0 text-xs text-ink/60">
                      {r.km} km · {formatDuration(r.min, locale)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
