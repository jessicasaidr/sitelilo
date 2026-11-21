-- =====================================================================
--  Move "Tangram Colorido - 7 Peças" e "Geoplano com Elásticos"
--  da categoria Materiais Manipuláveis para Jogos 3D.
--  Supabase > SQL Editor > New query > cole e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.products
set category_id = 'jogos'
where name in ('Tangram Colorido - 7 Peças', 'Geoplano com Elásticos');

-- Conferência: os dois devem aparecer com category_id = jogos
select name, category_id
from public.products
where name in ('Tangram Colorido - 7 Peças', 'Geoplano com Elásticos');
