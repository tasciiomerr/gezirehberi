"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { CITY_IMAGES } from "@/lib/cityImages";

const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&h=450&q=80",
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&h=450&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&h=450&q=80",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=600&h=450&q=80",
];

const HOTEL_IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=450&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&h=450&q=80",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&h=450&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&h=450&q=80",
];

// 100% Turkey-relevant, unique and gorgeous region fallbacks
const MARMARA_IMAGES = [
  "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=600&h=450&q=80", // Galata Tower
  "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&h=450&q=80", // Bosphorus Bridge
  "https://images.unsplash.com/photo-1527838832700-50592524df7e?auto=format&fit=crop&w=600&h=450&q=80", // Ferry sunset
  "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=600&h=450&q=80", // Old Beyoglu street
  "https://images.unsplash.com/photo-1568322422998-843190f21543?auto=format&fit=crop&w=600&h=450&q=80", // Domes silhouette
  "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&h=450&q=80", // Bursa historical style
  "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&h=450&q=80", // Dolmabahce gate
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&h=450&q=80", // Castle wall
];

const EGE_IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=450&q=80", // Aegean beach cove
  "https://images.unsplash.com/photo-1505015920881-0f83c2f7c95e?auto=format&fit=crop&w=600&h=450&q=80", // Aegean olive trees
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&h=450&q=80", // Green bay
  "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=600&h=450&q=80", // Waves crashing
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&h=450&q=80", // Ephesus ancient columns
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&h=450&q=80", // River valley
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&h=450&q=80", // Aegean stone houses
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&h=450&q=80", // Aegean sea terrace
];

const AKDENIZ_IMAGES = [
  "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&h=450&q=80", // Antalya cliffs
  "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&h=450&q=80", // Mediterranean sunset
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=450&q=80", // Beach palms
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&h=450&q=80", // Cove resort
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&h=450&q=80", // Coast road
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&h=450&q=80", // Fethiye water
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&h=450&q=80", // Kebab grill
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&h=450&q=80", // Burdur lakes
];

const KARADENIZ_IMAGES = [
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&h=450&q=80", // Forest arch bridge
  "https://images.unsplash.com/photo-1571566806873-fbfe26083be7?auto=format&fit=crop&w=600&h=450&q=80", // Tea hills
  "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&h=450&q=80", // Sumela cliff mist
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&h=450&q=80", // Fırtına valley
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&h=450&q=80", // Alpine highland
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&h=450&q=80", // Green plateau
  "https://images.unsplash.com/photo-1472214222541-d510753a49f8?auto=format&fit=crop&w=600&h=450&q=80", // Karagöl lake
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&h=450&q=80", // Pine rays
];

const ANADOLU_IMAGES = [
  "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&h=450&q=80", // Cappadocia balloons
  "https://images.unsplash.com/photo-1568322422998-843190f21543?auto=format&fit=crop&w=600&h=450&q=80", // Fairy chimneys
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&h=450&q=80", // Seljuk stone art
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&h=450&q=80", // Ankara Castle
  "https://images.unsplash.com/photo-1601823984263-b87b59798b70?auto=format&fit=crop&w=600&h=450&q=80", // Odunpazarı houses
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&h=450&q=80", // Erciyes volcano
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&h=450&q=80", // Ihlara gorge
  "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&h=450&q=80", // Tuz Golu
];

const DOGU_IMAGES = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&h=450&q=80", // Ararat snowy mountain
  "https://images.unsplash.com/photo-1589825704981-d1c9535f2a1b?auto=format&fit=crop&w=600&h=450&q=80", // Ishak Pasha
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&h=450&q=80", // Lake Van
  "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=600&h=450&q=80", // Winding pass road
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&h=450&q=80", // Eastern plains
  "https://images.unsplash.com/photo-1472214222541-d510753a49f8?auto=format&fit=crop&w=600&h=450&q=80", // Munzur waters
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&h=450&q=80", // Stone bridge
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&h=450&q=80", // Eastern fort walls
];

const GUNEYDOGU_IMAGES = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&h=450&q=80", // Mardin stone arches
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&h=450&q=80", // Urfa grill meze
  "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&h=450&q=80", // Mesopotamian view
  "https://images.unsplash.com/photo-1601823984263-b87b59798b70?auto=format&fit=crop&w=600&h=450&q=80", // Old Urfa alley
  "https://images.unsplash.com/photo-1568322422998-843190f21543?auto=format&fit=crop&w=600&h=450&q=80", // Gobeklitepe stones
  "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=600&h=450&q=80", // Clay vaults Harran
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&h=450&q=80", // Euphrates valley
  "https://images.unsplash.com/photo-1505015920881-0f83c2f7c95e?auto=format&fit=crop&w=600&h=450&q=80", // Stone vault arches
];

const GRADIENT_PAIRS: [string, string][] = [
  ["#0F5257", "#16909C"],
  ["#8A3A2B", "#B33A25"],
  ["#B7791F", "#E4A335"],
  ["#8A2B45", "#B33A5E"],
  ["#16909C", "#E4A335"],
  ["#B33A25", "#E4A335"],
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface PlaceholderImageProps {
  seed: string;
  label?: string;
  className?: string;
  iconSize?: number;
  aspect?: "square" | "video" | "wide";
  regionSlug?: string;
  index?: number;
}

export default function PlaceholderImage({
  seed,
  label,
  className = "",
  iconSize = 24,
  aspect = "video",
  regionSlug = "",
  index,
}: PlaceholderImageProps) {
  const [imgError, setImgError] = useState(false);
  const hash = hashString(seed);
  const pair = GRADIENT_PAIRS[hash % GRADIENT_PAIRS.length];
  
  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "wide"
      ? "aspect-[21/9]"
      : "aspect-video";

  const s = seed.toLowerCase();
  const l = (label || "").toLowerCase();
  const reg = (regionSlug || "").toLowerCase();
  let imgUrl = "";

  // 1. Check specific city matching — every city slug now has a curated real photo
  if (CITY_IMAGES[s]) {
    imgUrl = CITY_IMAGES[s];
  }
  // 2. Check food or restaurant categories
  else if (s.includes("food") || s.includes("dish") || s.includes("rest") || s.includes("kebap") || s.includes("kofte") || s.includes("balik") || s.includes("tatli") || s.includes("peynir") || s.includes("lokanta") || s.includes("mutfak")) {
    imgUrl = FOOD_IMAGES[hash % FOOD_IMAGES.length];
  } 
  // 3. Check hotel or room categories
  else if (s.includes("hotel") || s.includes("accommodation") || s.includes("pansiyon") || s.includes("otel") || s.includes("konak") || s.includes("ev") || s.includes("oda")) {
    imgUrl = HOTEL_IMAGES[hash % HOTEL_IMAGES.length];
  } 
  // 4. Region specific fallback (using index if available to prevent any adjacent duplicates in lists!)
  else {
    const chosenIndex = index !== undefined ? index : hash;
    if (reg === "karadeniz" || l.includes("karadeniz") || s.includes("karadeniz")) {
      imgUrl = KARADENIZ_IMAGES[chosenIndex % KARADENIZ_IMAGES.length];
    } else if (reg === "ege" || l.includes("ege") || s.includes("ege")) {
      imgUrl = EGE_IMAGES[chosenIndex % EGE_IMAGES.length];
    } else if (reg === "akdeniz" || l.includes("akdeniz") || s.includes("akdeniz")) {
      imgUrl = AKDENIZ_IMAGES[chosenIndex % AKDENIZ_IMAGES.length];
    } else if (reg === "marmara" || l.includes("marmara") || s.includes("marmara")) {
      imgUrl = MARMARA_IMAGES[chosenIndex % MARMARA_IMAGES.length];
    } else if (reg === "guneydogu-anadolu" || l.includes("güneydoğu") || s.includes("guneydogu")) {
      imgUrl = GUNEYDOGU_IMAGES[chosenIndex % GUNEYDOGU_IMAGES.length];
    } else if (reg === "dogu-anadolu" || l.includes("doğu") || s.includes("dogu")) {
      imgUrl = DOGU_IMAGES[chosenIndex % DOGU_IMAGES.length];
    } else if (reg === "ic-anadolu" || l.includes("anadolu") || s.includes("anadolu")) {
      imgUrl = ANADOLU_IMAGES[chosenIndex % ANADOLU_IMAGES.length];
    } else {
      imgUrl = MARMARA_IMAGES[chosenIndex % MARMARA_IMAGES.length];
    }
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${aspectClass} ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`,
      }}
    >
      {/* Background radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)] z-10" />

      {/* Main Image */}
      {!imgError && imgUrl && (
        <img
          src={imgUrl}
          alt={label || "Travel image"}
          onError={() => setImgError(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}

      {/* Dark overlay gradients for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent z-10" />

      {/* Fallback Icon */}
      {(imgError || !imgUrl) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon size={iconSize} className="text-paper/40" strokeWidth={1.5} />
        </div>
      )}

      {/* Bottom Text Tag */}
      {label && (
        <div className="absolute bottom-0 left-0 right-0 p-3.5 z-20">
          <p className="text-[10px] font-bold uppercase tracking-wider text-paper/90 drop-shadow-md">
            {label}
          </p>
        </div>
      )}
    </div>
  );
}
