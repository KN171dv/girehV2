const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://localhost:5193", { waitUntil: "networkidle" });
  await p.waitForTimeout(2200);
  await p.evaluate(() => document.getElementById("servicos")?.scrollIntoView());
  await p.waitForTimeout(900);

  const read = () => p.evaluate(() =>
    Array.from(document.querySelectorAll("#servicos .sticky img")).map(i =>
      Number(getComputedStyle(i).opacity).toFixed(2)));

  for (const idx of [2, 4, 1]) {
    await p.locator('#servicos li a[href*="wa.me"]').nth(idx).focus();
    await p.waitForTimeout(1200);
    console.log('foco no item', idx, '-> opacidades:', (await read()).join(' '));
  }
  await b.close();
})();
