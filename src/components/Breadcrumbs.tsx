import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string; // omit for the current (last) page
}

// Visible breadcrumb trail — the BreadcrumbList JSON-LD on city/district pages
// only helps search engines, it renders nothing a user or screen reader sees.
// This is the user-facing counterpart (report item 20).
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 overflow-x-auto">
      <ol className="flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-ink/65">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1.5">
            {idx > 0 && <ChevronRight size={12} className="text-ink/65 shrink-0" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-kiremit transition-colors">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink/75">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
