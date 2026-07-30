"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Volume2, Headphones } from "lucide-react";
import { createTTS, isSpeechSynthesisSupported, TTSHandle } from "@/lib/tts";
import { useParams } from "next/navigation";
import { getDictionary, Locale } from "@/lib/i18n";

const SPEEDS = [0.75, 1, 1.25, 1.5];

interface AudioGuideProps {
  title: string;
  text: string;
}

export default function AudioGuide({ title, text }: AudioGuideProps) {
  const params = useParams();
  const locale = (params?.locale || "tr") as Locale;
  const dict = getDictionary(locale);

  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [rate, setRate] = useState(1);
  const [supported, setSupported] = useState(true);
  const ttsRef = useRef<TTSHandle | null>(null);

  useEffect(() => {
    setSupported(isSpeechSynthesisSupported());
  }, []);

  useEffect(() => {
    return () => {
      ttsRef.current?.stop();
    };
  }, []);

  const words = useMemo(() => text.split(/(\s+)/), [text]);

  function handleStart() {
    if (!supported) return;
    setIsActive(true);
    ttsRef.current = createTTS(text, (state) => {
      setIsPlaying(state.isPlaying);
      setCharIndex(state.charIndex);
    });
    ttsRef.current.setRate(rate);
    ttsRef.current.play();
  }

  function handleTogglePlay() {
    if (!ttsRef.current) {
      handleStart();
      return;
    }
    ttsRef.current.pause();
  }

  function handleClose() {
    ttsRef.current?.stop();
    setIsActive(false);
    setIsPlaying(false);
    setCharIndex(0);
  }

  function handleRateChange(r: number) {
    setRate(r);
    ttsRef.current?.setRate(r);
    if (isPlaying) {
      ttsRef.current?.stop();
      const tts = createTTS(text, (state) => {
        setIsPlaying(state.isPlaying);
        setCharIndex(state.charIndex);
      });
      tts.setRate(r);
      tts.play();
      ttsRef.current = tts;
    }
  }

  if (!supported) return null;

  return (
    <>
      <button
        onClick={isActive ? handleTogglePlay : handleStart}
        className="no-print inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink/70 transition-all hover:border-kiremit hover:text-kiremit hover:scale-105"
      >
        <Headphones size={15} />
        {isActive && isPlaying ? dict.city.audioPause : dict.city.audioPlay}
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="no-print fixed bottom-0 left-0 right-0 z-50 border-t border-ink/10 bg-paper/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
          >
            <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleTogglePlay}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-kiremit text-paper hover:bg-ink transition-colors shadow"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{title}</p>
                  <p className="text-xs text-ink/50">{dict.city.audioGuideSub}</p>
                </div>
                <div className="flex items-center gap-1 bg-ink/5 px-2 py-1 rounded-full">
                  <Volume2 size={13} className="text-ink/40" />
                  {SPEEDS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleRateChange(s)}
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition-all ${
                        rate === s
                          ? "bg-turkuaz text-paper"
                          : "text-ink/50 hover:bg-ink/5"
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleClose}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-ink/40 hover:bg-ink/5 hover:text-kiremit transition-colors"
                  aria-label="Close audio guide"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="max-h-16 overflow-y-auto rounded-lg bg-ink/[0.03] p-3 text-xs leading-relaxed text-ink/65 border border-ink/5">
                {(() => {
                  let cumulative = 0;
                  return words.map((word, i) => {
                    const start = cumulative;
                    cumulative += word.length;
                    const isCurrent = charIndex >= start && charIndex < cumulative + 3;
                    return (
                      <span
                        key={i}
                        className={isCurrent ? "rounded bg-safran/40 font-semibold text-ink px-0.5" : ""}
                      >
                        {word}
                      </span>
                    );
                  });
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
