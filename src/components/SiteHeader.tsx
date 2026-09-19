import { useEffect, useRef, useState } from "react";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { scrollToSection } from "../lib/motion";
import {
  DEFAULT_WA_MESSAGE,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  waLink,
} from "../data/site";

const LINKS = [
  { id: "casa", label: "A casa" },
  { id: "servicos", label: "Serviços" },
  { id: "profissionais", label: "Profissionais" },
  { id: "contato", label: "Contato" },
];

export function SiteHeader() {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setCondensed(window.scrollY > window.innerHeight * 0.6);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll do corpo enquanto o menu está aberto e devolve no fecho.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    // Espera o menu destravar o scroll antes de mover a página.
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-500 ease-out ${
          condensed
            ? "border-b border-bronze/30 bg-carvao/85 py-3 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-6"
        }`}
      >
        {/* Véu superior: mantém marca e menu legíveis sobre a foto clara da fachada. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-carvao/75 to-transparent transition-opacity duration-500 ${
            condensed ? "opacity-0" : "opacity-100"
          }`}
        />

        <div className="relative mx-auto flex max-w-[92rem] items-center justify-between gap-6 px-6 sm:px-10 lg:px-14">
          <button
            type="button"
            onClick={() => go("topo")}
            className="font-display text-[1.4rem] leading-none text-osso transition-opacity duration-300 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Gireh
          </button>

          <nav className="hidden items-center gap-9 lg:flex">
            {LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className="group/nav relative py-1 font-body text-[0.9rem] text-osso/75 transition-colors duration-300 hover:text-osso focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {link.label}
                <span className="absolute -bottom-px left-0 h-px w-full origin-right scale-x-0 bg-latao transition-transform duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/nav:origin-left group-hover/nav:scale-x-100" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta relative hidden overflow-hidden border border-latao/60 px-5 py-2.5 font-body text-[0.85rem] text-osso transition-colors duration-300 hover:border-latao/90 focus-visible:outline-2 focus-visible:outline-offset-[3px] sm:inline-flex sm:items-center sm:gap-2"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-bordo/45 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:scale-y-100"
              />
              <WhatsAppIcon className="relative h-[1em] w-[1em]" />
              <span className="relative">Agendar</span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              className="flex h-10 w-10 items-center justify-center lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="relative block h-[9px] w-6">
                <span
                  className={`absolute left-0 block h-px w-full bg-osso transition-all duration-300 ease-out ${
                    menuOpen ? "top-1 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-osso transition-all duration-300 ease-out ${
                    menuOpen ? "top-1 -rotate-45" : "top-2"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Painel de menu mobile */}
      <div
        id="menu-mobile"
        ref={panelRef}
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 bg-carvao transition-opacity duration-500 ease-out lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28 sm:px-10">
          <nav className="flex flex-col">
            {LINKS.map((link, index) => (
              <button
                key={link.id}
                type="button"
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => go(link.id)}
                style={{ transitionDelay: menuOpen ? `${120 + index * 70}ms` : "0ms" }}
                className={`border-b border-bronze/25 py-5 text-left font-display text-[2rem] leading-tight text-osso transition-all duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 ${
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div
            style={{ transitionDelay: menuOpen ? "400ms" : "0ms" }}
            className={`transition-all duration-500 ease-out ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <a
              href={waLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={menuOpen ? 0 : -1}
              className="flex items-center justify-center gap-2.5 bg-latao px-6 py-4 font-body text-[0.95rem] font-medium text-carvao"
            >
              <WhatsAppIcon className="h-[1.05em] w-[1.05em]" />
              Agendar pelo WhatsApp
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={menuOpen ? 0 : -1}
              className="mt-5 inline-flex items-center gap-2.5 text-[0.9rem] text-osso/70 transition-colors hover:text-latao"
            >
              <InstagramIcon className="h-5 w-5" />
              {INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
