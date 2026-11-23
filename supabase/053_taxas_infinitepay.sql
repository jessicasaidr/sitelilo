-- =====================================================================
--  Taxas da InfinitePay (repassadas ao cliente), tiradas do app
--  (simulação de R$ 1.000,00 – Plano de recebimento: 1 Dia Útil):
--    1x  cliente paga R$ 1.063,72  →  +6,372%
--    2x  cliente paga R$ 1.128,55  →  +12,855%   (2x de R$ 564,28)
--    3x  cliente paga R$ 1.142,73  →  +14,273%   (3x de R$ 380,91)
--  O site calcula igual ao app: valor no Pix × (1 + acréscimo), com o
--  total e as parcelas arredondados para cima no centavo.
--  Se a InfinitePay mudar as taxas, é só atualizar em
--  Minha conta > Configurações > "Cartão com as taxas da InfinitePay".
--  Supabase > SQL Editor > New query > cole TUDO e clique em Run.
--  (Confira se está no projeto xpzjpglpqnzghbxzmjoo.)
-- =====================================================================
update public.store_settings
set card_fees = array[6.372, 12.855, 14.273]::numeric[],
    max_installments = 3
where id = 1;

-- Conferência
select max_installments, pix_discount, card_fees from public.store_settings where id = 1;
