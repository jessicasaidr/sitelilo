-- =====================================================================
--  Preço por opção do produto (ex.: 1 unidade / Kit com 3 / Kit com 5)
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Pode rodar de novo sem problema.)
--
--  Formato salvo em "variants":
--    [{"label":"1 unidade","price":29.90,"old_price":null},
--     {"label":"Kit com 3","price":79.90,"old_price":89.70}]
-- =====================================================================
alter table public.products
  add column if not exists variants jsonb not null default '[]'::jsonb;

alter table public.products drop constraint if exists products_variants_is_array;
alter table public.products
  add constraint products_variants_is_array check (jsonb_typeof(variants) = 'array');
