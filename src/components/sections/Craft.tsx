import { useSectionMotion } from "../../lib/useSectionMotion";
import type { MotionScope } from "../../lib/useSectionMotion";
import { gsap, EASE, EASE_WIPE, DUR, RISE, revealLines } from "../../lib/motion";

function reveal({ q1, q }: MotionScope, withParallax: boolean) {
  const heading = q1("[data-heading]");
  const body = q("[data-body]");
  const frames = q("[data-frame]");

  if (heading) {
    revealLines(heading, {
      scrollTrigger: { trigger: heading, start: "top 82%" },
    });
  }

  if (body.length) {
    gsap.from(body, {
      y: RISE,
      opacity: 0,
      duration: DUR.settle,
      ease: EASE,
      stagger: 0.09,
      scrollTrigger: { trigger: body[0], start: "top 85%" },
    });
  }

  frames.forEach((frame, index) => {
    gsap.from(frame, {
      clipPath: index === 0 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
      duration: DUR.wipe,
      ease: EASE_WIPE,
      scrollTrigger: { trigger: frame, start: "top 88%" },
    });

    if (!withParallax) return;

    // Camadas em velocidades diferentes: a de trás anda menos que a da frente.
    const img = frame.querySelector<HTMLElement>("img");
    if (!img) return;
    const depth = index === 0 ? 5 : 8;
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
      className="seam-top relative overflow-hidden bg-grafite py-20 sm:py-32 lg:py-36 [--seam-from:var(--color-carvao)]"
    >
      <div className="mx-auto max-w-[92rem] px-6 sm:px-10 lg:px-14">
        {/*
          Composição editorial: uma placa vertical grande domina a cena, o texto
          respira à direita e um recorte menor cruza a placa por baixo, em outra
          profundidade.

          A sobreposição de verdade só existe a partir de xl (1280px), onde há
          espaço de sobra para ela. Abaixo disso a mesma hierarquia vira
          sequência vertical: cada foto com o seu espaço, deslocadas na
          horizontal para manter a profundidade, sem uma cortar a outra. O corte
          era em lg (1024px), largura de tablet em paisagem e de celular em
          "modo site para computador", onde a sobreposição lia como colisão.
        */}
        <div className="relative xl:min-h-[46rem]">
          <p data-body className="marker xl:absolute xl:left-0 xl:top-0">
            O ofício
          </p>

          <figure
            data-frame
            className="relative mt-8 aspect-[3/4] overflow-hidden sm:aspect-[4/5] md:aspect-[5/4] md:w-[84%] xl:absolute xl:left-0 xl:top-14 xl:mt-0 xl:aspect-auto xl:h-[42rem] xl:w-[41%]"
          >
            <img
              src="/img/exemplo3.jpg"
              alt="Detalhe de corte com risco feito à navalha na Gireh Barber Shop"
              loading="lazy"
              className="absolute inset-0 h-[114%] w-full object-cover object-[55%_35%] lg:will-change-transform"
            />
            {/* Véu curto no topo: a legenda cai sobre a parte clara da foto e
                precisa de um chão tonal, não de uma caixa. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-carvao/80 to-transparent"
            />
            <figcaption className="marker absolute left-4 top-4 text-osso/80">
              Risco à navalha
            </figcaption>
          </figure>

          <div className="mt-12 xl:absolute xl:right-0 xl:top-20 xl:mt-0 xl:w-[44%]">
            <h2
              data-heading
              className="max-w-[13ch] font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.06] tracking-[-0.02em] text-osso"
            >
              O ofício, feito devagar.
            </h2>

            <div className="mt-8 max-w-[44ch] space-y-5 text-[1.02rem] leading-relaxed text-osso/75">
              <p data-body>
                Um bom corte começa antes da máquina encostar: na conversa, no
                formato do rosto e no jeito que o cabelo cresce.
              </p>
              <p data-body>
                Depois vêm o desenho, a barba e o acabamento. Cada etapa no seu
                tempo, sem atropelar a seguinte.
              </p>
            </div>

            <dl data-body className="mt-12 flex gap-8 border-t border-bronze/30 pt-6 sm:gap-12">
              <div>
                <dt className="marker">Atendimento</dt>
                <dd className="mt-2 font-display text-[1.35rem] leading-none text-osso sm:text-[1.6rem]">
                  Hora marcada
                </dd>
              </div>
              <div>
                <dt className="marker">Também</dt>
                <dd className="mt-2 font-display text-[1.35rem] leading-none text-osso sm:text-[1.6rem]">
                  A domicílio
                </dd>
              </div>
            </dl>
          </div>

          {/*
            Recorte de fecho, com três composições próprias.

            Em tela estreita ele é uma faixa larga que sangra até a borda
            direita e fecha a seção: cheia de imagem, sem cunha vazia ao lado.
            Antes ele era um quadrado de 64% encostado à direita, que era a
            placa do desktop encolhida — deixava um vazio morto à esquerda e
            fazia o vão até a próxima seção parecer o dobro do que é.

            De md a lg ele recolhe para 46% alinhado à direita, deslocado da
            placa grande na horizontal. Só a partir de xl passa por cima dela,
            e só aí existe a borda na cor da seção: o respiro entre camadas
            existe onde há cruzamento, nunca como moldura.
          */}
          <figure
            data-frame
            className="relative z-10 -mr-6 mt-10 aspect-[16/10] overflow-hidden sm:-mr-10 md:ml-auto md:mr-0 md:mt-12 md:aspect-[4/3] md:w-[46%] xl:absolute xl:bottom-10 xl:left-[24%] xl:m-0 xl:aspect-auto xl:h-[16rem] xl:w-[28%] xl:border-[10px] xl:border-grafite xl:shadow-[0_34px_80px_-34px_rgba(0,0,0,0.85)]"
          >
            <img
              src="/img/exemplo1.jpg"
              alt="Barbeiro finalizando um degradê no salão da Gireh Barber Shop"
              loading="lazy"
              className="absolute inset-0 h-[128%] w-full object-cover object-[58%_46%] md:object-[60%_40%] lg:will-change-transform"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
