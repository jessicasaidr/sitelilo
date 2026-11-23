-- =====================================================================
--  FRETE COM O MELHOR ENVIO
--  1) Configurações de envio da loja (CEP de origem e prazo de produção)
--  2) Embalagens (envelope, caixa P, caixa M) com medidas e peso estimado
--  3) Embalagem de cada produto (e das opções de 50/100 unidades)
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
--  Pode rodar de novo sem problema.
-- =====================================================================

-- 1) Loja ----------------------------------------------------------------
alter table public.store_settings
  add column if not exists origin_cep          text default '33930810',
  add column if not exists production_days_min int  default 7,
  add column if not exists production_days_max int  default 12;

update public.store_settings
set origin_cep = '33930810', production_days_min = 7, production_days_max = 12
where id = 1;

-- 2) Embalagens -----------------------------------------------------------
--   medidas em cm; peso em kg = embalagem + produto (ESTIMADO, confirmado no WhatsApp)
create table if not exists public.shipping_boxes (
  id         text primary key,
  name       text    not null,
  height     numeric not null,   -- altura (cm)
  width      numeric not null,   -- largura (cm)
  length     numeric not null,   -- comprimento (cm)
  weight     numeric not null,   -- peso total estimado (kg)
  sort_order int     default 0
);

insert into public.shipping_boxes (id, name, height, width, length, weight, sort_order) values
  ('envelope', 'Envelope bolha G', 4,  28, 40, 0.15, 1),
  ('P',        'Caixa P',          8,  16, 24, 0.35, 2),
  ('M',        'Caixa M',          13, 22, 30, 0.80, 3)
on conflict (id) do nothing;

alter table public.shipping_boxes enable row level security;
drop policy if exists "caixas: todos leem"      on public.shipping_boxes;
drop policy if exists "caixas: admin gerencia"  on public.shipping_boxes;
create policy "caixas: todos leem"     on public.shipping_boxes for select using (true);
create policy "caixas: admin gerencia" on public.shipping_boxes for all using (public.is_admin()) with check (public.is_admin());

-- 3) Embalagem de cada produto (padrão: Caixa P) ---------------------------
alter table public.products
  add column if not exists box_id text default 'P' references public.shipping_boxes(id) on update cascade on delete set default;

update public.products set box_id = 'P' where box_id is null;

update public.products set box_id = 'envelope' where name in (
  'Placa de Nome Personalizada com Guia de Leitura',
  'Nome Personalizado em Relevo - Plaquinhas',
  'Medalhas de 1º, 2º e 3º Lugar',
  'Bastões Coloridos - Coordenação e Cores',
  'Contador de Sílabas - Clique Numérico 1 a 5',
  'Sinalizadores Certo, Errado e Stop'
);

update public.products set box_id = 'M' where name in (
  'Tabuleiro Alfanumérico de Cliques - Tipo Teclado',
  'Pranchas de Encaixe - Alfabeto e Números',
  'Prancha de Formas Geométricas - Encaixe',
  'Kit Sensorial - Peneira, Pá, Pinça e Rastelo',
  'Cilindro Giratório de Operações',
  'Ábaco Vertical C-D-U',
  'Fichas Sobrepostas - Sistema de Numeração',
  'Bandeja de Atividades com Suporte para Cartão',
  'Kit Classificação por Cores - 6 Potes',
  'Caça-Palavras Deslizante'
);

-- Opções de 50 e 100 unidades vão na Caixa M (as demais usam a embalagem do produto)
update public.products p
set variants = (
      select jsonb_agg(
               case when x->>'label' in ('50 unidades', '100 unidades')
                    then x || '{"box":"M"}'::jsonb else x end
               order by ord)
      from jsonb_array_elements(p.variants) with ordinality as e(x, ord)
    )
where jsonb_typeof(p.variants) = 'array'
  and exists (select 1 from jsonb_array_elements(p.variants) x where x->>'label' in ('50 unidades', '100 unidades'));

-- Conferência
select b.name as embalagem, count(p.id) as produtos
from public.shipping_boxes b left join public.products p on p.box_id = b.id and p.active
group by b.name, b.sort_order order by b.sort_order;
