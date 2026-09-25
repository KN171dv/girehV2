import { BARBERS } from "../../data/barbers";
import { waLink } from "../../data/site";
import { WhatsAppButton } from "../WhatsAppButton";
import { useSectionMotion } from "../../lib/useSectionMotion";
import type { MotionScope } from "../../lib/useSectionMotion";
import { gsap, EASE, EASE_WIPE, DUR, RISE, revealLines } from "../../lib/motion";

// Deslocamento vertical por coluna: quebra a grade uniforme de cartões.
const OFFSET = ["lg:mt-0", "lg:mt-20", "lg:mt-8", "lg:mt-28"];

function reveal({ q1, q }: MotionScope, withParallax: boolean) {
  const heading = q1("[data-heading]");
  const cards = q("[data-card]");

  if (heading) {
    revealLines(heading, {
      scrollTrigger: { trigger: heading, start: "top 82%" },
    });
  }

  cards.forEach((card, index) => {
    const frame = card.querySelector<HTMLElement>("[data-card-frame]");
    const text = card.querySelectorAll<HTMLElement>("[data-card-text]");

    if (frame) {
      gsap.from(frame, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: DUR.wipe,
        ease: EASE_WIPE,
        scrollTrigger: { trigger: card, start: "top 86%" },
      });
    }

    if (text.length) {
      gsap.from(text, {
        y: RISE,
        opacity: 0,
        duration: DUR.settle,
        ease: EASE,
        stagger: 0.07,
        scrollTrigger: { trigger: card, start: "top 84%" },
      });
    }

    if (!withParallax || !frame) return;

    // O parallax move o invólucro; o zoom de hover fica na imagem. Se os dois
    // escrevessem em transform, o GSAP apagaria o hover.
    const layer = frame.querySelector<HTMLElement>("[data-card-layer]");
    if (!layer) return;
    const depth = 4 + (index % 3) * 1.5;
    gsap.fromTo(
      layer,
      { yPercent: -depth },
      {
        yPercent: depth,
        ease: "none",
        scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.9 },
      },
    );
  });
}

const barbersDesktop = (scope: MotionScope) => reveal(scope, true);
const barbersLight = (scope: MotionScope) => reveal(scope, false);

export function Barbers() {
  const ref = useSectionMotion<HTMLElement>({
    desktop: barbersDesktop,
    light: barbersLight,
  });

  return (
    <section
      ref={ref}
      id="profissionais"
      className="seam-top relative overflow-hidden bg-grafite py-20 pb-16 sm:py-32 sm:pb-24 lg:py-36 lg:pb-24 [--seam-from:var(--color-carvao)]"
    >
      <div className="mx-auto max-w-[92rem] px-6 sm:px-10 lg:px-14">
        <div className="max-w-[46rem]">
          <p className="marker mb-6">
            Profissionais
          </p>
          <h2
            data-heading
            className="max-w-[18ch] font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.06] tracking-[-0.02em] text-osso"
          >
            Escolha com quem sentar na cadeira.
          </h2>
          <p className="mt-5 max-w-[42ch] text-[1.02rem] leading-relaxed text-osso/70">
            São quatro na casa. O agendamento vai direto para o nome que você
            escolher.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:items-start">
          {BARBERS.map((barber, index) => (
            <article key={barber.id} data-card className={`flex flex-col ${OFFSET[index] ?? ""}`}>
              <div
                data-card-frame
                className="group/photo relative aspect-[3/4] overflow-hidden"
              >
                <div
                  data-card-layer
                  className="absolute inset-0 h-[112%] w-full lg:will-change-transform"
                >
                  <img
                    src={barber.photo}
                    alt={`${barber.name}, barbeiro na Gireh Barber Shop, em Rio das Ostras`}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-transform duration-500 ease-brand group-hover/photo:scale-[1.02]"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-grafite/70 via-transparent to-transparent"
                />
              </div>

              <h3
                data-card-text
                className="mt-6 font-display text-[1.6rem] leading-none text-osso"
              >
                {barber.name}
              </h3>
              <div data-card-text className="mt-5">
                <WhatsAppButton
                  variant="outline"
                  href={waLink(`Olá! Gostaria de agendar com o ${barber.name}.`)}
                  ariaLabel={`Agendar com ${barber.name} pelo WhatsApp`}
                  className="w-full justify-center px-4 py-3 text-[0.85rem]"
                >
                  Agendar com {barber.name}
                </WhatsAppButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
