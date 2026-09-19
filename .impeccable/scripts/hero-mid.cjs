const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://localhost:5193", { waitUntil: "networkidle" });
  await p.waitForTimeout(2600);
  await p.mouse.move(720, 450);
  const read = () => p.evaluate(() => {
    const img = document.querySelector("[data-hero-image]");
    const content = document.querySelector("[data-hero-content]");
    const cs = getComputedStyle(img);
    return {
      y: Math.round(window.scrollY),
      imgTransform: cs.transform,
      contentOpacity: Number(getComputedStyle(content).opacity).toFixed(2),
    };
  });
  console.log('inicio:', JSON.stringify(await read()));
  for (let step = 1; step <= 3; step++) {
    for (let k = 0; k < 4; k++) { await p.mouse.wheel(0, 75); await p.waitForTimeout(80); }
    await p.waitForTimeout(700);
    console.log('passo', step, JSON.stringify(await read()));
    await p.screenshot({ path: `.impeccable/review/hero-mid${step}.png` });
  }
  await b.close();
})();
