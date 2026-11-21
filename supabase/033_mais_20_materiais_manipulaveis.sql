-- =====================================================================
--  +20 produtos (lote 2) na categoria "Materiais Manipuláveis"
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
  0, false, true, 20
from (values
  ('Reta Numérica Manipulável - 0 a 20',
   'Reta numérica com marcador deslizante e fichas de 0 a 20.

Ajuda a visualizar antecessor, sucessor, contagem para frente e para trás, adição e subtração.',
   'blue', 'flag', array['lancamentos'], '5+',
   '[{"label":"1 unidade","price":44.90,"old_price":null},{"label":"Kit com 3","price":119.90,"old_price":134.70}]'::jsonb),

  ('Barras de Frações Empilháveis',
   'Barras coloridas do inteiro até 1/12 que se encaixam umas sobre as outras.

Comparar, somar e encontrar frações equivalentes fica concreto e visual.',
   'orange', 'trophy', array[]::text[], '7+',
   '[{"label":"1 conjunto","price":79.90,"old_price":null},{"label":"Kit com 3","price":214.90,"old_price":239.70}]'::jsonb),

  ('Quebra-Cabeça de Frações - Pizza',
   'Pizzas divididas em fatias (1/2, 1/3, 1/4, 1/6 e 1/8) para montar e comparar.

Uma forma divertida e saborosa de começar o estudo das frações.',
   'rose', 'puzzle', array['queridinhos'], '6+',
   '[{"label":"1 unidade","price":49.90,"old_price":null},{"label":"Kit com 3","price":134.90,"old_price":149.70}]'::jsonb),

  ('Roda da Multiplicação - Tabuada Manipulável',
   'Disco giratório com a tabuada do 1 ao 10.

A criança gira, descobre o resultado e confere — ótimo para memorizar brincando.',
   'indigo', 'star', array['lancamentos'], '7+',
   '[{"label":"1 unidade","price":39.90,"old_price":null},{"label":"Kit com 3","price":104.90,"old_price":119.70}]'::jsonb),

  ('Dados Numéricos e de Pontos - Kit com 6',
   'Dados com pontos, números e sinais de operação.

Para jogos de contagem, somas rápidas, comparação e criação de contas.',
   'yellow', 'cube', array['promo'], '4+',
   '[{"label":"Kit com 6","price":29.90,"old_price":39.90},{"label":"Kit com 12","price":54.90,"old_price":79.80}]'::jsonb),

  ('Sequência Lógica - Formas e Cores',
   'Peças de formas e cores com cartelas de sequências para completar.

Desenvolve atenção, padrões e raciocínio lógico.',
   'purple', 'puzzle', array[]::text[], '3+',
   '[{"label":"1 conjunto","price":54.90,"old_price":null},{"label":"Kit com 3","price":149.90,"old_price":164.70}]'::jsonb),

  ('Quebra-Cabeça Numérico - 1 a 10',
   'Cada número se encaixa na peça com a quantidade correspondente.

Relaciona número e quantidade com autocorreção: só encaixa o par certo.',
   'green', 'puzzle', array['queridinhos'], '3+',
   '[{"label":"1 unidade","price":39.90,"old_price":null},{"label":"Kit com 3","price":104.90,"old_price":119.70}]'::jsonb),

  ('Prancha de Encaixe - Formas Geométricas',
   'Prancha com encaixes de círculo, quadrado, triângulo, estrela e outras formas.

Trabalha reconhecimento de formas, coordenação e percepção visual.',
   'cyan', 'house', array[]::text[], '2+',
   '[{"label":"1 unidade","price":49.90,"old_price":null},{"label":"Kit com 3","price":134.90,"old_price":149.70}]'::jsonb),

  ('Mosaico Geométrico - 120 Peças',
   'Peças geométricas coloridas com cartões de modelos para reproduzir e criar.

Estimula criatividade, simetria e noção espacial.',
   'magenta', 'star', array['lancamentos'], '4+',
   '[{"label":"120 peças","price":69.90,"old_price":null},{"label":"240 peças","price":129.90,"old_price":139.80}]'::jsonb),

  ('Pareamento Letra Inicial e Figura',
   'Peças com letras e figuras para ligar cada imagem à sua letra inicial.

Apoia a consciência fonológica e o início da alfabetização.',
   'orange', 'book', array[]::text[], '4+',
   '[{"label":"1 conjunto","price":44.90,"old_price":null},{"label":"Kit com 3","price":119.90,"old_price":134.70}]'::jsonb),

  ('Rimas Manipuláveis - Pares de Figuras',
   'Pares de figuras que rimam (gato/pato, mão/pão…) para encontrar e encaixar.

Desenvolve a escuta das palavras de forma lúdica.',
   'rose', 'heart', array['queridinhos'], '4+',
   '[{"label":"1 conjunto","price":39.90,"old_price":null},{"label":"Kit com 3","price":104.90,"old_price":119.70}]'::jsonb),

  ('Jogo de Atenção Visual - Letras',
   'Tabuleiro com letras e fichas para encontrar o mais rápido possível.

Treina atenção, memória visual e reconhecimento das letras.',
   'yellow', 'users', array[]::text[], '5+',
   '[{"label":"1 jogo","price":49.90,"old_price":null},{"label":"Kit com 3","price":134.90,"old_price":149.70}]'::jsonb),

  ('Régua de Medidas Manipulável',
   'Peças encaixáveis de 1 a 10 cm para medir objetos e comparar tamanhos.

Introduz a medida de comprimento de forma concreta.',
   'blue', 'pencil', array[]::text[], '6+',
   '[{"label":"1 conjunto","price":34.90,"old_price":null},{"label":"Kit com 3","price":89.90,"old_price":104.70}]'::jsonb),

  ('Calendário Interativo de Encaixe',
   'Base com peças de dias da semana, meses, datas e clima para atualizar todo dia.

Organiza a rotina e ensina noções de tempo.',
   'green', 'house', array['lancamentos'], '4+',
   '[{"label":"1 unidade","price":89.90,"old_price":null},{"label":"Kit com 2","price":169.90,"old_price":179.80}]'::jsonb),

  ('Vogais Móveis em Relevo',
   'Vogais grandes em relevo, em cores diferentes, para tocar, traçar e montar.

Primeiro passo da alfabetização com estímulo tátil.',
   'magenta', 'book', array[]::text[], '3+',
   '[{"label":"1 conjunto","price":29.90,"old_price":null},{"label":"Kit com 3","price":79.90,"old_price":89.70}]'::jsonb),

  ('Numerais em Relevo para Traçado - 0 a 9',
   'Números em relevo com seta de direção para passar o dedo e aprender o traçado.

Une estímulo sensorial e escrita correta dos numerais.',
   'cyan', 'pencil', array['promo'], '3+',
   '[{"label":"1 conjunto","price":34.90,"old_price":44.90},{"label":"Kit com 3","price":89.90,"old_price":134.70}]'::jsonb),

  ('Letras em Relevo para Traçado - A a Z',
   'Alfabeto em relevo com indicação do traçado de cada letra.

Ajuda a fixar a forma das letras pelo toque antes de escrever no papel.',
   'indigo', 'pencil', array[]::text[], '4+',
   '[{"label":"1 alfabeto","price":59.90,"old_price":null},{"label":"Kit com 2","price":109.90,"old_price":119.80}]'::jsonb),

  ('Cubos de Sílabas - Kit com 6',
   'Cubos com sílabas em todas as faces: role, junte e descubra palavras.

Jogo rápido para leitura e formação de palavras.',
   'purple', 'cube', array['queridinhos'], '5+',
   '[{"label":"Kit com 6","price":39.90,"old_price":null},{"label":"Kit com 12","price":74.90,"old_price":79.80}]'::jsonb),

  ('Contadores Animais - 60 Peças',
   'Bichinhos coloridos para contar, separar por cor, tamanho e espécie.

Ideais para quantidade, classificação, padrões e histórias.',
   'green', 'heart', array['lancamentos'], '3+',
   '[{"label":"60 peças","price":54.90,"old_price":null},{"label":"120 peças","price":99.90,"old_price":109.80}]'::jsonb),

  ('Torre de Empilhar Numerada - 1 a 10',
   'Peças numeradas de tamanhos diferentes para empilhar em ordem.

Trabalha sequência numérica, seriação por tamanho e coordenação.',
   'orange', 'trophy', array[]::text[], '2+',
   '[{"label":"1 unidade","price":44.90,"old_price":null},{"label":"Kit com 3","price":119.90,"old_price":134.70}]'::jsonb)
) as v(name, description, color, icon, tags, ages, variants)
where not exists (select 1 from public.products p where p.name = v.name);

-- Conferência: quantos produtos ficaram na categoria
select count(*) as total_materiais_manipulaveis
from public.products where category_id = 'materiais-manipulaveis';
