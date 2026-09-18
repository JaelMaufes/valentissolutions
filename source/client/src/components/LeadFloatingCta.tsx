import { ArrowDown, X } from "lucide-react";
import { useState } from "react";
import { trackLeadEvent } from "@/lib/leadIntegration";

export default function LeadFloatingCta() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const scrollToForm = () => {
    trackLeadEvent("lead_cta_click");
    document.getElementById("captacao-leads")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => document.getElementById("lead-name")?.focus(), 450);
  };

  return (
    <div className="lead-floating-cta" aria-label="Acesso ao formulário de contato">
      <button type="button" className="lead-floating-main" onClick={scrollToForm}>
        <span>Prefere receber contato? Deixe seus dados</span>
        <ArrowDown size={16} aria-hidden="true" />
      </button>
      <button type="button" className="lead-floating-close" onClick={() => setDismissed(true)} aria-label="Ocultar acesso ao formulário" title="Ocultar">
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
