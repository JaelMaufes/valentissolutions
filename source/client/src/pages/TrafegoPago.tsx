import { useEffect } from "react";
import { ArrowRight, BarChart3, CalendarClock, Compass, Gauge, LineChart, MessageCircle, ShieldCheck, Target, Users } from "lucide-react";
import { Link } from "wouter";
import { CheckLine, Footer, Header } from "@/components/MarketingLayout";
import TrafficDiagnostic from "@/components/TrafficDiagnostic";
import { trackLeadEvent, whatsappUrl } from "@/lib/leadIntegration";

const forWho = [
  "Negócios locais de Maringá e região que querem mais contatos com intenção real de compra",
  "Quem já anunciou sozinho, não teve clareza do retorno e quer fazer com método",
  "Quem tem uma boa entrega, mas ainda depende só de indicação e Instagram orgânico",
  "Quem quer acompanhar o que acontece com a verba, sem relatório confuso",
];

const notForWho = [
  "Quem busca resultado garantido já na primeira semana",
  "Quem não tem como atender os contatos que chegarem",
  "Quem quer apenas impulsionar posts, sem estratégia por trás",
];

const sprintFeatures = [
  "Duração fixa de 15 dias, sem renovação automática",
  "Diagnóstico do cenário atual: oferta, público e concorrência local",
  "1 campanha piloto estruturada e acompanhada",
  "Plano de ação por escrito ao final, com o próximo passo recomendado",
];

const path = [
  { icon: Target, label: "Comece", title: "Sprint de Validação", text: "15 dias para testar o caminho com uma campanha piloto, sem compromisso recorrente." },
  { icon: CalendarClock, label: "Continue", title: "Gestão mensal", text: "Dimensionada ao seu momento: canais, número de campanhas e frequência de otimização." },
  { icon: LineChart, label: "Evolua", title: "Escala com controle", text: "Mais canais, landing page e organização dos contatos quando a operação pedir." },
];

const steps = [
  { icon: Compass, title: "Diagnóstico", text: "Entendemos oferta, público, região e concorrência antes de configurar qualquer campanha." },
  { icon: Target, title: "Estrutura", text: "Campanhas no Google Ads e na Meta Ads com rastreamento e mensagem alinhados à sua oferta." },
  { icon: Gauge, title: "Calibração", text: "Nos primeiros 30 dias o algoritmo aprende. Ajustamos públicos, criativos e lances com dados reais." },
  { icon: LineChart, title: "Otimização", text: "A partir do 2º mês a operação ganha consistência, com relatórios claros e próximo passo definido." },
];

const included = [
  { icon: BarChart3, title: "Contatos de quem procura você", text: "Google Ads para quem já está buscando e Meta Ads para ser lembrado por quem está perto." },
  { icon: Gauge, title: "Verba que não se perde", text: "Acompanhamento constante para cortar o que não traz contato e reforçar o que funciona." },
  { icon: LineChart, title: "Clareza sobre o retorno", text: "Relatórios objetivos: quanto foi investido, quantos contatos chegaram e o que muda a seguir." },
  { icon: Users, title: "Atendimento direto", text: "Você fala com quem gerencia suas campanhas, sem repasse para equipe júnior." },
];

const faq = [
  { q: "Preciso começar pelo Sprint de Validação?", a: "Não. Ele é indicado para quem quer testar antes de assumir um compromisso mensal. Se você já anuncia ou tem clareza do que precisa, podemos ir direto para a gestão mensal." },
  { q: "Em quanto tempo vejo resultado?", a: "Os primeiros 30 dias são de calibração, quando o algoritmo aprende com os dados. A otimização fica consistente a partir do 2º mês. Resultado pleno no primeiro mês não é realista com nenhum gestor sério." },
  { q: "A verba dos anúncios está incluída?", a: "Não. A verba de mídia é paga diretamente ao Google e à Meta, no seu cartão ou boleto. A gestão da Valentis Solutions é cobrada à parte, e você mantém o controle total do que é investido." },
  { q: "Existe fidelidade na gestão mensal?", a: "Sim, mínimo de 3 meses, o tempo que as campanhas precisam para sair da fase de aprendizado. O Sprint de Validação não tem esse compromisso." },
  { q: "Por que não há preços no site?", a: "O valor depende dos canais, do número de campanhas e da complexidade do seu cenário. Depois do diagnóstico, você recebe uma proposta fechada, sem surpresas." },
  { q: "Atendem fora de Maringá?", a: "Sim. A base é Maringá e região, mas a gestão é 100% online e atende negócios de todo o Brasil." },
  { q: "Meu segmento tem regras de anúncio. Vocês trabalham com isso?", a: "Sim. Saúde, estética e outros segmentos regulados têm regras mais rígidas no Google e na Meta, e a campanha é estruturada considerando essas políticas desde o início." },
];

const waMsg = "Olá! Vi a página de tráfego pago da Valentis Solutions e quero conversar sobre anúncios para o meu negócio.";
const sprintMsg = "Olá! Quero começar pelo Sprint de Validação de 15 dias da Valentis Solutions.";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Anchor({ to, className, children }: { to: string; className: string; children: React.ReactNode }) {
  return <a className={className} href={`#${to}`} onClick={(e) => { e.preventDefault(); scrollToId(to); }}>{children}</a>;
}

export default function TrafegoPago() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Gestão de tráfego pago em Maringá — Valentis Solutions";
    const hash = window.location.hash.slice(1);
    const t = hash ? window.setTimeout(() => scrollToId(hash), 150) : undefined;
    return () => { document.title = previous; if (t) window.clearTimeout(t); };
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfaff] text-[#23202e]">
      <Header />
      <main className="lp-trafego">
        <section className="hero-section relative overflow-hidden">
          <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
          <div className="container relative py-14 lg:py-20">
            <div className="reveal max-w-4xl">
              <div className="eyebrow mb-5"><span className="eyebrow-dot" />Gestão de tráfego pago · Maringá e região</div>
              <h1 className="display-title">Anúncios que trazem <span className="gradient-text">clientes, não só cliques.</span></h1>
              <p className="hero-copy mt-5 max-w-2xl">Gestão de Google Ads e Meta Ads para negócios locais, com estratégia, acompanhamento próximo e relatórios que você entende. Comece por um diagnóstico gratuito de 2 minutos.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Anchor to="diagnostico" className="button button-primary">Fazer diagnóstico gratuito <ArrowRight size={17} /></Anchor>
                <a className="button button-secondary" target="_blank" rel="noopener noreferrer" href={whatsappUrl(waMsg)} onClick={() => trackLeadEvent("whatsapp_trafego_hero")}>Falar no WhatsApp <MessageCircle size={17} /></a>
              </div>
              <p className="mt-5 text-sm text-[#69647a]">Prefere testar antes? <Anchor to="sprint" className="font-bold text-[#6845c8] underline-offset-4 hover:underline">Conheça o Sprint de Validação de 15 dias</Anchor>.</p>
            </div>
          </div>
        </section>

        <section className="section-pad bg-white"><div className="container grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div><p className="eyebrow"><span className="eyebrow-dot" />Para quem é</p><h2 className="section-title mt-3 max-w-xl">Para negócios que querem <span className="gradient-text">crescer com método.</span></h2><ul className="mt-6 grid gap-3">{forWho.map(i => <CheckLine key={i}>{i}</CheckLine>)}</ul></div>
          <div className="rounded-3xl border border-[#ece7f8] bg-[#faf8ff] p-6 md:p-7"><p className="eyebrow"><span className="eyebrow-dot" />Para quem não é</p><h3 className="mt-3 text-xl font-black tracking-[-.03em]">Preferimos ser diretos desde o início.</h3><ul className="mt-4 grid gap-3">{notForWho.map(i => <li key={i} className="flex items-start gap-3 text-sm leading-6 text-[#5c566d]"><span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#fde8ee] text-[11px] font-black text-[#c2416b]">×</span>{i}</li>)}</ul></div>
        </div></section>

        <section id="sprint" className="section-pad scroll-mt-20"><div className="container">
          <div className="sprint-offer">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" />Oferta de entrada</p>
              <h2 className="section-title mt-3">Sprint de <span className="gradient-text">Validação.</span></h2>
              <p className="mt-4 max-w-xl leading-7 text-[#625b73]">Teste o caminho antes de assumir qualquer compromisso mensal. Em 15 dias você vê a campanha rodando, entende o potencial do seu mercado e recebe um plano claro do que fazer a seguir.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a className="button button-primary" target="_blank" rel="noopener noreferrer" href={whatsappUrl(sprintMsg)} onClick={() => trackLeadEvent("whatsapp_trafego_sprint")}>Quero começar pelo Sprint <ArrowRight size={17} /></a>
                <Anchor to="diagnostico" className="button button-secondary">Fazer o diagnóstico antes</Anchor>
              </div>
            </div>
            <ul className="sprint-list">{sprintFeatures.map(f => <CheckLine key={f}>{f}</CheckLine>)}</ul>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-black tracking-[-.02em] text-[#2c2640]">E depois do Sprint?</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#625b73]">Você decide: seguir com a gestão contínua ou executar o plano de ação por conta própria.</p>
            <ol className="path-grid mt-5">{path.map(({ icon: Icon, label, title, text }) => <li key={title} className="path-step"><span className="path-icon"><Icon size={19} /></span><div><p className="path-label">{label}</p><h4>{title}</h4><p>{text}</p></div></li>)}</ol>
          </div>
        </div></section>

        <section className="section-pad bg-white"><div className="container">
          <div className="section-intro"><div><p className="eyebrow"><span className="eyebrow-dot" />Como funciona a gestão</p><h2 className="section-title mt-3">Do diagnóstico à <span className="gradient-text">operação consistente.</span></h2></div><p className="section-lead">Um processo claro, com expectativas realistas em cada etapa — sem promessa pronta.</p></div>
          <div className="process-grid mt-8">{steps.map(({ icon: Icon, title, text }, i) => <div className="process-card" key={title}><div className="process-index">0{i + 1}</div><div className="process-icon"><Icon size={21} /></div><h3>{title}</h3><p>{text}</p></div>)}</div>
        </div></section>

        <section className="section-pad bg-[#f3f0fc]"><div className="container">
          <div className="section-intro"><div><p className="eyebrow"><span className="eyebrow-dot" />O que você ganha</p><h2 className="section-title mt-3">Gestão completa, <span className="gradient-text">não só o anúncio.</span></h2></div><p className="section-lead">Planejamento, criação, acompanhamento e relatório fazem parte da gestão.</p></div>
          <div className="fit-grid mt-8">{included.map(({ icon: Icon, title, text }) => <div className="fit-card" key={title}><Icon size={20} /><h3>{title}</h3><p>{text}</p></div>)}</div>
        </div></section>

        <section id="diagnostico" className="section-pad scroll-mt-20"><div className="container max-w-4xl">
          <p className="eyebrow"><span className="eyebrow-dot" />Diagnóstico gratuito</p>
          <h2 className="section-title mt-3">Descubra onde sua aquisição <span className="gradient-text">merece atenção primeiro.</span></h2>
          <p className="section-lead mt-4 mb-8">Cinco perguntas, menos de dois minutos. Você recebe uma hipótese de gargalo e o ponto de partida mais coerente.</p>
          <TrafficDiagnostic />
        </div></section>

        <section className="section-pad bg-white"><div className="container max-w-4xl">
          <p className="eyebrow"><span className="eyebrow-dot" />Perguntas frequentes</p>
          <h2 className="section-title mt-3">Antes de <span className="gradient-text">decidir.</span></h2>
          <div className="mt-7 grid gap-2.5">{faq.map(({ q, a }) => <details key={q} className="group rounded-2xl border border-[#ece7f8] bg-[#fbfaff] px-5 py-4 open:bg-white"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#2c2640]">{q}<span className="text-xl leading-none text-[#7c4fe0] transition-transform group-open:rotate-45">+</span></summary><p className="mt-2 text-sm leading-7 text-[#5c566d]">{a}</p></details>)}</div>
          <p className="mt-6 text-sm text-[#69647a]">Quer ver o escopo detalhado de cada nível da gestão mensal? <Link href="/planos" className="font-bold text-[#6845c8] underline-offset-4 hover:underline">Conheça os planos</Link>.</p>
        </div></section>

        <section className="cta-section"><div className="container relative grid items-center gap-7 py-12 md:grid-cols-[1fr_auto]">
          <div><p className="eyebrow eyebrow-light"><span className="eyebrow-dot" />Próximo passo</p><h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">Vamos colocar seus anúncios para trabalhar a favor do seu negócio.</h2><p className="mt-4 flex max-w-xl items-center gap-2 leading-7 text-white/70"><ShieldCheck size={18} />Sem compromisso para conversar.</p></div>
          <a className="button button-white" target="_blank" rel="noopener noreferrer" href={whatsappUrl(waMsg)} onClick={() => trackLeadEvent("whatsapp_trafego_cta_final")}>Falar no WhatsApp <ArrowRight size={17} /></a>
        </div></section>
      </main>
      <Footer withLeadForm={false} />
    </div>
  );
}
