import { useSectionMotion } from "../../lib/useSectionMotion";
import type { MotionScope } from "../../lib/useSectionMotion";
import { gsap, EASE, revealLines } from "../../lib/motion";

function reveal({ q1, q }: MotionScope, withParallax: boolean) {
  const heading = q1("[data-heading]");
  const body = q("[data-body]");
  const frames = q("[data-frame]");

  if (heading) {
    revealLines(heading, {
      duration: 1,
      stagger: 0.08,
      scrollTrigger: { trigger: heading, start: "top 82%" },
    });
  }

  if (body.length) {
    gsap.from(body, {
      y: 20,
      opacity: 0,
      duration: 0.85,
      ease: EASE,
      stagger: 0.09,
      scrollTrigger: { trigger: body[0], start: "top 85%" },
    });
  }

  frames.forEach((frame, index) => {
    gsap.from(frame, {
      clipPath: index === 0 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
      duration: 1.25,
      ease: "power3.inOut",
      scrollTrigger: { trigger: frame, start: "top 88%" },
    });

    if (!withParallax) return;

    // Camadas em velocidades diferentes: a de trás anda menos que a da frente.
    const img = frame.querySelector<HTMLElement>("img");
    if (!img) return;
    const depth = index === 0 ? 6 : 11;
    gsap.fromTo(
      img,
      { yPercent: -depth },
      {
        yPercent: depth,
        ease: "none",
        scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.85 },
      },
    );
  });
}

const craftDesktop = (scope: MotionScope) => reveal(scope, true);
const craftLight = (scope: MotionScope) => reveal(scope, false);

export function Craft() {
  const ref = useSectionMotion<HTMLElement>({ desktop: craftDesktop, light: craftLight });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-grafite py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-[92rem] px-6 sm:px-10 lg:px-14">
        {/* No desktop a composição é uma cena: imagem de fundo, texto ao lado e
            uma segunda imagem cruzando por cima. No mobile tudo empilha. */}
        <div className="relative lg:min-h-[40rem]">
          <figure
            data-frame
            className="relative aspect-[4/5] overflow-hidden lg:absolute lg:left-0 lg:top-0 lg:h-[38rem] lg:w-[46%] lg:aspect-auto"
          >
            <img
              src="/upload/exemplo3.jpg"
              alt="Detalhe de corte com risco feito à navalha na Gireh Barber Shop"
              loading="lazy"
              className="absolute inset-0 h-[116%] w-full object-cover object-center will-change-transform"
            />
          </figure>

          <div className="mt-12 lg:absolute lg:right-0 lg:top-6 lg:mt-0 lg:w-[46%]">
            <h2
              data-heading
              className="max-w-[13ch] font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.06] tracking-[-0.02em] text-osso"
            >
              O ofício, feito devagar.
            </h2>

            <div className="mt-8 max-w-[44ch] space-y-5 text-[1.02rem] leading-relaxed text-osso/75">
              <p data-body>
                Desde 2015 a Gireh corta em Rio das Ostras com a mesma ideia:
                nada de pressa, nada por acaso. O corte é medido para a cabeça
                e para o estilo de quem senta na cadeira, não para o relógio.
              </p>
              <p data-body>
                Máquina, tesoura e navalha fazem parte do mesmo desenho. O
                acabamento é onde o trabalho aparece de verdade, e é onde a
                gente não abre mão.
              </p>
            </div>

            <p data-body className="mt-10 text-[0.82rem] text-osso/45">
              Rio das Ostras, desde 2015
            </p>
          </div>

          {/* Segunda imagem: cruza por cima da primeira e por baixo do texto. */}
          <figure
            data-frame
            className="relative z-10 mt-8 aspect-[5/4] overflow-hidden lg:absolute lg:bottom-0 lg:left-[30%] lg:mt-0 lg:aspect-auto lg:h-[19rem] lg:w-[40%] lg:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.75)]"
          >
            <img
              src="/upload/exemplo1.jpg"
              alt="Barbeiro finalizando um degradê no salão da Gireh Barber Shop"
              loading="lazy"
              className="absolute inset-0 h-[126%] w-full object-cover object-center will-change-transform"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
