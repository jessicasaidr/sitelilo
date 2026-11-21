-- =====================================================================
--  Fotos do produto "Relógio Pedagógico de Encaixe"
--  Ordem: capa (1ª, aparece na vitrine), depois 1, 2 e 3.
--  As fotos ficam junto com o site, em assets/produtos/relogio-pedagogico/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/relogio-pedagogico/capa.jpg',
  'assets/produtos/relogio-pedagogico/1.jpg',
  'assets/produtos/relogio-pedagogico/2.jpg',
  'assets/produtos/relogio-pedagogico/3.jpg'
]
where name = 'Relógio Pedagógico de Encaixe';
