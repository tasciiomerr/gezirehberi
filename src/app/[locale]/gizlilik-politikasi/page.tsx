import { Locale } from "@/lib/i18n";

export default async function PrivacyPolicyPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl italic text-ink sm:text-5xl mb-6 text-center">
        {locale === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
      </h1>

      <div className="space-y-6 text-base text-ink/75 leading-relaxed font-medium border-t border-ink/10 pt-8">
        <section className="space-y-3">
          <h2 className="font-display text-2xl italic text-ink">
            {locale === "tr" ? "1. Toplanan Veriler ve Amacı" : "1. Collected Data and Purpose"}
          </h2>
          <p>
            {locale === "tr"
              ? "Yol Defteri, kullanıcıların site içindeki favori yerlerini kaydedebilmesi için tarayıcı tabanlı yerel depolama (localStorage) kullanmaktadır. Sunucularımızda hiçbir kişisel kimlik verisi veya konum kaydı tutulmamaktadır."
              : "Yol Defteri utilizes browser-based local storage (localStorage) to allow users to save their favorite places. No personally identifiable information or location data is stored on our servers."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl italic text-ink">
            {locale === "tr" ? "2. Çerezler (Cookies) ve Reklamlar" : "2. Cookies and Advertisements"}
          </h2>
          <p>
            {locale === "tr"
              ? "Sitemiz, Google AdSense ve analiz araçları gibi üçüncü taraf servis sağlayıcıların reklam yayınlama ve trafik analizleri amacıyla çerez yerleştirmesine izin vermektedir. Google, DoubleClick çerezini kullanarak kullanıcılarımızın sitemize ve internetteki diğer sitelere yaptıkları ziyaretlere dayalı reklamlar sunar."
              : "Our site allows third-party service providers, such as Google AdSense and analytics tools, to place cookies for advertising and traffic analysis. Google uses the DoubleClick cookie to serve ads based on our users' visits to our site and other sites on the internet."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl italic text-ink">
            {locale === "tr" ? "3. KVKK Aydınlatma Metni (Türkiye)" : "3. KVKK Clarification Text (Turkey)"}
          </h2>
          <p>
            {locale === "tr"
              ? "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, Yol Defteri web sitesi üzerinden doğrudan bir veri girişi yapmadığınız sürece (iletişim formu veya bülten aboneliği hariç) herhangi bir kişisel veriniz işlenmemektedir. E-posta bültenine kaydolmanız halinde, e-posta adresiniz yalnızca güncel rota bildirimleri göndermek amacıyla saklanır ve üçüncü şahıslarla paylaşılmaz."
              : "Within the scope of the Law on Protection of Personal Data (KVKK) No. 6698, no personal data is processed unless you directly submit information via the contact form or newsletter. In case of newsletter subscription, your email is stored solely to send route updates and is never shared with third parties."}
          </p>
        </section>
      </div>
    </div>
  );
}
