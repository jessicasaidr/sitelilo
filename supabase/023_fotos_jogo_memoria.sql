-- =====================================================================
--  Fotos do produto "Jogo da Memória Turma da Lilo" (Jogos 3D)
--  Ordem: capa (1ª, aparece na vitrine), depois 1, 2 e 3.
--  As fotos ficam junto com o site, em assets/produtos/jogo-memoria/
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/jogo-memoria/capa.jpg',
  'assets/produtos/jogo-memoria/1.jpg',
  'assets/produtos/jogo-memoria/2.jpg',
  'assets/produtos/jogo-memoria/3.jpg'
]
where name = 'Jogo da Memória Turma da Lilo';
