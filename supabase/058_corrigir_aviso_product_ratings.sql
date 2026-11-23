-- =====================================================================
--  Corrige o aviso do Security Advisor:
--  "View public.product_ratings is defined with the SECURITY DEFINER property"
--  A view passa a respeitar as regras (RLS) de quem consulta (security_invoker).
--  Como as avaliações são públicas para leitura, as estrelas continuam
--  aparecendo para todos normalmente.
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
create or replace view public.product_ratings
with (security_invoker = true) as
  select product_id, round(avg(rating)::numeric, 1) as avg, count(*)::int as total
  from public.reviews
  group by product_id;

grant select on public.product_ratings to anon, authenticated;
