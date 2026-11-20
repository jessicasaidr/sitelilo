-- =====================================================================
--  Fotos do produto "Círculos de Frações - 9 Discos"
--  Ordem: capa (1ª, aparece na vitrine), depois 1 e 2.
--  As fotos ficam junto com o site, em assets/produtos/circulos-fracoes/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/circulos-fracoes/capa.jpg',
  'assets/produtos/circulos-fracoes/1.jpg',
  'assets/produtos/circulos-fracoes/2.jpg'
]
where name = 'Círculos de Frações - 9 Discos';
