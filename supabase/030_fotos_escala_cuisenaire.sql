-- =====================================================================
--  Fotos do produto "Escala Cuisenaire - Barras Numéricas"
--  Ordem: capa (1ª, aparece na vitrine), depois 1 e 2.
--  As fotos ficam junto com o site, em assets/produtos/escala-cuisenaire/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/escala-cuisenaire/capa.jpg',
  'assets/produtos/escala-cuisenaire/1.jpg',
  'assets/produtos/escala-cuisenaire/2.jpg'
]
where name = 'Escala Cuisenaire - Barras Numéricas';
