-- =====================================================================
--  "Palitos Coloridos - Formas e Padrões" com as mesmas opções do
--  "Elos de Contagem Coloridos" (antes era só "24 unidades - R$ 37,90"):
--    20 unidades  R$ 29,90 (Pix)
--    50 unidades  R$ 38,90 (Pix)
--  O preço normal fica igual ao Pix (ajuste o do cartão no painel depois).
--  A descrição já usa {opcao}: "Incluso 20 unidades / 50 unidades com cores sortidas".
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set variants  = '[{"label":"20 unidades","price":29.9,"pix":29.9,"old_price":null},{"label":"50 unidades","price":38.9,"pix":38.9,"old_price":null}]'::jsonb,
    options   = array['20 unidades', '50 unidades'],
    price     = 29.9,
    old_price = null
where name = 'Palitos Coloridos - Formas e Padrões';

-- Conferência
select name, variants from public.products
where name in ('Palitos Coloridos - Formas e Padrões', 'Elos de Contagem Coloridos');
