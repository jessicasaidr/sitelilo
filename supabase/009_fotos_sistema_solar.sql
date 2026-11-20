-- =====================================================================
--  Fotos do produto "Quebra-Cabeça Sistema Solar 3D"
--  Ordem: capa (1ª, aparece na vitrine), depois 1, 2 e 3.
--  As fotos ficam junto com o site, em assets/produtos/sistema-solar/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/sistema-solar/capa.jpg',
  'assets/produtos/sistema-solar/1.jpg',
  'assets/produtos/sistema-solar/2.jpg',
  'assets/produtos/sistema-solar/3.jpg'
]
where name = 'Quebra-Cabeça Sistema Solar 3D';
