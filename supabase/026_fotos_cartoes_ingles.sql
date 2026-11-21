-- =====================================================================
--  Fotos do produto "Cartões de Inglês Ilustrados (50 cartas)" (Jogos 3D)
--  Ordem: capa (1ª, aparece na vitrine), depois 1, 2, 3 e 4.
--  As fotos ficam junto com o site, em assets/produtos/cartoes-ingles/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/cartoes-ingles/capa.jpg',
  'assets/produtos/cartoes-ingles/1.jpg',
  'assets/produtos/cartoes-ingles/2.jpg',
  'assets/produtos/cartoes-ingles/3.jpg',
  'assets/produtos/cartoes-ingles/4.jpg'
]
where name = 'Cartões de Inglês Ilustrados (50 cartas)';
