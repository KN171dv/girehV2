const { chromium } = require("playwright");

/*
  Mapa vertical de dentro de uma seção: lista o conteúdo visível em ordem e o
  vão entre um item e o seguinte. Serve para separar espaço negativo desenhado
  de vão que o grid produziu sem querer.
*/
(async () => {
  const width = Number(process.env.W || 390);
  const alvo = process.env.SEC || "oficio";
  const b = await chromium.launch();
  const ctx = await b.newContext({
    viewport: { width, height: 844 },
    hasTouch: width < 1024, isMobile: width < 1024,
    reducedMotion: "reduce",
  });
  const p = await ctx.newPage();
  await p.goto(process.env.URL || "http://localhost:5195", { waitUntil: "networkidle" });
  await p.waitForTimeout(2200);
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); }
    window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 400));
  });
  await p.waitForTimeout(1000);

  const rows = await p.evaluate((alvo) => {
    const sec = document.getElementById(alvo);
    const items = [];
    const seen = new Set();
    const walk = (el) => {
      for (const c of el.children) {
        const cs = getComputedStyle(c);
        if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") continue;
        const ink = c.matches("img, iframe, h1, h2, h3, p, dt, dd, figcaption, a, button, span, hr") && c.textContent.trim() !== "" || c.matches("img, iframe");
        if (ink && c.getClientRects().length && !seen.has(c)) {
          const r = c.getBoundingClientRect();
          if (r.height > 0) {
            seen.add(c);
            items.push({
              tag: c.tagName.toLowerCase(),
              txt: (c.matches("img") ? "[img " + (c.getAttribute("src") || "").split("/").pop() + "]"
                   : c.matches("iframe") ? "[mapa]"
                   : c.textContent.trim().slice(0, 34)),
              top: Math.round(r.top + scrollY), bottom: Math.round(r.bottom + scrollY),
              left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width),
            });
          }
        }
        walk(c);
      }
    };
    walk(sec);
    items.sort((a, b) => a.top - b.top);
    const out = [];
    let prevBottom = null;
    for (const it of items) {
      if (prevBottom !== null && it.top < prevBottom - 2) continue; // ignora aninhados/sobrepostos
      out.push({ ...it, vao: prevBottom === null ? 0 : it.top - prevBottom });
      prevBottom = Math.max(prevBottom ?? 0, it.bottom);
    }
    return out;
  }, alvo);

  console.log(`\n== #${alvo} @ ${width}px ==`);
  console.log("vão   x..x      larg  conteúdo");
  for (const r of rows) {
    const flag = r.vao >= 120 ? "  <== vão grande" : "";
    console.log(
      String(r.vao).padStart(4),
      `${String(r.left).padStart(3)}..${String(r.right).padStart(4)}`,
      String(r.w).padStart(5),
      " " + r.txt + flag,
    );
  }
  await b.close();
})();
