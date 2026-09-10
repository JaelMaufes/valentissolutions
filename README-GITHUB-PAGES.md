# SoValentis / Valentis Solutions — GitHub Pages

Pacote estático atualizado para o domínio `sovalentis.com`.

## Publicação

1. Envie todo o conteúdo desta pasta para a raiz do repositório GitHub Pages.
2. Faça commit das alterações.
3. Em **Settings → Pages**, selecione **Deploy from a branch**, branch principal e `/ (root)`.
4. Em **Custom domain**, informe `sovalentis.com`.
5. Ative HTTPS depois que o GitHub concluir a emissão do certificado.

O pacote já inclui `CNAME`, `.nojekyll`, `404.html`, `robots.txt` e `sitemap.xml`.

## DNS recomendado

- Registro A de `@` para os quatro IPs oficiais do GitHub Pages:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- Registro CNAME de `www` apontando para o endereço `SEU_USUARIO.github.io`.

Substitua `SEU_USUARIO` pelo seu usuário ou organização do GitHub. Remova registros conflitantes e aguarde a propagação do DNS antes de ativar HTTPS.

## Rotas

- `/`
- `/diagnostico`
- `/servicos`
- `/planos`
