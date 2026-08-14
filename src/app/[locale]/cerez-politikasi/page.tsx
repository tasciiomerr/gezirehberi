import { Locale, buildAlternates, buildPageSocialMeta, buildRobots } from "@/lib/i18n";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const title = locale === "tr" ? "Çerez Politikası" : "Cookie Policy";
  const description =
    locale === "tr"
      ? "Yol Defteri'nin çerez kullanımına dair bilgilendirme sayfası; hangi çerezlerin, ne amaçla kullanıldığını ve tercihlerinizi nasıl yöneteceğinizi öğrenin."
      : "Yol Defteri's cookie policy and usage information — which cookies are used, why they are used, and how you can manage your cookie preferences here.";

  return {
    title,
    description,
    robots: buildRobots(locale),
    alternates: buildAlternates(locale, "/cerez-politikasi"),
    ...buildPageSocialMeta(locale, "/cerez-politikasi", title, description),
  };
}

export default async function CookiePolicyPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl italic text-ink sm:text-5xl mb-6 text-center">
        {locale === "tr" ? "Çerez Politikası" : "Cookie Policy"}
      </h1>

      <div className="space-y-6 text-base text-ink/75 leading-relaxed font-medium border-t border-ink/10 pt-8">
        <section className="space-y-3">
          <h2 className="font-display text-2xl italic text-ink">
            {locale === "tr" ? "Çerezler Nedir?" : "What are Cookies?"}
          </h2>
          <p>
            {locale === "tr"
              ? "Çerezler, web sitelerini daha verimli kullanabilmeniz için tarayıcınıza kaydedilen küçük metin dosyalarıdır. Yol Defteri, dil tercihlerinizi ve site içi kayıtlarınızı hatırlamak amacıyla çerezleri ve yerel depolama araçlarını kullanır."
              : "Cookies are small text files saved in your browser to help you use websites more efficiently. Yol Defteri uses cookies and local storage tools to remember your language preferences and saved bookmarks."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl italic text-ink">
            {locale === "tr" ? "Kullanılan Çerez Türleri" : "Types of Cookies Used"}
          </h2>
          <p>
            {locale === "tr"
              ? "Sitemizde temel işlevleri sağlayan zorunlu çerezler ile reklam ortaklarımız ve performans ölçüm araçlarımız tarafından kullanılan analitik çerezler kullanılabilir. Sayfanın altında çıkan onay penceresinden reklam/analiz amaçlı çerezleri kabul edebilir veya reddedebilirsiniz; tercihiniz bu tarayıcıda hatırlanır. Ayrıca tarayıcı ayarlarınızdan çerez izinlerini dilediğiniz zaman sınırlandırabilir veya temizleyebilirsiniz."
              : "Our site uses essential cookies that provide core features, as well as analytical cookies that may be placed by our advertising partners and performance tracking tools. You can accept or decline advertising/analytics cookies via the consent banner shown on the site; your choice is remembered in this browser. You can also restrict or clear cookie permissions via your browser settings at any time."}
          </p>
        </section>
      </div>
    </div>
  );
}
