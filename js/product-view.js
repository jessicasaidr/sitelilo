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
  const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const swatches = ["#f43f5e", "#f97316", "#facc15", "#10b981", "#3b82f6", "#a855f7"];
  const quantities = p.options && p.options.length ? p.options : p.digital ? ["Arquivo digital (PDF)"] : ["1 unidade", "Kit com 3", "Kit com 5"];
  const custom = p.personalizable || p.cat === "personalizados";

  el.innerHTML = `
    <div class="thumbs">
      ${count > 1 ? [...Array(count)].map((_, k) => `<button type="button" class="${k === 0 ? "on" : ""}" data-k="${k}" aria-label="Imagem ${k + 1}">${slide(k)}</button>`).join("") : ""}
    </div>
    <div class="main-img" id="mainImg">${slide(0)}</div>
    <div class="p-info">
      ${compact ? "" : `<div class="breadcrumb" style="padding-top:0"><a href="index.html">Início</a> › <a href="produtos.html${cat.id ? `?cat=${cat.id}` : ""}">${esc(cat.name)}</a> › ${esc(p.name)}</div>`}
      <div class="sold">+${p.sold} vendidos · Idade ${p.ages}</div>
      <h1>${esc(p.name)}</h1>
      <div class="price">${brl(p.price)}${p.old ? `<s>${brl(p.old)}</s> <span class="tag-off" style="position:static;vertical-align:middle">-${off}%</span>` : ""}</div>
      <div class="installments" style="margin-top:4px">${installments(p.price)} · <span class="pix">${brl(p.price * (1 - STORE.pixDiscount))} no Pix</span></div>

      <div class="opt-label">Opção: <strong id="optName">${esc(quantities[0])}</strong></div>
      <div class="chips" id="optChips">${quantities.map((q, k) => `<button type="button" class="chip ${k === 0 ? "on" : ""}">${esc(q)}</button>`).join("")}</div>

      ${p.digital ? "" : `
      <div class="opt-label">Cor principal</div>
      <div class="chips" id="swatches">${swatches.map((c, k) => `<button type="button" class="swatch ${k === 0 ? "on" : ""}" style="background:${c}" aria-label="Cor ${k + 1}"></button>`).join("")}</div>`}

      ${custom ? `
      <div class="opt-label">Nome para personalizar (opcional)</div>
      <input class="input" id="customName" maxlength="20" placeholder="Ex.: Maria Clara">
      ${custom ? `
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
      <a href="produto.html?id=${p.id}" style="text-decoration:underline;font-weight:800;color:var(--primary)">Ver mais</a>` : `
      <div class="guarantees">
        <div class="guarantee"><span class="ic p-green">${icon("shield", 20)}</span><div><strong>Compra protegida</strong><small>Seus dados cuidados durante toda a compra.</small></div></div>
        <div class="guarantee"><span class="ic p-blue">${icon("swap", 20)}</span><div><strong>Trocas e devoluções</strong><small>Se não gostar, você pode trocar ou devolver.</small></div></div>
      </div>
      <div class="shipping">
        <div class="opt-label" style="margin-top:0">Meios de envio</div>
        <form class="inline-form" id="shipForm">
          <input inputmode="numeric" maxlength="9" placeholder="Seu CEP" id="cep" aria-label="CEP">
          <button class="btn btn-outline" type="submit">Calcular</button>
        </form>
        <div class="ship-result" id="shipResult"></div>
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
  chipGroup("#optChips .chip", (b) => $("#optName", el).textContent = b.textContent);
  chipGroup("#swatches .swatch");
  const up = $("#uploadFile", el);
  if (up) up.onchange = () => $("#uploadName", el).textContent = up.files[0]?.name || "PNG ou JPG (opcional)";
  /* Quantidade */
  const qty = $("#qty", el);
  $$("[data-q]", el).forEach((b) => b.onclick = () => qty.value = Math.max(1, (parseInt(qty.value) || 1) + Number(b.dataset.q)));
  /* Comprar */
  $("#buyBtn", el).onclick = () => {
    const opts = [$("#optName", el).textContent, $("#customName", el)?.value.trim()].filter(Boolean).join(" · ");
    Cart.add(p.id, Math.max(1, parseInt(qty.value) || 1), opts);
  };
  /* Frete (simulação) */
  const ship = $("#shipForm", el);
  if (ship) {
    const cep = $("#cep", el);
    cep.oninput = () => { let v = cep.value.replace(/\D/g, "").slice(0, 8); cep.value = v.length > 5 ? v.slice(0, 5) + "-" + v.slice(5) : v; };
    ship.onsubmit = (e) => {
      e.preventDefault();
      if (cep.value.replace(/\D/g, "").length !== 8) { $("#shipResult", el).innerHTML = `<span style="color:var(--rose-t)">Digite um CEP válido.</span>`; return; }
      store.set("lilo_cep", cep.value);
      $("#shipResult", el).innerHTML = `Enviamos para o CEP <strong>${cep.value}</strong>! O valor do frete é informado pelo WhatsApp ao concluir o pedido.<br><small style="color:var(--ink-soft)">Frete grátis em compras acima de ${brl(STORE.freeShipping)}.</small>`;
    };
  }
}

function shortDesc(p) {
  if (p.description) {
    const first = p.description.split(/\n\s*\n/)[0];
    return esc(first.length > 260 ? first.slice(0, 257) + "…" : first);
  }
  const cat = catById(p.cat) || { name: "LiloPlay" };
  return `<strong>Diversão e aprendizado em um só produto!</strong> ${esc(p.name)} faz parte da linha ${esc(cat.name)} da Turma da Lilo, criada para estimular a curiosidade e a autonomia das crianças.`;
}
