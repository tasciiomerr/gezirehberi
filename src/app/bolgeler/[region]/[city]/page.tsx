import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import CityHero from "@/components/CityHero";
import WishlistButton from "@/components/WishlistButton";
import ItinerarySection from "@/components/ItinerarySection";
import CityContentSections from "@/components/CityContentSections";
import Gallery from "@/components/Gallery";
import StickyPlanBar from "@/components/StickyPlanBar";
import { getCity, getAllCitySlugs } from "@/lib/data/cities";

export async function generateStaticParams() {
  return getAllCitySlugs();
}

export async function generateMetadata(props: {
  params: Promise<{ region: string; city: string }>;
}) {
  const params = await props.params;
  const city = getCity(params.region, params.city);
  if (!city) return { title: "Şehir bulunamadı" };
  return {
    title: city.title,
    description: city.summary,
  };
}

export default async function CityDetailPage(props: {
  params: Promise<{ city: string; region: string }>;
}) {
  const params = await props.params;
  const city = getCity(params.region, params.city);

  if (!city) {
    notFound();
  }

  const galleryImages = city.attractions.flatMap((a) => a.images).slice(0, 4);

  return (
    <div>
      <div className="relative">
        <CityHero city={city} />
        <div className="absolute right-4 top-20 sm:right-8 sm:top-24">
          <WishlistButton citySlug={city.slug} regionSlug={city.regionSlug} cityName={city.name} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 pb-24 sm:px-6 sm:pb-12">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href={`/bolgeler/${city.regionSlug}`}
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold text-ink hover:border-kiremit hover:text-kiremit transition-colors"
          >
            <ArrowLeft size={16} /> Geri
          </Link>
          <WishlistButton
            citySlug={city.slug}
            regionSlug={city.regionSlug}
            cityName={city.name}
            variant="inline"
          />
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl italic text-ink mb-4">Hakkında</h2>
            <p className="text-base text-ink/70 leading-relaxed mb-6">{city.longDescription}</p>

            <Gallery images={galleryImages} fallbackSeed={city.slug} />

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { label: "En İyi Zaman", value: city.whenToGo },
                { label: "Ulaşım", value: city.howToGetThere },
                { label: "Bütçe", value: city.budget },
                { label: "İdeal Süre", value: city.bestDuration },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-ink/10 bg-paper p-4 hover:border-kiremit/50 transition-colors"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide text-kiremit mb-1">
                    {item.label}
                  </div>
                  <p className="text-sm text-ink/80">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-ink/10 bg-gradient-to-br from-safran/10 to-kiremit/5 p-6">
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-kiremit mb-2">
                  Konum
                </div>
                <div className="flex items-center gap-2 text-sm text-ink/80">
                  <MapPin size={16} className="text-kiremit" />
                  {city.region}
                </div>
              </div>
              <div className="border-t border-ink/10 pt-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-kiremit mb-3">
                  Hızlı İstatistikler
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-ink/70">🏨 {city.accommodations.length} Konaklama Seçeneği</p>
                  <p className="text-ink/70">🍽️ {city.restaurants.length} Restoran</p>
                  <p className="text-ink/70">📍 {city.attractions.length} Gezilecek Yer</p>
                  <p className="text-ink/70">🍴 {city.localFood.length} Yöresel Yemek</p>
                </div>
              </div>
              {city.highlights.length > 0 && (
                <div className="border-t border-ink/10 pt-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-kiremit mb-3">
                    Öne Çıkanlar
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {city.highlights.map((h) => (
                      <span key={h} className="rounded-full bg-paper px-2.5 py-1 text-xs text-ink/70 border border-ink/10">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div id="itinerary-section" className="mb-20 scroll-mt-20">
          <ItinerarySection city={city} />
        </div>

        <CityContentSections
          attractions={city.attractions}
          restaurants={city.restaurants}
          localFood={city.localFood}
          accommodations={city.accommodations}
        />
      </div>

      <StickyPlanBar cityName={city.name} />
    </div>
  );
}
