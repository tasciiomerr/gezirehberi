"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, MapPin } from "lucide-react";
import { searchCities, SearchResult } from "@/lib/search";

const DEBOUNCE_MS = 200;

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setResults(searchCities(query));
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-xs">
      <div className="flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-3 py-1.5 focus-within:border-kiremit">
        <Search size={15} className="text-ink/40 flex-shrink-0" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="İl veya bölge ara..."
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
          aria-label="Şehir ara"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="text-ink/30 hover:text-kiremit flex-shrink-0"
            aria-label="Aramayı temizle"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {isOpen && query.length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-ink/10 bg-paper shadow-xl">
          {results.length === 0 ? (
            <p className="p-4 text-sm text-ink/50">&quot;{query}&quot; için sonuç bulunamadı.</p>
          ) : (
            results.map((r) => (
              <Link
                key={r.city.slug}
                href={`/bolgeler/${r.city.regionSlug}/${r.city.slug}`}
                onClick={() => {
                  setIsOpen(false);
                  router.push(`/bolgeler/${r.city.regionSlug}/${r.city.slug}`);
                }}
                className="flex items-center gap-3 border-b border-ink/5 px-4 py-3 last:border-0 hover:bg-kiremit/5"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-kiremit/10 text-kiremit">
                  <MapPin size={14} />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{r.city.name}</p>
                  <p className="text-xs text-ink/50">{r.city.region}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
