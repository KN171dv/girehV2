const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://localhost:5195", { waitUntil: "networkidle" });
  await p.waitForTimeout(2200);
  await p.evaluate(() => document.getElementById("profissionais")?.scrollIntoView());
  await p.waitForTimeout(1200);

  const img = p.locator("#profissionais [data-card-frame] img").first();
  const read = async (loc) => loc.evaluate(el => {
    const cs = getComputedStyle(el);
    return { scale: cs.scale, transform: cs.transform };
  });
  console.log('foto antes :', JSON.stringify(await read(img)));
  await p.locator("#profissionais [data-card-frame]").first().hover();
  await p.waitForTimeout(1100);
  console.log('foto hover :', JSON.stringify(await read(img)));

  const sweep = p.locator('#profissionais a[href*="wa.me"] span[aria-hidden="true"]').first();
  console.log('botao antes:', JSON.stringify(await read(sweep)));
  await p.locator('#profissionais a[href*="wa.me"]').first().hover();
  await p.waitForTimeout(700);
  console.log('botao hover:', JSON.stringify(await read(sweep)));
  await p.screenshot({ path: '.impeccable/review/hover-barbeiro.png' });
  await b.close();
})();
