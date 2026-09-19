const { chromium } = require("playwright");

// Auditoria de contraste WCAG AA de todo texto visível sobre fundo sólido.
// Textos sobre fotografia (abertura e faixa de chamada) ficam de fora: lá o
// contraste depende do véu e é verificado separadamente.
(async () => {
  const width = Number(process.env.W || 1440);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  await p.goto(process.env.URL || "http://localhost:5195", { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);

  const res = await p.evaluate(() => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 1;
    const cx = cv.getContext("2d", { willReadFrequently: true });
    const parse = (c) => {
      cx.clearRect(0, 0, 1, 1);
      cx.fillStyle = "#000";
      cx.fillStyle = c;
      cx.fillRect(0, 0, 1, 1);
      const d = cx.getImageData(0, 0, 1, 1).data;
      return { r: d[0], g: d[1], b: d[2], a: d[3] / 255 };
    };
    const lum = ({ r, g, b }) => {
      const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const over = (fg, bg) => ({
      r: fg.r * fg.a + bg.r * (1 - fg.a),
      g: fg.g * fg.a + bg.g * (1 - fg.a),
      b: fg.b * fg.a + bg.b * (1 - fg.a),
    });
    const solidBg = (el) => {
      for (let n = el; n && n.tagName !== "HTML"; n = n.parentElement) {
        const cs = getComputedStyle(n);
        if (cs.backgroundImage !== "none" && !n.classList.contains("seam-top")) return null;
        const c = parse(cs.backgroundColor);
        if (c.a > 0.99) return c;
      }
      return parse(getComputedStyle(document.body).backgroundColor);
    };

    const count = { textos: 0, sobreFoto: 0, invisiveis: 0, medidos: 0 };
    const fails = [];
    const seen = new Set();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const el = node.parentElement;
      if (!el || seen.has(el) || !node.textContent.trim()) continue;
      seen.add(el);
      count.textos++;
      if (el.closest("#menu-mobile, #topo, [data-band]")) { count.sobreFoto++; continue; }
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || el.getClientRects().length === 0) { count.invisiveis++; continue; }
      const bg = solidBg(el);
      if (!bg) { count.sobreFoto++; continue; }
      let op = 1;
      for (let n = el; n; n = n.parentElement) op *= Number(getComputedStyle(n).opacity);
      const fg = parse(cs.color);
      fg.a *= op;
      const eff = over(fg, bg);
      const L1 = lum(eff), L2 = lum(bg);
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      const size = parseFloat(cs.fontSize);
      const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
      const need = large ? 3 : 4.5;
      count.medidos++;
      if (ratio < need) {
        fails.push({
          txt: node.textContent.trim().slice(0, 30),
          ratio: Number(ratio.toFixed(2)),
          need,
          size: Math.round(size * 10) / 10,
          cls: String(el.className).split(" ").filter((c) => /text-|marker/.test(c)).join(" "),
        });
      }
    }
    return { count, fails };
  });

  console.log(`largura ${width}px`, JSON.stringify(res.count));
  console.log("textos abaixo do AA:", res.fails.length);
  res.fails.forEach((f) => console.log(`  ${String(f.ratio).padEnd(5)} (mín ${f.need})  ${f.size}px  "${f.txt}"  [${f.cls}]`));
  await b.close();
})();
