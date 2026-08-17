"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, Loader2, CalendarCheck } from "lucide-react";
import { submitContentFeedback } from "@/lib/communityApi";
import { getDictionary, Locale } from "@/lib/i18n";

interface ContentAccuracyFeedbackProps {
  citySlug: string;
  locale: string;
  lastUpdated?: string;
}

// Parti 3, madde 10 — "Bu bilgi hâlâ doğru mu" geri bildirimi.
export default function ContentAccuracyFeedback({ citySlug, locale, lastUpdated }: ContentAccuracyFeedbackProps) {
  const dict = getDictionary(locale as Locale);
  const t = dict.community;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState("");

  const submit = async (isAccurate: boolean, noteText?: string) => {
    setStatus("sending");
    setErrorMsg(null);
    const res = await submitContentFeedback({ citySlug, isAccurate, note: noteText });
    if (res.success) {
      setStatus("sent");
    } else {
      setStatus("error");
      setErrorMsg(res.error || t.feedbackError);
    }
  };

  const handleYes = () => submit(true);
  const handleNo = () => setShowNoteInput(true);
  const handleNoSubmit = () => submit(false, note.trim() || undefined);

  if (status === "sent") {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-ink/10 bg-paper/50 px-4 py-3 text-xs font-semibold text-turkuaz">
        {t.feedbackThanks}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-ink/10 bg-paper/50 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-ink/75">{t.feedbackQuestion}</span>
          {lastUpdated && (
            <span className="hidden items-center gap-1 text-[10px] font-semibold text-ink/50 sm:flex">
              <CalendarCheck size={11} />
              {t.feedbackLastUpdated}: {new Date(lastUpdated).toLocaleDateString(t.dateLocale)}
            </span>
          )}
        </div>

        {!showNoteInput && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleYes}
              disabled={status === "sending"}
              className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-bold text-ink/75 hover:border-turkuaz hover:text-turkuaz transition-colors disabled:opacity-50"
            >
              {status === "sending" ? <Loader2 size={12} className="animate-spin" /> : <ThumbsUp size={12} />}
              {t.feedbackYes}
            </button>
            <button
              onClick={handleNo}
              disabled={status === "sending"}
              className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-bold text-ink/75 hover:border-kiremit hover:text-kiremit transition-colors disabled:opacity-50"
            >
              <ThumbsDown size={12} />
              {t.feedbackNo}
            </button>
          </div>
        )}
      </div>

      {lastUpdated && (
        <span className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-ink/50 sm:hidden">
          <CalendarCheck size={11} />
          {t.feedbackLastUpdated}: {new Date(lastUpdated).toLocaleDateString(t.dateLocale)}
        </span>
      )}

      {showNoteInput && (
        <div className="mt-3 flex flex-col gap-2 border-t border-ink/5 pt-3 sm:flex-row sm:items-end">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t.feedbackNotePlaceholder}
            rows={2}
            maxLength={500}
            disabled={status === "sending"}
            className="flex-1 resize-none rounded-lg border border-ink/10 bg-paper p-2 text-xs text-ink placeholder:text-ink/65 focus:outline-none disabled:opacity-60"
          />
          <button
            onClick={handleNoSubmit}
            disabled={status === "sending"}
            className="flex items-center justify-center gap-1.5 rounded-full bg-kiremit px-4 py-2 text-xs font-bold text-paper hover:bg-ink transition-colors disabled:opacity-50 shrink-0"
          >
            {status === "sending" ? <Loader2 size={12} className="animate-spin" /> : t.feedbackSubmit}
          </button>
        </div>
      )}

      {status === "error" && (
        <p className="mt-2 text-[11px] font-semibold text-kiremit">{errorMsg}</p>
      )}
    </div>
  );
}
