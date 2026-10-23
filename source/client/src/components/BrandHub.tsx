import { useEffect, useRef } from "react";
import { BarChart3, Layers3, Smartphone, TrendingUp, type LucideIcon } from "lucide-react";
import { Link } from "wouter";
import { ANILLE_URL } from "@/components/AnilleShowcase";

/* Sistema animado da marca: o cubo da Valentis Solutions no centro e as frentes
   em órbita, ligadas por fluxos de dados. Para o lançamento de um produto, basta
   trocar o rótulo/ícone de um nó (ex.: "Organizar") nesta lista. Os produtos orbitam junto, com link:
   Sistema Anive (logo oficial), Anive Box (selo escuro, segmento do Anive para boxes, pré-lançamento)
   e Aproxima (cartão por aproximação, página /aproxima). */
type HubNode = { label: string; icon: LucideIcon; angle: number };

const nodes: HubNode[] = [
  { label: "Atrair", icon: BarChart3, angle: 152 },
  { label: "Organizar", icon: Layers3, angle: 334 },
  { label: "Evoluir", icon: TrendingUp, angle: 206 },
];

// Ângulos calculados para nenhum item encostar em outro durante a órbita (computador, 1024 px e celular).
const ANILLE_ANGULO = 30;
const BOX_ANGULO = 84;
const APROXIMA_ANGULO = 268;
const ANIVE_BOX_URL = `${ANILLE_URL}/box/`;
const ponta = (angulo: number, r: number) => { const a = (angulo * Math.PI) / 180; return { x1: Math.cos(a) * 15, y1: Math.sin(a) * 15, x2: Math.cos(a) * r, y2: Math.sin(a) * r }; };

const particles = [
  { r: 0.27, speed: 14, delay: 0, size: 6 },
  { r: 0.27, speed: 14, delay: -7, size: 4 },
  { r: 0.47, speed: 26, delay: -4, size: 5 },
  { r: 0.47, speed: 26, delay: -17, size: 3 },
];

export default function BrandHub() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      const y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { el.style.setProperty("--mx", x.toFixed(3)); el.style.setProperty("--my", y.toFixed(3)); });
    };
    const reset = () => { el.style.setProperty("--mx", "0"); el.style.setProperty("--my", "0"); };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", reset);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", onMove); document.removeEventListener("pointerleave", reset); };
  }, []);

  return (
    <div ref={ref} className="brand-hub" role="group" aria-label="Valentis Solutions: atrair, organizar e evoluir como um sistema conectado, com o Sistema Anive, o Anive Box e o Aproxima">
      <div className="bh-layer bh-back" aria-hidden="true">
        <div className="bh-glow" />
        <div className="bh-ring bh-ring-inner" />
        <div className="bh-ring bh-ring-outer" />
      </div>

      <div className="bh-orbit">
        <svg className="bh-links" viewBox="-50 -50 100 100" aria-hidden="true">
          <defs>
            <linearGradient id="bhFlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#11d9ff" />
              <stop offset=".55" stopColor="#7135e8" />
              <stop offset="1" stopColor="#f000cf" />
            </linearGradient>
            <linearGradient id="bhAproxima" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#F500C6" />
              <stop offset=".55" stopColor="#6A19F9" />
              <stop offset="1" stopColor="#01D2F3" />
            </linearGradient>
            <linearGradient id="bhAnille" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#FF2FD2" />
              <stop offset=".5" stopColor="#6A1BFF" />
              <stop offset="1" stopColor="#00E5FF" />
            </linearGradient>
          </defs>
          {nodes.map(({ label, angle }) => {
            const a = (angle * Math.PI) / 180;
            return <line key={label} className="bh-link" x1={Math.cos(a) * 15} y1={Math.sin(a) * 15} x2={Math.cos(a) * 36} y2={Math.sin(a) * 36} stroke="url(#bhFlow)" />;
          })}
          <line className="bh-link bh-link-anille" {...ponta(ANILLE_ANGULO, 38)} stroke="url(#bhAnille)" />
          <line className="bh-link bh-link-box" {...ponta(BOX_ANGULO, 41)} stroke="url(#bhAnille)" />
          <line className="bh-link bh-link-aproxima" {...ponta(APROXIMA_ANGULO, 38)} stroke="url(#bhAproxima)" />
        </svg>
        {particles.map((p, i) => <span key={i} aria-hidden="true" className="bh-particle" style={{ "--pr": p.r, "--ps": `${p.speed}s`, "--pd": `${p.delay}s`, "--pz": `${p.size}px` } as React.CSSProperties} />)}
        {nodes.map(({ label, icon: Icon, angle }) => (
          <div key={label} aria-hidden="true" className="bh-node-pos" style={{ "--a": `${angle}deg` } as React.CSSProperties}>
            <div className="bh-node"><Icon size={16} /><span>{label}</span></div>
          </div>
        ))}
        <div className="bh-node-pos bh-anille-pos" style={{ "--a": `${ANILLE_ANGULO}deg` } as React.CSSProperties}>
          <a className="bh-anille" href={ANILLE_URL} aria-label="Conhecer o Sistema Anive, um produto Valentis Solutions">
            <img src="/assets/anive/anive-logo-tinta.svg" width={808} height={280} alt="" decoding="async" />
          </a>
        </div>
        <div className="bh-node-pos bh-box-pos" style={{ "--a": `${BOX_ANGULO}deg` } as React.CSSProperties}>
          <a className="bh-box" href={ANIVE_BOX_URL} aria-label="Conhecer o Anive Box, sistema para boxes de CrossFit e Hyrox (pré-lançamento)">
            <img src="/assets/anive/anive-logo-branco.svg" width={808} height={280} alt="" decoding="async" />
            <span className="bh-box-tag">Box</span>
          </a>
        </div>
        <div className="bh-node-pos bh-aproxima-pos" style={{ "--a": `${APROXIMA_ANGULO}deg` } as React.CSSProperties}>
          <Link className="bh-aproxima" href="/aproxima" aria-label="Conhecer o Aproxima, cartão de contato por aproximação">
            <span className="bh-aproxima-icone" aria-hidden="true"><span className="bh-aproxima-onda" /><Smartphone size={15} /></span>
            <span className="bh-aproxima-nome">Aproxima<small>cartão por aproximação</small></span>
          </Link>
        </div>
      </div>

      <div className="bh-layer bh-front" aria-hidden="true">
        <div className="bh-cube-wrap">
          <img className="bh-cube" src="/assets/marca/valentis-solutions-simbolo-cor.svg" alt="" width={246} height={233} decoding="async" />
          <div className="bh-shadow" />
        </div>
      </div>
    </div>
  );
}
