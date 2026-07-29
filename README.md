# Yol Defteri — Türkiye Gezi Rehberi

Binlerce günlük ziyaretçi hedefleyen, ultra-profesyonel tasarımı ve milyonlarca veri barındıran Türkiye gezi rehberi platformu.

## 🎯 Vizyon

Türkiye'yi bölge bölge, şehir şehir, durak durak anlatan interaktif bir yol haritası. Geziye çıkmadan önce okunması gereken, yolda her sorunun cevabının bulunduğu tek adres.

## ✨ Temel Özellikler

### 1. Dinamik Duration-Based Itinerary System
- 1/2/3/5/7/14 gün seçeneği
- Her gün için optimize edilmiş duraklar
- Yemek önerileri (sabah, öğle, akşam)
- Konaklama önerileri
- Taşıt süresi bilgileri

### 2. Bölgeye Özel Tasarımlar
- Karadeniz: Yeşil tonları (#0F5257 → #16909C)
- Marmara: Kiremit tonları (#8A3A2B → #B33A25)
- İç Anadolu: Safran altını (#B7791F → #E4A335)
- Her bölge kendine has renk şeması

### 3. Ultra-Detaylı İçerik
Her şehir:
- 5+ gezilecek yer (attraction)
- 10+ restoran/kafe
- 5+ konaklama seçeneği
- 10+ yöresel yemek
- 1/2/3/5/7/14 günlük rotalar

### 4. Profesyonel Tasarım
- Typography: Fraunces (başlıklar) + Inter (gövde)
- Animated cards (Framer Motion)
- Responsive mobile-first (48px+ touch targets)
- Generous spacing (32-48px sections)

### 5. SEO & Performance
- Static generation (14/14 rotalar pre-rendered)
- Sitemap.xml otomatik
- Robots.txt
- JSON-LD schema ready
- Open Graph meta tags
- Zero hydration errors

## 🛠 Tech Stack

- **Frontend**: React 19 + Next.js 16 + TypeScript 5
- **Styling**: Tailwind CSS 4 + custom CSS variables
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (zero-config)

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── page.tsx                    # Ana sayfa
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # CSS variables
│   ├── bolgeler/
│   │   ├── page.tsx                # Bölgeler listesi
│   │   ├── [region]/
│   │   │   ├── page.tsx            # Bölge detay
│   │   │   └── [city]/
│   │   │       └── page.tsx        # Şehir detay
│   ├── robots.ts                   # robots.txt
│   └── sitemap.ts                  # sitemap.xml
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CityHero.tsx
│   ├── DurationSelector.tsx        # Duration seçimi
│   └── ItineraryDisplay.tsx        # Gün gün plan
└── lib/
    ├── types.ts
    └── data/
        ├── regions.ts
        └── cities.ts
```

## 🚀 Vercel Deployment (30 saniye)

### 1. GitHub'a Push
```bash
git remote add origin https://github.com/YOUR_USERNAME/yol-defteri.git
git push -u origin main
```

### 2. Vercel'e Bağla
- [vercel.com](https://vercel.com) gir
- GitHub repo'sunu seç
- "Deploy" tıkla — BITTI!

### 3. Custom Domain
- Vercel Dashboard → Domains
- Kendi domain'ını ekle
- DNS kayıtlarını güncelle

### 4. Google AdSense
- Vercel URL'sinden başvur
- Custom domain aktifleştikten sonra kodu embed et

## 💻 Development

```bash
# Setup
npm install

# Dev server
npm run dev
# http://localhost:3000

# Build
npm run build

# Production
npm start

# Linting
npm run lint
```

## 📝 Yeni Şehir Ekleme

`src/lib/data/cities.ts`'e ekle:

```typescript
{
  slug: "bodrum",
  regionSlug: "akdeniz",
  name: "Bodrum",
  // ... diğer alanlar
}
```

Sistem otomatik olarak:
- `/bolgeler/akdeniz/bodrum` sayfası oluşturur
- Sitemap'e ekler
- Duration selector'ü render eder

## 🎨 Tasarım Sistemi

### Renk Paleti
```css
--color-paper: #faf3e6       /* Krem */
--color-ink: #22201b         /* Mürekkep */
--color-kiremit: #b33a25     /* Ana vurgu */
--color-safran: #e4a335      /* Altın */
--color-deniz: #0f5257       /* Teali */
```

### Typography
- **Başlıklar**: Fraunces (serif, italic), 32-60px
- **Gövde**: Inter (sans-serif), 14-16px
- **Line-height**: 1.5-1.6

### Spacing
- Section gap: 32-48px
- Card padding: 16-24px
- Button height: 48-56px

## 📊 Content Roadmap

**Phase 1 (Şu Anda)**
- Karadeniz (Amasra, Safranbolu)
- MVP + design system

**Phase 2 (Sonraki)**
- 4 bölge ekle: Ege, Akdeniz, Marmara, İç Anadolu
- User reviews + photos

**Phase 3 (Premium)**
- Tüm 7 bölge
- AI recommendations
- Booking integrations

## 🔍 SEO Checklist

- ✅ Meta tags & OG
- ✅ JSON-LD schema
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Mobile responsive
- ✅ Fast load (static gen)

## 🚨 Sonraki Adımlar

1. Google Search Console'a sitemap'i submit et
2. Google Analytics 4 kodu embed et
3. Google AdSense'e başvur
4. Content expansion (şehirler ekle)
5. Social media promotion

## 📄 Lisans

MIT License — Açık kaynak

---

**Yol Defteri** — Yola çıkmadan önce oku, yolda not düş. 🗺️✨
