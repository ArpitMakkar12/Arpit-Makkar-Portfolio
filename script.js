/*Hero - Section*/

/* ── cursor ── */
const dot  = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.cssText = `left:${mx-4}px;top:${my-4}px`;
  if (typeof positionTooltip === 'function' && document.getElementById('skill-tt').style.display === 'block') positionTooltip(); // ← add this line
});
(function loop(){
  rx+=(mx-rx)*.11; ry+=(my-ry)*.11;
  ring.style.cssText=`left:${rx-16}px;top:${ry-16}px`;
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a,button,.btn').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ring.style.cssText+=';width:56px;height:56px;opacity:.8';dot.style.transform='scale(0)';});
  el.addEventListener('mouseleave',()=>{ring.style.cssText+=';width:32px;height:32px;opacity:.5';dot.style.transform='scale(1)';});
});

/* ── particles ── */
const cv=document.getElementById('pc'),ctx=cv.getContext('2d');
let W,H,pts=[];
function resize(){W=cv.width=innerWidth;H=cv.height=innerHeight;}
resize(); window.addEventListener('resize',resize);
function rnd(a,b){return a+Math.random()*(b-a);}
class P{
  constructor(){this.reset();}
  reset(){this.x=rnd(0,W);this.y=rnd(0,H);this.vx=rnd(-.2,.2);this.vy=rnd(-.45,-.08);this.r=rnd(.7,2.2);this.a=rnd(.1,.45);this.l=0;this.ml=rnd(180,380);}
  tick(){this.x+=this.vx;this.y+=this.vy;this.l++;if(this.l>this.ml||this.y<-8)this.reset();}
  draw(){const p=this.l/this.ml,f=p<.1?p*10:p>.8?(1-p)*5:1;ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(0,212,255,${this.a*f})`;ctx.fill();}
}
for(let i=0;i<80;i++)pts.push(new P());
(function frame(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{p.tick();p.draw();});requestAnimationFrame(frame);})();

/* ── typing ── */
const roles=['Computer Science Student','Data Science Enthusiast','AI / ML Explorer','Full-Stack Developer'];
let ri=0,ci=0,del=false,te=document.getElementById('typed-role');
function type(){
  const cur=roles[ri];
  if(!del){te.textContent=cur.slice(0,++ci);if(ci===cur.length){del=true;setTimeout(type,1900);return;}setTimeout(type,72);}
  else{te.textContent=cur.slice(0,--ci);if(ci===0){del=false;ri=(ri+1)%roles.length;setTimeout(type,420);return;}setTimeout(type,38);}
}
setTimeout(type,1300);

/* ── stat counters ── */
function countUp(){
  document.querySelectorAll('.stat-count').forEach(el=>{
    const target=+el.dataset.target, dur=1400;
    let start=null;
    function step(ts){
      if(!start)start=ts;
      const prog=Math.min((ts-start)/dur,1);
      el.textContent=Math.floor(prog*target);
      if(prog<1)requestAnimationFrame(step);
      else el.textContent=target;
    }
    requestAnimationFrame(step);
  });
}
setTimeout(countUp,1600);

/* ── marquee populate ── */
const skills=['Python','Machine Learning','React.js','Node.js','Data Science','AI & LLMs','MySQL','MongoDB','Git','AWS','JavaScript','Java','C++','Deep Learning','REST APIs','Firebase','Qiskit','Gemini LLM'];
const track=document.getElementById('marqueeTrack');
// duplicate for seamless loop
[...skills,...skills].forEach(s=>{
  const item=document.createElement('span');
  item.className='marquee-item';
  item.innerHTML=`<span class="m-dot">◆</span>${s}`;
  track.appendChild(item);
});

/* ── magnetic buttons (subtle pull toward cursor) ── */
document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const cx=r.left+r.width/2, cy=r.top+r.height/2;
    const dx=(e.clientX-cx)*.18, dy=(e.clientY-cy)*.18;
    btn.style.transform=`translate(${dx}px,${dy}px)`;
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform='';});
});

/* About - Section*/

/* reveal */
const revEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver(en => {
  en.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }});
}, { threshold: 0.1 });
revEls.forEach(el => io.observe(el));
setTimeout(() => revEls.forEach(el => el.classList.add('visible')), 120);

/* counters */
function countUp() {
  document.querySelectorAll('.stat-count').forEach(el => {
    const target = +el.dataset.target, dur = 1400;
    let start = null;
    (function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.floor(p * target);
      if (p < 1) requestAnimationFrame(step); else el.textContent = target;
    })(performance.now());
  });
}
const strip = document.querySelector('.stat-strip');
if (strip) {
  const sio = new IntersectionObserver(en => { if (en[0].isIntersecting) { countUp(); sio.disconnect(); }}, { threshold: 0.4 });
  sio.observe(strip);
}
setTimeout(countUp, 800);

/* ══ HAMBURGER NAV ══ */
const hamBtn     = document.getElementById('hamBtn');
const hamOverlay = document.getElementById('hamOverlay');
const hamItems   = document.querySelectorAll('.ham-item');
let hamOpen = false;

function toggleHam(force) {
  hamOpen = force !== undefined ? force : !hamOpen;
  hamBtn.classList.toggle('open', hamOpen);
  hamOverlay.classList.toggle('show', hamOpen);
  hamOverlay.setAttribute('aria-hidden', !hamOpen);
  document.body.style.overflow = hamOpen ? 'hidden' : '';
}

hamBtn.addEventListener('click', () => toggleHam());

/* Close on item click — smooth scroll then shut overlay */
hamItems.forEach(item => {
  item.addEventListener('click', () => {
    toggleHam(false);
  });
});

/* Close on Escape key */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && hamOpen) toggleHam(false);
});

/* ══ SCROLL — highlight active section in overlay ══ */
const navSections = [
  'hero-section','about','education','projects',
  'skills','experience','certification','footer'
];

window.addEventListener('scroll', () => {
  let current = 0;
  navSections.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) current = i;
  });
  hamItems.forEach((item, i) => item.classList.toggle('active', i === current));
  /* show dot on button when past hero */
  hamBtn.classList.toggle('has-section', window.scrollY > 80);
});

/*Education - Section*/
const eduIo = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); eduIo.unobserve(e.target); }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-tl],[data-stat]').forEach(el => eduIo.observe(el));

/*Projects - Section*/

const TOTAL  = 4;
let current  = 0;
let busy     = false;

const slidesTrack = document.getElementById('slidesTrack');
const dots   = document.querySelectorAll('.prog-dot');
const counter= document.getElementById('progCur');
const bgs    = document.querySelectorAll('.proj-bg');
const orbs   = document.querySelectorAll('.proj-orb');

function goTo(idx) {
  if (busy || idx === current || idx < 0 || idx >= TOTAL) return;
  busy = true;

  /* — move track: translate by idx × 100vh — */
  slidesTrack.style.transform = `translateY(-${idx * 100}vh)`;

  /* — swap backgrounds & orbs — */
  bgs.forEach((b, i)  => b.classList.toggle('active', i === idx));
  orbs.forEach((o, i) => o.classList.toggle('active', i === idx));

  /* — update dots & counter — */
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  counter.textContent  = String(idx + 1).padStart(2, '0');

  current = idx;
  setTimeout(() => { busy = false; }, 800);
}

document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));
document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.idx)));

/* keyboard */
document.addEventListener('keydown', e => {
  const projSec = document.getElementById('projects');
  const r = projSec.getBoundingClientRect();
  const inView = r.top <= 100 && r.bottom >= window.innerHeight - 100;
  if (!inView) return;
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(current + 1);
  if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goTo(current - 1);
});

/* swipe */
let tx = 0;
const sec = document.getElementById('projects');
sec.addEventListener('touchstart', e => { tx = e.touches[0].clientY; }, {passive:true});
sec.addEventListener('touchend',   e => {
  const dy = e.changedTouches[0].clientY - tx;
  if (Math.abs(dy) > 45) dy < 0 ? goTo(current + 1) : goTo(current - 1);
});

/*Skills - Section*/
/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const CAT = {
  'LANGUAGES':      { color:'#4a9eff', glow:'rgba(74,158,255,.35)',    orbit:108, speed:.0038, label:'Languages',     labelAngle: -0.5  },
  'FRAMEWORKS':     { color:'#00ffcc', glow:'rgba(0,255,204,.3)',       orbit:172, speed:.0028, label:'Frameworks',    labelAngle: -1.1  },
  'DATABASES':      { color:'#bf7fff', glow:'rgba(191,127,255,.3)',     orbit:236, speed:.0020, label:'Databases',     labelAngle:  1.1  },
  'TOOLS & DEVOPS': { color:'#ffb347', glow:'rgba(255,179,71,.28)',     orbit:304, speed:.0014, label:'Tools & DevOps',labelAngle:  0.5  },
  'AI & DATA':      { color:'#f472b6', glow:'rgba(244,114,182,.3)',     orbit:372, speed:.0010, label:'AI & Data',     labelAngle:  0.0  },
};

const SKILLS = [
  {name:'HTML5',        cat:'LANGUAGES',      level:90, tag:'ADVANCED',     abbr:'HT' },
  {name:'Java',         cat:'LANGUAGES',      level:88, tag:'ADVANCED',     abbr:'Jv' },
  {name:'Python',       cat:'LANGUAGES',      level:85, tag:'ADVANCED',     abbr:'Py' },
  {name:'CSS3',         cat:'LANGUAGES',      level:85, tag:'ADVANCED',     abbr:'CSS'},
  {name:'JavaScript',   cat:'LANGUAGES',      level:82, tag:'ADVANCED',     abbr:'JS' },
  {name:'C',            cat:'LANGUAGES',      level:75, tag:'INTERMEDIATE', abbr:'C'  },
  {name:'C++',          cat:'LANGUAGES',      level:72, tag:'INTERMEDIATE', abbr:'C++'},

  {name:'REST APIs',    cat:'FRAMEWORKS',     level:80, tag:'PROFICIENT',   abbr:'API'},
  {name:'ReactJS',      cat:'FRAMEWORKS',     level:80, tag:'PROFICIENT',   abbr:'Re' },
  {name:'Node.js',      cat:'FRAMEWORKS',     level:78, tag:'PROFICIENT',   abbr:'Nd' },
  {name:'Express.js',   cat:'FRAMEWORKS',     level:76, tag:'PROFICIENT',   abbr:'Ex' },
  {name:'JWT Auth',     cat:'FRAMEWORKS',     level:72, tag:'MEDIUM',       abbr:'JWT'},

  {name:'MySQL',        cat:'DATABASES',      level:78, tag:'PROFICIENT',   abbr:'SQL'},
  {name:'MongoDB',      cat:'DATABASES',      level:72, tag:'MEDIUM',       abbr:'MDB'},
  {name:'Firebase',     cat:'DATABASES',      level:68, tag:'MEDIUM',       abbr:'FB' },
  {name:'ChromaDB',     cat:'DATABASES',      level:65, tag:'MEDIUM',       abbr:'Chr'},

  {name:'Git',          cat:'TOOLS & DEVOPS', level:82, tag:'ADVANCED',     abbr:'Git'},
  {name:'GitHub',       cat:'TOOLS & DEVOPS', level:82, tag:'ADVANCED',     abbr:'GH' },
  {name:'Postman',      cat:'TOOLS & DEVOPS', level:75, tag:'PROFICIENT',   abbr:'PM' },
  {name:'Vercel',       cat:'TOOLS & DEVOPS', level:70, tag:'MEDIUM',       abbr:'Ve' },
  {name:'Render',       cat:'TOOLS & DEVOPS', level:68, tag:'MEDIUM',       abbr:'Rn' },
  {name:'AWS',          cat:'TOOLS & DEVOPS', level:65, tag:'MEDIUM',       abbr:'AWS'},
  {name:'Dataiku',      cat:'TOOLS & DEVOPS', level:65, tag:'MEDIUM',       abbr:'Dk' },
  {name:'Oracle Cloud', cat:'TOOLS & DEVOPS', level:60, tag:'MEDIUM',       abbr:'OC' },

  { name:'Scikit-learn', cat:'AI & DATA', level:75, tag:'PROFICIENT', abbr:'Sk'  },
  { name:'TensorFlow',   cat:'AI & DATA', level:68, tag:'PROFICIENT', abbr:'TF'  },
  { name:'Pandas',       cat:'AI & DATA', level:72, tag:'PROFICIENT', abbr:'Pd'  },
];

/* ═══════════════════════════════════════
   STARS
═══════════════════════════════════════ */
(function drawStars() {
  const c = document.getElementById('star-canvas');
  const ctx = c.getContext('2d');
  for (let i = 0; i < 180; i++) {
    const x = Math.random() * 840;
    const y = Math.random() * 840;
    const r = Math.random() * 1.2 + .2;
    const a = Math.random() * .45 + .05;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.fill();
  }
  /* Few cyan-tinted stars */
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * 840;
    const y = Math.random() * 840;
    const r = Math.random() * .8 + .3;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,212,255,${Math.random()*.3+.05})`;
    ctx.fill();
  }
})();

/* ═══════════════════════════════════════
   BUILD ORBIT RINGS + LABELS
═══════════════════════════════════════ */
const wrap = document.getElementById('solarWrap');
const CX = 420, CY = 420;

Object.entries(CAT).forEach(([catName, cfg]) => {
  const d = cfg.orbit * 2;
  const ring = document.createElement('div');
  ring.className = 'orbit-ring';
  ring.style.cssText = `
    width:${d}px; height:${d}px;
    border-color:${cfg.color}22;
    box-shadow:0 0 18px ${cfg.glow.replace('.3','0.04').replace('.35','0.04').replace('.28','0.04')};
  `;
  wrap.appendChild(ring);

  /* orbit label at right side */
  const lbl = document.createElement('div');
lbl.className = 'orbit-label';
lbl.textContent = cfg.label;
const lblX = CX + (cfg.orbit + 14) * Math.cos(cfg.labelAngle);
const lblY = CY + (cfg.orbit + 14) * Math.sin(cfg.labelAngle);
lbl.style.cssText = `
  left:${lblX}px;
  top:${lblY}px;
  transform: translate(-50%, -50%);
  color:${cfg.color};
  text-shadow:0 0 10px ${cfg.glow};
`;
wrap.appendChild(lbl);
});

/* ═══════════════════════════════════════
   BUILD PLANETS
═══════════════════════════════════════ */
const planets = [];

Object.entries(CAT).forEach(([catName, cfg], orbitIdx) => {
  const catSkills = SKILLS.filter(s => s.cat === catName);
  const tilt = orbitIdx * 0.62; /* different start angle per orbit */

  catSkills.forEach((skill, i) => {
    const startAngle = tilt + (i / catSkills.length) * Math.PI * 2;
    const size = Math.round(24 + (skill.level - 60) * 0.4);
    const fs   = size <= 26 ? 7 : size <= 30 ? 8 : 9;

    const el = document.createElement('div');
    el.className = 'planet';
    el.style.cssText = `
      width:${size}px; height:${size}px;
      background:${cfg.color}18;
      border:1.5px solid ${cfg.color}80;
      box-shadow:0 0 10px ${cfg.glow}, inset 0 0 6px ${cfg.color}10;
      font-size:${fs}px;
      color:${cfg.color};
    `;
    el.textContent = skill.abbr;

    /* Tooltip events */
    el.addEventListener('mouseenter', () => showTooltip(skill, cfg));
    el.addEventListener('mouseleave', hideTooltip);

    wrap.appendChild(el);
    planets.push({ el, orbit:cfg.orbit, angle:startAngle, speed:cfg.speed, size, skill, cfg });
  });
});

/* ═══════════════════════════════════════
   ANIMATION LOOP
═══════════════════════════════════════ */
let paused = false;

function tick() {
  if (!paused) {
    planets.forEach(p => {
      p.angle += p.speed;
      const x = CX + p.orbit * Math.cos(p.angle) - p.size / 2;
      const y = CY + p.orbit * Math.sin(p.angle) - p.size / 2;
      p.el.style.left = x + 'px';
      p.el.style.top  = y + 'px';
    });
  }
  requestAnimationFrame(tick);
}
tick();

/* ═══════════════════════════════════════
   SUN CLICK → PAUSE
═══════════════════════════════════════ */
document.getElementById('sun').addEventListener('click', () => {
  paused = !paused;
  document.getElementById('sun').classList.toggle('paused', paused);
});

/* ═══════════════════════════════════════
   TOOLTIP
═══════════════════════════════════════ */
const tt       = document.getElementById('skill-tt');
const ttName   = document.getElementById('tt-name');
const ttTag    = document.getElementById('tt-tag');
const ttBar    = document.getElementById('tt-bar');
const ttMeta   = document.getElementById('tt-meta');
// let mx = 0, my = 0;

// document.addEventListener('mousemove', e => {
//   mx = e.clientX; my = e.clientY;
//   if (tt.style.display === 'block') positionTooltip();
// });

function positionTooltip() {
  const tw = tt.offsetWidth  || 190;
  const th = tt.offsetHeight || 80;
  const vw = window.innerWidth, vh = window.innerHeight;
  let x = mx + 16, y = my - 10;
  if (x + tw > vw - 8) x = mx - tw - 16;
  if (y + th > vh - 8) y = vh - th - 8;
  if (y < 8) y = 8;
  tt.style.left = x + 'px';
  tt.style.top  = y + 'px';
}

function showTooltip(skill, cfg) {
  ttName.textContent = skill.name;
  ttTag.textContent  = skill.tag;
  ttTag.style.cssText = `background:${cfg.color}18;color:${cfg.color};border:1px solid ${cfg.color}40;`;
  ttBar.style.width   = skill.level + '%';
  ttBar.style.background = `linear-gradient(90deg,${cfg.color}80,${cfg.color})`;
  ttMeta.textContent  = `${skill.level}% proficiency  ·  ${cfg.label}`;
  tt.style.setProperty('--tt-accent', cfg.color);
  tt.style.display = 'block';
  positionTooltip();
}

function hideTooltip() { tt.style.display = 'none'; }

/* ═══════════════════════════════════════
   LEGEND
═══════════════════════════════════════ */
const legend = document.getElementById('legend');
Object.entries(CAT).forEach(([catName, cfg]) => {
  const catSkills = SKILLS.filter(s => s.cat === catName);
  const avg = Math.round(catSkills.reduce((a,s) => a+s.level, 0) / catSkills.length);
  const item = document.createElement('div');
  item.className = 'leg-item';
  item.innerHTML = `
    <div class="leg-dot" style="background:${cfg.color};box-shadow:0 0 6px ${cfg.glow};"></div>
    <span class="leg-label">${cfg.label}</span>
    <span class="leg-avg">${avg}%</span>
  `;
  legend.appendChild(item);
});

/* ═══════════════════════════════════════
   RESPONSIVE SCALE
═══════════════════════════════════════ */
function scaleSolar() {
  const outer = document.querySelector('.solar-outer').offsetWidth;
  const scale = Math.max(0.38, Math.min(1, outer / 860));
  wrap.style.transform = `scale(${scale})`;
  wrap.style.marginBottom = ((scale - 1) * 840) + 'px';
}
scaleSolar();
window.addEventListener('resize', scaleSolar);

/*Experience - Section*/
const flipped = [false, false, false];
let flipCount  = 0;

const countEl  = document.getElementById('flipCount');
const dotsEl   = document.querySelectorAll('.flip-dot');
const allDone  = document.getElementById('allDone');
const flipMeta = document.getElementById('flipMeta');


/* Staggered card entry */
const cards = document.querySelectorAll('.fc-wrap');
const cardIo = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.classList.add('entered');
        flipMeta.classList.add('visible');
      }, +e.target.dataset.card * 140);
      cardIo.unobserve(e.target);
    }
  });
}, { threshold:.15 });
cards.forEach(c => cardIo.observe(c));
setTimeout(() => {
  cards.forEach(c => c.classList.add('entered'));
  flipMeta.classList.add('visible');
}, 150);

/* ════════════════════════════════════
   FLIP LOGIC
════════════════════════════════════ */
function doFlip(card) {
  const idx = +card.dataset.card;
  const wasFlipped = flipped[idx];
  card.classList.toggle('flipped');
  flipped[idx] = !wasFlipped;

  if (!wasFlipped) {
    /* flipping open */
    flipCount++;
    dotsEl[idx].classList.add('done');
    countEl.textContent = flipCount;
    if (flipCount === 3) {
      setTimeout(() => allDone.classList.add('show'), 500);
    }
  } else {
    /* flipping back */
    flipCount--;
    dotsEl[idx].classList.remove('done');
    countEl.textContent = flipCount;
    allDone.classList.remove('show');
  }
}

cards.forEach(card => {
  card.addEventListener('click',  () => doFlip(card));
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); doFlip(card); }});
});

/* ════════════════════════════════════
   LAYER 1: MAGNETIC 3D TILT
   (desktop only — disabled on touch)
════════════════════════════════════ */
const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      if (card.classList.contains('flipped')) return;
      const r   = card.getBoundingClientRect();
      const cx  = r.left + r.width  / 2;
      const cy  = r.top  + r.height / 2;
      const dx  = (e.clientX - cx) / (r.width  / 2);
      const dy  = (e.clientY - cy) / (r.height / 2);
      const rx  = -dy * 10;
      const ry  =  dx * 10;
      card.querySelector('.fc-inner').style.transform =
        `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      const inner = card.querySelector('.fc-inner');
      if (card.classList.contains('flipped')) {
        inner.style.transform = 'rotateY(180deg)';
      } else {
        inner.style.transform = '';
      }
    });
  });
}

/* Certifications */
(function () {
  const section  = document.getElementById('certification');
  const stage    = document.getElementById('certStage');
  const cards    = Array.from(stage.querySelectorAll('.cert-cf-card'));
  const total    = cards.length;
  const dotsWrap = document.getElementById('certDots');
  const curEl    = document.getElementById('cfCur');
  const totalEl  = document.getElementById('cfTotal');
  let   active   = 0;

  /* Background tints & orbs */
  const certBgs  = Array.from(section.querySelectorAll('.cert-bg'));
  const certOrbs = Array.from(section.querySelectorAll('.cert-orb'));

  totalEl.textContent = String(total).padStart(2, '0');

  /* Build dots */
  cards.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'cf-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });
  const dots = Array.from(dotsWrap.querySelectorAll('.cf-dot'));

  /* Map offset to attribute string */
  function offsetStr(raw) {
    if (raw <= -4) return 'far-left';
    if (raw >= 4)  return 'far-right';
    return String(raw);
  }

  /* Render coverflow positions */
  function render() {
    cards.forEach((card, i) => {
      const offset = i - active;
      card.dataset.offset = offsetStr(offset);
    });

    /* Update counter */
    curEl.textContent = String(active + 1).padStart(2, '0');

    /* Update dots */
    dots.forEach((d, i) => d.classList.toggle('active', i === active));

    /* Swap background tints & orbs */
    certBgs.forEach((bg, i)   => bg.classList.toggle('active', i === active));
    certOrbs.forEach((orb, i) => orb.classList.toggle('active', i === active));
  }

  function goTo(idx) {
    active = ((idx % total) + total) % total;
    render();
  }

  /* Side-card click to navigate */
  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      const offset = parseInt(card.dataset.offset);
      if (offset !== 0 && !isNaN(offset)) goTo(i);
    });
  });

  /* Button nav */
  document.getElementById('cfPrev').addEventListener('click', () => goTo(active - 1));
  document.getElementById('cfNext').addEventListener('click', () => goTo(active + 1));

  /* Keyboard */
  document.addEventListener('keydown', e => {
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(active - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1); }
  });

  /* Touch / swipe */
  let touchStartX = 0;
  stage.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) dx < 0 ? goTo(active + 1) : goTo(active - 1);
  });

  render();
})();

/*Mail - Service*/

emailjs.init("WXNhsWFZEziPUiNTx");

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const emailInput = document.getElementById('visitorEmail');
  const submitBtn  = this.querySelector('button[type="submit"]');
  const email      = emailInput.value.trim();

  if (!email) return;

  // Disable button while sending
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

  emailjs.send("service_jz2e2sh", "template_bk5pnkh", {
    email: email,
    name: "Visitor"
  })
  .then(() => {
    // Success state
    emailInput.value       = '';
    emailInput.placeholder = 'Message sent ✓';
    submitBtn.innerHTML    = '<i class="fa-solid fa-check"></i>';

    setTimeout(() => {
      emailInput.placeholder  = 'Enter your email id';
      submitBtn.disabled      = false;
      submitBtn.innerHTML     = '<i class="fa-solid fa-arrow-right"></i>';
    }, 3000);
  })
  .catch(() => {
    // Error state
    emailInput.placeholder = 'Something went wrong, try again';
    submitBtn.disabled     = false;
    submitBtn.innerHTML    = '<i class="fa-solid fa-arrow-right"></i>';

    setTimeout(() => {
      emailInput.placeholder = 'Enter your email id';
    }, 3000);
  });
});