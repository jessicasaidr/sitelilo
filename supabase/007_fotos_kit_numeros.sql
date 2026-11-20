-- =====================================================================
--  Fotos do produto "Kit Números 0 a 9 com Peças de Encaixe"
--  Ordem: capa (1ª, aparece na vitrine), depois 1, 2, 3 e 4.
--  As fotos ficam junto com o site, em assets/produtos/kit-numeros/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/kit-numeros/capa.jpg',
  'assets/produtos/kit-numeros/1.jpg',
  'assets/produtos/kit-numeros/2.jpg',
  'assets/produtos/kit-numeros/3.jpg',
  'assets/produtos/kit-numeros/4.jpg'
]
where name = 'Kit Números 0 a 9 com Peças de Encaixe';
