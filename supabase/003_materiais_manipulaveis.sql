-- =====================================================================
--  Renomeia a categoria "Brinquedos 3D" para "Materiais Manipuláveis"
--  (nome e endereço na URL). Os produtos dessa categoria acompanham
--  automaticamente.
--  Supabase > SQL Editor > New query > cole e clique em Run.
-- =====================================================================
update public.categories
set id   = 'materiais-manipulaveis',
    name = 'Materiais Manipuláveis'
where id = 'brinquedos-3d';
