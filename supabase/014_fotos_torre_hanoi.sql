-- =====================================================================
--  Fotos do produto "Torre de Hanói - 5 Discos"
--  Ordem: capa (1ª, aparece na vitrine), depois 1 a 9.
--  As fotos ficam junto com o site, em assets/produtos/torre-hanoi/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/torre-hanoi/capa.jpg',
  'assets/produtos/torre-hanoi/1.jpg',
  'assets/produtos/torre-hanoi/2.jpg',
  'assets/produtos/torre-hanoi/3.jpg',
  'assets/produtos/torre-hanoi/4.jpg',
  'assets/produtos/torre-hanoi/5.jpg',
  'assets/produtos/torre-hanoi/6.jpg',
  'assets/produtos/torre-hanoi/7.jpg',
  'assets/produtos/torre-hanoi/8.jpg',
  'assets/produtos/torre-hanoi/9.jpg'
]
where name = 'Torre de Hanói - 5 Discos';
