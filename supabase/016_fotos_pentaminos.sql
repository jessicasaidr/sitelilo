-- =====================================================================
--  Fotos do produto "Pentaminós - 12 Peças"
--  Ordem: capa (1ª, aparece na vitrine), depois 1, 2, 3 e 4.
--  As fotos ficam junto com o site, em assets/produtos/pentaminos/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/pentaminos/capa.jpg',
  'assets/produtos/pentaminos/1.jpg',
  'assets/produtos/pentaminos/2.jpg',
  'assets/produtos/pentaminos/3.jpg',
  'assets/produtos/pentaminos/4.jpg'
]
where name = 'Pentaminós - 12 Peças';
