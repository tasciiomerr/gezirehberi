export interface SocialUser {
  username: string;
  email: string;
  avatar: string;
  bio: string;
}

export interface SocialStop {
  order: number;
  title: string;
  description: string;
  duration: string;
  type: "attraction" | "dining" | "accommodation" | "activity";
}

export interface SocialRoute {
  id: string;
  citySlug: string;
  regionSlug: string;
  title: string;
  days: number;
  stops: SocialStop[];
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  ratingAvg: number;
  ratingCount: number;
}

export interface SocialComment {
  id: string;
  routeId: string;
  authorName: string;
  text: string;
  rating: number; // 1-5
  createdAt: string;
}

const USERS_KEY = "yoldefteri_social_users";
const ACTIVE_USER_KEY = "yoldefteri_social_active_user";
const ROUTES_KEY = "yoldefteri_social_routes";
const COMMENTS_KEY = "yoldefteri_social_comments";

const DEFAULT_USERS: Record<string, { user: SocialUser; pass: string }> = {
  cangezgin: {
    user: {
      username: "Can Gezgin",
      email: "can@gezgin.com",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
      bio: "Türkiye'yi karış karış gezmeye çalışan, Ege ve Akdeniz aşığı bir harita mühendisi.",
    },
    pass: "123456",
  },
  elifyolcu: {
    user: {
      username: "Elif Yolcu",
      email: "elif@yolcu.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      bio: "Kamp yapmayı, antik kentleri fotoğraflamayı ve yöresel lezzetleri keşfetmeyi seven bir mimar.",
    },
    pass: "123456",
  },
};

const DEFAULT_ROUTES: SocialRoute[] = [
  {
    id: "r-can-canakkale",
    citySlug: "canakkale",
    regionSlug: "marmara",
    title: "1915 Çanakkale Köprüsü ve Şehitlik Rotaları",
    days: 2,
    stops: [
      { order: 1, title: "Çanakkale Şehitler Abidesi", description: "Gelibolu Yarımadası'ndaki en görkemli anıtı sabah erken saatlerde ziyaret.", duration: "2 saat", type: "attraction" },
      { order: 2, title: "Anzak Koyu ve 57. Piyade Alayı Şehitliği", description: "Savaşın en yoğun geçtiği cephelerde duygu dolu bir yürüyüş.", duration: "1.5 saat", type: "attraction" },
      { order: 3, title: "Truva Antik Kenti", description: "Homeros'un destanındaki efsanevi ahşap atı ve kazı alanlarını ziyaret.", duration: "2.5 saat", type: "attraction" },
      { order: 4, title: "Çanakkale Aynalı Çarşı", description: "Türküye konu olmuş tarihi çarşıda hatıralık peynir helvası alışverişi.", duration: "1 saat", type: "activity" },
    ],
    authorName: "Can Gezgin",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
    createdAt: "2026-07-28T10:30:00Z",
    ratingAvg: 4.8,
    ratingCount: 5,
  },
  {
    id: "r-elif-bodrum",
    citySlug: "bodrum",
    regionSlug: "akdeniz", // As per slug references
    title: "Bodrum Antik Kent ve Gizli Koylar Gezisi",
    days: 3,
    stops: [
      { order: 1, title: "Bodrum Kalesi & Sualtı Arkeoloji Müzesi", description: "Dünyanın en zengin sualtı batık koleksiyonunu keşfedin.", duration: "3 saat", type: "attraction" },
      { order: 2, title: "Halikarnas Mozolesi", description: "Dünyanın yedi harikasından birinin kalıntılarını yerinde görün.", duration: "1 saat", type: "attraction" },
      { order: 3, title: "Bitez Koyu", description: "Sörf yapanları izleyerek mandalina bahçeleri arasında yürüyüş.", duration: "2 saat", type: "activity" },
    ],
    authorName: "Elif Yolcu",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    createdAt: "2026-07-29T14:15:00Z",
    ratingAvg: 5,
    ratingCount: 3,
  },
];

const DEFAULT_COMMENTS: SocialComment[] = [
  {
    id: "c-1",
    routeId: "r-can-canakkale",
    authorName: "Elif Yolcu",
    text: "Tarihi yarımadayı gezerken bu sıralama gerçekten çok işe yaradı! Çanakkale Köprüsü geçişi sonrası harika bir güzergah oldu.",
    rating: 5,
    createdAt: "2026-07-28T12:00:00Z",
  },
  {
    id: "c-2",
    routeId: "r-can-canakkale",
    authorName: "Kadir Gezgin",
    text: "Özellikle Aynalı Çarşı'daki peynir helvası önerisi için teşekkürler, tam yerinde bir mola oldu.",
    rating: 4,
    createdAt: "2026-07-28T16:45:00Z",
  },
];

// Database utility helper methods
function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, val: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(val));
}

// Public API
export function initializeSocialDB() {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(USERS_KEY)) {
    write(USERS_KEY, DEFAULT_USERS);
  }
  if (!localStorage.getItem(ROUTES_KEY)) {
    write(ROUTES_KEY, DEFAULT_ROUTES);
  }
  if (!localStorage.getItem(COMMENTS_KEY)) {
    write(COMMENTS_KEY, DEFAULT_COMMENTS);
  }
}

export function registerUser(username: string, email: string, pass: string): { success: boolean; error?: string } {
  const users = read<Record<string, { user: SocialUser; pass: string }>>(USERS_KEY, DEFAULT_USERS);
  const key = username.toLowerCase().replace(/\s+/g, "");

  if (users[key]) {
    return { success: false, error: "Bu kullanıcı adı zaten alınmış." };
  }

  const avatar = `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80`; // default
  users[key] = {
    user: { username, email, avatar, bio: "Yol Defteri üyesi seyyah." },
    pass,
  };
  write(USERS_KEY, users);
  return { success: true };
}

export function loginUser(username: string, pass: string): { success: boolean; user?: SocialUser; error?: string } {
  const users = read<Record<string, { user: SocialUser; pass: string }>>(USERS_KEY, DEFAULT_USERS);
  const key = username.toLowerCase().replace(/\s+/g, "");

  if (!users[key] || users[key].pass !== pass) {
    return { success: false, error: "Hatalı kullanıcı adı veya şifre." };
  }

  const user = users[key].user;
  write(ACTIVE_USER_KEY, user);
  return { success: true, user };
}

export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACTIVE_USER_KEY);
}

export function getActiveUser(): SocialUser | null {
  return read<SocialUser | null>(ACTIVE_USER_KEY, null);
}

export function getUserRoutes(citySlug: string): SocialRoute[] {
  const routes = read<SocialRoute[]>(ROUTES_KEY, DEFAULT_ROUTES);
  return routes.filter((r) => r.citySlug === citySlug);
}

export function createUserRoute(route: Omit<SocialRoute, "id" | "createdAt" | "ratingAvg" | "ratingCount" | "authorName" | "authorAvatar">): { success: boolean; route?: SocialRoute } {
  const activeUser = getActiveUser();
  if (!activeUser) return { success: false };

  const routes = read<SocialRoute[]>(ROUTES_KEY, DEFAULT_ROUTES);
  const newRoute: SocialRoute = {
    ...route,
    id: `r-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ratingAvg: 5,
    ratingCount: 1,
    authorName: activeUser.username,
    authorAvatar: activeUser.avatar,
  };

  routes.unshift(newRoute);
  write(ROUTES_KEY, routes);
  return { success: true, route: newRoute };
}

export function getRouteComments(routeId: string): SocialComment[] {
  const comments = read<SocialComment[]>(COMMENTS_KEY, DEFAULT_COMMENTS);
  return comments.filter((c) => c.routeId === routeId);
}

export function addComment(routeId: string, text: string, rating: number): { success: boolean; comment?: SocialComment } {
  const activeUser = getActiveUser();
  if (!activeUser) return { success: false };

  const comments = read<SocialComment[]>(COMMENTS_KEY, DEFAULT_COMMENTS);
  const newComment: SocialComment = {
    id: `c-${Date.now()}`,
    routeId,
    authorName: activeUser.username,
    text,
    rating,
    createdAt: new Date().toISOString(),
  };

  comments.unshift(newComment);
  write(COMMENTS_KEY, comments);

  // Update Route Average Rating
  const routes = read<SocialRoute[]>(ROUTES_KEY, DEFAULT_ROUTES);
  const route = routes.find((r) => r.id === routeId);
  if (route) {
    const routeComments = comments.filter((c) => c.routeId === routeId);
    const sum = routeComments.reduce((acc, curr) => acc + curr.rating, 0);
    route.ratingAvg = Math.round((sum / routeComments.length) * 10) / 10;
    route.ratingCount = routeComments.length;
    write(ROUTES_KEY, routes);
  }

  return { success: true, comment: newComment };
}
