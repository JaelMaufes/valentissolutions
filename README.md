# Valentis Solutions

Site institucional da Valentis Solutions. Os arquivos publicados na raiz deste repositório continuam sendo o build atualmente utilizado pelo site em `sovalentis.com`.

## Código-fonte

O código-fonte completo React/Vite foi preservado em [`source/`](./source/). A pasta mantém a estrutura original do projeto, incluindo `client/`, `server/`, `shared/`, `package.json`, `vite.config.ts`, `tsconfig.json` e `pnpm-lock.yaml`.

## Desenvolvimento local

Requisitos: Node.js e pnpm.

```bash
cd source
pnpm install --frozen-lockfile
pnpm dev
```

O servidor de desenvolvimento é iniciado pelo script `dev` do `package.json` e fica disponível no endereço informado pelo Vite.

## Build de produção

O comando de build utilizado pelo projeto é:

```bash
cd source
pnpm install --frozen-lockfile
pnpm build
```

O script executa `vite build` e empacota o servidor de compatibilidade com esbuild. O resultado final é gerado em `source/dist/`.

## Deploy atual

O deploy público atual é feito pelo conteúdo compilado publicado na raiz do repositório, utilizando GitHub Pages e o domínio personalizado `sovalentis.com`. As páginas compiladas, `CNAME`, `404.html`, `_redirects.txt`, `robots.txt`, `sitemap.xml` e os diretórios de rota permanecem na raiz para não interromper a versão atualmente publicada.

A migração desta branch adiciona o código-fonte em `source/` sem substituir os arquivos publicados. O build do projeto-fonte deve ser validado localmente antes de qualquer decisão de publicação. Esta branch não altera automaticamente a `main`, não faz merge e não dispara novo deploy por si só.
