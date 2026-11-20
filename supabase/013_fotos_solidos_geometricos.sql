-- =====================================================================
--  Fotos do produto "Sólidos Geométricos - 10 Peças"
--  Ordem: capa (1ª, aparece na vitrine), depois 1, 2, 3 e 4.
--  As fotos ficam junto com o site, em assets/produtos/solidos-geometricos/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/solidos-geometricos/capa.jpg',
  'assets/produtos/solidos-geometricos/1.jpg',
  'assets/produtos/solidos-geometricos/2.jpg',
  'assets/produtos/solidos-geometricos/3.jpg',
  'assets/produtos/solidos-geometricos/4.jpg'
]
where name = 'Sólidos Geométricos - 10 Peças';
