-- =====================================================================
--  "Pranchas de Encaixe - Alfabeto e Números" vai para KITS EDUCATIVOS
--  no lugar do "Kit Homeschooling 1º Ano - Português e Matemática".
--  • As Pranchas mudam de categoria e herdam a etiqueta "Lançamentos".
--  • O Kit Homeschooling fica OCULTO (active = false), sem ser apagado:
--    se quiser ele de volta, é só reativar no painel ou trocar para true.
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set category_id = 'kits-educativos',
    sort_order  = 0,
    tags        = array['lancamentos']
where name = 'Pranchas de Encaixe - Alfabeto e Números';

update public.products
set active = false
where name = 'Kit Homeschooling 1º Ano - Português e Matemática';

-- Conferência
select id, name, category_id, active
from public.products
where category_id = 'kits-educativos'
order by active desc, sort_order, id;
