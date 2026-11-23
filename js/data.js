/* =========================================================
   DADOS DA LOJA — edite aqui para trocar produtos, contatos etc.
   (Produtos abaixo são EXEMPLOS para montar o layout.)
   ========================================================= */
const STORE = {
  name: "LiloPlay",
  slogan: "Plataforma de Estudo",
  whatsapp: "5500000000000",             // troque pelo número real (só dígitos, com DDI 55)
  whatsappLabel: "(00) 00000-0000",
  phone: "(00) 0000-0000",
  email: "contato@liloplay.com.br",
  address: "Rua Exemplo, 123 - Cidade/UF",
  instagram: "liloplay",
  freeShipping: 250,
  coupon: null,
  maxInstallments: 3,
  pixDiscount: 0.05,
};

/* Cores pastel disponíveis: blue, green, purple, indigo, magenta, orange, rose, cyan, yellow
   Ícones disponíveis: star, trophy, pencil, cap, puzzle, phone, flag, users, house, cube, book, heart, gift, rocket */
const CATEGORIES = [
  { id: "materiais-manipulaveis",  name: "Materiais Manipuláveis",  color: "magenta", icon: "puzzle" },
  { id: "kits-educativos", name: "Kits Educativos",        color: "blue",    icon: "cap" },
  { id: "personalizados", name: "Personalizados",           color: "orange", icon: "star" },
  { id: "jogos",          name: "Jogos 3D",                 color: "rose",   icon: "phone" },
];

const PRODUCTS = [
  { id: 1,  name: "Alfabeto 3D Colorido - Kit A a Z",             cat: "materiais-manipulaveis",   price: 89.90,  old: 119.90, color: "magenta", icon: "puzzle", sold: 120, tags: ["queridinhos","promo"], ages: "3+",
    images: ["assets/produtos/alfabeto-3d/capa.jpg", "assets/produtos/alfabeto-3d/1.jpg", "assets/produtos/alfabeto-3d/2.jpg", "assets/produtos/alfabeto-3d/3.jpg"],
    variants: [{ label: "1 unidade", price: 89.90, old: 119.90 }, { label: "Kit com 3", price: 249.90, old: 359.70 }, { label: "Kit com 5", price: 399.90, old: 599.50 }] },
  { id: 2,  name: "Kit Números 0 a 9 com Peças de Encaixe",        cat: "materiais-manipulaveis",   price: 69.90,              color: "cyan",    icon: "cube",   sold: 85,  tags: ["queridinhos"], ages: "3+",
    images: ["assets/produtos/kit-numeros/capa.jpg", "assets/produtos/kit-numeros/1.jpg", "assets/produtos/kit-numeros/2.jpg", "assets/produtos/kit-numeros/3.jpg", "assets/produtos/kit-numeros/4.jpg", "assets/produtos/kit-numeros/5.jpg"] },
  { id: 3,  name: "Marcador de Página Clip - Letras (10 unds.)",    cat: "materiais-manipulaveis",   price: 34.90,              color: "purple",  icon: "book",   sold: 210, tags: ["queridinhos","lancamentos"], ages: "5+",
    images: ["assets/produtos/marcador-clip/capa.jpg", "assets/produtos/marcador-clip/1.jpg", "assets/produtos/marcador-clip/2.jpg"] },
  { id: 4,  name: "Chaveiro Turma da Lilo - Personalizado com Nome", cat: "personalizados", price: 29.90,              color: "orange",  icon: "heart",  sold: 64,  tags: ["queridinhos","lancamentos"], ages: "Todas",
    variants: [{ label: "1 unidade", price: 29.90 }, { label: "Kit com 3", price: 79.90 }, { label: "Kit com 5", price: 124.90 }] },
  { id: 6,  name: "Kit Homeschooling 1º Ano - Português e Matemática", cat: "kits-educativos", price: 149.90,           color: "blue",    icon: "cap",    sold: 48,  tags: ["lancamentos"], ages: "6+" },
  { id: 7,  name: "Jogo da Memória Turma da Lilo",                  cat: "jogos",           price: 49.90,              color: "rose",    icon: "users",  sold: 77,  tags: ["lancamentos","queridinhos"], ages: "3+" },
  { id: 9,  name: "Tabuada Divertida - Fichas Plastificadas",       cat: "kits-educativos", price: 59.90,  old: 79.90,  color: "indigo",  icon: "trophy", sold: 92,  tags: ["promo"], ages: "7+" },
  { id: 10, name: "Patinhos de Borracha 3D - Kit Contagem",         cat: "materiais-manipulaveis",   price: 79.90,              color: "yellow",  icon: "cube",   sold: 33,  tags: ["promo","lancamentos"], ages: "2+",
    images: ["assets/produtos/patinhos/capa.jpg", "assets/produtos/patinhos/1.jpg", "assets/produtos/patinhos/2.jpg", "assets/produtos/patinhos/3.jpg"] },
  { id: 11, name: "Caderno de Caligrafia Personalizado",            cat: "personalizados",  price: 44.90,              color: "cyan",    icon: "pencil", sold: 58,  tags: ["promo"], ages: "5+" },
  { id: 12, name: "Quebra-Cabeça Sistema Solar 3D",                 cat: "materiais-manipulaveis",   price: 99.90,  old: 129.90, color: "indigo",  icon: "rocket", sold: 41,  tags: ["promo","queridinhos"], ages: "5+",
    images: ["assets/produtos/sistema-solar/capa.jpg", "assets/produtos/sistema-solar/1.jpg", "assets/produtos/sistema-solar/2.jpg", "assets/produtos/sistema-solar/3.jpg"] },
  { id: 13, name: "Kit Atividades em Casa - Coordenação Motora",    cat: "kits-educativos", price: 119.90,             color: "green",   icon: "house",  sold: 26,  tags: ["lancamentos"], ages: "3+" },
  { id: 14, name: "Bingo das Sílabas",                              cat: "jogos",           price: 54.90,              color: "magenta", icon: "flag",   sold: 69,  tags: [], ages: "5+" },
  { id: 16, name: "Cartões de Inglês Ilustrados (50 cartas)",       cat: "jogos",           price: 39.90,              color: "blue",    icon: "flag",   sold: 51,  tags: [], ages: "4+" },
];
