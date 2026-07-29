import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink/10 bg-ink text-paper/80">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg italic text-paper">
              Yol Defteri
            </p>
            <p className="mt-2 max-w-sm text-sm text-paper/60">
              Türkiye&apos;yi bölge bölge, durak durak anlatan bir gezi
              rehberi. Yola çıkmadan önce oku, yolda not düş.
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/bolgeler" className="hover:text-safran">
              Tüm bölgeler
            </Link>
            <Link href="/" className="hover:text-safran">
              Ana sayfa
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-xs text-paper/40">
          © {new Date().getFullYear()} Yol Defteri. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
