import type { ReactNode } from "react";
import { ArrowIcon, WhatsAppIcon } from "./icons";

type Variant = "solid" | "outline" | "quiet";

type WhatsAppButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Rótulo acessível quando o texto visível não basta sozinho. */
  ariaLabel?: string;
};

/*
  A microinteração é uma camada de cor que sobe de baixo para cima sob o texto,
  não um "hover: muda de cor". Feita com transform, então roda na GPU e não
  provoca recálculo de layout.
*/

/*
  Pressão: o botão afunda 2% rápido (100ms) e volta mais devagar (300ms),
  porque a duração ativa só vale enquanto o dedo está em cima.
*/
const SHELL =
  "group/btn relative inline-flex items-center overflow-hidden font-body text-[0.95rem] font-medium tracking-[0.005em] transition-[color,border-color,scale] duration-300 ease-brand active:scale-[0.98] active:duration-100 focus-visible:outline-2 focus-visible:outline-offset-[3px]";

const SWEEP =
  "pointer-events-none absolute inset-0 origin-bottom scale-y-0 transition-transform duration-300 ease-brand group-hover/btn:scale-y-100 group-focus-visible/btn:scale-y-100";

export function WhatsAppButton({
  href,
  children,
  variant = "solid",
  className = "",
  ariaLabel,
}: WhatsAppButtonProps) {
  if (variant === "quiet") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={`group/btn relative inline-flex items-center gap-2 font-body text-[0.82rem] text-latao transition-[color,opacity] duration-300 before:absolute before:-inset-x-3 before:-inset-y-3 before:content-[''] hover:text-osso active:opacity-70 active:duration-100 focus-visible:outline-2 focus-visible:outline-offset-4 ${className}`}
      >
        <WhatsAppIcon className="h-[0.95em] w-[0.95em] shrink-0 transition-transform duration-300 group-hover/btn:scale-110" />
        <span className="relative">
          {children}
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 ease-brand group-hover/btn:origin-left group-hover/btn:scale-x-100 group-focus-visible/btn:origin-left group-focus-visible/btn:scale-x-100" />
        </span>
      </a>
    );
  }

  const isSolid = variant === "solid";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`${SHELL} px-7 py-4 ${
        isSolid
          ? "bg-latao text-carvao hover:text-osso"
          : "border border-latao/60 text-osso hover:border-latao/90"
      } ${className}`}
    >
      <span aria-hidden="true" className={`${SWEEP} ${isSolid ? "bg-bordo" : "bg-bordo/45"}`} />
      {/*
        Rótulo e seta se movem só com transform: o rótulo recua para dentro do
        respiro da esquerda e a seta surge no respiro da direita. A largura do
        botão nunca muda, então nada ao redor se desloca no hover.
      */}
      <span className="relative flex items-center gap-2.5 transition-transform duration-300 ease-brand group-hover/btn:-translate-x-2 group-focus-visible/btn:-translate-x-2">
        <WhatsAppIcon className="h-[1.05em] w-[1.05em] shrink-0" />
        <span>{children}</span>
      </span>
      <ArrowIcon
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 top-1/2 h-[0.95em] w-[0.95em] -translate-x-1.5 -translate-y-1/2 opacity-0 transition-[translate,opacity] duration-300 ease-brand group-hover/btn:translate-x-0 group-hover/btn:opacity-100 group-focus-visible/btn:translate-x-0 group-focus-visible/btn:opacity-100"
      />
    </a>
  );
}
