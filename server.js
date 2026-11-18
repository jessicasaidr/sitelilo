// Servidor local simples para ver o site: npm run dev
// Sem dependências — usa apenas módulos nativos do Node.
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 3000;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

http
  .createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath.endsWith("/")) urlPath += "index.html";
    const file = path.normalize(path.join(ROOT, urlPath));
    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end("Acesso negado");
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Página não encontrada");
        return;
      }
      res.writeHead(200, {
        "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      res.end(data);
    });
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`\n  A porta ${PORT} já está em uso — provavelmente o site JÁ está rodando em outro terminal.`);
      console.log(`  Abra http://localhost:${PORT} no navegador.`);
      console.log(`  (Para reiniciar: feche o outro terminal com Ctrl + C e rode "npm run dev" de novo.)\n`);
      process.exit(0);
    }
    throw err;
  })
  .listen(PORT, () => {
    console.log(`\n  LiloPlay rodando em: http://localhost:${PORT}\n  (Ctrl + C para parar)\n`);
  });
