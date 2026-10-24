import { ArrowRight, Check } from "lucide-react";

/* Apresentação do Sistema Anive no site da Valentis Solutions, na identidade visual
   da marca Anive (canvas "Logo Anive"): noite #07051A, símbolo cubo-A, Outfit nos
   títulos e o descritor em Noto Serif. Telas com dados fictícios (Studio Exemplo). */
export const ANILLE_URL = "https://anive.sovalentis.com";
export const ANILLE_TESTE_URL = "https://painel.sovalentis.com/?cadastro&plano=essencial";
export const ANIVE_BOX_URL = "https://anive.sovalentis.com/box/";
export const ANIVE_BOX_TESTE_URL = "https://painel.sovalentis.com/?cadastro=box&plano=box_pro";

const destaques = [
  "Teste grátis por 14 dias, sem cartão",
  "Implantação sozinho ou com a nossa equipe",
  "No computador e no celular",
];

const modulos = ["Leads e funil", "Contratos e cobranças", "Nota fiscal de serviço", "Contas a pagar e fluxo de caixa", "Projetos e ordens de serviço", "Lucro por cliente"];

export default function AnilleShowcase({ id = "anille", compacto = false }: { id?: string; compacto?: boolean }) {
  return (
    <section id={id} className={`anille-vitrine ${compacto ? "anille-vitrine-compacta" : ""}`} aria-labelledby={`${id}-titulo`}>
      <div className="container anille-grid">
        <div className="anille-texto">
          <img className="anille-logo" src="/assets/anive/anive-logo-branco.svg" width="808" height="280" alt="Anive" />
          <p className="anille-descritor">Um produto Valentis Solutions</p>
          <h2 id={`${id}-titulo`} className="anille-titulo">Do funil ao lucro, num só lugar.</h2>
          <p className="anille-copy">
            O Sistema Anive é a nossa plataforma de gestão por assinatura para empresas de serviço de 1 a 15 pessoas. Liga a venda, a entrega e o dinheiro, e mostra o lucro de cada cliente.
          </p>
          <ul className="anille-modulos" aria-label="O que vem no Anive">
            {modulos.map(m => <li key={m}>{m}</li>)}
          </ul>
          <div className="anille-acoes">
            <a className="anille-btn anille-btn-pri" href={ANILLE_URL}>Conhecer o Anive <ArrowRight size={17} /></a>
            <a className="anille-btn anille-btn-sec" href={ANILLE_TESTE_URL}>Testar grátis por 14 dias</a>
          </div>
          <ul className="anille-destaques">
            {destaques.map(d => <li key={d}><Check size={15} />{d}</li>)}
          </ul>
          <a className="anive-box-faixa" href={ANIVE_BOX_URL}>
            <span className="anive-box-selo">Novo</span>
            <span><strong>Anive Box</strong> para boxes de CrossFit, Hyrox e treino funcional: recepção em 5 botões, aulas e check-in, app do aluno e cobrança recorrente.</span>
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
        {!compacto && (
          <figure className="anille-telas">
            <img className="anille-tela" src="/assets/anive/resultado-desk-claro.webp" width="1600" height="1000" loading="lazy" decoding="async" alt="Aba Resultado do Sistema Anive: lucro do período, recebido, custos e retorno (ROI e ROA)" />
            <img className="anille-tela-cel" src="/assets/anive/resultado-cel-claro.webp" width="780" height="1688" loading="lazy" decoding="async" alt="" aria-hidden="true" />
            <figcaption>Dados fictícios.</figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
