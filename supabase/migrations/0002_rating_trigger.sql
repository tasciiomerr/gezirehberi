-- routes.rating_avg/rating_count otomatik güncellensin diye — API katmanının
-- bunun için routes tablosuna genel bir UPDATE izni (RLS policy) açmasına
-- gerek kalmasın. SECURITY DEFINER: trigger, anon'un RLS'inden bağımsız,
-- tablo sahibi yetkisiyle çalışır — sadece bu dar işlemi yapar.
create or replace function recompute_route_rating()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update routes
  set
    rating_avg = coalesce((select round(avg(rating)::numeric, 1) from comments where route_id = new.route_id), 0),
    rating_count = (select count(*) from comments where route_id = new.route_id)
  where id = new.route_id;
  return new;
end;
$$;

drop trigger if exists comments_after_insert_rating on comments;
create trigger comments_after_insert_rating
  after insert on comments
  for each row
  execute function recompute_route_rating();
