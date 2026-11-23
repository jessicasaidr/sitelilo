-- =====================================================================
--  NOVOS PREÇOS (60 produtos)
--  • O valor informado é o valor NO PIX de cada opção (fica fixo).
--  • O preço normal (em azul) fica, por enquanto, IGUAL ao valor do Pix —
--    depois é só alterar o "Preço normal / cartão" no painel
--    (Minha conta > Produtos > ✏️); o valor do Pix não muda.
--  • Opções viram unidades (20 unidades, 50 unidades, 3 cores…) ou
--    valor único ("Unidade"). Preços antigos "de/por" são removidos.
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
--  Pode rodar de novo sem problema.
-- =====================================================================
update public.products p
set variants  = v.variants,
    options   = array(select x->>'label' from jsonb_array_elements(v.variants) x),
    price     = (select min((x->>'price')::numeric) from jsonb_array_elements(v.variants) x),
    old_price = null
from (values
  ('Placas Numéricas de Encaixe',
   '[{"label":"Unidade","price":45.9,"pix":45.9,"old_price":null}]'::jsonb),

  ('Material Dourado - Dezenas e Unidades',
   '[{"label":"Unidade","price":38.9,"pix":38.9,"old_price":null}]'::jsonb),

  ('Kit Contagem Aquário - Peixinhos',
   '[{"label":"20 unidades","price":29.9,"pix":29.9,"old_price":null},{"label":"50 unidades","price":38.9,"pix":38.9,"old_price":null}]'::jsonb),

  ('Tangram 7 Peças com Cartões de Desafio',
   '[{"label":"Unidade","price":35.9,"pix":35.9,"old_price":null}]'::jsonb),

  ('Cilindro Giratório de Operações',
   '[{"label":"Unidade","price":65.9,"pix":65.9,"old_price":null}]'::jsonb),

  ('Ábaco Vertical C-D-U',
   '[{"label":"3 cores","price":45.9,"pix":45.9,"old_price":null},{"label":"6 cores","price":59.9,"pix":59.9,"old_price":null}]'::jsonb),

  ('Palitos Coloridos - Formas e Padrões',
   '[{"label":"24 unidades","price":37.9,"pix":37.9,"old_price":null}]'::jsonb),

  ('Elos de Contagem Coloridos',
   '[{"label":"20 unidades","price":29.9,"pix":29.9,"old_price":null}]'::jsonb),

  ('Kit Classificação por Cores - 6 Potes',
   '[{"label":"6 cores","price":48.9,"pix":48.9,"old_price":null},{"label":"8 cores","price":55.9,"pix":55.9,"old_price":null},{"label":"10 cores","price":63.9,"pix":63.9,"old_price":null}]'::jsonb),

  ('Pranchas de Encaixe - Alfabeto e Números',
   '[{"label":"Unidade","price":49.9,"pix":49.9,"old_price":null}]'::jsonb),

  ('Botões Redondos Coloridos',
   '[{"label":"Unidade","price":36.9,"pix":36.9,"old_price":null}]'::jsonb),

  ('Setas Direcionais - Lateralidade',
   '[{"label":"Unidade","price":39.9,"pix":39.9,"old_price":null}]'::jsonb),

  ('Sinalizadores Certo, Errado e Stop',
   '[{"label":"Unidade","price":37.9,"pix":37.9,"old_price":null}]'::jsonb),

  ('Prancha de Formas Geométricas - Encaixe',
   '[{"label":"Unidade","price":74.9,"pix":74.9,"old_price":null}]'::jsonb),

  ('Nome Personalizado em Relevo - Plaquinhas',
   '[{"label":"Unidade","price":39.9,"pix":39.9,"old_price":null}]'::jsonb),

  ('Suportes para Cartões - Kit de Apoios',
   '[{"label":"Unidade","price":29.9,"pix":29.9,"old_price":null}]'::jsonb),

  ('Kit Peças para Jogos de Tabuleiro - Peões, Dados e Fichas',
   '[{"label":"Unidade","price":35.9,"pix":35.9,"old_price":null}]'::jsonb),

  ('Rolos e Carimbos em Relevo - Letras e Números',
   '[{"label":"Unidade","price":49.9,"pix":49.9,"old_price":null}]'::jsonb),

  ('Placa de Nome Personalizada com Guia de Leitura',
   '[{"label":"Unidade","price":34.9,"pix":34.9,"old_price":null}]'::jsonb),

  ('Letras Móveis Pretas - Completar Palavras',
   '[{"label":"Unidade","price":38.9,"pix":38.9,"old_price":null}]'::jsonb),

  ('Números Móveis 1 a 10 - Contagem e Operações',
   '[{"label":"Unidade","price":34.9,"pix":34.9,"old_price":null}]'::jsonb),

  ('Moedas de Brincar - Compras e Troco',
   '[{"label":"Unidade","price":38.9,"pix":38.9,"old_price":null}]'::jsonb),

  ('Letras Soltas - Formando Palavras',
   '[{"label":"Unidade","price":38.9,"pix":38.9,"old_price":null}]'::jsonb),

  ('Números Móveis 0 a 9 - Operações e Contagem',
   '[{"label":"Unidade","price":34.9,"pix":34.9,"old_price":null}]'::jsonb),

  ('Sílabas Móveis - Formando Palavras',
   '[{"label":"Unidade","price":59.9,"pix":59.9,"old_price":null}]'::jsonb),

  ('Dominó Educativo - Contagem e Somas',
   '[{"label":"Unidade","price":44.9,"pix":44.9,"old_price":null}]'::jsonb),

  ('Letras Quebra-Cabeça Pretas - Formando Palavras',
   '[{"label":"Unidade","price":49.9,"pix":49.9,"old_price":null}]'::jsonb),

  ('Plaquinhas de Valor Posicional - 1, 10, 100 e 1000',
   '[{"label":"Unidade","price":39.9,"pix":39.9,"old_price":null}]'::jsonb),

  ('Fichas Sobrepostas - Sistema de Numeração',
   '[{"label":"Unidade","price":79.9,"pix":79.9,"old_price":null}]'::jsonb),

  ('Letras Quebra-Cabeça Azuis - Formando Palavras',
   '[{"label":"Unidade","price":64.9,"pix":64.9,"old_price":null}]'::jsonb),

  ('Caça-Palavras Deslizante',
   '[{"label":"Unidade","price":39.9,"pix":39.9,"old_price":null}]'::jsonb),

  ('Tabuleiro Alfanumérico de Cliques - Tipo Teclado',
   '[{"label":"Unidade","price":79.9,"pix":79.9,"old_price":null}]'::jsonb),

  ('Plaquinhas de Operações - Adição e Subtração',
   '[{"label":"Unidade","price":79.9,"pix":79.9,"old_price":null}]'::jsonb),

  ('Bloquinhos de Encaixe - Contagem e Somas',
   '[{"label":"5 cores","price":67.9,"pix":67.9,"old_price":null},{"label":"7 cores","price":79.9,"pix":79.9,"old_price":null}]'::jsonb),

  ('Maçãs Numeradas 1 a 20 - Operações',
   '[{"label":"Unidade","price":39.9,"pix":39.9,"old_price":null}]'::jsonb),

  ('Alfabeto Colorido - Maiúsculas e Minúsculas',
   '[{"label":"Unidade","price":64.9,"pix":64.9,"old_price":null}]'::jsonb),

  ('Números Coloridos 1 a 10',
   '[{"label":"Unidade","price":49.9,"pix":49.9,"old_price":null}]'::jsonb),

  ('Potinhos Numerados - Encaixe e Contagem 1 a 10',
   '[{"label":"Unidade","price":49.9,"pix":49.9,"old_price":null}]'::jsonb),

  ('Dados de Letras - Formando Palavras',
   '[{"label":"Unidade","price":35.9,"pix":35.9,"old_price":null}]'::jsonb),

  ('Carimbos Numéricos com Sinais - Para Massinha',
   '[{"label":"Unidade","price":39.9,"pix":39.9,"old_price":null}]'::jsonb),

  ('Galinhas Coloridas de Contagem',
   '[{"label":"Unidade","price":49.9,"pix":49.9,"old_price":null}]'::jsonb),

  ('Patinhos Coloridos de Contagem',
   '[{"label":"20 unidades","price":34.9,"pix":34.9,"old_price":null},{"label":"50 unidades","price":39.9,"pix":39.9,"old_price":null}]'::jsonb),

  ('Carimbos de Letras A a Z - Para Massinha',
   '[{"label":"Unidade","price":54.9,"pix":54.9,"old_price":null}]'::jsonb),

  ('Maçãs de Contagem com Cartões Numéricos',
   '[{"label":"20 unidades","price":34.9,"pix":34.9,"old_price":null},{"label":"50 unidades","price":39.9,"pix":39.9,"old_price":null}]'::jsonb),

  ('Moedinhas Estrela - Contagem e Recompensa',
   '[{"label":"20 unidades","price":29.9,"pix":29.9,"old_price":null},{"label":"50 unidades","price":35.9,"pix":35.9,"old_price":null}]'::jsonb),

  ('Fichas Redondas Coloridas - Contagem',
   '[{"label":"50 unidades","price":29.9,"pix":29.9,"old_price":null},{"label":"100 unidades","price":49.9,"pix":49.9,"old_price":null}]'::jsonb),

  ('Quadradinhos Coloridos - Contagem e Padrões',
   '[{"label":"50 unidades","price":29.9,"pix":29.9,"old_price":null},{"label":"100 unidades","price":49.9,"pix":49.9,"old_price":null}]'::jsonb),

  ('Letras Pretas com Base de Encaixe - Formando Palavras',
   '[{"label":"Unidade","price":55.9,"pix":55.9,"old_price":null}]'::jsonb),

  ('Pinças de Coordenação Motora',
   '[{"label":"1 unidade","price":29.9,"pix":29.9,"old_price":null},{"label":"3 unidades","price":34.9,"pix":34.9,"old_price":null}]'::jsonb),

  ('Escadinha Numérica - Barras de 1 a 10',
   '[{"label":"Unidade","price":35.5,"pix":35.5,"old_price":null}]'::jsonb),

  ('Números Vazados Amarelos - 0 a 9',
   '[{"label":"2 unidades","price":29.9,"pix":29.9,"old_price":null}]'::jsonb),

  ('Bastões Coloridos - Coordenação e Cores',
   '[{"label":"Unidade","price":29.9,"pix":29.9,"old_price":null}]'::jsonb),

  ('Calculadora de Contagem e Soma',
   '[{"label":"Unidade","price":49.9,"pix":49.9,"old_price":null}]'::jsonb),

  ('Medalhas de 1º, 2º e 3º Lugar',
   '[{"label":"Unidade","price":34.9,"pix":34.9,"old_price":null}]'::jsonb),

  ('Contador de Sílabas - Clique Numérico 1 a 5',
   '[{"label":"Unidade","price":34.9,"pix":34.9,"old_price":null}]'::jsonb),

  ('Letras Minúsculas Vazadas - a a z',
   '[{"label":"Unidade","price":29.9,"pix":29.9,"old_price":null}]'::jsonb),

  ('Fichas Coloridas Grandes - Contagem e Jogos',
   '[{"label":"20 unidades","price":34.9,"pix":34.9,"old_price":null},{"label":"50 unidades","price":39.9,"pix":39.9,"old_price":null}]'::jsonb),

  ('Bandeja de Atividades com Suporte para Cartão',
   '[{"label":"Unidade","price":39.9,"pix":39.9,"old_price":null}]'::jsonb),

  ('Letras Móveis com Prancha - Primeira e Última Letra',
   '[{"label":"Unidade","price":49.9,"pix":49.9,"old_price":null}]'::jsonb),

  ('Kit Sensorial - Peneira, Pá, Pinça e Rastelo',
   '[{"label":"Unidade","price":44.9,"pix":44.9,"old_price":null}]'::jsonb)
) as v(nome, variants)
where p.name = v.nome;

-- Conferência: nome, opções e valores no Pix
select p.name,
       string_agg((x->>'label') || ': R$ ' || replace(x->>'pix', '.', ','), '  |  ' order by (x->>'price')::numeric) as opcoes_pix
from public.products p, jsonb_array_elements(p.variants) x
where p.active
group by p.id, p.name
order by p.name;
