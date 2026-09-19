import { useEffect, useState } from "react";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { scrollToSection } from "../lib/motion";
import {
  DEFAULT_WA_MESSAGE,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  waLink,
} from "../data/site";

// Cada item aponta para uma seção que existe de verdade na página.
const LINKS = [
  { id: "oficio", label: "O ofício" },
  { id: "servicos", label: "O menu" },
  { id: "profissionais", label: "Profissionais" },
  { id: "galeria", label: "Galeria" },
  { id: "contato", label: "Contato" },
];

export function SiteHeader() {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Um marcador a 60% da abertura: quando ele sai por cima, a barra condensa.
  // O navegador avisa a mudança; nada roda a cada quadro de scroll.
  useEffect(() => {
    const sentinel = document.querySelector('[data-sentinel="header"]');
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => {
      setCondensed(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
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
      {/*
        A barra tem altura fixa. Condensar é só: o fundo aparece por opacidade,
        o conteúdo sobe 12px e a marca encolhe por escala. Nenhuma propriedade
        de layout é animada.
      */}
      <header className="fixed inset-x-0 top-0 z-50 py-3">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 border-b border-bronze/30 bg-carvao/85 transition-opacity duration-400 ease-brand ${
            condensed ? "opacity-100 backdrop-blur-md" : "opacity-0"
          }`}
        />
        {/* Véu superior: mantém marca e menu legíveis sobre a foto clara da fachada. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-carvao/75 to-transparent transition-opacity duration-400 ${
            condensed ? "opacity-0" : "opacity-100"
          }`}
        />

        <div
          className={`relative mx-auto flex max-w-[92rem] items-center justify-between gap-6 px-6 transition-transform duration-400 ease-brand sm:px-10 lg:px-14 ${
            condensed ? "translate-y-0" : "translate-y-3"
          }`}
        >
          <button
            type="button"
            onClick={() => go("topo")}
            aria-label="Gireh Barber Shop, voltar ao topo"
            className="block shrink-0 transition-opacity duration-300 hover:opacity-80 active:opacity-60 active:duration-100 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <img
              src="/img/logo-transparente.png"
              alt="Gireh Barber Shop"
              width={461}
              height={315}
              className={`h-11 w-auto origin-left transition-[scale] duration-400 ease-brand sm:h-14 ${
                condensed ? "scale-[0.78]" : "scale-100"
              }`}
            />
          </button>

          <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
            {LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className="group/nav relative py-1 font-body text-[0.9rem] text-osso/75 transition-colors duration-300 hover:text-osso focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {link.label}
                <span className="absolute -bottom-px left-0 h-px w-full origin-right scale-x-0 bg-latao transition-transform duration-300 ease-brand group-hover/nav:origin-left group-hover/nav:scale-x-100" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta relative hidden overflow-hidden border border-latao/60 px-5 py-2.5 font-body text-[0.85rem] text-osso transition-[border-color,scale] duration-300 ease-brand hover:border-latao/90 active:scale-[0.97] active:duration-100 focus-visible:outline-2 focus-visible:outline-offset-[3px] sm:inline-flex sm:items-center sm:gap-2"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-bordo/45 transition-transform duration-300 ease-brand group-hover/cta:scale-y-100"
              />
              <WhatsAppIcon className="relative h-[1em] w-[1em]" />
              <span className="relative">Agendar horário</span>
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
                  className={`absolute left-0 top-0 block h-px w-full bg-osso transition-[translate,rotate] duration-300 ease-brand ${
                    menuOpen ? "translate-y-[4px] rotate-45" : "translate-y-0 rotate-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 block h-px w-full bg-osso transition-[translate,rotate] duration-300 ease-brand ${
                    menuOpen ? "-translate-y-[4px] -rotate-45" : "translate-y-0 rotate-0"
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
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 bg-carvao transition-opacity duration-300 ease-brand lg:hidden ${
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
                style={{ transitionDelay: menuOpen ? `${60 + index * 40}ms` : "0ms" }}
                className={`border-b border-bronze/25 py-5 text-left font-display text-[2rem] leading-tight text-osso transition-[translate,opacity] duration-300 ease-brand active:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 ${
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div
            style={{ transitionDelay: menuOpen ? "240ms" : "0ms" }}
            className={`transition-[translate,opacity] duration-300 ease-brand ${
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
              Agendar horário
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
