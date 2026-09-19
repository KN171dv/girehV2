const f = JSON.parse(require('fs').readFileSync('.impeccable/detect.json','utf8'));
const by = {};
f.forEach(x => { const k = x.antipattern + ' [' + x.severity + ']'; by[k] = (by[k]||0)+1; });
console.log('total:', f.length);
console.log(by);
const non = f.filter(x => !x.advisory);
console.log('nao-advisory:', non.length);
non.slice(0,10).forEach(x => console.log(' -', x.antipattern, '|', String(x.file).split(/[\/]/).pop(), x.line, '|', x.snippet));
