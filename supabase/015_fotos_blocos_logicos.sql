-- =====================================================================
--  Fotos do produto "Blocos Lógicos - 48 Peças"
--  Ordem: capa (1ª, aparece na vitrine), depois 1, 2, 3, 4 e 5.
--  As fotos ficam junto com o site, em assets/produtos/blocos-logicos/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/blocos-logicos/capa.jpg',
  'assets/produtos/blocos-logicos/1.jpg',
  'assets/produtos/blocos-logicos/2.jpg',
  'assets/produtos/blocos-logicos/3.jpg',
  'assets/produtos/blocos-logicos/4.jpg',
  'assets/produtos/blocos-logicos/5.jpg'
]
where name = 'Blocos Lógicos - 48 Peças';
