-- =====================================================================
--  Lote 3 (pastas 51 a 60): coloca as FOTOS (capa primeiro) e RENOMEIA
--  cada produto para combinar com as fotos (nome + descrição).
--  Preços, opções e categoria NÃO mudam.
--  Os 2 produtos com nome "Fábio" nas fotos passam a aceitar
--  personalização (campo para o cliente escrever o nome).
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
--  Pode rodar de novo sem problema: só altera quem ainda tem o nome antigo.
-- =====================================================================
update public.products p
set images = array['assets/produtos/' || v.pasta || '/capa.jpg'] ||
             array(select 'assets/produtos/' || v.pasta || '/' || g || '.jpg' from generate_series(1, v.n) g),
    name = v.novo,
    description = v.descricao,
    personalizable = v.pers
from (values
  -- pasta 51
  ('Quadro dos 100 - Tabuleiro de Encaixe', 'quadro-dos-100', 2, false,
   'Prancha de Formas Geométricas - Encaixe',
   'Prancha com círculo, quadrado, triângulo e hexágono para encaixar, cada forma com sua cor.

Trabalha reconhecimento de formas e cores, comparação e coordenação motora.'),

  -- pasta 52
  ('Frações em Círculos - Encaixe', 'fracoes-circulos', 2, true,
   'Nome Personalizado em Relevo - Plaquinhas',
   'Plaquinhas com o nome da criança em relevo, para manusear e reconhecer.

Ótimas para marcar materiais, treinar a leitura do próprio nome e brincar de encontrar o nome igual.'),

  -- pasta 53
  ('Silabário Giratório', 'silabario-giratorio', 4, false,
   'Suportes para Cartões - Kit de Apoios',
   'Apoios com fenda para deixar cartões e fichas de atividade em pé.

Deixam o desafio sempre à vista da criança e organizam a mesa de estudos.'),

  -- pasta 54
  ('Relógio de Ponteiros Manipulável', 'relogio-ponteiros', 2, false,
   'Fichas Coloridas Grandes - Contagem e Jogos',
   'Fichas redondas grandes em azul, rosa, vermelho e preto.

Para contar, separar por cor, marcar casas em jogos e criar sequências.'),

  -- pasta 55
  ('Trilha Numérica de 1 a 30', 'trilha-numerica', 3, false,
   'Bandeja de Atividades com Suporte para Cartão',
   'Bandeja com fenda para encaixar o cartão de atividade e espaço para as pecinhas.

Mantém tudo organizado e ajuda a criança a focar em um desafio por vez.'),

  -- pasta 56
  ('Cartões de Padrões com Pecinhas', 'cartoes-padroes', 3, false,
   'Kit Peças para Jogos de Tabuleiro - Peões, Dados e Fichas',
   'Peões coloridos, dados e fichas para jogar trilhas e jogos de tabuleiro.

Trabalham contagem, cores, esperar a vez e brincar em grupo.'),

  -- pasta 57
  ('Balança de Equilíbrio Numérica', 'balanca-equilibrio', 3, false,
   'Rolos e Carimbos em Relevo - Letras e Números',
   'Rolos com letras e números em relevo e cubinhos carimbo com figuras.

Para rolar na massinha, carimbar e descobrir letras, números e formas pelo toque.'),

  -- pasta 58
  ('Formas Geométricas de Encaixe - Prancha', 'formas-encaixe', 2, false,
   'Kit Sensorial - Peneira, Pá, Pinça e Rastelo',
   'Peneira, tigela, pá, pinça e rastelo para brincadeiras sensoriais.

Ótimo para caixas sensoriais com areia, grãos ou água, desenvolvendo coordenação e exploração.'),

  -- pasta 59
  ('Alinhavo de Números - 0 a 9', 'alinhavo-numeros', 3, false,
   'Letras Móveis com Prancha - Primeira e Última Letra',
   'Letras maiúsculas e minúsculas com prancha para encaixar a primeira e a última letra.

Ajuda a perceber os sons das palavras e a formar as primeiras palavrinhas.'),

  -- pasta 60
  ('Cubos de Contagem com Pontos', 'cubos-pontos', 2, true,
   'Placa de Nome Personalizada com Guia de Leitura',
   'Placa com o nome da criança e cartão de dedinho guia para acompanhar a leitura.

Ajuda a reconhecer o próprio nome e a seguir as letras da esquerda para a direita.')
) as v(antigo, pasta, n, pers, novo, descricao)
where p.name = v.antigo;

-- Conferência
select id, name, array_length(images, 1) as fotos, personalizable
from public.products
where sort_order = 30 and category_id = 'materiais-manipulaveis'
order by id;
