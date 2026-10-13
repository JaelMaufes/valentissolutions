import { ArrowRight, Check } from "lucide-react";

/* Apresentação do Sistema Anille no site da Valentis Solutions, na identidade visual
   da marca Anille (canvas "Logo Anille"): noite #07051A, símbolo cubo-A, Outfit nos
   títulos e o descritor em Noto Serif. Telas com dados fictícios (Studio Exemplo). */
export const ANILLE_URL = "https://anille.sovalentis.com";
export const ANILLE_TESTE_URL = "https://painel.sovalentis.com/?cadastro&plano=essencial";

const destaques = [
  "Teste grátis por 14 dias, sem cartão",
  "Implantação sozinho ou com a nossa equipe",
  "No computador e no celular",
];

const modulos = ["Leads e funil", "Contratos e cobranças", "Nota fiscal de serviço", "Projetos e ordens de serviço", "Lucro por cliente"];

export default function AnilleShowcase({ id = "anille", compacto = false }: { id?: string; compacto?: boolean }) {
  return (
    <section id={id} className={`anille-vitrine ${compacto ? "anille-vitrine-compacta" : ""}`} aria-labelledby={`${id}-titulo`}>
      <div className="container anille-grid">
        <div className="anille-texto">
          <img className="anille-logo" src="/assets/anille/anille-logo-branco.svg" width="797" height="280" alt="Anille" />
          <p className="anille-descritor">Um produto Valentis Solutions</p>
          <h2 id={`${id}-titulo`} className="anille-titulo">Do funil ao lucro, num só lugar.</h2>
          <p className="anille-copy">
            O Sistema Anille é a nossa plataforma de gestão por assinatura para empresas de serviço de 1 a 15 pessoas. Liga a venda, a entrega e o dinheiro, e mostra o lucro de cada cliente.
          </p>
          <ul className="anille-modulos" aria-label="O que vem no Anille">
            {modulos.map(m => <li key={m}>{m}</li>)}
          </ul>
          <div className="anille-acoes">
            <a className="anille-btn anille-btn-pri" href={ANILLE_URL}>Conhecer o Anille <ArrowRight size={17} /></a>
            <a className="anille-btn anille-btn-sec" href={ANILLE_TESTE_URL}>Testar grátis por 14 dias</a>
          </div>
          <ul className="anille-destaques">
            {destaques.map(d => <li key={d}><Check size={15} />{d}</li>)}
          </ul>
        </div>
        {!compacto && (
          <figure className="anille-telas">
            <img className="anille-tela" src="/assets/anille/resultado-desk-claro.webp" width="1600" height="1000" loading="lazy" decoding="async" alt="Aba Resultado do Sistema Anille: lucro do período, recebido, custos e retorno (ROI e ROA)" />
            <img className="anille-tela-cel" src="/assets/anille/resultado-cel-claro.webp" width="780" height="1688" loading="lazy" decoding="async" alt="" aria-hidden="true" />
            <figcaption>Dados fictícios.</figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
