import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Locale, buildAlternates, buildRobots, buildPageSocialMeta } from "@/lib/i18n";
import { getAllGuides, getGuideBySlug } from "@/lib/data/guides";

export async function generateStaticParams() {
  // Empty until real guides exist — no fake slugs to prerender.
  const guides = getAllGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string; locale: string }> }) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const guide = getGuideBySlug(params.slug);
  if (!guide) return { title: locale === "tr" ? "Rehber bulunamadı" : "Guide not found" };

  return {
    title: guide.title,
    description: guide.summary,
    robots: buildRobots(locale, true),
    alternates: buildAlternates(locale, `/rehberler/${guide.slug}`),
    ...buildPageSocialMeta(locale, `/rehberler/${guide.slug}`, guide.title, guide.summary),
  };
}

export default async function GuideDetailPage(props: { params: Promise<{ slug: string; locale: string }> }) {
  const params = await props.params;
  const locale = (params.locale || "tr") as Locale;
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href={`/${locale}/rehberler`}
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-ink/65 hover:text-kiremit transition-colors"
      >
        <ArrowLeft size={15} /> {locale === "tr" ? "Rehberler" : "Guides"}
      </Link>
      <h1 className="font-display text-3xl italic text-ink sm:text-4xl mb-4">{guide.title}</h1>
      <p className="text-base text-ink/65 mb-8">{guide.summary}</p>
      <div className="prose prose-sm max-w-none text-ink/80 leading-relaxed whitespace-pre-line">{guide.body}</div>
    </div>
  );
}
