-- =====================================================================
--  Renomeia os 9 produtos do lote 2 (pastas 29 a 37) para combinar
--  com as FOTOS (nome + descrição). Fotos, preços, opções e categoria
--  NÃO mudam.
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
--
--  Pode rodar de novo sem problema: só altera quem ainda tem o nome antigo.
-- =====================================================================
update public.products p
set name = v.novo,
    description = v.descricao
from (values
  ('Quebra-Cabeça Numérico - 1 a 10',
   'Dados de Letras - Formando Palavras',
   'Dadinhos com letras em todas as faces para rolar e formar palavras.

Acompanha cartões ilustrados (como LUA) para montar a palavra da figura.'),

  ('Barras de Frações Empilháveis',
   'Discos Numéricos com Sinais - Operações',
   'Discos com números de 0 a 9 e sinais de mais, menos, vezes e igual.

Para montar contas, comparar resultados e brincar de criar operações.'),

  ('Letras em Relevo para Traçado - A a Z',
   'Contadores Bichinhos Coloridos',
   'Bichinhos em 10 cores para contar, separar e criar sequências.

Ótimos para classificação por cor, quantidade, padrões e histórias.'),

  ('Roda da Multiplicação - Tabuada Manipulável',
   'Patinhos Coloridos de Contagem',
   'Patinhos coloridos para contar, agrupar e separar por cor.

Ajudam a trabalhar quantidade, comparação e classificação de forma divertida.'),

  ('Sequência Lógica - Formas e Cores',
   'Letras em Discos - A a Z',
   'Discos pretos com as letras do alfabeto em branco.

Para reconhecer as letras, colocar em ordem e formar palavras.'),

  ('Vogais Móveis em Relevo',
   'Maçãs de Contagem com Cartões Numéricos',
   'Maçãs vermelhas para contar e colocar nos cartões de cada número.

Os cartões trazem o número, o nome escrito (como CINCO) e o traçado para praticar.'),

  ('Dados Numéricos e de Pontos - Kit com 6',
   'Moedinhas Estrela - Fichas de Contagem',
   'Moedinhas amarelas com estrela para contar, juntar e trocar.

Servem como fichas de recompensa, contagem e brincadeiras de compra e venda.'),

  ('Prancha de Encaixe - Formas Geométricas',
   'Fichas Redondas Coloridas - Contagem',
   'Fichas redondas em várias cores para contar e separar.

Ideais para quantidades, classificação por cor, padrões e jogos.'),

  ('Contadores Animais - 60 Peças',
   'Quadradinhos Coloridos - Contagem e Padrões',
   'Quadradinhos coloridos para contar, montar padrões e mosaicos.

Trabalham cores, sequências, quantidade e criatividade.')
) as v(antigo, novo, descricao)
where p.name = v.antigo;

-- Conferência
select id, name from public.products where id between 34 and 42 order by id;
