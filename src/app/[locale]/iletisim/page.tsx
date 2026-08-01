import { Locale, buildAlternates } from "@/lib/i18n";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const title = locale === "tr" ? "İletişim & Geri Bildirim" : "Contact & Feedback";
  const description =
    locale === "tr"
      ? "Mekan düzeltmeleri, reklam iş birlikleri veya seyahat önerileriniz için Yol Defteri ekibine ulaşın."
      : "Reach the Yol Defteri team for place corrections, advertising partnerships, or travel suggestions.";

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/iletisim"),
  };
}

export default function ContactPage() {
  return <ContactForm />;
}
