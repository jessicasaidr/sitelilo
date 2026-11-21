-- =====================================================================
--  Passa 5 produtos para KITS EDUCATIVOS (mantêm fotos, preços e etiquetas)
--  e remove do site a "Tabuada Divertida - Fichas Plastificadas"
--  (fica oculta, sem ser apagada — dá para reativar depois).
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set category_id = 'kits-educativos',
    sort_order  = 0
where name in ('Kit Classificação por Cores - 6 Potes',
               'Botões Redondos Coloridos',
               'Setas Direcionais - Lateralidade',
               'Sinalizadores Certo, Errado e Stop',
               'Suportes para Cartões - Kit de Apoios');

update public.products
set active = false
where name = 'Tabuada Divertida - Fichas Plastificadas';

-- Conferência
select id, name, active
from public.products
where category_id = 'kits-educativos'
order by active desc, id;
