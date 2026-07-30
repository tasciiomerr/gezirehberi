"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary, Locale } from "@/lib/i18n";

export default function Footer() {
  const pathname = usePathname() || "";
  const segments = pathname.split("/");
  const locale = ["tr", "en", "de", "ar"].includes(segments[1])
    ? (segments[1] as Locale)
    : ("tr" as Locale);

  const dict = getDictionary(locale);

  return (
    <footer className="mt-16 border-t border-ink/10 bg-ink text-paper/80 no-print">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg italic text-paper">
              {dict.nav.logo}
            </p>
            <p className="mt-2 max-w-sm text-sm text-paper/60 leading-relaxed">
              {dict.home.subtitle}
            </p>
          </div>
          <nav className="flex flex-col gap-2.5 text-sm font-medium">
            <Link href={`/${locale}/bolgeler`} className="hover:text-safran transition-colors">
              {dict.nav.regions}
            </Link>
            <Link href={`/${locale}`} className="hover:text-safran transition-colors">
              {dict.nav.home}
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-xs text-paper/40 border-t border-paper/10 pt-6">
          © {new Date().getFullYear()} {dict.nav.logo}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
