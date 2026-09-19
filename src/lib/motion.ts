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

/*
  Tokens de movimento. Toda animação do site sai daqui, para que nenhuma
  seção invente seu próprio tempo.

  - enter: revelação de conteúdo ao entrar na tela (primário).
  - settle: segundo plano de uma revelação (texto de apoio, selo).
  - wipe: máscara de imagem abrindo.
  - hero: o único gesto longo, a abertura da página.
*/
export const DUR = {
  settle: 0.7,
  enter: 0.9,
  wipe: 0.95,
  hero: 1.25,
} as const;

export const EASE = "power3.out";
export const EASE_SOFT = "power2.out";
export const EASE_WIPE = "power3.inOut";

/** Amplitude máxima de deslocamento para textos e blocos que entram. */
export const RISE = 16;

let lenis: Lenis | null = null;

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ---------------------------------------------------------------------------
   Âncora de leitura

   Quando a media query do desktop vira (janela redimensionada cruzando 1024px),
   o ScrollTrigger desfaz e refaz todos os gatilhos. Nesse caminho ele se
   considera "revertido", não registra a posição do scroll, rola para 0 para
   medir e não tem para onde voltar: a pessoa perdia o lugar e caía no topo.

   Guardamos a posição em termos de conteúdo (qual bloco está no topo e quanto
   dele já passou), não em pixels, porque o espaçador do pin some abaixo de
   1024px e muda a altura da página. Depois da virada, restauramos por ela.
--------------------------------------------------------------------------- */

type Anchor = { el: Element; progress: number };
let anchor: Anchor | null = null;
let pendingRestore = false;
let lastDesktop: boolean | null = null;

/** O bloco que ocupa espaço no fluxo: o espaçador do pin, quando existe. */
function flowBox(el: Element): Element {
  const parent = el.parentElement;
  return parent && parent.classList.contains("pin-spacer") ? parent : el;
}

function blocks(): Element[] {
  const main = document.querySelector("main");
  if (!main) return [];
  return Array.from(main.children).map((child) =>
    child.classList.contains("pin-spacer") && child.firstElementChild
      ? child.firstElementChild
      : child,
  );
}

function measureAnchor(): void {
  for (const el of blocks()) {
    const rect = flowBox(el).getBoundingClientRect();
    if (rect.bottom > 1) {
      const progress = rect.height > 0 ? Math.min(1, Math.max(0, -rect.top / rect.height)) : 0;
      anchor = { el, progress };
      return;
    }
  }
}

function restoreAnchor(): void {
  if (!anchor || !anchor.el.isConnected) return;
  const rect = flowBox(anchor.el).getBoundingClientRect();
  const y = Math.max(0, Math.round(rect.top + window.scrollY + anchor.progress * rect.height));
  if (lenis) {
    lenis.scrollTo(y, { immediate: true, force: true });
  } else {
    window.scrollTo(0, y);
  }
  ScrollTrigger.update();
}

let anchorGuardInstalled = false;

function installAnchorGuard(): void {
  if (anchorGuardInstalled) return;
  anchorGuardInstalled = true;

  const desktopQuery = window.matchMedia(MQ.desktop);
  lastDesktop = desktopQuery.matches;

  // A âncora é atualizada quando o scroll para, não a cada quadro.
  ScrollTrigger.addEventListener("scrollEnd", measureAnchor);

  ScrollTrigger.addEventListener("refreshInit", () => {
    const now = desktopQuery.matches;
    if (lastDesktop !== null && now !== lastDesktop) pendingRestore = true;
    lastDesktop = now;
  });

  ScrollTrigger.addEventListener("refresh", () => {
    if (!pendingRestore) return;
    pendingRestore = false;
    // Um quadro depois, com o layout novo já assentado.
    requestAnimationFrame(restoreAnchor);
  });

  measureAnchor();
}

/**
 * Liga o Lenis só enquanto a media query do desktop valer, e o desliga quando
 * ela deixa de valer. Em touch e abaixo de 1024px o scroll é 100% nativo.
 */
export function initSmoothScroll(): () => void {
  installAnchorGuard();

  const mm = gsap.matchMedia();

  mm.add(MQ.desktop, () => {
    const instance = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
    });
    lenis = instance;

    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.off("scroll", onScroll);
      instance.destroy();
      if (lenis === instance) lenis = null;
    };
  });

  ScrollTrigger.refresh();

  return () => mm.revert();
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
        duration: DUR.enter,
        ease: EASE,
        stagger: 0.07,
        ...vars,
      }),
  });
}

export { gsap, ScrollTrigger, SplitText };
