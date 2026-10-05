const themeButton = document.querySelector('#theme');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
let savedTheme; try { savedTheme = localStorage.getItem('rudra-theme'); } catch {}
function applyTheme(dark) {
 document.body.classList.toggle('dark', dark);
 document.documentElement.dataset.theme = dark ? 'dark' : 'light';
 themeButton?.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
 themeButton?.setAttribute('aria-pressed', String(dark));
 themeButton?.replaceChildren(dark ? '☀' : '◐');
 dispatchEvent(new CustomEvent('portfolio-theme-change', {detail:{dark}}));
}
applyTheme(savedTheme === 'dark' || savedTheme !== 'light' && systemTheme.matches);
systemTheme.addEventListener('change', event => { if (savedTheme !== 'light' && savedTheme !== 'dark') applyTheme(event.matches); });
themeButton?.addEventListener('click', () => { savedTheme = document.body.classList.contains('dark') ? 'light' : 'dark'; applyTheme(savedTheme === 'dark'); try { localStorage.setItem('rudra-theme', savedTheme); } catch {} });
function updateProgress() { const bar = document.querySelector('.reading-progress'); const distance = document.documentElement.scrollHeight - innerHeight; if (bar) bar.style.width = `${distance > 0 ? scrollY / distance * 100 : 0}%`; }
addEventListener('scroll', updateProgress, { passive: true }); addEventListener('resize', updateProgress); updateProgress();
document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));
const form = document.querySelector('.terminal-form');
if (form) {
 const output = document.querySelector('.terminal-output'); const input = form.querySelector('input'); const history = []; let position = 0;
 const commands = {
  "help": "Commands: about, currently, experience, projects, greetly, volution, research, education, skills, languages, contact, resume, clear, help",
  "about": "Rudra Patel · AI Engineer · ML Engineer · Researcher\nNew York City\n\nI got into AI for the real-world impact : tech that actually shows up for people when it matters, at the front desk, in the doctor's office, and in the classroom.\n\nI grew up in Brampton , did my B.S. in Computer Science at the University of Ottawa (GPA 3.70) while interning across government and healthcare, then founded Greet-ly , a voice AI receptionist that took real calls for real businesses. Now I'm at Columbia for my M.S. in AI, building Volution (🏆 1st place at Hackers & Healers) and working towards research on AI in education.\n\nWhat I care about: healthcare and education , AI that's fair to everyone , and taking ideas from a research paper all the way to production .\n\nOff the keyboard I'm an ITF Taekwondo black belt 🥋, a gym regular 🏋️, a dancer 💃, and I travel whenever I can ✈️.\n\nBrampton ➜ Ottawa ➜ New York 🗽",
  "currently": "🚀 Building Volution , 🏆 1st place at Hackers & Healers\n🦁 Studying for my M.S. in Artificial Intelligence at Columbia\n🧸 Working towards research on bias-free AI agents for education",
  "experience": "Founder & Developer · Greet-ly Brampton, ON · Jan 2026 – Jul 2026\nShipped a Dockerized voice AI platform wiring LLMs, Python, Node.js, n8n, Supabase/PostgreSQL and webhooks across 10+ workflows.\nBuilt LLM agents with tool calling + RAG for scheduling, insurance and availability, lifting call resolution from 63% → 84% .\nStress-tested tool-call accuracy and routing so the system handled ~80% of inbound calls and cut missed calls ~65%.\nRan pilots with 10 businesses and converted 2 into $500/mo contracts ( $1K MRR ), saving staff ~2 hrs/day.\nTools: LLMs RAG n8n Supabase Docker\n\nSoftware Developer (Co-op) · Public Health Agency of Canada Ottawa, ON · May 2025 – Aug 2025\nReplaced manual data processing with Python/SQL automation: 30–40% faster , 20% fewer errors.\nMigrated an Excel process into ETL pipelines with fuzzy record matching across thousands of rows, shrinking daily turnaround ~80% .\nTools: Python SQL ETL\n\nSoftware Engineer Intern · ISED Canada Ottawa, ON · Sep 2024 – Dec 2024\nBuilt secure cloud apps on AWS Amplify, Lambda, S3 and SNS: 35% better response efficiency .\nDeployed containerized services with Docker + Kubernetes, raising resource utilization 45% .\nTools: AWS Docker Kubernetes\n\nSoftware Development Intern · Trillium Health Care Products Brockville, ON · Jan 2024 – Apr 2024\nAutomated batch tracking with Azure Functions + Event Hubs, cutting QA delays 30% .\nBuilt demand-forecasting models in Azure ML: +25% planning accuracy , 40% faster inspection reports.\nTools: Azure ML Azure Functions Forecasting",
  "education": "● Currently studying\nColumbia University\nM.S. in Artificial Intelligence, AI and Advanced Computing\nNew York, NY · Expected Dec 2027\n\n✓ Graduated\nUniversity of Ottawa\nB.S. in Computer Science · GPA 3.70\nOttawa, ON · Jun 2026\nAI · Data Science · Probability & Statistics · Linear Algebra · Information Retrieval",
  "skills": "Frontend: React, Angular, HTML, CSS\nLanguages: Python, JavaScript, TypeScript, Go, Java, C++, C#, R, ◇ SQL\nBackend: Node.js, ◇ REST APIs, ◇ ETL pipelines, PostgreSQL\nCloud & DevOps: AWS, Azure, Docker, Kubernetes, Linux, ◇ CI/CD\nML & Data: PyTorch, scikit-learn, NumPy, pandas, ◇ Deep learning, ◇ Feature engineering\nTools & More: Git, n8n, ◇ Data analysis, ◇ Model evaluation\nAI Systems: ◇ LLMs, ◇ RAG, ◇ AI agents, ◇ Tool calling, ◇ Voice AI\nResearch & Methods: ◇ Diffusion models, ◇ Data augmentation, ◇ Statistical evaluation, ◇ Information retrieval",
  "languages": "English, Hindi, Gujarati: 5/5\nUrdu, Punjabi: 3/5",
  "contact": "Email: rp3403@columbia.edu\nLinkedIn: https://www.linkedin.com/in/rudra973/\nGitHub: https://github.com/RudraPatel973",
  "resume": "Download: https://rudra-patel-portfolio-lemon.vercel.app/assets/rudra-patel-resume.pdf (Resume link above)",
  "greetly": "GREETLY\n💸 $1K MRR · 10 pilots\n\nAn AI receptionist that never misses a call. Greet-ly answers the phone for small businesses and clinics, books appointments, checks insurance and availability, and answers questions from each business's own info. It handled ~80% of inbound calls and cut missed calls by ~65%.\n\nLLMs · RAG · Tool calling · n8n · Supabase · Node.js · Docker\n\nWebsite: https://greet-ly.com\nVoice demo: https://rudra-patel-portfolio-lemon.vercel.app/#greetly",
  "volution": "VOLUTION\n🏆 1st place · Hackers & Healers\n\nAn AI co-pilot for the doctor's office. Volution listens to the visit and recommends the right medication for that patient, based on age, height, weight, current and past conditions. Next, we're training models on visit recordings to catch subtle signals a doctor might miss.\n\nNext.js · TypeScript · Supabase · Claude API · Photon Health\n\nVolution — your one stop shop healthcare solution\nLive demo: https://demographarma.vercel.app\nCode: https://github.com/RudraPatel973/Volution",
  "research": "HONOURS THESIS 🌪️ · SEP – DEC 2025\n\nDiffusion-Based Data Augmentation for High-Impact, Low-Probability Events\n\nTornadoes are rare, which makes them hard to learn from. I trained a PyTorch denoising diffusion probabilistic model (DDPM) on 3,528 NOAA tornado events across nine spatiotemporal features, then used it to generate realistic synthetic storms.\n\n+28.3% dataset growth · 1,000 synthetic events\n+10% F1 on rare-event classification\n0.0548 Wasserstein distance\n0.86 / 0.87 real vs. synthetic correlation\nCode: https://github.com/RudraPatel973/hilp-dataAug-diffusionModels",
  "projects": "GREETLY\n💸 $1K MRR · 10 pilots\n\nAn AI receptionist that never misses a call. Greet-ly answers the phone for small businesses and clinics, books appointments, checks insurance and availability, and answers questions from each business's own info. It handled ~80% of inbound calls and cut missed calls by ~65%.\n\nLLMs · RAG · Tool calling · n8n · Supabase · Node.js · Docker\n\nWebsite: https://greet-ly.com\nVoice demo: https://rudra-patel-portfolio-lemon.vercel.app/#greetly\n\nVOLUTION\n🏆 1st place · Hackers & Healers\n\nAn AI co-pilot for the doctor's office. Volution listens to the visit and recommends the right medication for that patient, based on age, height, weight, current and past conditions. Next, we're training models on visit recordings to catch subtle signals a doctor might miss.\n\nNext.js · TypeScript · Supabase · Claude API · Photon Health\n\nVolution — your one stop shop healthcare solution\nLive demo: https://demographarma.vercel.app\nCode: https://github.com/RudraPatel973/Volution\n\nHONOURS THESIS 🌪️ · SEP – DEC 2025\n\nDiffusion-Based Data Augmentation for High-Impact, Low-Probability Events\n\nTornadoes are rare, which makes them hard to learn from. I trained a PyTorch denoising diffusion probabilistic model (DDPM) on 3,528 NOAA tornado events across nine spatiotemporal features, then used it to generate realistic synthetic storms.\n\n+28.3% dataset growth · 1,000 synthetic events\n+10% F1 on rare-event classification\n0.0548 Wasserstein distance\n0.86 / 0.87 real vs. synthetic correlation\nCode: https://github.com/RudraPatel973/hilp-dataAug-diffusionModels"
};
 form.addEventListener('submit', event => { event.preventDefault(); const raw = input.value.trim(); if (!raw) return; history.push(raw); position = history.length; const cmd = raw.toLowerCase(); if (cmd === 'clear') output.textContent = ''; else output.textContent += `\n> ${raw}\n${commands[cmd] ?? 'Unknown command. Type help for available commands.'}\n`; input.value = ''; input.focus(); });
 input.addEventListener('keydown', e => { if (e.key === 'ArrowUp') { e.preventDefault(); position = Math.max(0, position - 1); input.value = history[position] || ''; } if (e.key === 'ArrowDown') { e.preventDefault(); position = Math.min(history.length, position + 1); input.value = history[position] || ''; } });
}


// Reveal content only when motion is allowed; the unenhanced page stays readable.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
if (!motionPreference.matches && 'IntersectionObserver' in window) {
 document.body.classList.add('motion-enabled');
 const revealTargets = document.querySelectorAll('.about, .creator-item, .research-feature, .repo-card, .job, .skill-tile, .degree, .language-card, .personal .card');
 revealTargets.forEach((el, index) => { el.classList.add('reveal'); el.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * .08}s`); });
 const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }); }, {threshold:.08, rootMargin:'0px 0px -15px 0px'});
 document.querySelectorAll('.reveal, .paper-edge').forEach(el => observer.observe(el));
 const greeting = document.querySelector('.hero-greeting');
 if (greeting) {
  const target = greeting.textContent; let count = 0;
  const timer = setInterval(() => { const resolved = Math.floor(count / 2); greeting.textContent = [...target].map((char,index) => index < resolved || char === ' ' ? char : '!<>_+*'[Math.floor(Math.random()*6)]).join(''); count++; if (resolved >= [...target].length) { greeting.textContent = target; clearInterval(timer); } },45);
 }
}

// A phone-shaped voice demo; closing or ending removes the call connection.
const phoneDemo=document.querySelector('#greetly-dialog');
if(phoneDemo){
 const content=phoneDemo.querySelector('#greetly-demo-content');
 const start=phoneDemo.querySelector('.phone-call-button');
 const end=phoneDemo.querySelector('.phone-end-button');
 const reset=()=>{content.replaceChildren();start.hidden=false;end.hidden=true;phoneDemo.classList.remove('calling');};
 document.querySelectorAll('[data-greetly]').forEach(button=>button.addEventListener('click',()=>{reset();phoneDemo.showModal();}));
 start.addEventListener('click',()=>{
  const frame=document.createElement('iframe');frame.src='greetly-demo.html?inline=1';frame.title='Greet-ly live call';frame.allow='microphone';
  content.replaceChildren(frame);start.hidden=true;end.hidden=false;phoneDemo.classList.add('calling');
 });
 end.addEventListener('click',reset);
 phoneDemo.querySelector('.dialog-close').addEventListener('click',()=>phoneDemo.close());
 phoneDemo.addEventListener('close',reset);
 phoneDemo.addEventListener('click',event=>{if(event.target===phoneDemo){const r=phoneDemo.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)phoneDemo.close();}});
 window.addEventListener('pagehide',reset);
}

const journeyBook = document.querySelector('.journey-book');
if (journeyBook) {
 const cover = journeyBook.querySelector('.journey-cover');
 const setBookOpen = open => {
  journeyBook.classList.toggle('book-open',open);
  cover.setAttribute('aria-hidden',String(open)); cover.tabIndex=open?-1:0;
 };
 const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry=>{
   if(motionPreference.matches) setBookOpen(true);
   else if(!entry.isIntersecting) setBookOpen(false);
   else if(entry.intersectionRatio>=.2) setBookOpen(true);
  });
 }, {threshold:[0,.2]}) : null;
 cover.addEventListener('click',()=>setBookOpen(true));
 motionPreference.addEventListener('change',()=>{
  if(motionPreference.matches||!observer) setBookOpen(true);
  else {const bounds=journeyBook.getBoundingClientRect();setBookOpen(bounds.top<innerHeight&&bounds.bottom>0);}
 });
 if(motionPreference.matches||!observer)setBookOpen(true);
 if(observer)observer.observe(journeyBook);
}

// Native browser motion only: no dependencies, and responsive to Reduce Motion changes.
const ticker = document.querySelector('.ticker');
if (ticker) {
 const items = ticker.textContent.trim();
 const track = document.createElement('div'); track.className = 'ticker-track';
 for (let copy = 0; copy < 2; copy++) { const group = document.createElement('span'); group.className = 'ticker-items'; group.textContent = items; track.append(group); }
 ticker.replaceChildren(track);
 // Preserve the original short banner's pixel speed as the skill list grows.
 const setTickerPace = () => {
  const baseline = document.createElement('span'); baseline.className = 'ticker-items';
  baseline.textContent = 'PYTHON ✳ PYTORCH ✳ LLM AGENTS ✳ DATA PIPELINES ✳ CLOUD ✳ CURIOSITY ✳ PYTHON ✳ PYTORCH ✳';
  Object.assign(baseline.style,{position:'absolute',visibility:'hidden',pointerEvents:'none'});
  ticker.append(baseline);
  const oldWidth = baseline.getBoundingClientRect().width;
  const newWidth = track.firstElementChild.getBoundingClientRect().width;
  baseline.remove();
  if(oldWidth>0) track.style.animationDuration = `${30 * newWidth / oldWidth}s`;
 };
 setTickerPace(); document.fonts?.ready.then(setTickerPace);
 addEventListener('resize',setTickerPace);
}
const heroArt = document.querySelector('.hero-art');
const motionTokens = [...document.querySelectorAll('.hero-art .sticker, .hero-art .floating-token')].map(element => ({element, speed:.8 + Math.random() * .9, spin:(Math.random() < .5 ? -1 : 1) * (.07 + Math.random() * .08), hidden:element.getAttribute('aria-hidden')}));
const activeBursts = new Set();
let fallFrame = 0;
function updateTokenFall() {
 fallFrame = 0;
 if (motionPreference.matches || !document.body.classList.contains('motion-enabled')) return;
 const distance = Math.min(600, Math.max(0, scrollY));
 motionTokens.forEach(({element,speed,spin}) => {
  element.style.setProperty('--fall-y', `${Math.pow(distance,1.25) * speed * .4}px`);
  element.style.setProperty('--fall-angle', `${distance * spin}deg`);
  element.style.setProperty('--fall-opacity', String(Math.max(0,1-distance/600)));
  element.style.pointerEvents = distance >= 600 ? 'none' : '';
  element.tabIndex = distance >= 600 ? -1 : 0;
 });
}
function scheduleTokenFall() { if (!fallFrame && !motionPreference.matches) fallFrame = requestAnimationFrame(updateTokenFall); }
function burstSticker(element) {
 if (motionPreference.matches || !document.body.classList.contains('motion-enabled') || !heroArt) return;
 const pop = element.animate([{scale:'1'},{scale:'1.5',offset:.45},{scale:'.94',offset:.8},{scale:'1'}], {duration:500,easing:'cubic-bezier(.2,.8,.3,1.2)'});
 activeBursts.add(pop); pop.finished.catch(()=>{}).finally(()=>activeBursts.delete(pop));
 const bounds = element.getBoundingClientRect(), parent = heroArt.getBoundingClientRect();
 for (let n = 0; n < 8; n++) {
  const particle = element.cloneNode(true); particle.removeAttribute('id'); particle.removeAttribute('role'); particle.removeAttribute('tabindex'); particle.removeAttribute('aria-label'); particle.setAttribute('aria-hidden','true'); particle.classList.add('sticker-particle');
  const width = bounds.width * .38, height = bounds.height * .38;
  Object.assign(particle.style,{left:`${bounds.left-parent.left+bounds.width/2-width/2}px`,top:`${bounds.top-parent.top+bounds.height/2-height/2}px`,width:`${width}px`,height:`${height}px`,fontSize:`${parseFloat(getComputedStyle(element).fontSize)*.38}px`,padding:'2px',borderWidth:'1px'});
  heroArt.append(particle);
  const angle = n * Math.PI / 4;
  const flight = particle.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${Math.cos(angle)*70}px,${Math.sin(angle)*70}px) rotate(${n%2?45:-45}deg) scale(.35)`,opacity:0}],{duration:700,easing:'cubic-bezier(.15,.65,.3,1)'});
  activeBursts.add(flight);flight.finished.catch(()=>{}).finally(()=>{particle.remove();activeBursts.delete(flight);});
 }
}
motionTokens.forEach(({element})=>{
 element.addEventListener('click',()=>burstSticker(element));
 element.addEventListener('keydown',event=>{if (!motionPreference.matches && (event.key==='Enter'||event.key===' ')) {event.preventDefault();burstSticker(element);}});
});
function syncAdditionalMotion() {
 const enabled = !motionPreference.matches && 'IntersectionObserver' in window;
 document.body.classList.toggle('motion-enabled',enabled);
 motionTokens.forEach(({element,hidden})=>{
  if(enabled){element.removeAttribute('aria-hidden');element.setAttribute('role','button');element.setAttribute('aria-label',`Animate ${element.textContent.trim()} sticker`);element.tabIndex=0;}
  else{element.removeAttribute('role');element.removeAttribute('aria-label');element.removeAttribute('tabindex');if(hidden!==null)element.setAttribute('aria-hidden',hidden);['--fall-y','--fall-angle','--fall-opacity'].forEach(name=>element.style.removeProperty(name));element.style.pointerEvents='';}
 });
 if (!enabled) {cancelAnimationFrame(fallFrame);fallFrame=0;activeBursts.forEach(animation=>animation.cancel());document.querySelectorAll('.sticker-particle').forEach(element=>element.remove());}
 else scheduleTokenFall();
}
addEventListener('scroll',scheduleTokenFall,{passive:true});
motionPreference.addEventListener('change',syncAdditionalMotion);
syncAdditionalMotion();

// Sweep the retained bold highlights as each phrase enters view, including the scrolling timeline.
if ('IntersectionObserver' in window) {
 const markerObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('marker-visible'); markerObserver.unobserve(entry.target); } });
 }, {threshold: .1});
 document.querySelectorAll('.work-marker').forEach((marker, index) => {
  marker.classList.toggle('sweep-reverse', index % 2 === 1);
  markerObserver.observe(marker);
 });
}

// Scroll to page sections without adding fragments to the address bar.
const scrollToSection = target => {
 target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
};
const cleanSectionUrl = () => {
 if(location.hash)history.replaceState(history.state,'',location.pathname+location.search);
};
document.addEventListener('click',event=>{
 const link=event.target.closest('a[href^="#"]');
 if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.hasAttribute('download')||link.target==='_blank')return;
 const target=document.getElementById(link.getAttribute('href').slice(1));
 if(!target)return;
 event.preventDefault();scrollToSection(target);cleanSectionUrl();
});
// Existing shared section links still land on their section, then show a clean URL.
if(location.hash){
 const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));
 if(target)requestAnimationFrame(()=>{target.scrollIntoView({behavior:'instant',block:'start'});cleanSectionUrl();});
}

// Browser email options also work when no local mail application is configured.
const emailDialog=document.querySelector('#email-dialog');
if(emailDialog){
 document.querySelectorAll('[data-email], a[href^="mailto:"]').forEach(link=>{
  if(emailDialog.contains(link))return;
  link.addEventListener('click',event=>{
   if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   event.preventDefault();emailDialog.showModal();
  });
 });
 emailDialog.querySelector('[aria-label="Close email options"]').addEventListener('click',()=>emailDialog.close());
 emailDialog.addEventListener('click',event=>{if(event.target===emailDialog){const r=emailDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)emailDialog.close();}});
 emailDialog.querySelector('#copy-email').addEventListener('click',async()=>{
  const status=emailDialog.querySelector('#email-status');
  try{await navigator.clipboard.writeText('rp3403@columbia.edu');status.textContent='Email address copied.';}
  catch{status.textContent='Copy this address: rp3403@columbia.edu';}
 });
}
