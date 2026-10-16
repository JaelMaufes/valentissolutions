import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/leadIntegration";

/*
 * Aproxima — cartão por aproximação (adesivo NFC + página do cliente), por Valentis Solutions.
 *
 * LINKS DE COMPRA: vêm do Catálogo do Sistema Anille (Catálogo > Aproxima > ⋯ > Criar link de compra).
 * A página lê `links_de_venda()` no Supabase do Anille (pública: só links de produção da Valentis Solutions).
 * Cada venda paga pelo link entra sozinha no Anille como cliente, contrato e cobrança paga.
 * Sem link (ou se a consulta falhar), "Comprar agora" abre o WhatsApp com o pacote escolhido.
 * Preço: vale o do catálogo quando o link existe; os valores abaixo são só o padrão enquanto carrega.
 */
const ANILLE_SUPABASE = "https://tfrfatehckwpctypdudt.supabase.co";
const ANILLE_CHAVE_PUBLICA = "sb_publishable_2-oiY_q8qgVBYhgufc5ZNA_sgD6ljBL";

export type PlanoAproxima = {
  id: "individual" | "dupla" | "equipe";
  catalogo: string; // nome do serviço no Catálogo do Anille
  nome: string;
  preco: number;
  resumo: string;
  itens: string[];
  destaque?: string;
};

export const APROXIMA_PLANOS: PlanoAproxima[] = [
  {
    id: "individual",
    catalogo: "Aproxima — Individual",
    nome: "Individual",
    preco: 79.9,
    resumo: "Para quem atende na rua, em visitas e eventos.",
    itens: ["1 adesivo NFC anti-metal para o celular", "Sua página com WhatsApp, serviços e links", "Botão Salvar contato e QR code", "1 ajuste grátis nos primeiros 30 dias"],
  },
  {
    id: "dupla",
    catalogo: "Aproxima — Dupla",
    nome: "Dupla",
    preco: 119.9,
    resumo: "Celular e balcão: o cliente encosta onde estiver.",
    itens: ["2 adesivos NFC (celular e balcão ou vitrine)", "Sua página com WhatsApp, serviços e links", "Botão Salvar contato e QR code", "1 ajuste grátis nos primeiros 30 dias"],
    destaque: "Celular + balcão",
  },
  {
    id: "equipe",
    catalogo: "Aproxima — Equipe",
    nome: "Equipe",
    preco: 297,
    resumo: "Para equipes de venda, imobiliárias, clínicas e lojas.",
    itens: ["5 adesivos NFC anti-metal", "5 páginas, uma por pessoa, com a marca da empresa", "Botão Salvar contato e QR code em cada página", "1 ajuste grátis por página nos primeiros 30 dias"],
  },
];

export const APROXIMA_AJUSTE = 19.9;
export const APROXIMA_EXEMPLO = "/c/valentis-solutions";

export type LinkVenda = { url: string; valor: number };
export type LinksVenda = Record<string, LinkVenda>;

export function precoBRL(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Links de compra e preços do catálogo do Anille, por nome do serviço. Vazio enquanto carrega ou se falhar. */
export function useLinksVenda(): LinksVenda {
  const [links, setLinks] = useState<LinksVenda>({});
  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`${ANILLE_SUPABASE}/rest/v1/rpc/links_de_venda`, {
      method: "POST",
      headers: { apikey: ANILLE_CHAVE_PUBLICA, "Content-Type": "application/json" },
      body: "{}",
      signal: ctrl.signal,
    })
      .then(r => (r.ok ? r.json() : []))
      .then((linhas: Array<{ nome: string; valor: number | string; url: string }>) => {
        const mapa: LinksVenda = {};
        for (const l of Array.isArray(linhas) ? linhas : []) {
          if (l?.nome && typeof l.url === "string" && l.url.startsWith("https://")) mapa[l.nome] = { url: l.url, valor: Number(l.valor) };
        }
        setLinks(mapa);
      })
      .catch(() => { /* sem links: o botão abre o WhatsApp */ });
    return () => ctrl.abort();
  }, []);
  return links;
}

export function precoDe(plano: PlanoAproxima, links: LinksVenda) {
  const v = links[plano.catalogo]?.valor;
  return Number.isFinite(v) && (v as number) > 0 ? (v as number) : plano.preco;
}

export function comprarUrl(plano: PlanoAproxima, links: LinksVenda) {
  return links[plano.catalogo]?.url || whatsappUrl(`Olá! Quero comprar o Aproxima ${plano.nome} (${precoBRL(precoDe(plano, links))}).`);
}
