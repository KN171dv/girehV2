import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./icons";
import { waLink, DEFAULT_WA_MESSAGE } from "../data/site";

/*
  Atalho de contato para telas estreitas, onde o botão "Agendar" do cabeçalho
  não cabe. Aparece depois da abertura e some quando o rodapé chega, para não
  ficar sobreposto aos contatos que já estão lá.
*/
export function SiteChrome() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const passedHero = window.scrollY > window.innerHeight * 0.9;
      const footer = document.getElementById("contato");
      const footerReached = footer
        ? footer.getBoundingClientRect().top < window.innerHeight * 0.85
        : false;
      setVisible(passedHero && !footerReached);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <a
      href={waLink(DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar pelo WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-30 flex h-[3.1rem] w-[3.1rem] items-center justify-center rounded-full bg-latao text-carvao shadow-[0_10px_28px_rgba(0,0,0,0.42)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-[3px] sm:hidden ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-90 opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
