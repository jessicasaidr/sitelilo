-- =====================================================================
--  Fotos das pastas 38 a 50 (capa primeiro)
--  • 11 produtos do lote 2 recebem as fotos
--  • Pastas 43 e 49 tinham o mesmo produto de outra pasta (42 e 48),
--    então viram 2 PRODUTOS NOVOS (já com as fotos).
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products p
set images = v.imgs
from (values
  ('Torre de Empilhar Numerada - 1 a 10',       'torre-empilhar',     3),  -- pasta 38
  ('Régua de Medidas Manipulável',              'regua-medidas',      2),  -- pasta 39
  ('Calendário Interativo de Encaixe',          'calendario-encaixe', 2),  -- pasta 40
  ('Jogo de Atenção Visual - Letras',           'atencao-visual',     4),  -- pasta 41
  ('Rimas Manipuláveis - Pares de Figuras',     'rimas',              2),  -- pasta 42
  ('Numerais em Relevo para Traçado - 0 a 9',   'numerais-relevo',    2),  -- pasta 44
  ('Quebra-Cabeça de Frações - Pizza',          'fracoes-pizza',      3),  -- pasta 45
  ('Mosaico Geométrico - 120 Peças',            'mosaico-geometrico', 2),  -- pasta 46
  ('Cubos de Sílabas - Kit com 6',              'cubos-silabas',      3),  -- pasta 47
  ('Reta Numérica Manipulável - 0 a 20',        'reta-numerica',      3),  -- pasta 48
  ('Pareamento Letra Inicial e Figura',         'pareamento-letra',   2)   -- pasta 50
) as t(nome, pasta, n)
cross join lateral (
  select array['assets/produtos/' || t.pasta || '/capa.jpg'] ||
         array(select 'assets/produtos/' || t.pasta || '/' || g || '.jpg' from generate_series(1, t.n) g) as imgs
) v
where p.name = t.nome;

-- 2 produtos novos (pastas 43 e 49) — preços são sugestões, ajuste no painel
insert into public.products
  (name, description, category_id, price, old_price, color, icon, tags, ages,
   variants, options, sold, personalizable, active, sort_order, images)
select
  v.name, v.description, 'materiais-manipulaveis',
  (select min((x->>'price')::numeric) from jsonb_array_elements(v.variants) x),
  (select (x->>'old_price')::numeric from jsonb_array_elements(v.variants) x
     order by (x->>'price')::numeric limit 1),
  v.color, v.icon, array['lancamentos'], v.ages,
  v.variants,
  array(select x->>'label' from jsonb_array_elements(v.variants) x),
  0, false, true, 20, v.images
from (values
  ('Letras Minúsculas Vazadas - a a z',
   'Letras minúsculas vazadas em preto e amarelo para manusear e reconhecer.

Para formar palavras, separar vogais e consoantes e treinar o traçado contornando a letra.',
   'yellow', 'pencil', '4+',
   '[{"label":"1 conjunto","price":44.90,"old_price":null},{"label":"Kit com 3","price":119.90,"old_price":134.70}]'::jsonb,
   array['assets/produtos/rimas-2/capa.jpg','assets/produtos/rimas-2/1.jpg','assets/produtos/rimas-2/2.jpg']),

  ('Sinalizadores Certo, Errado e Stop',
   'Três sinalizadores de mão: certo (verde), errado (vermelho) e STOP.

Ótimos para jogos de perguntas e respostas, combinados de sala e brincadeiras de atenção.',
   'rose', 'star', '3+',
   '[{"label":"1 conjunto","price":34.90,"old_price":null},{"label":"Kit com 3","price":94.90,"old_price":104.70}]'::jsonb,
   array['assets/produtos/reta-numerica-2/capa.jpg','assets/produtos/reta-numerica-2/1.jpg','assets/produtos/reta-numerica-2/2.jpg'])
) as v(name, description, color, icon, ages, variants, images)
where not exists (select 1 from public.products p where p.name = v.name);

-- Conferência
select id, name, array_length(images, 1) as fotos
from public.products
where category_id = 'materiais-manipulaveis' and id >= 34
order by id;
