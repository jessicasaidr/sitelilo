/* =========================================================
   Bloco de produto (galeria + informações + compra)
   Usado na página do produto e no destaque da página inicial
   ========================================================= */
function renderProductView(el, p, { compact = false } = {}) {
  const photos = p.images && p.images.length ? p.images : null;
  const views = [p.icon, "star", "heart", "gift"];
  const colors = [p.color, "yellow", "rose", "cyan"];
  const slide = (k) => photos
    ? `<div class="ph ph-img p-${p.color}"><img src="${esc(photos[k])}" alt="${esc(p.name)} - foto ${k + 1}"></div>`
    : placeholder({ color: colors[k] }, views[k]);
  const count = photos ? photos.length : views.length;
  const cat = catById(p.cat) || { id: "", name: "Produtos" };
  const variants = productVariants(p);   // [{label, price, old}]
  const custom = p.personalizable || p.cat === "personalizados";
  /* Produtos personalizados só com o nome (sem anexar imagem) */
  const SO_NOME = ["Nome Personalizado em Relevo - Plaquinhas", "Placa de Nome Personalizada com Guia de Leitura"];
  const allowImage = custom && !SO_NOME.includes(p.name);

  /* Preço da opção escolhida (com "de/por", parcelas e Pix) */
  const priceHTML = (v) => {
    const off = v.old && v.old > v.price ? Math.round((1 - v.price / v.old) * 100) : 0;
    return `<div class="price">${brl(v.price)}${off ? `<s>${brl(v.old)}</s> <span class="tag-off" style="position:static;vertical-align:middle">-${off}%</span>` : ""}</div>
      <div class="installments" style="margin-top:4px">${installments(v)} · <span class="pix">${brl(pixOf(v))} no Pix</span></div>
      ${maxParcelas() > 1 ? `
      <details class="parcelas">
        <summary>Ver parcelas no cartão</summary>
        <ul>${parcelasList((n) => cardTotal(v, n)).map((x) =>
          `<li><span>${x.n}x de ${brl(x.each)}</span><span>${x.n > 1 ? `total ${brl(x.total)}` : "à vista"}</span></li>`).join("")}
          <li class="pix-row"><span>Pix</span><span>${brl(pixOf(v))}</span></li>
        </ul>
        <small>${hasCardFees() ? "Valores no cartão já incluem as taxas da operadora. " : ""}Pagamento combinado pelo WhatsApp ao finalizar o pedido.</small>
      </details>` : ""}`;
  };

  el.innerHTML = `
    <div class="thumbs">
      ${count > 1 ? [...Array(count)].map((_, k) => `<button type="button" class="${k === 0 ? "on" : ""}" data-k="${k}" aria-label="Imagem ${k + 1}">${slide(k)}</button>`).join("") : ""}
    </div>
    <div class="main-img" id="mainImg">${slide(0)}</div>
    <div class="p-info">
      ${compact ? "" : `<div class="breadcrumb" style="padding-top:0"><a href="/">Início</a> › <a href="produtos${cat.id ? `?cat=${cat.id}` : ""}">${esc(cat.name)}</a> › ${esc(p.name)}</div>`}
      <div class="sold">${p.rating && p.rating.total ? `<a href="#reviews" class="sold-rating">${ratingMini(p, true)}</a> · ` : ""}${p.sold > 0 ? `+${p.sold} vendidos · ` : ""}Idade ${esc(p.ages)}</div>
      <h1>${esc(p.name)}</h1>
      <div id="pvPrice">${priceHTML(variants[0])}</div>

      <div class="opt-label"${variants.length === 1 && /^(1 )?unidade$/i.test(variants[0].label) ? ' style="display:none"' : ""}>${variants.length === 1 ? "" : "Opção: "}<strong id="optName">${esc(variants[0].label)}</strong></div>
      <div class="chips" id="optChips"${variants.length === 1 ? ' style="display:none"' : ""}>${variants.map((v, k) => `<button type="button" class="chip ${k === 0 ? "on" : ""}" data-v="${k}">${esc(v.label)}</button>`).join("")}</div>

      ${p.digital ? "" : `
      <div class="opt-label">Cor principal</div>
      <div class="colors-note">${icon("chat", 16)} Verificar cores disponíveis</div>`}

      ${custom ? `
      <div class="opt-label">Nome para personalizar (opcional)</div>
      <input class="input" id="customName" maxlength="20" placeholder="Ex.: Maria Clara">
      ${allowImage ? `
      <label class="upload">
        <input type="file" hidden accept="image/*" id="uploadFile">
        ${icon("upload", 28)}
        <strong>Deseja anexar uma imagem?</strong>
        <small id="uploadName">PNG ou JPG (opcional)</small>
      </label>` : ""}` : ""}

      <div class="buy-row">
        <div class="qty">
          <button type="button" data-q="-1" aria-label="Diminuir">−</button>
          <input type="text" value="1" inputmode="numeric" aria-label="Quantidade" id="qty">
          <button type="button" data-q="1" aria-label="Aumentar">+</button>
        </div>
        <button class="btn btn-primary" type="button" id="buyBtn">Comprar</button>
      </div>

      ${compact ? `
      <p style="color:var(--ink-soft);margin-top:20px">${shortDesc(p)}</p>
      <a href="produto?id=${p.id}" style="text-decoration:underline;font-weight:800;color:var(--primary)">Ver mais</a>` : `
      <div class="guarantees">
        <div class="guarantee"><span class="ic p-green">${icon("shield", 20)}</span><div><strong>Compra protegida</strong><small>Seus dados cuidados durante toda a compra.</small></div></div>      </div>
      <div class="shipping">
        <div class="opt-label" style="margin-top:0">Meios de envio</div>
        <form class="cep-form" id="shipForm">
          <input class="input" inputmode="numeric" maxlength="9" placeholder="Seu CEP" id="cep" aria-label="CEP" value="${esc(Frete.fmtCep(Frete.cep()))}">
          <button class="btn btn-outline" type="submit">Calcular</button>
        </form>
        <a class="cep-help" href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank" rel="noopener">Não sei meu CEP</a>
        <div id="shipResult"></div>
        <div class="prod-time">${icon("clock", 16)} Prazo de produção: <strong>${producaoTxt()}</strong></div>
      </div>`}
    </div>`;

  /* Galeria */
  $$(".thumbs button", el).forEach((b) => b.onclick = () => {
    $$(".thumbs button", el).forEach((x) => x.classList.remove("on"));
    b.classList.add("on");
    const k = Number(b.dataset.k);
    $("#mainImg", el).innerHTML = slide(k);
  });
  /* Opções */
  const chipGroup = (sel, cb) => $$(sel, el).forEach((b) => b.onclick = () => {
    $$(sel, el).forEach((x) => x.classList.remove("on")); b.classList.add("on"); cb && cb(b);
  });
  let chosen = variants[0];
  chipGroup("#optChips .chip", (b) => {
    chosen = variants[Number(b.dataset.v)];
    $("#optName", el).textContent = chosen.label;
    $("#pvPrice", el).innerHTML = priceHTML(chosen);
    el.dispatchEvent(new CustomEvent("opcao", { detail: chosen }));
  });
  const up = $("#uploadFile", el);
  if (up) up.onchange = () => $("#uploadName", el).textContent = up.files[0]?.name || "PNG ou JPG (opcional)";
  /* Quantidade */
  const qty = $("#qty", el);
  $$("[data-q]", el).forEach((b) => b.onclick = () => qty.value = Math.max(1, (parseInt(qty.value) || 1) + Number(b.dataset.q)));
  /* Comprar */
  $("#buyBtn", el).onclick = () => {
    const opts = [chosen.label, $("#customName", el)?.value.trim()].filter(Boolean).join(" · ");
    Cart.add(p.id, Math.max(1, parseInt(qty.value) || 1), opts, chosen.label);
  };
  /* Frete (Melhor Envio): 3 opções mais baratas para este produto/opção/quantidade */
  const ship = $("#shipForm", el);
  if (ship) {
    const cep = $("#cep", el), out = $("#shipResult", el);
    cep.oninput = () => { cep.value = Frete.fmtCep(cep.value); };
    ship.onsubmit = async (e) => {
      e.preventDefault();
      if (!Frete.valid(cep.value)) { out.innerHTML = `<div class="ship-msg err">Digite um CEP válido.</div>`; return; }
      store.set("lilo_cep", cep.value);
      out.innerHTML = `<div class="ship-msg">Calculando o frete…</div>`;
      try {
        const q = Math.max(1, parseInt(qty.value) || 1);
        const r = await Frete.quote(cep.value, [{ id: p.id, variant: chosen.label, qty: q }]);
        const freeNow = cardTotal(chosen, 1) * q >= STORE.freeShipping;
        out.innerHTML = `<div class="ship-opts">${r.options.map((o, k) => `
          <div class="ship-opt">
            <span class="so-info"><strong>${esc(Frete.label(o))}</strong><small>${Frete.prazo(o)} após o envio</small></span>
            <span class="so-price">${freeNow && k === 0 ? `<b class="free">Grátis</b>` : brl(o.price)}</span>
          </div>`).join("")}</div>
          <small class="ship-note">Valores e prazos estimados: confirmamos o frete com você pelo WhatsApp antes do envio. Frete grátis acima de ${brl(STORE.freeShipping)}.</small>`;
      } catch (err) {
        out.innerHTML = `<div class="ship-msg err">${esc(err.message)}</div>`;
      }
    };
  }
}

function shortDesc(p) {
  if (p.description) {
    const first = p.description.split(/\n\s*\n/)[0].replace(/\{opcao\}/gi, productVariants(p)[0].label);
    return esc(first.length > 260 ? first.slice(0, 257) + "…" : first);
  }
  const cat = catById(p.cat) || { name: "LiloPlay" };
  return `<strong>Diversão e aprendizado em um só produto!</strong> ${esc(p.name)} faz parte da linha ${esc(cat.name)} da Turma da Lilo, criada para estimular a curiosidade e a autonomia das crianças.`;
}
