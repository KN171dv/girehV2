import { WhatsAppButton } from "../WhatsAppButton";
import { useSectionMotion } from "../../lib/useSectionMotion";
import type { MotionScope } from "../../lib/useSectionMotion";
import { gsap, EASE, EASE_SOFT, DUR, RISE, revealLines, scrollToSection } from "../../lib/motion";
import {
  waLink,
  DEFAULT_WA_MESSAGE,
  BUSINESS_NAME,
  POSITIONING,
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
    tl.from(media, { scale: 1.1, opacity: 0.6, duration: DUR.hero, ease: EASE_SOFT }, 0);
  }
  if (headline) {
    revealLines(headline, { duration: 1, delay: 0.15 });
  }
  if (rule) {
    tl.from(rule, { scaleY: 0, duration: DUR.settle, transformOrigin: "top" }, 0.4);
  }
  if (after.length) {
    tl.from(after, { y: RISE, opacity: 0, duration: DUR.settle, stagger: 0.07 }, 0.5);
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
        scale: 1.1,
        yPercent: 6,
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
      {/* Marcadores para os observadores do cabeçalho e do atalho de WhatsApp. */}
      <span data-sentinel="header" aria-hidden="true" className="pointer-events-none absolute left-0 top-[60svh] h-px w-px" />
      <span data-sentinel="fab" aria-hidden="true" className="pointer-events-none absolute left-0 top-[90svh] h-px w-px" />

      <div data-hero-media className="absolute inset-0 overflow-hidden">
        <img
          data-hero-image
          src="/img/fachada.jpg"
          alt={`Fachada da ${BUSINESS_NAME}, em Rio das Ostras`}
          fetchPriority="high"
          className="h-full w-full object-cover object-[20%_50%] lg:will-change-transform sm:object-[28%_40%]"
        />
      </div>

      {/* Camadas de profundidade: base tonal, véu que escurece no scroll, vinheta lateral. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-carvao via-carvao/45 to-carvao/5"
      />
      {/* Sombra lateral: firma o lado do texto sobre a fachada e apaga o brilho
          do letreiro de neon atrás da linha de abertura. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,22,28,0.86)_0%,rgba(20,22,28,0.5)_38%,transparent_70%)]"
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
            <p data-hero-after className="marker mb-5">
              Barbearia em Rio das Ostras
            </p>

            <h1
              data-hero-headline
              className="font-display text-[clamp(3.5rem,11vw,9rem)] leading-[0.9] tracking-[-0.03em] text-osso"
            >
              Gireh
            </h1>
            <p data-hero-after className="marker marker-accent mt-4 !tracking-[0.34em]">
              Barber Shop
            </p>

            <div className="mt-10 flex items-start gap-6">
              <span
                data-hero-rule
                aria-hidden="true"
                className="mt-1 hidden h-16 w-px shrink-0 bg-gradient-to-b from-latao to-transparent sm:block"
              />
              <div>
                <p
                  data-hero-after
                  className="max-w-[20ch] font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-osso"
                >
                  {POSITIONING}
                </p>
                <p
                  data-hero-after
                  className="mt-4 max-w-[36ch] text-[1rem] leading-relaxed text-osso/75"
                >
                  Agende pelo WhatsApp e escolha com quem você quer cortar.
                </p>

                <div data-hero-after className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <WhatsAppButton href={waLink(DEFAULT_WA_MESSAGE)}>
                    Agendar horário
                  </WhatsAppButton>

                  <button
                    type="button"
                    onClick={() => scrollToSection("servicos")}
                    className="group/link relative font-body text-[0.92rem] text-osso/80 transition-colors duration-300 hover:text-osso focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    Ver serviços e preços
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-latao transition-transform duration-300 ease-brand group-hover/link:origin-left group-hover/link:scale-x-100" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Elementos secundários discretos, na voz pequena da marca. */}
          <div
            data-hero-after
            className="flex flex-wrap gap-x-10 gap-y-5 lg:col-span-4 lg:flex-col lg:items-end lg:gap-5 lg:text-right"
          >
            <p className="marker leading-[1.8]">
              {ADDRESS.line1}
              <br />
              <span className="text-osso/70">Cidade Praiana</span>
            </p>
            <p className="marker leading-[1.8]">
              {HOURS[0].days}
              <br />
              <span className="text-osso/70">{HOURS[0].time}</span>
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
