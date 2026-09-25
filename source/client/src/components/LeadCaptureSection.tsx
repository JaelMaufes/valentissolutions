import { FormEvent, useEffect, useRef, useState } from "react";
import { Check, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { whatsappUrl, captureAttribution, LEAD_POLICY_VERSION, submitLead, trackLeadEvent, type LeadPayload } from "@/lib/leadIntegration";

const challenges = [
  "Quero atrair mais clientes",
  "Preciso melhorar meus anúncios",
  "Quero entender meus gargalos",
  "Preciso organizar processos",
  "Ainda não sei exatamente o que preciso",
];

const contactTimes = ["Horário comercial", "Manhã", "Tarde", "Noite"];

type FormValues = { name: string; company: string; phone: string; website: string; challenge: string; contactTime: string; notes: string; consent: boolean; honeypot: string };
const initial: FormValues = { name: "", company: "", phone: "", website: "", challenge: "", contactTime: "", notes: "", consent: false, honeypot: "" };

function clean(value: string, max: number) {
  return value.replace(/[<>]/g, "").trim().slice(0, max);
}

function validate(values: FormValues) {
  const errors: Record<string, string> = {};
  if (clean(values.name, 80).length < 2) errors.name = "Informe seu nome.";
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) errors.phone = "Informe um telefone ou WhatsApp válido.";
  if (!values.challenge) errors.challenge = "Escolha o principal desafio.";
  if (!values.contactTime) errors.contactTime = "Indique o melhor horário.";
  if (!values.consent) errors.consent = "Autorize o contato para continuar.";
  return errors;
}

export default function LeadCaptureSection() {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const started = useRef(false);

  useEffect(() => {
    trackLeadEvent("lead_form_view");
  }, []);

  const update = (field: keyof FormValues, value: string | boolean) => {
    if (!started.current) {
      started.current = true;
      trackLeadEvent("lead_form_start");
    }
    setValues(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: "" }));
    if (state !== "idle") setState("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "sending") return;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (values.honeypot) return;

    setState("sending");
    const payload: LeadPayload = {
      name: clean(values.name, 80), company: clean(values.company, 120), phone: clean(values.phone, 30),
      website: clean(values.website, 160), challenge: values.challenge, contactTime: values.contactTime,
      notes: clean(values.notes, 500), consent: true, policyVersion: LEAD_POLICY_VERSION, attribution: captureAttribution(), honeypot: values.honeypot,
    };
    const result = await submitLead(payload);
    if (result.ok) {
      if (typeof window !== 'undefined' && (window as any).gtag_report_conversion_form) {
        (window as any).gtag_report_conversion_form();
      }
    }
    setState(result.ok ? "success" : "error");
  };

  return (
    <section id="captacao-leads" className="lead-capture-section section-pad" aria-labelledby="lead-capture-title">
      <div className="container">
        <div className="lead-capture-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot" />Próximo passo</p>
            <h2 id="lead-capture-title" className="section-title mt-4">Escolha como prefere falar <span className="gradient-text">com a Valentis.</span></h2>
          </div>
          <p className="section-lead">Você decide o canal. O WhatsApp é imediato; o formulário organiza as informações para uma conversa no melhor horário.</p>
        </div>
        <div className="lead-capture-grid mt-10">
          <aside className="lead-whatsapp-card">
            <div className="lead-card-icon"><MessageCircle size={22} /></div>
            <p className="eyebrow eyebrow-light mt-6"><span className="eyebrow-dot" />Atendimento imediato</p>
            <h3>Fale conosco pelo WhatsApp.</h3>
            <p>Se você já sabe o que precisa ou prefere conversar agora, esse é o caminho mais rápido.</p>
            <a className="button button-white mt-7" 
              href={whatsappUrl("Olá! Quero falar com a Valentis.")} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag_report_conversion_whatsapp) {
                  (window as any).gtag_report_conversion_whatsapp();
                }
              }}><MessageCircle size={17} />Falar pelo WhatsApp
            </a>
          </aside>
          <div className="lead-form-card">
            <div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Prefere receber contato depois?</p><h3>Deixe seus dados e indique o melhor horário.</h3></div><ShieldCheck size={28} className="text-[#6366f1] shrink-0" /></div>
            <p className="lead-form-support">Não pode falar pelo WhatsApp agora? Deixe seus dados e a Valentis entrará em contato no melhor horário para entender seu cenário e indicar o próximo passo.</p>
            {state === "success" ? <div className="lead-feedback lead-feedback-success" role="status"><Check size={20} /><div><strong>Recebemos suas informações.</strong><p>A equipe da Valentis entrará em contato no horário indicado. Se preferir atendimento imediato, você também pode falar pelo WhatsApp.</p></div></div> : <form className="lead-form" onSubmit={handleSubmit} noValidate>
              <div className="lead-form-fields">
                <label>Nome *<input id="lead-name" name="name" value={values.name} onChange={event => update("name", event.target.value)} maxLength={80} autoComplete="name" aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label>
                <label>Empresa<input name="company" value={values.company} onChange={event => update("company", event.target.value)} maxLength={120} autoComplete="organization" /></label>
                <label>WhatsApp ou telefone *<input name="phone" type="tel" value={values.phone} onChange={event => update("phone", event.target.value)} maxLength={30} autoComplete="tel" aria-invalid={Boolean(errors.phone)} />{errors.phone && <small>{errors.phone}</small>}</label>
                <label>Site ou Instagram<input name="website" value={values.website} onChange={event => update("website", event.target.value)} maxLength={160} autoComplete="url" /></label>
                <label>Principal desafio *<select name="challenge" value={values.challenge} onChange={event => update("challenge", event.target.value)} aria-invalid={Boolean(errors.challenge)}><option value="">Selecione uma opção</option>{challenges.map(item => <option key={item}>{item}</option>)}</select>{errors.challenge && <small>{errors.challenge}</small>}</label>
                <label>Melhor horário para contato *<select name="contactTime" value={values.contactTime} onChange={event => update("contactTime", event.target.value)} aria-invalid={Boolean(errors.contactTime)}><option value="">Selecione uma opção</option>{contactTimes.map(item => <option key={item}>{item}</option>)}</select>{errors.contactTime && <small>{errors.contactTime}</small>}</label>
                <label className="lead-full-field">Observações<textarea name="notes" value={values.notes} onChange={event => update("notes", event.target.value)} maxLength={500} rows={3} /></label>
              </div>
              <label className="lead-honeypot" aria-hidden="true">Nome do site<input tabIndex={-1} autoComplete="off" name="company_website_confirm" value={values.honeypot} onChange={event => update("honeypot", event.target.value)} /></label>
              <label className="lead-consent"><input type="checkbox" name="consent" checked={values.consent} onChange={event => update("consent", event.target.checked)} aria-invalid={Boolean(errors.consent)} /><span>Autorizo a Valentis Solutions a utilizar os dados informados para entrar em contato comigo sobre minha solicitação e entender o cenário do meu negócio, conforme a <a href="/privacidade">Política de Privacidade</a>.</span></label>
              {errors.consent && <small className="lead-consent-error">{errors.consent}</small>}
              {state === "error" && <div className="lead-feedback lead-feedback-error" role="alert">Não conseguimos enviar suas informações agora. Confira os campos e tente novamente ou fale conosco pelo WhatsApp.</div>}
              <button type="submit" className="button button-primary" disabled={state === "sending"}>{state === "sending" ? "Enviando suas informações..." : <><Send size={16} />Enviar meus dados</>}</button>
              <p className="lead-form-note">Seus dados serão encaminhados com segurança para a equipe da Valentis, conforme a Política de Privacidade.</p>
            </form>}
          </div>
        </div>
      </div>
    </section>
  );
}
