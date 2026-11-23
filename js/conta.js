/* =========================================================
   Página "Minha conta" (dados do cliente + senha)
   O painel do administrador fica em admin.js
   ========================================================= */
const maskCep = (v) => { v = v.replace(/\D/g, "").slice(0, 8); return v.length > 5 ? v.slice(0, 5) + "-" + v.slice(5) : v; };
const maskCpf = (v) => v.replace(/\D/g, "").slice(0, 11)
  .replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
const maskPhone = (v) => {
  v = v.replace(/\D/g, "").slice(0, 11);
  if (v.length <= 2) return v;
  if (v.length <= 6) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  if (v.length <= 10) return `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
  return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
};

function showMsg(id, html, ok = true) {
  const m = $(id);
  m.innerHTML = html;
  m.classList.add("show");
  m.classList.toggle("form-error", !ok);
  if (ok) { clearTimeout(m._t); m._t = setTimeout(() => m.classList.remove("show"), 5000); }
}
function setBusy(form, on) {
  const b = $("button[type=submit]", form);
  if (b) { b.disabled = on; b.style.opacity = on ? .6 : 1; }
}

Pages.conta = async () => {
  const loading = $("#accLoading");
  if (!DB.enabled) {
    loading.innerHTML = `A área do cliente ainda não está ativa: falta configurar o Supabase em <strong>js/supabase-config.js</strong>.`;
    return;
  }
  if (!DB.user) { location.replace("login.html"); return; }
  if (!DB.profile) await DB.loadMe();

  loading.hidden = true;
  $("#account").hidden = false;

  const user = DB.user;
  const p = DB.profile || {};
  const nome = p.nome || user.user_metadata?.nome || "";

  /* ---------- Lateral ---------- */
  const tabDefs = {
    dados:      ["user",   "Meus dados"],
    seguranca:  ["shield", "Segurança"],
    pedidos:    ["bag",    "Meus pedidos"],
    vendas:     ["ticket", "Pedidos"],
    produtos:   ["cube",   "Produtos"],
    categorias: ["puzzle", "Categorias"],
    clientes:   ["users",  "Clientes"],
    mensagens:  ["chat",   "Mensagens"],
    newsletter: ["mail",   "Newsletter"],
    loja:       ["house",  "Configurações"],
  };
  $$("[data-tab]", $("#tabs")).forEach((b) => {
    const [ic, label] = tabDefs[b.dataset.tab];
    b.innerHTML = `${icon(ic, 20)} ${label}`;
  });
  $("#logout").innerHTML = `${icon("left", 20)} Sair da conta`;
  $("#avatar").textContent = (nome || user.email).trim().charAt(0).toUpperCase();
  $("#sideName").textContent = nome ? `Olá, ${nome.split(" ")[0]}!` : "Olá!";
  $("#sideType").textContent = DB.isAdmin ? "Administrador" : "Cliente";
  if (DB.isAdmin) {
    $("#adminTabs").style.display = "contents";
    $("#title").textContent = "Minha conta e painel";
  }

  const openTab = (tab) => {
    if (!DB.isAdmin && !["dados", "seguranca", "pedidos"].includes(tab)) tab = "dados";
    $$(".acc-tab[data-tab]").forEach((b) => b.classList.toggle("on", b.dataset.tab === tab));
    $$(".panel").forEach((pn) => pn.classList.toggle("on", pn.id === `panel-${tab}`));
    if (tab === "pedidos") loadMyOrders();
    if (DB.isAdmin && window.Admin) Admin.open(tab);
  };
  $$(".acc-tab[data-tab]").forEach((b) => b.onclick = () => {
    history.replaceState(null, "", `#${b.dataset.tab}`);
    openTab(b.dataset.tab);
    if (innerWidth < 860) $("#account section").scrollIntoView({ behavior: "smooth" });
  });
  $("#logout").onclick = async () => { await DB.signOut(); location.href = "index.html"; };

  /* ---------- Meus dados ---------- */
  const f = {
    nome: "#pNome", email: "#pEmail", telefone: "#pTel", cpf: "#pCpf", data_nascimento: "#pNasc",
    cep: "#pCep", rua: "#pRua", numero: "#pNum", complemento: "#pComp", bairro: "#pBairro", cidade: "#pCidade", estado: "#pUf",
  };
  Object.entries(f).forEach(([k, sel]) => $(sel).value = p[k] ?? "");
  $("#pNome").value = nome;
  $("#pEmail").value = user.email;
  $("#pNews").checked = p.receber_novidades !== false;
  if (p.created_at) $("#memberSince").textContent = `Cliente desde ${new Date(p.created_at).toLocaleDateString("pt-BR")}`;

  $("#pCpf").oninput = (e) => e.target.value = maskCpf(e.target.value);
  $("#pTel").oninput = (e) => e.target.value = maskPhone(e.target.value);
  $("#pCep").oninput = async (e) => {
    e.target.value = maskCep(e.target.value);
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length !== 8) return;
    $("#cepHint").textContent = "Buscando endereço…";
    try {
      const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then((x) => x.json());
      if (r.erro) { $("#cepHint").textContent = "CEP não encontrado. Preencha manualmente."; return; }
      $("#pRua").value = r.logradouro || $("#pRua").value;
      $("#pBairro").value = r.bairro || $("#pBairro").value;
      $("#pCidade").value = r.localidade || "";
      $("#pUf").value = r.uf || "";
      $("#cepHint").textContent = "Endereço encontrado! Confira e informe o número.";
      $("#pNum").focus();
    } catch { $("#cepHint").textContent = "Não foi possível buscar o CEP. Preencha manualmente."; }
  };

  $("#profileForm").onsubmit = async (e) => {
    e.preventDefault();
    setBusy(e.target, true);
    const row = { id: user.id, email: user.email, receber_novidades: $("#pNews").checked };
    Object.entries(f).forEach(([k, sel]) => { if (k !== "email") row[k] = $(sel).value.trim() || null; });
    if (row.estado) row.estado = row.estado.toUpperCase();
    const { data, error } = await DB.client.from("profiles").upsert(row).select().single();
    setBusy(e.target, false);
    if (error) return showMsg("#profileMsg", `Não foi possível salvar: ${esc(error.message)}`, false);
    DB.profile = data;
    if (row.cep) store.set("lilo_cep", row.cep);
    $("#sideName").textContent = row.nome ? `Olá, ${row.nome.split(" ")[0]}!` : "Olá!";
    showMsg("#profileMsg", "Dados salvos com sucesso! ♡");
  };

  /* ---------- Segurança ---------- */
  $("#passForm").onsubmit = async (e) => {
    e.preventDefault();
    const a = $("#newPass").value, b = $("#newPass2").value;
    if (a !== b) return showMsg("#passMsg", "As senhas não são iguais.", false);
    setBusy(e.target, true);
    const { error } = await DB.client.auth.updateUser({ password: a });
    setBusy(e.target, false);
    if (error) return showMsg("#passMsg", authErrorPt(error), false);
    e.target.reset();
    showMsg("#passMsg", "Senha alterada com sucesso!");
  };

  /* ---------- Aba inicial ---------- */
  const hash = location.hash.slice(1);
  if (qs("nova-senha")) {
    openTab("seguranca");
    showMsg("#passMsg", "Crie sua nova senha abaixo.", true);
  } else openTab(tabDefs[hash] ? hash : "dados");
};

/* ---------- Meus pedidos (cliente) ---------- */
const ORDER_STATUS = {
  pendente:   ["Aguardando confirmação", "yellow"],
  confirmado: ["Confirmado", "blue"],
  enviado:    ["Enviado", "purple"],
  entregue:   ["Entregue", "green"],
  cancelado:  ["Cancelado", "rose"],
};
async function loadMyOrders() {
  const box = $("#myOrders");
  const { data, error } = await DB.client.from("orders").select("*").eq("user_id", DB.user.id).order("created_at", { ascending: false });
  if (error) { box.innerHTML = `<div class="loading">Os pedidos ainda não estão ativos (falta rodar o SQL 056 no Supabase).</div>`; return; }
  if (!data.length) {
    box.innerHTML = `<div class="empty-box">${icon("bag", 28)}<p>Você ainda não fez nenhum pedido.</p><a class="btn btn-primary" href="produtos.html">Ver produtos</a></div>`;
    return;
  }
  /* Produtos que o cliente já avaliou */
  const { data: mine } = await DB.client.from("reviews").select("product_id").eq("user_id", DB.user.id);
  const rated = new Set((mine || []).map((r) => String(r.product_id)));
  box.innerHTML = data.map((o) => {
    const [label, color] = ORDER_STATUS[o.status] || [o.status, "blue"];
    const canRate = ["confirmado", "enviado", "entregue"].includes(o.status);
    return `<div class="order-card">
      <div class="order-head">
        <div><strong>Pedido nº ${o.id}</strong><small>${new Date(o.created_at).toLocaleDateString("pt-BR")}</small></div>
        <span class="status p-${color}">${label}</span>
      </div>
      <ul class="order-items">${(o.items || []).map((i) => `
        <li>
          <span>${i.qty}× ${esc(i.name)}${i.variant && !/^(1 )?unidade$/i.test(i.variant) ? ` <small>(${esc(i.variant)})</small>` : ""}</span>
          ${canRate ? (rated.has(String(i.id))
            ? `<a class="rate-link done" href="produto.html?id=${i.id}#avaliar">★ Avaliado</a>`
            : `<a class="rate-link" href="produto.html?id=${i.id}#avaliar">★ Avaliar</a>`) : ""}
        </li>`).join("")}
      </ul>
      <div class="order-foot"><span>Total: <strong>${brl(Number(o.total || 0))}</strong></span>${o.pix_total ? `<span class="pix">${brl(Number(o.pix_total))} no Pix</span>` : ""}</div>
      ${o.status === "pendente" ? `<small class="order-note">Assim que confirmarmos seu pedido pelo WhatsApp, você poderá avaliar os produtos ♡</small>` : ""}
    </div>`;
  }).join("");
}
