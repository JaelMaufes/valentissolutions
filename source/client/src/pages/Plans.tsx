import { ArrowRight, CircleHelp, Info } from "lucide-react";
import { Link } from "wouter";
import { CheckLine, Footer, Header, whatsappUrl } from "@/components/MarketingLayout";

const plans = [
  {
    name: "Validar",
    subtitle: "Aquisição essencial em 2 canais",
    features: [
      "Google Ads + Meta Ads (os 2 desde o início)",
      "Até 2 campanhas ativas, com anúncios/criativos ilimitados dentro delas",
      "Otimizações quinzenais",
      "Relatório de resultados",
      "Suporte assíncrono via WhatsApp",
    ],
    ideal: "Negócios que querem começar com escopo controlado, testando os dois canais antes de decidir onde escalar.",
  },
  {
    name: "Crescer",
    subtitle: "Consistência com base de dados própria",
    color: "featured",
    features: [
      "Google Ads + Meta Ads",
      "Até 4 campanhas ativas, com anúncios/criativos ilimitados dentro delas",
      "Otimização semanal",
      "Painel de captação de leads (organiza quem chegou, de onde veio, e status do contato)",
      "Relatório de resultados",
      "Suporte assíncrono via WhatsApp",
    ],
    ideal: "Negócios com oferta validada que precisam de constância e visibilidade sobre quem está chegando, não só quanto está sendo gasto.",
  },
  {
    name: "Escalar",
    subtitle: "Operação conectada: mídia, sistema e decisão",
    features: [
      "Gestão multi-plataforma (Google + Meta + expansão conforme escopo)",
      "Até 8 campanhas ativas, com anúncios/criativos ilimitados dentro delas",
      "Landing page conforme escopo",
      "Sistema personalizado de atendimento/CRM leve — organiza e automatiza o fluxo de leads do anúncio até o fechamento",
      "Relatório de resultados",
      "Reunião mensal de alinhamento",
    ],
    ideal: "Operações maduras que já sentem o gargalo na organização interna, não só na captação — querem mídia, página e atendimento funcionando como um sistema só.",
  },
];

const sprintFeatures = [
  "Duração fixa: 15 dias, sem renovação automática",
  "Diagnóstico do cenário atual (oferta, público, concorrência local)",
  "Direcionamento de 1 campanha piloto (1 plataforma)",
  "Plano de ação inicial por escrito, com recomendação de próximo plano (Validar, Crescer ou Escalar)",
];

export default function Plans() {
  return <div className="min-h-screen bg-[#fbfaff] text-[#23202e]"><Header /><main><section className="subhero"><div className="container py-20 md:py-28"><p className="eyebrow"><span className="eyebrow-dot" />Planos Valentis</p><h1 className="display-title mt-5 max-w-4xl">Um plano para o seu momento, <span className="gradient-text">não uma promessa pronta.</span></h1><p className="hero-copy mt-6 max-w-2xl">A proposta é dimensionada conforme o estágio do negócio, os objetivos, a oferta, o mercado e a capacidade de atendimento. Converse conosco para receber uma recomendação.</p><a className="button button-primary mt-8" href={whatsappUrl("Olá! Quero receber uma recomendação de plano para o meu negócio.")}>Falar sobre meu cenário <ArrowRight size={17} /></a></div></section><section className="section-pad"><div className="container"><div className="mb-12 grid gap-6 rounded-3xl border border-[#e5defc] bg-[#f8f5ff] p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9"><div><p className="eyebrow"><span className="eyebrow-dot" />Oferta pontual</p><h2 className="mt-3 text-2xl font-black tracking-[-.03em] md:text-3xl">Sprint de Validação</h2><p className="mt-3 max-w-2xl leading-7 text-[#625b73]">Diagnóstico e direcionamento, sem compromisso recorrente. Indicado para quem quer ver direção antes de decidir.</p><ul className="mt-5 grid gap-3">{sprintFeatures.map((feature) => <CheckLine key={feature}>{feature}</CheckLine>)}</ul></div><a className="button button-secondary" href={whatsappUrl("Olá! Quero conhecer o Sprint de Validação.")}>Conhecer o Sprint <ArrowRight size={16} /></a></div><div className="plans-page-grid">{plans.map((plan) => <article className={`plan-page-card ${plan.color ?? ""}`} key={plan.name}><div className="flex items-center justify-between"><span className="plan-tag">{plan.name}</span>{plan.color && <span className="plan-badge">Recomendado</span>}</div><h2>{plan.subtitle}</h2><div className="mt-7"><span className="plan-big-price text-2xl">Sob consulta</span></div><p className="mt-2 text-xs text-[#8a8394]">Escopo e proposta definidos após entender o cenário do negócio.</p><ul className="mt-7 grid gap-3">{plan.features.map((feature) => <CheckLine key={feature}>{feature}</CheckLine>)}</ul><div className="mt-7 rounded-xl bg-[#f8f6fc] p-4"><p className="text-xs font-bold uppercase tracking-[.1em] text-[#8a8394]">Indicado para</p><p className="mt-2 text-sm leading-6 text-[#554f66]">{plan.ideal}</p></div><a className={`button mt-7 w-full ${plan.color ? "button-primary" : "button-secondary"}`} href={whatsappUrl(`Olá! Quero conversar sobre o plano ${plan.name} e entender a proposta para o meu negócio.`)}>Consultar este plano <ArrowRight size={16} /></a></article>)}</div><div className="mt-10 rounded-2xl border border-[#e5def4] bg-[#f8f5ff] p-5 text-sm leading-7 text-[#625b73]"><strong className="font-black text-[#41365c]">Cada plano inclui um número de campanhas ativas simultâneas — anúncios e criativos dentro delas são ilimitados.</strong> É possível adicionar mais campanhas por um valor mensal complementar, ou migrar para o próximo nível.</div><div className="mt-12 grid gap-5 md:grid-cols-2"><div className="info-box"><Info size={20} /><div><h3>Proposta sob medida</h3><p>A gestão, os complementos e as ferramentas são definidos conforme o escopo necessário. A verba de mídia, quando aplicável, é tratada separadamente.</p></div></div><div className="info-box"><CircleHelp size={20} /><div><h3>Por que conversar antes?</h3><p>Uma conversa evita indicar uma estrutura maior ou menor do que a operação realmente precisa neste momento.</p></div></div></div><div className="mt-14 rounded-3xl bg-[#1b1533] p-8 text-white md:p-12"><h2 className="text-2xl font-black tracking-[-.03em] md:text-3xl">Ainda não sabe qual escolher?</h2><p className="mt-3 max-w-xl leading-7 text-white/65">Não é preciso decidir sozinho. O diagnóstico inicial serve justamente para entender o estágio do negócio e indicar o caminho mais coerente.</p><a className="button button-white mt-7" href={whatsappUrl("Olá! Quero entender qual plano é mais coerente com o estágio do meu negócio.")}>Receber uma recomendação <ArrowRight size={17} /></a></div><div className="mt-9 text-center"><Link href="/servicos" className="inline-flex items-center gap-2 text-sm font-bold text-[#6845c8]">Conhecer os serviços complementares <ArrowRight size={16} /></Link></div></div></section></main><Footer /></div>;
}
