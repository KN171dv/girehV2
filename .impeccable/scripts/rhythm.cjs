const { chromium } = require("playwright");

/*
  Auditoria de ritmo vertical. Para cada seção mede o padding próprio, e entre
  seções mede o vão real: da última coisa que se vê na seção anterior até a
  primeira coisa que se vê na seguinte. Esse vão é o que a pessoa percebe como
  "espaço", e não o padding declarado.
*/
(async () => {
  const width = Number(process.env.W || 390);
  const b = await chromium.launch();
  const ctx = await b.newContext({
    viewport: { width, height: 844 },
    hasTouch: width < 1024, isMobile: width < 1024,
    reducedMotion: "reduce",
  });
  const p = await ctx.newPage();
  await p.goto(process.env.URL || "http://localhost:5195", { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);
  await p.evaluate(async () => {
    // Garante que tudo com loading=lazy entre em cena e meça de verdade.
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  await p.waitForTimeout(1200);

  const out = await p.evaluate(() => {
    const doc = document.documentElement;
    const abs = (el) => {
      const r = el.getBoundingClientRect();
      return { top: r.top + scrollY, bottom: r.bottom + scrollY, left: r.left, right: r.right, h: r.height };
    };
    // Última/primeira borda de conteúdo realmente visível dentro de um bloco.
    const edges = (root) => {
      let min = Infinity, max = -Infinity;
      const walk = (el) => {
        for (const c of el.children) {
          const cs = getComputedStyle(c);
          if (cs.display === "none" || cs.visibility === "hidden") continue;
          const isInk =
            c.matches("img, iframe, svg, h1, h2, h3, p, dt, dd, li, a, button, figcaption") ||
            (c.children.length === 0 && c.textContent.trim());
          const r = abs(c);
          if (isInk && r.h > 0 && c.getClientRects().length) {
            if (r.top < min) min = r.top;
            if (r.bottom > max) max = r.bottom;
          }
          walk(c);
        }
      };
      walk(root);
      return { first: min, last: max };
    };

    const secs = [...document.querySelectorAll("main > section, main > footer, #topo")]
      .filter((el, i, a) => a.indexOf(el) === i);
    const rows = secs.map((s) => {
      const box = abs(s);
      const e = edges(s);
      const cs = getComputedStyle(s);
      return {
        id: s.id || s.tagName.toLowerCase(),
        top: Math.round(box.top), bottom: Math.round(box.bottom), alt: Math.round(box.h),
        padTop: cs.paddingTop, padBottom: cs.paddingBottom,
        folgaTopo: Math.round(e.first - box.top),
        folgaBase: Math.round(box.bottom - e.last),
      };
    });
    const vaos = [];
    for (let i = 0; i < secs.length - 1; i++) {
      const a = edges(secs[i]), c = edges(secs[i + 1]);
      vaos.push({ de: rows[i].id, para: rows[i + 1].id, vao: Math.round(c.first - a.last) });
    }
    return { alturaPagina: Math.round(doc.scrollHeight), rows, vaos };
  });

  console.log(`\n== ${width}px | página ${out.alturaPagina}px ==`);
  console.log("seção          altura  padT/padB      folga topo  folga base");
  for (const r of out.rows) {
    console.log(
      r.id.padEnd(14),
      String(r.alt).padStart(6),
      (r.padTop + "/" + r.padBottom).padStart(14),
      String(r.folgaTopo).padStart(11),
      String(r.folgaBase).padStart(11),
    );
  }
  console.log("\nvão real entre conteúdo de seções:");
  for (const v of out.vaos) {
    const flag = v.vao > 220 ? "  <== excessivo" : v.vao > 170 ? "  <== observar" : "";
    console.log(`  ${v.de.padEnd(14)} -> ${v.para.padEnd(14)} ${String(v.vao).padStart(5)}px${flag}`);
  }
  await b.close();
})();
