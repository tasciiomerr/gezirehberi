import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getRegion } from "@/lib/data/regions";
import { getCitiesByRegion } from "@/lib/data/cities";
import { RegionSlug } from "@/lib/types";

export function generateMetadata(props: { params: Promise<{ region: string }> }) {
  return {
    title: "Bölge yükle ediyor...",
  };
}

export async function generateStaticParams() {
  return [
    { region: "karadeniz" },
    { region: "ege" },
    { region: "akdeniz" },
    { region: "marmara" },
    { region: "ic-anadolu" },
    { region: "dogu-anadolu" },
    { region: "guneydogu-anadolu" },
  ];
}

export default async function RegionPage(props: {
  params: Promise<{ region: string }>;
}) {
  const params = await props.params;
  const region = getRegion(params.region as RegionSlug);
  const cities = getCitiesByRegion(params.region as RegionSlug);

  if (!region) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-ink/70">Bölge bulunamadı.</p>
      </div>
    );
  }

  return (
    <div>
      <div
        className="relative h-64 text-paper sm:h-80"
        style={{
          backgroundImage: `linear-gradient(135deg, ${region.gradientFrom}, ${region.gradientTo})`,
        }}
      >
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
        <p className="mb-8 text-base text-ink/70">{region.description}</p>

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
                  className="group rounded-xl border border-ink/10 bg-paper p-6 transition-all hover:border-kiremit hover:shadow-md"
                >
                  <h3 className="font-display text-xl italic text-ink group-hover:text-kiremit">
                    {city.name}
                  </h3>
                  <p className="mt-3 text-sm text-ink/70">{city.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {("itineraries" in city && city.itineraries ? city.itineraries : []).map(
                      (route) => (
                        <span
                          key={route.days}
                          className="rounded-full bg-safran/20 px-3 py-1 text-xs text-kiremit"
                        >
                          {route.days} gün
                        </span>
                      )
                    )}
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
