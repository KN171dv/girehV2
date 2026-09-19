const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const out = {};
  for (const w of [320, 375, 390]) {
    const p = await b.newPage({ viewport: { width: w, height: 700 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
    const errs = [];
    p.on("pageerror", e => errs.push(e.message));
    await p.goto("http://localhost:5195", { waitUntil: "networkidle" });
    await p.waitForTimeout(2200);
    const info = await p.evaluate(() => {
      const de = document.documentElement;
      // elementos que estouram a largura
      const over = [];
      document.querySelectorAll("section, footer, header, h1, h2, h3, p, img, a, ul, div").forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.right > window.innerWidth + 2 || r.left < -2)) {
          const tag = el.tagName.toLowerCase();
          const txt = (el.textContent || "").trim().slice(0, 24);
          over.push(tag + " " + Math.round(r.left) + ".." + Math.round(r.right) + " " + txt);
        }
      });
      return {
        overflow: de.scrollWidth > window.innerWidth + 1,
        scrollWidth: de.scrollWidth,
        pins: document.querySelectorAll(".pin-spacer").length,
        estouros: over.slice(0, 6),
      };
    });
    await p.screenshot({ path: `.impeccable/review/n${w}.png` });
    // menu aberto nessa largura
    await p.locator('button[aria-controls="menu-mobile"]').tap();
    await p.waitForTimeout(700);
    const menu = await p.evaluate(() => {
      const panel = document.getElementById("menu-mobile");
      const last = panel.querySelector("a[href*='instagram']");
      return {
        panelHeight: Math.round(panel.getBoundingClientRect().height),
        ultimoItemVisivel: last ? Math.round(last.getBoundingClientRect().bottom) <= window.innerHeight : null,
      };
    });
    await p.screenshot({ path: `.impeccable/review/n${w}-menu.png` });
    out[w] = { ...info, menu, erros: errs.length ? errs : "nenhum" };
    await p.close();
  }
  console.log(JSON.stringify(out, null, 2));
  await b.close();
})();
