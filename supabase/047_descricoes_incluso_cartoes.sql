-- =====================================================================
--  NOVAS DESCRIÇÕES (60 produtos): o que é + o que vem incluso
--  + aviso de que os cartões não acompanham (quando o produto usa cartões).
--  • {opcao} é trocado no site pela opção escolhida (ex.: "Incluso 50 unidades").
--  • "Plataforma LiloPlay" aparece em destaque com link para o Instagram.
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products p
set description = v.descricao
from (values
  (1, 'Barrinhas (dezenas) e cubinhos (unidades) para representar números de forma concreta.

Incluso 20 peças, entre dezenas e unidades. Para solicitar a centena, entre em contato pelo WhatsApp.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (2, 'Peixinhos para uso de contas e somas.

Incluso {opcao}.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (3, 'Placas coloridas com furos que representam as quantidades de 1 a 10, cada número com sua cor.

Incluso 10 peças com cores sortidas.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (6, 'O clássico tangram de 7 peças com base para guardar.

Incluso 7 peças e a base.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (8, 'Elos coloridos que se encaixam formando correntes, para trabalhar quantidade, cores e sequências.

Incluso {opcao} com cores sortidas.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (10, 'Palitos coloridos para montar figuras, formas e padrões.

Incluso {opcao} com cores sortidas.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (12, 'Cilindro com anéis coloridos de números e sinais que giram para montar contas.

Incluso 1 cilindro com os anéis giratórios.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (13, 'Ábaco de 3 hastes (centena, dezena e unidade) com argolas coloridas, para representar números e entender o valor posicional.

Incluso 1 ábaco com argolas em {opcao}.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (14, 'Letras de encaixe maiúsculas e minúsculas para descobrir a letra que falta e completar palavras.

Incluso 1 conjunto de letras.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (15, 'Plaquinhas com números de 1 a 10 para contar e resolver operações.

Incluso as plaquinhas com os números de 1 a 10.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (16, 'Moedinhas de brincar para aprender a usar o dinheiro, praticar compras e calcular o troco.

Incluso 1 conjunto de moedinhas.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (17, 'Letras pretas maiúsculas e minúsculas para formar palavras e praticar a leitura e a escrita.

Incluso 1 conjunto de letras.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (18, 'Números de 0 a 9 para montar resultados, quantidades e operações.

Incluso as plaquinhas com os números de 0 a 9.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (19, 'Peças com sílabas para juntar e formar palavras, ajudando na leitura e na divisão silábica.

Incluso 1 conjunto de sílabas.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (20, 'Peças de dominó para contar os pontos e somar.

Incluso 1 jogo de dominó.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (21, 'Letras pretas que se encaixam como quebra-cabeça para formar palavras.

Incluso 1 conjunto de letras.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (22, 'Plaquinhas coloridas de unidades, dezenas, centenas e milhares para montar números e entender o valor de cada algarismo.

Incluso 1 conjunto de plaquinhas.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (23, 'Letras azuis que se encaixam como quebra-cabeça para montar, ler e escrever palavras.

Incluso 1 conjunto de letras.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (24, 'Tabuleiro com letras que deslizam para encontrar e formar palavras.

Incluso 1 tabuleiro com as letras deslizantes.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (25, 'Tabuleiro com teclas de clique, como um teclado de verdade, com letras de A a Z e números de 0 a 9. A criança aperta as teclas para encontrar letras e números, montar palavras e se familiarizar com o teclado.

Incluso 1 tabuleiro com as teclas de A a Z e de 0 a 9.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (26, 'Plaquinhas com contas de adição e subtração para encontrar a conta que chega a cada resultado.

Incluso 1 conjunto de plaquinhas.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (27, 'Bloquinhos coloridos de encaixe para contar, comparar e somar.

Incluso bloquinhos em {opcao}.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (28, 'Maçãs numeradas de 1 a 20 para contar e montar operações de soma e subtração.

Incluso 20 maçãs numeradas de 1 a 20.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (29, 'Fichas de unidades, dezenas, centenas e milhares que se sobrepõem no suporte. Forme números e veja o valor posicional de cada algarismo.

Incluso as fichas e o suporte.'),
  (30, 'Potinhos coloridos com pecinhas para separar por cor, trabalhando classificação, contagem e coordenação motora fina.

Incluso potinhos e pecinhas em {opcao}.'),
  (31, 'Plaquinhas coloridas com as letras maiúsculas e minúsculas (Aa, Bb, Cc…) para reconhecer as letras, formar pares e montar palavras.

Incluso as letras de A a Z em maiúsculas e minúsculas.'),
  (32, 'Plaquinhas coloridas com os números de 1 a 10 para ordenar, contar e associar número e quantidade.

Incluso as plaquinhas com os números de 1 a 10.'),
  (33, 'Potinhos numerados de 1 a 10 que se encaixam, cada um de um tamanho. A criança coloca em cada potinho a quantidade de peças do seu número.

Incluso 10 potinhos numerados de 1 a 10 e as pecinhas para contagem.'),
  (34, 'Dadinhos com letras em todas as faces para rolar e formar palavras.

Incluso 1 conjunto de dadinhos com letras.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (35, 'Carimbos com números e sinais para carimbar na massinha, montar contas e brincar com os números de um jeito sensorial.

Incluso carimbos dos números de 0 a 9 e dos sinais de mais, menos, vezes e igual.'),
  (36, 'Galinhas coloridas para contar, agrupar e separar, trabalhando quantidade e reconhecimento das cores.

Incluso 1 conjunto de galinhas com cores sortidas.'),
  (37, 'Patinhos coloridos para contar, agrupar e separar por cor.

Incluso {opcao} com cores sortidas.'),
  (38, 'Carimbos com as letras do alfabeto para usar com massinha: a criança carimba, reconhece as letras e forma palavras.

Incluso carimbos das letras de A a Z.'),
  (39, 'Maçãs vermelhas para contar e colocar nos cartões de cada número.

Incluso {opcao}.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (40, 'Moedinhas amarelas com estrela para contar, juntar e trocar. Também funcionam como moedinhas de recompensa: a criança ganha uma estrela a cada conquista.

Incluso {opcao}.'),
  (41, 'Fichas redondas em várias cores para contar, separar, criar padrões e jogar.

Incluso {opcao} com cores sortidas.'),
  (42, 'Quadradinhos coloridos para contar, montar padrões e mosaicos.

Incluso {opcao} com cores sortidas.'),
  (43, 'Plaquinhas pretas com letras brancas e uma base para encaixar e montar palavras, como PORTA.

Incluso 1 conjunto de letras e 1 base de encaixe.'),
  (44, 'Pinças para pegar e transferir pecinhas, fortalecendo os dedinhos e a coordenação motora fina.

Incluso {opcao}.'),
  (45, 'Barras numeradas de 1 a 10, cada uma com o tamanho da sua quantidade, para montar a escadinha e comparar tamanhos.

Incluso 10 barras numeradas de 1 a 10.'),
  (46, 'Pranchas com encaixe das letras de A a Z e dos números de 0 a 9: a criança encontra o lugar de cada peça colorida.

Incluso 2 pranchas (alfabeto e números) com as peças de encaixe.'),
  (47, 'Números vazados de 0 a 9 para manusear, ordenar e contornar com o dedinho.

Incluso {opcao}.'),
  (48, 'Par de bastões com pontas coloridas para atividades de coordenação motora usando as cores.

Incluso 1 par de bastões.'),
  (49, 'Calculadora manipulável para contar e somar: a criança movimenta as peças, vê a quantidade e encontra o resultado.

Incluso 1 calculadora de contagem.'),
  (50, 'Medalhas douradas para premiar jogos, gincanas e conquistas, e trabalhar números ordinais.

Incluso 3 medalhas: 1º, 2º e 3º lugar.'),
  (51, 'Botões redondos coloridos para jogos de resposta rápida, classificação por cor e brincadeiras em grupo.

Incluso 1 conjunto de botões com cores sortidas.'),
  (52, 'Blocos coloridos com setas para trabalhar lateralidade, direção, sequências e os primeiros passos da programação.

Incluso 4 blocos de setas: cima, baixo, direita e esquerda.'),
  (53, 'Contador com teclas de clique numeradas de 1 a 5: a criança fala a palavra e aperta um clique para cada sílaba.

Incluso 1 contador com 5 cliques numerados.'),
  (54, 'Sinalizadores de mão para jogos de perguntas e respostas, combinados de sala e brincadeiras de atenção.

Incluso 3 sinalizadores: certo, errado e STOP.'),
  (55, 'Letras minúsculas vazadas para manusear, formar palavras e treinar o traçado contornando a letra.

Incluso as letras minúsculas de a a z.'),
  (56, 'Prancha com formas geométricas para encaixar, cada forma com sua cor, trabalhando formas, cores e coordenação motora.

Incluso 1 prancha e as formas de encaixe.'),
  (57, 'Plaquinhas com o nome da criança em relevo para manusear, reconhecer e marcar os materiais.

Incluso 1 conjunto de plaquinhas com o nome escolhido.'),
  (58, 'Apoios com fenda para deixar cartões e fichas de atividade em pé, sempre à vista da criança.

Incluso 1 kit de apoios.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (59, 'Fichas redondas grandes para contar, separar por cor, marcar casas em jogos e criar sequências.

Incluso {opcao} com cores sortidas.'),
  (60, 'Bandeja com fenda para encaixar o cartão de atividade e espaço para as pecinhas, ajudando a criança a focar em um desafio por vez.

Incluso 1 bandeja.

Os cartões não acompanham o produto: eles serão disponibilizados dentro da Plataforma LiloPlay.'),
  (61, 'Peões coloridos, dados e fichas para jogar trilhas e jogos de tabuleiro, trabalhando contagem, cores e brincadeiras em grupo.

Incluso peões, dados e fichas.

O tabuleiro não acompanha o produto: ele será disponibilizado dentro da Plataforma LiloPlay.'),
  (62, 'Rolos com letras e números em relevo e cubinhos carimbo com figuras para rolar e carimbar na massinha.

Incluso rolos com letras e números e cubinhos carimbo.'),
  (63, 'Letras maiúsculas e minúsculas com prancha para encaixar a primeira e a última letra das palavras.

Incluso 1 conjunto de letras e 1 prancha.'),
  (64, 'Placa com o nome da criança e cartão de dedinho guia para acompanhar a leitura da esquerda para a direita.

Incluso 1 placa com o nome escolhido e 1 cartão guia de leitura.'),
  (65, 'Peneira, tigela, pá, pinça e rastelo para brincadeiras sensoriais com areia, grãos ou água.

Incluso peneira, tigela, pá, pinça e rastelo.')
) as v(id, descricao)
where p.id = v.id;

-- Conferência
select id, name, description from public.products where active order by id;
