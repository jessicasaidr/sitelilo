-- =====================================================================
--  Fotos do produto "Quadro Valor-Lugar (U, D, C)"
--  Ordem: capa (1ª, aparece na vitrine), depois 1, 2, 3, 4 e 5.
--  As fotos ficam junto com o site, em assets/produtos/quadro-valor-lugar/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/quadro-valor-lugar/capa.jpg',
  'assets/produtos/quadro-valor-lugar/1.jpg',
  'assets/produtos/quadro-valor-lugar/2.jpg',
  'assets/produtos/quadro-valor-lugar/3.jpg',
  'assets/produtos/quadro-valor-lugar/4.jpg',
  'assets/produtos/quadro-valor-lugar/5.jpg'
]
where name = 'Quadro Valor-Lugar (U, D, C)';
