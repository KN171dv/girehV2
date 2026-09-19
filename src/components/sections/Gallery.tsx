import { useSectionMotion } from "../../lib/useSectionMotion";
import type { MotionScope } from "../../lib/useSectionMotion";
import { gsap, EASE, ScrollTrigger } from "../../lib/motion";

type Shot = {
  src: string;
  alt: string;
  caption: string;
  /** Largura do painel na faixa, por classe utilitária. */
  width: string;
  aspect: string;
  offset?: string;
};

const SHOTS: Shot[] = [
  {
    src: "/img/corte-masculino.jpg",
    alt: "Degradê masculino finalizado na Gireh Barber Shop",
    caption: "Degradê",
    width: "w-[74vw] sm:w-[46vw] lg:w-[26vw]",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/img/detalhe-navalha.jpg",
    alt: "Mãos de barbeiro segurando navalha e tesoura",
    caption: "Navalha e tesoura",
    width: "w-[52vw] sm:w-[32vw] lg:w-[16vw]",
    aspect: "aspect-[7/8]",
    offset: "lg:translate-y-16",
  },
  {
    src: "/img/exemplo2.jpg",
    alt: "Cliente de perfil após corte e barba",
    caption: "Corte e barba",
    width: "w-[74vw] sm:w-[46vw] lg:w-[24vw]",
    aspect: "aspect-[3/4.4]",
  },
  {
    src: "/img/detalhe-ferramentas.jpg",
    alt: "Bancada de trabalho com tesouras, pentes e pincéis",
    caption: "A bancada",
    width: "w-[84vw] sm:w-[56vw] lg:w-[32vw]",
    aspect: "aspect-[16/9]",
    offset: "lg:-translate-y-10",
  },
  {
    src: "/img/corte-barba.jpg",
    alt: "Cliente com corte degradê e barba alinhada",
    caption: "Alinhamento",
    width: "w-[74vw] sm:w-[46vw] lg:w-[23vw]",
    aspect: "aspect-[3/4]",
    offset: "lg:translate-y-10",
  },
  {
    src: "/img/acabamento.jpg",
    alt: "Acabamento de corte na nuca, finalizado",
    caption: "Acabamento",
    width: "w-[74vw] sm:w-[46vw] lg:w-[25vw]",
    aspect: "aspect-[3/4]",
    offset: "lg:-translate-y-6",
  },
];

/* Desktop: a seção prende na tela e a faixa corre na horizontal conforme o
   scroll avança. É o único pin do site, e ele não existe no mobile. */
function galleryDesktop({ root, q1 }: MotionScope) {
  const track = q1("[data-track]");
  const heading = q1("[data-gallery-heading]");
  if (!track) return;

  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);

  gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  if (heading) {
    gsap.from(heading, {
      y: 24,
      opacity: 0,
      duration: 0.9,
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
}

/* Touch: nenhum pin, nenhum scrub. O deslize horizontal é o nativo do sistema. */
function galleryLight({ q }: MotionScope) {
  const panels = q("[data-shot]");
  if (!panels.length) return;
  gsap.from(panels, {
    y: 22,
    opacity: 0,
    duration: 0.7,
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
      className="seam-top relative overflow-hidden bg-carvao py-24 sm:py-28 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0 [--seam-from:var(--color-grafite)]"
    >
      <div
        data-gallery-heading
        className="mx-auto mb-10 w-full max-w-[92rem] px-6 sm:px-10 lg:mb-14 lg:px-14"
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
          <p className="marker hidden lg:block">Arraste ou role</p>
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
              <div className={`relative overflow-hidden ${shot.aspect}`}>
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/shot:scale-[1.05]"
                />
              </div>
              <figcaption className="mt-3 text-[0.78rem] text-osso/45">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
