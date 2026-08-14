import { Locale, buildAlternates, buildPageSocialMeta } from "@/lib/i18n";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const title = locale === "tr" ? "İletişim & Geri Bildirim" : "Contact & Feedback";
  const description =
    locale === "tr"
      ? "Mekan düzeltmeleri, reklam iş birlikleri veya seyahat önerileriniz için Yol Defteri ekibine ulaşın; geri bildirimleriniz rehberi daha doğru tutmamıza yardımcı olur."
      : "Reach the Yol Defteri team for place corrections, advertising partnerships, or travel suggestions — your feedback helps keep this guide accurate and current.";

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/iletisim"),
    ...buildPageSocialMeta(locale, "/iletisim", title, description),
  };
}

export default function ContactPage() {
  return <ContactForm />;
}
