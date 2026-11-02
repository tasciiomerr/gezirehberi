// JSON-LD'yi <script> içine güvenle gömmek için: "<", ">", "&" ve satır
// ayırıcı karakterler (U+2028/U+2029) \uXXXX olarak kaçırılır; çıktı geçerli JSON
// kalır ve veri içinde "</script>" ya da "<!--" gibi diziler script bloğunu
// kıramaz (2026-11-02 denetimi). Karakterler kodla üretilir: kaynak dosyada
// çıplak satır ayırıcı bulunmasın diye.
const LS = String.fromCharCode(0x2028);
const PS = String.fromCharCode(0x2029);
const BACKSLASH_U = String.fromCharCode(92) + "u";

function esc(code: number): string {
  return BACKSLASH_U + code.toString(16).padStart(4, "0");
}

const ESCAPES: Record<string, string> = {
  "<": esc(0x3c),
  ">": esc(0x3e),
  "&": esc(0x26),
  [LS]: esc(0x2028),
  [PS]: esc(0x2029),
};

export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(new RegExp("[<>&" + LS + PS + "]", "g"), (ch) => ESCAPES[ch]);
}
