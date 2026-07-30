// Bölüm 4.6-4.10: Web Speech API (tarayıcı native TTS) tabanlı sesli rehber.
// Profesyonel seslendirme dosyası (.mp3) yoksa yedek mekanizma olarak kullanılır.

export interface TTSHandle {
  play: () => void;
  pause: () => void;
  stop: () => void;
  setRate: (rate: number) => void;
  isSupported: boolean;
}

export type TTSCallback = (state: {
  isPlaying: boolean;
  isPaused: boolean;
  charIndex: number;
}) => void;

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function createTTS(text: string, onUpdate: TTSCallback): TTSHandle {
  const supported = isSpeechSynthesisSupported();
  let utterance: SpeechSynthesisUtterance | null = null;
  let rate = 1;

  function buildUtterance() {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "tr-TR";
    u.rate = rate;
    u.onboundary = (e) => {
      onUpdate({ isPlaying: true, isPaused: false, charIndex: e.charIndex });
    };
    u.onend = () => {
      onUpdate({ isPlaying: false, isPaused: false, charIndex: text.length });
    };
    return u;
  }

  return {
    isSupported: supported,
    play: () => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      utterance = buildUtterance();
      window.speechSynthesis.speak(utterance);
      onUpdate({ isPlaying: true, isPaused: false, charIndex: 0 });
    },
    pause: () => {
      if (!supported) return;
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        onUpdate({ isPlaying: false, isPaused: true, charIndex: 0 });
      } else if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        onUpdate({ isPlaying: true, isPaused: false, charIndex: 0 });
      }
    },
    stop: () => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      onUpdate({ isPlaying: false, isPaused: false, charIndex: 0 });
    },
    setRate: (r: number) => {
      rate = r;
    },
  };
}
