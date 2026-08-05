import { Tent, Clapperboard } from "lucide-react";
import { CampingSpot, FilmLocation } from "@/lib/types";
import { translateDataText, Locale } from "@/lib/i18n";

// Report items 155 (film/TV location tourism) and 164-171 (camping/caravan
// vertical). Both arrays are empty until real, editor-verified entries exist
// (see report items 34/167 on template/placeholder data) — this renders an
// honest empty state rather than hiding the section or inventing places.

export function CampingSection({
  spots,
  locale,
}: {
  spots?: CampingSpot[];
  locale: string;
}) {
  const items = spots || [];
  return (
    <div className="mt-16 border-t border-ink/10 pt-16 no-print">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-turkuaz/10 text-turkuaz shadow-sm">
          <Tent size={18} />
        </span>
        <h3 className="font-display text-2xl italic text-ink">
          {locale === "tr" ? "Karavan & Kamp Alanları" : "Camping & Caravan Spots"}
        </h3>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink/20 p-8 text-center bg-paper/30">
          <p className="text-xs text-ink/65 font-semibold">
            {locale === "tr"
              ? "Bu şehir için henüz doğrulanmış bir kamp/karavan alanı bilgisi eklenmedi."
              : "No verified camping/caravan spot has been added for this city yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {items.map((spot) => (
            <div key={spot.id} className="rounded-2xl border border-ink/8 bg-paper p-4 shadow-sm">
              <h4 className="font-semibold text-sm text-ink">{translateDataText(spot.name, locale as Locale)}</h4>
              <p className="mt-1.5 text-xs text-ink/65 leading-relaxed">{translateDataText(spot.description, locale as Locale)}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                {spot.hasElectricity && <span className="rounded-full bg-turkuaz/10 px-2 py-0.5 text-turkuaz">{locale === "tr" ? "Elektrik" : "Electricity"}</span>}
                {spot.hasWater && <span className="rounded-full bg-turkuaz/10 px-2 py-0.5 text-turkuaz">{locale === "tr" ? "Su" : "Water"}</span>}
                {spot.isCoastal && <span className="rounded-full bg-safran/10 px-2 py-0.5 text-kiremit">{locale === "tr" ? "Deniz Kenarı" : "Coastal"}</span>}
                {spot.isFree && <span className="rounded-full bg-ink/5 px-2 py-0.5 text-ink/65">{locale === "tr" ? "Ücretsiz" : "Free"}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function FilmLocationsSection({
  locations,
  cityName,
  locale,
}: {
  locations?: FilmLocation[];
  cityName: string;
  locale: string;
}) {
  const items = locations || [];
  return (
    <div className="mt-16 border-t border-ink/10 pt-16 no-print">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-kiremit/10 text-kiremit shadow-sm">
          <Clapperboard size={18} />
        </span>
        <h3 className="font-display text-2xl italic text-ink">
          {locale === "tr"
            ? `${translateDataText(cityName, locale as Locale)}'de Çekilen Diziler & Filmler`
            : `TV Shows & Films Filmed in ${translateDataText(cityName, locale as Locale)}`}
        </h3>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink/20 p-8 text-center bg-paper/30">
          <p className="text-xs text-ink/65 font-semibold">
            {locale === "tr"
              ? "Bu şehir için henüz doğrulanmış bir çekim yeri bilgisi eklenmedi."
              : "No verified filming location has been added for this city yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {items.map((loc) => (
            <div key={loc.id} className="rounded-2xl border border-ink/8 bg-paper p-4 shadow-sm">
              <h4 className="font-semibold text-sm text-ink">{loc.title}</h4>
              <p className="mt-1.5 text-xs text-ink/65 leading-relaxed">{translateDataText(loc.description, locale as Locale)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
