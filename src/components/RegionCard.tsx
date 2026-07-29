import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Region } from "@/lib/types";

export default function RegionCard({ region }: { region: Region }) {
  const hasContent = region.cityCount > 0;

  return (
    <Link
      href={`/bolgeler/${region.slug}`}
      className="group relative flex h-56 flex-col justify-between overflow-hidden rounded-2xl p-6 text-paper shadow-sm transition-transform hover:-translate-y-1"
      style={{
        backgroundImage: `linear-gradient(135deg, ${region.gradientFrom}, ${region.gradientTo})`,
      }}
    >
      <div className="flex items-start justify-between">
        <h3 className="font-display text-2xl italic">{region.name}</h3>
        <ArrowUpRight
          size={20}
          className="opacity-70 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
      <div>
        <p className="text-sm leading-snug text-paper/90">{region.tagline}</p>
        <p className="mt-3 text-xs uppercase tracking-wide text-paper/70">
          {hasContent ? `${region.cityCount} şehir yayında` : "Yakında"}
        </p>
      </div>
    </Link>
  );
}
