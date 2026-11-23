/* =========================================================
   LiloPlay — scripts compartilhados por todas as páginas
   ========================================================= */

/* ---------- Ícones (SVG inline) ---------- */
const ICONS = {
  star:   '<path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" fill="currentColor"/>',
  trophy: '<path d="M7 3h10v3h3v2a4 4 0 0 1-4 4h-.4A5 5 0 0 1 13 14.9V17h3v3H8v-3h3v-2.1A5 5 0 0 1 8.4 12H8a4 4 0 0 1-4-4V6h3zm-1 5a2 2 0 0 0 1 1.7V8zm12 1.7A2 2 0 0 0 18 8v1.7z" fill="currentColor"/>',
  pencil: '<path d="M15.5 3.5l5 5L9 20H4v-5zM14 7l3 3" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
  cap:    '<path d="M12 4L1 9l11 5 9-4.1V16h2V9zM5 12.2V16c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.2z" fill="currentColor"/>',
  puzzle: '<path d="M10 3a2 2 0 0 1 4 0v2h4a1 1 0 0 1 1 1v4h-2a2 2 0 0 0 0 4h2v4a1 1 0 0 1-1 1h-4v-2a2 2 0 0 0-4 0v2H6a1 1 0 0 1-1-1v-4h2a2 2 0 0 0 0-4H5V6a1 1 0 0 1 1-1h4z" fill="currentColor"/>',
  phone:  '<rect x="6" y="2" width="12" height="20" rx="3" fill="currentColor"/><circle cx="12" cy="18" r="1.3" fill="#fff"/>',
  flag:   '<path d="M5 2h2v20H5zM8 3h11l-2.5 4.5L19 12H8z" fill="currentColor"/>',
  users:  '<circle cx="9" cy="8" r="3.5" fill="currentColor"/><circle cx="17" cy="9" r="2.6" fill="currentColor"/><path d="M2 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5zM16.5 20c0-2.2-.7-4.1-2-5.4 3.7-.6 7.5 1.4 7.5 5.4z" fill="currentColor"/>',
  house:  '<path d="M12 3l10 8.5h-3V21h-5v-6h-4v6H5v-9.5H2z" fill="currentColor"/>',
  cube:   '<path d="M12 2l9 5v10l-9 5-9-5V7zm0 2.3L5.4 8 12 11.7 18.6 8zM4.5 9.6v6.5l6.7 3.7v-6.5zm15 0l-6.7 3.7v6.5l6.7-3.7z" fill="currentColor"/>',
  book:   '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v16H6.5a1 1 0 0 0 0 2H20v2H6.5A2.5 2.5 0 0 1 4 19.5z" fill="currentColor"/>',
  heart:  '<path d="M12 21s-8-5.1-8-11.2A4.8 4.8 0 0 1 12 6.5a4.8 4.8 0 0 1 8 3.3C20 15.9 12 21 12 21z" fill="currentColor"/>',
  gift:   '<path d="M3 8h18v4H3zM4 13h7v8H4zM13 13h7v8h-7zM11 8h2v13h-2zM12 8S10 3 7.5 3.5 6 8 12 8zm0 0s2-5 4.5-4.5S18 8 12 8z" fill="currentColor"/>',
  rocket: '<path d="M14 3c3-1 6-1 7 0 1 1 1 4 0 7l-6 6-5-5zM9 12l3 3-4 4-1-3-3-1zm-4 4l3 3c-1 2-4 3-6 3 0-2 1-5 3-6z" fill="currentColor"/><circle cx="16" cy="8" r="1.8" fill="#fff"/>',
  search: '<circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
  user:   '<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  bag:    '<path d="M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  menu:   '<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
  left:   '<path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  right:  '<path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  down:   '<path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  truck:  '<path d="M2 6h12v10H2zM14 9h4l4 4v3h-8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="6" cy="18" r="2" fill="currentColor"/><circle cx="18" cy="18" r="2" fill="currentColor"/>',
  card:   '<rect x="2" y="5" width="20" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M2 10h20" stroke="currentColor" stroke-width="2"/>',
  chat:   '<path d="M4 4h16v12H8l-4 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  clock:  '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  ticket: '<path d="M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14 7v10" stroke="currentColor" stroke-width="2" stroke-dasharray="2 2"/>',
  shield: '<path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8.5 12l2.5 2.5 4.5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  swap:   '<path d="M4 9h14l-4-4M20 15H6l4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  trash:  '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5M4 16v4h16v-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  mail:   '<rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" stroke-width="2"/>',
  pin:    '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.5" fill="currentColor"/>',
  tel:    '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  eye:    '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/>',
  insta:  '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>',
  fb:     '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" fill="currentColor"/>',
  wa:     '<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9 0-1.4.7-2 1-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1.9 2 1.2 2.3 1.4.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.1.1.7-.1 1.3z" fill="currentColor"/>',
};
function icon(name, size = 22) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.star}</svg>`;
}

/* ---------- Utilidades ---------- */
const $  = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const qs = (k) => new URLSearchParams(location.search).get(k);
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const catById = (id) => CATEGORIES.find((c) => c.id === id);
const productById = (id) => PRODUCTS.find((p) => String(p.id) === String(id));
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Foto do produto (1ª imagem) ou ilustração colorida enquanto não há foto */
function placeholder(p, ic) {
  if (!ic && p.images && p.images.length) {
    return `<div class="ph ph-img p-${p.color || "blue"}"><img src="${esc(p.images[0])}" alt="${esc(p.name || "")}" loading="lazy"></div>`;
  }
  return `<div class="ph p-${p.color || "blue"}">${icon(ic || p.icon, 120)}</div>`;
}

/* Descrição do produto: parágrafos, {opcao} = opção escolhida (ex.: "50 unidades")
   e "Plataforma LiloPlay" em destaque com link para o Instagram */
function descHTML(text, opcao) {
  const ig = `https://instagram.com/${STORE.instagram}`;
  return String(text || "").split(/\n\s*\n/).filter((par) => par.trim()).map((par) => {
    let h = esc(par.replace(/\{opcao\}/gi, opcao || "")).replace(/\n/g, "<br>");
    h = h.replace(/Plataforma LiloPlay/g, `<a href="${ig}" target="_blank" rel="noopener" class="desc-link">Plataforma LiloPlay</a>`);
    return `<p>${h}</p>`;
  }).join("");
}

/* Prazo de produção (Configurações > Envio) — aparece em cada produto, separado do frete */
function producaoTxt() {
  const a = STORE.productionMin ?? 7, b = STORE.productionMax ?? 12;
  return a === b ? `${a} dias úteis` : `${a} a ${b} dias úteis`;
}

/* Estrelinha + média nos cards e na página do produto (ex.: ★ 4,8 (12)) */
function ratingMini(p, long = false) {
  const r = p.rating; if (!r || !r.total) return "";
  const avg = Number(r.avg).toFixed(1).replace(".", ",");
  return `<span class="rating-mini"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z" fill="currentColor"/></svg>${avg} <small>(${r.total}${long ? (r.total === 1 ? " avaliação" : " avaliações") : ""})</small></span>`;
}

/* Link do WhatsApp com mensagem pronta pedindo mais informações (rodapé e botão flutuante) */
function waInfo() {
  const msg = `Olá! Vim pelo site do ${STORE.name} e gostaria de mais informações sobre os materiais. 😊`;
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

/* ---------- Cartão com as taxas da InfinitePay repassadas ao cliente ----------
   STORE.cardFees = [acréscimo 1x, 2x, 3x…] em fração (ex.: 0.14282 = 14,282%),
   igual ao simulador do app: "cliente paga" = valor no Pix × (1 + acréscimo),
   com o total e cada parcela arredondados para cima no centavo (ex.: 75,31 ÷ 3 = 25,11).
   Sem acréscimos cadastrados, vale o preço normal da opção e o parcelamento "sem juros". */
const hasCardFees = () => Array.isArray(STORE.cardFees) && STORE.cardFees.length > 0;
function maxParcelas() {
  return hasCardFees() ? Math.min(STORE.maxInstallments, STORE.cardFees.length) : STORE.maxInstallments;
}
function cardTotal(v, n = 1) {
  if (!hasCardFees()) return v.price;
  const fee = STORE.cardFees[Math.min(n, STORE.cardFees.length) - 1] || 0;
  return arredCima(pixOf(v) * (1 + fee));
}
/* Arredonda para cima no centavo (como a InfinitePay), ignorando “sujeira” de ponto flutuante */
function arredCima(x) { return Math.ceil(Math.round(x * 1e6) / 1e4) / 100; }
/* Valor de cada parcela */
const parcela = (total, n) => arredCima(total / n);
/* Linha de parcelas (cards e página do produto) */
function installments(v) {
  const n = maxParcelas();
  if (n <= 1) return "à vista no cartão";
  return `até ${n}x de ${brl(parcela(cardTotal(v, n), n))}${hasCardFees() ? "" : " sem juros"}`;
}
/* Tabela "1x / 2x / 3x" (página do produto e mensagem do WhatsApp) */
function parcelasList(totalFor) {
  return [...Array(maxParcelas())].map((_, k) => {
    const n = k + 1, total = totalFor(n);
    return { n, total, each: parcela(total, n) };
  });
}

/* ---------- Opções com preço (ex.: 1 unidade / Kit com 3 / Kit com 5) ---------- */
function productVariants(p) {
  if (p.variants && p.variants.length) return p.variants;
  const labels = p.options && p.options.length ? p.options : ["1 unidade"];
  return labels.map((label) => ({ label, price: p.price, old: p.old || null }));
}
/* Valor no Pix da opção: o cadastrado na opção ou, se não houver, o preço com o desconto Pix da loja */
function pixOf(v) {
  return v && v.pix != null && !isNaN(v.pix) ? v.pix : Math.round(v.price * (1 - STORE.pixDiscount) * 100) / 100;
}
function variantFor(p, label) {
  const vs = productVariants(p);
  return vs.find((v) => v.label === label) || vs[0];
}
/* Menor preço do produto (para os cards) e se as opções têm preços diferentes */
function priceInfo(p) {
  const vs = productVariants(p);
  const cheapest = vs.reduce((a, b) => (b.price < a.price ? b : a), vs[0]);
  return { v: cheapest, multi: new Set(vs.map((v) => v.price)).size > 1 };
}

/* ---------- Card de produto ---------- */
function productCard(p) {
  const { v, multi } = priceInfo(p);
  const off = v.old && v.old > v.price ? Math.round((1 - v.price / v.old) * 100) : 0;
  const isNew = !off && p.tags.includes("lancamentos");
  return `
  <a class="card" href="produto.html?id=${p.id}">
    <div class="card-img">
      ${off ? `<span class="tag-off">-${off}%</span>` : isNew ? `<span class="tag-off tag-new">Novo</span>` : ""}
      ${placeholder(p)}
    </div>
    <h3>${esc(p.name)}</h3>
    ${ratingMini(p)}
    ${multi ? `<div class="from">a partir de</div>` : ""}
    <div class="price">${brl(v.price)}${off ? `<s>${brl(v.old)}</s>` : ""}</div>
    <div class="installments">${installments(v)}</div>
    <div class="pix">${brl(pixOf(v))} no Pix</div>
  </a>`;
}

/* ---------- Cabeçalho e rodapé ---------- */
function renderHeader() {
  const page = document.body.dataset.page;
  const navLink = (href, label, key) => `<li><a href="${href}" class="${page === key ? "active" : ""}">${label}</a></li>`;
  const el = document.getElementById("header");
  if (!el) return;
  el.outerHTML = `
  <div class="topbar">MATERIAIS MANIPULÁVEIS E EDUCATIVOS QUE ENCANTAM ✦ FRETE GRÁTIS ACIMA DE ${brl(STORE.freeShipping)}</div>
  <header class="header">
    <div class="container header-main">
      <a href="index.html" class="logo" aria-label="${STORE.name} - início"><img src="assets/logo.png" alt="${STORE.name} - ${STORE.slogan}"></a>
      <form class="search" action="produtos.html" role="search">
        <label class="sr-only" for="q">Buscar</label>
        <input id="q" name="q" type="search" placeholder="O que você está buscando?" value="${qs("q") || ""}">
        <button type="submit" aria-label="Buscar">${icon("search", 20)}</button>
      </form>
      <div class="header-actions">
        ${window.DB && DB.user ? `
        <a class="h-action" href="conta.html">
          <span class="h-icon">${icon("user")}</span>
          <span class="txt"><strong>Olá, ${esc(DB.displayName())}</strong>${DB.isAdmin ? "Painel admin" : "Minha conta"}</span>
        </a>` : `
        <a class="h-action" href="login.html">
          <span class="h-icon">${icon("user")}</span>
          <span class="txt"><strong>Entrar /</strong>Cadastre-se</span>
        </a>`}
        <button class="h-action" id="openCart" type="button">
          <span class="h-icon">${icon("bag")}<span class="badge" id="cartCount">0</span></span>
          <span class="txt"><strong>Carrinho</strong><span id="cartTotal">${brl(0)}</span></span>
        </button>
        <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu" type="button">${icon("menu")}</button>
      </div>
    </div>
    <nav class="nav" id="nav" aria-label="Principal">
      <div class="container">
        <ul>
          <li class="has-dropdown">
            <button class="nav-btn" type="button">Categorias ${icon("down", 16)}</button>
            <div class="dropdown">
              ${CATEGORIES.map((c) => `<a href="produtos.html?cat=${c.id}"><span class="dot" style="background:var(--${c.color}-t)"></span>${c.name}</a>`).join("")}
            </div>
          </li>
          ${navLink("index.html", "Início", "home")}
          ${navLink("produtos.html", "Produtos", "produtos")}
          ${navLink("contato.html", "Contato", "contato")}
          ${navLink("trocas.html", "Trocas e Devoluções", "trocas")}
        </ul>
      </div>
    </nav>
  </header>`;
  $("#menuToggle").addEventListener("click", () => $("#nav").classList.toggle("open"));
}

function renderFooter() {
  const el = document.getElementById("footer");
  if (!el) return;
  el.outerHTML = `
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <a href="index.html" class="footer-logo"><img src="assets/logo.png" alt="${STORE.name}"></a>
        <div class="contact-lines">
          <span>WhatsApp: ${STORE.whatsappLabel}</span>
          <span>Telefone: ${STORE.phone}</span>
          <span>${STORE.email}</span>
          <span>${STORE.address}</span>
        </div>
        <div class="socials">
          <a href="https://instagram.com/${STORE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon("insta", 20)}</a>          <a href="${waInfo()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("wa", 20)}</a>
        </div>
      </div>
      <div>
        <h4>Navegação</h4>
        <ul>
          <li><a href="index.html">Início</a></li>
          <li><a href="produtos.html">Produtos</a></li>
          <li><a href="contato.html">Contato</a></li>
          <li><a href="trocas.html">Trocas e Devoluções</a></li>
          <li><a href="${window.DB && DB.user ? "conta.html" : "login.html"}">Minha conta</a></li>
        </ul>
      </div>
      <div>
        <h4>Newsletter ♡</h4>
        <p style="margin-top:0">Novidades fresquinhas no seu e-mail</p>
        <form class="inline-form js-news">
          <input type="email" required placeholder="Seu e-mail" aria-label="E-mail">
          <button class="btn btn-primary" type="submit">Enviar</button>
        </form>
      </div>
    </div>
    <div class="container footer-bottom">
      <div>
        <div style="margin-bottom:6px">Meios de pagamento</div>
        <div class="pay"><span>PIX</span><span>VISA</span><span>MASTER</span><span>ELO</span></div>
      </div>
      <div style="align-self:end">© ${new Date().getFullYear()} ${STORE.name}. Todos os direitos reservados.</div>
    </div>
  </footer>
  <a class="whats" href="${waInfo()}" target="_blank" rel="noopener" aria-label="Fale conosco pelo WhatsApp">${icon("wa", 30)}</a>
  <div class="cookie" id="cookie">
    <span>Ao navegar por este site você aceita o uso de <strong>cookies</strong> para agilizar a sua experiência de compra.</span>
    <button class="btn btn-primary" style="padding:8px 14px" id="cookieOk" type="button">Entendi</button>
  </div>
  <div class="overlay" id="overlay"></div>
  <aside class="drawer" id="drawer" aria-label="Carrinho de compras">
    <div class="drawer-head"><h3>Carrinho de compras</h3><button id="closeCart" aria-label="Fechar" type="button">&times;</button></div>
    <div class="drawer-body" id="cartItems"></div>
    <div class="drawer-foot" id="cartFoot"></div>
  </aside>
  <div class="toast" id="toast"></div>`;

  if (!store.get("lilo_cookie", false)) $("#cookie").classList.add("show");
  $("#cookieOk").addEventListener("click", () => { store.set("lilo_cookie", true); $("#cookie").classList.remove("show"); });
}

/* ---------- Frete (Melhor Envio, pela função "frete" do Supabase) ---------- */
const Frete = {
  fmtCep(v) { v = String(v || "").replace(/\D/g, "").slice(0, 8); return v.length > 5 ? v.slice(0, 5) + "-" + v.slice(5) : v; },
  valid(v) { return String(v || "").replace(/\D/g, "").length === 8; },
  /* CEP salvo (ou o do cadastro do cliente) */
  cep() { return store.get("lilo_cep", "") || (window.DB && DB.profile && DB.profile.cep) || ""; },
  /* Cotação: devolve { options:[{id,name,company,price,days_min,days_max}], production:{min,max} } */
  async quote(cep, items) {
    if (!(window.DB && DB.enabled)) throw new Error("Frete indisponível no momento. Combinamos pelo WhatsApp.");
    const { data, error } = await DB.client.functions.invoke("frete", {
      body: { cep: String(cep).replace(/\D/g, ""), items: items.map((i) => ({ id: i.id, variant: i.variant || "", qty: i.qty })) },
    });
    if (error) {
      let msg = "Não foi possível calcular o frete agora. Combinamos pelo WhatsApp.";
      try { const b = await error.context.json(); if (b && b.error) msg = b.error; } catch {}
      throw new Error(msg);
    }
    if (!data || !Array.isArray(data.options)) throw new Error("Não foi possível calcular o frete agora. Combinamos pelo WhatsApp.");
    return data;
  },
  /* Prazo da transportadora (o prazo de produção aparece separado, em cada produto) */
  prazo(o) {
    const a = o.days_min || 0, b = o.days_max || o.days_min || 0;
    return a === b ? `${a} ${a === 1 ? "dia útil" : "dias úteis"}` : `${a} a ${b} dias úteis`;
  },
  label(o) { return o.company && !o.name.toLowerCase().includes(o.company.toLowerCase()) ? `${o.name} (${o.company})` : o.name; },
};

/* ---------- Carrinho ---------- */
const Cart = {
  items() { return store.get("lilo_cart", []); },
  save(items) { store.set("lilo_cart", items); this.render(); },
  add(id, qty = 1, opts = "", variant = "") {
    const items = this.items();
    const found = items.find((i) => i.id === id && i.opts === opts && (i.variant || "") === variant);
    if (found) found.qty += qty; else items.push({ id, qty, opts, variant });
    this.save(items);
    toast("Adicionado ao carrinho ♡");
    this.open();
  },
  remove(idx) { const items = this.items(); items.splice(idx, 1); this.save(items); },
  setQty(idx, qty) {
    const items = this.items();
    if (!items[idx]) return;
    items[idx].qty = Math.max(1, Math.min(999, qty || 1));
    this.save(items);
  },
  /* Preço unitário do item, de acordo com a opção escolhida */
  unit(i) { const p = productById(i.id); return p ? variantFor(p, i.variant).price : 0; },
  /* Produtos no Pix */
  pixTotal() { return this.items().reduce((s, i) => { const p = productById(i.id); return s + (p ? pixOf(variantFor(p, i.variant)) : 0) * i.qty; }, 0); },
  /* Produtos no cartão em N parcelas (sem frete) */
  productsCard(n = 1) {
    if (hasCardFees()) return cardTotal({ pix: this.pixTotal() }, n);
    return this.items().reduce((s, i) => { const p = productById(i.id); return s + (p ? cardTotal(variantFor(p, i.variant), n) : 0) * i.qty; }, 0);
  },
  /* Frete grátis acima do valor da loja (olha os produtos no cartão à vista) */
  isFree() { return this.items().length > 0 && this.productsCard(1) >= STORE.freeShipping; },

  /* ----- Frete escolhido ----- */
  key() { return JSON.stringify(this.items().map((i) => [i.id, i.variant || "", i.qty])); },
  ship() {
    return null;   // o cálculo do frete fica só na página do produto; no carrinho o frete é combinado no WhatsApp
  },
  shipChosen() {
    const s = this.ship(); if (!s) return null;
    return s.options.find((o) => o.id === s.chosen) || s.options[0] || null;
  },
  /* Valor do frete escolhido (grátis na opção mais barata quando passa do valor) */
  shipPrice() {
    const o = this.shipChosen(); if (!o) return 0;
    const s = this.ship();
    const cheapest = s.options.reduce((a, b) => (b.price < a.price ? b : a), s.options[0]);
    return this.isFree() && o.id === cheapest.id ? 0 : o.price;
  },
  /* ----- Totais (com frete) ----- */
  pixFinal() { return this.pixTotal() + this.shipPrice(); },
  cardTotalN(n) {
    if (hasCardFees()) return cardTotal({ pix: this.pixFinal() }, n);
    return this.productsCard(n) + this.shipPrice();
  },
  total() { return this.cardTotalN(1); },

  open() { $("#drawer").classList.add("show"); $("#overlay").classList.add("show"); },
  close() { $("#drawer").classList.remove("show"); $("#overlay").classList.remove("show"); },

  /* Monta a mensagem do pedido e abre o WhatsApp */
  async checkout() {
    const items = this.items().filter((i) => productById(i.id));
    if (!items.length) return;
    /* Só finaliza com cadastro: sem login, vai para Entrar/Cadastrar e depois volta com o carrinho aberto */
    if (!(window.DB && DB.user)) {
      store.set("lilo_return", location.pathname.split("/").pop() + location.search);
      location.href = "login.html?compra=1";
      return;
    }
    const s = this.ship(), o = this.shipChosen(), ship = this.shipPrice();
    const lines = items.map((i, n) => {
      const p = productById(i.id);
      return `${n + 1}. ${p.name}\n   Qtd: ${i.qty} x ${brl(this.unit(i))} = ${brl(this.unit(i) * i.qty)}${i.opts ? `\n   Detalhes: ${i.opts}` : ""}`;
    });
    /* Dados do cliente (cadastro obrigatório para finalizar) */
    const pr = DB.profile || {};
    const client = [
      "*Meus dados:*",
      `Nome: ${pr.nome || "-"}`,
      `E-mail: ${pr.email || DB.user.email}`,
      pr.telefone ? `Telefone: ${pr.telefone}` : "",
      pr.rua ? `Endereço: ${pr.rua}, ${pr.numero || "s/n"}${pr.complemento ? " - " + pr.complemento : ""} - ${pr.bairro || ""} - ${pr.cidade || ""}/${pr.estado || ""} - CEP ${pr.cep || ""}` : "",
    ].filter(Boolean);
    const freteLine = o
      ? `Frete: ${Frete.label(o)} - ${ship === 0 ? "GRÁTIS" : brl(ship)} - entrega em ${Frete.prazo(o)} após o envio (CEP ${s.cep})`
      : `Frete: ${this.isFree() ? "GRÁTIS" : "a combinar"}`;
    /* Abre a aba já (evita bloqueio de pop-up) e registra o pedido para o painel e as avaliações */
    const win = window.open("about:blank", "_blank");
    let orderId = null;
    try {
      const { data, error } = await DB.client.from("orders").insert({
        items: items.map((i) => { const p = productById(i.id); return { id: Number(p.id), name: p.name, variant: i.variant || "", opts: i.opts || "", qty: i.qty, price: this.unit(i) }; }),
        total: Math.round(this.total() * 100) / 100,
        pix_total: Math.round(this.pixFinal() * 100) / 100,
      }).select("id").single();
      if (!error && data) orderId = data.id;
    } catch {}
    const msg = [
      `Olá! Gostaria de finalizar meu pedido${orderId ? ` nº ${orderId}` : ""} no ${STORE.name}:`,
      "", ...client,
      "", ...lines,
      "",
      `Produtos: ${brl(this.productsCard(1))}`,
      freteLine,
      `Total no cartão: ${brl(this.total())}${o || this.isFree() ? "" : " + frete"}`,
      ...(maxParcelas() > 1 ? [`Parcelas: ${parcelasList((n) => this.cardTotalN(n)).map((x) => x.n === 1 ? `1x ${brl(x.total)}` : `${x.n}x de ${brl(x.each)}`).join(" | ")}`] : []),
      `No Pix: ${brl(this.pixFinal())}${o || this.isFree() ? "" : " + frete"}`,
      "",
      `Prazo de produção: ${producaoTxt()}`,
      "(Peso e frete serão confirmados por aqui.)",
      "Aguardo as informações para pagamento e entrega.",
    ].join("\n");
    const url = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`;
    if (win) { try { win.opener = null; } catch {} win.location.href = url; } else location.href = url;
    /* Pedido registrado: esvazia o carrinho */
    if (orderId) { this.save([]); this.close(); toast(`Pedido nº ${orderId} enviado! Acompanhe em Minha conta ♡`); }
  },

  render() {
    const items = this.items();
    const total = this.total();
    $("#cartCount").textContent = items.reduce((s, i) => s + i.qty, 0);
    $("#cartTotal").textContent = brl(total);
    const body = $("#cartItems");
    const foot = $("#cartFoot");

    if (!items.length) {
      body.innerHTML = `
        <div class="cart-empty">
          <span class="h-icon" style="width:64px;height:64px;border-radius:20px">${icon("bag", 30)}</span>
          <p>O carrinho de compras está vazio.</p>
          <a href="produtos.html" class="btn btn-primary">Ver produtos</a>
        </div>`;
      foot.innerHTML = "";
      return;
    }

    body.innerHTML = items.map((i, idx) => {
      const p = productById(i.id); if (!p) return "";
      return `<div class="cart-item">
        <a class="thumb" href="produto.html?id=${p.id}">${placeholder(p)}</a>
        <div class="ci-info">
          <div class="ci-top">
            <h4>${esc(p.name)}${i.opts ? `<small>${esc(i.opts)}</small>` : ""}<small class="ci-prod">${icon("clock", 12)} Produção: ${producaoTxt()}</small></h4>
            <button class="rm" data-rm="${idx}" type="button">Remover</button>
          </div>
          <div class="ci-bottom">
            <div class="qty qty-sm">
              <button type="button" data-dec="${idx}" aria-label="Diminuir">−</button>
              <input type="text" inputmode="numeric" value="${i.qty}" data-qty="${idx}" aria-label="Quantidade">
              <button type="button" data-inc="${idx}" aria-label="Aumentar">+</button>
            </div>
            <strong>${brl(this.unit(i) * i.qty)}</strong>
          </div>
        </div>
      </div>`;
    }).join("");

    const prods = this.productsCard(1);
    const free = this.isFree();
    const o = this.shipChosen();
    const shipText = o ? (this.shipPrice() === 0 ? `<span style="color:var(--green-t);font-weight:800">Grátis</span>` : brl(this.shipPrice()))
      : free ? `<span style="color:var(--green-t);font-weight:800">Grátis</span>` : "A combinar no WhatsApp";
    const logged = !!(window.DB && DB.user);

    foot.innerHTML = `
      <div class="row light"><span>Produtos:</span><span>${brl(prods)}</span></div>
      <div class="row light"><span>Frete:</span><span>${shipText}</span></div>
      <div class="row big"><span>Total:</span><span>${brl(total)}</span></div>
      <div class="pay-alt">${maxParcelas() > 1 ? `<span class="installments">${(() => { const n = maxParcelas(), t = this.cardTotalN(n); return `ou até ${n}x de ${brl(parcela(t, n))}${hasCardFees() ? "" : " sem juros"}`; })()}</span>` : ""}<span class="pix">ou ${brl(this.pixFinal())} no Pix</span></div>
      <button class="btn btn-primary btn-block btn-lg" type="button" id="checkout">Iniciar compra</button>
      <small class="checkout-note">${logged
        ? `${icon("wa", 14)} Você será direcionado ao WhatsApp para concluir o pedido.`
        : `${icon("user", 14)} Para concluir a compra é preciso <a href="login.html?compra=1" id="loginToBuy">entrar ou criar sua conta</a>.`}</small>
      <a href="produtos.html" class="see-more" id="keepShopping">Ver mais produtos</a>`;

    /* Eventos */
    $$("[data-rm]", body).forEach((b) => b.onclick = () => this.remove(Number(b.dataset.rm)));
    $$("[data-dec]", body).forEach((b) => b.onclick = () => { const k = Number(b.dataset.dec); this.setQty(k, items[k].qty - 1); });
    $$("[data-inc]", body).forEach((b) => b.onclick = () => { const k = Number(b.dataset.inc); this.setQty(k, items[k].qty + 1); });
    $$("[data-qty]", body).forEach((inp) => inp.onchange = () => this.setQty(Number(inp.dataset.qty), parseInt(inp.value)));

    const lt = $("#loginToBuy");
    if (lt) lt.onclick = () => store.set("lilo_return", location.pathname.split("/").pop() + location.search);
    $("#checkout").onclick = () => this.checkout();
    $("#keepShopping").onclick = (e) => { if (document.body.dataset.page === "produtos") { e.preventDefault(); this.close(); } };
  },
};

function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------- Carrossel de produtos ---------- */
function carousel(el, products) {
  el.innerHTML = `
    <button class="car-arrow prev" aria-label="Anterior" type="button">${icon("left")}</button>
    <div class="car-viewport"><div class="car-track">${products.map(productCard).join("")}</div></div>
    <button class="car-arrow next" aria-label="Próximo" type="button">${icon("right")}</button>`;
  const track = $(".car-track", el);
  let i = 0;
  const perView = () => (innerWidth <= 720 ? 2 : innerWidth <= 860 ? 3 : innerWidth <= 1024 ? 4 : 5);
  const go = (n) => {
    const max = Math.max(0, products.length - perView());
    i = n < 0 ? max : n > max ? 0 : n;
    const card = track.children[0];
    const step = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap) : 0;
    track.style.transform = `translateX(${-i * step}px)`;
  };
  $(".prev", el).onclick = () => go(i - 1);
  $(".next", el).onclick = () => go(i + 1);
  addEventListener("resize", () => go(i));
}

/* ---------- Formulários "fake" (sem back-end) ---------- */
function bindForms() {
  $$(".js-news").forEach((f) => f.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = $("input[type=email]", f);
    const btn = $("button[type=submit]", f);
    const email = input.value.trim().toLowerCase();
    if (!email) return;
    if (!window.DB || !DB.enabled) { toast("Newsletter indisponível no momento."); return; }
    btn.disabled = true;
    const { error } = await DB.client.from("newsletter").insert({ email });
    btn.disabled = false;
    // 23505 = e-mail já cadastrado → para a pessoa, está tudo certo
    if (error && error.code !== "23505") {
      console.warn("Newsletter:", error);
      toast(error.code === "23514" ? "Confira o e-mail digitado." : "Não foi possível cadastrar. Tente de novo.");
      return;
    }
    f.reset();
    toast(error ? "Este e-mail já está na nossa lista ♡" : "E-mail cadastrado! Obrigado ♡");
  }));
}

/* ---------- Inicialização ---------- */
/* ---------- Proteção das fotos dos produtos ----------
   Bloqueia botão direito / toque longo / arrastar nas fotos e o Ctrl+S (salvar página).
   Obs.: nenhum site consegue impedir 100% (ex.: captura de tela). */
(() => {
  const FOTO = ".ph-img, .hero-pic";
  const naFoto = (e) => e.target instanceof Element && e.target.closest(FOTO);
  document.addEventListener("contextmenu", (e) => { if (naFoto(e)) e.preventDefault(); });
  document.addEventListener("dragstart", (e) => { if (naFoto(e)) e.preventDefault(); });
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") e.preventDefault();
  });
})();

document.addEventListener("DOMContentLoaded", async () => {
  if (window.DB) await DB.init();
  renderHeader();
  renderFooter();
  /* Um problema no carrinho (ex.: frete salvo com erro) nunca pode impedir a página de carregar */
  try { Cart.render(); } catch (e) {
    console.error("Carrinho:", e);
    store.set("lilo_frete", null);
    try { Cart.render(); } catch {}
  }
  $("#openCart").onclick = () => Cart.open();
  $("#closeCart").onclick = () => Cart.close();
  $("#overlay").onclick = () => Cart.close();
  bindForms();
  /* Voltou do login para finalizar a compra: abre o carrinho */
  if (store.get("lilo_open_cart", false) && window.DB && DB.user) { store.set("lilo_open_cart", false); Cart.open(); }
  const page = document.body.dataset.page;
  if (window.Pages && Pages[page]) Pages[page]();
});

window.Pages = {};
