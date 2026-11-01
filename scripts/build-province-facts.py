"""
81 il için doğrulanmış bilgi dosyası üretir: src/lib/data/provinceFacts.json
(2026-11-02). Kaynaklar (hepsi açık veri; tahmin yok):
  - Nüfus (2025): TÜİK ADNKS, Vikipedi "Nüfusuna göre Türkiye'nin illeri" tablosu
    (81 ilin toplamı TÜİK'in 86.092.168 rakamına eşit olmak zorunda — kontrol edilir).
  - İlçeler: Vikipedi "Türkiye'nin ilçeleri" (İçişleri Bakanlığı verisi; toplam 973).
  - Komşu iller: tr-geojson il sınırlarında çokgenlerin birbirine değmesi; ek olarak
    Mardin-Siirt (Vikipedi Mardin maddesi "kuzeydoğusunda Siirt" ile doğrulandı).
    Sınıra yakın ama değmeyen çiftler (Erzurum-Trabzon, Batman-Şırnak, Bilecik-Kocaeli,
    İstanbul-Kırklareli, Erzurum-Tunceli) bilerek DAHİL EDİLMEDİ.
  - Coğrafi işaretli ürünler: Vikipedi "Türkiye'de tescilli coğrafi işaretler listesi"
    (Türk Patent ve Marka Kurumu sicili).
Girdiler /tmp/v altına indirilmiş ham dosyalardır (bkz. üst yorum); betik yalnızca
birleştirir ve kontrol eder.
  python scripts/build-province-facts.py /tmp/v
"""
import json
import re
import sys
import collections
import urllib.request

from shapely.geometry import shape
from shapely.validation import make_valid

D = sys.argv[1] if len(sys.argv) > 1 else "/tmp/v"


def fold(s):
    s = s.replace("İ", "i").replace("I", "i").replace("â", "a").replace("Â", "a")
    for a, b in zip("çğıöşüÇĞÖŞÜ", "cgiosucgosu"):
        s = s.replace(a, b)
    return s.lower()


pop = json.load(open(f"{D}/pop.json", encoding="utf-8"))
assert len(pop) == 81 and sum(pop.values()) == 86092168, "nüfus toplamı TÜİK ile uyuşmuyor"

# ---- ilçeler
t = open(f"{D}/ilce.txt", encoding="utf-8").read()
i = t.find("[[Adana (il)|Adana]]")
body = t[i : t.find("|}", i)]
dist = collections.OrderedDict()


def clean(s):
    s = s.strip()
    m = re.search(r"\[\[(?:[^\]|]+\|)?([^\]]+)\]\]", s)
    return (m.group(1) if m else re.sub(r"'''|\{\{.*?\}\}", "", s)).strip()


for r in ("|-\n|" + body).split("\n|-\n"):
    cells = [c[1:].strip() for c in r.split("\n") if c.startswith("|") and not c.startswith("|}") and c != "|-"]
    if len(cells) < 8:
        continue
    dist.setdefault(clean(cells[0]), []).append(clean(cells[1]))
assert sum(len(v) for v in dist.values()) == 973 and len(dist) == 81, (len(dist), sum(len(v) for v in dist.values()))

# ---- komşu iller
raw = json.loads(urllib.request.urlopen("https://raw.githubusercontent.com/cihadturhan/tr-geojson/master/geo/tr-cities-utf8.json", timeout=60).read())
P = {ft["properties"]["name"]: make_valid(shape(ft["geometry"])) for ft in raw["features"]}
geo2prov = {}
fp = {fold(k): k for k in pop}
for g in P:
    k = fold(g)
    geo2prov[g] = fp.get(k) or {"afyon": "Afyonkarahisar", "icel": "Mersin"}.get(k)
assert all(geo2prov.values()), [g for g, v in geo2prov.items() if not v]
nb = collections.defaultdict(set)
names = list(P)
for a_i, a in enumerate(names):
    for b in names[a_i + 1 :]:
        if P[a].distance(P[b]) == 0.0:
            nb[geo2prov[a]].add(geo2prov[b])
            nb[geo2prov[b]].add(geo2prov[a])
nb["Mardin"].add("Siirt")
nb["Siirt"].add("Mardin")

# ---- coğrafi işaretler
gi = json.load(open(f"{D}/gi.json", encoding="utf-8"))
GROUP = {
    "Halılar ve kilimler": "elsanati",
    "Dokumalar": "elsanati",
    "Halılar, kilimler ve dokumalar dışında kalan el sanatı ürünleri": "elsanati",
    "Fırıncılık ve pastacılık mamulleri, hamur işleri, tatlılar": "tatli",
    "Çikolata, şekerleme ve türevi ürünler": "tatli",
    "Bal": "tatli",
    "Peynirler": "sut_et",
    "Peynirler ve tereyağı dışında kalan süt ürünleri": "sut_et",
    "Tereyağı dâhil katı ve sıvı yağlar": "sut_et",
    "İşlenmiş ve işlenmemiş et ürünleri": "sut_et",
    "İşlenmiş ve işlenmemiş meyve ve sebzeler ile mantarlar": "meyve",
    "Yemekler ve çorbalar": "yemek",
}
facts = {}
for prov in pop:
    fk = fold(prov)
    items = [
        g
        for g in gi
        if fold({"Hakkari": "Hakkâri"}.get(g["yer"], g["yer"])) == fk or fold(g["yer"]) == fk
    ]
    groups = collections.OrderedDict((k, []) for k in ["elsanati", "tatli", "sut_et", "meyve", "yemek"])
    for g in sorted(items, key=lambda x: (x["tur"] != "Menşe Adı", x["tarih"][-4:], x["ad"])):
        k = GROUP.get(g["grup"])
        if k:
            groups[k].append({"n": g["ad"], "t": "M" if g["tur"] == "Menşe Adı" else "H"})
    facts[prov] = {
        "pop": pop[prov],
        "districts": sorted(dist[prov], key=lambda x: fold(x)),
        "neighbors": sorted(nb[prov], key=lambda x: fold(x)),
        "giTotal": len(items),
        "gi": {k: v for k, v in groups.items() if v},
    }

out = "src/lib/data/provinceFacts.json"
json.dump(facts, open(out, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
print("yazıldı", out, len(facts), "il;", sum(len(f["districts"]) for f in facts.values()), "ilçe;", sum(len(f["neighbors"]) for f in facts.values()) // 2, "komşuluk çifti")
