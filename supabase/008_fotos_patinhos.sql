-- =====================================================================
--  Fotos do produto "Patinhos de Borracha 3D - Kit Contagem"
--  Ordem: capa (1ª, aparece na vitrine), depois 1, 2 e 3.
--  As fotos ficam junto com o site, em assets/produtos/patinhos/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/patinhos/capa.jpg',
  'assets/produtos/patinhos/1.jpg',
  'assets/produtos/patinhos/2.jpg',
  'assets/produtos/patinhos/3.jpg'
]
where name = 'Patinhos de Borracha 3D - Kit Contagem';
