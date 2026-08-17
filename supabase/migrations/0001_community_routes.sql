-- Topluluk rota galerisi: rotalar, yorumlar, beğeniler.
-- Hesap/şifre yok — author_identity, istemcide (cookie/localStorage)
-- üretilen anonim bir kimlik; spam/rate-limit'i API katmanı zorlar,
-- burada sadece "bir kimlik bir rotayı bir kez beğenebilir" UNIQUE kısıtı var.

create extension if not exists pgcrypto;

create table if not exists routes (
  id uuid primary key default gen_random_uuid(),
  city_slug text not null,
  region_slug text not null,
  title text not null check (char_length(title) between 3 and 120),
  days integer not null check (days between 1 and 14),
  stops jsonb not null,
  author_name text not null default 'Misafir Gezgin' check (char_length(author_name) <= 40),
  author_identity text not null,
  created_at timestamptz not null default now(),
  rating_avg numeric(2,1) not null default 0,
  rating_count integer not null default 0
);
create index if not exists routes_city_slug_idx on routes (city_slug);

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references routes(id) on delete cascade,
  author_name text not null default 'Misafir Gezgin' check (char_length(author_name) <= 40),
  author_identity text not null,
  text text not null check (char_length(text) between 1 and 1000),
  rating integer not null check (rating between 1 and 5),
  created_at timestamptz not null default now()
);
create index if not exists comments_route_id_idx on comments (route_id);

create table if not exists likes (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references routes(id) on delete cascade,
  author_identity text not null,
  created_at timestamptz not null default now(),
  unique (route_id, author_identity)
);
create index if not exists likes_route_id_idx on likes (route_id);

alter table routes enable row level security;
alter table comments enable row level security;
alter table likes enable row level security;

-- Herkes okuyabilir (hesapsız topluluk galerisi), herkes ekleyebilir
-- (yazma sırasındaki asıl doğrulama/rate-limit Next.js API route'unda —
-- bu politikalar Supabase'in kendi minimum güvenlik gereksinimi, "RLS
-- kapalıyken hiç erişim yok" durumunu aşmak için var).
drop policy if exists "public read routes" on routes;
drop policy if exists "public insert routes" on routes;
create policy "public read routes" on routes for select using (true);
create policy "public insert routes" on routes for insert with check (true);

drop policy if exists "public read comments" on comments;
drop policy if exists "public insert comments" on comments;
create policy "public read comments" on comments for select using (true);
create policy "public insert comments" on comments for insert with check (true);

drop policy if exists "public read likes" on likes;
drop policy if exists "public insert likes" on likes;
create policy "public read likes" on likes for select using (true);
create policy "public insert likes" on likes for insert with check (true);
