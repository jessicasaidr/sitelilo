-- =====================================================================
--  Fotos do produto "Bingo das Sílabas" (Jogos 3D)
--  Ordem: capa (1ª, aparece na vitrine), depois 1 e 2.
--  As fotos ficam junto com o site, em assets/produtos/bingo-silabas/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/bingo-silabas/capa.jpg',
  'assets/produtos/bingo-silabas/1.jpg',
  'assets/produtos/bingo-silabas/2.jpg'
]
where name = 'Bingo das Sílabas';
