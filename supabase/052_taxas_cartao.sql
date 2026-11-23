-- =====================================================================
--  Cartão com as taxas da InfinitePay repassadas ao cliente.
--  Cria o campo onde fica o acréscimo (%) de cada parcela.
--  Depois de rodar, preencha em: Minha conta > Configurações >
--  "Cartão com as taxas da InfinitePay (cliente paga)":
--    para cada parcela, o valor que o simulador do app mostra que o
--    CLIENTE PAGA numa venda de R$ 1.000,00 (ex.: 3x → 1142,82).
--
--  Como o site calcula (igual ao app):
--    cliente paga em Nx = valor no Pix × (1 + acréscimo Nx)
--    parcela = total ÷ N, arredondada para cima no centavo
--  A compra continua sendo finalizada pelo WhatsApp.
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
alter table public.store_settings
  add column if not exists card_fees numeric[];

comment on column public.store_settings.card_fees is
  'Acréscimo do cartão (%) por parcela: posição 1 = 1x, 2 = 2x, 3 = 3x... Nulo = sem repasse (parcelas sem juros).';

-- Até 3 parcelas
update public.store_settings set max_installments = 3 where id = 1;

-- Conferência
select max_installments, pix_discount, card_fees from public.store_settings where id = 1;
