import { RouteStop } from "@/lib/types";

export default function RouteSteps({ stops }: { stops: RouteStop[] }) {
  return (
    <ol className="relative border-l-2 border-dotted border-kiremit/40 pl-8">
      {stops.map((stop) => (
        <li key={stop.order} className="mb-8 last:mb-0">
          <span className="absolute -left-[15px] flex h-7 w-7 items-center justify-center rounded-full bg-kiremit text-xs font-bold text-paper">
            {stop.order}
          </span>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="font-display text-lg italic text-ink">
              {stop.title}
            </h4>
            <span className="text-xs font-medium uppercase tracking-wide text-turkuaz">
              {stop.duration}
            </span>
          </div>
          <p className="mt-1 text-sm text-ink/70">{stop.description}</p>
        </li>
      ))}
    </ol>
  );
}
