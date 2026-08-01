import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPinned, UtensilsCrossed, Soup } from "lucide-react";
import { getRegion, regions } from "@/lib/data/regions";
import { getCitiesByRegion } from "@/lib/data/cities";
import { RegionSlug } from "@/lib/types";
import PlaceholderImage from "@/components/PlaceholderImage";
import { getDictionary, Locale, translateDataText, buildAlternates } from "@/lib/i18n";
import { REGION_IMAGES } from "@/lib/cityImages";

export async function generateMetadata(props: { params: Promise<{ region: string; locale: string }> }) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const region = getRegion(params.region as RegionSlug);
  if (!region) return { title: "Bölge bulunamadı" };
  
  const guideSuffix = locale === "tr"
    ? "Gezi Rehberi"
    : locale === "de"
    ? "Reiseführer"
    : locale === "ar"
    ? "دليل السفر"
    : "Travel Guide";

  const regionImg = REGION_IMAGES[region.slug] || REGION_IMAGES.marmara;
  return {
    title: `${translateDataText(region.name, locale)} ${guideSuffix}`,
    description: translateDataText(region.description, locale),
    alternates: buildAlternates(locale, `/bolgeler/${region.slug}`),
    openGraph: {
      title: `${translateDataText(region.name, locale)} ${guideSuffix}`,
      description: translateDataText(region.description, locale),
      images: [
        {
          url: regionImg,
          width: 960,
          height: 450,
          alt: translateDataText(region.name, locale),
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const paramsList = [];
  const locales = ["tr", "en", "de", "ar"];
  for (const locale of locales) {
    for (const r of regions) {
      paramsList.push({ region: r.slug, locale });
    }
  }
  return paramsList;
}

export default async function RegionPage(props: {
  params: Promise<{ region: string; locale: string }>;
}) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const dict = getDictionary(locale);
  const region = getRegion(params.region as RegionSlug);
  const cities = getCitiesByRegion(params.region as RegionSlug);

  if (!region) {
    notFound();
  }

  const noCitiesText = locale === "tr"
    ? "Bu bölge için içerik yakında yayına alınacaktır. Lütfen yakında tekrar ziyaret edin."
    : locale === "de"
    ? "Inhalte für diese Region werden in Kürze veröffentlicht. Bitte besuchen Sie uns bald wieder."
    : locale === "ar"
    ? "سيتم نشر محتوى هذه المنطقة قريباً. يرجى زيارتنا مرة أخرى قريباً."
    : "Content for this region will be published soon. Please check back later.";

  const cityGuidesTitle = locale === "tr"
    ? "Şehir Rehberleri"
    : locale === "de"
    ? "Stadtführer"
    : locale === "ar"
    ? "أدلة المدن"
    : "City Guides";

  const bgImage = REGION_IMAGES[region.slug] || REGION_IMAGES.marmara;

  return (
    <div>
      <div className="relative h-64 text-paper sm:h-80 overflow-hidden">
        {/* Background Image with dark overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt={translateDataText(region.name, locale)}
            className="h-full w-full object-cover filter brightness-[0.7] contrast-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20 opacity-90" />
        </div>

        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-10">
          <Link
            href={`/${locale}/bolgeler`}
            className="mb-4 flex w-fit items-center gap-2 rounded-full bg-paper/20 px-3 py-1.5 text-xs font-semibold text-paper hover:bg-paper/30 transition-colors sm:px-4 sm:py-2"
          >
            <ArrowLeft size={15} /> {dict.city.back}
          </Link>
          <h1 className="font-display text-4xl italic sm:text-5xl drop-shadow-md">
            {translateDataText(region.name, locale)}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-paper/90 sm:text-base drop-shadow-sm">
            {translateDataText(region.tagline, locale)}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="mb-8 max-w-3xl text-base text-ink/70 leading-relaxed border-l-2 border-kiremit pl-4">
          {translateDataText(region.description, locale)}
        </p>

        {cities.length > 0 ? (
          <div>
            <h2 className="mb-6 font-display text-3xl italic text-ink">
              {cityGuidesTitle}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((city, idx) => (
                <Link
                  key={city.slug}
                  href={`/${locale}/bolgeler/${region.slug}/${city.slug}`}
                  className="group overflow-hidden rounded-xl border border-ink/10 bg-paper transition-all duration-300 hover:border-kiremit hover:shadow-xl hover:-translate-y-1"
                >
                  <PlaceholderImage seed={city.slug} regionSlug={city.regionSlug} label={translateDataText(city.name, locale)} aspect="wide" index={idx} />
                  <div className="p-5">
                    <h3 className="font-display text-xl italic text-ink group-hover:text-kiremit transition-colors">
                      {translateDataText(city.name, locale)}
                    </h3>
                    <p className="mt-2 text-sm text-ink/70 line-clamp-2">{translateDataText(city.summary, locale)}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-ink/50 border-t border-ink/5 pt-4">
                      <span className="flex items-center gap-1">
                        <MapPinned size={12} /> {city.attractions.length} {dict.city.stopsCount}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-kiremit">
                        <UtensilsCrossed size={12} /> {city.restaurants.length} {dict.city.restaurantsCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Soup size={12} /> {city.localFood.length} {dict.city.foodCount}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p className="rounded-lg border border-safran/20 bg-safran/5 p-6 text-center text-ink/70">
            {noCitiesText}
          </p>
        )}
      </div>
    </div>
  );
}
