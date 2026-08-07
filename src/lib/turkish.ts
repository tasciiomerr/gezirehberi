// Turkish suffix generation for dynamically-built UI strings.
//
// Hand-written content in src/lib/data/** already carries correct suffixes;
// this is only for text we assemble at render time from a proper noun, where
// hardcoding "'de" produced wrong forms like "Amasra'de" (correct: "Amasra'da")
// and would have produced "Sinop'de" (correct: "Sinop'ta").
//
// Two rules are applied:
//
// 1. Vowel harmony (büyük ünlü uyumu) — the LAST vowel of the word decides the
//    suffix vowel:
//      back  (kalın) a, ı, o, u  -> "a"
//      front (ince)  e, i, ö, ü  -> "e"
//
// 2. Consonant assimilation (ünsüz benzeşmesi) — if the word ends in a
//    voiceless consonant ("fıstıkçı şahap": f s t k ç ş h p), the suffix's
//    "d" hardens to "t":
//      Amasra -> Amasra'da      Sinop -> Sinop'ta
//      İzmir  -> İzmir'de       Bilecik -> Bilecik'te

const BACK_VOWELS = "aıouâ";
const FRONT_VOWELS = "eiöü";
const VOICELESS_CONSONANTS = "fstkçşhp";

function lower(text: string): string {
  // Locale-aware: "I" -> "ı" and "İ" -> "i", which matters for names like
  // "Iğdır" (back) vs "İzmir" (front). A plain toLowerCase() gets these wrong.
  return text.toLocaleLowerCase("tr-TR");
}

/** Last vowel decides harmony; returns "a" (back) or "e" (front). */
function harmonyVowel(word: string): "a" | "e" {
  const w = lower(word);
  for (let i = w.length - 1; i >= 0; i--) {
    const ch = w[i];
    if (BACK_VOWELS.includes(ch)) return "a";
    if (FRONT_VOWELS.includes(ch)) return "e";
  }
  // No vowel at all (initialisms etc.) — "a" is the safer default for Turkish
  // place names, and this branch is unreachable for our dataset.
  return "a";
}

/** "d" normally, hardened to "t" after a voiceless consonant. */
function suffixConsonant(word: string): "d" | "t" {
  const w = lower(word).replace(/[^a-zçğıöşüâ]+$/u, ""); // ignore trailing punctuation/digits
  const last = w[w.length - 1];
  return last && VOICELESS_CONSONANTS.includes(last) ? "t" : "d";
}

/** Locative ("-de/-da/-te/-ta"): "Amasra" -> "da", "Sinop" -> "ta". */
export function locativeSuffix(word: string): string {
  return suffixConsonant(word) + harmonyVowel(word);
}

/** Ablative ("-den/-dan/-ten/-tan"): "Marmara" -> "dan", "Sinop" -> "tan". */
export function ablativeSuffix(word: string): string {
  return locativeSuffix(word) + "n";
}

/** "Amasra" -> "Amasra'da" (proper nouns take an apostrophe in Turkish). */
export function withLocative(properNoun: string): string {
  return `${properNoun}'${locativeSuffix(properNoun)}`;
}

/** "Marmara" -> "Marmara'dan". */
export function withAblative(properNoun: string): string {
  return `${properNoun}'${ablativeSuffix(properNoun)}`;
}
