/* =========================================================
   Avaliações dos produtos (estrelas + comentário), estilo Shopee
   - Todos veem as avaliações.
   - Só quem tem pedido CONFIRMADO/ENVIADO/ENTREGUE com o produto pode avaliar
     (a regra também é garantida no banco: função can_review).
   - Uma avaliação por cliente em cada produto (pode editar ou excluir).
   ========================================================= */
const Reviews = {
  STAR: '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z" fill="currentColor"/></svg>',

  /* ★★★★☆ (aceita meia estrela) */
  stars(value, size = 16) {
    const v = Math.max(0, Math.min(5, Number(value) || 0));
    return `<span class="stars" style="font-size:${size}px" aria-label="${v.toFixed(1).replace(".", ",")} de 5 estrelas">${[1, 2, 3, 4, 5].map((k) => {
      const fill = v >= k ? 100 : v > k - 1 ? Math.round((v - (k - 1)) * 100) : 0;
      return `<span class="st"><span class="st-bg">${this.STAR}</span><span class="st-fg" style="width:${fill}%">${this.STAR}</span></span>`;
    }).join("")}</span>`;
  },
  fmt(n) { return Number(n).toFixed(1).replace(".", ","); },
  /* "Maria S." para preservar o sobrenome */
  shortName(nome) {
    const parts = String(nome || "Cliente").trim().split(/\s+/);
    return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1].charAt(0).toUpperCase()}.` : parts[0];
  },
  date(d) { return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }); },

  async render(el, p) {
    if (!el) return;
    if (!(window.DB && DB.enabled)) { el.innerHTML = ""; return; }
    el.innerHTML = `<h2 class="rv-title">Avaliações</h2><div class="loading">Carregando avaliações…</div>`;

    const { data: list, error } = await DB.client.from("reviews")
      .select("id,user_id,nome,rating,comment,created_at,updated_at")
      .eq("product_id", p.id).order("created_at", { ascending: false });
    if (error) { el.innerHTML = ""; return; }   // SQL ainda não rodado: some sem quebrar a página

    const mine = DB.user ? list.find((r) => r.user_id === DB.user.id) : null;
    let canReview = false;
    if (DB.user && !mine) {
      const { data } = await DB.client.rpc("can_review", { pid: p.id });
      canReview = !!data;
    }

    const total = list.length;
    const avg = total ? list.reduce((s, r) => s + r.rating, 0) / total : 0;
    const dist = [5, 4, 3, 2, 1].map((n) => ({ n, c: list.filter((r) => r.rating === n).length }));

    el.innerHTML = `
      <h2 class="rv-title">Avaliações</h2>
      <div class="rv-summary">
        <div class="rv-avg">
          <strong>${total ? this.fmt(avg) : "–"}</strong><span>de 5</span>
          ${this.stars(avg, 20)}
          <small>${total ? `${total} ${total === 1 ? "avaliação" : "avaliações"}` : "Ainda sem avaliações"}</small>
        </div>
        <div class="rv-dist">${dist.map((d) => `
          <div class="rv-bar"><span>${d.n} ${this.STAR}</span><i><b style="width:${total ? (d.c / total) * 100 : 0}%"></b></i><small>${d.c}</small></div>`).join("")}
        </div>
      </div>
      <div id="rvForm"></div>
      <div class="rv-list">${list.map((r) => this.item(r)).join("")}</div>`;

    this.drawForm($("#rvForm", el), p, mine, canReview);
    $$("[data-rv-del]", el).forEach((b) => b.onclick = async () => {
      if (!confirm("Excluir esta avaliação?")) return;
      const { error: e } = await DB.client.from("reviews").delete().eq("id", b.dataset.rvDel);
      if (e) return alert("Não foi possível excluir: " + e.message);
      this.refresh(p);
    });
    $$("[data-rv-edit]", el).forEach((b) => b.onclick = () => this.drawForm($("#rvForm", el), p, mine, true, true));
  },

  item(r) {
    const own = DB.user && r.user_id === DB.user.id;
    return `<article class="rv-item">
      <div class="rv-head">
        <span class="rv-av">${esc(this.shortName(r.nome).charAt(0))}</span>
        <div><strong>${esc(this.shortName(r.nome))}</strong>${this.stars(r.rating, 14)}</div>
        <time>${this.date(r.created_at)}</time>
      </div>
      ${r.comment ? `<p>${esc(r.comment).replace(/\n/g, "<br>")}</p>` : ""}
      <div class="rv-badge">${icon("shield", 12)} Compra verificada</div>
      ${own || DB.isAdmin ? `<div class="rv-acts">
        ${own ? `<button type="button" data-rv-edit>Editar</button>` : ""}
        <button type="button" data-rv-del="${r.id}">Excluir</button></div>` : ""}
    </article>`;
  },

  drawForm(box, p, mine, canReview, editing = false) {
    if (!box) return;
    if (!DB.user) {
      box.innerHTML = `<div class="rv-note">Comprou este produto? <a href="login">Entre na sua conta</a> para avaliar.</div>`;
      return;
    }
    if (mine && !editing) { box.innerHTML = `<div class="rv-note ok">${icon("heart", 14)} Obrigado! Você já avaliou este produto.</div>`; return; }
    if (!canReview && !mine) {
      box.innerHTML = `<div class="rv-note">Você poderá avaliar este produto assim que o seu pedido for confirmado ♡</div>`;
      return;
    }
    let rating = mine ? mine.rating : 0;
    const labels = ["", "Muito ruim", "Ruim", "Regular", "Bom", "Excelente!"];
    box.innerHTML = `
      <form class="rv-form" id="rvF">
        <strong>${mine ? "Editar sua avaliação" : "Avalie este produto"}</strong>
        <div class="rv-pick" role="radiogroup" aria-label="Nota">
          ${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-n="${n}" aria-label="${n} estrela${n > 1 ? "s" : ""}">${this.STAR}</button>`).join("")}
          <span class="rv-pick-label"></span>
        </div>
        <textarea class="input" id="rvText" maxlength="1000" rows="3" placeholder="Conte o que achou do produto (opcional)">${esc(mine?.comment || "")}</textarea>
        <div class="rv-form-actions">
          <button class="btn btn-primary" type="submit">${mine ? "Salvar avaliação" : "Enviar avaliação"}</button>
          ${mine ? `<button class="btn btn-outline" type="button" id="rvCancel">Cancelar</button>` : ""}
        </div>
        <div class="form-msg" id="rvMsg"></div>
      </form>`;
    const paint = (n) => {
      $$(".rv-pick button", box).forEach((b) => b.classList.toggle("on", Number(b.dataset.n) <= n));
      $(".rv-pick-label", box).textContent = labels[n] || "";
    };
    paint(rating);
    $$(".rv-pick button", box).forEach((b) => {
      b.onmouseenter = () => paint(Number(b.dataset.n));
      b.onmouseleave = () => paint(rating);
      b.onclick = () => { rating = Number(b.dataset.n); paint(rating); };
    });
    if ($("#rvCancel", box)) $("#rvCancel", box).onclick = () => this.drawForm(box, p, mine, canReview, false);
    $("#rvF", box).onsubmit = async (e) => {
      e.preventDefault();
      const msg = $("#rvMsg", box);
      if (!rating) { msg.textContent = "Escolha de 1 a 5 estrelas."; msg.classList.add("show", "form-error"); return; }
      const row = {
        product_id: p.id, rating,
        comment: $("#rvText", box).value.trim() || null,
        nome: (DB.profile && DB.profile.nome) || DB.user.user_metadata?.nome || "Cliente",
      };
      const btn = $("button[type=submit]", box); btn.disabled = true;
      const { error } = mine
        ? await DB.client.from("reviews").update(row).eq("id", mine.id)
        : await DB.client.from("reviews").insert(row);
      btn.disabled = false;
      if (error) {
        msg.textContent = /row-level|policy/i.test(error.message)
          ? "Só é possível avaliar produtos de pedidos confirmados." : "Não foi possível enviar: " + error.message;
        msg.classList.add("show", "form-error");
        return;
      }
      toast("Obrigado pela avaliação! ♡");
      this.refresh(p);
    };
  },

  /* Recarrega a seção e a média do produto */
  async refresh(p) {
    await this.render($("#reviews"), p);
    if (window.DB && DB.loadRatings) { await DB.loadRatings(); }
  },
};
window.Reviews = Reviews;
