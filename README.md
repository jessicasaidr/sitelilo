# LiloPlay — Loja

Site da loja LiloPlay (HTML, CSS e JavaScript puro) com login e painel administrativo no Supabase.

## Rodar localmente

```
npm run dev
```

Abra http://localhost:3000.

## Configurar o Supabase (uma vez só)

1. Crie um projeto em https://supabase.com.
2. No painel do projeto, vá em **SQL Editor > New query**, cole todo o conteúdo de
   [`supabase/schema.sql`](supabase/schema.sql) e clique em **Run**.
   Isso cria as tabelas, as regras de segurança, o espaço das fotos (`produtos`) e os produtos de exemplo.
3. Em **Authentication > URL Configuration**:
   - **Site URL**: o endereço do site (ex.: `http://localhost:3000` enquanto testa, depois o domínio real).
   - **Redirect URLs**: adicione `http://localhost:3000/conta.html` e `https://SEU-DOMINIO/conta.html`.
4. Em **Authentication > Sign In / Providers > Email**, deixe **Confirm email** ativado.
   É isso que garante que só a dona do e-mail de administrador consegue entrar no painel.
5. Em **Project Settings > API**, copie a **Project URL** e a chave **anon public** para
   [`js/supabase-config.js`](js/supabase-config.js).
6. No site, clique em **Entrar > Criar conta** usando o e-mail de administrador,
   confirme pelo link que chega no e-mail e entre. O menu **Administração** aparece em **Minha conta**.

Para adicionar outro administrador, rode no SQL Editor:

```sql
insert into public.admins (email) values ('outro@email.com');
```

## Tabelas

| Tabela | O que guarda | Quem pode ver / editar |
|---|---|---|
| `profiles` | Dados completos de cada cliente (nome, telefone, CPF, endereço…) | O próprio cliente; o admin pode ver todos |
| `categories` | Categorias do menu e dos filtros | Todos veem as ativas; só o admin edita |
| `products` | Produtos, preços, fotos, opções e destaques | Todos veem os visíveis; só o admin edita |
| `store_settings` | WhatsApp dos pedidos, contatos, frete grátis, cupom, Pix | Todos veem; só o admin edita |
| `admins` | E-mails dos administradores | Ninguém pela internet (só pelo SQL Editor) |

As fotos ficam no Storage, no bucket público `produtos` (só o admin envia ou remove).

## Onde editar

- Produtos, categorias, contatos e WhatsApp: pelo painel em **Minha conta** (com o Supabase configurado).
- Sem o Supabase configurado, o site usa os dados de exemplo de [`js/data.js`](js/data.js).
- Logo: troque [`assets/logo.png`](assets/logo.png).
