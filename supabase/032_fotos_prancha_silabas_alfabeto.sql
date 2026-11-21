-- =====================================================================
--  Fotos de 3 produtos (capa primeiro, depois a foto 1)
--   • Prancha de Alinhavo - Formas        -> assets/produtos/prancha-alinhavo/
--   • Sílabas Móveis de Encaixe            -> assets/produtos/silabas-moveis/
--   • Alfabeto Móvel - Letras de Encaixe   -> assets/produtos/alfabeto-movel/
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/prancha-alinhavo/capa.jpg',
  'assets/produtos/prancha-alinhavo/1.jpg'
]
where name = 'Prancha de Alinhavo - Formas';

update public.products
set images = array[
  'assets/produtos/silabas-moveis/capa.jpg',
  'assets/produtos/silabas-moveis/1.jpg'
]
where name = 'Sílabas Móveis de Encaixe';

update public.products
set images = array[
  'assets/produtos/alfabeto-movel/capa.jpg',
  'assets/produtos/alfabeto-movel/1.jpg'
]
where name = 'Alfabeto Móvel - Letras de Encaixe';
