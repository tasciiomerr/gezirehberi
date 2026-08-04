"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary, Locale } from "@/lib/i18n";
import { Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  const pathname = usePathname() || "";
  const segments = pathname.split("/");
  const locale = ["tr", "en", "de", "ar"].includes(segments[1])
    ? (segments[1] as Locale)
    : ("tr" as Locale);

  const dict = getDictionary(locale);

  const [email, setEmail] = useState("");
  const [kvkkConsent, setKvkkConsent] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && kvkkConsent) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="mt-16 border-t border-ink/10 bg-ink text-paper/80 no-print">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <p className="font-display text-2xl italic text-paper">
              {dict.nav.logo}
            </p>
            <p className="max-w-xs text-sm text-paper/60 leading-relaxed font-medium">
              {dict.home.subtitle}
            </p>
          </div>

          {/* Quick Links Nav */}
          <div className="flex flex-col md:items-center">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-safran">
                {locale === "tr" ? "Kurumsal" : "Corporate"}
              </p>
              <nav className="flex flex-col gap-2.5 text-sm font-medium">
                <Link href={`/${locale}`} className="hover:text-safran transition-colors">
                  {dict.nav.home}
                </Link>
                <Link href={`/${locale}/bolgeler`} className="hover:text-safran transition-colors">
                  {dict.nav.regions}
                </Link>
                <Link href={`/${locale}/hakkimizda`} className="hover:text-safran transition-colors">
                  {locale === "tr" ? "Hakkımızda" : "About Us"}
                </Link>
                <Link href={`/${locale}/gizlilik-politikasi`} className="hover:text-safran transition-colors">
                  {locale === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
                </Link>
                <Link href={`/${locale}/cerez-politikasi`} className="hover:text-safran transition-colors">
                  {locale === "tr" ? "Çerez Politikası" : "Cookie Policy"}
                </Link>
                <Link href={`/${locale}/iletisim`} className="hover:text-safran transition-colors">
                  {locale === "tr" ? "İletişim" : "Contact"}
                </Link>
              </nav>
            </div>
          </div>

          {/* Newsletter subscription form */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-safran">
              {locale === "tr" ? "E-Bülten Aboneliği" : "Newsletter Subscription"}
            </p>
            <p className="text-xs text-paper/60 font-medium">
              {locale === "tr" 
                ? "Yeni rotalar ve güncel fiyat seyahat tüyolarından ilk siz haberdar olun." 
                : "Be the first to know about new routes and daily travel tips."}
            </p>

            {subscribed ? (
              <div className="rounded-lg bg-safran/15 p-3 text-xs font-bold text-safran">
                ✓ {locale === "tr" ? "Başarıyla Abone Olundu!" : "Subscribed Successfully!"}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="relative flex">
                  <input
                    type="email"
                    required
                    placeholder={locale === "tr" ? "E-posta adresiniz" : "Your email address"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-paper/10 bg-paper/5 py-3 pl-4 pr-12 text-sm text-paper placeholder:text-paper/40 outline-none focus:border-safran focus:ring-1 focus:ring-safran transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!kvkkConsent}
                    className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-lg bg-safran text-ink hover:scale-105 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
                <label className="flex items-start gap-2 text-[11px] text-paper/60 leading-snug cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={kvkkConsent}
                    onChange={(e) => setKvkkConsent(e.target.checked)}
                    className="mt-0.5 rounded border-paper/20 text-safran focus:ring-safran cursor-pointer"
                  />
                  <span>
                    {locale === "tr" ? (
                      <>
                        <Link href={`/${locale}/gizlilik-politikasi#kvkk`} className="underline hover:text-safran">
                          KVKK Aydınlatma Metni
                        </Link>
                        'ni okudum, e-posta adresimin bülten göndermek amacıyla işlenmesini kabul ediyorum.
                      </>
                    ) : (
                      <>
                        I have read the{" "}
                        <Link href={`/${locale}/gizlilik-politikasi#kvkk`} className="underline hover:text-safran">
                          privacy notice
                        </Link>{" "}
                        and consent to my email being processed to send this newsletter.
                      </>
                    )}
                  </span>
                </label>
              </form>
            )}
          </div>
        </div>

        <p className="mt-12 text-xs text-paper/40 border-t border-paper/10 pt-6 text-center font-medium">
          © {new Date().getFullYear()} {dict.nav.logo}. {locale === "tr" ? "Tüm hakları saklıdır." : locale === "de" ? "Alle Rechte vorbehalten." : locale === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
        </p>
        {/* General, truthful source note — we don't have per-image photographer/license
            data to generate accurate individual credits (report item 29), but this much
            is true and reduces the undisclosed-source legal risk in the meantime. */}
        <p className="mt-2 text-[11px] text-paper/35 text-center font-medium">
          {locale === "tr"
            ? "Bölge ve şehir görselleri Wikimedia Commons ve Unsplash kaynaklıdır."
            : locale === "de"
            ? "Regions- und Stadtbilder stammen von Wikimedia Commons und Unsplash."
            : locale === "ar"
            ? "صور المناطق والمدن مصدرها Wikimedia Commons وUnsplash."
            : "Region and city images are sourced from Wikimedia Commons and Unsplash."}
        </p>
      </div>
    </footer>
  );
}
