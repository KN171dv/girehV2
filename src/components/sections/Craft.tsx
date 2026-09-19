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
      id="oficio"
      className="seam-top relative overflow-hidden bg-grafite py-24 sm:py-32 lg:py-36 [--seam-from:var(--color-carvao)]"
    >
      <div className="mx-auto max-w-[92rem] px-6 sm:px-10 lg:px-14">
        {/*
          Composição editorial: uma placa vertical grande domina a cena, o texto
          respira à direita e um recorte menor cruza a placa por baixo, em outra
          profundidade. No mobile a mesma hierarquia vira empilhamento.
        */}
        <div className="relative lg:min-h-[46rem]">
          <p data-body className="marker lg:absolute lg:left-0 lg:top-0">
            O ofício
          </p>

          <figure
            data-frame
            className="relative mt-8 aspect-[3/4] overflow-hidden sm:aspect-[4/5] lg:absolute lg:left-0 lg:top-14 lg:mt-0 lg:aspect-auto lg:h-[42rem] lg:w-[41%]"
          >
            <img
              src="/img/exemplo3.jpg"
              alt="Detalhe de corte com risco feito à navalha na Gireh Barber Shop"
              loading="lazy"
              className="absolute inset-0 h-[114%] w-full object-cover object-[55%_35%] will-change-transform"
            />
            <figcaption className="marker absolute left-4 top-4 text-osso/70">
              Risco à navalha
            </figcaption>
          </figure>

          <div className="mt-12 lg:absolute lg:right-0 lg:top-20 lg:mt-0 lg:w-[44%]">
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

            <dl data-body className="mt-12 flex gap-12 border-t border-bronze/30 pt-6">
              <div>
                <dt className="marker">Na cadeira</dt>
                <dd className="mt-2 font-display text-[1.6rem] leading-none text-osso">
                  Hora marcada
                </dd>
              </div>
              <div>
                <dt className="marker">Acabamento</dt>
                <dd className="mt-2 font-display text-[1.6rem] leading-none text-osso">
                  Navalha
                </dd>
              </div>
            </dl>
          </div>

          {/*
            Recorte menor cruzando a placa grande. A borda na cor da seção abre
            um respiro entre as duas camadas, que é o que faz a sobreposição ser
            lida como decisão e não como colisão.
          */}
          <figure
            data-frame
            className="relative z-10 -mt-12 ml-auto aspect-square w-[64%] overflow-hidden border-[6px] border-grafite sm:w-[48%] lg:absolute lg:bottom-10 lg:left-[24%] lg:m-0 lg:aspect-auto lg:h-[16rem] lg:w-[28%] lg:border-[10px] lg:shadow-[0_34px_80px_-34px_rgba(0,0,0,0.85)]"
          >
            <img
              src="/img/exemplo1.jpg"
              alt="Barbeiro finalizando um degradê no salão da Gireh Barber Shop"
              loading="lazy"
              className="absolute inset-0 h-[128%] w-full object-cover object-[60%_40%] will-change-transform"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
