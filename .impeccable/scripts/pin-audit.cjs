const { chromium } = require("playwright");
const URL = process.env.URL || "http://localhost:5195";

const probe = (p) => p.evaluate(() => {
  const g = document.getElementById("galeria");
  const t = g.querySelector("[data-track]");
  const m = getComputedStyle(t).transform;
  const x = m === "none" ? 0 : Number(m.split(",")[4]);
  const next = g.parentElement.classList.contains("pin-spacer") ? g.parentElement.nextElementSibling : g.nextElementSibling;
  return {
    y: Math.round(scrollY),
    top: Math.round((g.querySelector("[data-stage]") || g).getBoundingClientRect().top),
    x: Math.round(x),
    nextTop: next ? Math.round(next.getBoundingClientRect().top) : null,
    gBottom: Math.round(g.getBoundingClientRect().bottom),
    spacer: document.querySelectorAll(".pin-spacer").length,
    hOverflow: document.documentElement.scrollWidth > innerWidth + 1,
    visibleShots: [...g.querySelectorAll("[data-shot]")].filter(s => { const r = s.getBoundingClientRect(); return r.right > 0 && r.left < innerWidth && r.bottom > 0 && r.top < innerHeight; }).length,
  };
});

(async () => {
  const b = await chromium.launch();
  const report = {};
  const errs = [];

  // ---------- Desktop 1440, roda do mouse ----------
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p.on("pageerror", e => errs.push(e.message));
  await p.goto(URL, { waitUntil: "networkidle" });
  await p.waitForTimeout(2200);
  await p.mouse.move(720, 450);

  // leva até pouco antes da galeria
  const gTop = await p.evaluate(() => document.getElementById("galeria").getBoundingClientRect().top + scrollY);
  while ((await probe(p)).y < gTop - 700) { await p.mouse.wheel(0, 400); await p.waitForTimeout(40); }
  await p.waitForTimeout(900);

  // entrada lenta, passo pequeno
  const slow = [];
  for (let i = 0; i < 40; i++) { await p.mouse.wheel(0, 90); await p.waitForTimeout(70); slow.push(await probe(p)); }
  await p.waitForTimeout(1200); slow.push(await probe(p));
  const pinned = slow.filter(s => s.top === 0 || Math.abs(s.top) <= 1);
  const xs = slow.map(s => s.x);
  report.entradaLenta = {
    amostras: slow.length,
    amostrasComPinFixo: pinned.length,
    xMonotonico: xs.every((v, i) => i === 0 || v <= xs[i - 1] + 2),
    xFinal: xs[xs.length - 1],
    topNuncaPula: slow.every((s, i) => i === 0 || !(slow[i-1].top <= 1 && s.top > 40)),
    minFotosVisiveis: Math.min(...pinned.map(s => s.visibleShots)),
  };

  // saída pelo fundo: seção seguinte encosta sem vão
  for (let i = 0; i < 30; i++) { await p.mouse.wheel(0, 120); await p.waitForTimeout(40); }
  await p.waitForTimeout(1300);
  const exit = await probe(p);
  report.saida = { gBottomVsNextTop: exit.nextTop - exit.gBottom, x: exit.x };

  // volta para trás atravessando tudo
  const back = [];
  for (let i = 0; i < 70; i++) { await p.mouse.wheel(0, -120); await p.waitForTimeout(45); back.push(await probe(p)); }
  await p.waitForTimeout(1300); back.push(await probe(p));
  const bx = back.map(s => s.x);
  report.voltaParaTras = { xVoltouAZero: bx[bx.length - 1] >= -2, xMonotonicoNaVolta: bx.every((v, i) => i === 0 || v >= bx[i - 1] - 2) };

  // rolagem rápida, ida e volta 3x
  const cycles = [];
  for (let c = 0; c < 3; c++) {
    for (let i = 0; i < 8; i++) { await p.mouse.wheel(0, 900); await p.waitForTimeout(20); }
    await p.waitForTimeout(1400); const a = await probe(p);
    for (let i = 0; i < 8; i++) { await p.mouse.wheel(0, -900); await p.waitForTimeout(20); }
    await p.waitForTimeout(1400); const z = await probe(p);
    cycles.push({ ida: { x: a.x, top: a.top }, volta: { x: z.x, top: z.top } });
  }
  report.rapidoIdaEVolta = cycles;

  // âncoras que atravessam a galeria
  for (const id of ["galeria", "contato", "oficio"]) {
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(500);
    const label = { galeria: "Galeria", contato: "Contato", oficio: "O ofício" }[id];
    await p.locator("header nav button", { hasText: label }).click();
    await p.waitForTimeout(2200);
    report["ancora_" + id] = await p.evaluate(i => Math.round(document.getElementById(i).getBoundingClientRect().top), id);
  }

  // redimensionar no meio do pin: 1440 -> 900 -> 1440
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(400);
  const gT = await p.evaluate(() => document.getElementById("galeria").getBoundingClientRect().top + scrollY);
  await p.evaluate(v => scrollTo(0, v + 600), gT); await p.waitForTimeout(1200);
  const midPin = await probe(p);
  await p.setViewportSize({ width: 900, height: 900 }); await p.waitForTimeout(1500);
  const narrow = await probe(p);
  await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(1500);
  const wide = await probe(p);
  report.redimensionar = { meioDoPin: midPin, em900: narrow, de_volta1440: wide };
  await p.close();

  // ---------- Tablet com toque (>=1024, coarse) ----------
  for (const vp of [{ width: 1180, height: 820 }, { width: 820, height: 1180 }, { width: 1024, height: 768 }]) {
    const t = await b.newPage({ viewport: vp, hasTouch: true, isMobile: true });
    await t.goto(URL, { waitUntil: "networkidle" }); await t.waitForTimeout(1800);
    const cdp = await t.context().newCDPSession(t);
    const coarse = await t.evaluate(() => matchMedia("(pointer: coarse)").matches);
    const ys = [];
    for (let i = 0; i < 30; i++) {
      await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: vp.width / 2, y: vp.height - 120 }] });
      for (let k = 1; k <= 10; k++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: vp.width / 2, y: vp.height - 120 - k * 50 }] }); await new Promise(r => setTimeout(r, 16)); }
      await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
      await t.waitForTimeout(250);
      ys.push(Math.round(await t.evaluate(() => scrollY)));
    }
    const s1 = await t.evaluate(() => scrollY); await t.waitForTimeout(1200); const s2 = await t.evaluate(() => scrollY);
    report[`toque_${vp.width}x${vp.height}`] = {
      pointerCoarse: coarse,
      pins: await t.evaluate(() => document.querySelectorAll(".pin-spacer").length),
      retrocessos: ys.filter((y, i) => i > 0 && y < ys[i - 1] - 20).length,
      deriva: Math.round(s2 - s1),
      overflowH: await t.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
    };
    await t.close();
  }

  report.erros = errs.length ? errs : "nenhum";
  console.log(JSON.stringify(report, null, 1));
  await b.close();
})();
