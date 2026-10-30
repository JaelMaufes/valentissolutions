import { ArrowUp, ArrowUpRight, Check, ChevronDown, Mail, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import LeadCaptureSection from "@/components/LeadCaptureSection";
import LeadFloatingCta from "@/components/LeadFloatingCta";
import { WHATSAPP, whatsappUrl } from "@/lib/leadIntegration";
import { ANILLE_URL, ANIVE_BOX_URL, ANIVE_IMOB_URL } from "@/components/AnilleShowcase";
import { EMPRESA } from "@/lib/empresa";

export { WHATSAPP, whatsappUrl, ANILLE_URL, ANIVE_BOX_URL, ANIVE_IMOB_URL };

export function Logo() { return <Link href="/" className="brand-logo-link" aria-label="Valentis Solutions — página inicial"><img className="brand-logo-image" src="/assets/marca/valentis-solutions-escuro.svg" width={939} height={441} alt="Valentis Solutions" /></Link>; }

const externo = (href: string) => href.startsWith("http");
const navItems = [{ href: "/", label: "Início" }, { href: "/trafego-pago", label: "Tráfego pago" }, { href: "/servicos", label: "Serviços" }, { href: "/sistemas", label: "Sistemas" }, { href: "/aproxima", label: "Aproxima" }, { href: "/sobre", label: "Sobre nós" }];

/* Símbolo cubo-A do Anive (canvas "Logo Anive"), para o atalho do menu. */
export function AnilleSimbolo({ className = "", id = "m" }: { className?: string; id?: string }) {
  return <svg className={className} viewBox="-92 -104 184 184" aria-hidden="true" focusable="false"><defs><linearGradient id={`as${id}t`} x1="-60" y1="-90" x2="60" y2="-10" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FF2FD2" /><stop offset="1" stopColor="#FF5CE8" /></linearGradient><linearGradient id={`as${id}l`} x1="-86" y1="-50" x2="-10" y2="80" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#5E8BFF" /><stop offset="1" stopColor="#2A9BFF" /></linearGradient><linearGradient id={`as${id}r`} x1="10" y1="-20" x2="80" y2="70" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#6A1BFF" /><stop offset=".55" stopColor="#3B5BFF" /><stop offset="1" stopColor="#00E5FF" /></linearGradient></defs><polygon points="0,-100 86.6,-50 0,0 -86.6,-50" fill={`url(#as${id}t)`} /><polygon points="-86.6,-50 0,0 0,35 -42,75.75 -86.6,50" fill={`url(#as${id}l)`} /><polygon points="0,0 86.6,-50 86.6,50 42,75.75 0,35" fill={`url(#as${id}r)`} /></svg>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [rolou, setRolou] = useState(false);
  const [location] = useLocation();
  const ativo = (href: string) => (href === "/" ? location === "/" : location.startsWith(href));
  useEffect(() => { const close = () => setOpen(false); window.addEventListener("resize", close); return () => window.removeEventListener("resize", close); }, []);
  useEffect(() => { const onScroll = () => setRolou(window.scrollY > 8); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const produtos = useRef<HTMLDetailsElement>(null);
  useEffect(() => { setOpen(false); if (produtos.current) produtos.current.open = false; }, [location]);
  // Menu "Anive" (produtos): fecha ao clicar fora ou com Esc.
  useEffect(() => {
    const fechar = (e: Event) => { const d = produtos.current; if (d?.open && !(e.target instanceof Node && d.contains(e.target))) d.open = false; };
    const esc = (e: KeyboardEvent) => { const d = produtos.current; if (e.key === "Escape" && d?.open) { d.open = false; d.querySelector("summary")?.focus(); } };
    document.addEventListener("click", fechar); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("click", fechar); document.removeEventListener("keydown", esc); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const antes = document.body.style.overflow; document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = antes; window.removeEventListener("keydown", onKey); };
  }, [open]);
  return <><header className={`site-header ${rolou ? "site-header-rolou" : ""} ${open ? "site-header-aberto" : ""}`}>
    <div className="container site-header-in">
      <Logo />
      <nav className="nav-principal" aria-label="Navegação principal">
        {navItems.filter(item => item.href !== "/").map(item => <Link key={item.href} href={item.href} className="nav-link" aria-current={ativo(item.href) ? "page" : undefined}>{item.label}</Link>)}
        <details ref={produtos} className="nav-produtos">
          <summary className="nav-anille" aria-label="Sistema Anive e edições por nicho"><AnilleSimbolo className="nav-anille-simbolo" id="d" /><span>Anive</span><ChevronDown size={14} aria-hidden="true" /></summary>
          <div className="nav-produtos-painel">
            <a href={ANILLE_URL}><img src="/assets/anive/anive-logo-branco.svg" width={808} height={280} alt="Sistema Anive" /><span>Empresas de serviço: do funil ao lucro, com teste grátis</span></a>
            <a href={ANIVE_BOX_URL}><img src="/assets/anive/anive-box-branco.svg" width={1219} height={280} alt="Anive Box" /><span>Boxes, academias e estúdios</span></a>
            <a href={ANIVE_IMOB_URL}><img src="/assets/anive/anive-imob-branco.svg" width={1240} height={280} alt="Anive Imob" /><span>Imobiliárias e corretores <em>Novo</em></span></a>
          </div>
        </details>
      </nav>
      <div className="site-header-acoes">
        <a target="_blank" rel="noopener noreferrer" className="button button-small button-ghost hidden sm:inline-flex" href={whatsappUrl("Olá! Quero entender como a Valentis Solutions pode ajudar meu negócio.")}>Falar com a Valentis Solutions <ArrowUpRight size={15} /></a>
        <button type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="menu-celular" className="menu-toggle lg:hidden" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
    </div>
    {open && <nav id="menu-celular" className="mobile-menu lg:hidden" aria-label="Navegação no celular">
      <div className="container mobile-menu-in">
        {navItems.map(item => <Link key={item.href} href={item.href} className="mobile-link" aria-current={ativo(item.href) ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}
        <a href={ANILLE_URL} className="mobile-anille" onClick={() => setOpen(false)}>
          <img src="/assets/anive/anive-logo-branco.svg" width="808" height="280" alt="Sistema Anive" />
          <span>Gestão por assinatura para empresas de serviço. Teste grátis por 14 dias.</span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <a href={ANIVE_BOX_URL} className="mobile-anille mobile-anive-box" onClick={() => setOpen(false)}>
          <img src="/assets/anive/anive-box-branco.svg" width="1219" height="280" alt="Anive Box" />
          <span>Para boxes de CrossFit, Hyrox e treino funcional: aulas, check-in, app do aluno e cobrança.</span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <a href={ANIVE_IMOB_URL} className="mobile-anille mobile-anive-box" onClick={() => setOpen(false)}>
          <img src="/assets/anive/anive-imob-branco.svg" width="1240" height="280" alt="Anive Imob" />
          <span>Novo. Para imobiliárias e corretores: aluguel, repasse por Pix, vendas e comissões.</span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <a target="_blank" rel="noopener noreferrer" className="button button-primary mobile-cta" href={whatsappUrl("Olá! Quero falar com a Valentis Solutions.")} onClick={() => setOpen(false)}>Falar com a Valentis Solutions <MessageCircle size={17} /></a>
      </div>
    </nav>}
  </header><LeadFloatingCta /><BackToTop /></>;
}

function BackToTop() { const [visible, setVisible] = useState(false); useEffect(() => { const onScroll = () => setVisible(window.scrollY > 480); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []); return <button type="button" aria-label="Voltar ao topo" title="Voltar ao topo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`back-to-top ${visible ? "back-to-top-visible" : ""}`}><ArrowUp size={18} strokeWidth={2.5} /></button>; }

export function Footer({ withLeadForm = true }: { withLeadForm?: boolean } = {}) { return <>{withLeadForm && <LeadCaptureSection />}<footer className="border-t border-[#e6e2f1] bg-white"><div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]"><div><Logo /><p className="mt-4 max-w-sm text-sm leading-6 text-[#716d80]">Aquisição e tecnologia para negócios que querem atrair clientes e organizar a operação. Criadora do Sistema Anive.</p></div><nav aria-label="Serviços da Valentis Solutions"><p className="eyebrow mb-4">Valentis Solutions</p><div className="grid gap-3 text-sm font-semibold text-[#4e4961]"><Link href="/trafego-pago">Tráfego pago</Link><Link href="/servicos">Serviços</Link><Link href="/sistemas">Sistemas sob medida</Link><Link href="/aproxima">Aproxima: cartão NFC</Link><Link href="/planos">Planos</Link><Link href="/diagnostico">Diagnóstico gratuito</Link><Link href="/sobre">Sobre nós</Link></div></nav><nav aria-label="Sistema Anive"><p className="eyebrow mb-4">Sistema Anive</p><div className="grid gap-3 text-sm font-semibold text-[#4e4961]"><a href={ANILLE_URL}>Anive: empresas de serviço</a><a href={ANIVE_BOX_URL}>Anive Box: boxes e academias</a><a href={ANIVE_IMOB_URL}>Anive Imob: imobiliárias</a><a href="https://anive.sovalentis.com/planos/">Planos do Anive</a><a href="https://painel.sovalentis.com">Entrar no Anive</a></div></nav><div><p className="eyebrow mb-4">Atendimento</p><div className="grid gap-3 text-sm text-[#716d80]"><span className="flex items-center gap-2"><MapPin size={15} className="text-[#6A19F9]" />Maringá e Sarandi, PR · atendimento em todo o Brasil</span><a target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold text-[#4e4961]" href={whatsappUrl("Olá! Quero falar sobre as soluções da Valentis Solutions.")}><MessageCircle size={15} className="text-[#6A19F9]" />WhatsApp direto</a><a className="flex items-center gap-2" href="tel:+554431124446"><Phone size={15} className="text-[#6A19F9]" />{EMPRESA.telefone}</a><a className="flex items-center gap-2" href={`mailto:${EMPRESA.email}`}><Mail size={15} className="text-[#6A19F9]" />{EMPRESA.email}</a></div></div></div><div className="container flex flex-col justify-between gap-3 border-t border-[#eeeaf7] py-5 text-xs text-[#8a8597] sm:flex-row"><span>© {new Date().getFullYear()} {EMPRESA.razaoSocial} · <span className="whitespace-nowrap">CNPJ {EMPRESA.cnpj}</span> · {EMPRESA.cidade}. Todos os direitos reservados.</span><div className="flex flex-wrap gap-x-4 gap-y-2"><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos de uso</Link><span>Estratégia, tecnologia e clareza para negócios locais.</span></div></div></footer></>; }
export function CheckLine({ children }: { children: React.ReactNode }) { return <li className="flex items-start gap-3 text-sm leading-6 text-[#4e4961]"><span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#eee9ff] text-[#6542c4]"><Check size={11} strokeWidth={3} /></span>{children}</li>; }
export function SiteChrome() { return <BackToTop />; }
