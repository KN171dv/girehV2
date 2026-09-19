---
name: Gireh Barber Shop
description: Alfaiataria capilar — a tailoring atelier's precision and restraint, in barbershop form.
colors:
  carvao: "#14161c"
  grafite: "#1e212b"
  latao: "#b08d4f"
  bronze: "#6b4e2e"
  bordo: "#5b1f2a"
  osso: "#ede6d6"
typography:
  display:
    fontFamily: "Libre Caslon Display, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(2.75rem, 8.5vw, 6.5rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  claim:
    fontFamily: "Libre Caslon Display, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(2.2rem, 6vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Libre Caslon Display, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(2rem, 4.4vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  statement:
    fontFamily: "Libre Caslon Display, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(1.9rem, 4.6vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  subhead:
    fontFamily: "Libre Caslon Display, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Libre Caslon Display, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title-sm:
    fontFamily: "Libre Caslon Display, Libre Caslon Text, Georgia, serif"
    fontSize: "1.35rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.5
  micro:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: "0px"
  full: "9999px"
spacing:
  section-y: "6rem"
  section-y-sm: "8rem"
  section-y-lg: "9rem"
  container-max: "92rem"
  container-x: "1.5rem"
  container-x-sm: "2.5rem"
  container-x-lg: "3.5rem"
components:
  button-solid:
    backgroundColor: "{colors.latao}"
    textColor: "{colors.carvao}"
    rounded: "{rounded.none}"
    padding: "16px 28px"
    typography: "{typography.body-sm}"
  button-solid-hover:
    backgroundColor: "{colors.bordo}"
    textColor: "{colors.osso}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.osso}"
    rounded: "{rounded.none}"
    padding: "16px 28px"
    typography: "{typography.body-sm}"
  button-outline-hover:
    backgroundColor: "{colors.bordo}"
    textColor: "{colors.osso}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.latao}"
    rounded: "{rounded.none}"
    padding: "0"
    typography: "{typography.micro}"
  button-quiet-hover:
    textColor: "{colors.osso}"
  header-cta:
    backgroundColor: "transparent"
    textColor: "{colors.osso}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  fab:
    backgroundColor: "{colors.latao}"
    textColor: "{colors.carvao}"
    rounded: "{rounded.full}"
    size: "3.1rem"
---

# Design System: Gireh Barber Shop

## Overview

**Creative North Star: "The Tailoring Atelier"**

Gireh's site reads like a bespoke suit's fitting room, not a barbershop marquee: a dark, tonal room built from two near-blacks (carvão and grafite), one warm brushed-metal accent (latão) spent sparingly, and a deep wine (bordô) that only ever arrives as a moving surface behind a label. The system refuses the generic "preto e dourado" barbershop-luxury cliché and vintage-Americana barber-pole tropes — no high-gloss gold, no pole motif, no ornamental flourish. Precision carries the premium signal: square corners everywhere, a single engraved-plate serif reserved for names and headlines, and photography that sits naked in the composition rather than inside a frame.

The rebuilt site is editorial and large-format. The type ramp runs from 0.78rem captions to a 6.5rem hero in fluid `clamp()` steps, so the display voice actually dominates its viewport instead of politely fitting. Compositions bleed past the container and overlap on purpose — the manifesto figure runs off the right edge, the craft scene stacks two absolutely positioned figures, the gallery is a horizontal strip of mismatched widths. There are no cards: no bordered boxes around images, no shadowed containers, no padded tiles. Depth comes from tonal layering, gradient veils and overlap.

Motion is now central rather than rationed, and it is deliberately platform-split. Desktop with a mouse gets Lenis smooth wheel scrolling bridged into GSAP ScrollTrigger: parallax at different speeds per layer, scale drift, and exactly one horizontal section held by CSS `sticky`. Touch gets native scroll and one-shot reveals only — no held sections, no scrubbed transforms, no scroll hijacking. Under `prefers-reduced-motion` nothing moves and, critically, nothing hides: every animation is authored as `gsap.from()` off a naturally visible CSS state.

**Key Characteristics:**
- Dark, tonal "atelier room" of two near-black surfaces (carvão, grafite) alternating section to section; depth from layering and overlap, never from card chrome.
- One warm accent (latão) as text-safe accent and interactive signal; bordô as a non-text colour layer that animates in from the bottom.
- A dramatic fluid serif ramp topping out at 6.5rem, against a precise grotesk for every functional line.
- No cards, no image frames, no borders around photography — hairlines rule lists and edges only.
- A platform-split motion system: scrubbed parallax and one sticky horizontal stage on desktop pointers; one-shot reveals on touch; nothing hidden under reduced motion.

## Colors

A near-monochrome dark room broken by one warm metal accent and one reserved wine accent that never touches text.

### Primary
- **Latão** (#b08d4f): the brushed-brass accent. Prices in the services ledger, the solid CTA fill, wiping nav and link underlines, the quiet booking link, star ratings, focus rings, the scroll-cue gradient, the Trust hairline, hover colour on the service-row name and on footer social icons. Text-safe only on the two dark surfaces.
- **Osso** (#ede6d6): the primary text colour on every surface — headlines, body, labels — and the sole text colour on the solid latão button's bordô hover state. Secondary copy steps down by opacity (osso/85, /75, /70, /65) rather than by a second grey. Small text never goes below osso at 60%: the contrast audit measures every text element against its real background, and anything under that fails WCAG AA.

### Secondary
- **Bordô** (#5b1f2a): the deep wine, used only as a moving fill. It is the colour layer that scales up from the bottom (`origin-bottom`, scaleY 0→1) under the label of every solid and outline WhatsApp button and the header's "Agendar" CTA — full strength behind the solid variant, at 45% behind outlined ones. Never a text colour.

### Neutral
- **Carvão** (#14161c): the base surface — hero, manifesto, services, gallery, the footer band — and the colour of the gradient veils, vignette and scrim layered over every photograph.
- **Grafite** (#1e212b): the alternating surface — craft, barber roster, trust — one shade lighter than carvão, separating sections with no rule and no shadow.
- **Bronze** (#6b4e2e): hairlines only, always at reduced opacity (bronze/25–/40): the services ledger's top and row rules, the condensed header's bottom border, the mobile menu's link dividers, the map frame, the footer's closing rule. Never a fill, never text.

### Named Rules
**The Text-Safe Latão Rule.** Latão is a text colour only on carvão or grafite. It never appears as text on osso or any light surface — measured contrast there (2.50:1) fails AA, against 5.83:1 on carvão and 5.18:1 on grafite. Binding, from PRODUCT.md's accessibility contract.

**The Non-Text Bordô Rule.** Bordô is never a text colour, full stop; it exists only as fill, border, or the hover/focus colour layer. Its ~1.3–1.4:1 contrast against the dark surfaces makes any bordô text unreadable and unshippable. Binding, from PRODUCT.md's accessibility contract.

**The Opacity-Not-Grey Rule.** Secondary and tertiary text is osso at reduced opacity, never a new neutral. The palette stays at six colours no matter how many tiers of copy a section needs.

## Typography

**Display Font:** Libre Caslon Display (with Libre Caslon Text, Georgia, serif fallback)
**Body Font:** Archivo Variable (with Archivo, system-ui, sans-serif fallback)

**Character:** A high-contrast engraved-plate serif, set large, tight (-0.02em) and near-solid (line-height 0.98–1.15), against a precise grotesk that never raises its voice above 1.02rem. The serif is the monogram; Archivo is the lining.

### Hierarchy
- **Display** (400, `clamp(2.75rem, 8.5vw, 6.5rem)`, line-height 0.98, tracking -0.02em): the single hero H1, capped at 16ch so it always breaks into masked lines.
- **Claim** (400, `clamp(2.2rem, 6vw, 4.75rem)`, line-height 1.02, tracking -0.025em): the closing "Marque seu horário." over the footer's facade band — the second-largest voice in the system, and the only other one that owns a full viewport.
- **Headline** (400, `clamp(2rem, 4.4vw, 3.6rem)`, line-height 1.06, tracking -0.02em): section H2s in Craft, Menu and Barbers.
- **Statement** (400, `clamp(1.9rem, 4.6vw, 3.6rem)`, line-height 1.1–1.14): the two editorial set-pieces — the manifesto paragraph (`clamp(1.9rem, 4.2vw, 3.4rem)`, line-height 1.14, capped 20ch) and the Trust blockquote (capped 24ch). Copy promoted to display scale, not a heading.
- **Subhead** (400, `clamp(1.75rem, 3.4vw, 2.75rem)`): the gallery's H2, deliberately the quietest section title because the strip beneath it carries the section.
- **Title** (400, 1.5rem → 1.75rem (sm) → 2rem (lg)): service names and prices in the ledger, moving in lockstep; barber names sit fixed at 1.6rem; the mobile menu's links at 2rem.
- **Title-sm** (400, 1.35rem): the footer's "Onde / Quando / Contato" heads. The header no longer carries a typographic wordmark: the logo image took that place.
- **Body** (400, 1.02rem, line-height ~1.6): every lead and paragraph, capped 38–52ch. The hero lead steps to 1.1rem at sm; footer address and hours run 0.98rem.
- **Body-sm** (400, 0.95rem, medium): button labels in the solid and outline variants.
- **Label** (400, 0.92rem / 0.9rem / 0.88rem / 0.85rem): barber notes (0.92), header nav (0.9), the Google badge and map link (0.88), header CTA, barber CTA and the home-service note (0.85).
- **Micro** (400, 0.82rem / 0.78rem): the quiet booking link and the footer's closing line (0.82); gallery captions (0.78) — the floor of the ramp.
- **Marker** (`.marker`, 500, 0.68rem, uppercase, tracking 0.22em, osso at 62%, measured ≥5.5:1 on both dark surfaces): the brand's small voice. Section markers ("O ofício", "O menu", "Profissionais", "Galeria", "Agendamento"), hero meta (place, hours, "Desde 2015"), service numbers and durations, figure captions, and the "Desde / 2015" signature label. `.marker-accent` switches it to latão for the one word that should carry the accent. It is the only uppercase, letter-spaced style in the system.

### Named Rules
**The Names-Get-the-Serif Rule.** The display serif is reserved for headlines, statements, barber names and prices — anything that reads like it belongs on an engraved plate. Body copy, labels, buttons, nav and all UI chrome stay in Archivo; the two never trade places.

**The Descender-Clearance Rule.** Any heading revealed line-by-line through a mask carries the `.reveal-line` padding/margin pair (`padding-bottom: 0.14em; margin-bottom: -0.14em`). Without it the serif's g, j and p are clipped by the mask's overflow. Every masked reveal inherits this class from `revealLines()`; never mask a serif line without it.

**The Fluid-Only Rule.** Every step above 1.35rem is a `clamp()`, not a breakpoint stack. The ramp scales continuously with the viewport; new display-scale type states its own clamp rather than stepping through `sm:`/`lg:` sizes.

## Layout

One container for the whole site: `max-w-[92rem]`, centred, with gutters stepping 1.5rem (base) → 2.5rem (sm) → 3.5rem (lg). Vertical rhythm is 6rem (base) → 8rem (sm) → 9rem (lg) per section, with the two most editorial sections (Manifesto, Trust) opening to 10rem at lg and the footer's data grid running 5rem/6rem. Anchored sections carry `scroll-margin-top: 5rem` so the fixed header never covers a target.

Composition is a 12-column grid at lg that is asymmetric by default and deliberately broken at the edges. The manifesto runs text in columns 1–7 with its figure in 8–12 bleeding past the gutter (`-mr-6 / -mr-10 / -mr-14`). The craft section abandons flow at lg entirely: a `min-h-[46rem]` stage with a 41%-wide figure anchored left, text anchored right, and a second 28%-wide figure absolutely placed at `left-[24%]` crossing over the first, separated from it by a 10px grafite border. Below lg the second figure sits below the text with no overlap, so it can never cover copy. The services section pairs a sticky image panel (columns 1–5, `top-28`) with the ledger (columns 6–12). The barber roster is a 1 → 2 → 4 column grid whose four columns carry staggered top offsets (0, 5rem, 2rem, 7rem) so the row never reads as a card shelf. The gallery is a full-bleed horizontal strip of six panels, four aspect ratios and per-panel vertical offsets (±1.5rem–4rem), sized at lg by `min(vw, svh)` so it fits short screens.

Responsive behaviour is a genuine fork, not a reflow: at lg the gallery becomes a CSS `sticky` `h-screen` stage whose track is scrubbed horizontally; below lg it is a native `overflow-x-auto` snap strip. The services image panel exists only at lg; below it, each row grows its own 16:9 image band.

## Elevation & Depth

Flat by doctrine. Depth is built from alternating carvão/grafite bands, carvão gradient veils and vignettes stacked over photography (`from-carvao via-carvao/45 to-carvao/5`, a left-to-right scrim at 0.86 → 0.50 → transparent that grounds the reading column and mutes the storefront’s neon sign behind it, a radial vignette, and a scroll-darkened veil in the hero), overlapping figures, and parallax layers moving at different speeds. Nothing at rest carries a shadow.

### Shadow Vocabulary
- **Overlap-cast** (`box-shadow: 0 30px 70px -30px rgba(0,0,0,0.75)`, lg only): the single soft cast under the craft section's overlapping second figure, present only where one image physically crosses another. It reads as contact between layers, not as a container.
- **Floating-action ambient** (`box-shadow: 0 10px 28px rgba(0,0,0,0.42)`): the mobile-only circular WhatsApp control, fixed bottom-right, lifting it above scrolling content.

### Named Rules
**The No-Card Rule.** This system has no cards. Images are placed bare into the composition — no border, no radius, no padded container, no surface tint behind them. If a group of content needs definition, it gets a hairline rule, a tonal band, or nothing.

**The Two-Shadow Rule.** Exactly two shadows exist site-wide: one under the overlapping craft figure and one under the floating action button. Sections, lists, images and interactive surfaces are shadowless.

## Shapes

A square-cornered rectilinear language: shipped surfaces carry no border radius at all — buttons, image masks, the ledger, the map frame and the menu panel are all hard-cornered. The single circle in the system is the mobile floating action button (`rounded-full`, 3.1rem), and its roundness is exactly what marks it as a floating control rather than page content.

Borders are hairlines and nothing else: 1px bronze at 25–40% opacity, used to rule the services ledger (top rule plus a rule per row), the condensed header's lower edge, the mobile menu's link separators, the map's frame and the footer's closing rule. Interactive outlines use latão at 60–70% (the outline button, the Google badge). Photography has no border under any circumstance.

Image geometry is varied on purpose: 3/4 and 4/5 portraits, 16/9 and 5/4 bands, 3/4.4 and 7/8 and square panels in the gallery. Reveal geometry is `clip-path: inset()` — figures wipe open from the bottom edge (`inset(100% 0% 0% 0%)`) or the top (`inset(0% 0% 100% 0%)`), never fade in as a rectangle.

## Components

### Buttons
All three variants share the same skeleton: hard corners, Archivo at 0.95rem medium with 0.005em tracking, a WhatsApp SVG at 1.05em that lifts 1px on hover, and `overflow-hidden` so the colour layer is clipped to the button.
- **Solid:** latão fill, carvão label, 28px/16px padding. On hover and `:focus-visible` a bordô layer scales up from the bottom over 300ms `ease-brand` and the label transitions to osso.
- **Outline:** transparent with a 1px latão/60 border and osso label; the border strengthens to latão/90 and the same bordô layer rises at 45% opacity.
- **Quiet:** a latão text link at 0.82rem with a 0.95em icon; the underline wipes in from the left (`origin-right scale-x-0` → `origin-left scale-x-100`) and the label shifts to osso. Used per-row in the services ledger.
- **Arrow:** the solid and outline variants carry a drawn arrow parked in the right padding at opacity 0. On hover and `:focus-visible` the label group slides 0.5rem left and the arrow slides in from -0.375rem, both by transform over 300ms. The button's width never changes, so nothing around it moves.
- **Press:** every button and the header CTA sink to scale 0.98 (0.97 on the compact CTA, 0.95 on the floating button) in 100ms while pressed and settle back in 300ms. The quiet text link dims to 70% instead, and carries a 44px invisible hit area.
- **Focus:** a global 2px latão outline at 3px offset (`:focus-visible` in the base layer); buttons set their own 3–4px offsets. Focus triggers the identical colour layer as hover — no state is mouse-only.

### Navigation
Fixed, full-width, transparent over the hero with a 7rem carvão/75 → transparent gradient scrim keeping the wordmark and links legible against the bright facade. After 60% of a viewport of scroll it condenses over 500ms into a carvão/85 backdrop-blurred bar with a bronze/30 hairline and reduced padding, and the scrim fades out. Links are Archivo 0.9rem at osso/75 with a latão underline that wipes in from the left on hover; the mark is the Gireh badge itself (`/upload/logo-transparente.png`), which steps from 3.5rem tall to 2.5rem as the bar condenses. Below lg the nav collapses to a two-line hamburger that rotates into an X, opening a full-screen carvão panel whose links (display serif, 2rem, bronze/25 dividers) stagger in at 70ms intervals; the panel locks body scroll, closes on Escape, and manages `tabIndex` so hidden links stay out of the tab order.

### The Services Ledger (signature component)
An editorial price sheet, not a menu of cards: a single `<ul>` with a bronze/35 rule on top and one per row. Each row opens with a two-digit marker number (01–05), then sets the service name in the display serif (1.5 → 2rem) opposite its price in the same face in latão with tabular figures, and carries the duration and its own quiet booking link on the line beneath the name. On hover or focus a latão hairline draws across the row divider from the left while the number, the name block and the price shift a few pixels apart. Hovering or focusing a row tints the name latão and drives the sticky image panel beside it, where the five service photographs cross-fade over 700ms with a 1.05 → 1.00 scale settle. Below lg the sticky panel disappears and each row grows its own full-width 16:9 image band with a carvão gradient foot.

### The Barber Roster (signature component)
Four bare grayscale portraits (aspect 3/4) with no frame, no border and no card: the image, a name in the display serif at 1.6rem, and a full-width outline booking button pre-filled with that barber’s name. There is no per-barber blurb: the only honest thing the site knows about each professional is the name, so the column says the name and offers the booking. A grafite/70 gradient rises from the foot of each portrait; hovering scales the image 1.04 over 900ms. The four columns carry staggered top offsets so the group reads as a composition rather than a row of tiles. Grayscale is deliberate and total — it keeps portrait lighting and skin tone from acting as a seventh colour.

### The Gallery Strip (signature component)
Six panels of mismatched aspect ratios and vertical offsets, each with a 0.78rem caption at osso/65. Below lg each panel is sized by viewport width; at lg each photo is sized by `min(Nvw, Msvh)`, so short laptop screens shrink the strip instead of cropping it or hiding the heading. At lg the section becomes the site's only held stage: its height is set to `innerHeight + travel`, an inner `sticky top-0 h-screen` stage holds still, and ScrollTrigger scrubs only the track's `x` from the section's top to its bottom. This replaced a ScrollTrigger pin, which swapped the section between static and fixed positioning and registered roughly 1.0 CLS on each entry and exit; the sticky stage registers none. Below lg it is a native `overflow-x-auto` strip with `snap-x snap-mandatory`, a hidden scrollbar and one-shot staggered reveals.

### The Floating Action Button
A 3.1rem circular latão control fixed bottom-right, mobile only (`sm:hidden`), appearing after 90% of a viewport of scroll and withdrawing when the footer comes within 85% of the viewport so it never covers the contact block. It transitions opacity, translate and scale together over 500ms and drops out of the tab order while hidden.

### Motion
Motion is a first-class part of this system, owned by `revealLines()` and the `useSectionMotion` hook, which binds every effect to its section root and reverts cleanly — inline GSAP styles included — when the component unmounts or the media query stops matching.
- **Desktop** (`min-width: 1024px` AND `pointer: fine` AND no reduced-motion preference): Lenis smooth wheel scrolling (duration 1.05, `syncTouch: false`), created and destroyed with the same media query, bridged into ScrollTrigger; scrubbed parallax with a different speed per layer (±5% and ±8% on the craft figures, ±4–7% across the barber portraits, ±6% on the manifesto figure, ±5% plus a 1.04 → 1.08 scale drift on the footer band); the hero's image scales 1 → 1.1 while its content lifts 14% and recedes to 35% opacity and its veil darkens; and one horizontal section held by CSS `sticky`.
- **Touch** (all coarse pointers, including wide tablets): one-shot reveals only. No held stage, no scrub, no Lenis, no scroll hijack. Verified by touch-event testing: zero pin-spacers, no scroll regressions, no drift after the finger lifts.
- **Entrance grammar:** headings reveal line-by-line out of a mask via GSAP SplitText with `autoSplit` (yPercent 108, 1.05s, `power3.out`, 0.085s stagger); figures wipe open with `clip-path: inset()` over ~1.2s `power3.inOut`; supporting copy rises 16–26px with a 0.07–0.1s stagger. Easing is `power3.out` for entrances, `power3.inOut` for wipes, `none` for anything scrubbed, and `cubic-bezier(0.16,1,0.3,1)` for CSS-driven hover and reveal transitions.

### Named Rules
**The Platform-Split Motion Rule.** Desktop and touch are different platforms, not the same site at different widths. Scroll-scrubbed transforms, parallax, held stages and smooth-scroll are gated behind `(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)`. Touch gets native scroll plus one-shot reveals, and nothing else. A coarse pointer at 1400px gets the touch treatment, not the desktop one.

**The Nothing-Hidden Rule.** Every animation is authored as `gsap.from()` off a state that is already visible in CSS. Reduced motion, a failed script, or a media query that never matches must all leave the page fully readable. Audit test: with `prefers-reduced-motion: reduce`, no element renders below 0.15 opacity.

**The One-Stage Rule.** The gallery is the only section that holds still while the page scrolls, only on desktop pointers, and it holds by CSS `sticky`, never by ScrollTrigger `pin`. A second held section, or any held section on touch, is out of system.

**The Timing Rule.** Motion comes from the tokens in `src/lib/motion.ts` (`DUR.settle` 0.7s, `DUR.enter` 0.9s, `DUR.wipe` 0.95s, `DUR.hero` 1.25s, `RISE` 16px) and the `ease-brand` curve in `src/index.css`. Interface feedback is 300ms, press is 100ms, image hover and cross-fades are 500ms at scale 1.02. No component sets its own duration or curve.

**The Reading-Position Rule.** When the desktop media query flips (a window resized across 1024px), the reader's place is restored from a content anchor, the block at the top of the viewport and the fraction of it already scrolled, never from a pixel offset.

## Voice & Copy

The site speaks in the shop's own voice: masculine without caricature, direct, Brazilian, and short. Every line is written to be said out loud by someone who works there. No superlatives, no "excelência", no "experiência única", no invented history.

The copy runs on four registers, and each one has a job:

- **Marker** (0.68rem, uppercase, 0.22em tracking, osso/62). Names the section or labels a fact — "Barbearia em Rio das Ostras", "O ofício", "Avaliações", "Desde". Never a sentence, never end punctuation.
- **Statement** (display serif, clamp). One idea, one full stop: "Uma barbearia para quem leva o próprio corte a sério.", "Cinco serviços, sem letra miúda.", "Escolha com quem sentar na cadeira.", "Marque seu horário." Headings are complete sentences with a period, not fragments.
- **Body** (Archivo, 0.95–1.02rem, osso/70–75). Two short sentences at most per block, each under roughly 20 words. If a block needs more, the composition is wrong, not the copy.
- **Action** (Archivo). Every call to action names what it books: "Agendar horário", "Agendar corte", "Agendar corte + barba", "Agendar com Yuri". Never "Saiba mais", "Clique aqui" or a bare "Enviar".

### Named Rules
**The Only-What-Is-Known Rule.** Every factual line on the site traces to data the client confirmed: the five services and their prices and durations, the four barber names, the WhatsApp number, the address, the hours, the at-home service, 2015 as the opening year, and the Google rating of 4.9 across 69 reviews. Nothing else is stated as fact. There are no testimonials, no client counts, no awards, and no per-barber specialities, because none were provided. When the site has nothing true to say in a slot, the slot gets negative space, not filler.

**The Rewrite-Don't-Shrink Rule.** When copy does not fit its composition, it is rewritten shorter, never set smaller or truncated. Type sizes are fixed by the ramp; the words move.

**The Say-the-Thing Rule.** Labels state the subject rather than dressing it: the reviews block reads "4,9 no Google, em 69 avaliações.", the hours read "Segunda a sábado / 09h às 20h", the at-home line reads "Também atendemos a domicílio." No line explains what the line next to it already says.

## Do's and Don'ts

### Do:
- **Do** keep latão as a text colour only on carvão or grafite — never on osso or any light surface.
- **Do** express the bordô microinteraction as a colour layer scaling from `origin-bottom` under the label, on hover *and* `:focus-visible`, so keyboard users get the same state as mouse users.
- **Do** place photography bare into the composition and let it bleed, overlap, or run off the gutter; use carvão gradient veils, not borders, to control legibility over it.
- **Do** gate every scrubbed, parallaxed or held effect behind the desktop media query, and give touch a one-shot reveal instead.
- **Do** author reveals as `gsap.from()` and attach `.reveal-line` to any masked serif heading so descenders clear the mask.
- **Do** alternate carvão and grafite bands to separate sections, and rule lists with bronze hairlines at 25–40% opacity.

### Don't:
- **Don't** use bordô as a text colour under any circumstance; it is fill, border and hover layer only.
- **Don't** introduce cards: no bordered boxes, no rounded containers, no shadowed tiles, no frames around images.
- **Don't** add a third shadow. The craft overlap cast and the floating action button's ambient are the complete vocabulary.
- **Don't** round corners. The system is square; the circular floating action button is the sole, purposeful exception.
- **Don't** add a second held section, reintroduce ScrollTrigger `pin`, run scrubbed transforms on touch, or let Lenis take over scrolling on a coarse pointer.
- **Don't** invent a new neutral for secondary copy — step osso down by opacity instead.
- **Don't** reach for "preto e dourado" generic luxury signalling, high-gloss gold, or vintage barber-pole imagery.
