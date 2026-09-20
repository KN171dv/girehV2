import { useState } from "react";
import { SERVICES, formatPrice, serviceMessage } from "../../data/services";
import { waLink } from "../../data/site";
import { WhatsAppButton } from "../WhatsAppButton";
import { useSectionMotion } from "../../lib/useSectionMotion";
import type { MotionScope } from "../../lib/useSectionMotion";
import { gsap, EASE, EASE_WIPE, DUR, RISE, revealLines } from "../../lib/motion";

function reveal({ q1, q }: MotionScope, withParallax: boolean) {
  const heading = q1("[data-heading]");
  const rows = q("[data-row]");
  const panel = q1("[data-panel]");

  if (heading) {
    revealLines(heading, {
      scrollTrigger: { trigger: heading, start: "top 82%" },
    });
  }

  if (rows.length) {
    gsap.from(rows, {
      y: RISE,
      opacity: 0,
      duration: DUR.settle,
      ease: EASE,
      stagger: 0.07,
      scrollTrigger: { trigger: rows[0], start: "top 88%" },
    });
  }

  if (panel) {
    gsap.from(panel, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: DUR.wipe,
      ease: EASE_WIPE,
      scrollTrigger: { trigger: panel, start: "top 85%" },
    });

    // Sem parallax nas imagens do painel: a troca entre serviços já tem o
    // próprio movimento de escala em CSS, e o GSAP sobrescreveria transform.
    void withParallax;
  }
}

const menuDesktop = (scope: MotionScope) => reveal(scope, true);
const menuLight = (scope: MotionScope) => reveal(scope, false);

export function Menu() {
  const ref = useSectionMotion<HTMLElement>({ desktop: menuDesktop, light: menuLight });
  const [active, setActive] = useState(0);

  return (
    <section
      ref={ref}
      id="servicos"
      className="seam-top relative overflow-hidden bg-carvao py-20 sm:py-32 lg:py-36 [--seam-from:var(--color-grafite)]"
    >
      <div className="mx-auto max-w-[92rem] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Painel de imagem: acompanha a leitura da lista no desktop */}
          <div className="hidden lg:col-span-5 lg:block lg:self-start">
            <div className="sticky top-28">
              <div data-panel className="relative aspect-[4/5] overflow-hidden">
                {SERVICES.map((service, index) => (
                  <img
                    key={service.id}
                    src={service.photo}
                    alt={`Resultado do serviço ${service.name} na Gireh Barber Shop`}
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full object-cover transition-[opacity,scale] duration-500 ease-brand lg:will-change-transform ${
                      index === active
                        ? "scale-100 opacity-100"
                        : "scale-105 opacity-0"
                    }`}
                  />
                ))}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-carvao/40 to-transparent"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="marker mb-6">
              O menu
            </p>
            <h2
              data-heading
              className="max-w-[16ch] font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.06] tracking-[-0.02em] text-osso"
            >
              Cinco serviços, sem letra miúda.
            </h2>
            <p className="mt-5 max-w-[42ch] text-[1.02rem] leading-relaxed text-osso/70">
              Escolha o serviço e agende direto pelo WhatsApp. A mensagem já vai
              com o serviço escrito.
            </p>

            <ul className="mt-12 border-t border-bronze/35">
              {SERVICES.map((service, index) => (
                <li
                  key={service.id}
                  data-row
                  onMouseEnter={() => setActive(index)}
                  onFocusCapture={() => setActive(index)}
                  className="group/row relative border-b border-bronze/35"
                >
                  {/* Fio que se desenha da esquerda no hover, sobre a divisória. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-latao transition-transform duration-300 ease-brand group-hover/row:scale-x-100 group-focus-within/row:scale-x-100"
                  />

                  {/* Faixa de imagem no mobile: a foto é composição, não miniatura */}
                  <div className="relative mt-6 aspect-[16/9] overflow-hidden md:aspect-[21/9] lg:hidden">
                    <img
                      src={service.photo}
                      alt={`Resultado do serviço ${service.name} na Gireh Barber Shop`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-carvao/55 to-transparent"
                    />
                  </div>

                  <div className="flex items-baseline gap-4 pb-6 pt-5 sm:gap-6 lg:py-7">
                    <span className="marker mt-1 w-7 shrink-0 transition-[color,translate] duration-300 ease-brand group-hover/row:text-latao lg:group-hover/row:translate-x-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1 transition-transform duration-300 ease-brand lg:group-hover/row:translate-x-2">
                      <h3 className="font-display text-[1.5rem] leading-tight text-osso transition-colors duration-300 group-hover/row:text-latao sm:text-[1.75rem] lg:text-[2rem]">
                        {service.name}
                      </h3>
                      <p className="mt-2 max-w-[40ch] text-[0.95rem] leading-relaxed text-osso/70">
                        {service.note}
                      </p>
                      <div className="mt-3 flex items-center gap-5">
                        <span className="marker">
                          {service.duration}
                        </span>
                        <WhatsAppButton
                          variant="quiet"
                          href={waLink(serviceMessage(service))}
                          ariaLabel={`Agendar ${service.name} pelo WhatsApp`}
                        >
                          {service.cta}
                        </WhatsAppButton>
                      </div>
                    </div>

                    <span className="shrink-0 font-display text-[1.5rem] tabular-nums text-latao transition-transform duration-300 ease-brand sm:text-[1.75rem] lg:text-[2rem] lg:group-hover/row:-translate-x-1">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
