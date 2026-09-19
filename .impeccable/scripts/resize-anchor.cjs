const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://localhost:5195", { waitUntil: "networkidle" });
  await p.waitForTimeout(2000);
  await p.mouse.move(720, 450);
  const where = () => p.evaluate(() => {
    const main = document.querySelector("main");
    for (const c of main.children) {
      const el = c.classList.contains("pin-spacer") ? c.firstElementChild : c;
      const r = c.getBoundingClientRect();
      if (r.bottom > 1) return `${el.id || el.tagName.toLowerCase()} ${Math.round(Math.max(0, -r.top) / r.height * 100)}%`;
    }
  });
  for (const alvo of ["servicos", "profissionais", "contato"]) {
    await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(800);
    const y = await p.evaluate(id => document.getElementById(id).getBoundingClientRect().top + scrollY + 300, alvo);
    for (let i = 0; i < 60 && (await p.evaluate(() => scrollY)) < y - 120; i++) { await p.mouse.wheel(0, 250); await p.waitForTimeout(30); }
    await p.waitForTimeout(1300);
    const a = await where();
    await p.setViewportSize({ width: 820, height: 900 }); await p.waitForTimeout(1600);
    const b2 = await where();
    await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(1600);
    const c = await where();
    console.log(`${alvo.padEnd(13)} 1440: ${a.padEnd(18)} -> 820: ${b2.padEnd(18)} -> 1440: ${c}`);
  }
  await b.close();
})();
