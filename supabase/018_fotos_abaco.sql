-- =====================================================================
--  Fotos do produto "Ábaco de Contagem - 10 Fileiras"
--  Ordem: capa (1ª, aparece na vitrine), depois 1 e 2.
--  As fotos ficam junto com o site, em assets/produtos/abaco/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/abaco/capa.jpg',
  'assets/produtos/abaco/1.jpg',
  'assets/produtos/abaco/2.jpg'
]
where name = 'Ábaco de Contagem - 10 Fileiras';
