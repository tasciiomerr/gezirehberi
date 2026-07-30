"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Volume2, Headphones } from "lucide-react";
import { createTTS, isSpeechSynthesisSupported, TTSHandle } from "@/lib/tts";

const SPEEDS = [0.75, 1, 1.25, 1.5];

interface AudioGuideProps {
  title: string;
  text: string;
}

/**
 * Bölüm 4.6-4.10: Sesli rehber. Ses dosyası (.mp3) yoksa tarayıcının
 * native TTS motorunu kullanır. Sticky alt bar + hız kontrolü + karaoke vurgu.
 */
export default function AudioGuide({ title, text }: AudioGuideProps) {
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [rate, setRate] = useState(1);
  const [supported, setSupported] = useState(true);
  const ttsRef = useRef<TTSHandle | null>(null);

  useEffect(() => {
    // Tarayıcı API'si sadece client'ta mevcut, mount sonrası kontrol ediliyor.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    // Hız değişince yeniden başlatmak gerekir (Web Speech API akışı ortasında hız değiştiremiyor)
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
        className="no-print inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:border-kiremit hover:text-kiremit"
      >
        <Headphones size={16} />
        {isActive && isPlaying ? "Sesli Anlatımı Duraklat" : "Sesli Dinle"}
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
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-kiremit text-paper hover:bg-ink transition-colors"
                  aria-label={isPlaying ? "Duraklat" : "Oynat"}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{title}</p>
                  <p className="text-xs text-ink/50">Sesli Rehber (tarayıcı sesi)</p>
                </div>
                <div className="flex items-center gap-1">
                  <Volume2 size={14} className="text-ink/40" />
                  {SPEEDS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleRateChange(s)}
                      className={`rounded-full px-2 py-1 text-xs font-medium transition-colors ${
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
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-ink/40 hover:bg-ink/5 hover:text-kiremit"
                  aria-label="Sesli rehberi kapat"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="max-h-16 overflow-y-auto rounded-lg bg-ink/[0.03] p-2 text-xs leading-relaxed text-ink/60">
                {(() => {
                  let cumulative = 0;
                  return words.map((word, i) => {
                    const start = cumulative;
                    cumulative += word.length;
                    const isCurrent = charIndex >= start && charIndex < cumulative + 3;
                    return (
                      <span
                        key={i}
                        className={isCurrent ? "rounded bg-safran/40 font-semibold text-ink" : ""}
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
