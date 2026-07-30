import Link from "next/link";
import { MapPin, Heart } from "lucide-react";
import { regions } from "@/lib/data/regions";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-kiremit text-paper">
            <MapPin size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl italic text-ink">
            Yol Defteri
          </span>
        </Link>
        <div className="hidden flex-1 justify-center px-6 md:flex">
          <SearchBar />
        </div>
        <nav className="hidden items-center gap-5 text-sm font-medium text-ink/80 lg:flex">
          <Link href="/bolgeler" className="hover:text-kiremit">
            Bölgeler
          </Link>
          {regions
            .filter((r) => r.cityCount > 0)
            .slice(0, 3)
            .map((r) => (
              <Link
                key={r.slug}
                href={`/bolgeler/${r.slug}`}
                className="hover:text-kiremit"
              >
                {r.name}
              </Link>
            ))}
          <Link
            href="/kayitlerim"
            className="flex items-center gap-1.5 hover:text-kiremit"
          >
            <Heart size={16} /> Kayıtlarım
          </Link>
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Link
            href="/kayitlerim"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink"
          >
            <Heart size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}
