import { useEffect } from "react";
import { ArrowRight, ArrowUpRight, Check, ListChecks, MessageCircle, PackageCheck, QrCode, RefreshCw, Send, ShieldCheck, Smartphone, Truck, UserPlus } from "lucide-react";
import { CheckLine, Footer, Header } from "@/components/MarketingLayout";
import { trackLeadEvent, whatsappUrl } from "@/lib/leadIntegration";
import { APROXIMA_AJUSTE, APROXIMA_EXEMPLO, APROXIMA_PLANOS, comprarUrl, precoBRL, precoDe, useLinksVenda } from "@/lib/aproxima";

const passos = [
  { icon: Send, title: "Você compra e manda seus dados", text: "Depois do pagamento, envie pelo WhatsApp seu logo ou foto, WhatsApp, serviços e links." },
  { icon: ListChecks, title: "Montamos sua página", text: "Página no seu nome, com a sua marca, no ar em até 2 dias úteis. Você aprova antes de gravar." },
  { icon: PackageCheck, title: "Gravamos e entregamos o adesivo", text: "O adesivo sai gravado com o link da sua página e um QR code para quem não tem NFC." },
  { icon: Smartphone, title: "É só encostar", text: "O cliente aproxima o celular do seu, a página abre e ele salva seu contato na agenda." },
];

const pagina = [
  { icon: UserPlus, title: "Salvar contato", text: "Um toque e seu nome, telefone, e-mail e site vão direto para a agenda do cliente." },
  { icon: MessageCircle, title: "WhatsApp com mensagem pronta", text: "O cliente já chega dizendo de onde veio. Você atende sem perder o contato." },
  { icon: ListChecks, title: "Serviços e links", text: "Serviços, Instagram, site, endereço, avaliação no Google: o que fizer sentido para você." },
  { icon: QrCode, title: "QR code incluso", text: "Para celular sem NFC: a câmera lê o código e abre a mesma página." },
];

const compat = [
  { titulo: "iPhone XR ou mais novo", texto: "Basta encostar com a tela desbloqueada." },
  { titulo: "iPhone 7 ao X", texto: "Abrir o leitor de NFC na Central de Controle e encostar." },
  { titulo: "Android com NFC", texto: "A maioria dos modelos lê com o NFC ligado, sem app." },
  { titulo: "Qualquer celular", texto: "Pelo QR code, com a câmera." },
];

const faq = [
  { q: "Tem mensalidade?", a: "Não. Você paga uma vez e a página fica no ar, sem cobrança mensal." },
  { q: "Posso mudar a página depois?", a: `Sim. O primeiro ajuste nos 30 dias seguintes à entrega é grátis. Depois, cada alteração custa ${precoBRL(APROXIMA_AJUSTE)}.` },
  { q: "Preciso instalar algum aplicativo?", a: "Não. Nem você nem o seu cliente. A página abre no navegador do celular." },
  { q: "Funciona com capinha?", a: "Sim. O adesivo é anti-metal: vai colado na parte de trás da capinha e funciona inclusive em capas com ímã." },
  { q: "Como é a entrega?", a: "Em Maringá e Sarandi, entregamos em mãos e gravamos o adesivo na sua frente. Para outras cidades, enviamos pelos Correios com frete incluso." },
  { q: "E se eu me arrepender?", a: "Você tem 7 dias depois de receber para desistir, com reembolso total. Se o adesivo apresentar defeito em até 12 meses, trocamos sem custo." },
  { q: "Quais formas de pagamento?", a: "Pix, boleto ou cartão, na página de pagamento segura do Asaas. Para equipes maiores que 5 pessoas, fale com a gente pelo WhatsApp." },
];

const waMsg = "Olá! Vi a página do Aproxima e quero tirar uma dúvida sobre o cartão por aproximação.";

function irPara(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Aproxima() {
  useEffect(() => {
    const anterior = document.title;
    document.title = "Aproxima: cartão de visita por aproximação (NFC) — Valentis Solutions";
    return () => { document.title = anterior; };
  }, []);

  const individual = APROXIMA_PLANOS[0];
  const links = useLinksVenda();

  return (
    <div className="min-h-screen bg-[#fbfaff] text-[#23202e]">
      <Header />
      <main className="lp-trafego lp-aproxima">
        <section className="hero-section relative overflow-hidden">
          <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
          <div className="container relative grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
            <div className="min-w-0">
              <div className="eyebrow mb-5"><span className="eyebrow-dot" />Aproxima · cartão por aproximação</div>
              <h1 className="display-title">Seu contato no celular do cliente <span className="gradient-text">com um toque.</span></h1>
              <p className="hero-copy mt-5 max-w-2xl">Um adesivo NFC no seu celular abre a página da sua empresa: WhatsApp, serviços, redes e o botão Salvar contato. Sem aplicativo e sem mensalidade.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a className="button button-primary" href={comprarUrl(individual, links)} target="_blank" rel="noopener noreferrer" onClick={() => trackLeadEvent("aproxima_comprar_hero")}>Comprar agora por {precoBRL(precoDe(individual, links))} <ArrowRight size={17} /></a>
                <a className="button button-secondary" href={APROXIMA_EXEMPLO} target="_blank" rel="noopener noreferrer" onClick={() => trackLeadEvent("aproxima_ver_exemplo")}>Ver uma página de exemplo <ArrowUpRight size={17} /></a>
              </div>
              <ul className="aprox-garantias mt-6">
                <li><Check size={15} />Pagamento único</li>
                <li><Check size={15} />Página no ar em até 2 dias úteis</li>
                <li><Check size={15} />7 dias para desistir</li>
              </ul>
            </div>
            <figure className="aprox-visual" aria-label="Exemplo de página aberta no celular">
              <div className="aprox-celular">
                <img src="/assets/aproxima/cartao-exemplo.webp" width={780} height={1840} alt="Página de contato da Valentis Solutions aberta no celular, com botões de salvar contato, WhatsApp e serviços" />
              </div>
              <div className="aprox-adesivo" aria-hidden="true"><span className="aprox-ondas" /><Smartphone size={18} /></div>
              <figcaption>Exemplo real: a página da Valentis Solutions.</figcaption>
            </figure>
          </div>
        </section>

        <section className="section-pad bg-white"><div className="container">
          <div className="section-intro"><div><p className="eyebrow"><span className="eyebrow-dot" />Como funciona</p><h2 className="section-title mt-3">Do pedido ao primeiro <span className="gradient-text">contato salvo.</span></h2></div><p className="section-lead">Você não precisa saber nada de tecnologia. A gente monta, grava e entrega.</p></div>
          <div className="process-grid mt-8">{passos.map(({ icon: Icon, title, text }, i) => <div className="process-card" key={title}><div className="process-index">0{i + 1}</div><div className="process-icon"><Icon size={21} /></div><h3>{title}</h3><p>{text}</p></div>)}</div>
        </div></section>

        <section className="section-pad bg-[#f3f0fc]"><div className="container">
          <div className="section-intro"><div><p className="eyebrow"><span className="eyebrow-dot" />O que vem na sua página</p><h2 className="section-title mt-3">Melhor que cartão de papel, <span className="gradient-text">que vai para o lixo.</span></h2></div><p className="section-lead">O cliente sai com o seu contato salvo na agenda e um botão para falar com você.</p></div>
          <div className="fit-grid mt-8">{pagina.map(({ icon: Icon, title, text }) => <div className="fit-card" key={title}><Icon size={20} /><h3>{title}</h3><p>{text}</p></div>)}</div>
        </div></section>

        <section id="planos" className="section-pad scroll-mt-20"><div className="container">
          <div className="section-intro"><div><p className="eyebrow"><span className="eyebrow-dot" />Pacotes</p><h2 className="section-title mt-3">Pague uma vez. <span className="gradient-text">Use todos os dias.</span></h2></div><p className="section-lead">Todos os pacotes incluem a página, a gravação do adesivo e o QR code. Sem mensalidade.</p></div>
          <div className="aprox-planos mt-8">
            {APROXIMA_PLANOS.map(plano => (
              <article key={plano.id} className={`aprox-plano ${plano.destaque ? "aprox-plano-destaque" : ""}`}>
                {plano.destaque && <span className="aprox-selo">{plano.destaque}</span>}
                <h3>{plano.nome}</h3>
                <p className="aprox-resumo">{plano.resumo}</p>
                <p className="aprox-preco"><strong>{precoBRL(precoDe(plano, links))}</strong><span>pagamento único</span></p>
                <ul>{plano.itens.map(i => <CheckLine key={i}>{i}</CheckLine>)}</ul>
                <a className="button button-primary aprox-comprar" href={comprarUrl(plano, links)} target="_blank" rel="noopener noreferrer" onClick={() => trackLeadEvent(`aproxima_comprar_${plano.id}`)}>Comprar agora <ArrowRight size={17} /></a>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-[#69647a]">Equipe com mais de 5 pessoas? <a className="font-bold text-[#315EFA] underline-offset-4 hover:underline" href={whatsappUrl("Olá! Quero o Aproxima para uma equipe com mais de 5 pessoas.")} target="_blank" rel="noopener noreferrer">Peça um orçamento pelo WhatsApp</a>.</p>
        </div></section>

        <section className="section-pad bg-white"><div className="container grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="min-w-0">
            <p className="eyebrow"><span className="eyebrow-dot" />Compatibilidade</p>
            <h2 className="section-title mt-3 max-w-xl">Funciona em <span className="gradient-text">qualquer celular.</span></h2>
            <dl className="aprox-compat mt-6">{compat.map(c => <div key={c.titulo}><dt>{c.titulo}</dt><dd>{c.texto}</dd></div>)}</dl>
          </div>
          <div className="aprox-entrega">
            <p className="eyebrow"><span className="eyebrow-dot" />Entrega e garantia</p>
            <ul className="mt-5 grid gap-4">
              <li><Truck size={20} /><div><strong>Maringá e Sarandi</strong><span>Entrega em mãos, com o adesivo gravado na sua frente.</span></div></li>
              <li><Send size={20} /><div><strong>Outras cidades</strong><span>Envio pelos Correios, com frete incluso.</span></div></li>
              <li><ShieldCheck size={20} /><div><strong>7 dias para desistir</strong><span>Reembolso total, sem burocracia.</span></div></li>
              <li><RefreshCw size={20} /><div><strong>12 meses de garantia no adesivo</strong><span>Com defeito, trocamos sem custo.</span></div></li>
            </ul>
          </div>
        </div></section>

        <section className="section-pad bg-[#f3f0fc]"><div className="container max-w-4xl">
          <p className="eyebrow"><span className="eyebrow-dot" />Perguntas frequentes</p>
          <h2 className="section-title mt-3">Antes de <span className="gradient-text">comprar.</span></h2>
          <div className="mt-7 grid gap-2.5">{faq.map(({ q, a }) => <details key={q} className="group rounded-2xl border border-[#ece7f8] bg-[#fbfaff] px-5 py-4 open:bg-white"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#2c2640]">{q}<span className="text-xl leading-none text-[#6A19F9] transition-transform group-open:rotate-45">+</span></summary><p className="mt-2 text-sm leading-7 text-[#5c566d]">{a}</p></details>)}</div>
        </div></section>

        <section className="cta-section"><div className="container relative grid items-center gap-7 py-12 md:grid-cols-[1fr_auto]">
          <div><p className="eyebrow eyebrow-light"><span className="eyebrow-dot" />Próximo passo</p><h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">Na próxima apresentação, o cliente sai com o seu contato salvo.</h2><p className="mt-4 flex max-w-xl items-center gap-2 leading-7 text-white/70"><ShieldCheck size={18} />Pagamento único, sem mensalidade.</p></div>
          <div className="flex flex-col gap-3">
            <button type="button" className="button button-white" onClick={() => irPara("planos")}>Escolher meu pacote <ArrowRight size={17} /></button>
            <a className="button aprox-btn-claro" href={whatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer" onClick={() => trackLeadEvent("whatsapp_aproxima_cta_final")}>Tirar dúvida no WhatsApp <MessageCircle size={17} /></a>
          </div>
        </div></section>
      </main>
      <Footer withLeadForm={false} />
    </div>
  );
}
