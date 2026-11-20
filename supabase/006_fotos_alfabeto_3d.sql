-- =====================================================================
--  Fotos do produto "Alfabeto 3D Colorido - Kit A a Z"
--  Ordem: capa (1ª, aparece na vitrine), depois 1, 2 e 3.
--  As fotos ficam junto com o site, em assets/produtos/alfabeto-3d/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/alfabeto-3d/capa.jpg',
  'assets/produtos/alfabeto-3d/1.jpg',
  'assets/produtos/alfabeto-3d/2.jpg',
  'assets/produtos/alfabeto-3d/3.jpg'
]
where name = 'Alfabeto 3D Colorido - Kit A a Z';
