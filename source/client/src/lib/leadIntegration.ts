export const WHATSAPP = "https://wa.me/5544998985343";
export const STATIC_FORMS_ENDPOINT = "https://api.staticforms.dev/submit";

export function whatsappUrl(message: string) {
  return `${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export type LeadAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  landing_page: string;
  current_url: string;
  referrer: string;
  timezone: string;
  route: string;
  captured_at: string;
};

export type LeadPayload = {
  name: string;
  company?: string;
  phone: string;
  website?: string;
  challenge: string;
  contactTime: string;
  notes?: string;
  consent: true;
  policyVersion: string;
  attribution: LeadAttribution;
  honeypot: string;
};

export function captureAttribution(): LeadAttribution {
  const params = new URLSearchParams(window.location.search);
  const value = (key: string) => {
    const item = params.get(key)?.trim();
    return item || undefined;
  };

  return {
    utm_source: value("utm_source"),
    utm_medium: value("utm_medium"),
    utm_campaign: value("utm_campaign"),
    utm_term: value("utm_term"),
    utm_content: value("utm_content"),
    gclid: value("gclid"),
    landing_page: document.referrer || window.location.href,
    current_url: window.location.href,
    referrer: document.referrer,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    route: window.location.pathname,
    captured_at: new Date().toISOString(),
  };
}

export function trackLeadEvent(eventName: string) {
  const analytics = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof analytics === "function") {
    analytics("event", eventName, { event_category: "lead" });
  }
}

function publicApiKey() {
  return import.meta.env.VITE_STATIC_FORMS_API_KEY?.trim();
}

export async function submitLead(payload: LeadPayload) {
  const apiKey = publicApiKey();

  if (!apiKey) {
    trackLeadEvent("lead_submit_error");
    return { ok: false as const, reason: "not_configured" as const };
  }

  const { attribution, ...leadFields } = payload;
  const body = {
    apiKey,
    ...leadFields,
    ...attribution,
    consent: "true",
    policy_version: payload.policyVersion,
    subject: "Novo contato pelo site — Valentis Solutions",
  };

  const response = await fetch(STATIC_FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    trackLeadEvent("lead_submit_error");
    return { ok: false as const, reason: "provider_error" as const, status: response.status };
  }

  trackLeadEvent("lead_submit_success");
  return { ok: true as const };
}

export const LEAD_POLICY_VERSION = "2026-09-18-formulario-v1";
export const STATIC_FORMS_SETUP_REQUIRED = [
  "VITE_STATIC_FORMS_API_KEY (identificador público do formulário)",
  "domínio autorizado: sovalentis.com",
  "destinatário verificado: valentissolutions@duck.com",
  "armazenamento, retenção, exportação, exclusão e antispam confirmados",
] as const;
