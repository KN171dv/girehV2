import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import { gsap, MQ, ScrollTrigger } from "./motion";

export type MotionScope = {
  /** Elemento raiz da seção. */
  root: HTMLElement;
  /** Busca elementos dentro da seção. */
  q: <T extends HTMLElement = HTMLElement>(selector: string) => T[];
  /** Primeiro elemento correspondente, ou null. */
  q1: <T extends HTMLElement = HTMLElement>(selector: string) => T | null;
};

type Build = (scope: MotionScope) => void;

type Options = {
  /** Efeitos completos: parallax, scrub, pin. Só rodam em desktop com mouse. */
  desktop?: Build;
  /** Efeitos leves: revelações disparadas uma vez. Rodam em mobile e em desktop touch. */
  light?: Build;
};

/**
 * Prende o movimento de uma seção ao seu elemento raiz, separando desktop de
 * touch e revertendo tudo (inclusive os estilos inline que o GSAP escreve)
 * quando o componente sai ou a media query deixa de valer.
 *
 * Nada aqui roda sob prefers-reduced-motion: o layout já nasce visível no CSS,
 * então a ausência de movimento nunca esconde conteúdo.
 */
export function useSectionMotion<T extends HTMLElement = HTMLElement>({
  desktop,
  light,
}: Options): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const makeScope = (): MotionScope => ({
      root,
      q: <E extends HTMLElement = HTMLElement>(selector: string) =>
        Array.from(root.querySelectorAll<E>(selector)),
      q1: <E extends HTMLElement = HTMLElement>(selector: string) =>
        root.querySelector<E>(selector),
    });

    const mm = gsap.matchMedia();

    if (desktop) {
      mm.add(MQ.desktop, () => {
        desktop(makeScope());
      });
    }

    if (light) {
      mm.add(MQ.mobile, () => {
        light(makeScope());
      });
      // Tablets e telas largas com toque: mesmo tratamento leve do mobile.
      mm.add(MQ.touchWide, () => {
        light(makeScope());
      });
    }

    ScrollTrigger.refresh();

    return () => {
      mm.revert();
    };
  }, [desktop, light]);

  return ref;
}
