// =====================================================================
//  Função "frete" (Supabase Edge Function) — cotação no Melhor Envio
//
//  O site manda: { cep: "01001000", items: [{ id: 3, variant: "Unidade", qty: 2 }] }
//  A função busca no banco a embalagem (medidas/peso) e o valor de cada item,
//  pede a cotação ao Melhor Envio e devolve as 3 opções mais baratas.
//
//  Segredos (Supabase > Edge Functions > Secrets):
//    MELHOR_ENVIO_TOKEN    token gerado no painel do Melhor Envio (permissão shipping-calculate)
//    MELHOR_ENVIO_SANDBOX  "true" para usar o ambiente de teste (opcional; padrão = produção)
//  SUPABASE_URL e SUPABASE_ANON_KEY já existem automaticamente nas Edge Functions.
// =====================================================================

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

type Box = { id: string; height: number; width: number; length: number; weight: number };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Use POST." }, 405);

  try {
    const token = Deno.env.get("MELHOR_ENVIO_TOKEN");
    if (!token) return json({ error: "Frete ainda não configurado (falta o token do Melhor Envio)." }, 500);
    const base = Deno.env.get("MELHOR_ENVIO_SANDBOX") === "true"
      ? "https://sandbox.melhorenvio.com.br" : "https://melhorenvio.com.br";

    const { cep, items } = await req.json();
    const to = String(cep || "").replace(/\D/g, "");
    if (to.length !== 8) return json({ error: "CEP inválido." }, 400);
    if (!Array.isArray(items) || !items.length || items.length > 50) return json({ error: "Carrinho vazio." }, 400);

    /* Lê o banco com a chave pública (as tabelas são de leitura pública) */
    const SB = Deno.env.get("SUPABASE_URL")!, KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const get = async (path: string) => {
      const r = await fetch(`${SB}/rest/v1/${path}`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } });
      if (!r.ok) throw new Error(`Banco: ${r.status}`);
      return r.json();
    };
    const ids = [...new Set(items.map((i: { id: number }) => Number(i.id)).filter(Number.isFinite))];
    const [products, boxes, settings] = await Promise.all([
      get(`products?select=id,name,price,variants,box_id&active=eq.true&id=in.(${ids.join(",")})`),
      get("shipping_boxes?select=id,height,width,length,weight"),
      get("store_settings?select=origin_cep,email,production_days_min,production_days_max&id=eq.1"),
    ]);
    const conf = settings[0] || {};
    const from = String(conf.origin_cep || "33930810").replace(/\D/g, "");
    const boxById = new Map<string, Box>(boxes.map((b: Box) => [b.id, b]));

    /* Monta os volumes: cada item usa a embalagem da opção (ex.: 50 unidades → M) ou a do produto */
    const pack = [];
    for (const it of items) {
      const p = products.find((x: { id: number }) => x.id === Number(it.id));
      if (!p) continue;
      const v = (Array.isArray(p.variants) ? p.variants : []).find((x: { label: string }) => x.label === it.variant) || {};
      const box = boxById.get(v.box || p.box_id || "P") || boxById.get("P");
      if (!box) continue;
      const qty = Math.max(1, Math.min(99, parseInt(it.qty) || 1));
      pack.push({
        id: `${p.id}-${pack.length}`,
        width: Number(box.width), height: Number(box.height), length: Number(box.length),
        weight: Number(box.weight),
        insurance_value: Number(v.pix ?? v.price ?? p.price) || 0,
        quantity: qty,
      });
    }
    if (!pack.length) return json({ error: "Produtos não encontrados." }, 400);

    /* Cotação no Melhor Envio */
    const r = await fetch(`${base}/api/v2/me/shipment/calculate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "User-Agent": `LiloPlay (${conf.email || "contato@liloplay.com.br"})`,
      },
      body: JSON.stringify({
        from: { postal_code: from },
        to: { postal_code: to },
        products: pack,
        options: { receipt: false, own_hand: false },
      }),
    });
    const data = await r.json().catch(() => null);
    if (!r.ok || !Array.isArray(data)) {
      console.error("Melhor Envio:", r.status, JSON.stringify(data));
      return json({ error: "Não foi possível calcular o frete agora. Combinamos pelo WhatsApp." }, 502);
    }

    /* 3 opções mais baratas, com o prazo da transportadora */
    const options = data
      .filter((s) => !s.error && (s.custom_price ?? s.price) != null)
      .map((s) => {
        const range = s.custom_delivery_range || s.delivery_range || {};
        const days = Number(s.custom_delivery_time ?? s.delivery_time) || 0;
        return {
          id: s.id,
          name: s.name,
          company: s.company?.name || "",
          price: Number(s.custom_price ?? s.price),
          days_min: Number(range.min ?? days) || days,
          days_max: Number(range.max ?? days) || days,
        };
      })
      .sort((a, b) => a.price - b.price)
      .slice(0, 3);

    if (!options.length) return json({ error: "Nenhuma transportadora atende esse CEP. Combinamos pelo WhatsApp." }, 404);
    return json({
      options,
      production: { min: Number(conf.production_days_min ?? 7), max: Number(conf.production_days_max ?? 12) },
    });
  } catch (e) {
    console.error(e);
    return json({ error: "Erro ao calcular o frete. Combinamos pelo WhatsApp." }, 500);
  }
});
