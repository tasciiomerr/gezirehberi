// Kalıcı hreflang×robots tutarlılık denetimi (Parti 4, madde 14). Hiçbir
// düzeltme yapmaz, sadece rapor eder. audit-cities.ts'in aksine bu script
// gerçek render edilmiş HTML'i denetler (layout+page metadata merge'ünün
// gerçek sonucu, sadece buildAlternates/buildRobots'un izole çıktısı değil) —
// bu yüzden hedef sunucunun (dev veya prod) ayakta olması gerekir.
//
// Kullanım: npx tsx scripts/audit-hreflang.ts [baseUrl]
//   npx tsx scripts/audit-hreflang.ts                  # http://localhost:3100
//   npx tsx scripts/audit-hreflang.ts https://www.yoldefterim.com.tr
//
// Kontroller (Google'ın "no contradictory signal" hreflang kuralı, madde 283
// ile aynı mantık):
//   1. Self-reference: sayfa kendi locale'i için de bir hreflang girdisi içeriyor mu
//   2. x-default girdisi var mı
//   3. hreflang hiçbir zaman noindex bir sayfaya işaret etmiyor mu (asıl kritik kontrol)
//   4. Karşılıklılık: A sayfası B'ye hreflang veriyorsa, B de A'ya geri veriyor mu

const LOCALES = ["tr", "en", "de", "ar", "ru"];
const baseUrl = process.argv[2] || "http://localhost:3100";

let issues = 0;
function report(url: string, msg: string) {
  issues++;
  console.log(`[${url}] ${msg}`);
}

interface PageMeta {
  url: string;
  robotsNoindex: boolean;
  hreflang: Map<string, string>; // hreflang code -> href
  fetchError?: string;
}

async function fetchMeta(url: string): Promise<PageMeta> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    const html = await res.text();
    const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
    const robotsNoindex = res.status !== 200 || (robotsMatch?.[1]?.includes("noindex") ?? false);

    const hreflang = new Map<string, string>();
    const linkRe = /<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"/gi;
    let m: RegExpExecArray | null;
    while ((m = linkRe.exec(html))) {
      hreflang.set(m[1], m[2].replace(/&amp;/g, "&"));
    }
    return { url, robotsNoindex, hreflang };
  } catch (e: any) {
    return { url, robotsNoindex: true, hreflang: new Map(), fetchError: e?.message || String(e) };
  }
}

async function auditPath(pathWithoutLocale: string) {
  const pages = new Map<string, PageMeta>();
  for (const locale of LOCALES) {
    const url = `${baseUrl}/${locale}${pathWithoutLocale}`;
    pages.set(locale, await fetchMeta(url));
  }

  for (const [locale, page] of pages) {
    if (page.fetchError) {
      report(page.url, `fetch hatası: ${page.fetchError}`);
      continue;
    }

    // 1. Self-reference
    if (!page.hreflang.has(locale)) {
      report(page.url, `kendi locale'i (${locale}) için self-referencing hreflang eksik`);
    }

    // 2. x-default
    if (!page.hreflang.has("x-default")) {
      report(page.url, "x-default hreflang girdisi eksik");
    }

    // 3. hreflang hiçbir zaman BAŞKA bir locale'in noindex sayfasına işaret
    // etmemeli (asıl "contradictory signal" — bir sayfanın kendi kendine
    // self-reference vermesi, noindex olsa bile sorun değil, hariç tutulur)
    for (const [hcode, href] of page.hreflang) {
      if (hcode === "x-default" || hcode === locale) continue;
      const target = pages.get(hcode);
      if (target && target.robotsNoindex) {
        report(page.url, `hreflang="${hcode}" noindex bir sayfaya işaret ediyor (${href})`);
      }
    }

    // 4. Karşılıklılık — bu sayfa noindex değilse, hreflang verdiği her sayfa da geri vermeli
    if (!page.robotsNoindex) {
      for (const [hcode] of page.hreflang) {
        if (hcode === "x-default" || hcode === locale) continue;
        const target = pages.get(hcode);
        if (target && !target.fetchError && !target.robotsNoindex && !target.hreflang.has(locale)) {
          report(page.url, `hreflang="${hcode}" karşılıklı değil (${target.url} geri işaret etmiyor)`);
        }
      }
    }
  }
}

async function main() {
  console.log(`Hedef: ${baseUrl}\n`);

  const staticPaths = ["", "/bolgeler", "/hakkimizda", "/iletisim"];
  for (const p of staticPaths) {
    await auditPath(p);
  }

  // Bölge sayfaları — tamamı (yalnızca 7)
  const { regions } = await import("../src/lib/data/regions");
  for (const r of regions) {
    await auditPath(`/bolgeler/${r.slug}`);
  }

  // Şehir sayfaları — hepsi (84 şehir, "400+" değil — gerçek sayı doğrulandı,
  // taraması tamamen mümkün, artık örneklenmiyor).
  const { getAllCitySlugs } = await import("../src/lib/data/cities");
  for (const s of getAllCitySlugs()) {
    await auditPath(`/bolgeler/${s.region}/${s.city}`);
  }

  // İlçe sayfaları — tamamı (yalnızca 14)
  const { getAllDistrictSlugs } = await import("../src/lib/data/districts");
  for (const d of getAllDistrictSlugs()) {
    await auditPath(`/bolgeler/${d.region}/${d.city}/${d.district}`);
  }

  console.log(`\nBitti. Toplam bulgu: ${issues}`);
}

main();
