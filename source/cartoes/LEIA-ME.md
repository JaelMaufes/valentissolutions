# Aproxima — páginas dos clientes

Cada arquivo `<slug>.json` desta pasta vira uma página em `sovalentis.com/c/<slug>`.

1. Copie `valentis-solutions.json` para `<slug-do-cliente>.json` e troque os dados.
   - `logo` (marca horizontal) ou `foto` (pessoa); arquivos em `client/public/assets/clientes/`.
   - Contato: `whatsapp` (só números, com 55), `telefone`, `email`, `site`, `instagram`, `endereco`, `avaliacao_google` (todos opcionais, menos o nome).
   - `itens`: serviços com `titulo`, `texto`, `link` e, se quiser, `botao`.
   - Deixe `rodape_aproxima` ausente (ou `true`) nos clientes: o rodapé leva para a página de venda do Aproxima.
2. Na pasta `source/`, rode `python3 scripts/cartoes/gerar.py <slug>`.
3. Grave no adesivo (app NFC Tools > Gravar > URL) o link que o script mostrar.
4. Envie no PR: o JSON e a pasta `client/public/c/<slug>/` gerada.
