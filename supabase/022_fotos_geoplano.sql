-- =====================================================================
--  Fotos do produto "Geoplano com Elásticos"
--  Ordem: capa (1ª, aparece na vitrine), depois 1, 2, 3 e 4.
--  As fotos ficam junto com o site, em assets/produtos/geoplano/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/geoplano/capa.jpg',
  'assets/produtos/geoplano/1.jpg',
  'assets/produtos/geoplano/2.jpg',
  'assets/produtos/geoplano/3.jpg',
  'assets/produtos/geoplano/4.jpg'
]
where name = 'Geoplano com Elásticos';
