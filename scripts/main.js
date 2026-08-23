/* ============================================================
   Promptera: main script
   1. Nav border, scroll reveals, hero before/after demo, counters
   2. Modals (case studies + services) and contact context chip
   NOTE: testimonial quotes live in the DATA object below and are
   DRAFT placeholders. Replace only with client-approved wording.
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
  /* NOTE: all quotes below are DRAFT placeholders. Publish only after the client approves the wording. */
  var DATA = {
    cs1:{eyebrow:'Case study · Fintech & Lending',title:'Micro-Lender Onboarding',cta:'Fix a journey like this, start free',ctx:'Re: journey like the micro-lender onboarding case',
      body:'<h4>The situation</h4><p>A micro-lender had a working product and a real customer base. The experience around it was a mess, though. Borrowers dropped out partway through applications. Support queues stayed long. Staff couldn\'t see where a loan sat in the credit pipeline until someone went looking for it.</p>'+
      '<h4>What we did</h4><p>We redesigned both sides of the same journey at once. Borrowers got fewer steps, and documents got requested earlier instead of at the end. They could also save an application and pick it back up instead of starting from scratch. Staff got a rebuilt credit-stage view: open it and you can see where an application is stuck and what\'s needed to move it forward.</p>'+
      '<h4>Measured outcomes</h4><div class="m-stats"><div class="cs-stat"><div class="v">~40%</div><div class="k">less document processing time</div></div><div class="cs-stat"><div class="v">Weeks→days</div><div class="k">approval cycles</div></div><div class="cs-stat"><div class="v">Fewer</div><div class="k">support contacts</div></div></div>'
      /* '<div class="m-quote"><p>"We could finally see where a loan was stuck without asking three people. Customers stopped abandoning halfway."</p><div class="who">Operations lead, lending institution · [DRAFT: awaiting client approval]</div></div>' */},
    cs2:{eyebrow:'Case study · Multi-Sector Member Services',title:'Multi-Product Member Platform',cta:'Fix a journey like this, start free',ctx:'Re: journey like the member platform case',
      body:'<h4>The situation</h4><p>A member organisation offered ten-plus benefits: telecom, legal, loans, insurance. Each one ran on its own paper form, with its own pricing logic and its own queue. Members filled in the same details again and again. Staff cross-referenced applications by hand, and walk-in queues built up because there was no digital way in.</p>'+
      '<h4>What we did</h4><p>We watched real walk-in applications happen and talked to both members and staff to find where things broke down. Then we replaced the ten-plus separate applications with one flow. A real-time pricing engine took over the cross-referencing staff used to do by hand, and staff got a single view of every product a member held instead of hunting across files.</p>'+
      '<h4>Measured outcomes</h4><div class="m-stats"><div class="cs-stat"><div class="v">~65%</div><div class="k">less time per application</div></div><div class="cs-stat"><div class="v">10+→1</div><div class="k">forms consolidated</div></div><div class="cs-stat"><div class="v">Real-time</div><div class="k">pricing replaces manual checks</div></div></div>'
      /* '<div class="m-quote"><p>"Members stopped applying product by product. Staff stopped re-entering the same details all day."</p><div class="who">Programme administrator, member organisation · [DRAFT: awaiting client approval]</div></div>' */},
    cs3:{eyebrow:'Case study · Compliance & Operations',title:'Vendor Compliance Platform',cta:'Fix a journey like this, start free',ctx:'Re: journey like the vendor compliance case',
      body:'<h4>The situation</h4><p>Safety compliance officers at a mining operation reviewed every vendor document by hand. Documents arrived by email and got tracked across spreadsheets and inboxes. During peak periods, plant shutdowns especially, the volume outran the process, and vendors sometimes got cleared with gaps still in their paperwork.</p>'+
      '<h4>What we did</h4><p>We moved the process out of inboxes and into one shared system. Vendors upload and track their own compliance documents now, and expiry or renewal gets surfaced before it turns into a blocker. Officers can see every vendor\'s status without digging, and gaps get flagged automatically instead of turning up during an audit.</p>'+
      '<h4>Measured outcomes</h4><div class="m-stats"><div class="cs-stat"><div class="v">65%</div><div class="k">less paper-based workload</div></div><div class="cs-stat"><div class="v">Self-serve</div><div class="k">uploads replace manual checks</div></div><div class="cs-stat"><div class="v">Full</div><div class="k">audit trail visibility</div></div></div>'
      /* '<div class="m-quote"><p>"We stopped finding out about a gap during a shutdown. We could see it coming weeks earlier."</p><div class="who">Safety, health &amp; environment officer, mining operation · [DRAFT: awaiting client approval]</div></div>' */},
    cs4:{eyebrow:'Case study · Financial Services',title:'BSB: Tiered Debit Card Range',cta:'Fix a journey like this, start free',ctx:'Re: journey like the tiered debit card case',
      body:'<h4>The situation</h4><p>BSB needed three debit card tiers, one for each customer segment. Customers would carry them side by side, though, and staff had to recognise which was which across a counter in seconds. Picking three colours would\'ve been the easy way out. The real problem was how much a tier could change before it stopped reading like the same bank, and how much had to stay locked down before customers couldn\'t tell the tiers apart at all.</p>'+
      '<h4>What we did</h4><p>We designed the family first: the shared grid, brand cues, and typography that mark any card in the range as BSB\'s own. Only after that did we touch a single tier, changing colour, finish, and the small hierarchy shifts a hand notices before the eye does. Every spec was built around how a card actually behaves in a wallet, on a counter, passed across a till a dozen times a day.</p>'+
      '<h4>Measured outcomes</h4><div class="m-stats"><div class="cs-stat"><div class="v">3 tiers</div><div class="k">delivered within one brand family</div></div><div class="cs-stat"><div class="v">At a glance</div><div class="k">tiers recognisable without a label</div></div><div class="cs-stat"><div class="v">Production-ready</div><div class="k">specs handed to manufacturing</div></div></div>'
      /* '<div class="m-quote"><p>"Customers know which card is theirs before they even look at the name on it. That\'s not something you get from picking three colours."</p><div class="who">Product lead, BSB · [DRAFT: awaiting client approval]</div></div>' */},
    sv1:{eyebrow:'The engine · Flagship',title:'Experience & Adoption Assessment',cta:'Book the free walk-through',ctx:'Re: Experience & Adoption Assessment',
      body:'<p>The full audit, covering digital, physical, or a mix of both. We walk the journey the way your customers and staff actually experience it and show you exactly where value leaks.</p>'+
      '<h4>What\'s included</h4><ul><li>Journey walked customer-side and staff-side, built from observation</li><li>Adoption metrics and workaround inventory for the systems involved</li><li>Friction points ranked by what each is costing you</li><li>ROI Leakage Assessment: what you invested versus the value you\'re actually getting</li><li>Prioritised fix roadmap, sequenced by effort and return</li></ul>'+
      '<h4>Who it\'s for</h4><p>Any organisation that put in a new system in the last three years, or runs a venue journey (store, branch, lodge, campus, clinic) that frustrates people.</p>'+
      '<div class="m-price"><span class="free-tag">Starts free, 2-hr walk-through</span> Full assessment</div>'},
    sv2:{eyebrow:'The engine · Quick win',title:'Form & Process Redesign',cta:'Start with the free walk-through',ctx:'Re: Form & Process Redesign',
      body:'<p>One form or process people abandon or work around, fixed at a fixed price, measured before and after. Paper or digital, doesn\'t matter.</p>'+
      '<h4>What\'s included</h4><ul><li>Observation of real people using the current form or process</li><li>Redesign: field order, plain language, error prevention, fewer steps</li><li>Before/after measurement: completion, time, support queries</li></ul>'+
      '<h4>Who it\'s for</h4><p>Applications customers abandon, internal processes staff route around, anything with a rejection or repeat-visit problem. Typical duration 2–4 weeks.</p>'+
      '<div class="m-price">Fixed price per fix</div>'},
    sv3:{eyebrow:'The engine · Enterprise',title:'Adoption & Workflow Redesign',cta:'Start with the free walk-through',ctx:'Re: Adoption & Workflow Redesign',
      body:'<p>You bought the system. We make people actually use it. This is where assessment findings get implemented at scale.</p>'+
      '<h4>What\'s included</h4><ul><li>Workflows, approval flows, dashboards, and navigation redesigned around real behaviour</li><li>Service blueprints connecting staff-side systems to customer-side moments</li><li>Configuration changes done with specialist partners for deep platform work, while we own the experience and adoption layer</li></ul>'+
      '<h4>Who it\'s for</h4><p>Enterprises with a recent implementation and quiet frustration: usage below expectations, workarounds multiplying, KPIs that were supposed to move but haven\'t.</p>'+
      '<div class="m-price">Scoped from assessment findings</div>'},
    sv4:{eyebrow:'The engine · Efficiency add-on',title:'Smart Workflows & Time-Savers',cta:'Start with the free walk-through',ctx:'Re: Smart Workflows & Time-Savers',
      body:'<p>Kill duplicate data entry, manual report compilation, and copy-paste between systems. Just smarter connections between tools you already own. No expensive new systems needed.</p>'+
      '<h4>What\'s included</h4><ul><li>Audit of repetitive, manual, and duplicated work</li><li>Automations built on Power Automate, Zapier, or your existing stack</li><li>Documentation so your team owns and maintains what we build</li></ul>'+
      '<h4>Who it\'s for</h4><p>Teams retyping the same data into two systems, compiling reports by hand, or running the business on copy-paste.</p>'+
      '<div class="m-price"></div>'},
    sv5:{eyebrow:'The engine · Retainer',title:'Adoption Program',cta:'Start with the free walk-through',ctx:'Re: Adoption Program (retainer)',
      body:'<p>We stay on after the fix, so improvements stick and new friction gets caught early instead of quietly piling up again.</p>'+
      '<h4>What\'s included</h4><ul><li>Staff onboarding and training improvement</li><li>Ongoing user testing and change management support</li><li>Monthly KPI monitoring and reporting: adoption, completion, wait times</li></ul>'+
      '<h4>Who it\'s for</h4><p>Organisations that have completed a redesign and want the gains protected, or that keep seeing improvements decay after every initiative.</p>'+
      '<div class="m-price"></div>'}
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
          if(r.ok){
            btn.textContent='Request sent. We\u2019ll reply within one working day';
            form.reset();
            document.getElementById('ctxchip').classList.remove('on');
            document.getElementById('ctxtext').textContent='';
            document.getElementById('ctxfield').value='';
            setTimeout(function(){ btn.textContent=original; btn.disabled=false; },6000);
          }
          else{ throw new Error('bad status'); }
        })
        .catch(function(){
          btn.textContent=original; btn.disabled=false;
          alert('Something went wrong sending the form. Please email us directly at info@promptera.co.bw');
        });
    });
  }

})();
