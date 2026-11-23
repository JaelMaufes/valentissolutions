# valentissolutions — Site da Valentis Solutions

Site institucional da **Valentis Solutions** em `sovalentis.com` (React + Vite), com a vitrine do Sistema Anive e das edições, o Aproxima e os cartões por aproximação em `c.sovalentis.com`.
Repositórios irmãos: `vs-painel` (o sistema, `painel.sovalentis.com`) e `anille-site` (portal do Anive, `anive.sovalentis.com`).

## Pastas
```
source/                    projeto (todo o código fica aqui; a raiz só tem este README e os workflows)
  client/index.html        HTML base, SEO e dados estruturados da empresa
  client/src/pages/        uma página por rota (Home, Services, Systems "Sob medida", About, Aproxima, Diagnostic, Plans, TrafegoPago, Legal)
  client/src/components/   MarketingLayout (topo, menu, rodapé), BrandHub (cubo com as órbitas), AnilleShowcase (vitrine do Anive) e componentes de interface
  client/src/lib/          empresa.ts (dados oficiais, fonte única), aproxima.ts (pacotes; preços e links vêm do Catálogo do Anive), leadIntegration.ts (formulário de diagnóstico)
  client/src/index.css     estilos e blocos por assunto (hub, menu, vitrine, Aproxima, rolagem)
  client/public/           arquivos copiados como estão: assets/marca (kit da marca), assets/anive (logos das edições e imagens da vitrine), _headers, _redirects, CNAME, robots.txt, sitemap.xml
  cartoes/                 cartões do Aproxima (um .json por cliente; publico/ é o site c.sovalentis.com, sem build)
  scripts/cartoes/         gerar.py: gera a página de um cartão (passo a passo em cartoes/LEIA-ME.md)
  server/                  servidor de compatibilidade do build (não é usado na publicação estática)
```

## Comandos
```bash
cd source
pnpm install --frozen-lockfile
pnpm dev       # desenvolvimento
pnpm check     # TypeScript
pnpm build     # gera source/dist/public
```

## Publicação
- **Hoje:** GitHub Actions (`.github/workflows/deploy-pages.yml`) compila `source/` a cada push no `main`, confere o pacote (rotas, CNAME, sem ferramentas do editor) e publica no GitHub Pages com o domínio `sovalentis.com`. A raiz do repositório não é publicada.
- **Todo PR:** `.github/workflows/verificar-build.yml` (TypeScript e build).
- **Migração para o Cloudflare Pages** (decidida em 15/11, roteiro `roteiros/sovalentis-cloudflare.md` do projeto): build `cd source && pnpm install --frozen-lockfile && pnpm build`, saída `source/dist/public`; cabeçalhos em `client/public/_headers`. Depois do domínio no Cloudflare, sai o `deploy-pages.yml` e o repositório fica privado.
- **Cartões `c.sovalentis.com`:** projeto próprio no Cloudflare Pages, sem build, saída `source/cartoes/publico`.

## Regras
- Empresa sempre "Valentis Solutions", nunca só "Valentis". Telefone e WhatsApp únicos: (44) 3112-4446 (em `lib/empresa.ts`).
- Marca da Valentis Solutions pelo kit (`client/public/assets/marca/`); peças do Anive pelo canvas "Logo Anive".
- Preços do Anive só no portal `anive.sovalentis.com`; preços do Aproxima vêm do Catálogo do Anive (`links_de_venda()`).
- Item novo no menu do topo: conferir entre 1024 e 1366 px (o menu não pode quebrar em duas linhas). Produto novo no cubo: redistribuir os ângulos em `BrandHub.tsx`.

Licença: proprietária, todos os direitos reservados à Valentis Solutions.
