import { useEffect, useRef } from "react";
import { BarChart3, Smartphone } from "lucide-react";
import { Link } from "wouter";
import { ANILLE_URL, ANIVE_BOX_URL, ANIVE_ESCOLA_URL, ANIVE_IMOB_URL } from "@/components/AnilleShowcase";

/* Sistema de órbitas da marca (09/11): o cubo da Valentis Solutions no centro, como um sol, e duas órbitas
   de linha fina, sem tracejado. Na órbita interna, os serviços da Valentis Solutions (tráfego pago e Aproxima);
   na externa, a família Anive (Sistema Anive, Anive Box, Anive Imob e Anive Escola), a 90° um do outro.
   As duas órbitas giram juntas e os itens internos ficam a 45° dos externos, para nada se encostar em nenhum
   momento (computador, 1024 px e celular). Produto novo: incluir na órbita certa e redistribuir os ângulos. */
const EXTERNA = { anive: 0, box: 90, imob: 180, escola: 270 };
const INTERNA = { trafego: 45, aproxima: 225 };

const luas = [
  { orbita: "int", speed: 18, delay: 0, size: 6 },
  { orbita: "ext", speed: 34, delay: -12, size: 5 },
  { orbita: "ext", speed: 34, delay: -29, size: 4 },
];

const pos = (angulo: number, orbita: "ext" | "int") => ({ className: `bh-node-pos bh-pos-${orbita}`, style: { "--a": `${angulo}deg` } as React.CSSProperties });

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
    <div ref={ref} className="brand-hub bh-orbitas" role="group" aria-label="Valentis Solutions e o que ela oferece: Sistema Anive, Anive Box, Anive Imob, Anive Escola, Aproxima e tráfego pago">
      <div className="bh-layer bh-back" aria-hidden="true">
        <div className="bh-glow" />
        <div className="bh-ring bh-orb bh-orb-int" />
        <div className="bh-ring bh-orb bh-orb-ext" />
      </div>

      <div className="bh-orbit">
        {luas.map((p, i) => <span key={i} aria-hidden="true" className={`bh-particle bh-lua-${p.orbita}`} style={{ "--ps": `${p.speed}s`, "--pd": `${p.delay}s`, "--pz": `${p.size}px` } as React.CSSProperties} />)}
        <div {...pos(EXTERNA.anive, "ext")}>
          <a className="bh-anille" href={ANILLE_URL} aria-label="Conhecer o Sistema Anive, um produto Valentis Solutions">
            <img src="/assets/anive/anive-logo-tinta.svg" width={808} height={280} alt="" decoding="async" />
          </a>
        </div>
        <div {...pos(EXTERNA.box, "ext")}>
          <a className="bh-box" href={ANIVE_BOX_URL} aria-label="Conhecer o Anive Box, sistema para boxes, academias e estúdios">
            <img src="/assets/anive/anive-box-branco.svg" width={1219} height={280} alt="" decoding="async" />
          </a>
        </div>
        <div {...pos(EXTERNA.imob, "ext")}>
          <a className="bh-box bh-imob" href={ANIVE_IMOB_URL} aria-label="Conhecer o Anive Imob, sistema para imobiliárias e corretores">
            <img src="/assets/anive/anive-imob-branco.svg" width={1240} height={280} alt="" decoding="async" />
          </a>
        </div>
        <div {...pos(EXTERNA.escola, "ext")}>
          <a className="bh-box bh-escola" href={ANIVE_ESCOLA_URL} aria-label="Conhecer o Anive Escola, sistema para escolas de música, bandas e projetos sociais">
            <img src="/assets/anive/anive-escola-branco.svg" width={1530} height={280} alt="" decoding="async" />
          </a>
        </div>
        <div {...pos(INTERNA.trafego, "int")}>
          <Link className="bh-node bh-node-link bh-int" href="/trafego-pago" aria-label="Conhecer o tráfego pago da Valentis Solutions"><BarChart3 size={16} aria-hidden="true" /><span>Tráfego pago</span></Link>
        </div>
        <div {...pos(INTERNA.aproxima, "int")}>
          <Link className="bh-aproxima bh-int" href="/aproxima" aria-label="Conhecer o Aproxima, cartão de contato por aproximação">
            <span className="bh-aproxima-icone" aria-hidden="true"><span className="bh-aproxima-onda" /><Smartphone size={15} /></span>
            <span className="bh-aproxima-nome">Aproxima</span>
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
