import { WhatsAppButton } from "../WhatsAppButton";
import { WhatsAppIcon, InstagramIcon } from "../icons";
import { useSectionMotion } from "../../lib/useSectionMotion";
import type { MotionScope } from "../../lib/useSectionMotion";
import { gsap, EASE, revealLines } from "../../lib/motion";
import {
  ADDRESS,
  HOURS,
  HOME_SERVICE_NOTE,
  MAPS_URL,
  MAPS_EMBED_SRC,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  WHATSAPP_DISPLAY,
  waLink,
  DEFAULT_WA_MESSAGE,
  BUSINESS_NAME,
} from "../../data/site";

function reveal({ q1, q }: MotionScope, withParallax: boolean) {
  const claim = q1("[data-claim]");
  const cta = q1("[data-cta]");
  const blocks = q("[data-block]");
  const image = q1("[data-bg-img]");
  const band = q1("[data-band]");

  if (claim) {
    revealLines(claim, {
      duration: 1.1,
      stagger: 0.09,
      scrollTrigger: { trigger: claim, start: "top 80%" },
    });
  }

  if (cta) {
    gsap.from(cta, {
      y: 20,
      opacity: 0,
      duration: 0.85,
      ease: EASE,
      scrollTrigger: { trigger: cta, start: "top 92%" },
    });
  }

  if (blocks.length) {
    gsap.from(blocks, {
      y: 22,
      opacity: 0,
      duration: 0.8,
      ease: EASE,
      stagger: 0.09,
      scrollTrigger: { trigger: blocks[0], start: "top 88%" },
    });
  }

  if (withParallax && image && band) {
    gsap.fromTo(
      image,
      { yPercent: -7, scale: 1.08 },
      {
        yPercent: 7,
        scale: 1.14,
        ease: "none",
        scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: 0.8 },
      },
    );
  }
}

const contactDesktop = (scope: MotionScope) => reveal(scope, true);
const contactLight = (scope: MotionScope) => reveal(scope, false);

export function Contact() {
  const ref = useSectionMotion<HTMLElement>({
    desktop: contactDesktop,
    light: contactLight,
  });

  return (
    <footer ref={ref} id="contato" className="relative bg-carvao">
      {/* Faixa de chamada com a fachada ao fundo */}
      <div
        data-band
        className="relative flex min-h-[78svh] items-end overflow-hidden lg:min-h-[86svh]"
      >
        <img
          data-bg-img
          src="/upload/fachada-dia.jpg"
          alt={`Entrada da ${BUSINESS_NAME}, na Alameda Campomar`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-carvao via-carvao/60 to-carvao/25"
        />

        <div className="relative z-10 mx-auto w-full max-w-[92rem] px-6 pb-16 pt-28 sm:px-10 sm:pb-20 lg:px-14 lg:pb-24">
          <h2
            data-claim
            className="max-w-[15ch] font-display text-[clamp(2.2rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.025em] text-osso"
          >
            Marque seu horário.
          </h2>
          <div data-cta className="mt-10">
            <WhatsAppButton href={waLink(DEFAULT_WA_MESSAGE)}>
              Agendar pelo WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>

      {/* Dados da casa e mapa */}
      <div className="mx-auto max-w-[92rem] px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div data-block className="lg:col-span-3">
            <h3 className="font-display text-[1.35rem] text-osso">Onde</h3>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-osso/70">
              {ADDRESS.line1}
              <br />
              {ADDRESS.line2}
              <br />
              <span className="text-osso/45">{ADDRESS.zip}</span>
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group/map relative mt-4 inline-block text-[0.88rem] text-latao focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Ver no mapa
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-100 bg-latao/40 transition-transform duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/map:origin-left group-hover/map:bg-latao" />
            </a>
          </div>

          <div data-block className="lg:col-span-3">
            <h3 className="font-display text-[1.35rem] text-osso">Quando</h3>
            <div className="mt-4 space-y-1.5 text-[0.98rem] text-osso/70">
              {HOURS.map((hour) => (
                <p key={hour.days}>
                  <span className="text-osso/90">{hour.days}</span>
                  <br />
                  {hour.time}
                </p>
              ))}
            </div>
            <p className="mt-4 text-[0.85rem] leading-relaxed text-osso/50">
              {HOME_SERVICE_NOTE}
            </p>
          </div>

          <div data-block className="lg:col-span-3">
            <h3 className="font-display text-[1.35rem] text-osso">Contato</h3>
            <p className="mt-4 text-[0.98rem] text-osso/70">{WHATSAPP_DISPLAY}</p>
            <div className="mt-5 flex items-center gap-5">
              <a
                href={waLink(DEFAULT_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar no WhatsApp"
                className="text-osso/65 transition-all duration-300 hover:-translate-y-0.5 hover:text-latao focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <WhatsAppIcon className="h-[1.4rem] w-[1.4rem]" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
                className="text-osso/65 transition-all duration-300 hover:-translate-y-0.5 hover:text-latao focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <InstagramIcon className="h-[1.4rem] w-[1.4rem]" />
              </a>
            </div>
          </div>

          <div data-block className="lg:col-span-3">
            <div className="relative aspect-[4/3] overflow-hidden border border-bronze/30 lg:aspect-[3/4]">
              <iframe
                title={`Mapa de localização da ${BUSINESS_NAME}`}
                src={MAPS_EMBED_SRC}
                className="absolute inset-0 h-full w-full"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <p className="mt-20 border-t border-bronze/25 pt-8 text-[0.82rem] text-osso/60">
          {BUSINESS_NAME} em Rio das Ostras/RJ, desde 2015
        </p>
      </div>
    </footer>
  );
}
