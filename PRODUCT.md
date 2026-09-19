# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React + TypeScript, Tailwind CSS v4 (via `@tailwindcss/vite`), shadcn/ui for components, framer-motion + gsap + lenis for motion. Explicit user choice, set up before any design work began.

## Users

Primary: high-standard professional clients (advogados, donos de clínica) referred to Gireh Barber Shop by a business partner who already serves that clientele. They arrive pre-warmed by a trusted referral, not cold. Their job on the site: confirm in seconds that the barbershop matches their standard, then book an appointment via WhatsApp, optionally choosing a specific barber.

Secondary: general premium clientele in Rio das Ostras/RJ evaluating the barbershop directly.

## Product Purpose

Marketing and booking site for a real, physical premium barbershop, Gireh Barber Shop, in Rio das Ostras/RJ, operating for 11 years. The site exists to convert high-value referred visitors into booked WhatsApp appointments. Success is a WhatsApp booking message sent, optionally addressed to a specific barber.

## Positioning

11 years of real, established local operation, a live referral network among local professionals, four named barbers each individually chosen and booked rather than anonymously assigned, and an at-home service option. A newer or more anonymous competitor in the same town could not truthfully claim this combination.

## Operating Context

Physical shop at Alameda Campomar, 49, Cidade Praiana, Rio das Ostras/RJ, 28890-281. Hours: Monday to Saturday, 09:00 to 20:00; closed Sunday. Also offers at-home service ("atendimento a domicílio"), mentioned discreetly near the hours or WhatsApp contact, not as its own section.

Booking happens exclusively through one WhatsApp number, (22) 99836-7510, shared by all four barbers. Each barber gets an individual booking link to that same number, with a message pre-filled naming that barber (e.g. "Olá! Gostaria de agendar com o Yuri").

## Capabilities and Constraints

Services and confirmed prices:
- Corte Masculino, R$35, 30 min
- Barba, R$25, 20 min
- Corte + Barba, R$55, 50 min
- Sobrancelha, R$15, 15 min
- Acabamento, R$10, 10 min

Four barbers, each individually bookable: Yuri, Ithalo, Yago, Carlos.

Booking entry points, all to the same WhatsApp number with a pre-written message:
- Per service (added 2026-09-18): each of the five services has its own action, and the message names the service, e.g. "Olá! Gostaria de agendar Corte + Barba na Gireh Barber Shop."
- Per barber: the message names the professional, e.g. "Olá! Gostaria de agendar com o Yuri."
- General: the hero, the fixed header, the closing call to action, and a floating shortcut on narrow screens.

Instagram: @girehbarber, confirmed real and active. Shown as a discreet icon next to the WhatsApp icon in the final section and in the footer, not embedded as a feed and not its own section.

Google rating: 4.9 stars, 69 reviews, real data. Shown as a discreet badge inside the "quem confia" social proof section, alongside testimonials, not as a separate stats section.

## Brand Commitments

Name: Gireh Barber Shop / Barbearia Gireh.

Creative direction already interviewed and approved with the user before this record; recorded here as binding, not re-opened during design work:

- Concept: "alfaiataria capilar," corte com rigor de alfaiate. Discreet precision built on a tailoring-atelier metaphor, deliberately avoiding generic "preto e dourado" luxury cliché and vintage-Americana barbershop tropes.
- Palette: carvão-azulado #14161C (base), grafite #1E212B (surface), latão escovado #B08D4F (primary accent), bronze escuro #6B4E2E (borders and depth), bordô #5B1F2A (secondary accent, non-text only), osso #EDE6D6 (light neutral, text on dark).
- Typography direction: a high-contrast, sharply cut serif for display and headlines, used sparingly; a precise geometric-humanist sans for body and UI.
- Motion rule (revised 2026-09-18, superseding the earlier "one hero moment only" rule at the client's explicit direction): scroll is part of the experience. Scroll-driven composition is wanted, not avoided. The binding constraints are now about platform and restraint, not about quantity:
  - Desktop with a fine pointer: Lenis smooths the wheel, and GSAP ScrollTrigger drives parallax at differing layer speeds, scale drift, masked line reveals, and exactly one pinned horizontal section (the gallery).
  - Touch devices: no pinning, no scroll-scrubbed transforms, no smooth-scroll hijacking. Native scroll only, with one-shot reveals. Stability on touch outranks visual parity with desktop.
  - `prefers-reduced-motion`: no motion at all, and nothing hidden; the layout must read as finished with every animation removed.
  - Still excluded: the prior heavy scroll-video sequence, and scattered per-element fades used as a substitute for composition.
- Home structure, revised 2026-09-18 to eight sections in order: Abertura (hero), Manifesto ("A casa"), O ofício, O menu (serviços), Os profissionais, Galeria ("O trabalho, de perto"), Quem confia, Contato e rodapé. A fixed header with anchor navigation and a mobile menu panel sits above all of them.

The full design system built from these constraints belongs in DESIGN.md, not here.

## Evidence on Hand

- Real photos of the storefront, salon, and barbers at work: not yet provided. Do not fabricate photography that pretends to be real; use clearly marked placeholders until real files arrive.
- Real testimonial quotes: not yet provided. Do not invent quotes attributed to real clients; build the social proof section so real quotes can drop in, and flag this gap rather than filling it with fabricated text.
- Confirmed real data in hand: full price table, four barber names, WhatsApp number, full address, hours, at-home service note, Google rating (4.9 stars, 69 reviews), Instagram handle.

## Product Principles

- The visitor is already pre-warmed by a trusted referral, not being cold-sold; copy and pacing should assume confidence, not persuasion from zero.
- Choosing a specific barber is a real functional need, not a decorative team grid; each barber must be individually bookable.
- Every claim on the site is backed by real evidence on hand. Nothing is fabricated, from testimonials to photography to statistics.
- WhatsApp is the single conversion channel; every relevant touchpoint should lead there without friction.
- Brand voice is understated confidence, not visible luxury signaling; this shapes what the copy says and omits, not only how it looks.

## Accessibility & Inclusion

WCAG AA contrast is a hard requirement, not a target.

- Bordô (#5B1F2A) must never be used as text color. It is reserved for borders, dividers, and hover backgrounds. Measured contrast against both dark surfaces is roughly 1.3:1 to 1.4:1, far below AA.
- Latão (#B08D4F) may be used as text only over the dark surfaces, carvão or grafite. Measured contrast is 5.83:1 over carvão and 5.18:1 over grafite, both AA passes for normal text. Latão must never be used as text over the light osso background, where contrast measures 2.50:1 and fails. Text over osso must be carvão or grafite.
- Non-text UI elements, including icons, must maintain at least 3:1 contrast against their background per WCAG 1.4.11.
- Motion must respect `prefers-reduced-motion`.
