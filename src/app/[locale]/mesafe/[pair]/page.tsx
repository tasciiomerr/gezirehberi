import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Route as RouteIcon } from "lucide-react";
import { Locale, buildAlternates, buildRobots, buildPageSocialMeta, translateDataText } from "@/lib/i18n";
import { getAllDistancePageData, getDistancePageData, buildDistanceDescription } from "@/lib/data/distances";
import { buildStopDirectionsUrl } from "@/lib/geo";
import AdSlot from "@/components/AdSlot";

export async function generateStaticParams() {
  return getAllDistancePageData().map((d) => ({ pair: d.slug }));
}

export async function generateMetadata(props: { params: Promise<{ pair: string; locale: string }> }) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const data = getDistancePageData(params.pair);
  if (!data) return { title: locale === "tr" ? "Sayfa bulunamadı" : "Page not found" };

  const title =
    locale === "tr"
      ? `${data.cityA.name} - ${data.cityB.name} Arası Kaç Km? Mesafe ve Yol Tarifi`
      : `${data.cityA.name} to ${data.cityB.name} Distance`;
  const description =
    locale === "tr"
      ? `${data.cityA.name} ile ${data.cityB.name} arası ${data.distanceKm} km, ortalama sürüş süresi ve gerçek güzergah bilgisi.`
      : `Real driving distance between ${data.cityA.name} and ${data.cityB.name}: ${data.distanceKm} km.`;

  return {
    title,
    description,
    robots: buildRobots(locale),
    alternates: buildAlternates(locale, `/mesafe/${data.slug}`),
    ...buildPageSocialMeta(locale, `/mesafe/${data.slug}`, title, description),
  };
}

export default async function DistancePage(props: { params: Promise<{ pair: string; locale: string }> }) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const data = getDistancePageData(params.pair);

  if (!data) {
    notFound();
  }

  const { cityA, cityB, distanceKm, durationMin, majorRoads } = data;
  const description = buildDistanceDescription(data, locale);
  const directionsUrl = buildStopDirectionsUrl(cityB.location, cityA.location, "driving");
  const hours = Math.floor(durationMin / 60);
  const minutes = durationMin % 60;
  const durationLabel =
    locale === "tr"
      ? [hours > 0 ? `${hours} sa` : null, minutes > 0 ? `${minutes} dk` : null].filter(Boolean).join(" ")
      : [hours > 0 ? `${hours}h` : null, minutes > 0 ? `${minutes}min` : null].filter(Boolean).join(" ");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href={`/${locale}/bolgeler/${cityA.regionSlug}/${cityA.slug}`}
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-ink/65 hover:text-kiremit transition-colors"
      >
        <ArrowLeft size={15} /> {translateDataText(cityA.name, locale)}
      </Link>

      <h1 className="font-display text-3xl italic text-ink sm:text-4xl mb-6">
        {locale === "tr"
          ? `${cityA.name} - ${cityB.name} Arası Kaç Km?`
          : `${cityA.name} to ${cityB.name} Distance`}
      </h1>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-ink/10 bg-paper p-4 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-kiremit mb-1 flex items-center gap-1.5">
            <RouteIcon size={13} /> {locale === "tr" ? "Mesafe" : "Distance"}
          </div>
          <p className="text-lg font-bold text-ink">{distanceKm} km</p>
        </div>
        <div className="rounded-lg border border-ink/10 bg-paper p-4 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-kiremit mb-1 flex items-center gap-1.5">
            <Clock size={13} /> {locale === "tr" ? "Sürüş Süresi" : "Drive Time"}
          </div>
          <p className="text-lg font-bold text-ink">{durationLabel}</p>
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-kiremit px-4 py-4 text-sm font-bold text-paper shadow-sm hover:bg-kiremit/90 transition-colors sm:col-span-1"
        >
          <MapPin size={16} /> {locale === "tr" ? "Yol Tarifi Al" : "Get Directions"}
        </a>
      </div>

      <p className="text-base text-ink/80 leading-relaxed mb-8">{description}</p>

      {majorRoads.length > 0 && (
        <div className="mb-10 rounded-lg border border-ink/10 bg-safran/5 p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-kiremit mb-2">
            {locale === "tr" ? "Güzergah Üzerindeki Ana Yollar" : "Main Roads on This Route"}
          </div>
          <p className="text-sm text-ink/75">{majorRoads.join(", ")}</p>
        </div>
      )}

      <AdSlot />

      <div className="mt-12 border-t border-ink/10 pt-8">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-kiremit">
          {locale === "tr" ? "İlgili Şehirler" : "Related Cities"}
        </h2>
        <div className="flex flex-wrap gap-3">
          {[cityA, cityB].map((city) => (
            <Link
              key={city.slug}
              href={`/${locale}/bolgeler/${city.regionSlug}/${city.slug}`}
              className="flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink/75 hover:border-kiremit hover:text-kiremit transition-colors"
            >
              <MapPin size={14} className="text-kiremit shrink-0" />
              {translateDataText(city.name, locale)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
