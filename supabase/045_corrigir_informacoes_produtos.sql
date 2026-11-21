-- =====================================================================
--  Corrige nome + descrição de 10 produtos conforme o que eles realmente são.
--  Fotos, preços, opções e categoria NÃO mudam.
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
--  Pode rodar de novo sem problema: só altera quem ainda tem o nome antigo.
-- =====================================================================
update public.products p
set name = v.novo,
    description = v.descricao
from (values
  ('Kit Contagem Aquário - Golfinhos',
   'Kit Contagem Aquário - Peixinhos',
   'Peixinhos para contar e colocar no aquário de cada cartão.

Os cartões trazem quantidades e somas (5+1, 9+1, 2+1) para resolver de forma lúdica.'),

  ('Tabuleiro Alfanumérico de Encaixe',
   'Tabuleiro Alfanumérico de Cliques - Tipo Teclado',
   'Tabuleiro com teclas de clique, como um teclado de verdade, com letras de A a Z e números de 0 a 9.

A criança aperta as teclas para encontrar letras e números, montar palavras (como MESA) e se familiarizar com o teclado.'),

  ('Potinhos Numerados de Encaixe - 1 a 10',
   'Potinhos Numerados - Encaixe e Contagem 1 a 10',
   'Potinhos numerados de 1 a 10 que se encaixam, cada um de um tamanho.

A criança coloca em cada potinho a quantidade de peças do seu número, trabalhando contagem, sequência e tamanhos.'),

  ('Discos Numéricos com Sinais - Operações',
   'Carimbos Numéricos com Sinais - Para Massinha',
   'Carimbos com números de 0 a 9 e sinais de mais, menos, vezes e igual.

Para carimbar na massinha, montar contas e brincar com os números de um jeito sensorial.'),

  ('Letras em Discos - A a Z',
   'Carimbos de Letras A a Z - Para Massinha',
   'Carimbos com as letras do alfabeto para usar com massinha.

A criança carimba, reconhece as letras e forma palavras enquanto brinca.'),

  ('Contadores Bichinhos Coloridos',
   'Galinhas Coloridas de Contagem',
   'Galinhas coloridas para contar, agrupar e separar.

Ótimas para trabalhar quantidade, reconhecimento das cores e classificação.'),

  ('Moedinhas Estrela - Fichas de Contagem',
   'Moedinhas Estrela - Contagem e Recompensa',
   'Moedinhas amarelas com estrela para contar, juntar e trocar.

Também funcionam como moedinhas de recompensa: a criança ganha uma estrela a cada conquista.'),

  ('Baquetas Coloridas - Ritmo e Musicalização',
   'Bastões Coloridos - Coordenação e Cores',
   'Par de bastões com pontas coloridas.

Para atividades de coordenação motora usando as cores: tocar, apontar e combinar cada ponta com a cor certa.'),

  ('Suporte Porta-Cartões',
   'Calculadora de Contagem e Soma',
   'Calculadora manipulável para contar e somar.

A criança movimenta as peças, vê a quantidade e encontra o resultado das contas de forma concreta.'),

  ('Barra Numérica 1 a 5',
   'Contador de Sílabas - Clique Numérico 1 a 5',
   'Contador com teclas de clique numeradas de 1 a 5.

A criança fala a palavra e aperta um clique para cada sílaba, descobrindo quantas sílabas a palavra tem.')
) as v(antigo, novo, descricao)
where p.name = v.antigo;

-- Conferência
select id, name from public.products
where name in ('Kit Contagem Aquário - Peixinhos',
               'Tabuleiro Alfanumérico de Cliques - Tipo Teclado',
               'Potinhos Numerados - Encaixe e Contagem 1 a 10',
               'Carimbos Numéricos com Sinais - Para Massinha',
               'Carimbos de Letras A a Z - Para Massinha',
               'Galinhas Coloridas de Contagem',
               'Moedinhas Estrela - Contagem e Recompensa',
               'Bastões Coloridos - Coordenação e Cores',
               'Calculadora de Contagem e Soma',
               'Contador de Sílabas - Clique Numérico 1 a 5')
order by id;
