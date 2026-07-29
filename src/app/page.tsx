import Link from "next/link";
import { Compass, Utensils, Wallet, MapPinned } from "lucide-react";
import { regions } from "@/lib/data/regions";
import { allCities } from "@/lib/data/cities";
import RegionCard from "@/components/RegionCard";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function Home() {
  const featuredCities = allCities.slice(0, 6);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pt-24">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-safran/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-kiremit">
          <Compass size={14} /> Bölge bölge Türkiye
        </p>
        <h1 className="max-w-3xl font-display text-4xl italic leading-tight text-ink sm:text-6xl">
          Yola çıkmadan önce oku, yolda not düş.
        </h1>
        <p className="mt-6 max-w-xl text-base text-ink/70 sm:text-lg">
          Yol Defteri, Türkiye&apos;yi tek seferde değil, bölge bölge anlatan
          bir gezi rehberi. Nasıl gidilir, nerede kalınır, ne yenir, ne kadar
          bütçe gerekir — her şey durak durak burada.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/bolgeler"
            className="rounded-full bg-kiremit px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-ink"
          >
            Bölgeleri keşfet
          </Link>
          <Link
            href="/bolgeler/karadeniz"
            className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-kiremit hover:text-kiremit"
          >
            Karadeniz ile başla
          </Link>
        </div>
      </section>

      <div className="route-dotted-line h-px w-full" />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl italic text-ink">Bölgeler</h2>
          <Link
            href="/bolgeler"
            className="text-sm font-medium text-kiremit hover:underline"
          >
            Tümünü gör
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region) => (
            <RegionCard key={region.slug} region={region} />
          ))}
        </div>
      </section>

      {featuredCities.length > 0 && (
        <section className="bg-ink/[0.03] py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-8 font-display text-3xl italic text-ink">
              Öne çıkan şehir rehberleri
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/bolgeler/${city.regionSlug}/${city.slug}`}
                  className="group overflow-hidden rounded-2xl border border-ink/10 bg-paper transition-all hover:border-kiremit hover:shadow-lg"
                >
                  <PlaceholderImage seed={city.slug} label={city.region} aspect="wide" />
                  <div className="p-6">
                    <h3 className="font-display text-xl italic text-ink group-hover:text-kiremit">
                      {city.name}
                    </h3>
                    <p className="mt-2 text-sm text-ink/70 line-clamp-2">{city.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-ink/50">
                      <span className="flex items-center gap-1">
                        <MapPinned size={13} /> {city.attractions.length} yer
                      </span>
                      <span className="flex items-center gap-1">
                        <Wallet size={13} /> {city.budget.split(" ")[0]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Utensils size={13} /> {city.localFood.length} lezzet
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
