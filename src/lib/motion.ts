import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

/*
  Sistema de movimento do site.

  Regra central: desktop e mobile são plataformas diferentes, não a mesma coisa
  em tamanhos diferentes.

  - Desktop (ponteiro fino, >= 1024px): scroll suavizado por Lenis, parallax e
    transformações ligadas ao progresso do scroll (scrub), uma seção com pin.
  - Mobile / touch: scroll nativo, sem Lenis, sem scrub, sem pin. Só revelações
    disparadas uma única vez, que são transformações CSS baratas e não competem
    com o scroll do sistema.
  - prefers-reduced-motion: nada se move e nada fica escondido.
*/

export const MQ = {
  desktop: "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
  touchWide: "(min-width: 1024px) and (pointer: coarse) and (prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
} as const;

export const EASE = "power3.out";
export const EASE_SOFT = "power2.out";

let lenis: Lenis | null = null;

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isSmoothScrollEligible(): boolean {
  return (
    window.matchMedia("(min-width: 1024px)").matches &&
    window.matchMedia("(pointer: fine)").matches &&
    !prefersReducedMotion()
  );
}

/**
 * Liga o Lenis apenas onde ele é seguro (desktop com mouse) e o sincroniza com
 * o ScrollTrigger. Em touch o scroll continua 100% nativo.
 */
export function initSmoothScroll(): () => void {
  if (!isSmoothScrollEligible()) {
    ScrollTrigger.refresh();
    return () => {};
  }

  lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 1,
  });

  const onScroll = () => ScrollTrigger.update();
  lenis.on("scroll", onScroll);

  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.refresh();

  return () => {
    gsap.ticker.remove(tick);
    lenis?.off("scroll", onScroll);
    lenis?.destroy();
    lenis = null;
  };
}

/** Rolagem até uma âncora, usando Lenis quando ele existe e o scroll nativo quando não. */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { offset: -8, duration: 1.1 });
    return;
  }

  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

/**
 * Revelação linha a linha: cada linha sobe de dentro de uma máscara.
 *
 * `autoSplit` refaz a quebra quando as fontes terminam de carregar ou o
 * elemento muda de largura, e o retorno de `onSplit` é descartado junto, então
 * a linha nunca quebra no lugar errado nem fica presa no estado inicial.
 *
 * A animação é sempre `from`: o estado final é o estado natural do CSS.
 */
export function revealLines(
  el: HTMLElement,
  vars: gsap.TweenVars = {},
): SplitText {
  return SplitText.create(el, {
    type: "lines",
    mask: "lines",
    linesClass: "reveal-line",
    autoSplit: true,
    onSplit: (self) =>
      gsap.from(self.lines, {
        yPercent: 108,
        duration: 1.05,
        ease: EASE,
        stagger: 0.085,
        ...vars,
      }),
  });
}

export { gsap, ScrollTrigger, SplitText };
