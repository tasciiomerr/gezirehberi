import WishlistPageClient from "@/components/WishlistPageClient";
import { getDictionary, Locale, buildAlternates } from "@/lib/i18n";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const dict = getDictionary(locale);

  return {
    title: dict.wishlist.title,
    alternates: buildAlternates(locale, "/kayitlerim"),
    // Kişiye özel, tarayıcı localStorage'ından okunan bir liste — herkese
    // aynı boş/farklı içeriği gösterecek bir sayfanın indexlenmesinin SEO
    // değeri yok, bu yüzden diğer statik sayfaların aksine bilinçli olarak
    // noindex.
    robots: { index: false, follow: true },
  };
}

export default function WishlistPage() {
  return <WishlistPageClient />;
}
