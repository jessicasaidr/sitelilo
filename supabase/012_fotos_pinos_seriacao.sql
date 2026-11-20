-- =====================================================================
--  Fotos do produto "Pinos de Seriação - Cores e Tamanhos"
--  Ordem: capa (1ª, aparece na vitrine), depois 1, 2 e 3.
--  As fotos ficam junto com o site, em assets/produtos/pinos-seriacao/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/pinos-seriacao/capa.jpg',
  'assets/produtos/pinos-seriacao/1.jpg',
  'assets/produtos/pinos-seriacao/2.jpg',
  'assets/produtos/pinos-seriacao/3.jpg'
]
where name = 'Pinos de Seriação - Cores e Tamanhos';
