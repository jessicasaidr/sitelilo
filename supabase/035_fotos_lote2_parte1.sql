-- =====================================================================
--  Fotos de 4 produtos do lote 2 (capa primeiro)
--   • Quebra-Cabeça Numérico - 1 a 10          -> assets/produtos/quebra-cabeca-numerico/
--   • Barras de Frações Empilháveis            -> assets/produtos/barras-fracoes/
--   • Letras em Relevo para Traçado - A a Z    -> assets/produtos/letras-relevo/
--   • Roda da Multiplicação - Tabuada Manipulável -> assets/produtos/roda-multiplicacao/
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/quebra-cabeca-numerico/capa.jpg',
  'assets/produtos/quebra-cabeca-numerico/1.jpg',
  'assets/produtos/quebra-cabeca-numerico/2.jpg',
  'assets/produtos/quebra-cabeca-numerico/3.jpg'
]
where name = 'Quebra-Cabeça Numérico - 1 a 10';

update public.products
set images = array[
  'assets/produtos/barras-fracoes/capa.jpg',
  'assets/produtos/barras-fracoes/1.jpg',
  'assets/produtos/barras-fracoes/2.jpg'
]
where name = 'Barras de Frações Empilháveis';

update public.products
set images = array[
  'assets/produtos/letras-relevo/capa.jpg',
  'assets/produtos/letras-relevo/1.jpg',
  'assets/produtos/letras-relevo/2.jpg'
]
where name = 'Letras em Relevo para Traçado - A a Z';

update public.products
set images = array[
  'assets/produtos/roda-multiplicacao/capa.jpg',
  'assets/produtos/roda-multiplicacao/1.jpg',
  'assets/produtos/roda-multiplicacao/2.jpg'
]
where name = 'Roda da Multiplicação - Tabuada Manipulável';
