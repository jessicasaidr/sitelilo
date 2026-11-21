-- =====================================================================
--  Fotos do produto "Dominó de Adição"
--  Ordem: capa (1ª, aparece na vitrine), depois 1, 2, 3, 4 e 5.
--  As fotos ficam junto com o site, em assets/produtos/domino-adicao/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/domino-adicao/capa.jpg',
  'assets/produtos/domino-adicao/1.jpg',
  'assets/produtos/domino-adicao/2.jpg',
  'assets/produtos/domino-adicao/3.jpg',
  'assets/produtos/domino-adicao/4.jpg',
  'assets/produtos/domino-adicao/5.jpg'
]
where name = 'Dominó de Adição';
