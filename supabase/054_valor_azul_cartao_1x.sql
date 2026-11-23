-- =====================================================================
--  Valor em AZUL (preço normal) = cartão 1x à vista na maquininha
--  InfinitePay, com a taxa repassada ao cliente:
--      azul = valor no Pix × 1,06372  (arredondado para cima no centavo)
--      ex.: Pix R$ 45,90  →  azul R$ 48,83
--  O valor no Pix NÃO muda.
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
--  Pode rodar de novo sem problema (sempre recalcula a partir do Pix).
-- =====================================================================
update public.products p
set variants = (
      select jsonb_agg(
               x || jsonb_build_object(
                 'pix',   coalesce((x->>'pix')::numeric, (x->>'price')::numeric),
                 'price', ceil(round(coalesce((x->>'pix')::numeric, (x->>'price')::numeric) * 1.06372, 6) * 100) / 100,
                 'old_price', null
               ) order by ord)
      from jsonb_array_elements(p.variants) with ordinality as e(x, ord)
    )
where jsonb_typeof(p.variants) = 'array' and jsonb_array_length(p.variants) > 0;

update public.products p
set price = (select min((x->>'price')::numeric) from jsonb_array_elements(p.variants) x),
    old_price = null
where jsonb_typeof(p.variants) = 'array' and jsonb_array_length(p.variants) > 0;

-- Conferência: valor em azul (cartão 1x) e Pix de cada opção
select p.name,
       string_agg((x->>'label') || ': azul R$ ' || replace(x->>'price', '.', ',')
                  || ' / Pix R$ ' || replace(x->>'pix', '.', ','), '  |  ') as opcoes
from public.products p, jsonb_array_elements(p.variants) x
where p.active
group by p.id, p.name
order by p.name;
