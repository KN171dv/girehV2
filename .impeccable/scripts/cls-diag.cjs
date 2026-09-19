const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await d.addInitScript(() => {
    window.__ls = [];
    new PerformanceObserver(l => {
      for (const e of l.getEntries()) {
        if (e.hadRecentInput) continue;
        window.__ls.push({
          t: Math.round(e.startTime), v: +e.value.toFixed(4), y: Math.round(scrollY),
          src: (e.sources || []).map(s => {
            const n = s.node; if (!n || !n.tagName) return "?";
            const id = n.id || (n.closest && n.closest("[id]") ? n.closest("[id]").id : "");
            return n.tagName.toLowerCase() + (n.className && typeof n.className === "string" ? "." + n.className.split(" ")[0] : "") + " @" + id + " dy=" + Math.round(s.currentRect.y - s.previousRect.y);
          }).slice(0, 3),
        });
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await d.goto("http://localhost:5195", { waitUntil: "networkidle" });
  await d.waitForTimeout(2500);
  const afterLoad = await d.evaluate(() => window.__ls.reduce((a, e) => a + e.v, 0));
  await d.mouse.move(720, 450);
  for (let i = 0; i < 50; i++) { await d.mouse.wheel(0, 250); await d.waitForTimeout(40); }
  await d.waitForTimeout(1500);
  const all = await d.evaluate(() => window.__ls);
  console.log("CLS só na carga:", afterLoad.toFixed(4), "| total:", all.reduce((a, e) => a + e.v, 0).toFixed(4), "| eventos:", all.length);
  const bySrc = {};
  for (const e of all) for (const s of e.src) { const k = s.replace(/dy=-?\d+/, ""); bySrc[k] = (bySrc[k] || 0) + e.v; }
  Object.entries(bySrc).sort((a, b) => b[1] - a[1]).slice(0, 8).forEach(([k, v]) => console.log(v.toFixed(3).padStart(7), k));
  console.log("amostra:"); all.slice(0, 6).forEach(e => console.log("  t=" + e.t, "y=" + e.y, "v=" + e.v, e.src.join(" | ")));
  await b.close();
})();
