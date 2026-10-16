import { whatsappUrl } from "@/lib/leadIntegration";

/*
 * Aproxima — cartão por aproximação (adesivo NFC + página do cliente), por Valentis Solutions.
 *
 * LINKS DE PAGAMENTO: cole em `linkPagamento` o link de cada pacote criado no Mercado Pago
 * (Seu negócio > Link de pagamento). Enquanto estiver vazio, o botão "Comprar agora" abre o
 * WhatsApp com a mensagem do pacote, para fechar a venda por lá.
 */
export type PlanoAproxima = {
  id: "individual" | "dupla" | "equipe";
  nome: string;
  preco: number;
  resumo: string;
  itens: string[];
  destaque?: string;
  linkPagamento: string;
};

export const APROXIMA_PLANOS: PlanoAproxima[] = [
  {
    id: "individual",
    nome: "Individual",
    preco: 79.9,
    resumo: "Para quem atende na rua, em visitas e eventos.",
    itens: ["1 adesivo NFC anti-metal para o celular", "Sua página com WhatsApp, serviços e links", "Botão Salvar contato e QR code", "1 ajuste grátis nos primeiros 30 dias"],
    linkPagamento: "",
  },
  {
    id: "dupla",
    nome: "Dupla",
    preco: 119.9,
    resumo: "Celular e balcão: o cliente encosta onde estiver.",
    itens: ["2 adesivos NFC (celular e balcão ou vitrine)", "Sua página com WhatsApp, serviços e links", "Botão Salvar contato e QR code", "1 ajuste grátis nos primeiros 30 dias"],
    destaque: "Celular + balcão",
    linkPagamento: "",
  },
  {
    id: "equipe",
    nome: "Equipe",
    preco: 297,
    resumo: "Para equipes de venda, imobiliárias, clínicas e lojas.",
    itens: ["5 adesivos NFC anti-metal", "5 páginas, uma por pessoa, com a marca da empresa", "Botão Salvar contato e QR code em cada página", "1 ajuste grátis por página nos primeiros 30 dias"],
    linkPagamento: "",
  },
];

export const APROXIMA_AJUSTE = 19.9;
export const APROXIMA_EXEMPLO = "/c/valentis-solutions";

export function precoBRL(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function comprarUrl(plano: PlanoAproxima) {
  return plano.linkPagamento || whatsappUrl(`Olá! Quero comprar o Aproxima ${plano.nome} (${precoBRL(plano.preco)}).`);
}
