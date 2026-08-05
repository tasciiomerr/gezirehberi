import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["tr", "en", "de", "ar", "ru"];
const defaultLocale = "tr";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname is missing a locale prefix
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Exclude static assets, Next.js system files, and sitemaps/robots.
  // /icon and /apple-icon are Next.js's file-convention metadata routes —
  // they have no dot in the URL (the extension only shows up in the
  // Content-Type response header), so they were falling through to the
  // locale-redirect below and 404ing at /tr/apple-icon, /tr/icon (found via
  // a real Lighthouse run — browsers probe these paths directly regardless
  // of the <link> tags' own correct absolute hrefs).
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") || // e.g. favicon.ico, images, sitemap.xml
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/icon" ||
    pathname === "/apple-icon" ||
    pathname === "/manifest.webmanifest"
  ) {
    return;
  }

  if (pathnameIsMissingLocale) {
    // Detect preferred language from headers or fallback
    const acceptLanguage = request.headers.get("accept-language") || "";
    let locale = defaultLocale;
    for (const loc of locales) {
      if (acceptLanguage.toLowerCase().includes(loc)) {
        locale = loc;
        break;
      }
    }

    return NextResponse.redirect(
      new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|icon|apple-icon|manifest.webmanifest).*)"],
};
