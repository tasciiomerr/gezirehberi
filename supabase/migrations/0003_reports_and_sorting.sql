-- Parti 2, madde 7: moderasyon bildirme mekanizması. Gerçek kullanıcı
-- içeriği (routes/comments) yayında ama şu ana kadar hiçbir "uygunsuz
-- içerik" bildirme yolu yoktu.
create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('route', 'comment')),
  target_id uuid not null,
  reason text not null check (reason in ('spam', 'inappropriate', 'incorrect', 'other')),
  author_identity text not null,
  created_at timestamptz not null default now()
);
create index if not exists reports_target_idx on reports (target_type, target_id);

alter table reports enable row level security;

-- Bilinçli olarak SADECE insert — public select yok. Bildirimler bir
-- moderasyon kuyruğu, herkesin görebileceği bir liste değil; site sahibi
-- Supabase dashboard'undan (service-role erişimiyle) inceler.
drop policy if exists "public insert reports" on reports;
create policy "public insert reports" on reports for insert with check (true);

-- Parti 2, madde 8: "en çok beğenilen" sıralaması routes.rating_avg gibi
-- routes.like_count'a da ihtiyaç duyuyor — her like eklendiğinde/
-- silindiğinde (silme şu an yok ama ileride olursa diye) otomatik güncellenen
-- bir sütun, API'nin her listelemede ayrı bir COUNT sorgusu yapmasına gerek
-- bırakmıyor.
alter table routes add column if not exists like_count integer not null default 0;

create or replace function recompute_route_like_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  affected_route_id uuid;
begin
  affected_route_id := coalesce(new.route_id, old.route_id);
  update routes
  set like_count = (select count(*) from likes where route_id = affected_route_id)
  where id = affected_route_id;
  return coalesce(new, old);
end;
$$;

drop trigger if exists likes_after_change_count on likes;
create trigger likes_after_change_count
  after insert or delete on likes
  for each row
  execute function recompute_route_like_count();
