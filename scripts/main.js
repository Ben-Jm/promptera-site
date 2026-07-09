/* ============================================================
   Promptera — main script
   1. Nav border, scroll reveals, hero before/after demo, counters
   2. Modals (case studies + services) and contact context chip
   NOTE: testimonial quotes live in the DATA object below and are
   DRAFT placeholders — replace only with client-approved wording.
   ============================================================ */

(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* nav border on scroll */
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function(){
    if (window.scrollY > 8) { nav.classList.add('scrolled'); } else { nav.classList.remove('scrolled'); }
  }, {passive:true});

  /* reveal on scroll */
  var rvs = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    rvs.forEach(function(el){ io.observe(el); });
  } else {
    rvs.forEach(function(el){ el.classList.add('in'); });
  }

  /* hero before/after demo */
  var card = document.getElementById('formcard');
  var tb = document.getElementById('tb'), ta = document.getElementById('ta');
  var badge = document.getElementById('fbadge'), step = document.getElementById('fstep');
  var ftime = document.getElementById('ftime'), fcomp = document.getElementById('fcomp');
  var fsubmit = document.getElementById('fsubmit');
  var userTouched = false;
  function setState(after){
    if (after) {
      card.classList.remove('state-before'); card.classList.add('state-after');
      ta.classList.add('on'); tb.classList.remove('on');
      badge.textContent = '92% complete it';
      step.textContent = '1 of 1';
      ftime.textContent = '~6 min';
      fsubmit.textContent = 'Submit application';
    } else {
      card.classList.add('state-before'); card.classList.remove('state-after');
      tb.classList.add('on'); ta.classList.remove('on');
      badge.textContent = '34% complete it';
      step.textContent = '1 of 6';
      ftime.textContent = '~40 min';
      fsubmit.textContent = 'Submit for branch verification';
    }
  }
  tb.addEventListener('click', function(){ userTouched = true; setState(false); });
  ta.addEventListener('click', function(){ userTouched = true; setState(true); });
  if (!reduce) {
    var after = false;
    setInterval(function(){
      if (userTouched) { return; }
      after = !after;
      setState(after);
    }, 4200);
  }

  /* animated counters */
  function animate(el){
    var target = parseInt(el.getAttribute('data-count'), 10);
    var em = el.querySelector('em');
    var raw = em.textContent;
    var prefix = raw.indexOf('+') === 0 ? '+' : '';
    var suffix = raw.indexOf('%') > -1 ? '%' : '';
    if (reduce) { em.textContent = prefix + target + suffix; return; }
    var start = null, dur = 1200;
    function tick(ts){
      if (!start) { start = ts; }
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      em.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) { requestAnimationFrame(tick); }
    }
    requestAnimationFrame(tick);
  }
  var counted = false;
  var strip = document.querySelector('.strip');
  if ('IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting && !counted) {
          counted = true;
          document.querySelectorAll('.stat .n').forEach(animate);
          io2.disconnect();
        }
      });
    }, {threshold:0.4});
    io2.observe(strip);
  } else {
    document.querySelectorAll('.stat .n').forEach(animate);
  }
})();

(function(){
  /* NOTE: all quotes below are DRAFT placeholders — publish only after the client approves the wording. */
  var DATA = {
    cs1:{eyebrow:'Case study · Financial services',title:'Loan Application System',cta:'Fix a journey like this — start free',ctx:'Re: journey like the loan application case',
      body:'<h4>The situation</h4><p>A lending institution was watching a third of applications die halfway. The brief was "make the form look better" — but the problem was never how it looked.</p>'+
      '<h4>What we did</h4><p>We sat with real applicants and watched them fill it in. The form asked too much, in the wrong order, and punished mistakes after submission instead of preventing them. We redesigned the journey: fewer fields, errors caught at the start, steps ordered the way people actually think.</p>'+
      '<h4>Measured outcomes</h4><div class="m-stats"><div class="cs-stat"><div class="v">72%</div><div class="k">faster processing</div></div><div class="cs-stat"><div class="v">66→89%</div><div class="k">completion rate</div></div><div class="cs-stat"><div class="v">−45%</div><div class="k">support queries</div></div></div>'+
      '<div class="m-quote"><p>"We assumed we needed a new system. What we needed was to remove what was in the way."</p><div class="who">Operations lead, lending institution · [DRAFT — awaiting client approval]</div></div>'},
    cs2:{eyebrow:'Case study · Multi-sector digital',title:'Customer-Facing Platform',cta:'Fix a journey like this — start free',ctx:'Re: journey like the customer platform case',
      body:'<h4>The situation</h4><p>A customer platform was live, invested in, and quietly avoided. Customers defaulted to phoning instead — every call a sign the digital journey had failed them somewhere.</p>'+
      '<h4>What we did</h4><p>We mapped where people fell out of the digital journey and why they reached for the phone. Then we redesigned around what customers actually needed to find and do — removing steps, not adding features.</p>'+
      '<h4>Measured outcomes</h4><div class="m-stats"><div class="cs-stat"><div class="v">+156%</div><div class="k">engagement</div></div><div class="cs-stat"><div class="v">−44%</div><div class="k">call volume</div></div><div class="cs-stat"><div class="v">+41</div><div class="k">NPS</div></div></div>'+
      '<div class="m-quote"><p>"The platform stopped being something customers tolerated and became the way they preferred to reach us."</p><div class="who">Service manager, client organisation · [DRAFT — awaiting client approval]</div></div>'},
    cs3:{eyebrow:'Case study · Regulatory & enterprise',title:'Compliance Management Tools',cta:'Fix a journey like this — start free',ctx:'Re: journey like the compliance tools case',
      body:'<h4>The situation</h4><p>Compliance work lived in scattered documents and personal spreadsheets. Every audit meant weeks of reconstruction, and gaps were found late — when they were most expensive.</p>'+
      '<h4>What we did</h4><p>We shadowed the people doing the work, mapped the real process (not the documented one), and redesigned the tools around it — so compliance evidence was captured as work happened, not reconstructed after.</p>'+
      '<h4>Measured outcomes</h4><div class="m-stats"><div class="cs-stat"><div class="v">3×</div><div class="k">faster audit prep</div></div><div class="cs-stat"><div class="v">−67%</div><div class="k">compliance gaps</div></div></div>'+
      '<div class="m-quote"><p>"Audit season stopped being a crisis. The evidence was simply there."</p><div class="who">Compliance officer, client organisation · [DRAFT — awaiting client approval]</div></div>'},
    cs4:{eyebrow:'Case study · HR & internal adoption',title:'Interactive Culture Playbook',cta:'Fix a journey like this — start free',ctx:'Re: journey like the culture playbook case',
      body:'<h4>The situation</h4><p>The culture and onboarding material existed — as documents nobody opened. New hires learned by asking around, inconsistently, and took months to feel productive.</p>'+
      '<h4>What we did</h4><p>We redesigned the material as an interactive playbook built around what new employees actually need in their first weeks, in the order they need it — then measured whether people used it.</p>'+
      '<h4>Measured outcomes</h4><div class="m-stats"><div class="cs-stat"><div class="v">91%</div><div class="k">adoption</div></div><div class="cs-stat"><div class="v">−35%</div><div class="k">time-to-productivity</div></div></div>'+
      '<div class="m-quote"><p>"New hires stopped asking where things were. They just knew."</p><div class="who">HR lead, client organisation · [DRAFT — awaiting client approval]</div></div>'},
    sv1:{eyebrow:'The engine · Flagship',title:'Experience & Adoption Assessment',cta:'Book the free walk-through',ctx:'Re: Experience & Adoption Assessment',
      body:'<p>The full audit — digital, physical, or mixed. We walk the journey as your customers and staff experience it and show you exactly where value leaks.</p>'+
      '<h4>What\'s included</h4><ul><li>Journey walked customer-side and staff-side, built from observation</li><li>Adoption metrics and workaround inventory for the systems involved</li><li>Friction points ranked by what each is costing you</li><li>ROI Leakage Assessment — investment vs value actually realised</li><li>Prioritised fix roadmap, sequenced by effort and return</li></ul>'+
      '<h4>Who it\'s for</h4><p>Any organisation that implemented a system in the last three years, or runs a venue journey — store, branch, lodge, campus, clinic — that frustrates people.</p>'+
      '<div class="m-price"><span class="free-tag">Starts free — 2-hr walk-through</span> Full assessment: P15,000–50,000</div>'},
    sv2:{eyebrow:'The engine · Quick win',title:'Form & Process Redesign',cta:'Start with the free walk-through',ctx:'Re: Form & Process Redesign',
      body:'<p>One form or process people abandon or work around — fixed at a fixed price, measured before and after. Paper or digital.</p>'+
      '<h4>What\'s included</h4><ul><li>Observation of real people using the current form or process</li><li>Redesign: field order, plain language, error prevention, fewer steps</li><li>Before/after measurement — completion, time, support queries</li></ul>'+
      '<h4>Who it\'s for</h4><p>Applications customers abandon, internal processes staff route around, anything with a rejection or repeat-visit problem. Typical duration 2–4 weeks.</p>'+
      '<div class="m-price">P5,000–15,000 · fixed price per fix</div>'},
    sv3:{eyebrow:'The engine · Enterprise',title:'Adoption & Workflow Redesign',cta:'Start with the free walk-through',ctx:'Re: Adoption & Workflow Redesign',
      body:'<p>You bought the system — we make people actually use it. This is where assessment findings get implemented at scale.</p>'+
      '<h4>What\'s included</h4><ul><li>Workflows, approval flows, dashboards, and navigation redesigned around real behaviour</li><li>Service blueprints connecting staff-side systems to customer-side moments</li><li>Configuration changes — with specialist partners for deep platform work, while we own the experience and adoption layer</li></ul>'+
      '<h4>Who it\'s for</h4><p>Enterprises with a recent implementation and quiet frustration: usage below expectations, workarounds multiplying, KPIs that were supposed to move but haven\'t.</p>'+
      '<div class="m-price">P25,000–150,000+ · scoped from assessment findings</div>'},
    sv4:{eyebrow:'The engine · Efficiency add-on',title:'Smart Workflows & Automation',cta:'Start with the free walk-through',ctx:'Re: Smart Workflows & Automation',
      body:'<p>Kill duplicate data entry, manual report compilation, and copy-paste between systems — with smarter connections between tools you already own. No expensive new systems.</p>'+
      '<h4>What\'s included</h4><ul><li>Audit of repetitive, manual, and duplicated work</li><li>Automations built on Power Automate, Zapier, or your existing stack</li><li>Documentation so your team owns and maintains what we build</li></ul>'+
      '<h4>Who it\'s for</h4><p>Teams retyping the same data into two systems, compiling reports by hand, or running the business on copy-paste.</p>'+
      '<div class="m-price">P8,000–25,000</div>'},
    sv5:{eyebrow:'The engine · Retainer',title:'Adoption Program',cta:'Start with the free walk-through',ctx:'Re: Adoption Program (retainer)',
      body:'<p>We stay after the fix — so improvements stick and new friction gets caught early, instead of quietly accumulating again.</p>'+
      '<h4>What\'s included</h4><ul><li>Staff onboarding and training improvement</li><li>Ongoing user testing and change management support</li><li>Monthly KPI monitoring and reporting — adoption, completion, wait times</li></ul>'+
      '<h4>Who it\'s for</h4><p>Organisations that have completed a redesign and want the gains protected, or that keep seeing improvements decay after every initiative.</p>'+
      '<div class="m-price">P3,000–8,000/mo SME · P10,000–25,000/mo enterprise</div>'}
  };

  var mov=document.getElementById('mov'),mtitle=document.getElementById('mtitle'),
      meyebrow=document.getElementById('meyebrow'),mbody=document.getElementById('mbody'),
      mcta=document.getElementById('mcta'),mclose=document.getElementById('mclose');
  var lastFocus=null,currentCtx='';

  function openModal(key){
    var d=DATA[key]; if(!d){return;}
    lastFocus=document.activeElement;
    meyebrow.textContent=d.eyebrow; mtitle.textContent=d.title;
    mbody.innerHTML=d.body; mcta.textContent=d.cta; currentCtx=d.ctx;
    mov.classList.add('open'); mov.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    mclose.focus();
  }
  function closeModal(){
    mov.classList.remove('open'); mov.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    if(lastFocus){lastFocus.focus();}
  }
  mclose.addEventListener('click',closeModal);
  mov.addEventListener('click',function(e){ if(e.target===mov){closeModal();} });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&mov.classList.contains('open')){closeModal();} });

  document.querySelectorAll('[data-modal]').forEach(function(el){
    el.addEventListener('click',function(){ openModal(el.getAttribute('data-modal')); });
    el.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openModal(el.getAttribute('data-modal')); }
    });
  });

  function goContact(ctx){
    closeModal();
    var chip=document.getElementById('ctxchip'),txt=document.getElementById('ctxtext');
    if(ctx){ txt.textContent=ctx; chip.classList.add('on'); var f=document.getElementById('ctxfield'); if(f){f.value=ctx;} }
    document.getElementById('contact').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    setTimeout(function(){ document.getElementById('cn').focus({preventScroll:true}); }, 600);
  }
  mcta.addEventListener('click',function(){ goContact(currentCtx); });
  document.getElementById('ctxclear').addEventListener('click',function(){
    document.getElementById('ctxchip').classList.remove('on');
    document.getElementById('ctxtext').textContent='';
    var f=document.getElementById('ctxfield'); if(f){f.value='';}
  });
  document.querySelectorAll('[data-ctx]').forEach(function(el){
    el.addEventListener('click',function(e){ e.preventDefault(); goContact(el.getAttribute('data-ctx')); });
  });

  /* Netlify form: AJAX submit for inline success (Netlify still records it) */
  var form=document.getElementById('cform');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var btn=form.querySelector('.btn'), original=btn.textContent;
      btn.textContent='Sending…'; btn.disabled=true;
      var data=new URLSearchParams(new FormData(form)).toString();
      fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:data})
        .then(function(r){
          if(r.ok){ btn.textContent='Request sent — we\u2019ll reply within one working day'; }
          else{ throw new Error('bad status'); }
        })
        .catch(function(){
          btn.textContent=original; btn.disabled=false;
          alert('Something went wrong sending the form. Please email us directly at hello@promptera.co.bw');
        });
    });
  }

})();
