import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPinned, UtensilsCrossed, Soup } from "lucide-react";
import { getRegion, regions } from "@/lib/data/regions";
import { getCitiesByRegion } from "@/lib/data/cities";
import { RegionSlug } from "@/lib/types";
import PlaceholderImage from "@/components/PlaceholderImage";

export async function generateMetadata(props: { params: Promise<{ region: string }> }) {
  const params = await props.params;
  const region = getRegion(params.region as RegionSlug);
  if (!region) return { title: "Bölge bulunamadı" };
  return {
    title: `${region.name} Gezi Rehberi`,
    description: region.description,
  };
}

export async function generateStaticParams() {
  return regions.map((r) => ({ region: r.slug }));
}

export default async function RegionPage(props: {
  params: Promise<{ region: string }>;
}) {
  const params = await props.params;
  const region = getRegion(params.region as RegionSlug);
  const cities = getCitiesByRegion(params.region as RegionSlug);

  if (!region) {
    notFound();
  }

  return (
    <div>
      <div
        className="relative h-64 text-paper sm:h-80"
        style={{
          backgroundImage: `linear-gradient(135deg, ${region.gradientFrom}, ${region.gradientTo})`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
          <Link
            href="/bolgeler"
            className="mb-4 flex w-fit items-center gap-2 rounded-full bg-paper/20 px-3 py-1 text-xs font-semibold text-paper hover:bg-paper/30 sm:px-4 sm:py-2"
          >
            <ArrowLeft size={16} /> Geri
          </Link>
          <h1 className="font-display text-4xl italic sm:text-5xl">
            {region.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-paper/90 sm:text-base">
            {region.tagline}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="mb-8 max-w-3xl text-base text-ink/70">{region.description}</p>

        {cities.length > 0 ? (
          <div>
            <h2 className="mb-6 font-display text-3xl italic text-ink">
              Şehir Rehberleri
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/bolgeler/${region.slug}/${city.slug}`}
                  className="group overflow-hidden rounded-xl border border-ink/10 bg-paper transition-all hover:border-kiremit hover:shadow-lg"
                >
                  <PlaceholderImage seed={city.slug} label={city.name} aspect="wide" />
                  <div className="p-5">
                    <h3 className="font-display text-xl italic text-ink group-hover:text-kiremit">
                      {city.name}
                    </h3>
                    <p className="mt-2 text-sm text-ink/70 line-clamp-2">{city.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-ink/50">
                      <span className="flex items-center gap-1">
                        <MapPinned size={12} /> {city.attractions.length} yer
                      </span>
                      <span className="flex items-center gap-1">
                        <UtensilsCrossed size={12} /> {city.restaurants.length} restoran
                      </span>
                      <span className="flex items-center gap-1">
                        <Soup size={12} /> {city.localFood.length} lezzet
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p className="rounded-lg border border-safran/20 bg-safran/5 p-6 text-center text-ink/70">
            Bu bölge için içerik yakında yayına alınacaktır. Lütfen yakında
            tekrar ziyaret edin.
          </p>
        )}
      </div>
    </div>
  );
}
