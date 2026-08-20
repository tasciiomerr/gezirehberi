import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, BedDouble, UtensilsCrossed, MapPinned, Soup } from "lucide-react";
import CityHero from "@/components/CityHero";
import WishlistButton from "@/components/WishlistButton";
import ItinerarySection from "@/components/ItinerarySection";
import CityContentSections from "@/components/CityContentSections";
import CommunityRoutes from "@/components/CommunityRoutes";
import ContentAccuracyFeedback from "@/components/ContentAccuracyFeedback";
import ConfusedPlacesWarning from "@/components/ConfusedPlacesWarning";
import HiddenGemBadge from "@/components/HiddenGemBadge";
import KnownForSection from "@/components/KnownForSection";
import { CampingSection, FilmLocationsSection } from "@/components/TravelStyleSections";
import Gallery from "@/components/Gallery";
import StickyPlanBar from "@/components/StickyPlanBar";
import AudioGuide from "@/components/AudioGuide";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getCity, getAllCitySlugs, allCities, getContentLastUpdated, isHiddenGem } from "@/lib/data/cities";
import { getConfusablePlaces } from "@/lib/data/confusablePlaces";
import RelatedCities from "@/components/RelatedCities";
import AdSlot from "@/components/AdSlot";
import { getRegionThemeStyle } from "@/lib/regionTheme";
import { getDictionary, Locale, translateDataText, buildAlternates, buildRobots, getAccommodationTypeLabel, SITE_URL } from "@/lib/i18n";
import { getCityImage } from "@/lib/cityImages";
import FAQSection from "@/components/FAQSection";
import ArrivalOptionsTable from "@/components/ArrivalOptionsTable";
import BudgetTierTable from "@/components/BudgetTierTable";
import { getNextMondayISO, getDynamicPrice } from "@/lib/pricingEngine";
import { getPlacesForCity } from "@/lib/places";
import { getTranslatedCity, cityHasTranslation, getTranslatedKnownFor } from "@/lib/translation/pipeline";
import { getGuidesForCity } from "@/lib/data/guides";
import { BookOpen } from "lucide-react";

export async function generateStaticParams() {
  const slugs = getAllCitySlugs();
  const locales = ["tr", "en", "de", "ar", "ru"];
  const paramsList = [];
  for (const locale of locales) {
    for (const s of slugs) {
      paramsList.push({ region: s.region, city: s.city, locale });
    }
  }
  return paramsList;
}

export async function generateMetadata(props: {
  params: Promise<{ region: string; city: string; locale: string }>;
}) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const rawCity = getCity(params.region, params.city);
  if (!rawCity) return { title: "Şehir bulunamadı" };
  const city = await getTranslatedCity(rawCity, locale);
  // Per-page indexing override (see buildRobots) — a city that has actually
  // been through the real translation pipeline is indexable even while its
  // locale is still noindexed by default; a city with no cache entry yet
  // stays noindexed, so this can't accidentally index the other ~82 cities.
  const rawCityRecord = rawCity as unknown as Record<string, unknown>;
  const hasTranslation = await cityHasTranslation(rawCityRecord, locale);
  // Hreflang must match indexability exactly (report item 283's "no
  // contradictory signal" rule) — so it's built from the same per-city check
  // rather than the site-wide TRANSLATED_LOCALES default, one call per
  // candidate locale (cheap: each is a single cached-file read).
  const candidateLocales: Locale[] = ["en", "de", "ar", "ru"];
  const translatedLocaleChecks = await Promise.all(
    candidateLocales.map((l) => cityHasTranslation(rawCityRecord, l))
  );
  const extraHreflangLocales = candidateLocales.filter((_, i) => translatedLocaleChecks[i]);
  const bgImage = getCityImage(city.slug, city.regionSlug);
  const title = translateDataText(city.title, locale);
  const description = translateDataText(city.summary, locale);
  const pageUrl = `${SITE_URL}/${locale}/bolgeler/${city.regionSlug}/${city.slug}`;
  return {
    title,
    description,
    robots: buildRobots(locale, hasTranslation),
    alternates: buildAlternates(locale, `/bolgeler/${city.regionSlug}/${city.slug}`, extraHreflangLocales),
    openGraph: {
      // Explicit url — without it this silently inherits the homepage's og:url from
      // the root layout on every city page (report item 10).
      url: pageUrl,
      title,
      description,
      images: [
        {
          url: bgImage,
          width: 960,
          height: 600,
          alt: translateDataText(city.name, locale),
        },
      ],
    },
    // Without its own twitter block, this page inherited the homepage's generic
    // twitter:title/description from the root layout (report item 13).
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CityDetailPage(props: {
  params: Promise<{ city: string; region: string; locale: string }>;
}) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const dict = getDictionary(locale);
  const rawCity = getCity(params.region, params.city);

  if (!rawCity) {
    notFound();
  }

  // Overlays real DeepL/Google-translated text from the cache built by
  // scripts/translate-content.ts onto the curated fields only (report items
  // 34/167/283) — cities with no cache entries yet fall back to the raw
  // Turkish text untouched, same as before this pipeline existed.
  const city = await getTranslatedCity(rawCity, locale);
  const knownForText = await getTranslatedKnownFor(city.slug, locale);
  const relatedGuides = getGuidesForCity(city.slug);

  // Server-rendered first page of the default (attractions/popularity) list, so the
  // initial HTML already contains real results instead of the client-only empty state.
  const initialPlaces = getPlacesForCity(city.slug, { type: "attractions", limit: 24 });

  const galleryImages = city.attractions.flatMap((a) => a.images).slice(0, 4);

  const bgImage = getCityImage(city.slug, city.regionSlug);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === "tr" ? "Ana Sayfa" : "Home",
        "item": `${SITE_URL}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": translateDataText(city.region, locale),
        "item": `${SITE_URL}/${locale}/bolgeler/${city.regionSlug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": translateDataText(city.name, locale),
        "item": `${SITE_URL}/${locale}/bolgeler/${city.regionSlug}/${city.slug}`
      }
    ]
  };

  const touristDestinationSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": translateDataText(city.name, locale),
    "description": translateDataText(city.summary, locale),
    "image": bgImage,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": city.location.lat,
      "longitude": city.location.lng
    }
  };

  const nextMonday = getNextMondayISO();

  // Generate Hotel Schemas with priceValidUntil
  const hotelSchemas = city.accommodations.slice(0, 3).map((hotel) => ({
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": translateDataText(hotel.name, locale),
    "description": translateDataText(hotel.description, locale),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": translateDataText(hotel.address, locale),
      "addressLocality": translateDataText(city.name, locale),
      "addressRegion": translateDataText(city.region, locale),
      "addressCountry": "TR"
    },
    "starRating": {
      "@type": "Rating",
      "ratingValue": hotel.rating || 4.5
    },
    "offers": {
      "@type": "Offer",
      "price": parseFloat(getDynamicPrice(hotel.pricePerNight, hotel.id).replace(/[^0-9]/g, "")) || 1200,
      "priceCurrency": "TRY",
      "priceValidUntil": nextMonday
    }
  }));

  // Generate Restaurant Schemas with priceValidUntil
  const restaurantSchemas = city.restaurants.slice(0, 3).map((rest) => {
    const cost = getDynamicPrice(rest.averageCost, rest.id);
    const priceLimit = cost.includes("-") ? cost.split("-")[1] : cost;
    const numericPrice = parseFloat(priceLimit.replace(/[^0-9]/g, "")) || 250;

    return {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": translateDataText(rest.name, locale),
      "description": translateDataText(rest.description || "", locale),
      "address": {
        "@type": "PostalAddress",
        "streetAddress": translateDataText(rest.address, locale),
        "addressLocality": translateDataText(city.name, locale),
        "addressRegion": translateDataText(city.region, locale),
        "addressCountry": "TR"
      },
      "servesCuisine": rest.diningType,
      "starRating": {
        "@type": "Rating",
        "ratingValue": rest.rating || 4.5
      },
      "offers": {
        "@type": "Offer",
        "price": numericPrice,
        "priceCurrency": "TRY",
        "priceValidUntil": nextMonday
      }
    };
  });

  // TouristAttraction schema per attraction (report item 188)
  const attractionSchemas = city.attractions.slice(0, 10).map((attraction) => ({
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": translateDataText(attraction.name, locale),
    "description": translateDataText(attraction.description, locale),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": translateDataText(attraction.address, locale),
      "addressLocality": translateDataText(city.name, locale),
      "addressRegion": translateDataText(city.region, locale),
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": attraction.location.lat,
      "longitude": attraction.location.lng
    },
    "publicAccess": true,
  }));

  return (
    <div data-region={city.regionSlug}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristDestinationSchema) }}
      />
      {attractionSchemas.map((a, i) => (
        <script
          key={`attraction-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(a) }}
        />
      ))}
      {hotelSchemas.map((h, i) => (
        <script
          key={`hotel-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(h) }}
        />
      ))}
      {restaurantSchemas.map((r, i) => (
        <script
          key={`restaurant-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(r) }}
        />
      ))}
      <div className="relative">
        <CityHero city={city} locale={locale} />
        <div className="absolute right-4 top-20 sm:right-8 sm:top-24">
          <WishlistButton citySlug={city.slug} regionSlug={city.regionSlug} cityName={city.name} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 pb-24 sm:px-6 sm:pb-12">
        <Breadcrumbs
          items={[
            { label: locale === "tr" ? "Ana Sayfa" : "Home", href: `/${locale}` },
            { label: dict.nav.regions, href: `/${locale}/bolgeler` },
            { label: translateDataText(city.region, locale), href: `/${locale}/bolgeler/${city.regionSlug}` },
            { label: translateDataText(city.name, locale) },
          ]}
        />
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/${locale}/bolgeler/${city.regionSlug}`}
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold text-ink hover:border-kiremit hover:text-kiremit transition-colors"
          >
            <ArrowLeft size={16} /> {dict.city.back}
          </Link>
          <div className="flex items-center gap-3">
            {isHiddenGem(city.slug) && <HiddenGemBadge locale={locale} />}
            <WishlistButton
              citySlug={city.slug}
              regionSlug={city.regionSlug}
              cityName={city.name}
              variant="inline"
            />
          </div>
        </div>

        <ConfusedPlacesWarning places={getConfusablePlaces(city.slug)} locale={locale} />

        {/* Madde 82-83/146-154 — "bu şehir neyle ünlü" paragrafı artık
            translateCityCurated pipeline'ının bir parçası (kalıcı, otomatik);
            getTranslatedKnownFor sadece gerçekten çevrilmişse metin döner,
            yoksa undefined — ham Türkçe başka bir locale'de yanlışlıkla
            gösterilmez. */}
        {knownForText && (
          <KnownForSection title={dict.city.knownForTitle} text={knownForText} />
        )}

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-3xl italic text-ink">{dict.city.about}</h2>
              <AudioGuide
                title={`${translateDataText(city.name, locale)} — ${dict.city.audioGuide}`}
                text={translateDataText(city.longDescription, locale)}
              />
            </div>
            <p className="text-base text-ink/70 leading-relaxed mb-6">{translateDataText(city.longDescription, locale)}</p>

            <Gallery images={galleryImages} fallbackSeed={city.slug} regionSlug={city.regionSlug} />

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { label: dict.city.bestTime, value: translateDataText(city.whenToGo, locale) },
                { label: dict.city.transit, value: translateDataText(city.howToGetThere, locale) },
                { label: dict.city.budget, value: translateDataText(city.budget, locale) },
                { label: dict.city.idealDuration, value: translateDataText(city.bestDuration, locale) },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-ink/10 bg-paper p-4 hover:border-kiremit/50 transition-colors shadow-sm"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-kiremit mb-1">
                    {item.label}
                  </div>
                  <p className="text-sm text-ink/80">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-ink/10 bg-gradient-to-br from-safran/10 to-kiremit/5 p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-kiremit mb-2">
                  {dict.city.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-ink/80">
                  <MapPin size={16} className="text-kiremit" />
                  {translateDataText(city.region, locale)}
                </div>
              </div>
              <div className="border-t border-ink/10 pt-4">
                <div className="text-xs font-bold uppercase tracking-wider text-kiremit mb-3">
                  {dict.city.quickStats}
                </div>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-ink/70"><BedDouble size={15} className="text-kiremit shrink-0" /> {city.accommodations.length} {dict.city.accommodationsCount}</p>
                  <p className="flex items-center gap-2 text-ink/70"><UtensilsCrossed size={15} className="text-kiremit shrink-0" /> {city.restaurants.length} {dict.city.restaurantsCount}</p>
                  <p className="flex items-center gap-2 text-ink/70"><MapPinned size={15} className="text-kiremit shrink-0" /> {city.attractions.length} {dict.city.attractionsCount}</p>
                  <p className="flex items-center gap-2 text-ink/70"><Soup size={15} className="text-kiremit shrink-0" /> {city.localFood.length} {dict.city.foodCount}</p>
                </div>
              </div>
              {city.highlights.length > 0 && (
                <div className="border-t border-ink/10 pt-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-kiremit mb-3">
                    {dict.city.highlights}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {city.highlights.map((h) => (
                      <span key={h} className="rounded-full bg-paper px-2.5 py-1 text-xs text-ink/70 border border-ink/10 shadow-sm font-semibold">
                        {translateDataText(h, locale)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ArrivalOptionsTable howToArrive={city.howToArrive} locale={locale} title={dict.city.arrivalOptions} />
          <BudgetTierTable budgetBreakdown={city.budgetBreakdown} locale={locale} title={dict.city.budgetTiers} />
        </div>

        <div id="itinerary-section" className="mb-20 scroll-mt-20">
          <ItinerarySection city={city} locale={locale} />
        </div>

        <CommunityRoutes
          identitySlug={city.slug}
          regionSlug={city.regionSlug}
          attractions={city.attractions}
          locale={locale}
        />

        <div className="mt-8">
          <ContentAccuracyFeedback
            citySlug={city.slug}
            locale={locale}
            lastUpdated={getContentLastUpdated(city.slug)}
          />
        </div>

        <div className="my-16 border-t border-ink/10" />

        <AdSlot />

        <CityContentSections
          citySlug={city.slug}
          cityCenter={[city.location.lat, city.location.lng]}
          attractions={city.attractions}
          restaurants={city.restaurants}
          localFood={city.localFood}
          accommodations={city.accommodations}
          locale={locale}
          initialItems={initialPlaces?.items}
          initialTotalCount={initialPlaces?.totalCount}
          initialHasMore={initialPlaces?.hasMore}
        />

        <CampingSection spots={city.campingSpots} locale={locale} />
        <FilmLocationsSection locations={city.filmLocations} cityName={city.name} locale={locale} />

        <RelatedCities currentCity={rawCity} allCities={allCities} locale={locale} />

        {/* Madde 84 — rehber makalelerinden şehre link (85'te eklendi) ile
            simetrik: şehirden, o şehri referans alan rehber makalelerine
            link. Sadece relatedCitySlugs'ta gerçekten bu şehir işaretliyse
            görünür (şu an 3 makale) — boşsa hiç render edilmez. */}
        {relatedGuides.length > 0 && (
          <div className="mt-16 border-t border-ink/10 pt-16 no-print">
            <h3 className="font-display text-2xl italic text-ink mb-5">
              {locale === "tr" ? "İlgili Rehberler" : "Related Guides"}
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/${locale}/rehberler/${guide.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-ink/8 bg-paper p-4 shadow-sm hover:border-kiremit/40 transition-colors"
                >
                  <BookOpen size={18} className="mt-0.5 shrink-0 text-kiremit" />
                  <span>
                    <span className="block text-sm font-bold text-ink group-hover:text-kiremit transition-colors">
                      {guide.title}
                    </span>
                    <span className="block text-xs text-ink/65 mt-0.5 line-clamp-2">{guide.summary}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic local foods summary for SSS / FAQ page */}
        <FAQSection
          name={translateDataText(city.name, locale)}
          whenToGo={translateDataText(city.whenToGo, locale)}
          howToGetThere={translateDataText(city.howToGetThere, locale)}
          budget={translateDataText(city.budget, locale)}
          whatToEat={city.localFood.length > 0
            ? `${city.localFood.slice(0, 3).map(f => translateDataText(f.name, locale)).join(", ")} ${locale === "tr" ? "gibi yöresel lezzetleri mutlaka denemelisiniz." : "are among the famous local foods you must try."}`
            : (locale === "tr" ? "Bölgeye özgü yöresel lezzetleri ve tescilli tatları yerel lokantalarda denemelisiniz." : "You should try region-specific local dishes at local restaurants.")
          }
          bestDuration={translateDataText(city.bestDuration, locale)}
          topAttractionNames={city.attractions.slice(0, 4).map((a) => translateDataText(a.name, locale))}
          accommodationTypeLabels={Array.from(new Set(city.accommodations.map((a) => a.type))).map((t) => getAccommodationTypeLabel(t, locale))}
          locale={locale}
        />
      </div>

      <StickyPlanBar cityName={translateDataText(city.name, locale)} />
    </div>
  );
}
