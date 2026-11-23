-- =====================================================================
--  Padroniza o "Incluso" dos produtos de valor único no estilo
--  "Incluso 1 conjunto ...". Só troca essa frase; o resto da descrição
--  (o que é o produto e o aviso dos cartões) continua igual.
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
--  Pode rodar de novo sem problema.
-- =====================================================================
update public.products p
set description = replace(p.description, v.antes, v.depois)
from (values
  (1,  'Incluso 20 peças, entre dezenas e unidades.',
       'Incluso 1 conjunto com 20 peças, entre dezenas e unidades.'),
  (3,  'Incluso 10 peças com cores sortidas.',
       'Incluso 1 conjunto com 10 peças em cores sortidas.'),
  (6,  'Incluso 7 peças e a base.',
       'Incluso 1 conjunto com 7 peças e a base.'),
  (15, 'Incluso as plaquinhas com os números de 1 a 10.',
       'Incluso 1 conjunto de plaquinhas com os números de 1 a 10.'),
  (18, 'Incluso as plaquinhas com os números de 0 a 9.',
       'Incluso 1 conjunto de plaquinhas com os números de 0 a 9.'),
  (28, 'Incluso 20 maçãs numeradas de 1 a 20.',
       'Incluso 1 conjunto com 20 maçãs numeradas de 1 a 20.'),
  (29, 'Incluso as fichas e o suporte.',
       'Incluso 1 conjunto de fichas e 1 suporte.'),
  (31, 'Incluso as letras de A a Z em maiúsculas e minúsculas.',
       'Incluso 1 conjunto de letras de A a Z em maiúsculas e minúsculas.'),
  (32, 'Incluso as plaquinhas com os números de 1 a 10.',
       'Incluso 1 conjunto de plaquinhas com os números de 1 a 10.'),
  (33, 'Incluso 10 potinhos numerados de 1 a 10 e as pecinhas para contagem.',
       'Incluso 1 conjunto com 10 potinhos numerados de 1 a 10 e as pecinhas para contagem.'),
  (35, 'Incluso carimbos dos números de 0 a 9 e dos sinais de mais, menos, vezes e igual.',
       'Incluso 1 conjunto de carimbos com os números de 0 a 9 e os sinais de mais, menos, vezes e igual.'),
  (38, 'Incluso carimbos das letras de A a Z.',
       'Incluso 1 conjunto de carimbos com as letras de A a Z.'),
  (45, 'Incluso 10 barras numeradas de 1 a 10.',
       'Incluso 1 conjunto com 10 barras numeradas de 1 a 10.'),
  (46, 'Incluso 2 pranchas (alfabeto e números) com as peças de encaixe.',
       'Incluso 1 conjunto com 2 pranchas (alfabeto e números) e as peças de encaixe.'),
  (50, 'Incluso 3 medalhas: 1º, 2º e 3º lugar.',
       'Incluso 1 conjunto com 3 medalhas: 1º, 2º e 3º lugar.'),
  (52, 'Incluso 4 blocos de setas: cima, baixo, direita e esquerda.',
       'Incluso 1 conjunto com 4 blocos de setas: cima, baixo, direita e esquerda.'),
  (54, 'Incluso 3 sinalizadores: certo, errado e STOP.',
       'Incluso 1 conjunto com 3 sinalizadores: certo, errado e STOP.'),
  (55, 'Incluso as letras minúsculas de a a z.',
       'Incluso 1 conjunto de letras minúsculas de a a z.'),
  (56, 'Incluso 1 prancha e as formas de encaixe.',
       'Incluso 1 conjunto com 1 prancha e as formas de encaixe.'),
  (61, 'Incluso peões, dados e fichas.',
       'Incluso 1 conjunto de peões, dados e fichas.'),
  (62, 'Incluso rolos com letras e números e cubinhos carimbo.',
       'Incluso 1 conjunto de rolos com letras e números e cubinhos carimbo.'),
  (65, 'Incluso peneira, tigela, pá, pinça e rastelo.',
       'Incluso 1 conjunto com peneira, tigela, pá, pinça e rastelo.')
) as v(id, antes, depois)
where p.id = v.id;

-- Conferência: a frase "Incluso" de cada produto
select id, name, substring(description from 'Incluso[^\r\n]*') as incluso
from public.products where active order by id;
