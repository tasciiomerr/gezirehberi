import { createClient } from "@supabase/supabase-js";

// Minimal hand-written schema (just the 3 community-gallery tables) so
// supabase-js's query builder is typed instead of inferring `never` for every
// insert/select — matches supabase/migrations/0001_community_routes.sql.
export interface Database {
  public: {
    Tables: {
      routes: {
        Row: {
          id: string;
          city_slug: string;
          region_slug: string;
          title: string;
          days: number;
          stops: unknown;
          author_name: string;
          author_identity: string;
          created_at: string;
          rating_avg: number;
          rating_count: number;
          like_count: number;
        };
        Insert: {
          city_slug: string;
          region_slug: string;
          title: string;
          days: number;
          stops: unknown;
          author_name?: string;
          author_identity: string;
        };
        Update: Partial<Database["public"]["Tables"]["routes"]["Insert"]>;
        Relationships: [];
      };
      comments: {
        Row: {
          id: string;
          route_id: string;
          author_name: string;
          author_identity: string;
          text: string;
          rating: number;
          created_at: string;
        };
        Insert: {
          route_id: string;
          author_name?: string;
          author_identity: string;
          text: string;
          rating: number;
        };
        Update: Partial<Database["public"]["Tables"]["comments"]["Insert"]>;
        Relationships: [];
      };
      likes: {
        Row: {
          id: string;
          route_id: string;
          author_identity: string;
          created_at: string;
        };
        Insert: {
          route_id: string;
          author_identity: string;
        };
        Update: Partial<Database["public"]["Tables"]["likes"]["Insert"]>;
        Relationships: [];
      };
      reports: {
        Row: {
          id: string;
          target_type: "route" | "comment";
          target_id: string;
          reason: "spam" | "inappropriate" | "incorrect" | "other";
          author_identity: string;
          created_at: string;
        };
        Insert: {
          target_type: "route" | "comment";
          target_id: string;
          reason: "spam" | "inappropriate" | "incorrect" | "other";
          author_identity: string;
        };
        Update: Partial<Database["public"]["Tables"]["reports"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}

// Server-only Supabase client for the community route gallery (routes/comments/
// likes). Uses the anon/publishable key — safe by Supabase's own design (RLS
// policies are the real access boundary, not key secrecy) — but this module is
// only ever imported from Route Handlers, so it never reaches the client bundle.
let client: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseServerClient() {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  client = createClient<Database>(url, anonKey, {
    auth: { persistSession: false },
  });
  return client;
}
