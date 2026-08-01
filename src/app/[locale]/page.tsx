import Link from "next/link";
import { Compass, Utensils, Wallet, MapPinned } from "lucide-react";
import { regions } from "@/lib/data/regions";
import { allCities } from "@/lib/data/cities";
import RegionCard from "@/components/RegionCard";
import PlaceholderImage from "@/components/PlaceholderImage";
import { getDictionary, Locale, translateDataText, buildAlternates } from "@/lib/i18n";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const dict = getDictionary(locale);

  return {
    title: dict.home.title,
    description: dict.home.subtitle,
    alternates: buildAlternates(locale, ""),
  };
}

export default async function Home(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const dict = getDictionary(locale);

  const featuredCities = allCities.slice(0, 6);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pt-24">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-safran/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-kiremit">
          <Compass size={14} /> {dict.home.badge}
        </p>
        <h1 className="max-w-3xl font-display text-4xl italic leading-tight text-ink sm:text-6xl">
          {dict.home.title}
        </h1>
        <p className="mt-6 max-w-xl text-base text-ink/70 sm:text-lg">
          {dict.home.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/bolgeler`}
            className="rounded-full bg-kiremit px-6 py-3 text-sm font-semibold text-paper transition-all hover:bg-ink hover:scale-105"
          >
            {dict.home.explore}
          </Link>
          <Link
            href={`/${locale}/bolgeler/karadeniz`}
            className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-all hover:border-kiremit hover:text-kiremit hover:scale-105"
          >
            {dict.home.startBlacksea}
          </Link>
        </div>
      </section>

      <div className="route-dotted-line h-px w-full animate-pulse" />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl italic text-ink">{dict.nav.regions}</h2>
          <Link
            href={`/${locale}/bolgeler`}
            className="text-sm font-semibold text-kiremit hover:underline"
          >
            {locale === "tr" ? "Tümünü gör" : locale === "de" ? "Alle anzeigen" : locale === "ar" ? "عرض الكل" : "See all"}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region) => (
            <RegionCard key={region.slug} region={region} locale={locale} />
          ))}
        </div>
      </section>

      {featuredCities.length > 0 && (
        <section className="bg-ink/[0.02] py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-8 font-display text-3xl italic text-ink">
              {dict.home.featured}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredCities.map((city, idx) => (
                <Link
                  key={city.slug}
                  href={`/${locale}/bolgeler/${city.regionSlug}/${city.slug}`}
                  className="group overflow-hidden rounded-2xl border border-ink/10 bg-paper transition-all duration-300 hover:border-kiremit hover:shadow-xl hover:-translate-y-1"
                >
                  <PlaceholderImage seed={city.slug} regionSlug={city.regionSlug} label={translateDataText(city.region, locale)} aspect="wide" index={idx} />
                  <div className="p-6">
                    <h3 className="font-display text-xl italic text-ink group-hover:text-kiremit transition-colors">
                      {translateDataText(city.name, locale)}
                    </h3>
                    <p className="mt-2 text-sm text-ink/70 line-clamp-2">{translateDataText(city.summary, locale)}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-ink/50 border-t border-ink/5 pt-4">
                      <span className="flex items-center gap-1">
                        <MapPinned size={13} /> {city.attractions.length} {dict.city.stopsCount}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-kiremit">
                        <Wallet size={13} /> {translateDataText(city.budget.split(" ")[0], locale)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Utensils size={13} /> {city.localFood.length} {dict.city.foodCount}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
