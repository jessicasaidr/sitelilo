-- =====================================================================
--  Fotos do produto "Marcador de Página Clip - Letras (10 unds.)"
--  Ordem: capa (1ª, aparece na vitrine), depois 1 e 2.
--  As fotos ficam junto com o site, em assets/produtos/marcador-clip/
--  Supabase > SQL Editor > New query > cole e clique em Run.
-- =====================================================================
update public.products
set images = array[
  'assets/produtos/marcador-clip/capa.jpg',
  'assets/produtos/marcador-clip/1.jpg',
  'assets/produtos/marcador-clip/2.jpg'
]
where name = 'Marcador de Página Clip - Letras (10 unds.)';
