import { useEffect } from "react";
import { ArrowRight, BarChart3, Compass, Gauge, LineChart, MessageCircle, Rocket, ShieldCheck, Target, Users } from "lucide-react";
import { Link } from "wouter";
import { CheckLine, Footer, Header } from "@/components/MarketingLayout";
import TrafficDiagnostic from "@/components/TrafficDiagnostic";
import { trackLeadEvent, whatsappUrl } from "@/lib/leadIntegration";

const forWho = [
  "Negócios locais de Maringá e região que querem mais contatos com intenção real de compra",
  "Quem já anunciou sozinho, não teve clareza do retorno e quer fazer com método",
  "Quem tem uma boa entrega, mas ainda depende só de indicação e Instagram orgânico",
  "Quem quer acompanhar o que está acontecendo com a verba, sem relatório confuso",
];

const notForWho = [
  "Quem busca resultado garantido já na primeira semana",
  "Quem não tem como atender os contatos que chegarem",
  "Quem quer apenas impulsionar posts, sem estratégia por trás",
];

const steps = [
  { icon: Compass, title: "Diagnóstico", text: "Entendemos oferta, público, região e concorrência antes de configurar qualquer campanha." },
  { icon: Target, title: "Estrutura", text: "Montamos campanhas no Google Ads e na Meta Ads com rastreamento e mensagem alinhados à sua oferta." },
  { icon: Gauge, title: "Calibração", text: "Nos primeiros 30 dias o algoritmo aprende. Ajustamos públicos, criativos e lances com base nos dados reais." },
  { icon: LineChart, title: "Otimização", text: "A partir do 2º mês a operação ganha consistência. Você recebe relatórios claros e o próximo passo recomendado." },
];

const included = [
  { icon: BarChart3, title: "Google Ads e Meta Ads", text: "Os dois canais desde o início, para descobrir onde estão as melhores oportunidades." },
  { icon: Rocket, title: "Anúncios ilimitados", text: "Criativos e variações sem limite dentro das campanhas ativas do seu plano." },
  { icon: LineChart, title: "Relatório de resultados", text: "Leitura objetiva do que funcionou, do que foi ajustado e do que vem a seguir." },
  { icon: Users, title: "Atendimento direto", text: "Você fala diretamente com quem gerencia suas campanhas, sem repasse para equipe júnior." },
];

const plans = [
  { name: "Sprint de Validação", tag: "Entrada", text: "15 dias, sem renovação automática: diagnóstico, 1 campanha piloto e plano de ação por escrito." },
  { name: "Validar", tag: "Mensal", text: "Aquisição essencial em 2 canais, até 2 campanhas ativas e otimizações quinzenais." },
  { name: "Crescer", tag: "Recomendado", text: "Até 4 campanhas, otimização semanal e painel para organizar os leads que chegam." },
  { name: "Escalar", tag: "Mensal", text: "Multi-plataforma, até 8 campanhas, landing page e organização do atendimento." },
];

const faq = [
  { q: "Em quanto tempo vejo resultado?", a: "Os primeiros 30 dias são de calibração, quando o algoritmo aprende com os dados. A otimização fica consistente a partir do 2º mês. Resultado pleno no primeiro mês não é realista com nenhum gestor sério." },
  { q: "A verba dos anúncios está incluída?", a: "Não. A verba de mídia é paga diretamente ao Google e à Meta, no seu cartão ou boleto. A gestão da Valentis Solutions é cobrada à parte, e você mantém o controle total do que é investido." },
  { q: "Existe fidelidade?", a: "Os planos mensais têm mínimo de 3 meses, o tempo que as campanhas precisam para sair da fase de aprendizado. O Sprint de Validação não tem esse compromisso." },
  { q: "Por que não há preços no site?", a: "O valor depende do número de campanhas, dos canais e da complexidade do seu cenário. Depois do diagnóstico, você recebe uma proposta fechada, sem surpresas." },
  { q: "Atendem fora de Maringá?", a: "Sim. A base é Maringá e região, mas a gestão é 100% online e atende negócios de todo o Brasil." },
  { q: "Meu segmento tem regras de anúncio. Vocês trabalham com isso?", a: "Sim. Saúde, estética e outros segmentos regulados têm regras mais rígidas no Google e na Meta, e a campanha é estruturada considerando essas políticas desde o início." },
];

const waMsg = "Olá! Vi a página de tráfego pago da Valentis Solutions e quero conversar sobre anúncios para o meu negócio.";

function scrollToDiagnostic() {
  document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function TrafegoPago() {
  useEffect(() => {
    document.title = "Gestão de tráfego pago em Maringá — Valentis Solutions";
    if (window.location.hash === "#diagnostico") {
      const t = window.setTimeout(scrollToDiagnostic, 150);
      return () => window.clearTimeout(t);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfaff] text-[#23202e]">
      <Header />
      <main>
        <section className="hero-section relative overflow-hidden">
          <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
          <div className="container relative py-20 lg:py-28">
            <div className="reveal max-w-4xl">
              <div className="eyebrow mb-6"><span className="eyebrow-dot" />Gestão de tráfego pago · Maringá e região</div>
              <h1 className="display-title">Anúncios que trazem <span className="gradient-text">clientes, não só cliques.</span></h1>
              <p className="hero-copy mt-6 max-w-2xl">Gestão de Google Ads e Meta Ads para negócios locais, com estratégia, acompanhamento próximo e relatórios que você entende. Comece por um diagnóstico gratuito de 2 minutos.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a className="button button-primary" href="#diagnostico" onClick={(e) => { e.preventDefault(); scrollToDiagnostic(); }}>Fazer diagnóstico gratuito <ArrowRight size={17} /></a>
                <a className="button button-secondary" target="_blank" rel="noopener noreferrer" href={whatsappUrl(waMsg)} onClick={() => trackLeadEvent("whatsapp_trafego_hero")}>Falar no WhatsApp <MessageCircle size={17} /></a>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-[#69647a]"><span>✓ Google Ads + Meta Ads</span><span>✓ Atendimento direto com o gestor</span><span>✓ Verba sob o seu controle</span></div>
            </div>
          </div>
        </section>

        <section className="section-pad bg-white"><div className="container grid gap-10 lg:grid-cols-2">
          <div><p className="eyebrow"><span className="eyebrow-dot" />Para quem é</p><h2 className="section-title mt-4">Feito para negócios que querem <span className="gradient-text">crescer com método.</span></h2><ul className="mt-8 grid gap-4">{forWho.map(i => <CheckLine key={i}>{i}</CheckLine>)}</ul></div>
          <div className="rounded-3xl border border-[#ece7f8] bg-[#faf8ff] p-7 md:p-9"><p className="eyebrow"><span className="eyebrow-dot" />Para quem não é</p><h3 className="mt-4 text-2xl font-black tracking-[-.03em]">Preferimos ser diretos desde o início.</h3><ul className="mt-6 grid gap-4">{notForWho.map(i => <li key={i} className="flex items-start gap-3 text-sm leading-6 text-[#5c566d]"><span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#fde8ee] text-[11px] font-black text-[#c2416b]">×</span>{i}</li>)}</ul></div>
        </div></section>

        <section className="section-pad"><div className="container">
          <div className="section-intro"><div><p className="eyebrow"><span className="eyebrow-dot" />Como funciona</p><h2 className="section-title mt-4">Do diagnóstico à<br /><span className="gradient-text">operação consistente.</span></h2></div><p className="section-lead">Um processo claro, com expectativas realistas em cada etapa — sem promessa pronta.</p></div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{steps.map(({ icon: Icon, title, text }, i) => <div className="process-card" key={title}><div className="process-index">0{i + 1}</div><div className="process-icon"><Icon size={21} /></div><h3>{title}</h3><p>{text}</p></div>)}</div>
        </div></section>

        <section className="section-pad bg-[#f3f0fc]"><div className="container">
          <div className="section-intro"><div><p className="eyebrow"><span className="eyebrow-dot" />O que está incluso</p><h2 className="section-title mt-4">Gestão completa,<br /><span className="gradient-text">não só o anúncio.</span></h2></div><p className="section-lead">Planejamento, criação, acompanhamento e relatório fazem parte de todos os planos.</p></div>
          <div className="fit-grid mt-12">{included.map(({ icon: Icon, title, text }) => <div className="fit-card" key={title}><Icon size={20} /><h3>{title}</h3><p>{text}</p></div>)}</div>
        </div></section>

        <section className="section-pad bg-white"><div className="container">
          <div className="section-intro"><div><p className="eyebrow"><span className="eyebrow-dot" />Planos</p><h2 className="section-title mt-4">Um plano para o<br /><span className="gradient-text">seu momento.</span></h2></div><p className="section-lead">A proposta é fechada depois do diagnóstico, conforme canais, campanhas e complexidade do seu cenário.</p></div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{plans.map(p => <article key={p.name} className={`flex flex-col rounded-3xl border p-6 ${p.tag === "Recomendado" ? "border-[#7c4fe0] bg-[#f8f5ff]" : "border-[#ece7f8] bg-white"}`}><span className="text-xs font-black uppercase tracking-[.12em] text-[#7c4fe0]">{p.tag}</span><h3 className="mt-3 text-xl font-black tracking-[-.02em]">{p.name}</h3><p className="mt-3 flex-1 text-sm leading-6 text-[#5c566d]">{p.text}</p></article>)}</div>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a className="button button-primary" href="#diagnostico" onClick={(e) => { e.preventDefault(); scrollToDiagnostic(); }}>Descobrir o plano ideal <ArrowRight size={17} /></a><Link href="/planos" className="inline-flex items-center gap-2 text-sm font-bold text-[#6845c8]">Ver detalhes dos planos <ArrowRight size={16} /></Link></div>
        </div></section>

        <section id="diagnostico" className="section-pad scroll-mt-24"><div className="container max-w-4xl">
          <p className="eyebrow"><span className="eyebrow-dot" />Diagnóstico gratuito</p>
          <h2 className="section-title mt-4">Descubra onde sua aquisição <span className="gradient-text">merece atenção primeiro.</span></h2>
          <p className="section-lead mt-5 mb-10">Cinco perguntas, menos de dois minutos. Você recebe uma hipótese de gargalo e o plano mais coerente para conversar.</p>
          <TrafficDiagnostic />
        </div></section>

        <section className="section-pad bg-white"><div className="container max-w-4xl">
          <p className="eyebrow"><span className="eyebrow-dot" />Perguntas frequentes</p>
          <h2 className="section-title mt-4">Antes de <span className="gradient-text">decidir.</span></h2>
          <div className="mt-10 grid gap-3">{faq.map(({ q, a }) => <details key={q} className="group rounded-2xl border border-[#ece7f8] bg-[#fbfaff] p-5 open:bg-white"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#2c2640]">{q}<span className="text-xl leading-none text-[#7c4fe0] transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 text-sm leading-7 text-[#5c566d]">{a}</p></details>)}</div>
        </div></section>

        <section className="cta-section"><div className="container relative grid items-center gap-9 py-16 md:grid-cols-[1fr_auto]">
          <div><p className="eyebrow eyebrow-light"><span className="eyebrow-dot" />Próximo passo</p><h2 className="mt-4 max-w-2xl text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">Vamos colocar seus anúncios para trabalhar a favor do seu negócio.</h2><p className="mt-5 flex max-w-xl items-center gap-2 leading-7 text-white/70"><ShieldCheck size={18} />Sem compromisso para conversar.</p></div>
          <a className="button button-white" target="_blank" rel="noopener noreferrer" href={whatsappUrl(waMsg)} onClick={() => trackLeadEvent("whatsapp_trafego_cta_final")}>Falar no WhatsApp <ArrowRight size={17} /></a>
        </div></section>
      </main>
      <Footer />
    </div>
  );
}
