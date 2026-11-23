/* =========================================================
   Conexão com o Supabase (login, perfil, catálogo)
   Se o Supabase não estiver configurado, o site continua
   funcionando com os dados de exemplo do data.js.
   ========================================================= */
const DB = {
  client: null,
  user: null,
  profile: null,
  isAdmin: false,
  ready: false,

  get enabled() { return !!this.client; },

  async init() {
    if (this.ready) return;
    this.ready = true;
    const url = window.SUPABASE_URL, key = window.SUPABASE_ANON_KEY;
    if (!url || !key || !window.supabase) return;
    try {
      this.client = window.supabase.createClient(url, key);
      const { data } = await this.client.auth.getSession();
      this.user = data.session?.user || null;
      await Promise.race([
        Promise.all([this.loadCatalog(), this.user ? this.loadMe() : null]),
        new Promise((r) => setTimeout(r, 6000)),
      ]);
    } catch (e) {
      console.warn("Supabase indisponível, usando dados locais.", e);
    }
  },

  /* ---------- Catálogo ---------- */
  async loadCatalog() {
    const c = this.client;
    const [cats, prods, conf] = await Promise.all([
      c.from("categories").select("*").eq("active", true).order("sort_order").order("name"),
      c.from("products").select("*").eq("active", true).order("sort_order").order("id"),
      c.from("store_settings").select("*").eq("id", 1).maybeSingle(),
    ]);
    if (!cats.error && cats.data) {
      CATEGORIES.splice(0, CATEGORIES.length, ...cats.data.map(DB.mapCategory));
    }
    if (!prods.error && prods.data) {
      PRODUCTS.splice(0, PRODUCTS.length, ...prods.data.map(DB.mapProduct));
    }
    if (!conf.error && conf.data) {
      const s = conf.data;
      Object.assign(STORE, {
        name: s.name || STORE.name,
        slogan: s.slogan ?? STORE.slogan,
        whatsapp: s.whatsapp || STORE.whatsapp,
        whatsappLabel: s.whatsapp_label || STORE.whatsappLabel,
        phone: s.phone || STORE.phone,
        email: s.email || STORE.email,
        address: s.address || STORE.address,
        instagram: s.instagram || STORE.instagram,
        freeShipping: Number(s.free_shipping ?? STORE.freeShipping),
        coupon: s.coupon || STORE.coupon,
        maxInstallments: Number(s.max_installments || STORE.maxInstallments),
        pixDiscount: Number(s.pix_discount ?? STORE.pixDiscount),
      });
    }
  },

  mapCategory(r) {
    return { id: r.id, name: r.name, color: r.color, icon: r.icon, sort: r.sort_order, active: r.active };
  },
  mapProduct(r) {
    return {
      id: r.id,
      name: r.name,
      description: r.description || "",
      cat: r.category_id,
      price: Number(r.price),
      old: r.old_price != null ? Number(r.old_price) : null,
      color: r.color,
      icon: r.icon,
      images: r.images || [],
      options: r.options || [],
      variants: (Array.isArray(r.variants) ? r.variants : [])
        .filter((v) => v && v.label && v.price != null && v.price !== "")
        .map((v) => ({ label: String(v.label), price: Number(v.price), old: v.old_price != null && v.old_price !== "" ? Number(v.old_price) : null, pix: v.pix != null && v.pix !== "" ? Number(v.pix) : null })),
      tags: r.tags || [],
      ages: r.ages || "Todas",
      sold: r.sold || 0,
      personalizable: !!r.personalizable,
      active: r.active,
    };
  },

  /* ---------- Usuário ---------- */
  async loadMe() {
    if (!this.user) return;
    const [prof, adm] = await Promise.all([
      this.client.from("profiles").select("*").eq("id", this.user.id).maybeSingle(),
      this.client.rpc("is_admin"),
    ]);
    this.profile = prof.data || null;
    this.isAdmin = adm.data === true;
  },

  displayName() {
    const n = (this.profile?.nome || this.user?.user_metadata?.nome || "").trim();
    return n ? n.split(" ")[0] : (this.user?.email || "").split("@")[0];
  },

  async signIn(email, password) {
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    this.user = data.user;
    await this.loadMe();
  },

  async signUp({ nome, email, telefone, password }) {
    const { data, error } = await this.client.auth.signUp({
      email, password,
      options: { data: { nome, telefone }, emailRedirectTo: new URL("conta.html", location.href).href },
    });
    if (error) throw error;
    return data; // data.session é null quando a confirmação de e-mail está ativa
  },

  async resetPassword(email) {
    const { error } = await this.client.auth.resetPasswordForEmail(email, {
      redirectTo: new URL("conta.html?nova-senha=1", location.href).href,
    });
    if (error) throw error;
  },

  async signOut() {
    await this.client.auth.signOut();
    this.user = null; this.profile = null; this.isAdmin = false;
  },
};

/* Traduz as mensagens de erro mais comuns do Supabase */
function authErrorPt(err) {
  const m = (err?.message || "").toLowerCase();
  if (m.includes("invalid login")) return "E-mail ou senha incorretos.";
  if (m.includes("email not confirmed")) return "Confirme seu e-mail antes de entrar (veja sua caixa de entrada).";
  if (m.includes("already registered") || m.includes("already been registered")) return "Este e-mail já possui cadastro.";
  if (m.includes("password should be")) return "A senha precisa ter pelo menos 6 caracteres.";
  if (m.includes("rate limit") || m.includes("too many")) return "Muitas tentativas. Aguarde alguns minutos e tente de novo.";
  if (m.includes("failed to fetch") || m.includes("network")) return "Sem conexão com o servidor. Tente novamente.";
  return err?.message || "Algo deu errado. Tente novamente.";
}

window.DB = DB;
