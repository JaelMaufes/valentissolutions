import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, CircleHelp, MessageCircle, RotateCcw, Sparkles, Target } from "lucide-react";
import { trackLeadEvent, whatsappUrl } from "@/lib/leadIntegration";

type Answers = { segment: string; objective: string; bottleneck: string; maturity: string; budget: string };
const initial: Answers = { segment: "", objective: "", bottleneck: "", maturity: "", budget: "" };

const steps: { key: keyof Answers; title: string; question: string; hint?: string; options: string[] }[] = [
  { key: "segment", title: "Sobre o seu negócio", question: "Em qual contexto sua empresa atua?", options: ["Comércio local", "Prestação de serviços", "Saúde, estética ou bem-estar", "Educação, eventos ou outro"] },
  { key: "objective", title: "Seu próximo objetivo", question: "O que você mais quer melhorar agora?", options: ["Gerar mais contatos", "Atrair clientes mais qualificados", "Aumentar o movimento em uma região", "Voltar a anunciar com mais segurança"] },
  { key: "bottleneck", title: "Onde está o atrito?", question: "O que mais parece travar o crescimento hoje?", options: ["Poucas pessoas chegam até mim", "As pessoas chegam, mas não avançam", "Minha comunicação não diferencia a oferta", "Não sei onde a verba está sendo desperdiçada"] },
  { key: "maturity", title: "Momento atual", question: "Como estão seus anúncios hoje?", options: ["Ainda não anunciei", "Anuncio de forma pontual", "Já anuncio, mas sem clareza dos dados", "Tenho uma operação ativa e quero evoluir"] },
  { key: "budget", title: "Verba de mídia", question: "Quanto você pretende investir em anúncios por mês?", hint: "É o valor pago diretamente ao Google e à Meta — separado da gestão.", options: ["Ainda não defini", "Até R$ 1.500 por mês", "De R$ 1.500 a R$ 5.000 por mês", "Acima de R$ 5.000 por mês"] },
];

function recommendation(a: Answers) {
  if (a.bottleneck === "As pessoas chegam, mas não avançam") return { title: "Seu primeiro gargalo parece estar na conversão.", service: "Gestão de anúncios + landing page e copy", plan: "Gestão mensal — Plano Validar ou Crescer", why: "Antes de aumentar a verba, vale revisar a mensagem, a página e o próximo passo oferecido ao contato." };
  if (a.bottleneck === "Minha comunicação não diferencia a oferta") return { title: "Seu primeiro gargalo parece estar na mensagem.", service: "Gestão de anúncios + copy e criativos", plan: "Gestão mensal — Plano Validar", why: "Uma oferta bem apresentada ajuda o anúncio a atrair pessoas com mais intenção, não apenas mais cliques." };
  if (a.maturity === "Tenho uma operação ativa e quero evoluir" && a.budget === "Acima de R$ 5.000 por mês") return { title: "Seu cenário pede uma operação conectada.", service: "Gestão multi-plataforma + organização dos leads", plan: "Gestão mensal — Plano Escalar", why: "Com verba e operação ativas, o ganho está em conectar mídia, página e atendimento para não perder oportunidades no caminho." };
  if (a.bottleneck === "Não sei onde a verba está sendo desperdiçada" || a.maturity === "Já anuncio, mas sem clareza dos dados") return { title: "Seu primeiro gargalo parece estar na leitura dos dados.", service: "Auditoria + gestão de anúncios", plan: "Gestão mensal — Plano Crescer", why: "O próximo passo é organizar rastreamento, indicadores e decisões antes de ampliar campanhas." };
  if (a.objective === "Aumentar o movimento em uma região") return { title: "Seu cenário pede uma estratégia de presença local.", service: "Google Ads + Meta Ads com segmentação regional", plan: "Gestão mensal — Plano Crescer", why: "A combinação de intenção de busca e alcance local cria mais pontos de contato com quem está perto de você." };
  if (a.maturity === "Ainda não anunciei" || a.budget === "Ainda não defini") return { title: "O melhor começo é validar antes de escalar.", service: "Diagnóstico + campanha piloto", plan: "Sprint de Validação", why: "Em 15 dias, sem renovação automática, você testa o caminho com uma campanha piloto e recebe um plano de ação por escrito." };
  return { title: "Seu primeiro passo é estruturar a aquisição.", service: "Gestão de anúncios no Google e na Meta", plan: "Gestão mensal — Plano Validar", why: "Uma primeira operação bem estruturada permite aprender com a verba e descobrir quais oportunidades têm mais qualidade." };
}

export default function TrafficDiagnostic() {
  const [answers, setAnswers] = useState<Answers>(initial);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const current = steps[step];
  const result = recommendation(answers);
  const selected = answers[current.key];
  const setAnswer = (value: string) => setAnswers(prev => ({ ...prev, [current.key]: value }));
  const next = () => {
    if (step < steps.length - 1) return setStep(step + 1);
    setDone(true);
    trackLeadEvent("diagnostico_trafego_concluido");
  };
  const reset = () => { setAnswers(initial); setStep(0); setDone(false); };
  const msg = `Olá! Fiz o diagnóstico de tráfego pago da Valentis Solutions. Meu negócio: ${answers.segment}. Objetivo: ${answers.objective}. Principal gargalo: ${answers.bottleneck}. Anúncios hoje: ${answers.maturity}. Verba de mídia: ${answers.budget}. Recomendação: ${result.service} (${result.plan}). Quero conversar sobre o próximo passo.`;
  const pct = Math.round(((step + 1) / steps.length) * 100);

  return <div>
    {!done ? <div className="diagnostic-shell">
      <div className="flex items-center justify-between gap-4"><div><p className="eyebrow">Pergunta {step + 1} de {steps.length}</p><p className="mt-2 text-sm font-semibold text-[#6f687c]">{current.title}</p></div><span className="text-sm font-black text-[#6b4ac7]">{pct}%</span></div>
      <div className="progress-track mt-5"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
      <h3 className="mt-8 text-2xl font-black tracking-[-.03em] md:text-3xl">{current.question}</h3>
      {current.hint && <p className="mt-3 text-sm text-[#6f687c]">{current.hint}</p>}
      <div className="mt-5 grid gap-2.5">{current.options.map(option => <button type="button" key={option} onClick={() => setAnswer(option)} className={`option-button ${selected === option ? "option-selected" : ""}`}><span className={`option-radio ${selected === option ? "option-radio-selected" : ""}`}>{selected === option && <Check size={13} />}</span>{option}</button>)}</div>
      <div className="mt-7 flex items-center justify-between"><button type="button" onClick={() => step > 0 && setStep(step - 1)} className={`button button-secondary ${step === 0 ? "invisible" : ""}`}><ArrowLeft size={16} />Anterior</button><button type="button" disabled={!selected} onClick={next} className="button button-primary disabled:cursor-not-allowed disabled:opacity-45">{step === steps.length - 1 ? "Ver meu diagnóstico" : "Continuar"}<ArrowRight size={16} /></button></div>
    </div> : <div className="result-shell">
      <div className="result-icon"><Sparkles size={25} /></div>
      <p className="eyebrow">Seu diagnóstico inicial</p>
      <h3 className="mt-4 max-w-2xl text-3xl font-black tracking-[-.04em] md:text-5xl">{result.title}</h3>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-[#625c70]">{result.why}</p>
      <div className="result-grid mt-7"><div><span>Caminho indicado</span><strong>{result.service}</strong></div><div><span>Ponto de partida sugerido</span><strong>{result.plan}</strong></div></div>
      <div className="mt-6 rounded-2xl border border-[#e5defc] bg-[#faf8ff] p-5 text-sm leading-6 text-[#5c566d]"><div className="flex gap-3"><CircleHelp className="mt-0.5 shrink-0 text-[#7c4fe0]" size={19} /><p>Essa recomendação parte apenas das suas respostas. Na conversa, avaliamos oferta, região, verba e capacidade de atendimento antes de indicar qualquer contratação.</p></div></div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row"><a className="button button-primary" target="_blank" rel="noopener noreferrer" href={whatsappUrl(msg)} onClick={() => trackLeadEvent("whatsapp_diagnostico_trafego")}><MessageCircle size={17} />Receber orientação no WhatsApp</a><button type="button" className="button button-secondary" onClick={reset}><RotateCcw size={16} />Refazer diagnóstico</button></div>
    </div>}
    <div className="mt-5 flex items-start gap-3 text-xs leading-5 text-[#898296]"><Target size={15} className="mt-0.5 shrink-0 text-[#7c4fe0]" /><p>Suas respostas só são enviadas quando você clica no botão do WhatsApp. O diagnóstico é uma triagem e não representa promessa de resultado.</p></div>
  </div>;
}
