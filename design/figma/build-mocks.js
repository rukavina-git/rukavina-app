// Builds the three design directions x three palettes on the 'Mocks' page of the Figma file 'Rukavina Site'.
// Figma Plugin API. Plain JS with top-level await; run through a plugin bridge that executes code in Figma desktop.
// Expects a page named 'Mocks'. Fonts: Archivo, Albert Sans, Marcellus, Red Hat Mono, Geist, Geist Mono, Inter.
const hex = h => { h = h.replace('#',''); return { r: parseInt(h.slice(0,2),16)/255, g: parseInt(h.slice(2,4),16)/255, b: parseInt(h.slice(4,6),16)/255 }; };
const solid = (h, o) => [o == null ? { type:'SOLID', color: hex(h) } : { type:'SOLID', color: hex(h), opacity: o }];
async function loadFonts(list){ await Promise.all(list.map(([f,s]) => figma.loadFontAsync({ family:f, style:s }))); }
function T(str, o) {
  const n = figma.createText();
  n.fontName = { family:o.f, style:o.s };
  n.characters = str; n.fontSize = o.size; n.fills = solid(o.color);
  if (o.lh) n.lineHeight = { unit:'PERCENT', value:o.lh*100 };
  if (o.ls) n.letterSpacing = { unit:'PERCENT', value:o.ls*100 };
  if (o.upper) n.textCase = 'UPPER';
  if (o.underline) n.textDecoration = 'UNDERLINE';
  if (o.w) { n.resize(o.w, n.height); n.textAutoResize = 'HEIGHT'; } else n.textAutoResize = 'WIDTH_AND_HEIGHT';
  if (o.name) n.name = o.name;
  return n;
}
function AL(dir, props) { const f = figma.createAutoLayout(dir); f.fills = []; if (props) f.set(props); return f; }
function fixedW(f, w) { f.resize(w, Math.max(f.height, 1)); if (f.layoutMode === 'VERTICAL') f.primaryAxisSizingMode = 'AUTO'; else f.counterAxisSizingMode = 'AUTO'; }
function add(parent, child, fillW) { parent.appendChild(child); if (fillW) child.layoutSizingHorizontal = 'FILL'; return child; }
function gap(parent, h) { const g = figma.createFrame(); g.name = 'gap'; g.fills = []; g.resize(1, h); parent.appendChild(g); return g; }
function border(f, color, top, bottom, all) {
  f.strokes = solid(color); f.strokeAlign = 'INSIDE';
  if (all) { f.strokeWeight = all; return; }
  f.strokeTopWeight = top || 0; f.strokeBottomWeight = bottom || 0; f.strokeLeftWeight = 0; f.strokeRightWeight = 0;
}
const OFFER = 'Senior software engineer. Mobile development, AI integration and architecture, as a contractor inside your team or owning the product end to end.';
const WORK = [
  { name:'GymBuddy', sw:'Android, iOS, Kotlin backend', sp:'PUBLIC · ANDROID · IOS · KOTLIN', st:'Android · iOS · Kotlin', d:'Offline-first workout tracker. Native Android and iOS clients and a Kotlin backend, all generated from one OpenAPI contract that CI enforces.' },
  { name:'Adria VA', sw:'Website, HR / EN', sp:'PUBLIC · WEB · HR / EN', st:'Web · HR / EN', d:"Business website for a virtual assistance and bookkeeping service. Bilingual, with a contact form that lands in the owner's inbox." },
  { name:'Government platform', stName:'Government platform', sw:'Government, under NDA', sp:'GOVERNMENT · NDA', st:'Under NDA', d:'An app with 100,000+ downloads on Android.' },
  { name:'Payments app', sw:'Payments, under NDA', sp:'PAYMENTS · NDA', st:'Under NDA', d:'A digital payments app where security comes first.' },
];
async function placeSection(title, note) {
  const page = figma.root.children.find(p => p.name === 'Mocks'); await figma.setCurrentPageAsync(page);
  let maxY = 0; for (const c of page.children) maxY = Math.max(maxY, c.y + c.height);
  const sec = figma.createSection(); sec.name = title; sec.x = 0; sec.y = page.children.length > 0 ? maxY + 240 : 0;
  sec.fills = solid('#ffffff');
  const n = T(note, { f:'Inter', s:'Regular', size:20, color:'#555555', w:1400 }); sec.appendChild(n); n.x = 80; n.y = 60;
  return sec;
}
function paletteLabel(sec, x, letter, p) {
  const row = AL('HORIZONTAL', { itemSpacing:12, counterAxisAlignItems:'CENTER', name:'Palette ' + letter });
  for (const c of p.sw) { const r = figma.createRectangle(); r.resize(28, 28); r.fills = solid(c); r.strokes = [{type:'SOLID', color:{r:0,g:0,b:0}, opacity:0.15}]; r.strokeWeight = 1; r.strokeAlign = 'INSIDE'; row.appendChild(r); }
  row.appendChild(T('Palette ' + letter + ' · ' + p.name + '   ' + p.sw.join(' / '), { f:'Inter', s:'Medium', size:22, color:'#1b1c1e' }));
  sec.appendChild(row); row.x = x; row.y = 130; return row;
}
function finishSection(sec, frames) {
  let maxH = 0; frames.forEach((f, i) => { sec.appendChild(f); f.x = 80 + i * 1600; f.y = 190; maxH = Math.max(maxH, f.height); });
  sec.resizeWithoutConstraints(80 + frames.length * 1600 - 160 + 80, 190 + maxH + 100);
}
const results = [];
await loadFonts([['Archivo','Regular'],['Archivo','Medium'],['Archivo','SemiBold'],['Archivo','Bold'],['Archivo','ExtraBold'],['Inter','Regular'],['Inter','Medium']]);
const INK = '#121212', SOFT = '#5b5b58', PAPER = '#f6f6f4';
const PALS = [
  { name:'Vermilion', field:'#e4352a', on:'#ffffff', sw:['#f6f6f4','#121212','#e4352a'] },
  { name:'Adriatic blue', field:'#1b4fd6', on:'#ffffff', sw:['#f6f6f4','#121212','#1b4fd6'] },
  { name:'Signal yellow', field:'#f2b705', on:'#121212', sw:['#f6f6f4','#121212','#f2b705'] },
];
const A = { f:'Archivo' };
function build(p, letter) {
  const root = AL('VERTICAL', { name:'Swiss grid · ' + letter + ' ' + p.name }); root.fills = solid(PAPER); fixedW(root, 1440); root.clipsContent = true;
  const top = add(root, AL('HORIZONTAL', { name:'Top bar', paddingLeft:40, paddingRight:40, paddingTop:22, primaryAxisAlignItems:'SPACE_BETWEEN' }), true);
  top.appendChild(T('Ivan Karlo Rukavina', { ...A, s:'SemiBold', size:13, color:INK }));
  const nav = AL('HORIZONTAL', { name:'Nav', itemSpacing:28 }); top.appendChild(nav);
  for (const l of ['Services','Work','For businesses','Contact','HR']) nav.appendChild(T(l, { ...A, s:'Regular', size:13, color:INK }));
  const hero = add(root, AL('VERTICAL', { name:'Hero name', paddingLeft:40, paddingRight:40, paddingTop:92 }), true);
  hero.appendChild(T('Ivan Karlo Rukavina', { ...A, s:'ExtraBold', size:148, color:INK, lh:0.9, ls:-0.035, w:1360 }));
  const rw = add(root, AL('VERTICAL', { name:'Intro row', paddingLeft:40, paddingRight:40, paddingTop:48 }), true);
  const row = add(rw, AL('HORIZONTAL', { itemSpacing:20, paddingTop:14, name:'Row' }), true); border(row, INK, 2, 0);
  row.appendChild(T('Split, Croatia\nRemote', { ...A, s:'SemiBold', size:13, color:INK, lh:1.5, w:210 }));
  row.appendChild(T(OFFER, { ...A, s:'Medium', size:28, color:INK, lh:1.22, ls:-0.01, w:555, name:'Offer' }));
  const sp = figma.createFrame(); sp.name = 'col 8'; sp.fills = []; sp.resize(95, 1); row.appendChild(sp);
  const c = AL('VERTICAL', { itemSpacing:4, name:'Contact' }); row.appendChild(c); fixedW(c, 440);
  c.appendChild(T('Write to me', { ...A, s:'Regular', size:13, color:SOFT }));
  c.appendChild(T('ivankarlo@rukavina.app', { ...A, s:'Bold', size:30, color:INK, w:440, name:'Email (primary action)' }));
  c.appendChild(T('Reply within 24 hours. First consultation free.', { ...A, s:'Regular', size:13, color:SOFT, w:440 }));
  gap(root, 64);
  const field = add(root, AL('HORIZONTAL', { name:'Color field', itemSpacing:20, paddingLeft:40, paddingRight:40, paddingTop:56, paddingBottom:56 }), true); field.fills = solid(p.field);
  field.appendChild(T('Track record', { ...A, s:'SemiBold', size:13, color:p.on, w:210 }));
  field.appendChild(T("Apps I've built have reached over 50,000 users, mostly on government platforms.", { ...A, s:'Bold', size:52, color:p.on, lh:1.05, ls:-0.02, w:940 }));
  const sec = add(root, AL('HORIZONTAL', { name:'Work', itemSpacing:20, paddingLeft:40, paddingRight:40, paddingTop:64, paddingBottom:72 }), true);
  const idx = AL('VERTICAL', { itemSpacing:6, name:'Index' }); sec.appendChild(idx); fixedW(idx, 210);
  idx.appendChild(T('02', { ...A, s:'ExtraBold', size:44, color:INK, lh:1, ls:-0.03 }));
  idx.appendChild(T('Work', { ...A, s:'SemiBold', size:13, color:INK }));
  const list = AL('VERTICAL', { name:'List' }); sec.appendChild(list); fixedW(list, 1130);
  for (let r = 0; r < 2; r++) {
    const lr = add(list, AL('HORIZONTAL', { itemSpacing:20 }), true);
    for (const w of WORK.slice(r*2, r*2+2)) {
      const it = AL('VERTICAL', { name:w.name, paddingTop:14, paddingBottom:26 }); lr.appendChild(it); fixedW(it, 555); border(it, INK, 1, 0);
      it.appendChild(T(w.sw, { ...A, s:'SemiBold', size:12, color:INK, ls:0.04, upper:true }));
      gap(it, 8);
      it.appendChild(T(w.name, { ...A, s:'Bold', size:20, color:INK, ls:-0.01 }));
      gap(it, 6);
      it.appendChild(T(w.d, { ...A, s:'Regular', size:15, color:SOFT, lh:1.5, w:430 }));
    }
  }
  return root;
}
{ const secN = await placeSection('1 · Swiss grid', 'Strict 12-column grid, one bold color block, the email set large as the main action. Mobile: columns stack to one, the index column hides, work list becomes a single column. Note: the browser version stretches Archivo to 112% width; Figma only has the normal width, so the name reads slightly narrower here.');
const frames = PALS.map((p, i) => build(p, 'ABC'[i]));
PALS.forEach((p, i) => paletteLabel(secN, 80 + i*1600, 'ABC'[i], p));
finishSection(secN, frames);
results.push({ section: secN.name, frames: frames.map(f => f.name + " " + Math.round(f.height)) }); }
// ---------- 2 · Security printing ----------
await loadFonts([['Albert Sans','Regular'],['Albert Sans','Medium'],['Albert Sans','SemiBold'],['Marcellus','Regular'],['Red Hat Mono','Regular'],['Red Hat Mono','Medium']]);
const SP_PALS = [
  { name:'Ink green', ground:'#eef2ec', tint:'#dfe8df', ink:'#0f3f31', line:'#7fa292', mrz:'#0f3f31', mrzFg:'#e7efe8', mute:'#4b6a5e', sw:['#eef2ec','#7fa292','#0f3f31'] },
  { name:'Intaglio blue', ground:'#edf0f5', tint:'#dde3ee', ink:'#19335f', line:'#7d93b8', mrz:'#19335f', mrzFg:'#e8edf6', mute:'#4c5f80', sw:['#edf0f5','#7d93b8','#19335f'] },
  { name:'Burgundy', ground:'#f3eeee', tint:'#eadfe0', ink:'#5e1b27', line:'#b88c93', mrz:'#5e1b27', mrzFg:'#f6eced', mute:'#7d4e56', sw:['#f3eeee','#b88c93','#5e1b27'] },
];
const SP_WORK_K = ['PUBLIC · ANDROID · IOS · KOTLIN','PUBLIC · WEB · HR / EN','GOVERNMENT · NDA','PAYMENTS · NDA'];
function gcd(a, b) { return b ? gcd(b, a % b) : a; }
function rosettePath(Rr, r, d, cx, cy, R) {
  const k = R / (Rr - r + d), end = Math.PI * 2 * r / gcd(Rr, r); let s = '';
  for (let t = 0; t <= end + 0.01; t += 0.012) {
    const x = (Rr - r) * Math.cos(t) + d * Math.cos((Rr - r) / r * t), y = (Rr - r) * Math.sin(t) - d * Math.sin((Rr - r) / r * t);
    s += (t === 0 ? 'M' : 'L') + (cx + x * k).toFixed(1) + ' ' + (cy + y * k).toFixed(1);
  }
  return s;
}
function guillocheSvg(color) {
  const S = 760, c = S / 2, R = 360;
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + S + '" height="' + S + '" viewBox="0 0 ' + S + ' ' + S + '" fill="none">' +
    [[96,36,52,0.55],[96,40,44,0.4],[120,44,60,0.3]].map(([a,b,d,o]) => '<path d="' + rosettePath(a,b,d,c,c,R) + '" stroke="' + color + '" stroke-width="0.6" stroke-opacity="' + o + '"/>').join('') + '</svg>';
}
function wavesSvg(color, w) {
  let p = '';
  for (let n = 0; n < 14; n++) { let s = ''; for (let x = 0; x <= w; x += 4) { const y = 140 - n * 7 + Math.sin(x / 38 + n * 0.45) * 10 + Math.sin(x / 91 - n * 0.3) * 6; s += (x === 0 ? 'M' : 'L') + x + ' ' + y.toFixed(1); } p += '<path d="' + s + '" stroke="' + color + '" stroke-width="0.6" stroke-opacity="0.28"/>'; }
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="170" viewBox="0 0 ' + w + ' 170" fill="none">' + p + '</svg>';
}
function buildSecurity(p, letter) {
  const AS = { f:'Albert Sans' }, MONO = { f:'Red Hat Mono' }, SERIF = { f:'Marcellus', s:'Regular' };
  const root = AL('VERTICAL', { name:'Security printing · ' + letter + ' ' + p.name }); root.fills = solid(p.ground); fixedW(root, 1440); root.clipsContent = true;
  const inner = add(root, AL('VERTICAL', { name:'Inner', paddingLeft:44, paddingRight:44, paddingTop:22 }), true);
  const top = add(inner, AL('HORIZONTAL', { name:'Top bar', primaryAxisAlignItems:'SPACE_BETWEEN' }), true);
  top.appendChild(T('RUKAVINA.APP · EN · HR', { ...MONO, s:'Regular', size:13, color:p.mute, ls:0.06 }));
  const nav = AL('HORIZONTAL', { name:'Nav', itemSpacing:24 }); top.appendChild(nav);
  for (const l of ['Services','Work','For businesses','Contact']) nav.appendChild(T(l, { ...AS, s:'Medium', size:13, color:p.ink }));
  gap(inner, 18);
  const micro = figma.createFrame(); micro.name = 'Microtext rule'; micro.fills = []; micro.resize(1352, 10); micro.clipsContent = true; border(micro, p.line, 1, 1);
  inner.appendChild(micro);
  const mt = T('IVAN KARLO RUKAVINA · MOBILE · AI · ARCHITECTURE · '.repeat(14), { ...MONO, s:'Regular', size:6, color:p.line, ls:0.08 }); micro.appendChild(mt); mt.x = 0; mt.y = 1;
  const card = add(inner, AL('HORIZONTAL', { name:'ID card', itemSpacing:56, paddingTop:80, paddingBottom:48, counterAxisAlignItems:'MAX' }), true);
  const left = AL('VERTICAL', { itemSpacing:18, name:'Name + role' }); card.appendChild(left); fixedW(left, 720);
  left.appendChild(T('IVAN KARLO\nRUKAVINA', { ...SERIF, size:108, color:p.ink, lh:0.96, ls:0.01 }));
  left.appendChild(T(OFFER, { ...AS, s:'Regular', size:23, color:p.ink, lh:1.35, w:520 }));
  const fields = AL('VERTICAL', { itemSpacing:16, paddingTop:16, name:'Fields' }); card.appendChild(fields); fixedW(fields, 576); border(fields, p.ink, 1, 0);
  function field(parent, k, v, w, opts) {
    const f = AL('VERTICAL', { itemSpacing:3, name:k }); parent.appendChild(f); fixedW(f, w);
    f.appendChild(T(k, { ...AS, s:'Regular', size:11, color:p.mute, ls:0.12, upper:true }));
    f.appendChild(T(v, { ...AS, s: opts && opts.mail ? 'SemiBold' : 'Medium', size: opts && opts.big ? 20 : 16, color:p.ink, w, underline: opts && opts.mail }));
  }
  const r1 = add(fields, AL('HORIZONTAL', { itemSpacing:22 }), true);
  field(r1, 'Based in', 'Split, Croatia', 277); field(r1, 'Works', 'Remote', 277);
  field(fields, 'Track record', "Apps I've built have reached over 50,000 users, mostly on government platforms.", 576, { big:true });
  field(fields, 'Contact', 'ivankarlo@rukavina.app', 576, { big:true, mail:true });
  field(fields, 'Reply', 'Within 24 hours. First consultation free.', 576, { big:true });
  const mrz = add(root, AL('VERTICAL', { name:'Passport strip (contact)', paddingLeft:44, paddingRight:44, paddingTop:16, paddingBottom:16 }), true); mrz.fills = solid(p.mrz);
  for (const l of ['P<HRVRUKAVINA<<IVAN<KARLO<<<<<<<<<<<<<<<<<<', 'MOBILE<AI<ARCHITECTURE<<IVANKARLO@RUKAVINA.APP<<']) mrz.appendChild(T(l, { ...MONO, s:'Regular', size:17, color:p.mrzFg, ls:0.18, lh:1.6 }));
  const sec = add(root, AL('VERTICAL', { name:'Work', itemSpacing:22, paddingLeft:44, paddingRight:44, paddingTop:64, paddingBottom:72 }), true);
  sec.appendChild(T('WORK', { ...SERIF, size:38, color:p.ink, ls:0.02 }));
  const grid = add(sec, AL('VERTICAL', { itemSpacing:16, name:'Grid' }), true);
  for (let r = 0; r < 2; r++) {
    const gr = add(grid, AL('HORIZONTAL', { itemSpacing:16 }), true);
    WORK.slice(r*2, r*2+2).forEach((w, j) => {
      const e = AL('VERTICAL', { name:w.name, paddingLeft:20, paddingRight:20, paddingTop:18, paddingBottom:20 }); gr.appendChild(e); fixedW(e, 668);
      e.fills = solid(p.tint); border(e, p.line, 0, 0, 1); e.layoutSizingVertical = 'FILL';
      e.appendChild(T(SP_WORK_K[r*2+j], { ...MONO, s:'Regular', size:11, color:p.mute, ls:0.1 }));
      gap(e, 6); e.appendChild(T(w.name, { ...AS, s:'SemiBold', size:19, color:p.ink })); gap(e, 6);
      e.appendChild(T(w.d, { ...AS, s:'Regular', size:15, color:p.mute, lh:1.5, w:480 }));
    });
  }
  const g = figma.createNodeFromSvg(guillocheSvg(p.line)); g.name = 'Guilloche'; root.insertChild(0, g); g.layoutPositioning = 'ABSOLUTE'; g.x = 1123 - 380; g.y = 300 - 380;
  const wv = figma.createNodeFromSvg(wavesSvg(p.line, 1440)); wv.name = 'Wave band'; root.insertChild(1, wv); wv.layoutPositioning = 'ABSOLUTE'; wv.x = 0; wv.y = root.height - 200;
  return root;
}
{
  const s = await placeSection('2 · Security printing', 'A secure-document page: generated guilloche linework behind the name, microtext rules, and a passport-style strip that carries the contact line. Mobile: the name and fields stack, the work grid becomes one column, the strip scrolls sideways.');
  const fr = SP_PALS.map((p, i) => buildSecurity(p, 'ABC'[i]));
  SP_PALS.forEach((p, i) => paletteLabel(s, 80 + i*1600, 'ABC'[i], p));
  finishSection(s, fr);
  results.push({ section: s.name, frames: fr.map(f => f.name + ' ' + Math.round(f.height)) });
}
// ---------- 3 · Standard, done well ----------
await loadFonts([['Geist','Regular'],['Geist','Medium'],['Geist','SemiBold'],['Geist Mono','Regular']]);
const ST_PALS = [
  { name:'White and teal', bg:'#ffffff', fg:'#17191c', mute:'#5f646b', line:'#e6e7e9', accent:'#0e7c7b', sw:['#ffffff','#17191c','#0e7c7b'] },
  { name:'Graphite and amber', bg:'#141518', fg:'#ecebe8', mute:'#9b9ea4', line:'#2a2c31', accent:'#e8a33d', sw:['#141518','#ecebe8','#e8a33d'] },
  { name:'Stone and forest', bg:'#edebe6', fg:'#1d1f1c', mute:'#5f625b', line:'#d8d5cd', accent:'#2f5d46', sw:['#edebe6','#1d1f1c','#2f5d46'] },
];
const ST_META = ['Android · iOS · Kotlin','Web · HR / EN','Under NDA','Under NDA'];
function buildStandard(p, letter) {
  const G = { f:'Geist' }, GM = { f:'Geist Mono', s:'Regular' };
  const root = AL('VERTICAL', { name:'Standard · ' + letter + ' ' + p.name, paddingLeft:248, paddingRight:248, paddingTop:22 }); root.fills = solid(p.bg); fixedW(root, 1440); root.clipsContent = true;
  const top = add(root, AL('HORIZONTAL', { name:'Top bar', primaryAxisAlignItems:'SPACE_BETWEEN' }), true);
  top.appendChild(T('Ivan Karlo Rukavina', { ...G, s:'SemiBold', size:14, color:p.fg }));
  const nav = AL('HORIZONTAL', { name:'Nav', itemSpacing:22 }); top.appendChild(nav);
  for (const l of ['Services','Work','For businesses','Contact','HR']) nav.appendChild(T(l, { ...G, s:'Regular', size:14, color:p.mute }));
  const hero = add(root, AL('VERTICAL', { name:'Hero', paddingTop:104, paddingBottom:56 }), true);
  hero.appendChild(T('Senior software engineer for mobile, AI and architecture.', { ...G, s:'SemiBold', size:58, color:p.fg, lh:1.05, ls:-0.03, w:760 }));
  gap(hero, 20);
  hero.appendChild(T("I join teams as a contractor or own a product end to end. Apps I've built have reached over 50,000 users, mostly on government platforms. Based in Split, Croatia, working remotely.", { ...G, s:'Regular', size:20, color:p.mute, lh:1.5, w:620 }));
  gap(hero, 28);
  const act = AL('HORIZONTAL', { itemSpacing:20, counterAxisAlignItems:'CENTER', name:'Actions' }); hero.appendChild(act);
  const btn = AL('HORIZONTAL', { name:'Button', paddingLeft:18, paddingRight:18, paddingTop:11, paddingBottom:11, cornerRadius:6 }); btn.fills = solid(p.fg); act.appendChild(btn);
  btn.appendChild(T('Get in touch', { ...G, s:'Medium', size:15, color:p.bg }));
  act.appendChild(T('ivankarlo@rukavina.app', { ...GM, size:14, color:p.fg }));
  act.appendChild(T('Reply within 24 hours.', { ...G, s:'Regular', size:14, color:p.mute }));
  const sec = add(root, AL('HORIZONTAL', { name:'Work', itemSpacing:24, paddingTop:40, paddingBottom:56 }), true); border(sec, p.line, 1, 0);
  sec.appendChild(T('Work', { ...G, s:'Medium', size:14, color:p.mute, w:200 }));
  const list = AL('VERTICAL', { name:'List' }); sec.appendChild(list); fixedW(list, 720);
  WORK.forEach((w, i) => {
    const it = add(list, AL('VERTICAL', { name:w.name, itemSpacing:4, paddingTop: i === 0 ? 0 : 18, paddingBottom:18 }), true); border(it, p.line, 0, 1);
    const h = add(it, AL('HORIZONTAL', { primaryAxisAlignItems:'SPACE_BETWEEN', counterAxisAlignItems:'CENTER' }), true);
    h.appendChild(T(i === 2 ? 'Government platform' : w.name, { ...G, s:'SemiBold', size:18, color:p.fg, ls:-0.01 }));
    h.appendChild(T(ST_META[i], { ...GM, size:13, color:p.accent }));
    it.appendChild(T(w.d, { ...G, s:'Regular', size:15, color:p.mute, lh:1.5, w:620 }));
  });
  return root;
}
{
  const s = await placeSection('3 · Standard, done well', 'The category standard, played straight: a calm headline, one button and the work as a list. Mobile: the Work label moves above the list, meta drops under each title.');
  const fr = ST_PALS.map((p, i) => buildStandard(p, 'ABC'[i]));
  ST_PALS.forEach((p, i) => paletteLabel(s, 80 + i*1600, 'ABC'[i], p));
  finishSection(s, fr);
  results.push({ section: s.name, frames: fr.map(f => f.name + ' ' + Math.round(f.height)) });
}
return results;
