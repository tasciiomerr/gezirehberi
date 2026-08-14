import { Locale, buildAlternates, buildPageSocialMeta, buildRobots } from "@/lib/i18n";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const title = locale === "tr" ? "Kullanım Şartları" : "Terms of Use";
  const description =
    locale === "tr"
      ? "Yol Defteri web sitesini kullanırken geçerli olan kullanım şartları; içeriklerin kullanımı, sorumluluk sınırları ve kullanıcı yükümlülükleri hakkında bilgi."
      : "The terms of use that apply when using the Yol Defteri website — content usage, limitations of liability, and user obligations. Read before using the site.";

  return {
    title,
    description,
    robots: buildRobots(locale),
    alternates: buildAlternates(locale, "/kullanim-sartlari"),
    ...buildPageSocialMeta(locale, "/kullanim-sartlari", title, description),
  };
}

export default async function TermsOfUsePage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl italic text-ink sm:text-5xl mb-6 text-center">
        {locale === "tr" ? "Kullanım Şartları" : "Terms of Use"}
      </h1>

      <div className="space-y-6 text-base text-ink/75 leading-relaxed font-medium border-t border-ink/10 pt-8">
        <section className="space-y-3">
          <h2 className="font-display text-2xl italic text-ink">
            {locale === "tr" ? "1. Kabul" : "1. Acceptance"}
          </h2>
          <p>
            {locale === "tr"
              ? "Yol Defteri'yi kullanarak bu kullanım şartlarını kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız siteyi kullanmamanızı rica ederiz."
              : "By using Yol Defteri, you accept these terms of use. If you do not agree to these terms, please do not use the site."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl italic text-ink">
            {locale === "tr" ? "2. Hizmetin Niteliği" : "2. Nature of the Service"}
          </h2>
          <p>
            {locale === "tr"
              ? "Yol Defteri, Türkiye'deki şehir ve bölgeler hakkında bilgilendirici seyahat rehberi içeriği sunan bir web sitesidir. Bir rezervasyon, bilet satışı veya seyahat acenteliği hizmeti değildir."
              : "Yol Defteri is a website providing informational travel guide content about cities and regions in Turkey. It is not a booking, ticketing, or travel agency service."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl italic text-ink">
            {locale === "tr" ? "3. İçeriğin Doğruluğu" : "3. Accuracy of Content"}
          </h2>
          <p>
            {locale === "tr"
              ? "Sitedeki fiyat, mesafe, süre, açılış saati ve benzeri pratik bilgiler tahminidir ve düzenli olarak güncellenmeye çalışılsa da zamanla değişebilir. Bir mekana veya güzergaha karar vermeden önce ilgili işletmenin veya resmi kaynağın güncel bilgisini teyit etmenizi öneririz."
              : "Practical information on the site such as prices, distances, durations, and opening hours is estimated, and while we try to keep it updated, it may change over time. We recommend confirming up-to-date information with the relevant business or an official source before making a decision about a place or route."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl italic text-ink">
            {locale === "tr" ? "4. Kullanıcı Katkıları" : "4. User Contributions"}
          </h2>
          <p>
            {locale === "tr"
              ? "Site üzerinde rota paylaşımı, yorum veya değerlendirme gibi katkılarda bulunabilirsiniz. Paylaştığınız içerikten siz sorumlusunuz; yanıltıcı, hukuka aykırı veya başkalarının haklarını ihlal eden içerik paylaşmamayı kabul edersiniz. Uygunsuz içerikleri bildirmek için iletişim sayfasını kullanabilirsiniz."
              : "You may contribute to the site by sharing routes, comments, or reviews. You are responsible for the content you share; you agree not to post misleading, unlawful content, or content that violates the rights of others. You can use the contact page to report inappropriate content."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl italic text-ink">
            {locale === "tr" ? "5. Fikri Mülkiyet" : "5. Intellectual Property"}
          </h2>
          <p>
            {locale === "tr"
              ? "Sitedeki editöryel metinler ve tasarım Yol Defteri'ne aittir. Görseller, kaynağı belirtilen üçüncü taraf sağlayıcılara (ör. Wikimedia Commons, Unsplash) aittir ve kendi lisans şartlarına tabidir."
              : "The editorial text and design on the site belong to Yol Defteri. Images belong to the third-party providers credited as their source (e.g. Wikimedia Commons, Unsplash) and are subject to their own license terms."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl italic text-ink">
            {locale === "tr" ? "6. Sorumluluğun Sınırlandırılması" : "6. Limitation of Liability"}
          </h2>
          <p>
            {locale === "tr"
              ? "Yol Defteri, sitedeki bilgilere dayanılarak alınan seyahat kararlarından veya üçüncü taraf işletme/hizmetlerden kaynaklanan zararlardan sorumlu tutulamaz. Site içeriği \"olduğu gibi\" sunulur."
              : "Yol Defteri cannot be held liable for damages arising from travel decisions made based on information on the site, or from third-party businesses/services. Site content is provided \"as is\"."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl italic text-ink">
            {locale === "tr" ? "7. Değişiklikler" : "7. Changes"}
          </h2>
          <p>
            {locale === "tr"
              ? "Bu kullanım şartları zaman zaman güncellenebilir. Güncel sürüm her zaman bu sayfada yer alır."
              : "These terms of use may be updated from time to time. The current version is always available on this page."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl italic text-ink">
            {locale === "tr" ? "8. Uygulanacak Hukuk" : "8. Governing Law"}
          </h2>
          <p>
            {locale === "tr"
              ? "Bu kullanım şartları Türkiye Cumhuriyeti kanunlarına tabidir."
              : "These terms of use are governed by the laws of the Republic of Turkey."}
          </p>
        </section>
      </div>
    </div>
  );
}
