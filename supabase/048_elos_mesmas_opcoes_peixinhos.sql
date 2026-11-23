-- =====================================================================
--  "Elos de Contagem Coloridos" com as mesmas opções e valores do
--  "Kit Contagem Aquário - Peixinhos":
--    20 unidades  R$ 29,90 (Pix)
--    50 unidades  R$ 38,90 (Pix)
--  O preço normal fica igual ao Pix (ajuste o do cartão no painel depois).
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set variants  = '[{"label":"20 unidades","price":29.9,"pix":29.9,"old_price":null},{"label":"50 unidades","price":38.9,"pix":38.9,"old_price":null}]'::jsonb,
    options   = array['20 unidades', '50 unidades'],
    price     = 29.9,
    old_price = null
where name = 'Elos de Contagem Coloridos';

-- Conferência
select name, variants from public.products
where name in ('Elos de Contagem Coloridos', 'Kit Contagem Aquário - Peixinhos');
