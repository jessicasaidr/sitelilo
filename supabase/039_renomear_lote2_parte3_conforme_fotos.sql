-- =====================================================================
--  Renomeia os produtos das pastas 38 a 50 para combinar com as FOTOS
--  (nome + descrição). Fotos, preços, opções e categoria NÃO mudam.
--  Rode DEPOIS do 038.
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
--  Pode rodar de novo sem problema: só altera quem ainda tem o nome antigo.
-- =====================================================================
update public.products p
set name = v.novo,
    description = v.descricao
from (values
  ('Torre de Empilhar Numerada - 1 a 10',
   'Letras Pretas com Base de Encaixe - Formando Palavras',
   'Plaquinhas pretas com letras brancas e uma base para encaixar.

Monte palavras como PORTA na base e trabalhe leitura, escrita e reconhecimento das letras.'),

  ('Régua de Medidas Manipulável',
   'Pinças de Coordenação Motora',
   'Pinças para pegar e transferir pecinhas.

Fortalecem os dedinhos e a coordenação motora fina — ótimas junto com contadores e potinhos.'),

  ('Calendário Interativo de Encaixe',
   'Escadinha Numérica - Barras de 1 a 10',
   'Barras numeradas de 1 a 10, cada uma com o tamanho da sua quantidade.

Para montar a escadinha, comparar tamanhos e entender número e quantidade.'),

  ('Jogo de Atenção Visual - Letras',
   'Pranchas de Encaixe - Alfabeto e Números',
   'Pranchas com encaixe das letras de A a Z e dos números de 0 a 9.

A criança encontra o lugar de cada peça colorida, trabalhando atenção, letras e números.'),

  ('Rimas Manipuláveis - Pares de Figuras',
   'Números Vazados Amarelos - 0 a 9',
   'Números vazados para manusear, ordenar e contornar com o dedinho.

Ajudam no reconhecimento dos números e no treino do traçado.'),

  ('Numerais em Relevo para Traçado - 0 a 9',
   'Baquetas Coloridas - Ritmo e Musicalização',
   'Par de baquetas com pontas coloridas.

Para brincadeiras de ritmo, contagem de batidas, música e coordenação.'),

  ('Quebra-Cabeça de Frações - Pizza',
   'Suporte Porta-Cartões',
   'Suporte com fendas para deixar cartões e fichas em pé.

Organiza as atividades e deixa os cartões à vista da criança.'),

  ('Mosaico Geométrico - 120 Peças',
   'Medalhas de 1º, 2º e 3º Lugar',
   'Medalhas douradas de 1º, 2º e 3º lugar.

Para premiar jogos, gincanas e conquistas — e trabalhar números ordinais.'),

  ('Cubos de Sílabas - Kit com 6',
   'Botões Redondos Coloridos',
   'Botões redondos em várias cores.

Para jogos de resposta rápida, classificação por cor e brincadeiras em grupo.'),

  ('Reta Numérica Manipulável - 0 a 20',
   'Setas Direcionais - Lateralidade',
   'Blocos coloridos com setas para cima, para baixo, direita e esquerda.

Trabalham lateralidade, direção, sequências e os primeiros passos da programação.'),

  ('Pareamento Letra Inicial e Figura',
   'Barra Numérica 1 a 5',
   'Barra com os números de 1 a 5 em sequência.

Para contar, ordenar e encaixar quantidades.')
) as v(antigo, novo, descricao)
where p.name = v.antigo;

-- Conferência
select id, name from public.products where id >= 43 order by id;
