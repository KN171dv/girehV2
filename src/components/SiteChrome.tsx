import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./icons";
import { waLink, DEFAULT_WA_MESSAGE } from "../data/site";

/*
  Atalho de contato para telas estreitas, onde o botão "Agendar" do cabeçalho
  não cabe. Aparece depois da abertura e some quando o rodapé chega, para não
  ficar sobreposto aos contatos que já estão lá.

  Dois observadores decidem isso; nenhum código roda a cada quadro de scroll.
*/
export function SiteChrome() {
  const [passedHero, setPassedHero] = useState(false);
  const [footerNear, setFooterNear] = useState(false);

  useEffect(() => {
    const sentinel = document.querySelector('[data-sentinel="fab"]');
    const footer = document.getElementById("contato");
    const observers: IntersectionObserver[] = [];

    if (sentinel) {
      const heroObserver = new IntersectionObserver(([entry]) => {
        setPassedHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      });
      heroObserver.observe(sentinel);
      observers.push(heroObserver);
    }

    if (footer) {
      // O rodapé conta como "perto" quando entra nos 85% de cima da tela.
      const footerObserver = new IntersectionObserver(
        ([entry]) => setFooterNear(entry.isIntersecting),
        { rootMargin: "0px 0px -15% 0px" },
      );
      footerObserver.observe(footer);
      observers.push(footerObserver);
    }

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const visible = passedHero && !footerNear;

  return (
    <a
      href={waLink(DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar pelo WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-30 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-latao text-carvao shadow-[0_10px_28px_rgba(0,0,0,0.42)] transition-[translate,scale,opacity] duration-300 ease-brand active:scale-95 active:duration-100 focus-visible:outline-2 focus-visible:outline-offset-[3px] sm:hidden ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-90 opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
