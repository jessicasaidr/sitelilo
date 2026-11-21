-- =====================================================================
--  Fotos do produto "Balança Numérica de Equilíbrio"
--  Ordem: capa (1ª, aparece na vitrine), depois 1 e 2.
--  As fotos ficam junto com o site, em assets/produtos/balanca-numerica/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/balanca-numerica/capa.jpg',
  'assets/produtos/balanca-numerica/1.jpg',
  'assets/produtos/balanca-numerica/2.jpg'
]
where name = 'Balança Numérica de Equilíbrio';
