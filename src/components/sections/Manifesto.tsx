import { useSectionMotion } from "../../lib/useSectionMotion";
import type { MotionScope } from "../../lib/useSectionMotion";
import { gsap, EASE, revealLines } from "../../lib/motion";

function reveal({ root, q1, q }: MotionScope, withParallax: boolean) {
  const statement = q1("[data-statement]");
  const note = q("[data-note]");
  const figure = q1("[data-figure]");
  const image = q1("[data-figure-img]");

  if (statement) {
    revealLines(statement, {
      duration: 1.1,
      stagger: 0.08,
      scrollTrigger: { trigger: statement, start: "top 78%" },
    });
  }

  if (note.length) {
    gsap.from(note, {
      y: 22,
      opacity: 0,
      duration: 0.9,
      ease: EASE,
      stagger: 0.1,
      scrollTrigger: { trigger: note[0], start: "top 85%" },
    });
  }

  if (figure) {
    gsap.from(figure, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 1.3,
      ease: "power3.inOut",
      scrollTrigger: { trigger: figure, start: "top 82%" },
    });
  }

  // O parallax só existe onde ele é seguro: a imagem sobe mais devagar que a página.
  if (withParallax && image) {
    gsap.fromTo(
      image,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: figure ?? root, start: "top bottom", end: "bottom top", scrub: 0.8 },
      },
    );
  }
}

const manifestoDesktop = (scope: MotionScope) => reveal(scope, true);
const manifestoLight = (scope: MotionScope) => reveal(scope, false);

export function Manifesto() {
  const ref = useSectionMotion<HTMLElement>({
    desktop: manifestoDesktop,
    light: manifestoLight,
  });

  return (
    <section
      ref={ref}
      id="casa"
      className="relative overflow-hidden bg-carvao py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[92rem] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p
              data-statement
              className="max-w-[20ch] font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.14] tracking-[-0.015em] text-osso"
            >
              Aqui, corte é medida. Cada cabeça tem um caimento e um jeito de
              cair, e o trabalho começa lendo isso.
            </p>

            <div className="mt-14 max-w-[52ch] space-y-5 text-[1.02rem] leading-relaxed text-osso/70">
              <p data-note>
                Não trabalhamos por volume. Trabalhamos com hora marcada, no
                ritmo de quem senta na cadeira, com a mesma exigência de um
                alfaiate diante de um corte de tecido.
              </p>
              <p data-note>
                É por isso que boa parte dos nossos clientes chega por indicação
                direta de quem já confia no serviço.
              </p>
            </div>

            {/* Assinatura da casa: a marca e o ano como uma peça só. */}
            <div
              data-note
              className="mt-14 flex items-center gap-6 border-t border-bronze/30 pt-8"
            >
              <img
                src="/img/logo-transparente.png"
                alt=""
                aria-hidden="true"
                width={461}
                height={315}
                className="h-12 w-auto opacity-90 sm:h-14"
              />
              <div className="border-l border-bronze/40 pl-6">
                <p className="marker">Desde</p>
                <p className="mt-1.5 font-display text-[1.9rem] leading-none text-latao sm:text-[2.2rem]">
                  2015
                </p>
              </div>
              <p className="marker ml-auto hidden text-right sm:block">
                Rio das Ostras
                <br />
                <span className="marker-accent">RJ</span>
              </p>
            </div>
          </div>

          {/* A imagem sangra pela borda direita: composição, não cartão. */}
          <div className="lg:col-span-5">
            <figure
              data-figure
              className="relative -mr-6 aspect-[4/5] overflow-hidden sm:-mr-10 lg:-mr-14 lg:aspect-[3/4]"
            >
              <img
                data-figure-img
                src="/img/exemplo2.jpg"
                alt="Cliente da Gireh Barber Shop após corte e barba, de perfil"
                loading="lazy"
                className="absolute inset-0 h-[116%] w-full object-cover object-center will-change-transform"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-carvao/55 via-transparent to-transparent"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
