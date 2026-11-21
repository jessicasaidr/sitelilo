-- =====================================================================
--  Renomeia os produtos para combinar com as FOTOS que cada um recebeu
--  (nome + descrição). Fotos, preços, opções e categoria NÃO mudam.
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
--
--  Pode rodar de novo sem problema: só altera quem ainda tem o nome antigo.
-- =====================================================================
update public.products p
set name = v.novo,
    description = v.descricao
from (values
  ('Marcador de Página Clip - Letras (10 unds.)',
   'Placas Numéricas de Encaixe',
   'Placas coloridas com furos que representam as quantidades de 1 a 10, cada número com sua cor.

Acompanha cartões de soma para montar e visualizar as contas encaixando as placas.'),

  ('Alfabeto 3D Colorido - Kit A a Z',
   'Material Dourado - Dezenas e Unidades',
   'Barrinhas (dezenas) e cubinhos (unidades) para representar números de forma concreta.

Acompanha cartões de composição e soma — ideal para entender o sistema decimal.'),

  ('Kit Números 0 a 9 com Peças de Encaixe',
   'Kit Contagem Aquário - Golfinhos',
   'Golfinhos para contar e colocar no aquário de cada cartão.

Os cartões trazem quantidades e somas (5+1, 9+1, 2+1) para resolver de forma lúdica.'),

  ('Patinhos de Borracha 3D - Kit Contagem',
   'Elos de Contagem Coloridos',
   'Elos coloridos que se encaixam formando correntes.

Com os cartões de números, a criança monta a corrente com a quantidade certa e trabalha cores e sequências.'),

  ('Quebra-Cabeça Sistema Solar 3D',
   'Palitos Coloridos - Formas e Padrões',
   'Palitos coloridos para montar figuras, formas e padrões.

Acompanha cartões com modelos (bonequinho, tramas e grades) para reproduzir e criar.'),

  ('Quadro Valor-Lugar (U, D, C)',
   'Letras Móveis Pretas - Completar Palavras',
   'Letras de encaixe maiúsculas e minúsculas com cartões ilustrados.

Para descobrir a vogal ou a letra que falta e completar palavras como ILHA, ALFACE e ESCOVA.'),

  ('Pinos de Seriação - Cores e Tamanhos',
   'Números Móveis 1 a 10 - Contagem e Operações',
   'Plaquinhas com números de 1 a 10 para contar e resolver operações.

Acompanha cartões de subtração (casinhas) e de contagem com as mãos.'),

  ('Sólidos Geométricos - 10 Peças',
   'Moedas de Brincar - Compras e Troco',
   'Moedinhas de brincar para aprender a usar o dinheiro.

Cartões de cofrinho, "Comprei / Quanto gastei?" e "Como pagou / O troco é" para praticar compras e troco.'),

  ('Torre de Hanói - 5 Discos',
   'Letras Soltas - Formando Palavras',
   'Letras pretas maiúsculas e minúsculas para formar palavras.

Cartões ilustrados (ZEBRA, PEIXE, UVA, PATO, BOLA) guiam a leitura e a escrita.'),

  ('Blocos Lógicos - 48 Peças',
   'Números Móveis 0 a 9 - Operações e Contagem',
   'Números de 0 a 9 para montar resultados, quantidades e operações.

Acompanha cartões de soma, quadros numéricos e contagem de objetos.'),

  ('Pentaminós - 12 Peças',
   'Sílabas Móveis - Formando Palavras',
   'Peças com sílabas para juntar e formar palavras.

Cartões ilustrados (GI-RA-FA, CA-MI-SA, PA-NE-LA) ajudam na leitura e na divisão silábica.'),

  ('Cubos de Encaixe Multilink - 100 Peças',
   'Dominó Educativo - Contagem e Somas',
   'Peças de dominó para contar os pontos e somar.

Cartões para associar as peças aos números e resolver somas com os pontinhos.'),

  ('Ábaco de Contagem - 10 Fileiras',
   'Letras Quebra-Cabeça Pretas - Formando Palavras',
   'Letras que se encaixam como quebra-cabeça para formar palavras.

Cartões com palavras (PATO, GATO) para montar e ler.'),

  ('Contas de Alinhavo Geométricas',
   'Plaquinhas de Valor Posicional - 1, 10, 100 e 1000',
   'Plaquinhas coloridas de unidades, dezenas, centenas e milhares.

Com os cartões, a criança monta números como 2536 e 451 e entende o valor de cada algarismo.'),

  ('Círculos de Frações - 9 Discos',
   'Letras Quebra-Cabeça Azuis - Formando Palavras',
   'Letras azuis que se encaixam como quebra-cabeça.

Cartões com palavras (SAPATO, FORTE) para montar, ler e escrever.'),

  ('Tangram Colorido - 7 Peças',
   'Caça-Palavras Deslizante',
   'Tabuleiro com letras que deslizam para formar palavras.

Cartões com desafios para encontrar e montar palavras como PEIXE e SUCO.'),

  ('Geoplano com Elásticos',
   'Tabuleiro Alfanumérico de Encaixe',
   'Tabuleiros com letras de A a Z e números de 0 a 9 que encaixam no lugar certo.

Acompanha cartões para montar palavras (como MESA) e trabalhar letras e números.'),

  ('Jogo da Memória Turma da Lilo',
   'Tangram 7 Peças com Cartões de Desafio',
   'O clássico tangram de 7 peças com base para guardar.

Cartões com figuras (casinha, pássaro e outras) para montar, com e sem contorno.'),

  ('Bingo das Sílabas',
   'Cilindro Giratório de Operações',
   'Cilindro com anéis coloridos de números e sinais que giram para montar contas.

Cartões de desafio como "3 + 2 = ?" e "6 + 3 = ?" para resolver girando.'),

  ('Cartões de Inglês Ilustrados (50 cartas)',
   'Ábaco Vertical C-D-U',
   'Ábaco de 3 hastes (centena, dezena e unidade) com argolas coloridas.

Cartões para representar números e entender o valor posicional.'),

  ('Balança Numérica de Equilíbrio',
   'Plaquinhas de Operações - Adição e Subtração',
   'Plaquinhas com contas de adição e subtração.

Cartões para encontrar a conta que chega a cada resultado ("_ + _ = 8", "5 - 3 = 2").'),

  ('Dominó de Adição',
   'Bloquinhos de Encaixe - Contagem e Somas',
   'Bloquinhos coloridos de encaixe para contar, comparar e somar.

Cartões de quantidade e de soma ("5 + 4 =", "3 + 3 =") para montar com os blocos.'),

  ('Fichas Sobrepostas - Sistema de Numeração',
   'Maçãs Numeradas 1 a 20 - Operações',
   'Maçãs numeradas de 1 a 20 para contar e montar operações.

Cartões de soma e subtração ("_ + _ = 5", "_ - _ = 7") para completar com as maçãs.'),

  ('Escala Cuisenaire - Barras Numéricas',
   'Fichas Sobrepostas - Sistema de Numeração',
   'Fichas de unidades, dezenas, centenas e milhares que se sobrepõem no suporte.

Forme números como 6.838 e 451 e veja o valor posicional de cada algarismo.'),

  ('Relógio Pedagógico de Encaixe',
   'Kit Classificação por Cores - 6 Potes',
   '6 potinhos coloridos com pecinhas para separar por cor.

Trabalha classificação, contagem e coordenação motora fina.'),

  ('Prancha de Alinhavo - Formas',
   'Alfabeto Colorido - Maiúsculas e Minúsculas',
   'Plaquinhas coloridas com as letras maiúsculas e minúsculas (Aa, Bb, Cc…).

Para reconhecer as letras, formar pares e montar palavras.'),

  ('Sílabas Móveis de Encaixe',
   'Números Coloridos 1 a 10',
   'Plaquinhas coloridas com os números de 1 a 10.

Para ordenar, contar e associar número e quantidade.'),

  ('Alfabeto Móvel - Letras de Encaixe',
   'Potinhos Numerados de Encaixe - 1 a 10',
   'Potinhos numerados de 1 a 10, cada um de um tamanho.

Para colocar em ordem, encaixar e trabalhar sequência numérica e tamanhos.')
) as v(antigo, novo, descricao)
where p.name = v.antigo;

-- Conferência: lista os produtos com o nome atual
select id, name, category_id
from public.products
order by category_id, id;
