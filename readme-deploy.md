# Valentis Solutions — pacote de deploy

Este diretório contém o build estático pronto para publicação.

## Deploy manual no Netlify

1. Acesse o painel do site no Netlify.
2. Abra a área de deploy manual.
3. Arraste **todo o conteúdo deste diretório** para a área de upload.
4. Não envie a pasta pai; envie os arquivos `index.html`, `assets/`, `robots.txt` e demais arquivos diretamente.

## Rotas disponíveis

- `/` — homepage
- `/diagnostico` — formulário interativo de diagnóstico
- `/servicos` — serviços por gargalo
- `/planos` — planos e condições

O site é client-side e o projeto contém fallback de rota no servidor WebDev. Para hospedagem estática com refresh direto em rotas internas, configure redirect de SPA conforme o provedor.
