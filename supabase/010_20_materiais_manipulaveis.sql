-- =====================================================================
--  +20 produtos na categoria "Materiais Manipuláveis"
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
--
--  • Pode rodar de novo sem duplicar: só insere o que ainda não existe (pelo nome).
--  • Preços são SUGESTÕES — ajuste no painel (Minha conta > Produtos > ✏️).
--  • Sem fotos ainda: aparecem com a ilustração colorida até você enviar as fotos.
--  • "vendidos" começa em 0 (não aparece na página do produto).
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
  0, false, true, 10
from (values
  ('Ábaco de Contagem - 10 Fileiras',
   'Ábaco colorido com 10 fileiras de 10 contas para contar, somar e subtrair de forma visual.

Ajuda a criança a entender quantidades, dezenas e o sistema decimal brincando.',
   'yellow', 'star', array['lancamentos'], '3+',
   '[{"label":"1 unidade","price":59.90,"old_price":null},{"label":"Kit com 3","price":159.90,"old_price":179.70}]'::jsonb),

  ('Blocos Lógicos - 48 Peças',
   'Conjunto clássico com 48 peças em 4 formas, 3 cores, 2 tamanhos e 2 espessuras.

Perfeito para classificação, seriação, sequências e raciocínio lógico-matemático.',
   'blue', 'puzzle', array['queridinhos'], '3+',
   '[{"label":"1 conjunto","price":89.90,"old_price":null},{"label":"Kit com 3","price":239.90,"old_price":269.70}]'::jsonb),

  ('Tangram Colorido - 7 Peças',
   'O quebra-cabeça chinês de 7 peças para montar centenas de figuras.

Desenvolve percepção espacial, geometria e concentração. Acompanha cartões de desafios.',
   'magenta', 'puzzle', array['promo'], '4+',
   '[{"label":"1 unidade","price":29.90,"old_price":39.90},{"label":"Kit com 5","price":129.90,"old_price":199.50}]'::jsonb),

  ('Cubos de Encaixe Multilink - 100 Peças',
   '100 cubinhos coloridos que encaixam por todos os lados.

Ideais para contagem, padrões, medidas, volume e construção de gráficos com as mãos.',
   'cyan', 'cube', array['queridinhos','lancamentos'], '3+',
   '[{"label":"100 peças","price":79.90,"old_price":null},{"label":"200 peças","price":149.90,"old_price":159.80}]'::jsonb),

  ('Escala Cuisenaire - Barras Numéricas',
   'Barras coloridas de 1 a 10 unidades, cada número com sua cor.

Trabalha comparação, composição e decomposição de números, frações e operações.',
   'orange', 'trophy', array[]::text[], '4+',
   '[{"label":"1 conjunto","price":69.90,"old_price":null},{"label":"Kit com 3","price":189.90,"old_price":209.70}]'::jsonb),

  ('Círculos de Frações - 9 Discos',
   'Discos coloridos divididos de 1 inteiro até 1/10.

Torna as frações concretas: a criança compara, soma e encontra equivalências encaixando as partes.',
   'rose', 'star', array['lancamentos'], '7+',
   '[{"label":"1 conjunto","price":64.90,"old_price":null},{"label":"Kit com 3","price":174.90,"old_price":194.70}]'::jsonb),

  ('Geoplano com Elásticos',
   'Base com pinos para formar figuras com elásticos coloridos.

Explora formas geométricas, perímetro, área e simetria. Acompanha elásticos e fichas de modelos.',
   'green', 'flag', array[]::text[], '5+',
   '[{"label":"1 unidade","price":49.90,"old_price":null},{"label":"Kit com 5","price":219.90,"old_price":249.50}]'::jsonb),

  ('Torre de Hanói - 5 Discos',
   'Desafio clássico: levar todos os discos para outra haste, sem colocar um maior sobre um menor.

Estimula planejamento, paciência e resolução de problemas.',
   'indigo', 'trophy', array['promo'], '5+',
   '[{"label":"1 unidade","price":44.90,"old_price":54.90},{"label":"Kit com 3","price":119.90,"old_price":164.70}]'::jsonb),

  ('Sólidos Geométricos - 10 Peças',
   'Cubo, esfera, cilindro, cone, pirâmides e prismas para pegar, comparar e explorar.

Ajuda a reconhecer faces, arestas e vértices de forma concreta.',
   'purple', 'cube', array[]::text[], '5+',
   '[{"label":"1 conjunto","price":74.90,"old_price":null},{"label":"Kit com 3","price":199.90,"old_price":224.70}]'::jsonb),

  ('Dominó de Adição',
   'Dominó em que cada peça liga uma conta ao seu resultado.

Fixa as somas de forma divertida, sozinho ou em grupo.',
   'yellow', 'users', array['queridinhos'], '6+',
   '[{"label":"1 jogo","price":34.90,"old_price":null},{"label":"Kit com 3","price":94.90,"old_price":104.70}]'::jsonb),

  ('Relógio Pedagógico de Encaixe',
   'Relógio com ponteiros móveis e números de encaixe.

Ensina horas e minutos, além de trabalhar a coordenação ao encaixar as peças.',
   'blue', 'star', array['lancamentos'], '5+',
   '[{"label":"1 unidade","price":54.90,"old_price":null},{"label":"Kit com 3","price":149.90,"old_price":164.70}]'::jsonb),

  ('Alfabeto Móvel - Letras de Encaixe',
   'Letras de encaixe em cores diferentes para vogais e consoantes.

Para formar palavras, nomes e sílabas, apoiando a alfabetização de forma manipulável.',
   'green', 'book', array['queridinhos'], '4+',
   '[{"label":"1 alfabeto","price":59.90,"old_price":null},{"label":"2 alfabetos","price":109.90,"old_price":119.80}]'::jsonb),

  ('Sílabas Móveis de Encaixe',
   'Peças com sílabas que encaixam para formar palavras.

Ajuda a criança a perceber a divisão silábica e a criar novas palavras.',
   'rose', 'book', array[]::text[], '5+',
   '[{"label":"1 conjunto","price":49.90,"old_price":null},{"label":"Kit com 3","price":134.90,"old_price":149.70}]'::jsonb),

  ('Contas de Alinhavo Geométricas',
   'Contas grandes em formas e cores variadas com cordões.

Trabalha coordenação motora fina, sequências e reconhecimento de formas e cores.',
   'orange', 'heart', array['promo'], '3+',
   '[{"label":"1 pote","price":39.90,"old_price":49.90},{"label":"Kit com 3","price":104.90,"old_price":149.70}]'::jsonb),

  ('Prancha de Alinhavo - Formas',
   'Prancha com furos e cordão para alinhavar contornos de figuras.

Desenvolve a pinça, a concentração e a coordenação olho-mão.',
   'cyan', 'pencil', array[]::text[], '3+',
   '[{"label":"1 unidade","price":24.90,"old_price":null},{"label":"Kit com 4","price":89.90,"old_price":99.60}]'::jsonb),

  ('Balança Numérica de Equilíbrio',
   'Balança com pesinhos numerados: a criança equilibra os dois lados para descobrir resultados.

Ensina igualdade, adição e o sentido do sinal de igual.',
   'indigo', 'trophy', array['lancamentos'], '5+',
   '[{"label":"1 unidade","price":89.90,"old_price":null},{"label":"Kit com 2","price":169.90,"old_price":179.80}]'::jsonb),

  ('Fichas Sobrepostas - Sistema de Numeração',
   'Fichas de unidades, dezenas e centenas que se sobrepõem para formar números.

Mostra visualmente o valor posicional de cada algarismo.',
   'purple', 'flag', array[]::text[], '6+',
   '[{"label":"1 conjunto","price":39.90,"old_price":null},{"label":"Kit com 3","price":104.90,"old_price":119.70}]'::jsonb),

  ('Quadro Valor-Lugar (U, D, C)',
   'Quadro com colunas de unidade, dezena e centena e peças para posicionar.

Apoia a compreensão do sistema decimal, trocas e reagrupamentos.',
   'blue', 'house', array[]::text[], '6+',
   '[{"label":"1 unidade","price":54.90,"old_price":null},{"label":"Kit com 3","price":149.90,"old_price":164.70}]'::jsonb),

  ('Pinos de Seriação - Cores e Tamanhos',
   'Base com pinos de alturas e cores diferentes para organizar em sequência.

Trabalha seriação, comparação de tamanhos e contagem.',
   'magenta', 'star', array['queridinhos'], '3+',
   '[{"label":"1 unidade","price":64.90,"old_price":null},{"label":"Kit com 3","price":174.90,"old_price":194.70}]'::jsonb),

  ('Pentaminós - 12 Peças',
   'As 12 figuras formadas por 5 quadradinhos, com tabuleiro e desafios.

Excelente para raciocínio espacial, estratégia e noção de área.',
   'green', 'puzzle', array['promo'], '6+',
   '[{"label":"1 unidade","price":39.90,"old_price":49.90},{"label":"Kit com 3","price":99.90,"old_price":149.70}]'::jsonb)
) as v(name, description, color, icon, tags, ages, variants)
where not exists (select 1 from public.products p where p.name = v.name);

-- Conferência: deve mostrar 25 produtos na categoria
select count(*) as total_materiais_manipulaveis
from public.products where category_id = 'materiais-manipulaveis';
