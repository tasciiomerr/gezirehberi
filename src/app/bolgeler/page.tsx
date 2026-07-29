import { regions } from "@/lib/data/regions";
import RegionCard from "@/components/RegionCard";

export const metadata = {
  title: "Bölgeler | Türkiye Gezi Rehberi",
  description:
    "Türkiye''nin yedi coğrafi bölgesini keşfedin. Karadeniz''den Güneydoğu Anadolu''ya kadar her bölgenin kendine özgü güzellikleri.",
};

export default function BolgerlerPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <h1 className="font-display text-4xl italic text-ink sm:text-5xl">
          Türkiye''nin Yedi Bölgesi
        </h1>
        <p className="mt-4 max-w-2xl text-base text-ink/70">
          Her bölgenin kendine özgü tarihi, doğası, kültürü ve lezzetleri var.
          Yol Defteri, bölge bölge Türkiye''yi keşfetmenizi bekliyor.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {regions.map((region) => (
          <RegionCard key={region.slug} region={region} />
        ))}
      </div>
    </div>
  );
}
