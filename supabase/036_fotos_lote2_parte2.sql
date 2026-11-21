-- =====================================================================
--  Fotos de 5 produtos do lote 2 (capa primeiro)
--   • Sequência Lógica - Formas e Cores         -> assets/produtos/sequencia-logica/
--   • Vogais Móveis em Relevo                   -> assets/produtos/vogais-relevo/
--   • Dados Numéricos e de Pontos - Kit com 6   -> assets/produtos/dados-numericos/
--   • Prancha de Encaixe - Formas Geométricas   -> assets/produtos/prancha-encaixe/
--   • Contadores Animais - 60 Peças             -> assets/produtos/contadores-animais/
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/sequencia-logica/capa.jpg',
  'assets/produtos/sequencia-logica/1.jpg',
  'assets/produtos/sequencia-logica/2.jpg'
]
where name = 'Sequência Lógica - Formas e Cores';

update public.products
set images = array[
  'assets/produtos/vogais-relevo/capa.jpg',
  'assets/produtos/vogais-relevo/1.jpg',
  'assets/produtos/vogais-relevo/2.jpg',
  'assets/produtos/vogais-relevo/3.jpg'
]
where name = 'Vogais Móveis em Relevo';

update public.products
set images = array[
  'assets/produtos/dados-numericos/capa.jpg',
  'assets/produtos/dados-numericos/1.jpg',
  'assets/produtos/dados-numericos/2.jpg'
]
where name = 'Dados Numéricos e de Pontos - Kit com 6';

update public.products
set images = array[
  'assets/produtos/prancha-encaixe/capa.jpg',
  'assets/produtos/prancha-encaixe/1.jpg',
  'assets/produtos/prancha-encaixe/2.jpg'
]
where name = 'Prancha de Encaixe - Formas Geométricas';

update public.products
set images = array[
  'assets/produtos/contadores-animais/capa.jpg',
  'assets/produtos/contadores-animais/1.jpg',
  'assets/produtos/contadores-animais/2.jpg'
]
where name = 'Contadores Animais - 60 Peças';
