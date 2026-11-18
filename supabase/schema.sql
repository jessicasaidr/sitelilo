-- =====================================================================
--  LiloPlay — Banco de dados no Supabase
--  Como usar: Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  Pode rodar de novo sem problema (o script é idempotente).
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1) ADMINISTRADORES
--    Quem estiver nesta tabela (com e-mail confirmado) vê o painel admin.
-- ---------------------------------------------------------------------
create table if not exists public.admins (
  email      text primary key,
  created_at timestamptz not null default now()
);

insert into public.admins (email)
values ('suportejessicasaidpessoal@gmail.com')
on conflict (email) do nothing;

alter table public.admins enable row level security;
-- Sem políticas: ninguém lê/escreve pela API. Só a função is_admin() consulta.

-- Retorna true se o usuário logado é administrador (e-mail confirmado).
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from auth.users u
    join public.admins a on lower(a.email) = lower(u.email)
    where u.id = auth.uid()
      and u.email_confirmed_at is not null
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- Atualiza updated_at automaticamente
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------
-- 2) PERFIS DOS CLIENTES (dados completos do usuário)
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id               uuid primary key references auth.users (id) on delete cascade,
  email            text,
  nome             text,
  telefone         text,
  cpf              text,
  data_nascimento  date,
  cep              text,
  rua              text,
  numero           text,
  complemento      text,
  bairro           text,
  cidade           text,
  estado           text,
  receber_novidades boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated
before update on public.profiles
for each row execute function public.set_updated_at();

-- Cria o perfil automaticamente quando alguém se cadastra
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, nome, telefone)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'nome', ''),
    coalesce(new.raw_user_meta_data ->> 'telefone', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;

drop policy if exists "perfil: dono lê"        on public.profiles;
drop policy if exists "perfil: dono atualiza"  on public.profiles;
drop policy if exists "perfil: dono cria"      on public.profiles;
drop policy if exists "perfil: admin lê todos" on public.profiles;

create policy "perfil: dono lê"        on public.profiles for select using (auth.uid() = id);
create policy "perfil: dono atualiza"  on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "perfil: dono cria"      on public.profiles for insert with check (auth.uid() = id);
create policy "perfil: admin lê todos" on public.profiles for select using (public.is_admin());

-- ---------------------------------------------------------------------
-- 3) CATEGORIAS
-- ---------------------------------------------------------------------
create table if not exists public.categories (
  id         text primary key,              -- ex.: 'brinquedos-3d' (vai na URL)
  name       text not null,
  color      text not null default 'blue',  -- blue, green, purple, indigo, magenta, orange, rose, cyan, yellow
  icon       text not null default 'star',
  sort_order int  not null default 0,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

drop policy if exists "categorias: todos leem ativas" on public.categories;
drop policy if exists "categorias: admin gerencia"    on public.categories;

create policy "categorias: todos leem ativas" on public.categories for select using (active or public.is_admin());
create policy "categorias: admin gerencia"    on public.categories for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------
-- 4) PRODUTOS
-- ---------------------------------------------------------------------
create table if not exists public.products (
  id          bigint generated by default as identity primary key,
  name        text not null,
  description text,
  category_id text references public.categories (id) on update cascade on delete set null,
  price       numeric(10,2) not null check (price >= 0),
  old_price   numeric(10,2) check (old_price is null or old_price >= 0),
  color       text not null default 'blue',
  icon        text not null default 'star',
  images      text[] not null default '{}',         -- URLs das fotos (a 1ª é a capa)
  options     text[] not null default '{}',         -- ex.: {'1 unidade','Kit com 3'}
  tags        text[] not null default '{}',         -- queridinhos, lancamentos, promo
  ages        text,                                 -- ex.: '3+'
  sold        int  not null default 0,
  personalizable boolean not null default false,    -- mostra campo de nome/imagem
  active      boolean not null default true,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category_id);

drop trigger if exists trg_products_updated on public.products;
create trigger trg_products_updated
before update on public.products
for each row execute function public.set_updated_at();

alter table public.products enable row level security;

drop policy if exists "produtos: todos leem ativos" on public.products;
drop policy if exists "produtos: admin gerencia"    on public.products;

create policy "produtos: todos leem ativos" on public.products for select using (active or public.is_admin());
create policy "produtos: admin gerencia"    on public.products for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------
-- 5) CONFIGURAÇÕES DA LOJA (linha única, id = 1)
-- ---------------------------------------------------------------------
create table if not exists public.store_settings (
  id               int primary key default 1 check (id = 1),
  name             text not null default 'LiloPlay',
  slogan           text default 'Plataforma de Estudo',
  whatsapp         text default '5500000000000',
  whatsapp_label   text default '(00) 00000-0000',
  phone            text default '(00) 0000-0000',
  email            text default 'contato@liloplay.com.br',
  address          text default 'Rua Exemplo, 123 - Cidade/UF',
  instagram        text default 'liloplay',
  free_shipping    numeric(10,2) not null default 250,
  coupon           text default 'BEMVINDO5',
  max_installments int not null default 3,
  pix_discount     numeric(4,3) not null default 0.05,  -- 0.05 = 5%
  updated_at       timestamptz not null default now()
);

insert into public.store_settings (id) values (1) on conflict (id) do nothing;

alter table public.store_settings enable row level security;

drop policy if exists "config: todos leem"     on public.store_settings;
drop policy if exists "config: admin atualiza" on public.store_settings;

create policy "config: todos leem"     on public.store_settings for select using (true);
create policy "config: admin atualiza" on public.store_settings for update using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------
-- 6) FOTOS DOS PRODUTOS (Storage)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('produtos', 'produtos', true)
on conflict (id) do update set public = true;

drop policy if exists "fotos: todos veem"       on storage.objects;
drop policy if exists "fotos: admin envia"      on storage.objects;
drop policy if exists "fotos: admin atualiza"   on storage.objects;
drop policy if exists "fotos: admin remove"     on storage.objects;

create policy "fotos: todos veem"     on storage.objects for select using (bucket_id = 'produtos');
create policy "fotos: admin envia"    on storage.objects for insert with check (bucket_id = 'produtos' and public.is_admin());
create policy "fotos: admin atualiza" on storage.objects for update using (bucket_id = 'produtos' and public.is_admin());
create policy "fotos: admin remove"   on storage.objects for delete using (bucket_id = 'produtos' and public.is_admin());

-- ---------------------------------------------------------------------
-- 7) DADOS INICIAIS (exemplos — edite/remova pelo painel admin)
-- ---------------------------------------------------------------------
insert into public.categories (id, name, color, icon, sort_order) values
  ('brinquedos-3d',   'Brinquedos 3D',   'magenta', 'puzzle', 1),
  ('kits-educativos', 'Kits Educativos', 'blue',    'cap',    2),
  ('personalizados',  'Personalizados',  'orange',  'star',   3),
  ('jogos',           'Jogos 3D',        'rose',    'phone',  4)
on conflict (id) do nothing;

insert into public.products (name, category_id, price, old_price, color, icon, sold, tags, ages, personalizable, options)
select * from (values
  ('Alfabeto 3D Colorido - Kit A a Z',                  'brinquedos-3d',   89.90, 119.90, 'magenta', 'puzzle', 120, array['queridinhos','promo'],        '3+',    false, array['1 unidade','Kit com 3','Kit com 5']),
  ('Kit Números 0 a 9 com Peças de Encaixe',             'brinquedos-3d',   69.90, null,   'cyan',    'cube',    85, array['queridinhos'],                '3+',    false, array['1 unidade','Kit com 3','Kit com 5']),
  ('Marcador de Página Clip - Letras (10 unds.)',        'brinquedos-3d',   34.90, null,   'purple',  'book',   210, array['queridinhos','lancamentos'],  '5+',    false, array['1 unidade','Kit com 3','Kit com 5']),
  ('Chaveiro Turma da Lilo - Personalizado com Nome',    'personalizados',  29.90, null,   'orange',  'heart',   64, array['queridinhos','lancamentos'],  'Todas', true,  array['1 unidade','Kit com 3','Kit com 5']),
  ('Kit Homeschooling 1º Ano - Português e Matemática',  'kits-educativos', 149.90, null,  'blue',    'cap',     48, array['lancamentos'],                '6+',    false, array['1 unidade']),
  ('Jogo da Memória Turma da Lilo',                      'jogos',           49.90, null,   'rose',    'users',   77, array['lancamentos','queridinhos'],  '3+',    false, array['1 unidade']),
  ('Tabuada Divertida - Fichas Plastificadas',           'kits-educativos', 59.90, 79.90,  'indigo',  'trophy',  92, array['promo'],                      '7+',    false, array['1 unidade']),
  ('Patinhos de Borracha 3D - Kit Contagem',             'brinquedos-3d',   79.90, null,   'yellow',  'cube',    33, array['promo','lancamentos'],        '2+',    false, array['1 unidade','Kit com 3']),
  ('Caderno de Caligrafia Personalizado',                'personalizados',  44.90, null,   'cyan',    'pencil',  58, array['promo'],                      '5+',    true,  array['1 unidade']),
  ('Quebra-Cabeça Sistema Solar 3D',                     'brinquedos-3d',   99.90, 129.90, 'indigo',  'rocket',  41, array['promo','queridinhos'],        '5+',    false, array['1 unidade']),
  ('Kit Atividades em Casa - Coordenação Motora',        'kits-educativos', 119.90, null,  'green',   'house',   26, array['lancamentos'],                '3+',    false, array['1 unidade']),
  ('Bingo das Sílabas',                                  'jogos',           54.90, null,   'magenta', 'flag',    69, array[]::text[],                     '5+',    false, array['1 unidade']),
  ('Cartões de Inglês Ilustrados (50 cartas)',           'jogos',           39.90, null,   'blue',    'flag',    51, array[]::text[],                     '4+',    false, array['1 unidade'])
) as v(name, category_id, price, old_price, color, icon, sold, tags, ages, personalizable, options)
where not exists (select 1 from public.products);
