import { StarIcon } from "../icons";
import { GOOGLE_RATING } from "../../data/site";
import { useSectionMotion } from "../../lib/useSectionMotion";
import type { MotionScope } from "../../lib/useSectionMotion";
import { gsap, EASE, revealLines } from "../../lib/motion";

function reveal({ q1 }: MotionScope) {
  const quote = q1("[data-quote]");
  const badge = q1("[data-badge]");
  const rule = q1("[data-rule]");

  if (quote) {
    revealLines(quote, {
      duration: 1.15,
      stagger: 0.1,
      scrollTrigger: { trigger: quote, start: "top 80%" },
    });
  }

  if (rule) {
    gsap.from(rule, {
      scaleX: 0,
      duration: 1.1,
      ease: "power3.inOut",
      transformOrigin: "left",
      scrollTrigger: { trigger: rule, start: "top 90%" },
    });
  }

  if (badge) {
    gsap.from(badge, {
      y: 18,
      opacity: 0,
      duration: 0.8,
      ease: EASE,
      scrollTrigger: { trigger: badge, start: "top 92%" },
    });
  }
}

export function Trust() {
  const ref = useSectionMotion<HTMLElement>({ desktop: reveal, light: reveal });

  return (
    <section ref={ref} className="seam-top relative overflow-hidden bg-grafite py-24 sm:py-32 lg:py-40 [--seam-from:var(--color-carvao)]">
      <div className="mx-auto max-w-[92rem] px-6 sm:px-10 lg:px-14">
        <span
          data-rule
          aria-hidden="true"
          className="block h-px w-full max-w-[38rem] bg-gradient-to-r from-latao/70 to-transparent"
        />

        <blockquote
          data-quote
          className="mt-12 max-w-[24ch] font-display text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.1] tracking-[-0.02em] text-osso"
        >
          A confiança de quem já veio é o que traz quem vem depois.
        </blockquote>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-8">
          <p className="max-w-[40ch] text-[1.02rem] leading-relaxed text-osso/70">
            Grande parte dos agendamentos da casa começa com uma indicação
            direta, de cliente para cliente.
          </p>

          <a
            data-badge
            href={GOOGLE_RATING.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/badge inline-flex items-center gap-3.5 border border-bronze/40 px-5 py-3.5 text-osso/85 transition-colors duration-300 hover:border-latao/70 focus-visible:outline-2 focus-visible:outline-offset-[3px]"
          >
            <span className="flex items-center gap-1 text-latao">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover/badge:-translate-y-0.5"
                  style={{ transitionDelay: `${index * 40}ms` }}
                />
              ))}
            </span>
            <span className="text-[0.88rem]">
              {GOOGLE_RATING.score} no Google, {GOOGLE_RATING.reviews} avaliações
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
