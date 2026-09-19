const fs = require("fs");
const exported = ["gsap", "ScrollTrigger", "SplitText", "EASE", "EASE_SOFT", "EASE_WIPE", "DUR", "RISE", "revealLines", "scrollToSection", "MQ", "prefersReducedMotion"];
for (const f of ["Hero", "Manifesto", "Craft", "Menu", "Barbers", "Gallery", "Trust", "Contact"]) {
  const p = `src/components/sections/${f}.tsx`;
  let s = fs.readFileSync(p, "utf8");
  const line = s.split("\n").find(l => l.includes('from "../../lib/motion"') && l.startsWith("import {"));
  const body = s.replace(line, "");
  const used = exported.filter(n => new RegExp(`(^|[^A-Za-z0-9_])${n}([^A-Za-z0-9_]|$)`).test(body));
  s = s.replace(line, `import { ${used.join(", ")} } from "../../lib/motion";`);
  fs.writeFileSync(p, s);
  console.log(f.padEnd(10), used.join(", "));
}
