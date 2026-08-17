"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, CalendarDays, Compass, Send, StarHalf, Heart, Loader2, Flag } from "lucide-react";
import {
  CommunityRoute,
  CommunityComment,
  fetchCommunityComments,
  createCommunityComment,
  likeCommunityRoute,
  getCommunityLikeStatus,
  reportContent,
} from "@/lib/communityApi";
import { getLocalAuthorName } from "@/lib/socialDb";
import { getDictionary, Locale } from "@/lib/i18n";

interface UserRouteCardProps {
  route: CommunityRoute;
  locale: string;
}

export default function UserRouteCard({ route, locale }: UserRouteCardProps) {
  const dict = getDictionary(locale as Locale);
  const t = dict.community;
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  // Rota kartı ilk açıldığında (localStorage'dan gerçek DB veriye taşınmadan
  // önceki UI ile aynı davranış) yorumlar yükleniyor — sadece bir kez.
  const [ratingAvg, setRatingAvg] = useState(route.ratingAvg);
  const [ratingCount, setRatingCount] = useState(route.ratingCount);

  const [likeCount, setLikeCount] = useState<number | null>(route.likeCount);
  const [likedByMe, setLikedByMe] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  // Parti 2, madde 7 — moderasyon bildirme.
  const [isReportMenuOpen, setIsReportMenuOpen] = useState(false);
  const [reportStatus, setReportStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [reportErrorMsg, setReportErrorMsg] = useState<string | null>(null);

  // Comment Form States
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  useEffect(() => {
    getCommunityLikeStatus(route.id).then((res) => {
      setLikeCount(res.likeCount);
      setLikedByMe(res.likedByMe);
    });
  }, [route.id]);

  useEffect(() => {
    if (!isOpen || commentsLoaded) return;
    setCommentsLoading(true);
    fetchCommunityComments(route.id).then((res) => {
      setComments(res.comments);
      setCommentsLoading(false);
      setCommentsLoaded(true);
    });
  }, [isOpen, commentsLoaded, route.id]);

  const handleLike = async () => {
    if (isLiking || likedByMe) return;
    setIsLiking(true);
    const res = await likeCommunityRoute(route.id);
    setIsLiking(false);
    if (res.success) {
      setLikedByMe(true);
      if (typeof res.likeCount === "number") setLikeCount(res.likeCount);
      else setLikeCount((prev) => (prev ?? 0) + 1);
    }
  };

  const handleReport = async (reason: "spam" | "inappropriate" | "incorrect" | "other") => {
    setReportStatus("sending");
    setReportErrorMsg(null);
    const res = await reportContent({ targetType: "route", targetId: route.id, reason });
    if (res.success) {
      setReportStatus("sent");
    } else {
      setReportStatus("error");
      setReportErrorMsg(res.error || t.reportError);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);
    setCommentError(null);

    const res = await createCommunityComment(route.id, {
      text: commentText.trim(),
      rating,
      authorName: getLocalAuthorName(),
    });

    setIsSubmittingComment(false);

    if (res.comment) {
      const nextComments = [res.comment, ...comments];
      setComments(nextComments);
      setCommentText("");
      setRating(5);

      // routes.rating_avg/count'u gerçek şekilde günceller DB trigger'ı —
      // burada sadece bu kartın anlık görünümünü, elimizdeki yorum listesiyle
      // tutarlı kalması için yeniden hesaplıyoruz (yeni bir GET'e gerek yok).
      const sum = nextComments.reduce((acc, c) => acc + c.rating, 0);
      setRatingAvg(Math.round((sum / nextComments.length) * 10) / 10);
      setRatingCount(nextComments.length);
    } else {
      setCommentError(res.error || t.commentError);
    }
  };

  const renderStars = (score: number) => {
    const stars = [];
    const full = Math.floor(score);
    const half = score % 1 >= 0.4;

    for (let i = 1; i <= 5; i++) {
      if (i <= full) {
        stars.push(<Star key={i} size={13} className="text-safran fill-safran shrink-0" />);
      } else if (i === full + 1 && half) {
        stars.push(<StarHalf key={i} size={13} className="text-safran fill-safran shrink-0" />);
      } else {
        stars.push(<Star key={i} size={13} className="text-ink/15 shrink-0" />);
      }
    }
    return stars;
  };

  const initial = (route.authorName || "?").trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-paper/85 backdrop-blur-sm shadow-sm transition-all hover:shadow-md hover:border-kiremit/30">
      {/* Route Brief */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-kiremit/10 text-sm font-bold text-kiremit border border-ink/10 shadow-inner">
              {initial}
            </span>
            <div>
              <p className="text-xs font-bold text-ink">{route.authorName}</p>
              <p className="text-[10px] text-ink/65 font-semibold uppercase tracking-wider">
                {new Date(route.createdAt).toLocaleDateString(t.dateLocale)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-safran/10 px-2.5 py-1 rounded-full text-xs font-semibold text-kiremit">
            {renderStars(ratingAvg)}
            <span className="text-[11px] font-bold text-ink/65 ml-1">({ratingCount})</span>
          </div>
        </div>

        <h3 className="mt-3.5 font-display text-lg italic text-ink">{route.title}</h3>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink/65 border-t border-ink/5 pt-3">
          <span className="flex items-center gap-1 font-semibold">
            <CalendarDays size={13} /> {route.days} {dict.city.daysCount}
          </span>
          <span className="flex items-center gap-1 font-semibold">
            <Compass size={13} /> {route.stops.length} {dict.city.stopsCount}
          </span>
          <button
            onClick={handleLike}
            disabled={isLiking || likedByMe}
            className={`ml-auto flex items-center gap-1 font-semibold transition-colors ${
              likedByMe ? "text-kiremit" : "text-ink/65 hover:text-kiremit"
            } disabled:cursor-default`}
            aria-label={t.like}
          >
            <Heart size={13} className={likedByMe ? "fill-kiremit" : ""} />
            {likeCount ?? "…"}
          </button>

          <div className="relative">
            <button
              onClick={() => setIsReportMenuOpen((v) => !v)}
              disabled={reportStatus === "sent"}
              className="flex items-center gap-1 font-semibold text-ink/40 hover:text-kiremit transition-colors disabled:cursor-default disabled:text-ink/25"
              aria-label={t.report}
            >
              <Flag size={12} />
            </button>
            {isReportMenuOpen && reportStatus !== "sent" && (
              <div className="absolute right-0 top-6 z-10 w-44 rounded-xl border border-ink/10 bg-paper p-1.5 shadow-xl">
                {reportStatus === "error" && (
                  <p className="px-2 py-1 text-[10px] font-semibold text-kiremit">{reportErrorMsg}</p>
                )}
                {(["spam", "inappropriate", "incorrect", "other"] as const).map((reason) => (
                  <button
                    key={reason}
                    onClick={() => handleReport(reason)}
                    disabled={reportStatus === "sending"}
                    className="block w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold text-ink/70 hover:bg-kiremit/10 hover:text-kiremit transition-colors disabled:opacity-50"
                  >
                    {reason === "spam" && t.reportReasonSpam}
                    {reason === "inappropriate" && t.reportReasonInappropriate}
                    {reason === "incorrect" && t.reportReasonIncorrect}
                    {reason === "other" && t.reportReasonOther}
                  </button>
                ))}
                <button
                  onClick={() => setIsReportMenuOpen(false)}
                  className="block w-full rounded-lg px-2.5 py-1.5 text-left text-[11px] font-semibold text-ink/50 hover:bg-ink/[0.03] transition-colors"
                >
                  {t.reportCancel}
                </button>
              </div>
            )}
            {reportStatus === "sent" && (
              <span className="absolute right-0 top-6 z-10 w-44 rounded-xl border border-ink/10 bg-paper p-2.5 text-[11px] font-semibold text-turkuaz shadow-xl">
                {t.reportSuccess}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-ink/15 py-2 text-xs font-bold uppercase tracking-wider text-ink/75 hover:bg-kiremit hover:text-paper hover:border-kiremit transition-all focus:outline-none"
        >
          {isOpen ? t.hideDetails : t.viewRouteAndReviews}
        </button>
      </div>

      {/* Expanded Details Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink/10 bg-ink/[0.01]"
          >
            <div className="p-5 space-y-6">
              {/* Route Stops Sequence */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-deniz mb-3">📍 {t.routeSteps}</h4>
                <div className="space-y-3 relative border-l border-ink/10 ml-2.5 pl-4 py-1">
                  {route.stops.map((stop) => (
                    <div key={stop.order} className="relative group">
                      {/* Node Bullet */}
                      <span className="absolute -left-[21.5px] top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-paper border-2 border-kiremit text-[9px] font-bold text-kiremit shrink-0">
                        {stop.order}
                      </span>
                      <div>
                        <h5 className="text-sm font-bold text-ink leading-tight">{stop.title}</h5>
                        <p className="text-xs text-ink/65 leading-relaxed mt-0.5">{stop.description}</p>
                        <span className="text-[10px] text-ink/65 font-bold uppercase tracking-wide mt-1 block">⏱ {stop.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment & Rating Panel */}
              <div className="border-t border-ink/5 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-deniz mb-3 flex items-center gap-1.5">
                  <MessageSquare size={13} /> {t.commentsAndRatings}
                </h4>

                {/* Comment Input Form */}
                <form onSubmit={handleSubmitComment} className="mb-5 rounded-xl border border-ink/10 bg-paper p-3 shadow-sm">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={t.writeReviewPlaceholder}
                    rows={2}
                    disabled={isSubmittingComment}
                    className="w-full resize-none bg-transparent text-sm text-ink placeholder:text-ink/65 focus:outline-none disabled:opacity-60"
                  />
                  {commentError && (
                    <p className="mt-2 text-[11px] font-semibold text-kiremit">{commentError}</p>
                  )}
                  <div className="mt-3 flex items-center justify-between border-t border-ink/5 pt-3">
                    {/* Star Rating Selector */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none hover:scale-110 transition-transform"
                        >
                          <Star
                            size={16}
                            className={star <= rating ? "text-safran fill-safran" : "text-ink/15"}
                          />
                        </button>
                      ))}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmittingComment || !commentText.trim()}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-kiremit text-paper hover:bg-ink hover:scale-105 transition-all focus:outline-none disabled:opacity-45"
                      aria-label="Send review"
                    >
                      {isSubmittingComment ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                  {commentsLoading ? (
                    <p className="flex items-center justify-center gap-2 text-center text-xs text-ink/65 font-semibold py-4">
                      <Loader2 size={13} className="animate-spin" />
                      {t.loadingComments}
                    </p>
                  ) : comments.length === 0 ? (
                    <p className="text-center text-xs text-ink/65 font-semibold py-4">
                      {t.beFirstToComment}
                    </p>
                  ) : (
                    comments.map((comm) => (
                      <div key={comm.id} className="rounded-xl border border-ink/5 bg-paper/50 p-3 flex flex-col gap-1.5 shadow-sm">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-bold text-ink">{comm.authorName}</span>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }, (_, i) => i + 1).map((s) => (
                              <Star
                                key={s}
                                size={10}
                                className={s <= comm.rating ? "text-safran fill-safran" : "text-ink/10"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-ink/75 leading-relaxed">{comm.text}</p>
                        <span className="text-[9px] text-ink/65 font-bold uppercase tracking-wider">
                          {new Date(comm.createdAt).toLocaleDateString(t.dateLocale)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
