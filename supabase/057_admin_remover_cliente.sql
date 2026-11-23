-- =====================================================================
--  Permite ao ADMIN remover um cliente pelo painel (Minha conta > Clientes).
--  Remove de verdade do Supabase: Authentication > Users (o login)
--  e, em cascata, o perfil, os pedidos e as avaliações desse cliente.
--  Proteções: só admin pode usar; não remove a si mesmo nem outro admin.
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
create or replace function public.admin_delete_user(target uuid)
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  alvo_email text;
begin
  if not public.is_admin() then
    raise exception 'Apenas administradores podem remover clientes.';
  end if;
  if target = auth.uid() then
    raise exception 'Você não pode remover a sua própria conta.';
  end if;

  select email into alvo_email from auth.users where id = target;
  if alvo_email is null then
    -- usuário já não existe no login: limpa só o perfil que sobrou
    delete from public.profiles where id = target;
    return;
  end if;
  if exists (select 1 from public.admins a where lower(a.email) = lower(alvo_email)) then
    raise exception 'Não é possível remover um administrador.';
  end if;

  -- Apaga o login; perfil, pedidos e avaliações saem junto (on delete cascade)
  delete from auth.users where id = target;
end;
$$;

revoke all on function public.admin_delete_user(uuid) from public, anon;
grant execute on function public.admin_delete_user(uuid) to authenticated;
