# Aproxima — páginas dos clientes

Cada arquivo `<slug>.json` desta pasta vira uma página em `c.sovalentis.com/<slug>` (o endereço gravado no adesivo).
A pasta `publico/` é publicada como está pelo Cloudflare Pages (projeto do c.sovalentis.com), a cada push na `main`.

1. Copie `valentis-solutions.json` para `<slug-do-cliente>.json` e troque os dados.
   - `logo` (marca horizontal) ou `foto` (pessoa): arquivo em `publico/img/` e caminho `/img/<arquivo>`.
     Imagens do kit da Valentis Solutions usam `/assets/...` (vêm do sovalentis.com).
   - Contato: `whatsapp` (só números, com 55), `telefone`, `email`, `site`, `instagram`, `endereco`, `avaliacao_google` (todos opcionais, menos o nome).
   - `itens`: serviços com `titulo`, `texto`, `link` e, se quiser, `botao`.
   - Deixe `rodape_aproxima` ausente (ou `true`) nos clientes: o rodapé leva para a página de venda do Aproxima.
   - Slugs reservados: img, editar, assets, admin, api.
2. Na pasta `source/`, rode `python3 scripts/cartoes/gerar.py <slug>`.
3. Grave no adesivo (app NFC Tools > Gravar > URL) o link que o script mostrar: `https://c.sovalentis.com/<slug>`.
4. Envie no PR: o JSON e a pasta `publico/<slug>/` gerada.
