const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.addInitScript(() => {
    window.__calls = [];
    const wrap = (obj, name) => {
      const orig = obj[name];
      obj[name] = function (...a) {
        window.__calls.push({ fn: name, args: JSON.stringify(a).slice(0, 80), stack: (new Error().stack || "").split("\n").slice(2, 6).map(s => s.trim().replace(/\(?http:\/\/localhost:\d+\//, "").slice(0, 90)).join(" | ") });
        return orig.apply(this, a);
      };
    };
    wrap(window, "scrollTo"); wrap(window, "scroll");
    wrap(Element.prototype, "scrollTo"); wrap(Element.prototype, "scrollTop" in Element.prototype ? "scrollTo" : "scrollTo");
  });
  await p.goto("http://localhost:5195", { waitUntil: "networkidle" });
  await p.waitForTimeout(2000);
  for (const target of [3000]) {
    const y = target === "pin"
      ? await p.evaluate(() => document.getElementById("galeria").getBoundingClientRect().top + scrollY + 600)
      : target;
    await p.mouse.move(720, 450);
    // chega lá com a roda, como usuário (Lenis sincronizado)
    await p.evaluate(v => scrollTo(0, v), y); await p.waitForTimeout(300);
    await p.mouse.wheel(0, 10); await p.waitForTimeout(1200);
    const before = await p.evaluate(() => Math.round(scrollY));
    await p.evaluate(() => { window.__calls = []; });
    await p.setViewportSize({ width: 900, height: 900 }); await p.waitForTimeout(1500);
    const after = await p.evaluate(() => Math.round(scrollY));
    const calls = await p.evaluate(() => window.__calls.map(c => ({fn:c.fn,args:c.args,stack:c.stack.split(" | ")[0]})));
    console.log(`\n== alvo ${target}: antes ${before} -> depois ${after}`);
    calls.forEach(c => console.log("  ", c.fn, c.args, "\n      ", c.stack));
    await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(1500);
  }
  await b.close();
})();
