-- =====================================================================
--  1) Remove o cupom de primeira compra (BEMVINDO5) e mantém 5% no Pix.
--  2) Em TODOS os produtos, o valor no Pix continua o da lista e o
--     valor normal (azul / cartão) passa a ser 5% acima do Pix:
--        normal = Pix ÷ 0,95   (ex.: Pix R$ 45,90 → normal R$ 48,32)
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
--  Pode rodar de novo sem problema (sempre recalcula a partir do Pix).
-- =====================================================================

-- 1) Loja: sem cupom, 5% de desconto no Pix
update public.store_settings
set coupon = null,
    pix_discount = 0.05
where id = 1;

-- 2) Produtos: valor normal = Pix ÷ 0,95 em cada opção
update public.products p
set variants = (
      select jsonb_agg(
               x || jsonb_build_object(
                 'price', round(coalesce((x->>'pix')::numeric, (x->>'price')::numeric) / 0.95, 2),
                 'pix',   coalesce((x->>'pix')::numeric, (x->>'price')::numeric)
               ) order by ord)
      from jsonb_array_elements(p.variants) with ordinality as e(x, ord)
    )
where jsonb_typeof(p.variants) = 'array' and jsonb_array_length(p.variants) > 0;

update public.products p
set price = (select min((x->>'price')::numeric) from jsonb_array_elements(p.variants) x),
    old_price = null
where jsonb_typeof(p.variants) = 'array' and jsonb_array_length(p.variants) > 0;

-- Conferência: opção, valor normal e valor no Pix
select p.name,
       string_agg((x->>'label') || ': normal R$ ' || replace(x->>'price', '.', ',')
                  || ' / Pix R$ ' || replace(x->>'pix', '.', ','), '  |  ') as opcoes
from public.products p, jsonb_array_elements(p.variants) x
where p.active
group by p.id, p.name
order by p.name;
