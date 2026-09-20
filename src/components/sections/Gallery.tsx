import { useSectionMotion } from "../../lib/useSectionMotion";
import type { MotionScope } from "../../lib/useSectionMotion";
import { gsap, ScrollTrigger, EASE, DUR, RISE } from "../../lib/motion";

type Shot = {
  src: string;
  alt: string;
  caption: string;
  /** Largura do painel na faixa, por classe utilitária (mobile e tablet). */
  width: string;
  /** Altura da foto no desktop, limitada pela altura da tela. */
  lgHeight: string;
  aspect: string;
  offset?: string;
};

const SHOTS: Shot[] = [
  {
    src: "/img/corte-masculino.jpg",
    lgHeight: "lg:h-[min(34.6vw,52svh)]",
    alt: "Corte masculino finalizado, visto de trás",
    caption: "Corte",
    width: "w-[74vw] sm:w-[46vw] lg:w-auto",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/img/detalhe-navalha.jpg",
    lgHeight: "lg:h-[min(18vw,28svh)]",
    alt: "Mãos de barbeiro segurando navalha e tesoura",
    caption: "Navalha",
    width: "w-[52vw] sm:w-[32vw] lg:w-auto",
    aspect: "aspect-[7/8]",
    offset: "lg:translate-y-16",
  },
  {
    src: "/img/exemplo2.jpg",
    lgHeight: "lg:h-[min(35vw,54svh)]",
    alt: "Cliente de perfil após corte e barba",
    caption: "Na cadeira",
    width: "w-[74vw] sm:w-[46vw] lg:w-auto",
    aspect: "aspect-[3/4.4]",
  },
  {
    src: "/img/detalhe-ferramentas.jpg",
    lgHeight: "lg:h-[min(18vw,28svh)]",
    alt: "Bancada de trabalho com tesouras, pentes e pincéis",
    caption: "A bancada",
    width: "w-[84vw] sm:w-[56vw] lg:w-auto",
    aspect: "aspect-[16/9]",
    offset: "lg:-translate-y-10",
  },
  {
    src: "/img/corte-barba.jpg",
    lgHeight: "lg:h-[min(30.6vw,46svh)]",
    alt: "Cliente de perfil, com corte e barba feitos",
    caption: "Corte e barba",
    width: "w-[74vw] sm:w-[46vw] lg:w-auto",
    aspect: "aspect-[3/4]",
    offset: "lg:translate-y-10",
  },
  {
    src: "/img/acabamento.jpg",
    lgHeight: "lg:h-[min(33vw,50svh)]",
    alt: "Acabamento de corte na nuca, finalizado",
    caption: "Acabamento",
    width: "w-[74vw] sm:w-[46vw] lg:w-auto",
    aspect: "aspect-[3/4]",
    offset: "lg:-translate-y-6",
  },
];

/*
  Desktop: a faixa corre na horizontal enquanto o palco fica preso na tela.

  O "preso" é CSS sticky, feito pelo próprio navegador: a seção ganha a altura
  do percurso e o palco interno gruda no topo. O GSAP só move a faixa.

  Isto substitui o pin do ScrollTrigger, que trocava a seção entre posição
  normal e fixed, inseria um espaçador no DOM e gerava CLS de ~1,0 a cada
  entrada e saída. Sem pin não há troca de posição, espaçador nem salto.
*/
function galleryDesktop({ root, q1 }: MotionScope) {
  const track = q1("[data-track]");
  const heading = q1("[data-gallery-heading]");
  if (!track) return;

  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);
  const setHeight = () => {
    root.style.height = `${window.innerHeight + distance()}px`;
  };
  setHeight();
  // Toda remedição (resize, fontes, imagens) recalcula a altura antes de medir.
  ScrollTrigger.addEventListener("refreshInit", setHeight);

  gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  if (heading) {
    gsap.from(heading, {
      y: RISE,
      opacity: 0,
      duration: DUR.settle,
      ease: EASE,
      scrollTrigger: { trigger: root, start: "top 70%" },
    });
  }

  // A faixa só mede certo depois das imagens carregarem.
  const images = Array.from(track.querySelectorAll("img"));
  let pending = images.filter((img) => !img.complete).length;
  if (pending > 0) {
    const done = () => {
      pending -= 1;
      if (pending <= 0) ScrollTrigger.refresh();
    };
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
    });
  }

  // Ao sair do desktop, a seção volta à altura natural do fluxo.
  return () => {
    ScrollTrigger.removeEventListener("refreshInit", setHeight);
    root.style.height = "";
  };
}

/* Touch: nada preso, nenhum scrub. O deslize horizontal é o nativo do sistema. */
function galleryLight({ q }: MotionScope) {
  const panels = q("[data-shot]");
  if (!panels.length) return;
  gsap.from(panels, {
    y: RISE,
    opacity: 0,
    duration: DUR.settle,
    ease: EASE,
    stagger: 0.06,
    scrollTrigger: { trigger: panels[0], start: "top 90%" },
  });
}

export function Gallery() {
  const ref = useSectionMotion<HTMLElement>({
    desktop: galleryDesktop,
    light: galleryLight,
  });

  return (
    <section
      ref={ref}
      id="galeria"
      aria-labelledby="galeria-titulo"
      className="seam-top relative bg-carvao py-20 sm:py-28 lg:py-0 [--seam-from:var(--color-grafite)]"
    >
      <div
        data-stage
        className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:pt-20"
      >
        <div
          data-gallery-heading
          className="mx-auto mb-10 w-full max-w-[92rem] px-6 sm:px-10 lg:mb-10 lg:px-14"
        >
          <p className="marker mb-5">
            Galeria
          </p>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2
              id="galeria-titulo"
              className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-tight tracking-[-0.02em] text-osso"
            >
              O trabalho, de perto.
            </h2>
            <p className="marker hidden lg:block">Role para percorrer</p>
            <p className="marker lg:hidden">Arraste para o lado</p>
          </div>
        </div>

        {/* Mobile: rolagem horizontal nativa com encaixe. Desktop: faixa movida pelo scroll. */}
        <div className="w-full overflow-x-auto overscroll-x-contain pb-4 [-webkit-overflow-scrolling:touch] scrollbar-none lg:overflow-visible lg:pb-0">
          <div
            data-track
            className="flex snap-x snap-mandatory items-center gap-4 px-6 sm:gap-6 sm:px-10 lg:snap-none lg:gap-8 lg:px-14 lg:will-change-transform"
          >
            {SHOTS.map((shot) => (
              <figure
                key={shot.src}
                data-shot
                className={`group/shot relative shrink-0 snap-center ${shot.width} ${shot.offset ?? ""}`}
              >
                <div className={`relative overflow-hidden ${shot.aspect} ${shot.lgHeight} lg:w-auto`}>
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-brand group-hover/shot:scale-[1.02]"
                  />
                </div>
                <figcaption className="marker mt-3">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
