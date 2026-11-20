-- =====================================================================
--  Fotos do produto "Contas de Alinhavo Geométricas"
--  Ordem: capa (1ª, aparece na vitrine), depois 1 e 2.
--  As fotos ficam junto com o site, em assets/produtos/contas-alinhavo/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/contas-alinhavo/capa.jpg',
  'assets/produtos/contas-alinhavo/1.jpg',
  'assets/produtos/contas-alinhavo/2.jpg'
]
where name = 'Contas de Alinhavo Geométricas';
