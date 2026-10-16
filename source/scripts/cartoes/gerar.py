#!/usr/bin/env python3
"""Gera as páginas do Aproxima (cartão por aproximação) a partir de source/cartoes/*.json.

Para cada cartão cria, em source/client/public/c/<slug>/:
  index.html   página que abre ao encostar o celular no adesivo (sem dependências)
  contato.vcf  botão "Salvar contato"
  qr.svg       QR code da página, para quem não tem NFC

Uso (na pasta source/):  python3 scripts/cartoes/gerar.py            todos os cartões
                         python3 scripts/cartoes/gerar.py <slug>     só um
Requer só o Python 3 e o reportlab (gerador de QR code).
"""
from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path
from urllib.parse import quote

from reportlab.graphics.barcode.qr import QrCodeWidget

RAIZ = Path(__file__).resolve().parents[2]  # .../source
ORIGEM = RAIZ / "cartoes"
DESTINO = RAIZ / "client" / "public" / "c"
SITE = "https://sovalentis.com"
APROXIMA = f"{SITE}/aproxima"

e = lambda s: html.escape(str(s or ""), quote=True)  # noqa: E731

# Ícones no traço do lucide (o mesmo do site), 24x24.
ICONES = {
    "salvar": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
    "whatsapp": '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    "telefone": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    "email": '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    "site": '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
    "instagram": '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>',
    "mapa": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    "seta": '<path d="M7 7h10v10M7 17 17 7"/>',
    "codigo": '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    "alvo": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    "nfc": '<path d="M6 8.32a7.43 7.43 0 0 1 0 7.36M9.46 6.21a11.76 11.76 0 0 1 0 11.58M12.91 4.1a15.91 15.91 0 0 1 .01 15.8M16.37 2a20.16 20.16 0 0 1 0 20"/>',
    "compartilhar": '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/>',
    "estrela": '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
}


def icone(nome: str, classe: str = "ico") -> str:
    return (f'<svg class="{classe}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICONES[nome]}</svg>')


def qr_svg(texto: str) -> str:
    w = QrCodeWidget(texto, barLevel="M")
    w.draw()
    q = w.qr
    n = q.getModuleCount()
    borda = 4
    caminhos = []
    for r in range(n):
        c = 0
        while c < n:
            if q.isDark(r, c):
                ini = c
                while c < n and q.isDark(r, c):
                    c += 1
                caminhos.append(f"M{ini + borda} {r + borda}h{c - ini}v1h-{c - ini}z")
            else:
                c += 1
    lado = n + 2 * borda
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {lado} {lado}" shape-rendering="crispEdges" '
            f'role="img" aria-label="QR code de {e(texto)}"><rect width="{lado}" height="{lado}" fill="#fff"/>'
            f'<path fill="#080417" d="{"".join(caminhos)}"/></svg>\n')


def vcard(c: dict, url: str, nota: str) -> str:
    def v(s: str) -> str:
        return str(s).replace("\\", "\\\\").replace(",", "\\,").replace(";", "\\;").replace("\n", "\\n")
    linhas = ["BEGIN:VCARD", "VERSION:3.0", f"N:;{v(c['nome'])};;;", f"FN:{v(c['nome'])}"]
    if c.get("empresa"):
        linhas.append(f"ORG:{v(c['empresa'])}")
    if c.get("cargo"):
        linhas.append(f"TITLE:{v(c['cargo'])}")
    tel = c.get("whatsapp") or ""
    if tel:
        linhas.append(f"TEL;TYPE=CELL:+{tel}")
    if c.get("email"):
        linhas.append(f"EMAIL;TYPE=WORK:{c['email']}")
    if c.get("site"):
        linhas.append(f"URL:{c['site']}")
    if c.get("instagram"):
        linhas.append(f"X-SOCIALPROFILE;TYPE=instagram:https://instagram.com/{c['instagram'].lstrip('@')}")
    if c.get("endereco"):
        linhas.append(f"ADR;TYPE=WORK:;;{v(c['endereco'])};;;;")
    linhas.append(f"NOTE:{v(nota)} {url}")
    linhas.append("END:VCARD")
    return "\r\n".join(linhas) + "\r\n"


CSS = """
:root{--noite:#080417;--noite2:#110b2e;--linha:rgba(255,255,255,.12);--texto:#f4f2ff;--suave:#b9b3d9;--azul:#315EFA;--ciano:#01D2F3;--magenta:#F500C6;--violeta:#6A19F9;
--grad:linear-gradient(110deg,#315EFA 0%,#6A19F9 55%,#B414D6 100%);--moldura:linear-gradient(120deg,#F500C6,#6A19F9 45%,#3E4DF9 75%,#01D2F3);
--f-texto:"DM Sans",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;--f-titulo:"Outfit","DM Sans",ui-sans-serif,system-ui,sans-serif;color-scheme:dark}
*{box-sizing:border-box}html,body{margin:0;min-height:100%}
body{background:radial-gradient(120% 60% at 50% -10%,#1d1460 0%,rgba(8,4,23,0) 60%),var(--noite);color:var(--texto);font:400 16px/1.55 var(--f-texto);-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}img{max-width:100%;display:block}
.pag{max-width:460px;margin:0 auto;padding:calc(20px + env(safe-area-inset-top,0px)) 16px calc(28px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;gap:18px}
.topo{position:relative;padding:26px 22px 22px;border-radius:24px;border:1.5px solid transparent;
background:linear-gradient(160deg,#120b33,#0a0620) padding-box,var(--moldura) border-box;text-align:center;overflow:hidden}
.topo::after{content:"";position:absolute;inset:auto -30% -55% -30%;height:70%;background:radial-gradient(closest-side,rgba(106,25,249,.35),transparent);pointer-events:none}
.logo{height:auto;width:min(230px,72%);margin:0 auto}
.foto{width:96px;height:96px;border-radius:50%;object-fit:cover;margin:0 auto;border:3px solid rgba(255,255,255,.14)}
.nome{margin:16px 0 0;font:600 1.6rem/1.1 var(--f-titulo);letter-spacing:-.03em;text-wrap:balance}
.desc{margin:10px auto 0;max-width:34ch;color:var(--suave);font-size:.95rem;text-wrap:balance}
.cidade{display:inline-flex;align-items:center;gap:6px;margin-top:14px;padding:5px 12px;border:1px solid var(--linha);border-radius:999px;font-size:.78rem;font-weight:700;letter-spacing:.04em;color:#d8d4f0}
.cidade .ico{width:14px;height:14px;color:var(--ciano)}
.salvar{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;gap:10px;min-height:56px;margin-top:20px;border-radius:16px;background:var(--grad);color:#fff;font-weight:800;font-size:1.02rem;box-shadow:0 14px 30px -12px rgba(106,25,249,.8)}
.salvar .ico{width:21px;height:21px}
.acoes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.acao{display:flex;align-items:center;gap:10px;min-height:54px;padding:10px 14px;border:1px solid var(--linha);border-radius:14px;background:rgba(255,255,255,.04);font-weight:700;font-size:.92rem;min-width:0}
.acao span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.acao .ico{width:20px;height:20px;flex:none;color:var(--ciano)}
.acao.wa{grid-column:1/-1;justify-content:center;background:#fff;color:var(--noite);border-color:#fff;font-size:1rem}
.acao.wa .ico{color:#1aa65a}
.acao:active,.salvar:active,.servico:active{transform:scale(.985)}
.rotulo{margin:6px 2px -4px;font-size:.72rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--ciano)}
.anille{display:block;padding:20px;border-radius:20px;border:1.5px solid transparent;background:linear-gradient(#07051A,#07051A) padding-box,linear-gradient(120deg,#FF2FD2,#6A1BFF 50%,#00E5FF) border-box}
.anille img{height:34px;width:auto}
.anille .r{margin:14px 0 0;font:400 .7rem/1.3 "Noto Serif",Georgia,serif;letter-spacing:.28em;text-transform:uppercase;color:#19D3F0}
.anille h2{margin:8px 0 0;font:600 1.35rem/1.15 var(--f-titulo);letter-spacing:-.03em;color:#fff}
.anille p{margin:8px 0 0;color:#a9a3cf;font-size:.92rem}
.anille .selo{display:inline-block;margin-top:12px;padding:5px 11px;border-radius:999px;background:rgba(0,229,255,.1);color:#7ff0ff;font-size:.8rem;font-weight:700}
.anille .btn{display:flex;align-items:center;justify-content:center;gap:8px;min-height:48px;margin-top:16px;border-radius:999px;background:linear-gradient(120deg,#C41DDB 0%,#6A1BFF 50%,#3B5BFF 100%);color:#fff;font-weight:700}
.anille .btn .ico{width:17px;height:17px}
.servicos{display:grid;gap:10px}
.servico{display:grid;grid-template-columns:44px minmax(0,1fr) 18px;gap:12px;align-items:center;padding:14px;border:1px solid var(--linha);border-radius:16px;background:rgba(255,255,255,.035)}
.servico .ic{display:flex;width:44px;height:44px;align-items:center;justify-content:center;border-radius:12px;background:rgba(49,94,250,.16);color:#8fb0ff}
.servico .ic .ico{width:21px;height:21px}
.servico h3{margin:0;font-size:1rem;font-weight:800;letter-spacing:-.01em}
.servico p{margin:3px 0 0;color:var(--suave);font-size:.85rem;line-height:1.45}
.servico .cta{display:inline-block;margin-top:7px;color:var(--ciano);font-size:.82rem;font-weight:800}
.servico>.ico{width:18px;height:18px;color:var(--suave)}
.servico.nfc{border-color:transparent;background:linear-gradient(#0e0a2a,#0e0a2a) padding-box,var(--moldura) border-box}
.servico.nfc .ic{background:var(--grad);color:#fff}
.qr{display:grid;grid-template-columns:112px minmax(0,1fr);gap:16px;align-items:center;padding:16px;border:1px solid var(--linha);border-radius:18px}
.qr img{width:112px;height:112px;border-radius:12px;background:#fff}
.qr h2{margin:0;font-size:.98rem;font-weight:800}
.qr p{margin:4px 0 10px;color:var(--suave);font-size:.84rem}
.compartilhar{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0 14px;border:1px solid var(--linha);border-radius:999px;background:transparent;color:var(--texto);font:700 .85rem var(--f-texto);cursor:pointer}
.compartilhar .ico{width:16px;height:16px;color:var(--ciano)}
.rodape{text-align:center;color:#8a84ad;font-size:.78rem}
.rodape a{color:#d8d4f0;font-weight:700}
.rodape .marca{display:inline-flex;align-items:center;gap:6px}
.rodape .marca .ico{width:14px;height:14px;color:var(--ciano)}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
:focus-visible{outline:3px solid var(--ciano);outline-offset:3px}
@media (max-width:360px){.acoes{grid-template-columns:1fr}.qr{grid-template-columns:1fr;text-align:center}.qr img{margin:0 auto}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
"""

JS = """
(function(){var b=document.getElementById('compartilhar');if(!b)return;var u=b.getAttribute('data-url'),t=b.getAttribute('data-titulo');
b.addEventListener('click',function(){if(navigator.share){navigator.share({title:t,url:u}).catch(function(){});return;}
var ok=function(){b.lastChild.textContent=' Link copiado';};
if(navigator.clipboard){navigator.clipboard.writeText(u).then(ok,function(){window.prompt('Copie o link:',u);});}else{window.prompt('Copie o link:',u);}});})();
"""


def pagina(d: dict) -> tuple[str, str]:
    slug = d["slug"]
    url = f"{SITE}/c/{slug}"
    c = d["contato"]
    titulo = d["titulo"]

    if d.get("logo"):
        lg = d["logo"]
        cab = f'<img class="logo" src="{e(lg["src"])}" width="{lg["largura"]}" height="{lg["altura"]}" alt="{e(lg["alt"])}">'
        nome_html = f'<h1 class="sr">{e(titulo)}</h1>'
    else:
        cab = (f'<img class="foto" src="{e(d["foto"])}" width="96" height="96" alt="">' if d.get("foto") else "")
        nome_html = f'<h1 class="nome">{e(titulo)}</h1>'

    cidade = f'<div class="cidade">{icone("mapa")}{e(d["cidade"])}</div>' if d.get("cidade") else ""

    acoes = []
    if c.get("whatsapp"):
        msg = c.get("mensagem_whatsapp") or f"Olá! Peguei seu contato pelo cartão de {titulo}."
        acoes.append(f'<a class="acao wa" href="https://wa.me/{e(c["whatsapp"])}?text={quote(msg)}">{icone("whatsapp")}<span>Chamar no WhatsApp</span></a>')
    if c.get("telefone"):
        tel = re.sub(r"[^\d+]", "", c["telefone"])
        acoes.append(f'<a class="acao" href="tel:{e(tel)}">{icone("telefone")}<span>Ligar</span></a>')
    if c.get("email"):
        acoes.append(f'<a class="acao" href="mailto:{e(c["email"])}">{icone("email")}<span>E-mail</span></a>')
    if c.get("site"):
        acoes.append(f'<a class="acao" href="{e(c["site"])}">{icone("site")}<span>Site</span></a>')
    if c.get("instagram"):
        ig = c["instagram"].lstrip("@")
        acoes.append(f'<a class="acao" href="https://instagram.com/{e(ig)}">{icone("instagram")}<span>@{e(ig)}</span></a>')
    if c.get("endereco"):
        acoes.append(f'<a class="acao" href="https://maps.google.com/?q={quote(c["endereco"])}">{icone("mapa")}<span>Como chegar</span></a>')
    if c.get("avaliacao_google"):
        acoes.append(f'<a class="acao" href="{e(c["avaliacao_google"])}">{icone("estrela")}<span>Avaliar no Google</span></a>')
    # Botões em número par ficam alinhados; o do WhatsApp ocupa a linha inteira.
    resto = len(acoes) - (1 if c.get("whatsapp") else 0)
    if resto % 2 == 1:
        acoes[-1] = acoes[-1].replace('class="acao"', 'class="acao" style="grid-column:1/-1"', 1)

    blocos = []
    servicos = []
    for it in d.get("itens", []):
        if it["tipo"] == "destaque":
            lg = it["logo"]
            blocos.append(
                f'<a class="anille" href="{e(it["link"])}"><img src="{e(lg["src"])}" width="{lg["largura"]}" height="{lg["altura"]}" alt="{e(lg["alt"])}">'
                f'<p class="r">{e(it.get("rotulo"))}</p><h2>{e(it["titulo"])}</h2><p>{e(it.get("texto"))}</p>'
                + (f'<span class="selo">{e(it["selo"])}</span>' if it.get("selo") else "")
                + f'<span class="btn">{e(it.get("botao", "Saiba mais"))}{icone("seta")}</span></a>')
        else:
            extra = " nfc" if it.get("icone") == "nfc" else ""
            cta = f'<span class="cta">{e(it["botao"])} →</span>' if it.get("botao") else ""
            servicos.append(
                f'<a class="servico{extra}" href="{e(it["link"])}"><span class="ic">{icone(it.get("icone", "seta"))}</span>'
                f'<span><h3>{e(it["titulo"])}</h3><p>{e(it.get("texto"))}</p>{cta}</span>{icone("seta")}</a>')
    if servicos:
        blocos.append(f'<p class="rotulo">{e(d.get("rotulo_servicos", "Serviços"))}</p><div class="servicos">{"".join(servicos)}</div>')

    if d.get("rodape_aproxima", True):
        rodape = (f'<a class="marca" href="{APROXIMA}">{icone("nfc")}Cartão Aproxima, por Valentis Solutions</a><br>'
                  f'<a href="{APROXIMA}">Quero um cartão assim</a>')
    else:
        rodape = f'© Valentis Solutions · <a href="{SITE}">sovalentis.com</a>'

    desc = d.get("descricao", "")
    doc = f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(titulo)}</title>
<meta name="description" content="{e(desc)}">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#080417">
<link rel="canonical" href="{url}">
<meta property="og:type" content="profile">
<meta property="og:title" content="{e(titulo)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}{e(d.get("og", "/assets/marca/og-valentis-solutions.png"))}">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/assets/marca/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700;800&family=Noto+Serif&family=Outfit:wght@600&display=swap">
<style>{CSS.strip()}</style>
</head>
<body>
<main class="pag">
<header class="topo">
{cab}
{nome_html}
<p class="desc">{e(desc)}</p>
{cidade}
<a class="salvar" href="/c/{slug}/contato.vcf">{icone("salvar")}Salvar contato</a>
</header>
<nav class="acoes" aria-label="Contato">
{chr(10).join(acoes)}
</nav>
{chr(10).join(blocos)}
<section class="qr" aria-label="QR code">
<img src="/c/{slug}/qr.svg" width="112" height="112" alt="QR code desta página">
<div><h2>Mostre para quem não tem NFC</h2><p>A câmera do celular lê o código e abre esta mesma página.</p>
<button type="button" class="compartilhar" id="compartilhar" data-url="{url}" data-titulo="{e(titulo)}">{icone("compartilhar")} Compartilhar</button></div>
</section>
<footer class="rodape">{rodape}</footer>
</main>
<script>{JS.strip()}</script>
</body>
</html>
"""
    nota = d.get("nota_vcard") or f"Cartão digital de {titulo}:"
    return doc, vcard(c, url, nota)


def gerar(arquivo: Path) -> None:
    d = json.loads(arquivo.read_text(encoding="utf-8"))
    slug = d["slug"]
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", slug):
        raise SystemExit(f"{arquivo.name}: slug inválido '{slug}' (use letras minúsculas, números e hífen)")
    url = f"{SITE}/c/{slug}"
    pasta = DESTINO / slug
    pasta.mkdir(parents=True, exist_ok=True)
    doc, vcf = pagina(d)
    (pasta / "index.html").write_text(doc, encoding="utf-8")
    (pasta / "contato.vcf").write_bytes(vcf.encode("utf-8"))
    (pasta / "qr.svg").write_text(qr_svg(url), encoding="utf-8")
    bytes_nfc = len(url.encode()) - len("https://") + 7  # registro URI do NDEF com prefixo abreviado
    print(f"{slug}: {url}  (grave este link no adesivo; cerca de {bytes_nfc} bytes, cabe em NTAG213/215)")


def main() -> None:
    alvo = sys.argv[1:] or None
    arquivos = sorted(ORIGEM.glob("*.json"))
    if alvo:
        arquivos = [a for a in arquivos if a.stem in alvo]
        if not arquivos:
            raise SystemExit(f"Nenhum cartão encontrado para: {', '.join(alvo)}")
    for a in arquivos:
        gerar(a)


if __name__ == "__main__":
    main()
