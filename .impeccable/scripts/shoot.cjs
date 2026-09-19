const { chromium } = require('playwright');

(async () => {
  const width = Number(process.argv[2] || 1440);
  const height = Number(process.argv[3] || 900);
  const prefix = process.argv[4] || 'v3-d';
  const steps = Number(process.argv[5] || 11);
  const isMobile = width < 700;

  const b = await chromium.launch();
  const p = await b.newPage({
    viewport: { width, height },
    hasTouch: isMobile,
    isMobile,
    deviceScaleFactor: 1,
  });
  const errors = [];
  p.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  p.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });

  await p.goto('http://localhost:5191', { waitUntil: 'networkidle' });
  await p.waitForTimeout(2600);
  await p.screenshot({ path: `.impeccable/review/${prefix}0.png` });

  await p.mouse.move(width / 2, height / 2);
  for (let i = 1; i <= steps; i++) {
    // rola ~1 viewport com vários incrementos, como uma pessoa rolando
    for (let k = 0; k < 6; k++) {
      await p.mouse.wheel(0, Math.round(height / 6));
      await p.waitForTimeout(90);
    }
    await p.waitForTimeout(950);
    await p.screenshot({ path: `.impeccable/review/${prefix}${i}.png` });
  }

  const y = await p.evaluate(() => Math.round(window.scrollY));
  console.log('scrollY final:', y, '| altura:', await p.evaluate(() => document.body.scrollHeight));
  console.log(errors.length ? errors.join('\n') : 'sem erros de console');
  await b.close();
})();
