-- =====================================================================
--  Trocas de categoria
--  PERSONALIZADOS
--   • "Nome Personalizado em Relevo - Plaquinhas" entra no lugar do
--     "Chaveiro Turma da Lilo - Personalizado com Nome"
--   • "Placa de Nome Personalizada com Guia de Leitura" entra no lugar do
--     "Caderno de Caligrafia Personalizado"
--  KITS EDUCATIVOS
--   • "Rolos e Carimbos em Relevo - Letras e Números" entra no lugar do
--     "Kit Atividades em Casa - Coordenação Motora"
--   • "Prancha de Formas Geométricas - Encaixe" e
--     "Kit Peças para Jogos de Tabuleiro - Peões, Dados e Fichas" passam
--     para Kits Educativos
--
--  Quem entra "no lugar" herda as etiquetas (Queridinhos/Lançamentos/Promo)
--  do produto substituído. Os substituídos ficam OCULTOS (active = false),
--  sem ser apagados — dá para reativar depois.
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================

-- 1) Quem entra no lugar de outro produto
update public.products p
set category_id = o.category_id,
    tags        = o.tags,
    sort_order  = o.sort_order
from (values
  ('Nome Personalizado em Relevo - Plaquinhas',          'Chaveiro Turma da Lilo - Personalizado com Nome'),
  ('Placa de Nome Personalizada com Guia de Leitura',    'Caderno de Caligrafia Personalizado'),
  ('Rolos e Carimbos em Relevo - Letras e Números',      'Kit Atividades em Casa - Coordenação Motora')
) as v(novo, antigo)
join public.products o on o.name = v.antigo
where p.name = v.novo;

-- 2) Esconde os substituídos
update public.products
set active = false
where name in ('Chaveiro Turma da Lilo - Personalizado com Nome',
               'Caderno de Caligrafia Personalizado',
               'Kit Atividades em Casa - Coordenação Motora');

-- 3) Só mudam de categoria (mantêm as etiquetas)
update public.products
set category_id = 'kits-educativos',
    sort_order  = 0
where name in ('Prancha de Formas Geométricas - Encaixe',
               'Kit Peças para Jogos de Tabuleiro - Peões, Dados e Fichas');

-- Conferência
select id, name, category_id, tags, active
from public.products
where category_id in ('personalizados', 'kits-educativos')
order by category_id, active desc, id;
