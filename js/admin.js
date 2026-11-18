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

  open(tab) {
    if (tab === "produtos") this.initProducts();
    if (tab === "categorias") this.initCategories();
    if (tab === "clientes") this.initClients();
    if (tab === "loja") this.initStore();
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
  catName(id) { return this.cats.find((c) => c.id === id)?.name || "Sem categoria"; },

  /* =====================================================
     PRODUTOS
     ===================================================== */
  async initProducts(force = false) {
    if (this.loaded.produtos && !force) return;
    this.loaded.produtos = true;
    try {
      await Promise.all([this.fetchCats(), this.fetchProds()]);
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
        <td style="white-space:nowrap"><strong>${brl(p.price)}</strong>${p.old ? `<div class="t-sub"><s>${brl(p.old)}</s></div>` : ""}</td>
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

    const body = `
      <div class="form-grid">
        <div class="field full"><label for="mName">Nome do produto *</label><input id="mName" required maxlength="140" value="${esc(r.name)}"></div>
        <div class="field"><label for="mCat">Categoria</label>
          <select id="mCat"><option value="">Sem categoria</option>${this.cats.map((c) => `<option value="${esc(c.id)}" ${c.id === r.category_id ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select></div>
        <div class="field"><label for="mAges">Idade indicada</label><input id="mAges" placeholder="ex.: 3+ ou Todas" value="${esc(r.ages || "")}"></div>
        <div class="field"><label for="mPrice">Preço (R$) *</label><input id="mPrice" required type="number" step="0.01" min="0" value="${r.price !== "" && r.price != null ? Number(r.price).toFixed(2) : ""}"></div>
        <div class="field"><label for="mOld">Preço antigo (R$)</label><input id="mOld" type="number" step="0.01" min="0" value="${r.old_price != null && r.old_price !== "" ? Number(r.old_price).toFixed(2) : ""}"><small>Preencha para mostrar "de/por" e o selo de desconto.</small></div>
        <div class="field full"><label for="mDesc">Descrição</label><textarea id="mDesc" placeholder="Deixe uma linha em branco para separar parágrafos.">${esc(r.description || "")}</textarea></div>
        <div class="field full"><label for="mOpts">Opções de compra (uma por linha)</label><textarea id="mOpts" style="min-height:90px" placeholder="1 unidade&#10;Kit com 3&#10;Kit com 5">${esc((r.options || []).join("\n"))}</textarea></div>
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
        <div class="field"><label for="mSort">Ordem de exibição</label><input id="mSort" type="number" value="${r.sort_order ?? 0}"><small>Menor número aparece primeiro.</small></div>
      </div>`;

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
        const row = {
          name: $("#mName").value.trim(),
          category_id: $("#mCat").value || null,
          ages: $("#mAges").value.trim() || null,
          price: toNum($("#mPrice").value),
          old_price: toNum($("#mOld").value),
          description: $("#mDesc").value.trim() || null,
          options: $("#mOpts").value.split("\n").map((s) => s.trim()).filter(Boolean),
          images,
          color: $("input[name=mColor]:checked")?.value || "blue",
          icon: $("input[name=mIcon]:checked")?.value || "star",
          tags: $$("input[name=mTags]:checked").map((i) => i.value),
          personalizable: $("#mCustom").checked,
          active: $("#mActive").checked,
          sold: parseInt($("#mSold").value) || 0,
          sort_order: parseInt($("#mSort").value) || 0,
        };
        if (row.old_price !== null && row.old_price <= row.price) {
          if (!confirm("O preço antigo é menor ou igual ao preço atual, então não vai aparecer desconto. Salvar mesmo assim?")) return false;
        }
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
        </div></td>
      </tr>`).join("") : `<tr><td colspan="5" class="loading">${this.clients.length ? "Nenhum cliente encontrado." : "Nenhum cliente cadastrado ainda."}</td></tr>`;
    $$("[data-cli]").forEach((b) => b.onclick = () => this.viewClient(this.clients.find((c) => c.id === b.dataset.cli)));
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
     CONFIGURAÇÕES DA LOJA
     ===================================================== */
  async initStore(force = false) {
    if (this.loaded.loja && !force) return;
    this.loaded.loja = true;
    const { data: s, error } = await DB.client.from("store_settings").select("*").eq("id", 1).maybeSingle();
    if (error || !s) return showMsg("#storeMsg", "Erro ao carregar configurações" + (error ? `: ${esc(error.message)}` : ". Rode o schema.sql no Supabase."), false);
    const map = { sName: "name", sSlogan: "slogan", sWa: "whatsapp", sWaLabel: "whatsapp_label", sPhone: "phone", sEmail: "email",
      sInsta: "instagram", sAddr: "address", sFree: "free_shipping", sCoupon: "coupon", sInst: "max_installments" };
    Object.entries(map).forEach(([id, k]) => $("#" + id).value = s[k] ?? "");
    $("#sPix").value = Math.round(Number(s.pix_discount || 0) * 1000) / 10;

    $("#storeForm").onsubmit = async (e) => {
      e.preventDefault();
      setBusy(e.target, true);
      const row = {};
      Object.entries(map).forEach(([id, k]) => row[k] = $("#" + id).value.trim() || null);
      row.name = row.name || "LiloPlay";
      row.whatsapp = (row.whatsapp || "").replace(/\D/g, "");
      row.instagram = (row.instagram || "").replace(/^@/, "");
      row.coupon = row.coupon ? row.coupon.toUpperCase() : null;
      row.free_shipping = toNum(row.free_shipping) ?? 0;
      row.max_installments = parseInt(row.max_installments) || 1;
      row.pix_discount = (toNum($("#sPix").value) || 0) / 100;
      row.updated_at = new Date().toISOString();
      const { error: err } = await DB.client.from("store_settings").update(row).eq("id", 1);
      setBusy(e.target, false);
      if (err) return showMsg("#storeMsg", `Não foi possível salvar: ${esc(err.message)}`, false);
      showMsg("#storeMsg", "Configurações salvas! Elas já valem para todo o site.");
    };
  },
};
window.Admin = Admin;
