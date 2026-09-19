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

const SHELL =
  "group/btn relative inline-flex items-center gap-2.5 overflow-hidden font-body text-[0.95rem] font-medium tracking-[0.005em] transition-colors duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-[3px]";

const SWEEP =
  "pointer-events-none absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:scale-y-100 group-focus-visible/btn:scale-y-100";

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
        className={`group/btn inline-flex items-center gap-2 font-body text-[0.82rem] text-latao transition-colors duration-300 hover:text-osso focus-visible:outline-2 focus-visible:outline-offset-4 ${className}`}
      >
        <WhatsAppIcon className="h-[0.95em] w-[0.95em] shrink-0 transition-transform duration-300 group-hover/btn:scale-110" />
        <span className="relative">
          {children}
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:origin-left group-hover/btn:scale-x-100 group-focus-visible/btn:origin-left group-focus-visible/btn:scale-x-100" />
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
      <WhatsAppIcon className="relative h-[1.05em] w-[1.05em] shrink-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:-translate-y-px" />
      <span className="relative">{children}</span>
      {/*
        A seta não ocupa espaço em repouso: a largura abre no hover e ela
        desliza para dentro. O rótulo continua sendo o que se lê.
      */}
      <span
        aria-hidden="true"
        className="relative inline-flex w-0 justify-end overflow-hidden opacity-0 transition-[width,opacity] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:w-[1.15em] group-hover/btn:opacity-100 group-focus-visible/btn:w-[1.15em] group-focus-visible/btn:opacity-100"
      >
        <ArrowIcon className="h-[0.95em] w-[0.95em] shrink-0 -translate-x-2 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0 group-focus-visible/btn:translate-x-0" />
      </span>
    </a>
  );
}
