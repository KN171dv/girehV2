import { WhatsAppButton } from "../WhatsAppButton";
import { useSectionMotion } from "../../lib/useSectionMotion";
import type { MotionScope } from "../../lib/useSectionMotion";
import { gsap, EASE, EASE_SOFT, revealLines, scrollToSection } from "../../lib/motion";
import {
  waLink,
  DEFAULT_WA_MESSAGE,
  BUSINESS_NAME,
  ADDRESS,
  HOURS,
} from "../../data/site";

/* Entrada: a foto se assenta, as linhas do título sobem de dentro da máscara,
   os elementos secundários chegam depois. Um gesto só, encadeado. */
function entrance({ q1, q }: MotionScope) {
  // A entrada anima o invólucro; o scroll anima a imagem. Separar as camadas
  // evita que as duas animações disputem a mesma propriedade de transformação.
  const media = q1("[data-hero-media]");
  const headline = q1("[data-hero-headline]");
  const after = q("[data-hero-after]");
  const rule = q1("[data-hero-rule]");

  const tl = gsap.timeline({ defaults: { ease: EASE } });

  if (media) {
    tl.from(media, { scale: 1.16, opacity: 0.55, duration: 1.9, ease: EASE_SOFT }, 0);
  }
  if (headline) {
    revealLines(headline, { duration: 1.15, stagger: 0.09, delay: 0.25 });
  }
  if (rule) {
    tl.from(rule, { scaleY: 0, duration: 0.9, transformOrigin: "top" }, 0.5);
  }
  if (after.length) {
    tl.from(after, { y: 18, opacity: 0, duration: 0.85, stagger: 0.09 }, 0.75);
  }
}

/* Desktop: ao sair da abertura, a foto continua abrindo e o conteúdo recua.
   A composição se transforma durante o scroll em vez de só subir. */
function heroDesktop(scope: MotionScope) {
  entrance(scope);

  const { root, q1 } = scope;
  const image = q1("[data-hero-image]");
  const content = q1("[data-hero-content]");
  const veil = q1("[data-hero-veil]");
  const cue = q1("[data-hero-cue]");

  if (image) {
    gsap.fromTo(
      image,
      { scale: 1, yPercent: 0 },
      {
        scale: 1.16,
        yPercent: 7,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
      },
    );
  }

  if (content) {
    gsap.fromTo(
      content,
      { yPercent: 0, opacity: 1 },
      {
        yPercent: -14,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
      },
    );
  }

  if (veil) {
    gsap.to(veil, {
      opacity: 0.85,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
    });
  }

  if (cue) {
    gsap.to(cue, {
      opacity: 0,
      duration: 0.4,
      scrollTrigger: { trigger: root, start: "top+=80 top", toggleActions: "play none none reverse" },
    });
  }
}

/* Touch: só a entrada. Nenhuma transformação presa ao progresso do scroll. */
function heroLight(scope: MotionScope) {
  entrance(scope);
}

export function Hero() {
  const ref = useSectionMotion<HTMLElement>({ desktop: heroDesktop, light: heroLight });

  return (
    <section
      ref={ref}
      id="topo"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-carvao"
    >
      <div data-hero-media className="absolute inset-0 overflow-hidden">
        <img
          data-hero-image
          src="/upload/fachada.png"
          alt={`Fachada da ${BUSINESS_NAME}, em Rio das Ostras`}
          fetchPriority="high"
          className="h-full w-full object-cover object-[28%_18%] will-change-transform sm:object-[center_28%]"
        />
      </div>

      {/* Camadas de profundidade: base tonal, véu que escurece no scroll, vinheta lateral. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-carvao via-carvao/45 to-carvao/5"
      />
      <div
        data-hero-veil
        aria-hidden="true"
        className="absolute inset-0 bg-carvao/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_15%,transparent_35%,rgba(20,22,28,0.55)_100%)]"
      />

      <div
        data-hero-content
        className="relative z-10 mx-auto w-full max-w-[92rem] px-6 pb-14 pt-32 sm:px-10 sm:pb-20 lg:px-14 lg:pb-24"
      >
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <h1
              data-hero-headline
              className="max-w-[16ch] font-display text-[clamp(2.75rem,8.5vw,6.5rem)] leading-[0.98] tracking-[-0.02em] text-osso"
            >
              Corte com rigor de alfaiate.
            </h1>

            <div className="mt-9 flex items-start gap-6">
              <span
                data-hero-rule
                aria-hidden="true"
                className="mt-1 hidden h-16 w-px shrink-0 bg-gradient-to-b from-latao to-transparent sm:block"
              />
              <div>
                <p
                  data-hero-after
                  className="max-w-[38ch] text-[1.02rem] leading-relaxed text-osso/85 sm:text-[1.1rem]"
                >
                  Onze anos de precisão discreta em Rio das Ostras, para quem já
                  entende o valor de um bom acabamento.
                </p>

                <div data-hero-after className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <WhatsAppButton href={waLink(DEFAULT_WA_MESSAGE)}>
                    Agendar pelo WhatsApp
                  </WhatsAppButton>

                  <button
                    type="button"
                    onClick={() => scrollToSection("servicos")}
                    className="group/link relative font-body text-[0.92rem] text-osso/80 transition-colors duration-300 hover:text-osso focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    Ver serviços e preços
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-latao transition-transform duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:origin-left group-hover/link:scale-x-100" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Elementos secundários discretos, alinhados à direita no desktop. */}
          <div
            data-hero-after
            className="flex gap-10 text-[0.82rem] leading-relaxed text-osso/55 lg:col-span-4 lg:flex-col lg:items-end lg:gap-4 lg:text-right"
          >
            <p>
              {ADDRESS.line1}
              <br />
              {ADDRESS.line2}
            </p>
            <p>
              {HOURS[0].days}
              <br />
              {HOURS[0].time}
            </p>
          </div>
        </div>
      </div>

      {/* Indicação de rolagem: um fio com um segmento que desce, sem seta saltando. */}
      <div
        data-hero-cue
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 hidden h-20 w-px -translate-x-1/2 overflow-hidden bg-osso/15 lg:block"
      >
        <span className="absolute inset-x-0 top-0 h-8 animate-cue bg-gradient-to-b from-transparent via-latao to-transparent" />
      </div>
    </section>
  );
}
