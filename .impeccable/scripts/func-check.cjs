const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const out = {};

  // ---------- Desktop ----------
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push("CONSOLE: " + m.text());
  });
  await page.goto("http://localhost:5191", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);

  // Todos os links externos: destino e atributos de segurança
  out.links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll("a[href]"));
    const wa = anchors.filter((a) => a.href.includes("wa.me"));
    const ig = anchors.filter((a) => a.href.includes("instagram.com"));
    const maps = anchors.filter((a) => a.href.includes("google.com/maps"));
    const google = anchors.filter((a) => a.href.includes("google.com/search"));
    const unsafe = anchors.filter(
      (a) => a.target === "_blank" && !(a.rel || "").includes("noopener"),
    );
    const noLabel = anchors.filter(
      (a) => !a.textContent.trim() && !a.getAttribute("aria-label"),
    );
    return {
      whatsapp: wa.length,
      instagram: ig.length,
      maps: maps.length,
      googleReviews: google.length,
      blankSemNoopener: unsafe.length,
      semRotulo: noLabel.length,
      iframes: document.querySelectorAll("iframe").length,
      imagensSemAlt: Array.from(document.querySelectorAll("img")).filter(
        (i) => i.getAttribute("alt") === null,
      ).length,
      imagensQuebradas: Array.from(document.querySelectorAll("img")).filter(
        (i) => i.complete && i.naturalWidth === 0,
      ).length,
    };
  });

  // Âncoras do menu levam às seções certas
  const anchors = ["casa", "servicos", "profissionais", "contato"];
  out.navegacao = {};
  for (const id of anchors) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.locator("header nav button", { hasText: /./ }).first().waitFor();
    const label = {
      casa: "A casa",
      servicos: "Serviços",
      profissionais: "Profissionais",
      contato: "Contato",
    }[id];
    await page.locator("header nav button", { hasText: label }).click();
    await page.waitForTimeout(1800);
    out.navegacao[id] = await page.evaluate((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return "seção não encontrada";
      const top = Math.round(el.getBoundingClientRect().top);
      return Math.abs(top) < 140 ? "ok (" + top + "px)" : "fora (" + top + "px)";
    }, id);
  }

  // Teclado: o painel de imagem do menu responde ao foco, não só ao mouse
  await page.evaluate(() => {
    document.getElementById("servicos")?.scrollIntoView();
  });
  await page.waitForTimeout(900);
  const firstRowLink = page.locator('#servicos li a[href*="wa.me"]').nth(0);
  const thirdRowLink = page.locator('#servicos li a[href*="wa.me"]').nth(2);
  await firstRowLink.focus();
  await page.waitForTimeout(500);
  const afterFirst = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll("#servicos .sticky img"));
    return imgs.findIndex((i) => getComputedStyle(i).opacity === "1");
  });
  await thirdRowLink.focus();
  await page.waitForTimeout(600);
  const afterThird = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll("#servicos .sticky img"));
    return imgs.findIndex((i) => getComputedStyle(i).opacity === "1");
  });
  out.tecladoPainelServicos = {
    aoFocarPrimeiro: afterFirst,
    aoFocarTerceiro: afterThird,
    respondeAoFoco: afterFirst === 0 && afterThird === 2,
  };

  // Anel de foco visível
  out.anelDeFoco = await page.evaluate(() => {
    const a = document.querySelector('#servicos li a[href*="wa.me"]');
    a.focus();
    const cs = getComputedStyle(a);
    return { outlineWidth: cs.outlineWidth, outlineColor: cs.outlineColor };
  });

  out.errosDesktop = errors.length ? errors : "nenhum";
  await page.close();

  // ---------- Larguras intermediárias ----------
  out.larguras = {};
  for (const w of [768, 1024, 1280]) {
    const p2 = await browser.newPage({ viewport: { width: w, height: 900 } });
    const errs = [];
    p2.on("pageerror", (e) => errs.push(e.message));
    await p2.goto("http://localhost:5191", { waitUntil: "networkidle" });
    await p2.waitForTimeout(2200);
    const info = await p2.evaluate(() => ({
      overflowHorizontal:
        document.documentElement.scrollWidth > window.innerWidth + 1,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      pins: document.querySelectorAll(".pin-spacer").length,
    }));
    await p2.screenshot({ path: `.impeccable/review/w${w}.png` });
    out.larguras[w] = { ...info, erros: errs.length ? errs : "nenhum" };
    await p2.close();
  }

  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})();
