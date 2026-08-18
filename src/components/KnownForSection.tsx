import { Sparkles } from "lucide-react";

interface KnownForSectionProps {
  title: string;
  text: string;
}

// Parti (madde 82-83/146-163) — "Bu şehir/bölge neyle ünlü" kısa, Google öne
// çıkan snippet formatına uygun blok. PİLOT içerik — bkz. src/lib/data/
// knownFor.ts ve regionCulture.ts.
export default function KnownForSection({ title, text }: KnownForSectionProps) {
  return (
    <div className="mb-10 rounded-xl border border-ink/10 bg-gradient-to-br from-safran/5 to-transparent p-5">
      <div className="mb-2.5 flex items-center gap-2">
        <Sparkles size={15} className="text-kiremit shrink-0" />
        <h2 className="text-xs font-bold uppercase tracking-wider text-kiremit">{title}</h2>
      </div>
      <p className="text-sm leading-relaxed text-ink/80">{text}</p>
    </div>
  );
}
