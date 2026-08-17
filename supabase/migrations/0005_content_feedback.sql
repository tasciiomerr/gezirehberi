-- Parti 3, madde 10 — "Bu bilgi hâlâ doğru mu" geri bildirim butonu.
-- reports tablosuyla aynı desen: moderasyon/editör kuyruğu, herkese açık
-- liste değil, bu yüzden public SELECT policy yok. Rate-limit sayımı da
-- reports'taki gibi satırları değil sadece sayıyı döndüren bir
-- SECURITY DEFINER RPC ile yapılıyor (0004'teki fail-open hatasını tekrar
-- etmemek için).
create table if not exists content_feedback (
  id uuid primary key default gen_random_uuid(),
  city_slug text not null,
  is_accurate boolean not null,
  note text check (note is null or char_length(note) <= 500),
  author_identity text not null,
  created_at timestamptz not null default now()
);
create index if not exists content_feedback_city_idx on content_feedback (city_slug);

alter table content_feedback enable row level security;
drop policy if exists "public insert content feedback" on content_feedback;
create policy "public insert content feedback" on content_feedback for insert with check (true);

create or replace function count_recent_content_feedback(p_identity text, p_since timestamptz)
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::integer from content_feedback
  where author_identity = p_identity and created_at >= p_since;
$$;

grant execute on function count_recent_content_feedback(text, timestamptz) to anon, authenticated;
