import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["tr", "en", "de", "ar"];
const defaultLocale = "tr";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname is missing a locale prefix
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Exclude static assets, Next.js system files, and sitemaps/robots
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") || // e.g. favicon.ico, images, sitemap.xml
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt"
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
