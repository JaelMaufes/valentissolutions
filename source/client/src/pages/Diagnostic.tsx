import { useEffect } from "react";
import { useLocation } from "wouter";

// O diagnóstico agora faz parte da página de tráfego pago.
// Esta rota continua existindo para não quebrar links antigos.
export default function Diagnostic() {
  const [, navigate] = useLocation();
  useEffect(() => { navigate("/trafego-pago#diagnostico", { replace: true }); }, [navigate]);
  return null;
}
