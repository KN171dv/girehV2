---
version: 1
slug: "src-pages-home-tsx"
primary_target: "src/pages/Home.tsx"
related_targets: []
---

# Home surface brief

Scope: single home route, six sections, one-page site. Mode: Persuade (a referred, high-standard visitor decides the barbershop matches their level and books via WhatsApp).

Audience: professionals (advogados, donos de clínica) referred by a trusted business partner, already warm, evaluating fit in seconds. Job: confirm quality and precision, choose a barber, book via WhatsApp.

Proof/content on hand: real price table (5 services), 4 named barbers, address, hours, WhatsApp number, Google rating 4.9 stars / 69 reviews, Instagram handle. Missing: real photography (placeholders required, clearly marked) and real testimonial quotes (do not fabricate; build the slot honestly).

Constraints: WCAG AA contrast is a hard requirement, including the specific bordô/latão/osso rules recorded in PRODUCT.md. Motion is restrained: Lenis for scroll physics only, GSAP for exactly one hero moment, no per-section scroll choreography.

## Direction contract

THESIS: The barbershop as a tailoring atelier, precision and restraint standing in for visible luxury. Refuses the generic "preto e dourado" barbershop-luxury template and vintage-Americana barber-pole tropes.

OWN-WORLD: Palette: carvão-azulado #14161C (base), grafite #1E212B (surface), latão escovado #B08D4F (accent, text-safe only on the two dark surfaces), bronze escuro #6B4E2E (borders, depth), bordô #5B1F2A (secondary accent, non-text only), osso #EDE6D6 (light neutral, text on dark). Type: Libre Caslon Display for headlines, sparingly, at large sizes, chosen for its legal-document and engraved-plate lineage that ties directly to the referred professional audience; Archivo for body and UI, a precise grotesk standing in for the tailor's exactness. Motion: Lenis handles scroll physics only, imperceptible as a feature; GSAP is spent on exactly one moment, the hero settling into place on load.

STORY: A referred visitor lands, confirms in one glance this matches their standard, learns the house's 11 years of credibility, reads the exact service menu and prices, chooses a specific barber by name and working style, sees real trust signals, and closes with exact address, hours, and a WhatsApp message ready to send.

FIRST VIEWPORT: Full-bleed real photo of the shop or a barber at work (placeholder marked pending real files), a dark tonal overlay tuned so osso text clears AA contrast, one direct headline set in Libre Caslon Display, one supporting line, and the primary WhatsApp CTA. The single GSAP moment is the photo and headline settling into place on load, no scroll-triggered sequence.

FORM: User- and brief-pinned direction, settled across several explicit interview and approval rounds before this skill was invoked. Per "the brief wins" and "a user- or brief-pinned direction beats the roll, always," the concept-seed dice roll is skipped; no seed key applies.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
