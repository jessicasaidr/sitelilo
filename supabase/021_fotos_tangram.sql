-- =====================================================================
--  Fotos do produto "Tangram Colorido - 7 Peças"
--  Ordem: capa (1ª, aparece na vitrine), depois 1 e 2.
--  As fotos ficam junto com o site, em assets/produtos/tangram/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/tangram/capa.jpg',
  'assets/produtos/tangram/1.jpg',
  'assets/produtos/tangram/2.jpg'
]
where name = 'Tangram Colorido - 7 Peças';
