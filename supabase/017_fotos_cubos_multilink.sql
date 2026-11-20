-- =====================================================================
--  Fotos do produto "Cubos de Encaixe Multilink - 100 Peças"
--  Ordem: capa (1ª, aparece na vitrine), depois 1, 2, 3 e 4.
--  As fotos ficam junto com o site, em assets/produtos/cubos-multilink/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/cubos-multilink/capa.jpg',
  'assets/produtos/cubos-multilink/1.jpg',
  'assets/produtos/cubos-multilink/2.jpg',
  'assets/produtos/cubos-multilink/3.jpg',
  'assets/produtos/cubos-multilink/4.jpg'
]
where name = 'Cubos de Encaixe Multilink - 100 Peças';
