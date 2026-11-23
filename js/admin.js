/* =========================================================
   Painel do administrador (só aparece para quem está na
   tabela "admins" do Supabase — a segurança real fica nas
   regras RLS do banco, este arquivo é só a interface)
   ========================================================= */
const PASTELS = ["blue", "green", "purple", "indigo", "magenta", "orange", "rose", "cyan", "yellow"];
const ICON_CHOICES = ["star", "trophy", "pencil", "cap", "puzzle", "phone", "flag", "users", "house", "cube", "book", "heart", "gift", "rocket"];
const TAGS = [["queridinhos", "Os queridinhos"], ["lancamentos", "Lançamentos"], ["promo", "Promoções"]];
const BUCKET = "produtos";

const slugify = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
const storagePath = (url) => (String(url).split(`/object/public/${BUCKET}/`)[1] || "").split("?")[0];
/* Número para o link do WhatsApp: só adiciona o 55 (Brasil) se ainda não tiver */
const waNumber = (tel) => {
  const d = String(tel || "").replace(/\D/g, "").replace(/^0+/, "");
  return d.length <= 11 ? "55" + d : d;
};
const toNum = (v) => (v === "" || v == null ? null : Number(String(v).replace(",", ".")));

/* ---------- Modal ---------- */
const Modal = {
  open({ title, body, submitLabel = "Salvar", danger = false, onSubmit, onClose, extraFoot = "" }) {
    $("#modalTitle").textContent = title;
    $("#modalBody").innerHTML = body;
    $("#modalFoot").innerHTML = `
      ${extraFoot}
      <button type="button" class="btn btn-outline" id="modalCancel">Cancelar</button>
      <button type="submit" class="btn btn-primary" id="modalOk" ${danger ? 'style="background:var(--rose-t)"' : ""}>${submitLabel}</button>`;
    this._onClose = onClose;
    $("#modal").classList.add("show");
    document.body.style.overflow = "hidden";
    $("#modalCancel").onclick = () => this.close();
    $("#modalClose").onclick = () => this.close();
    $("#modalForm").onsubmit = async (e) => {
      e.preventDefault();
      const ok = $("#modalOk");
      ok.disabled = true; ok.style.opacity = .6;
      try {
        const done = await onSubmit?.();
        if (done !== false) this.close(true);
      } catch (err) {
        alert("Erro: " + (err?.message || err));
      }
      ok.disabled = false; ok.style.opacity = 1;
    };
    setTimeout(() => $("#modalBody input:not([type=hidden]):not([readonly]), #modalBody textarea")?.focus(), 50);
  },
  close(saved = false) {
    $("#modal").classList.remove("show");
    document.body.style.overflow = "";
    const cb = this._onClose; this._onClose = null;
    cb && cb(saved);
  },
};

const Admin = {
  loaded: {},
  cats: [],
  prods: [],
  clients: [],
  messages: [],
  subscribers: [],

  open(tab) {
    if (tab === "vendas") this.initOrders();
    if (tab === "produtos") this.initProducts();
    if (tab === "categorias") this.initCategories();
    if (tab === "clientes") this.initClients();
    if (tab === "mensagens") this.initMessages();
    if (tab === "newsletter") this.initNewsletter();
    if (tab === "loja") this.initStore();
    if (!this._unreadChecked) { this._unreadChecked = true; this.refreshUnread(); }
  },

  /* =====================================================
     PEDIDOS (registrados no "Iniciar compra")
     ===================================================== */
  async initOrders(force = false) {
    if (this.loaded.vendas && !force) return;
    this.loaded.vendas = true;
    const [{ data: orders, error }, { data: profs }] = await Promise.all([
      DB.client.from("orders").select("*").order("created_at", { ascending: false }),
      DB.client.from("profiles").select("id,nome,email,telefone"),
    ]);
    if (error) { $("#ordList").innerHTML = `<div class="loading">Rode o SQL 056 no Supabase para ativar os pedidos.</div>`; return; }
    this.orders = orders;
    this.ordProfiles = new Map((profs || []).map((p) => [p.id, p]));
    $("#ordSearch").oninput = () => this.renderOrders();
    $("#ordFilter").onchange = () => this.renderOrders();
    this.renderOrders();
  },
  renderOrders() {
    const ST = { pendente: "Pendente", confirmado: "Confirmado", enviado: "Enviado", entregue: "Entregue", cancelado: "Cancelado" };
    const q = $("#ordSearch").value.trim().toLowerCase(), f = $("#ordFilter").value;
    const list = this.orders.filter((o) => {
      const c = this.ordProfiles.get(o.user_id) || {};
      const hay = [o.id, c.nome, c.email, ...(o.items || []).map((i) => i.name)].join(" ").toLowerCase();
      return (!f || o.status === f) && (!q || hay.includes(q));
    });
    $("#ordList").innerHTML = list.length ? list.map((o) => {
      const c = this.ordProfiles.get(o.user_id) || {};
      const tel = String(c.telefone || "").replace(/\D/g, "");
      const wa = tel ? `https://wa.me/${tel.length <= 11 ? "55" + tel : tel}?text=${encodeURIComponent(`Olá, ${(c.nome || "").split(" ")[0]}! Sobre o seu pedido nº ${o.id} no ${STORE.name}:`)}` : "";
      return `<div class="order-card">
        <div class="order-head">
          <div><strong>Pedido nº ${o.id}</strong><small>${new Date(o.created_at).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })} · ${esc(c.nome || c.email || "Cliente")}${wa ? ` · <a href="${wa}" target="_blank" rel="noopener">WhatsApp</a>` : ""}</small></div>
          <select class="status-select st-${o.status}" data-ord="${o.id}">${Object.entries(ST).map(([v, l]) => `<option value="${v}" ${o.status === v ? "selected" : ""}>${l}</option>`).join("")}</select>
        </div>
        <ul class="order-items">${(o.items || []).map((i) => `<li><span>${i.qty}× ${esc(i.name)}${i.opts ? ` <small>(${esc(i.opts)})</small>` : ""}</span><span>${brl(Number(i.price || 0) * i.qty)}</span></li>`).join("")}</ul>
        <div class="order-foot"><span>Total: <strong>${brl(Number(o.total || 0))}</strong></span>${o.pix_total ? `<span class="pix">${brl(Number(o.pix_total))} no Pix</span>` : ""}</div>
      </div>`;
    }).join("") : `<div class="loading">Nenhum pedido encontrado.</div>`;
    $$("[data-ord]").forEach((sel) => sel.onchange = async () => {
      const { error } = await DB.client.from("orders").update({ status: sel.value }).eq("id", sel.dataset.ord);
      if (error) { alert("Não foi possível alterar: " + error.message); return; }
      const o = this.orders.find((x) => String(x.id) === sel.dataset.ord); if (o) o.status = sel.value;
      sel.className = `status-select st-${sel.value}`;
      toast(sel.value === "confirmado" ? "Pedido confirmado! O cliente já pode avaliar ♡" : "Status atualizado!");
      this.refreshUnread();
    });
  },

  /* Mostra "Mensagens (3)" no menu quando há mensagens não lidas */
  async refreshUnread() {
    const { count, error } = await DB.client.from("contact_messages").select("id", { count: "exact", head: true }).eq("lida", false);
    const tab = $('.acc-tab[data-tab="mensagens"]');
    if (!tab) return;
    tab.querySelector(".count")?.remove();
    if (!error && count) tab.insertAdjacentHTML("beforeend", ` <span class="count">${count}</span>`);
    /* Pedidos pendentes */
    const pend = await DB.client.from("orders").select("id", { count: "exact", head: true }).eq("status", "pendente");
    const ot = $('.acc-tab[data-tab="vendas"]');
    if (ot) {
      const old = ot.querySelector(".count"); if (old) old.outerHTML = "";
      if (!pend.error && pend.count) ot.insertAdjacentHTML("beforeend", ` <span class="count">${pend.count}</span>`);
    }
  },

  async fetchCats() {
    const { data, error } = await DB.client.from("categories").select("*").order("sort_order").order("name");
    if (error) throw error;
    this.cats = data;
    return data;
  },
  async fetchProds() {
    const { data, error } = await DB.client.from("products").select("*").order("sort_order").order("id", { ascending: false });
    if (error) throw error;
    this.prods = data;
    return data;
  },
  async fetchBoxes() {
    const { data } = await DB.client.from("shipping_boxes").select("id,name,sort_order").order("sort_order");
    this.boxes = data || [];   // sem o SQL 055 a lista fica vazia (campo de embalagem some)
    return this.boxes;
  },
  catName(id) { return this.cats.find((c) => c.id === id)?.name || "Sem categoria"; },

  /* =====================================================
     PRODUTOS
     ===================================================== */
  async initProducts(force = false) {
    if (this.loaded.produtos && !force) return;
    this.loaded.produtos = true;
    try {
      await Promise.all([this.fetchCats(), this.fetchProds(), this.fetchBoxes()]);
    } catch (err) {
      $("#prodRows").innerHTML = `<tr><td colspan="6" class="loading">Erro ao carregar: ${esc(err.message)}</td></tr>`;
      return;
    }
    $("#prodCatFilter").innerHTML = `<option value="">Todas as categorias</option>` +
      this.cats.map((c) => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join("");
    $("#prodSearch").oninput = () => this.renderProducts();
    $("#prodCatFilter").onchange = () => this.renderProducts();
    $("#prodStatusFilter").onchange = () => this.renderProducts();
    $("#newProduct").onclick = () => this.editProduct(null);
    this.renderProducts();
  },

  renderProducts() {
    const q = $("#prodSearch").value.toLowerCase().trim();
    const cat = $("#prodCatFilter").value;
    const st = $("#prodStatusFilter").value;
    const all = this.prods;
    $("#prodStats").innerHTML = [
      ["indigo", all.length, "produtos"],
      ["green", all.filter((p) => p.active).length, "visíveis na loja"],
      ["rose", all.filter((p) => p.old_price).length, "com desconto"],
      ["yellow", this.cats.length, "categorias"],
    ].map(([c, n, l]) => `<div class="stat p-${c}"><strong>${n}</strong><span>${l}</span></div>`).join("");

    const list = all.filter((p) =>
      (!q || p.name.toLowerCase().includes(q)) &&
      (!cat || p.category_id === cat) &&
      (!st || (st === "on" ? p.active : !p.active)));

    $("#prodRows").innerHTML = list.length ? list.map((r) => {
      const p = DB.mapProduct(r);
      return `<tr>
        <td><div class="t-thumb">${placeholder(p)}</div></td>
        <td><div class="t-name">${esc(p.name)}</div><div class="t-sub">#${p.id} · ${p.sold} vendidos${p.tags.length ? " · " + p.tags.map(esc).join(", ") : ""}</div></td>
        <td class="hide-m">${esc(this.catName(p.cat))}</td>
        <td style="white-space:nowrap">${(() => {
          const { v, multi } = priceInfo(p);
          const vs = productVariants(p);
          return `${multi ? `<div class="t-sub">a partir de</div>` : ""}<strong>${brl(v.price)}</strong>${v.old && v.old > v.price ? ` <s class="t-sub">${brl(v.old)}</s>` : ""}
            ${vs.length > 1 ? `<div class="t-sub">${vs.length} opções</div>` : ""}`;
        })()}</td>
        <td class="hide-m"><button type="button" class="pill ${p.active ? "on" : "off"}" data-toggle="${p.id}" title="Clique para ${p.active ? "ocultar" : "mostrar"}">${p.active ? "Visível" : "Oculto"}</button></td>
        <td><div class="t-actions">
          <a class="icon-btn" href="produto.html?id=${p.id}" target="_blank" title="Ver na loja">${icon("eye", 18)}</a>
          <button type="button" class="icon-btn" data-edit="${p.id}" title="Editar">${icon("pencil", 18)}</button>
          <button type="button" class="icon-btn danger" data-del="${p.id}" title="Remover">${icon("trash", 18)}</button>
        </div></td>
      </tr>`;
    }).join("") : `<tr><td colspan="6" class="loading">Nenhum produto encontrado.</td></tr>`;

    $$("[data-edit]").forEach((b) => b.onclick = () => this.editProduct(this.prods.find((p) => String(p.id) === b.dataset.edit)));
    $$("[data-del]").forEach((b) => b.onclick = () => this.deleteProduct(this.prods.find((p) => String(p.id) === b.dataset.del)));
    $$("[data-toggle]").forEach((b) => b.onclick = () => this.toggleProduct(this.prods.find((p) => String(p.id) === b.dataset.toggle)));
  },

  async toggleProduct(r) {
    const { error } = await DB.client.from("products").update({ active: !r.active }).eq("id", r.id);
    if (error) return alert("Erro: " + error.message);
    r.active = !r.active;
    this.renderProducts();
    toast(r.active ? "Produto visível na loja" : "Produto ocultado");
  },

  async deleteProduct(r) {
    if (!confirm(`Remover o produto "${r.name}"?\n\nEssa ação não pode ser desfeita. Se quiser só tirar da loja por um tempo, use "Oculto".`)) return;
    const { error } = await DB.client.from("products").delete().eq("id", r.id);
    if (error) return alert("Erro: " + error.message);
    const paths = (r.images || []).map(storagePath).filter(Boolean);
    if (paths.length) await DB.client.storage.from(BUCKET).remove(paths);
    this.prods = this.prods.filter((p) => p.id !== r.id);
    this.renderProducts();
    toast("Produto removido");
  },

  editProduct(r) {
    const isNew = !r;
    r = r || { name: "", description: "", category_id: this.cats[0]?.id || "", price: "", old_price: "", color: "blue", icon: "star",
      images: [], options: ["1 unidade"], tags: [], ages: "", sold: 0, personalizable: false, active: true, sort_order: 0 };
    let images = [...(r.images || [])];
    const uploadedNow = [];  // fotos enviadas agora (apagadas se cancelar)
    const removed = [];      // fotos antigas removidas (apagadas ao salvar)

    /* Opções com preço. Produtos antigos (sem "variants") começam com as opções
       antigas usando o preço do produto — é só ajustar o valor de cada uma. */
    const fmt = (v) => (v === "" || v == null ? "" : Number(v).toFixed(2));
    let variants = Array.isArray(r.variants) && r.variants.length
      ? r.variants.map((v) => ({ label: v.label, price: fmt(v.price), pix: fmt(v.pix), old: fmt(v.old_price), box: v.box || "" }))
      : (r.options && r.options.length ? r.options : ["1 unidade"]).map((label) => ({ label, price: fmt(r.price), pix: "", old: fmt(r.old_price) }));

    const body = `
      <div class="form-grid">
        <div class="field full"><label for="mName">Nome do produto *</label><input id="mName" required maxlength="140" value="${esc(r.name)}"></div>
        <div class="field"><label for="mCat">Categoria</label>
          <select id="mCat"><option value="">Sem categoria</option>${this.cats.map((c) => `<option value="${esc(c.id)}" ${c.id === r.category_id ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select></div>
        <div class="field"><label for="mAges">Idade indicada</label><input id="mAges" placeholder="ex.: 3+ ou Todas" value="${esc(r.ages || "")}"></div>
        <div class="field full"><label for="mDesc">Descrição</label><textarea id="mDesc" placeholder="Deixe uma linha em branco para separar parágrafos.">${esc(r.description || "")}</textarea></div>
      </div>

      <div class="field"><label>Opções e preços *</label>
        <div class="variants">
          <div class="v-head"><span>Opção</span><span>Preço normal / cartão (R$)</span><span>Preço no Pix (R$)</span><span>Preço antigo (R$)</span><span>Embalagem</span><span></span></div>
          <div id="mVariants"></div>
        </div>
        <button type="button" class="btn btn-outline" id="mAddVariant" style="padding:8px 14px;margin-top:8px">+ Adicionar opção</button>
        <small style="display:block;margin-top:6px">Ex.: "1 unidade", "Kit com 3", "Kit com 5", cada uma com o seu preço. O "preço no Pix" é opcional: se ficar vazio, usa o desconto Pix das Configurações. O "preço antigo" é opcional e mostra o "de/por" com selo de desconto. A primeira opção já vem selecionada na loja.</small>
      </div>

      <div class="field"><label>Fotos</label>
        <div class="photos" id="mPhotos"></div>
        <small>A primeira foto é a capa. JPG, PNG ou WEBP, até 5 MB cada.</small>
      </div>

      <div class="form-grid">
        <div class="field"><label>Cor do fundo (sem foto)</label>
          <div class="color-pick">${PASTELS.map((c) => `<label title="${c}"><input type="radio" name="mColor" value="${c}" ${c === r.color ? "checked" : ""}><span class="p-${c}"></span></label>`).join("")}</div></div>
        <div class="field"><label>Ícone (sem foto)</label>
          <div class="icon-pick">${ICON_CHOICES.map((ic) => `<label title="${ic}"><input type="radio" name="mIcon" value="${ic}" ${ic === r.icon ? "checked" : ""}><span>${icon(ic, 20)}</span></label>`).join("")}</div></div>
      </div>

      <div class="form-grid">
        <div class="field"><label>Aparece em</label>
          ${TAGS.map(([v, l]) => `<label class="check"><input type="checkbox" name="mTags" value="${v}" ${(r.tags || []).includes(v) ? "checked" : ""}> ${l}</label>`).join("")}</div>
        <div class="field"><label>Opções</label>
          <label class="check"><input type="checkbox" id="mCustom" ${r.personalizable ? "checked" : ""}> Personalizável (campo de nome e imagem)</label>
          <label class="check"><input type="checkbox" id="mActive" ${r.active ? "checked" : ""}> Visível na loja</label></div>
        <div class="field"><label for="mSold">Quantidade vendida (exibida)</label><input id="mSold" type="number" min="0" value="${r.sold ?? 0}"></div>
        ${(this.boxes || []).length ? `<div class="field"><label for="mBox">Embalagem (para o frete)</label>
          <select id="mBox">${this.boxes.map((b) => `<option value="${esc(b.id)}" ${(r.box_id || "P") === b.id ? "selected" : ""}>${esc(b.name)}</option>`).join("")}</select>
          <small>Medidas e peso de cada embalagem: Configurações > Envio.</small></div>` : ""}
        <div class="field"><label for="mSort">Ordem de exibição</label><input id="mSort" type="number" value="${r.sort_order ?? 0}"><small>Menor número aparece primeiro.</small></div>
      </div>`;

    /* Guarda o que já foi digitado antes de redesenhar as linhas */
    const readVariants = () => {
      $$("#mVariants .v-row").forEach((row, k) => {
        variants[k] = {
          label: $(".v-label", row).value,
          price: $(".v-price", row).value,
          pix: $(".v-pix", row).value,
          old: $(".v-old", row).value,
          box: $(".v-box", row) ? $(".v-box", row).value : (variants[k] && variants[k].box) || "",
        };
      });
    };
    const drawVariants = () => {
      $("#mVariants").innerHTML = variants.map((v, k) => `
        <div class="v-row">
          <input class="input v-label" placeholder="ex.: Kit com 3" maxlength="60" value="${esc(v.label)}" aria-label="Nome da opção ${k + 1}">
          <input class="input v-price" type="number" step="0.01" min="0" placeholder="0,00" value="${esc(v.price)}" aria-label="Preço da opção ${k + 1}">
          <input class="input v-pix" type="number" step="0.01" min="0" placeholder="automático" value="${esc(v.pix)}" aria-label="Preço no Pix da opção ${k + 1}">
          <input class="input v-old" type="number" step="0.01" min="0" placeholder="opcional" value="${esc(v.old)}" aria-label="Preço antigo da opção ${k + 1}">
          <select class="input v-box" aria-label="Embalagem da opção ${k + 1}">
            <option value="">Do produto</option>
            ${(this.boxes || []).map((b) => `<option value="${esc(b.id)}" ${v.box === b.id ? "selected" : ""}>${esc(b.name)}</option>`).join("")}
          </select>
          <div class="v-acts">
            ${k > 0 ? `<button type="button" class="icon-btn" data-vup="${k}" title="Subir">↑</button>` : `<span class="v-first" title="Já vem selecionada na loja">★</span>`}
            <button type="button" class="icon-btn danger" data-vdel="${k}" title="Remover opção" ${variants.length === 1 ? "disabled" : ""}>${icon("trash", 16)}</button>
          </div>
        </div>`).join("");
      $$("[data-vdel]").forEach((b) => b.onclick = () => { readVariants(); variants.splice(+b.dataset.vdel, 1); drawVariants(); });
      $$("[data-vup]").forEach((b) => b.onclick = () => {
        readVariants(); const k = +b.dataset.vup; [variants[k - 1], variants[k]] = [variants[k], variants[k - 1]]; drawVariants();
      });
    };

    const drawPhotos = () => {
      $("#mPhotos").innerHTML = images.map((url, k) => `
        <div class="photo">
          <img src="${esc(url)}" alt="">
          ${k === 0 ? `<span class="cover">CAPA</span>` : ""}
          <div class="acts">
            ${k > 0 ? `<button type="button" data-cover="${k}" title="Tornar capa">★</button>` : ""}
            <button type="button" data-rmimg="${k}" title="Remover foto">✕</button>
          </div>
        </div>`).join("") + `
        <label class="photo-add">${icon("upload", 22)}<span id="upLabel">Adicionar fotos</span>
          <input type="file" id="mFiles" accept="image/jpeg,image/png,image/webp" multiple hidden>
        </label>`;
      $$("[data-cover]").forEach((b) => b.onclick = () => { const k = +b.dataset.cover; images.unshift(images.splice(k, 1)[0]); drawPhotos(); });
      $$("[data-rmimg]").forEach((b) => b.onclick = () => {
        const url = images.splice(+b.dataset.rmimg, 1)[0];
        if (!uploadedNow.includes(url)) removed.push(url);
        drawPhotos();
      });
      $("#mFiles").onchange = async (e) => {
        const files = [...e.target.files];
        for (const [n, file] of files.entries()) {
          if (file.size > 5 * 1024 * 1024) { alert(`"${file.name}" tem mais de 5 MB.`); continue; }
          $("#upLabel").textContent = `Enviando ${n + 1}/${files.length}…`;
          const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
          const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
          const { error } = await DB.client.storage.from(BUCKET).upload(path, file, { cacheControl: "3600", contentType: file.type });
          if (error) { alert("Erro ao enviar foto: " + error.message); continue; }
          const url = DB.client.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
          images.push(url); uploadedNow.push(url);
        }
        drawPhotos();
      };
    };

    Modal.open({
      title: isNew ? "Novo produto" : `Editar produto #${r.id}`,
      body,
      submitLabel: isNew ? "Adicionar produto" : "Salvar alterações",
      onSubmit: async () => {
        /* Valida as opções */
        readVariants();
        const clean = [];
        for (const [k, v] of variants.entries()) {
          const label = String(v.label || "").trim();
          const price = toNum(v.price), old = toNum(v.old), pix = toNum(v.pix);
          if (!label && price == null && old == null) continue; // linha vazia: ignora
          if (!label) { alert(`Dê um nome para a opção ${k + 1}.`); return false; }
          if (price == null || isNaN(price) || price < 0) { alert(`Informe o preço da opção "${label}".`); return false; }
          if (clean.some((c) => c.label.toLowerCase() === label.toLowerCase())) { alert(`A opção "${label}" está repetida.`); return false; }
          if (pix != null && !isNaN(pix) && pix > price) { alert(`Em "${label}" o preço no Pix está maior que o preço normal.`); return false; }
          clean.push({ label, price, pix: pix != null && !isNaN(pix) ? pix : null, old_price: old != null && !isNaN(old) ? old : null, ...(v.box ? { box: v.box } : {}) });
        }
        if (!clean.length) { alert("Cadastre pelo menos uma opção com preço."); return false; }
        const noDiscount = clean.filter((v) => v.old_price != null && v.old_price <= v.price).map((v) => v.label);
        if (noDiscount.length && !confirm(`Em "${noDiscount.join('", "')}" o preço antigo é menor ou igual ao preço, então não vai aparecer desconto. Salvar mesmo assim?`)) return false;
        const cheapest = clean.reduce((a, b) => (b.price < a.price ? b : a), clean[0]);

        const row = {
          name: $("#mName").value.trim(),
          category_id: $("#mCat").value || null,
          ages: $("#mAges").value.trim() || null,
          variants: clean,
          options: clean.map((v) => v.label),
          price: cheapest.price,             // menor preço (usado em listagens e filtros)
          old_price: cheapest.old_price,
          description: $("#mDesc").value.trim() || null,
          images,
          color: $("input[name=mColor]:checked")?.value || "blue",
          icon: $("input[name=mIcon]:checked")?.value || "star",
          tags: $$("input[name=mTags]:checked").map((i) => i.value),
          personalizable: $("#mCustom").checked,
          active: $("#mActive").checked,
          sold: parseInt($("#mSold").value) || 0,
          sort_order: parseInt($("#mSort").value) || 0,
        };
        if ($("#mBox")) row.box_id = $("#mBox").value;
        const q = isNew ? DB.client.from("products").insert(row) : DB.client.from("products").update(row).eq("id", r.id);
        const { error } = await q;
        if (error) throw error;
        const paths = removed.map(storagePath).filter(Boolean);
        if (paths.length) await DB.client.storage.from(BUCKET).remove(paths);
        uploadedNow.length = 0;
        await this.fetchProds();
        this.renderProducts();
        toast(isNew ? "Produto adicionado! ♡" : "Produto atualizado!");
      },
      onClose: async (saved) => {
        if (!saved && uploadedNow.length) {
          await DB.client.storage.from(BUCKET).remove(uploadedNow.map(storagePath).filter(Boolean));
        }
      },
    });
    drawPhotos();
    drawVariants();
    $("#mAddVariant").onclick = () => {
      readVariants();
      variants.push({ label: "", price: "", pix: "", old: "", box: "" });
      drawVariants();
      $$("#mVariants .v-label").pop()?.focus();
    };
  },

  /* =====================================================
     CATEGORIAS
     ===================================================== */
  async initCategories(force = false) {
    if (this.loaded.categorias && !force) return;
    this.loaded.categorias = true;
    $("#newCategory").onclick = () => this.editCategory(null);
    try {
      await Promise.all([this.fetchCats(), this.prods.length ? null : this.fetchProds()]);
    } catch (err) {
      $("#catRows").innerHTML = `<tr><td colspan="6" class="loading">Erro ao carregar: ${esc(err.message)}</td></tr>`;
      return;
    }
    this.renderCategories();
  },

  renderCategories() {
    $("#catRows").innerHTML = this.cats.length ? this.cats.map((c) => `
      <tr>
        <td><div class="t-thumb">${placeholder({ color: c.color, icon: c.icon })}</div></td>
        <td><div class="t-name">${esc(c.name)}</div><div class="t-sub">Ordem ${c.sort_order}</div></td>
        <td class="hide-m"><code>${esc(c.id)}</code></td>
        <td>${this.prods.filter((p) => p.category_id === c.id).length}</td>
        <td class="hide-m"><span class="pill ${c.active ? "on" : "off"}">${c.active ? "Visível" : "Oculta"}</span></td>
        <td><div class="t-actions">
          <a class="icon-btn" href="produtos.html?cat=${encodeURIComponent(c.id)}" target="_blank" title="Ver na loja">${icon("eye", 18)}</a>
          <button type="button" class="icon-btn" data-cedit="${esc(c.id)}" title="Editar">${icon("pencil", 18)}</button>
          <button type="button" class="icon-btn danger" data-cdel="${esc(c.id)}" title="Remover">${icon("trash", 18)}</button>
        </div></td>
      </tr>`).join("") : `<tr><td colspan="6" class="loading">Nenhuma categoria ainda.</td></tr>`;
    $$("[data-cedit]").forEach((b) => b.onclick = () => this.editCategory(this.cats.find((c) => c.id === b.dataset.cedit)));
    $$("[data-cdel]").forEach((b) => b.onclick = () => this.deleteCategory(this.cats.find((c) => c.id === b.dataset.cdel)));
  },

  editCategory(c) {
    const isNew = !c;
    c = c || { id: "", name: "", color: "blue", icon: "star", sort_order: this.cats.length + 1, active: true };
    Modal.open({
      title: isNew ? "Nova categoria" : "Editar categoria",
      submitLabel: isNew ? "Adicionar categoria" : "Salvar alterações",
      body: `
        <div class="form-grid">
          <div class="field"><label for="cName">Nome *</label><input id="cName" required maxlength="60" value="${esc(c.name)}"></div>
          <div class="field"><label for="cId">Endereço na URL</label><input id="cId" required pattern="[a-z0-9\\-]+" value="${esc(c.id)}" ${isNew ? "" : "readonly"}>
            <small>${isNew ? "Gerado a partir do nome (só letras minúsculas, números e hífen)." : "Não pode ser alterado."}</small></div>
          <div class="field"><label for="cSort">Ordem no menu</label><input id="cSort" type="number" value="${c.sort_order}"></div>
          <div class="field"><label>&nbsp;</label><label class="check"><input type="checkbox" id="cActive" ${c.active ? "checked" : ""}> Visível na loja</label></div>
          <div class="field full"><label>Cor</label>
            <div class="color-pick">${PASTELS.map((k) => `<label title="${k}"><input type="radio" name="cColor" value="${k}" ${k === c.color ? "checked" : ""}><span class="p-${k}"></span></label>`).join("")}</div></div>
          <div class="field full"><label>Ícone</label>
            <div class="icon-pick">${ICON_CHOICES.map((ic) => `<label title="${ic}"><input type="radio" name="cIcon" value="${ic}" ${ic === c.icon ? "checked" : ""}><span>${icon(ic, 20)}</span></label>`).join("")}</div></div>
        </div>`,
      onSubmit: async () => {
        const row = {
          id: $("#cId").value.trim(),
          name: $("#cName").value.trim(),
          sort_order: parseInt($("#cSort").value) || 0,
          active: $("#cActive").checked,
          color: $("input[name=cColor]:checked")?.value || "blue",
          icon: $("input[name=cIcon]:checked")?.value || "star",
        };
        if (isNew && this.cats.some((x) => x.id === row.id)) { alert("Já existe uma categoria com esse endereço."); return false; }
        const { error } = isNew
          ? await DB.client.from("categories").insert(row)
          : await DB.client.from("categories").update(row).eq("id", c.id);
        if (error) throw error;
        await this.fetchCats();
        this.renderCategories();
        this.loaded.produtos = false; // recarrega filtros de produtos na próxima abertura
        toast(isNew ? "Categoria adicionada!" : "Categoria atualizada!");
      },
    });
    if (isNew) $("#cName").oninput = (e) => $("#cId").value = slugify(e.target.value);
  },

  async deleteCategory(c) {
    const n = this.prods.filter((p) => p.category_id === c.id).length;
    if (!confirm(`Remover a categoria "${c.name}"?${n ? `\n\n${n} produto(s) ficarão "Sem categoria" (não serão apagados).` : ""}`)) return;
    const { error } = await DB.client.from("categories").delete().eq("id", c.id);
    if (error) return alert("Erro: " + error.message);
    await Promise.all([this.fetchCats(), this.fetchProds()]);
    this.renderCategories();
    this.loaded.produtos = false;
    toast("Categoria removida");
  },

  /* =====================================================
     CLIENTES
     ===================================================== */
  async initClients(force = false) {
    if (this.loaded.clientes && !force) return;
    this.loaded.clientes = true;
    const { data, error } = await DB.client.from("profiles").select("*").order("created_at", { ascending: false });
    if (error) {
      $("#cliRows").innerHTML = `<tr><td colspan="5" class="loading">Erro ao carregar: ${esc(error.message)}</td></tr>`;
      return;
    }
    this.clients = data;
    $("#cliSearch").oninput = () => this.renderClients();
    this.renderClients();
  },

  renderClients() {
    const q = $("#cliSearch").value.toLowerCase().trim();
    const list = this.clients.filter((c) => !q || [c.nome, c.email, c.cidade, c.telefone].some((v) => (v || "").toLowerCase().includes(q)));
    $("#cliRows").innerHTML = list.length ? list.map((c) => `
      <tr>
        <td><div class="t-name">${esc(c.nome || "(sem nome)")}</div><div class="t-sub">${esc(c.email || "")}</div></td>
        <td class="hide-m">${esc(c.telefone || "-")}</td>
        <td class="hide-m">${c.cidade ? `${esc(c.cidade)}/${esc(c.estado || "")}` : "-"}</td>
        <td class="hide-m">${new Date(c.created_at).toLocaleDateString("pt-BR")}</td>
        <td><div class="t-actions">
          ${c.telefone ? `<a class="icon-btn" style="background:#dcfce7;color:#16a34a" href="https://wa.me/${waNumber(c.telefone)}" target="_blank" rel="noopener" title="WhatsApp">${icon("wa", 18)}</a>` : ""}
          <button type="button" class="icon-btn" data-cli="${c.id}" title="Ver dados">${icon("eye", 18)}</button>
          ${c.id !== DB.user.id ? `<button type="button" class="icon-btn danger" data-cli-del="${c.id}" title="Remover cliente">${icon("trash", 18)}</button>` : ""}
        </div></td>
      </tr>`).join("") : `<tr><td colspan="5" class="loading">${this.clients.length ? "Nenhum cliente encontrado." : "Nenhum cliente cadastrado ainda."}</td></tr>`;
    $$("[data-cli]").forEach((b) => b.onclick = () => this.viewClient(this.clients.find((c) => c.id === b.dataset.cli)));
    $$("[data-cli-del]").forEach((b) => b.onclick = () => this.deleteClient(this.clients.find((c) => c.id === b.dataset.cliDel)));
  },

  /* Remove o cliente de verdade (login + perfil + pedidos + avaliações) — função admin_delete_user (SQL 057) */
  async deleteClient(c) {
    if (!c) return;
    const quem = c.nome || c.email || "este cliente";
    if (!confirm(`Remover ${quem}?\n\nA conta, o login, os pedidos e as avaliações dessa pessoa serão apagados do Supabase. Isso não pode ser desfeito.`)) return;
    const { error } = await DB.client.rpc("admin_delete_user", { target: c.id });
    if (error) {
      alert(/not find|does not exist|schema cache/i.test(error.message)
        ? "Rode o SQL 057 no Supabase para ativar a remoção de clientes."
        : "Não foi possível remover: " + error.message);
      return;
    }
    this.clients = this.clients.filter((x) => x.id !== c.id);
    this.renderClients();
    toast("Cliente removido.");
  },

  viewClient(c) {
    const row = (k, v) => `<dt>${k}</dt><dd>${v ? esc(v) : "-"}</dd>`;
    const end = c.rua ? `${c.rua}, ${c.numero || "s/n"}${c.complemento ? " - " + c.complemento : ""}\n${c.bairro || ""} - ${c.cidade || ""}/${c.estado || ""}\nCEP ${c.cep || ""}` : "";
    Modal.open({
      title: c.nome || c.email,
      submitLabel: "Fechar",
      body: `<dl class="dl">
        ${row("Nome", c.nome)}${row("E-mail", c.email)}${row("Telefone", c.telefone)}${row("CPF", c.cpf)}
        ${row("Nascimento", c.data_nascimento ? new Date(c.data_nascimento + "T12:00").toLocaleDateString("pt-BR") : "")}
        <dt>Endereço</dt><dd>${end ? esc(end).replace(/\n/g, "<br>") : "-"}</dd>
        ${row("Recebe novidades", c.receber_novidades ? "Sim" : "Não")}
        ${row("Cliente desde", new Date(c.created_at).toLocaleString("pt-BR"))}
      </dl>`,
      onSubmit: () => true,
    });
    $("#modalCancel").hidden = true;
  },

  /* =====================================================
     MENSAGENS DO CONTATO
     ===================================================== */
  async initMessages(force = false) {
    if (this.loaded.mensagens && !force) return;
    this.loaded.mensagens = true;
    const { data, error } = await DB.client.from("contact_messages").select("*").order("created_at", { ascending: false });
    if (error) {
      $("#msgRows").innerHTML = `<tr><td colspan="4" class="loading">${error.code === "42P01" || /does not exist|schema cache/i.test(error.message)
        ? "A tabela de mensagens ainda não existe. Rode o arquivo <strong>supabase/002_newsletter_contato.sql</strong> no SQL Editor do Supabase."
        : "Erro ao carregar: " + esc(error.message)}</td></tr>`;
      return;
    }
    this.messages = data;
    $("#msgSearch").oninput = () => this.renderMessages();
    $("#msgFilter").onchange = () => this.renderMessages();
    this.renderMessages();
  },

  renderMessages() {
    const q = $("#msgSearch").value.toLowerCase().trim();
    const f = $("#msgFilter").value;
    const list = this.messages.filter((m) =>
      (!q || [m.nome, m.email, m.telefone, m.mensagem].some((v) => (v || "").toLowerCase().includes(q))) &&
      (!f || (f === "new" ? !m.lida : m.lida)));
    $("#msgRows").innerHTML = list.length ? list.map((m) => `
      <tr style="${m.lida ? "" : "font-weight:700"}">
        <td>
          <div class="t-name">${m.lida ? "" : `<span class="dot" style="background:var(--rose-t);display:inline-block;margin-right:6px"></span>`}${esc(m.nome)}</div>
          <div class="t-sub">${esc(m.email)}${m.telefone ? " · " + esc(m.telefone) : ""}</div>
        </td>
        <td class="hide-m" style="max-width:340px"><div class="t-sub" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--ink)">${esc(m.mensagem)}</div></td>
        <td class="hide-m" style="white-space:nowrap">${new Date(m.created_at).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</td>
        <td><div class="t-actions">
          <button type="button" class="icon-btn" data-msg="${m.id}" title="Ler">${icon("eye", 18)}</button>
          <button type="button" class="icon-btn danger" data-msgdel="${m.id}" title="Apagar">${icon("trash", 18)}</button>
        </div></td>
      </tr>`).join("") : `<tr><td colspan="4" class="loading">${this.messages.length ? "Nenhuma mensagem encontrada." : "Nenhuma mensagem recebida ainda."}</td></tr>`;
    $$("[data-msg]").forEach((b) => b.onclick = () => this.viewMessage(this.messages.find((m) => String(m.id) === b.dataset.msg)));
    $$("[data-msgdel]").forEach((b) => b.onclick = () => this.deleteMessage(this.messages.find((m) => String(m.id) === b.dataset.msgdel)));
  },

  async viewMessage(m) {
    const subject = encodeURIComponent(`Re: sua mensagem para o ${STORE.name}`);
    Modal.open({
      title: `Mensagem de ${m.nome}`,
      submitLabel: "Fechar",
      body: `<dl class="dl">
          <dt>Nome</dt><dd>${esc(m.nome)}</dd>
          <dt>E-mail</dt><dd><a href="mailto:${esc(m.email)}?subject=${subject}" style="color:var(--primary);font-weight:700">${esc(m.email)}</a></dd>
          <dt>Telefone</dt><dd>${esc(m.telefone || "-")}</dd>
          <dt>Recebida em</dt><dd>${new Date(m.created_at).toLocaleString("pt-BR")}</dd>
        </dl>
        <div class="card-box" style="margin-top:18px;white-space:pre-wrap;padding:18px">${esc(m.mensagem)}</div>`,
      extraFoot: `<button type="button" class="btn btn-outline" id="msgToggle" style="margin-right:auto">Marcar como não lida</button>
        <a class="btn btn-outline" href="mailto:${esc(m.email)}?subject=${subject}">Responder por e-mail</a>`,
      onSubmit: () => true,
    });
    $("#modalCancel").hidden = true;
    const setRead = async (lida) => {
      const { error } = await DB.client.from("contact_messages").update({ lida }).eq("id", m.id);
      if (error) return alert("Erro: " + error.message);
      m.lida = lida;
      this.renderMessages();
      this.refreshUnread();
    };
    $("#msgToggle").onclick = async () => { await setRead(false); Modal.close(); };
    if (!m.lida) await setRead(true);
  },

  async deleteMessage(m) {
    if (!confirm(`Apagar a mensagem de "${m.nome}"? Essa ação não pode ser desfeita.`)) return;
    const { error } = await DB.client.from("contact_messages").delete().eq("id", m.id);
    if (error) return alert("Erro: " + error.message);
    this.messages = this.messages.filter((x) => x.id !== m.id);
    this.renderMessages();
    this.refreshUnread();
    toast("Mensagem apagada");
  },

  /* =====================================================
     NEWSLETTER
     ===================================================== */
  async initNewsletter(force = false) {
    if (this.loaded.newsletter && !force) return;
    this.loaded.newsletter = true;
    const { data, error } = await DB.client.from("newsletter").select("*").order("created_at", { ascending: false });
    if (error) {
      $("#newsRows").innerHTML = `<tr><td colspan="3" class="loading">${error.code === "42P01" || /does not exist|schema cache/i.test(error.message)
        ? "A tabela da newsletter ainda não existe. Rode o arquivo <strong>supabase/002_newsletter_contato.sql</strong> no SQL Editor do Supabase."
        : "Erro ao carregar: " + esc(error.message)}</td></tr>`;
      return;
    }
    this.subscribers = data;
    $("#newsSearch").oninput = () => this.renderNewsletter();
    $("#newsCsv").onclick = () => this.exportNewsletter();
    this.renderNewsletter();
  },

  renderNewsletter() {
    const q = $("#newsSearch").value.toLowerCase().trim();
    const list = this.subscribers.filter((s) => !q || s.email.toLowerCase().includes(q));
    $("#newsCsv").textContent = `Baixar planilha (${this.subscribers.length})`;
    $("#newsRows").innerHTML = list.length ? list.map((s) => `
      <tr>
        <td class="t-name" style="word-break:break-all">${esc(s.email)}</td>
        <td style="white-space:nowrap">${new Date(s.created_at).toLocaleDateString("pt-BR")}</td>
        <td><div class="t-actions">
          <button type="button" class="icon-btn danger" data-newsdel="${s.id}" title="Remover da lista">${icon("trash", 18)}</button>
        </div></td>
      </tr>`).join("") : `<tr><td colspan="3" class="loading">${this.subscribers.length ? "Nenhum e-mail encontrado." : "Nenhum e-mail cadastrado ainda."}</td></tr>`;
    $$("[data-newsdel]").forEach((b) => b.onclick = async () => {
      const s = this.subscribers.find((x) => String(x.id) === b.dataset.newsdel);
      if (!confirm(`Remover ${s.email} da newsletter?`)) return;
      const { error } = await DB.client.from("newsletter").delete().eq("id", s.id);
      if (error) return alert("Erro: " + error.message);
      this.subscribers = this.subscribers.filter((x) => x.id !== s.id);
      this.renderNewsletter();
      toast("E-mail removido da lista");
    });
  },

  exportNewsletter() {
    if (!this.subscribers.length) return toast("A lista ainda está vazia.");
    // CSV com ";" e BOM para abrir certinho no Excel em português
    const rows = [["email", "data_cadastro"], ...this.subscribers.map((s) => [s.email, new Date(s.created_at).toLocaleString("pt-BR")])];
    const csv = "﻿" + rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(";")).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    a.download = `newsletter-liloplay-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  },

  /* =====================================================
     CONFIGURAÇÕES DA LOJA
     ===================================================== */
  async initStore(force = false) {
    if (this.loaded.loja && !force) return;
    this.loaded.loja = true;
    const { data: s, error } = await DB.client.from("store_settings").select("*").eq("id", 1).maybeSingle();
    if (error || !s) return showMsg("#storeMsg", "Erro ao carregar configurações" + (error ? `: ${esc(error.message)}` : ". Rode o schema.sql no Supabase."), false);
    const map = { sName: "name", sSlogan: "slogan", sWa: "whatsapp", sWaLabel: "whatsapp_label", sPhone: "phone", sEmail: "email",
      sInsta: "instagram", sAddr: "address", sFree: "free_shipping", sInst: "max_installments" };
    Object.entries(map).forEach(([id, k]) => $("#" + id).value = s[k] ?? "");
    $("#sPix").value = Math.round(Number(s.pix_discount || 0) * 1000) / 10;

    /* Envio: CEP de origem, prazo de produção e embalagens */
    const fmtCep = (v) => { v = String(v || "").replace(/\D/g, "").slice(0, 8); return v.length > 5 ? v.slice(0, 5) + "-" + v.slice(5) : v; };
    $("#sOrigin").value = fmtCep(s.origin_cep || "");
    $("#sOrigin").oninput = (e) => { e.target.value = fmtCep(e.target.value); };
    $("#sProdMin").value = s.production_days_min ?? 7;
    $("#sProdMax").value = s.production_days_max ?? 12;
    const { data: boxes, error: boxErr } = await DB.client.from("shipping_boxes").select("*").order("sort_order");
    $("#sBoxes").innerHTML = boxErr
      ? `<div class="loading">Rode o SQL 055 no Supabase para ativar as embalagens.</div>`
      : `<div class="box-row box-head"><span>Embalagem</span><span>Altura</span><span>Largura</span><span>Compr.</span><span>Peso (kg)</span></div>` +
        boxes.map((b) => `
        <div class="box-row" data-box="${esc(b.id)}">
          <input class="input bx-name" value="${esc(b.name)}" aria-label="Nome da embalagem">
          <input class="input bx-h" type="number" step="0.1" min="0.1" value="${esc(b.height)}" aria-label="Altura (cm)">
          <input class="input bx-w" type="number" step="0.1" min="0.1" value="${esc(b.width)}" aria-label="Largura (cm)">
          <input class="input bx-l" type="number" step="0.1" min="0.1" value="${esc(b.length)}" aria-label="Comprimento (cm)">
          <input class="input bx-kg" type="number" step="0.01" min="0.01" value="${esc(b.weight)}" aria-label="Peso (kg)">
        </div>`).join("");

    /* Cartão: para cada parcela, o "cliente paga" do simulador da InfinitePay numa venda de R$ 1.000,00.
       No banco fica o acréscimo em % (ex.: 1.142,82 → 14,282%). */
    const fees = Array.isArray(s.card_fees)
      ? s.card_fees.map((x) => (x == null ? "" : (Math.round(1000 * (1 + Number(x) / 100) * 100) / 100).toFixed(2))) : [];
    const drawFees = () => {
      $$("#sFees input").forEach((inp, k) => { fees[k] = inp.value; });
      const n = Math.max(1, Math.min(12, parseInt($("#sInst").value) || 1));
      $("#sFees").innerHTML = [...Array(n)].map((_, k) => `
        <label class="fee"><span>${k + 1}x</span><input type="number" step="0.01" min="1000" max="1500" placeholder="ex.: 1142,73"
          value="${esc(fees[k] ?? "")}" aria-label="Cliente paga em ${k + 1}x numa venda de R$ 1.000"></label>`).join("");
    };
    drawFees();
    $("#sInst").oninput = drawFees;

    $("#storeForm").onsubmit = async (e) => {
      e.preventDefault();
      setBusy(e.target, true);
      const row = {};
      Object.entries(map).forEach(([id, k]) => row[k] = $("#" + id).value.trim() || null);
      row.name = row.name || "LiloPlay";
      row.whatsapp = (row.whatsapp || "").replace(/\D/g, "");
      row.instagram = (row.instagram || "").replace(/^@/, "");
      row.free_shipping = toNum(row.free_shipping) ?? 0;
      row.max_installments = parseInt(row.max_installments) || 1;
      row.pix_discount = (toNum($("#sPix").value) || 0) / 100;
      /* Cartão: todas as parcelas preenchidas ou todas vazias (sem repasse) */
      const feeVals = $$("#sFees input").map((inp) => toNum(inp.value));
      if (feeVals.every((x) => x == null)) row.card_fees = null;
      else if (feeVals.some((x) => x == null || isNaN(x) || x < 1000 || x > 1500)) {
        setBusy(e.target, false);
        return showMsg("#storeMsg", "Preencha o valor de todas as parcelas (entre 1000 e 1500, simulando uma venda de R$ 1.000,00) ou deixe todas vazias.", false);
      } else row.card_fees = feeVals.map((x) => Math.round((x - 1000) / 10 * 10000) / 10000);  // % de acréscimo
      row.origin_cep = $("#sOrigin").value.replace(/\D/g, "") || null;
      if (row.origin_cep && row.origin_cep.length !== 8) { setBusy(e.target, false); return showMsg("#storeMsg", "CEP de origem inválido.", false); }
      row.production_days_min = parseInt($("#sProdMin").value) || 0;
      row.production_days_max = Math.max(row.production_days_min, parseInt($("#sProdMax").value) || 0);
      row.updated_at = new Date().toISOString();
      const { error: err } = await DB.client.from("store_settings").update(row).eq("id", 1);
      if (err) { setBusy(e.target, false); return showMsg("#storeMsg", `Não foi possível salvar: ${esc(err.message)}`, false); }
      /* Embalagens */
      for (const r of $$("#sBoxes .box-row[data-box]")) {
        const b = { name: $(".bx-name", r).value.trim() || r.dataset.box, height: toNum($(".bx-h", r).value), width: toNum($(".bx-w", r).value),
          length: toNum($(".bx-l", r).value), weight: toNum($(".bx-kg", r).value) };
        if ([b.height, b.width, b.length, b.weight].some((x) => x == null || isNaN(x) || x <= 0)) {
          setBusy(e.target, false); return showMsg("#storeMsg", `Preencha medidas e peso da embalagem "${esc(b.name)}".`, false);
        }
        const { error: be } = await DB.client.from("shipping_boxes").update(b).eq("id", r.dataset.box);
        if (be) { setBusy(e.target, false); return showMsg("#storeMsg", `Não foi possível salvar a embalagem: ${esc(be.message)}`, false); }
      }
      setBusy(e.target, false);
      showMsg("#storeMsg", "Configurações salvas! Elas já valem para todo o site.");
    };
  },
};
window.Admin = Admin;
