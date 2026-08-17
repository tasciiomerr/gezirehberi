-- Bulgu: reports tablosunda public SELECT politikası yok (bilinçli — moderasyon
-- kuyruğu, herkese açık liste değil), ama isRateLimited() sayımı bir SELECT
-- count sorgusuyla yapıyor. Servis rolü anahtarı yapılandırılmadığından (sadece
-- anon key var), bu sorgu RLS altında hata veriyor ve "fail open" davranışıyla
-- rate limit'i sessizce devre dışı bırakıyor (gerçek istekle doğrulandı: 7
-- ardışık rapor, limit 5/saat olmasına rağmen hepsi kabul edildi).
--
-- Çözüm: satırları değil sadece sayıyı döndüren bir SECURITY DEFINER RPC.
-- Moderasyon kuyruğu hâlâ herkese açık okunamaz durumda kalıyor.
create or replace function count_recent_reports(p_identity text, p_since timestamptz)
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::integer from reports
  where author_identity = p_identity and created_at >= p_since;
$$;

grant execute on function count_recent_reports(text, timestamptz) to anon, authenticated;
