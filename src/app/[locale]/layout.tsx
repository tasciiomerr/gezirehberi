import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import YandexMetrica from "@/components/YandexMetrica";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Clarity from "@/components/Clarity";
import "../globals.css";
import { getDictionary, Locale, buildRobots, OG_LOCALE_MAP } from "@/lib/i18n";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://www.yoldefterim.com.tr";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.home.title + " | " + dict.nav.logo,
      template: `%s | ${dict.nav.logo}`,
    },
    description: dict.home.subtitle,
    // Temporary noindex for untranslated locales (report items 22/283) — every
    // page inherits this unless it explicitly overrides robots itself.
    robots: buildRobots(locale),
    // Search-engine site ownership verification (Yandex Webmaster + Google
    // Search Console, report items 264-267). Both unset ([B], real codes
    // pending from the user) — each key is only added when its env var is
    // actually set, never rendering an empty/placeholder verification tag.
    ...((process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION)
      ? {
          verification: {
            ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
              ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
              : {}),
            ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
              ? { other: { "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION } }
              : {}),
          },
        }
      : {}),
    openGraph: {
      type: "website",
      locale: OG_LOCALE_MAP[locale] || "tr_TR",
      siteName: dict.nav.logo,
      url: `${siteUrl}/${locale}`,
      // Fallback og:image for any page that doesn't set its own (report items
      // 275-277) — city/district/region pages override this with a real hero photo.
      images: [{ url: `${siteUrl}/${locale}/opengraph-image`, width: 1200, height: 630, alt: dict.nav.logo }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.home.title,
      description: dict.home.subtitle,
      images: [`${siteUrl}/${locale}/opengraph-image`],
    },
  };
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const activeLocale = (locale || "tr") as Locale;
  const dir = activeLocale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={activeLocale}
      dir={dir}
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-full flex flex-col bg-background text-ink selection:bg-kiremit/20">
        <Header />
        <main className="flex-1">{props.children}</main>
        <Footer />
        <CookieConsentBanner />
        <YandexMetrica />
        <GoogleAnalytics />
        <Clarity />
      </body>
    </html>
  );
}
