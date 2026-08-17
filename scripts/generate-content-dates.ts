// Parti 3, madde 11 — "son doğrulama tarihi". Editoryal şehir verisi tamamen
// statik TS dosyalarında (src/lib/data/cities/*.ts) ve manuel bir doğrulama
// kaydı hiç tutulmuyor — bir "son doğrulama tarihi" uydurmak veri-dürüstlüğü
// kuralını çiğner. Bunun yerine dürüst, gerçekten doğrulanabilir bir vekil
// kullanılıyor: her şehrin tanımlı olduğu dosyanın git'teki son commit
// tarihi ("içerik son güncelleme", doğrulama değil — UI'da bu şekilde
// etiketleniyor). scripts/audit-cities.ts ile aynı desende: node ile
// çalıştırılan, derlemeye dahil olmayan bir script.
import { execFileSync } from "child_process";
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const CITIES_DIR = join(__dirname, "..", "src", "lib", "data", "cities");
const OUTPUT_FILE = join(CITIES_DIR, "contentDates.json");

const slugToDate: Record<string, string> = {};

const files = readdirSync(CITIES_DIR).filter((f) => f.endsWith(".ts") && f !== "index.ts");

for (const file of files) {
  const relPath = join("src", "lib", "data", "cities", file).replace(/\\/g, "/");
  let isoDate: string;
  try {
    isoDate = execFileSync("git", ["log", "-1", "--format=%aI", "--", relPath], {
      cwd: join(__dirname, ".."),
      encoding: "utf-8",
    }).trim();
  } catch {
    continue;
  }
  if (!isoDate) continue;

  const content = readFileSync(join(CITIES_DIR, file), "utf-8");
  const slugMatches = content.matchAll(/^\s{4}slug:\s*"([^"]+)"/gm);
  for (const m of slugMatches) {
    slugToDate[m[1]] = isoDate;
  }
}

writeFileSync(OUTPUT_FILE, JSON.stringify(slugToDate, null, 2) + "\n", "utf-8");
console.log(`${Object.keys(slugToDate).length} şehir için içerik tarihi yazıldı: ${OUTPUT_FILE}`);
