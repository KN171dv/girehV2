const { chromium } = require("playwright");

/** Swipe de verdade: touchstart, vários touchmove e touchend, via CDP. */
async function swipeUp(cdp, { x = 195, fromY = 700, toY = 200, steps = 12 } = {}) {
  const dy = (toY - fromY) / steps;
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x, y: fromY }],
  });
  for (let i = 1; i <= steps; i++) {
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x, y: Math.round(fromY + dy * i) }],
    });
    await new Promise((r) => setTimeout(r, 16));
  }
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    deviceScaleFactor: 2,
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push("CONSOLE: " + m.text());
  });

  const cdp = await page.context().newCDPSession(page);
  await page.goto("http://localhost:5191", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);

  // 1. Nenhum pin deve existir em mobile.
  const pinSpacers = await page.evaluate(
    () => document.querySelectorAll(".pin-spacer").length,
  );

  // 2. Lenis não deve estar ativo (scroll nativo).
  const htmlClass = await page.evaluate(() => document.documentElement.className);

  // 3. Rolagem por toque: a posição precisa avançar sem voltar sozinha.
  const positions = [];
  for (let i = 0; i < 14; i++) {
    await swipeUp(cdp);
    await page.waitForTimeout(500);
    const y = await page.evaluate(() => Math.round(window.scrollY));
    positions.push(y);
    if (i === 2) await page.screenshot({ path: ".impeccable/review/m-a.png" });
    if (i === 5) await page.screenshot({ path: ".impeccable/review/m-b.png" });
    if (i === 8) await page.screenshot({ path: ".impeccable/review/m-c.png" });
    if (i === 11) await page.screenshot({ path: ".impeccable/review/m-d.png" });
  }

  // Detecta retrocesso: qualquer queda relevante indica reset/conflito.
  const regressions = positions.filter((y, i) => i > 0 && y < positions[i - 1] - 40);

  // 4. Estabilidade: a posição não pode mudar sozinha depois de parar.
  const settled1 = await page.evaluate(() => Math.round(window.scrollY));
  await page.waitForTimeout(1600);
  const settled2 = await page.evaluate(() => Math.round(window.scrollY));

  // 5. Menu mobile: abre, trava o corpo, fecha e devolve o scroll.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.locator('button[aria-controls="menu-mobile"]').tap();
  await page.waitForTimeout(700);
  const menuOpen = await page.evaluate(() => ({
    expanded: document
      .querySelector('button[aria-controls="menu-mobile"]')
      .getAttribute("aria-expanded"),
    bodyOverflow: document.body.style.overflow,
  }));
  await page.screenshot({ path: ".impeccable/review/m-menu.png" });

  await page.locator("#menu-mobile button", { hasText: "Serviços" }).first().tap();
  await page.waitForTimeout(1400);
  const afterNav = await page.evaluate(() => ({
    bodyOverflow: document.body.style.overflow,
    scrollY: Math.round(window.scrollY),
    expanded: document
      .querySelector('button[aria-controls="menu-mobile"]')
      .getAttribute("aria-expanded"),
  }));
  await page.screenshot({ path: ".impeccable/review/m-servicos.png" });

  // 6. Agendamento por serviço presente e apontando pro WhatsApp com o serviço.
  const serviceLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href*="wa.me"]'))
      .map((a) => decodeURIComponent(a.getAttribute("href")))
      .filter((h) => h.includes("Gostaria de agendar") && !h.includes("com o")),
  );

  console.log(
    JSON.stringify(
      {
        pinSpacers,
        htmlClass,
        positions,
        regressions,
        driftAfterStop: settled2 - settled1,
        menuOpen,
        afterNav,
        serviceBookingLinks: serviceLinks,
        errors: errors.length ? errors : "sem erros",
      },
      null,
      2,
    ),
  );

  await browser.close();
})();
