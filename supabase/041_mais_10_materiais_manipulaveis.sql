-- =====================================================================
--  +10 produtos (lote 3) na categoria "Materiais Manipuláveis"
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
--
--  • Pode rodar de novo sem duplicar: só insere o que ainda não existe (pelo nome).
--  • Preços são SUGESTÕES — ajuste no painel (Minha conta > Produtos > ✏️).
--  • Sem fotos ainda: aparecem com a ilustração colorida até você enviar as fotos.
-- =====================================================================
insert into public.products
  (name, description, category_id, price, old_price, color, icon, tags, ages,
   variants, options, sold, personalizable, active, sort_order)
select
  v.name, v.description, 'materiais-manipulaveis',
  (select min((x->>'price')::numeric) from jsonb_array_elements(v.variants) x),
  (select (x->>'old_price')::numeric from jsonb_array_elements(v.variants) x
     order by (x->>'price')::numeric limit 1),
  v.color, v.icon, v.tags, v.ages,
  v.variants,
  array(select x->>'label' from jsonb_array_elements(v.variants) x),
  0, false, true, 30
from (values
  ('Quadro dos 100 - Tabuleiro de Encaixe',
   'Tabuleiro com 100 casas e plaquinhas numeradas de 1 a 100 para encaixar.

Ajuda a enxergar a sequência numérica, contar de 2 em 2, de 5 em 5, de 10 em 10 e descobrir padrões.',
   'blue', 'puzzle', array['lancamentos'], '5+',
   '[{"label":"1 unidade","price":89.90,"old_price":null},{"label":"Kit com 2","price":169.90,"old_price":179.80}]'::jsonb),

  ('Relógio de Ponteiros Manipulável',
   'Relógio com ponteiros que giram e números destacáveis de 1 a 12.

Para aprender as horas, os minutos e a rotina do dia de forma concreta.',
   'orange', 'star', array['queridinhos'], '6+',
   '[{"label":"1 unidade","price":49.90,"old_price":null},{"label":"Kit com 3","price":134.90,"old_price":149.70}]'::jsonb),

  ('Balança de Equilíbrio Numérica',
   'Balança com pesinhos numerados para pendurar dos dois lados.

A criança descobre que 3 + 4 equilibra com 7 e entende a ideia de igualdade brincando.',
   'purple', 'trophy', array['lancamentos'], '5+',
   '[{"label":"1 unidade","price":79.90,"old_price":null},{"label":"Kit com 2","price":149.90,"old_price":159.80}]'::jsonb),

  ('Frações em Círculos - Encaixe',
   'Círculos coloridos divididos em inteiro, metades, terços, quartos, sextos e oitavos.

Para montar, comparar e somar frações vendo cada pedaço na mão.',
   'rose', 'puzzle', array[]::text[], '7+',
   '[{"label":"1 conjunto","price":64.90,"old_price":null},{"label":"Kit com 3","price":174.90,"old_price":194.70}]'::jsonb),

  ('Formas Geométricas de Encaixe - Prancha',
   'Prancha com círculo, quadrado, triângulo, retângulo, estrela e outras formas para encaixar.

Trabalha reconhecimento de formas, cores e coordenação motora.',
   'green', 'cube', array['queridinhos'], '2+',
   '[{"label":"1 unidade","price":42.90,"old_price":null},{"label":"Kit com 3","price":114.90,"old_price":128.70}]'::jsonb),

  ('Alinhavo de Números - 0 a 9',
   'Números vazados com furinhos e cordões coloridos para alinhavar.

Desenvolve a coordenação motora fina enquanto a criança conhece os números.',
   'yellow', 'pencil', array[]::text[], '3+',
   '[{"label":"1 conjunto","price":39.90,"old_price":null},{"label":"Kit com 3","price":104.90,"old_price":119.70}]'::jsonb),

  ('Silabário Giratório',
   'Cilindros com sílabas que giram para formar palavras diferentes.

Gire, leia e descubra novas palavras — ótimo para a fase de alfabetização.',
   'magenta', 'book', array['lancamentos'], '5+',
   '[{"label":"1 unidade","price":54.90,"old_price":null},{"label":"Kit com 3","price":149.90,"old_price":164.70}]'::jsonb),

  ('Cubos de Contagem com Pontos',
   'Cubinhos com pontos de 1 a 6 e números para associar quantidade e numeral.

Para jogos de rolar, contar, somar e comparar quantidades.',
   'cyan', 'cube', array[]::text[], '4+',
   '[{"label":"Kit com 4","price":34.90,"old_price":null},{"label":"Kit com 8","price":64.90,"old_price":69.80}]'::jsonb),

  ('Trilha Numérica de 1 a 30',
   'Trilha com casas numeradas, peões coloridos e dado para jogar.

Trabalha contagem, sequência numérica, esperar a vez e brincar em grupo.',
   'orange', 'flag', array['queridinhos'], '4+',
   '[{"label":"1 unidade","price":59.90,"old_price":null},{"label":"Kit com 2","price":109.90,"old_price":119.80}]'::jsonb),

  ('Cartões de Padrões com Pecinhas',
   'Cartões com sequências de cores e formas e pecinhas para completar o padrão.

Desenvolve raciocínio lógico, atenção e percepção visual.',
   'purple', 'star', array['lancamentos'], '3+',
   '[{"label":"1 conjunto","price":46.90,"old_price":null},{"label":"Kit com 3","price":124.90,"old_price":140.70}]'::jsonb)
) as v(name, description, color, icon, tags, ages, variants)
where not exists (select 1 from public.products p where p.name = v.name);

-- Conferência: quantos produtos ficaram na categoria
select count(*) as total_materiais_manipulaveis
from public.products where category_id = 'materiais-manipulaveis' and active;
