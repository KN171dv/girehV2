const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://localhost:5195", { waitUntil: "networkidle" });
  await p.waitForTimeout(2200);
  await p.evaluate(() => document.getElementById("profissionais")?.scrollIntoView());
  await p.waitForTimeout(1200);

  const frame = p.locator("#profissionais [data-card-frame]").first();
  const img = p.locator("#profissionais [data-card-frame] img").first();
  const before = await img.evaluate(el => getComputedStyle(el).transform);
  const layerBefore = await p.locator("#profissionais [data-card-layer]").first()
    .evaluate(el => getComputedStyle(el).transform);
  await frame.hover();
  await p.waitForTimeout(1100);
  const after = await img.evaluate(el => getComputedStyle(el).transform);
  console.log('img antes do hover :', before);
  console.log('img depois do hover:', after);
  console.log('camada de parallax :', layerBefore);
  console.log('hover funciona     :', before !== after);

  // botão: camada bordô sobe no hover
  const btn = p.locator('#profissionais a[href*="wa.me"]').first();
  const sweep = p.locator('#profissionais a[href*="wa.me"] span[aria-hidden="true"]').first();
  const sBefore = await sweep.evaluate(el => getComputedStyle(el).transform);
  await btn.hover();
  await p.waitForTimeout(700);
  const sAfter = await sweep.evaluate(el => getComputedStyle(el).transform);
  console.log('camada do botão antes :', sBefore);
  console.log('camada do botão depois:', sAfter);
  await p.screenshot({ path: '.impeccable/review/hover-barbeiro.png' });
  await b.close();
})();
