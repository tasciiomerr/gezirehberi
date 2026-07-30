import { City, DayPlan, ItineraryRoute, RouteStop, Attraction, Restaurant } from "@/lib/types";
import { estimateTransfer, assignTimeSlot } from "@/lib/geo";

const IMPORTANCE_ORDER: Record<string, number> = {
  "must-see": 0,
  "should-see": 1,
  "nice-to-have": 2,
};

function sortByImportance<T extends { importance: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => (IMPORTANCE_ORDER[a.importance] ?? 3) - (IMPORTANCE_ORDER[b.importance] ?? 3)
  );
}

function pickRestaurant(restaurants: Restaurant[], index: number): Restaurant | undefined {
  if (restaurants.length === 0) return undefined;
  return restaurants[index % restaurants.length];
}

/**
 * Otomatik itinerary oluşturucu: şehrin attraction/restaurant verisinden
 * gün sayısına göre optimize edilmiş gün gün plan üretir.
 * Must-see yerler önce, sonra should-see, sonra nice-to-have dağıtılır.
 */
export function generateItinerary(city: City, days: number): ItineraryRoute {
  const sortedAttractions = sortByImportance(city.attractions);
  const restaurants = city.restaurants.length > 0 ? city.restaurants : [];

  // Her gün için kaç attraction hedefleniyor (yoğunluk gün arttıkça azalır)
  const attractionsPerDay = days <= 2 ? 3 : days <= 5 ? 2 : 2;

  const dayPlans: DayPlan[] = [];
  let attractionCursor = 0;

  const dayThemes = [
    "Şehrin Kalbi",
    "Tarihi Keşif",
    "Doğa ve Manzara",
    "Yerel Yaşam",
    "Sakin Bir Gün",
    "Gizli Köşeler",
    "Deniz ve Lezzet",
    "Kültür Turu",
    "Macera Günü",
    "Rahatlama",
    "Çevre Gezileri",
    "Alışveriş ve Sanat",
    "Fotoğraf Turu",
    "Veda Günü",
  ];

  for (let day = 1; day <= days; day++) {
    const stops: RouteStop[] = [];
    let order = 1;

    const breakfastRestaurant = pickRestaurant(restaurants, (day - 1) * 3);
    const lunchRestaurant = pickRestaurant(restaurants, (day - 1) * 3 + 1);
    const dinnerRestaurant = pickRestaurant(restaurants, (day - 1) * 3 + 2);

    if (breakfastRestaurant) {
      stops.push({
        order: order++,
        title: `Kahvaltı: ${breakfastRestaurant.name}`,
        description: breakfastRestaurant.description,
        duration: "1 saat",
        type: "dining",
        itemId: breakfastRestaurant.id,
        location: breakfastRestaurant.location,
      });
    }

    const dayAttractions: Attraction[] = [];
    for (let i = 0; i < attractionsPerDay; i++) {
      const attraction = sortedAttractions[attractionCursor];
      if (attraction) {
        dayAttractions.push(attraction);
        attractionCursor++;
      }
    }

    dayAttractions.forEach((attraction, idx) => {
      stops.push({
        order: order++,
        title: attraction.name,
        description: attraction.description,
        duration: attraction.duration,
        type: "attraction",
        itemId: attraction.id,
        location: attraction.location,
        tips: attraction.tips,
      });

      // Öğlen ilk attraction sonrası öğle yemeği ekle
      if (idx === 0 && lunchRestaurant) {
        stops.push({
          order: order++,
          title: `Öğle Yemeği: ${lunchRestaurant.name}`,
          description: lunchRestaurant.description,
          duration: "1.5 saat",
          type: "dining",
          itemId: lunchRestaurant.id,
          location: lunchRestaurant.location,
        });
      }
    });

    if (dinnerRestaurant) {
      stops.push({
        order: order++,
        title: `Akşam Yemeği: ${dinnerRestaurant.name}`,
        description: dinnerRestaurant.description,
        duration: "2 saat",
        type: "dining",
        itemId: dinnerRestaurant.id,
        location: dinnerRestaurant.location,
      });
    }

    // Eğer hiç attraction kalmadıysa (uzun rotalarda), serbest gün ekle
    if (dayAttractions.length === 0 && sortedAttractions.length > 0) {
      stops.splice(1, 0, {
        order: 99,
        title: "Serbest Zaman: Sahilde/Çarşıda Keşif",
        description: "Bu gün programsız — kendi hızınızda şehri keşfedin, alışveriş yapın veya dinlenin.",
        duration: "3-4 saat",
        type: "activity",
      });
    }

    // Section 2.2: her durağı zaman dilimine (sabah/öğle/akşam) yerleştir
    stops.forEach((s) => {
      s.timeSlot = assignTimeSlot(s.order, stops.length);
    });

    // Section 1.3: ardışık duraklar arası mock transfer bloğu (mesafe + süre)
    const transfers = [];
    let totalWalkingKm = 0;
    for (let i = 0; i < stops.length - 1; i++) {
      const transfer = estimateTransfer(
        stops[i].order,
        stops[i + 1].order,
        stops[i].location,
        stops[i + 1].location
      );
      if (transfer) {
        transfers.push(transfer);
        if (transfer.mode === "walk") totalWalkingKm += transfer.distanceKm;
      }
    }

    const estimatedSpend = `${150 + dayAttractions.length * 120}-${300 + dayAttractions.length * 200} TL`;

    dayPlans.push({
      day,
      title: dayThemes[(day - 1) % dayThemes.length],
      stops,
      transfers,
      totalWalkingKm: Math.round(totalWalkingKm * 10) / 10,
      estimatedSpend,
      totalDuration: `${6 + dayAttractions.length * 2} saat`,
      mealSuggestions:
        breakfastRestaurant && lunchRestaurant && dinnerRestaurant
          ? {
              breakfast: breakfastRestaurant,
              lunch: lunchRestaurant,
              dinner: dinnerRestaurant,
            }
          : undefined,
      accommodationSuggestion: city.accommodations[0],
      notes:
        day === days
          ? "Son gün — dönüş yolculuğu için zaman payı bırakın."
          : undefined,
    });
  }

  const importance: ItineraryRoute["importance"] =
    days <= 2 ? "quick-visit" : days <= 5 ? "highlights" : "full-experience";

  return {
    id: `${city.slug}-${days}days`,
    title: `${city.name} İçin ${days} Günlük Rota`,
    description: `${city.name} için otomatik oluşturulmuş, ${days} günlük optimize edilmiş rota`,
    days,
    summary: `${dayPlans.length} günlük plan, ${city.attractions.length} gezilecek yer ve ${city.restaurants.length} restoran verisinden oluşturuldu.`,
    importance,
    dayPlans,
    bestSeason: city.whenToGo,
    budgetPerPerson: city.budget,
    images: city.attractions[0]?.images ?? [],
  };
}

export const AVAILABLE_DURATIONS = [1, 2, 3, 5, 7, 14];
