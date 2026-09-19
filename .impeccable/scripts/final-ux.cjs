const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  // Cabeçalho: condensa após a abertura e volta ao topo
  const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await d.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true });
  });
  await d.goto("http://localhost:5195", { waitUntil: "networkidle" }); await d.waitForTimeout(2500);
  const bg = () => d.evaluate(() => getComputedStyle(document.querySelector("header > div")).opacity);
  const logo = () => d.evaluate(() => getComputedStyle(document.querySelector("header img")).scale);
  const topo = { fundo: await bg(), logo: await logo() };
  await d.mouse.move(720, 450);
  for (let i = 0; i < 12; i++) { await d.mouse.wheel(0, 150); await d.waitForTimeout(60); }
  await d.waitForTimeout(900);
  const rolado = { fundo: await bg(), logo: await logo() };
  for (let i = 0; i < 20; i++) { await d.mouse.wheel(0, 600); await d.waitForTimeout(40); }
  await d.waitForTimeout(800);
  for (let i = 0; i < 40; i++) { await d.mouse.wheel(0, -900); await d.waitForTimeout(30); }
  await d.waitForTimeout(1200);
  const devolta = { fundo: await bg(), logo: await logo() };
  console.log("cabeçalho topo:", JSON.stringify(topo), "| rolado:", JSON.stringify(rolado), "| de volta:", JSON.stringify(devolta));
  console.log("CLS desktop (carga + rolagem):", (await d.evaluate(() => window.__cls)).toFixed(4));
  await d.close();

  // Botão flutuante no celular
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await m.addInitScript(() => { window.__cls = 0; new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true }); });
  await m.goto("http://localhost:5195", { waitUntil: "networkidle" }); await m.waitForTimeout(2000);
  const fab = () => m.evaluate(() => { const a = document.querySelector('a[aria-label="Agendar pelo WhatsApp"].fixed'); return getComputedStyle(a).opacity; });
  const s0 = await fab();
  await m.evaluate(() => scrollTo(0, innerHeight * 2)); await m.waitForTimeout(700); const s1 = await fab();
  await m.evaluate(() => scrollTo(0, document.body.scrollHeight)); await m.waitForTimeout(700); const s2 = await fab();
  console.log("atalho WhatsApp mobile -> topo:", s0, "| meio:", s1, "| rodapé:", s2);
  console.log("CLS mobile:", (await m.evaluate(() => window.__cls)).toFixed(4));
  await m.close();

  // Movimento reduzido: nada escondido
  const r = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await r.goto("http://localhost:5195", { waitUntil: "networkidle" }); await r.waitForTimeout(1500);
  const hidden = await r.evaluate(() => [...document.querySelectorAll("h1,h2,h3,p,figure,li,dl,a,button")].filter(el => el.getBoundingClientRect().height > 0 && !el.closest("#menu-mobile, .sticky, .fixed") && +getComputedStyle(el).opacity < 0.15).map(el => el.tagName + ":" + el.textContent.trim().slice(0, 20)));
  console.log("movimento reduzido, elementos invisíveis:", hidden.length ? hidden : "nenhum", "| pins:", await r.evaluate(() => document.querySelectorAll(".pin-spacer").length));
  await b.close();
})();
