"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, CalendarDays, Compass, User, Send, StarHalf } from "lucide-react";
import { SocialRoute, SocialComment, getRouteComments, addComment } from "@/lib/socialDb";
import { getDictionary, Locale } from "@/lib/i18n";

interface UserRouteCardProps {
  route: SocialRoute;
  locale: string;
}

export default function UserRouteCard({ route, locale }: UserRouteCardProps) {
  const dict = getDictionary(locale as Locale);
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<SocialComment[]>([]);

  // Comment Form States
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (isOpen) {
      setComments(getRouteComments(route.id));
    }
  }, [isOpen, route.id]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const res = addComment(route.id, commentText, rating);
    if (res.success && res.comment) {
      setComments((prev) => [res.comment!, ...prev]);
      setCommentText("");
      setRating(5);
      
      // Update local rating stats in the UI immediately
      route.ratingCount += 1;
      const sum = [res.comment!, ...comments].reduce((acc, curr) => acc + curr.rating, 0);
      route.ratingAvg = Math.round((sum / (comments.length + 1)) * 10) / 10;
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

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-paper/85 backdrop-blur-sm shadow-sm transition-all hover:shadow-md hover:border-kiremit/30">
      {/* Route Brief */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={route.authorAvatar}
              alt={route.authorName}
              className="h-9 w-9 rounded-full border border-ink/10 shadow-inner object-cover"
            />
            <div>
              <p className="text-xs font-bold text-ink">{route.authorName}</p>
              <p className="text-[10px] text-ink/40 font-semibold uppercase tracking-wider">
                {new Date(route.createdAt).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-safran/10 px-2.5 py-1 rounded-full text-xs font-semibold text-kiremit">
            {renderStars(route.ratingAvg)}
            <span className="text-[11px] font-bold text-ink/65 ml-1">({route.ratingCount})</span>
          </div>
        </div>

        <h3 className="mt-3.5 font-display text-lg italic text-ink">{route.title}</h3>
        
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink/50 border-t border-ink/5 pt-3">
          <span className="flex items-center gap-1 font-semibold">
            <CalendarDays size={13} /> {route.days} {dict.city.daysCount}
          </span>
          <span className="flex items-center gap-1 font-semibold">
            <Compass size={13} /> {route.stops.length} {dict.city.stopsCount}
          </span>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-ink/15 py-2 text-xs font-bold uppercase tracking-wider text-ink/75 hover:bg-kiremit hover:text-paper hover:border-kiremit transition-all focus:outline-none"
        >
          {isOpen ? (locale === "tr" ? "Detayları Kapat" : "Hide Details") : (locale === "tr" ? "Rotayı ve Yorumları Gör" : "View Route & Reviews")}
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
                <h4 className="text-xs font-bold uppercase tracking-wider text-deniz mb-3">📍 {locale === "tr" ? "GÜZERGAH AKIŞI" : "ROUTE STEPS"}</h4>
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
                        <span className="text-[10px] text-ink/35 font-bold uppercase tracking-wide mt-1 block">⏱ {stop.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment & Rating Panel */}
              <div className="border-t border-ink/5 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-deniz mb-3 flex items-center gap-1.5">
                  <MessageSquare size={13} /> {locale === "tr" ? "YORUMLAR VE DEĞERLENDİRMELER" : "COMMENTS & RATINGS"}
                </h4>

                {/* Comment Input Form */}
                <form onSubmit={handleSubmitComment} className="mb-5 rounded-xl border border-ink/10 bg-paper p-3 shadow-sm">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={locale === "tr" ? "Yorumunuzu yazın..." : "Write your review..."}
                    rows={2}
                    className="w-full resize-none bg-transparent text-sm text-ink placeholder:text-ink/30 focus:outline-none"
                  />
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
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-kiremit text-paper hover:bg-ink hover:scale-105 transition-all focus:outline-none"
                      aria-label="Send review"
                    >
                      <Send size={12} />
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                  {comments.length === 0 ? (
                    <p className="text-center text-xs text-ink/40 font-semibold py-4">
                      {locale === "tr" ? "İlk yorumu siz yapın!" : "Be the first to comment!"}
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
                        <span className="text-[9px] text-ink/35 font-bold uppercase tracking-wider">
                          {new Date(comm.createdAt).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US")}
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
