const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  for (const w of [1440, 1280, 1024, 768, 390]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 }, reducedMotion: "reduce", deviceScaleFactor: 1 });
    await p.goto("http://localhost:5195", { waitUntil: "networkidle" });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, 0); });
    await p.waitForTimeout(1500);
    await p.screenshot({ path: `.impeccable/review/L${w}.png`, fullPage: true });
    const h = await p.evaluate(() => document.body.scrollHeight);
    console.log(w, "altura", h);
    await p.close();
  }
  await b.close();
})();
