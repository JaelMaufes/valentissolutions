import { ArrowRight, BarChart3, Check, Code2, Compass, Layers3, MessageCircle, Sparkles, Target, TrendingUp, Workflow } from "lucide-react";
import { Link } from "wouter";
import { Footer, Header, CheckLine, whatsappUrl } from "@/components/MarketingLayout";

const fronts = [
  {
    eyebrow: "Aquisição",
    title: "Tráfego pago",
    description: "Campanhas, páginas e acompanhamento para transformar atenção local em oportunidades comerciais.",
    href: "/servicos",
    icon: Target,
    tone: "front-card-blue",
    label: "Conhecer serviços",
  },
  {
    eyebrow: "Operação",
    title: "Sistemas personalizados",
    description: "Aplicações sob medida para organizar estoque, agenda, vendas, financeiro e processos internos.",
    href: "/sistemas",
    icon: Code2,
    tone: "front-card-purple",
    label: "Conhecer sistemas",
  },
  {
    eyebrow: "Direcionamento",
    title: "Diagnóstico inicial",
    description: "Uma leitura objetiva do seu cenário para identificar o próximo gargalo e a solução mais coerente.",
    href: "/diagnostico",
    icon: Compass,
    tone: "front-card-pink",
    label: "Fazer diagnóstico",
  },
];

const process = [
  { icon: Compass, title: "Entender", text: "Mapeamos o momento, a oferta e os processos que sustentam o negócio." },
  { icon: Workflow, title: "Organizar", text: "Estruturamos a solução com escopo claro e prioridades realistas." },
  { icon: TrendingUp, title: "Evoluir", text: "Acompanhamos os sinais e indicamos o próximo avanço com transparência." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fbfaff] text-[#23202e]">
      <Header />
      <main>
        <section className="hero-section relative overflow-hidden">
          <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
          <div className="container relative grid items-center gap-12 py-20 lg:grid-cols-[1fr_.8fr] lg:py-28">
            <div className="reveal">
              <div className="eyebrow mb-6"><span className="eyebrow-dot" />Valentis Solutions · Maringá e região</div>
              <h1 className="display-title max-w-4xl">Soluções para <span className="gradient-text">atrair, organizar e crescer.</span></h1>
              <p className="hero-copy mt-6 max-w-2xl">Ajudamos negócios locais a encontrar oportunidades e estruturar a operação que acontece depois que elas chegam — com estratégia, tecnologia e clareza.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link className="button button-primary" href="/diagnostico">Fazer diagnóstico inicial <ArrowRight size={17} /></Link><a className="button button-secondary" href="#frentes">Explorar soluções <ArrowRight size={17} /></a></div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-[#69647a]"><span className="flex items-center gap-2"><Check size={15} className="text-[#7c4fe0" />Atendimento direto</span><span className="flex items-center gap-2"><Check size={15} className="text-[#7c4fe0" />Escopo claro</span><span className="flex items-center gap-2"><Check size={15} className="text-[#7c4fe0" />Linguagem sem complicação</span></div>
            </div>
            <div className="hero-hub reveal reveal-delay-2" aria-label="Visão geral das soluções Valentis">
              <img className="brand-parallax-icon hub-icon" src="/valentis-icon.png" alt="" aria-hidden="true" />
              <div className="hub-ring hub-ring-one" /><div className="hub-ring hub-ring-two" />
              <div className="hub-center"><Sparkles size={24} /><strong>Valentis</strong><span>soluções conectadas</span></div>
              <div className="hub-node hub-node-one"><BarChart3 size={17} /><span>Atrair</span></div><div className="hub-node hub-node-two"><Layers3 size={17} /><span>Organizar</span></div><div className="hub-node hub-node-three"><TrendingUp size={17} /><span>Evoluir</span></div>
            </div>
          </div>
        </section>

        <section id="frentes" className="section-pad bg-white"><div className="container"><div className="section-intro"><div><p className="eyebrow"><span className="eyebrow-dot" />Nossas frentes</p><h2 className="section-title mt-4">Escolha o caminho<br /><span className="gradient-text">mais próximo do seu desafio.</span></h2></div><p className="section-lead">Cada frente pode funcionar sozinha ou fazer parte de uma evolução maior da sua operação.</p></div><div className="fronts-grid mt-12">{fronts.map(({ icon: Icon, ...front }) => <Link key={front.title} href={front.href} className={`front-card ${front.tone}`}><div className="flex items-start justify-between"><span className="front-icon"><Icon size={21} /></span><ArrowRight className="front-arrow" size={20} /></div><p className="front-eyebrow">{front.eyebrow}</p><h3>{front.title}</h3><p className="front-description">{front.description}</p><span className="front-link">{front.label} <ArrowRight size={15} /></span></Link>)}</div></div></section>

        <section className="trust-strip"><div className="container grid gap-6 py-7 sm:grid-cols-3"><div><p className="trust-number">01</p><p className="trust-title">Visão de negócio</p><p className="trust-text">Tecnologia e marketing precisam servir ao processo real da empresa.</p></div><div><p className="trust-number">02</p><p className="trust-title">Soluções proporcionais</p><p className="trust-text">Começamos pelo que é necessário, sem empurrar complexidade.</p></div><div><p className="trust-number">03</p><p className="trust-title">Próximo passo claro</p><p className="trust-text">Você entende o que recomendamos, por quê e o que acontece depois.</p></div></div></section>

        <section id="processo" className="section-pad"><div className="container"><div className="section-intro"><div><p className="eyebrow"><span className="eyebrow-dot" />Como trabalhamos</p><h2 className="section-title mt-4">Clareza antes de<br /><span className="gradient-text">qualquer proposta.</span></h2></div><p className="section-lead">Nossa primeira etapa é compreender o cenário. A solução vem depois — dimensionada ao momento e à capacidade da operação.</p></div><div className="process-grid process-grid-three mt-12">{process.map(({ icon: Icon, title, text }, i) => <div className="process-card" key={title}><div className="process-index">0{i + 1}</div><div className="process-icon"><Icon size={21} /></div><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

        <section className="section-pad bg-[#f3f0fc]"><div className="container grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr]"><div><p className="eyebrow"><span className="eyebrow-dot" />Quando conversar conosco</p><h2 className="section-title mt-4">Você não precisa chegar com a solução pronta.</h2><p className="section-lead mt-5">Se existe um gargalo na aquisição, no atendimento ou na organização da operação, podemos começar por uma conversa objetiva.</p><a className="button button-dark mt-8" href={whatsappUrl("Olá! Quero entender qual frente da Valentis pode fazer sentido para o meu negócio.")}>Conversar sobre meu cenário <ArrowRight size={17} /></a></div><div className="fit-grid"><div className="fit-card"><MessageCircle size={20} /><h3>Você precisa gerar mais contatos</h3><p>Estruturamos campanhas e páginas para melhorar a qualidade das oportunidades.</p></div><div className="fit-card"><Code2 size={20} /><h3>Você perdeu o controle da operação</h3><p>Desenhamos sistemas simples para reduzir planilhas soltas e retrabalho.</p></div><div className="fit-card"><Target size={20} /><h3>Você não sabe por onde começar</h3><p>O diagnóstico organiza o problema antes de indicar um investimento.</p></div><div className="fit-card"><Sparkles size={20} /><h3>Você quer evoluir com critério</h3><p>Decisões melhores vêm de escopo, acompanhamento e prioridades claras.</p></div></div></div></section>

        <section className="cta-section"><div className="container relative grid items-center gap-9 py-16 md:grid-cols-[1fr_auto]"><div><p className="eyebrow eyebrow-light"><span className="eyebrow-dot" />Próximo passo</p><h2 className="mt-4 max-w-2xl text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">Comece entendendo o que sua empresa precisa agora.</h2><p className="mt-5 max-w-xl leading-7 text-white/70">Faça o diagnóstico inicial ou fale diretamente com a Valentis.</p></div><Link className="button button-white" href="/diagnostico">Fazer diagnóstico <ArrowRight size={17} /></Link></div></section>
      </main><Footer />
    </div>
  );
}

