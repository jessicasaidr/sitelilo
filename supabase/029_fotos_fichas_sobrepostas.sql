-- =====================================================================
--  Fotos do produto "Fichas Sobrepostas - Sistema de Numeração"
--  Ordem: capa (1ª, aparece na vitrine), depois 1 e 2.
--  As fotos ficam junto com o site, em assets/produtos/fichas-sobrepostas/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/fichas-sobrepostas/capa.jpg',
  'assets/produtos/fichas-sobrepostas/1.jpg',
  'assets/produtos/fichas-sobrepostas/2.jpg'
]
where name = 'Fichas Sobrepostas - Sistema de Numeração';
