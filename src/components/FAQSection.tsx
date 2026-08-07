"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { withLocative } from "@/lib/turkish";

interface FAQSectionProps {
  name: string;
  whenToGo: string;
  howToGetThere: string;
  budget: string;
  whatToEat: string;
  // Real curated-data-backed fields (report item 82 follow-up) — the three
  // FAQ entries these used to answer with identical boilerplate text for
  // every city (souvenirs, family-friendliness, first-time-visitor tips) had
  // no per-city data behind them at all and were removed rather than kept as
  // fabricated-sounding "specific" advice (see madde 34/167 data-honesty rule).
  bestDuration?: string;
  topAttractionNames?: string[];
  accommodationTypeLabels?: string[];
  locale?: string;
}

export default function FAQSection({
  name,
  whenToGo,
  howToGetThere,
  budget,
  whatToEat,
  bestDuration,
  topAttractionNames = [],
  accommodationTypeLabels = [],
  locale = "tr",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: locale === "tr"
        ? `${name} seyahati için en ideal zaman hangisidir?`
        : `What is the best time to visit ${name}?`,
      a: whenToGo
    },
    {
      q: locale === "tr"
        ? `${name} bölgesine nasıl ulaşım sağlanır?`
        : `How can I travel to ${name}?`,
      a: howToGetThere
    },
    {
      q: locale === "tr"
        ? `${name} seyahati için bütçe planlaması nasıl olmalıdır?`
        : `What is the budget planning for ${name}?`,
      a: budget
    },
    {
      q: locale === "tr"
        ? `${name} seyahatinde tadılması gereken en meşhur yöresel lezzetler nelerdir?`
        : `What are the most famous local dishes to try in ${name}?`,
      a: whatToEat
    },
    ...(bestDuration
      ? [{
          q: locale === "tr"
            ? `${name} gezisi için kaç gün ayırmak gerekir?`
            : `How many days are recommended for visiting ${name}?`,
          a: bestDuration,
        }]
      : []),
    ...(topAttractionNames.length > 0
      ? [{
          q: locale === "tr"
            ? `${name} seyahatinde mutlaka görülmesi gereken en popüler yerler nerelerdir?`
            : `What are the top must-visit attractions and locations in ${name}?`,
          a: locale === "tr"
            ? `${withLocative(name)} öne çıkan cazibe merkezleri arasında ${topAttractionNames.join(", ")} yer almaktadır.`
            : `Top spots in ${name} include ${topAttractionNames.join(", ")}.`,
        }]
      : []),
    ...(accommodationTypeLabels.length > 0
      ? [{
          q: locale === "tr"
            ? `${name} bölgesinde konaklama için ne tür seçenekler bulunmaktadır?`
            : `What accommodation options are available for travellers in ${name}?`,
          a: locale === "tr"
            ? `${withLocative(name)} ${accommodationTypeLabels.join(", ")} kategorilerinde konaklama seçenekleri bulunmaktadır.`
            : `${name} offers accommodation in the following categories: ${accommodationTypeLabels.join(", ")}.`,
        }]
      : []),
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <div className="mt-16 rounded-2xl border border-ink/8 bg-paper p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2 className="font-display text-2xl italic text-ink mb-6">
        {locale === "tr" ? "Sıkça Sorulan Sorular" : "Frequently Asked Questions"}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="border-b border-ink/5 pb-4">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-4 text-left font-bold text-ink hover:text-kiremit transition-colors cursor-pointer text-sm sm:text-base"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <p
                className={`text-sm text-ink/70 leading-relaxed font-semibold overflow-hidden transition-all duration-300 ${
                  isOpen ? "mt-3 max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {faq.a}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
