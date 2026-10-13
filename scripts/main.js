/* ============================================================
   Promptera: main script
   1. Nav border, mobile menu, scroll reveals
   2. Contact context chip + Netlify form submit
   3. Cookie consent + Google Analytics
   ============================================================ */

(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* nav border on scroll */
  var nav = document.getElementById('nav');
  function syncNavScrolled(){
    if (window.scrollY > 8) { nav.classList.add('scrolled'); } else { nav.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', syncNavScrolled, {passive:true});
  syncNavScrolled();

  /* where-we-work accordion: one vertical open at a time */
  var vxItems = document.querySelectorAll('.vx-item');
  vxItems.forEach(function(item){
    item.querySelector('.vx-head').addEventListener('click', function(){
      var opening = !item.classList.contains('open');
      vxItems.forEach(function(other){
        other.classList.remove('open');
        other.querySelector('.vx-head').setAttribute('aria-expanded', 'false');
      });
      if (opening) {
        item.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* mobile hamburger menu */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  function closeMenu(){
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  function openMenu(){
    navToggle.classList.add('open');
    navMenu.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
  }
  navToggle.addEventListener('click', function(){
    if (navMenu.classList.contains('open')) { closeMenu(); } else { openMenu(); }
  });
  navMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('click', function(e){
    if (!navMenu.classList.contains('open')) { return; }
    if (!nav.contains(e.target)) { closeMenu(); }
  });
  window.addEventListener('resize', function(){
    if (window.innerWidth > 860) { closeMenu(); }
  });

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

})();

(function(){
  /* contact context chip: any [data-ctx] element scrolls to the form and pre-fills the topic */
  var ctxchip = document.getElementById('ctxchip'), ctxtext = document.getElementById('ctxtext'), ctxfield = document.getElementById('ctxfield');
  if (!ctxchip) { return; } /* pages without the contact form, e.g. cases/*.html */
  var topicSelect = document.getElementById('cs');
  function goContact(ctx, topic){
    if (topic && topicSelect) {
      for (var i = 0; i < topicSelect.options.length; i++) {
        if (topicSelect.options[i].value === topic) { topicSelect.selectedIndex = i; break; }
      }
    }
    if (ctx) {
      ctxtext.textContent = ctx;
      ctxchip.classList.add('on');
      if (ctxfield) { ctxfield.value = ctx; }
    }
    document.getElementById('contact').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
    setTimeout(function(){ document.getElementById('cn').focus({preventScroll:true}); }, 600);
  }
  document.getElementById('ctxclear').addEventListener('click', function(){
    ctxchip.classList.remove('on');
    ctxtext.textContent = '';
    if (ctxfield) { ctxfield.value = ''; }
  });
  document.querySelectorAll('[data-ctx]').forEach(function(el){
    el.addEventListener('click', function(e){ e.preventDefault(); goContact(el.getAttribute('data-ctx'), el.getAttribute('data-topic')); });
  });

  /* case study CTAs link here as index.html?ctx=...&topic=...#contact */
  var params = new URLSearchParams(window.location.search);
  if (params.get('ctx') || params.get('topic')) {
    goContact(params.get('ctx'), params.get('topic'));
    history.replaceState(null, '', window.location.pathname + window.location.hash);
  }

  /* Netlify form: AJAX submit for inline success (Netlify still records it) */
  var form = document.getElementById('cform');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = form.querySelector('.btn'), original = btn.textContent;
      btn.textContent = 'Sending…'; btn.disabled = true;
      var data = new URLSearchParams(new FormData(form)).toString();
      fetch('/', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:data})
        .then(function(r){
          if (r.ok) {
            btn.textContent = 'Request sent. We’ll reply within one working day';
            form.reset();
            ctxchip.classList.remove('on');
            ctxtext.textContent = '';
            if (ctxfield) { ctxfield.value = ''; }
            setTimeout(function(){ btn.textContent = original; btn.disabled = false; }, 6000);
          }
          else { throw new Error('bad status'); }
        })
        .catch(function(){
          btn.textContent = original; btn.disabled = false;
          alert('Something went wrong sending the form. Please email us directly at info@promptera.co.bw');
        });
    });
  }
})();

(function(){
  /* cookie consent + Google Analytics */
  var GA_ID = 'G-P02VX2PM8D';
  var gaLoaded = false;

  function loadGoogleAnalytics(){
    if (gaLoaded) { return; }
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  var cookieBanner = document.getElementById('cookieBanner');
  var cookieAccept = document.getElementById('cookieAccept');
  var cookieDecline = document.getElementById('cookieDecline');
  var cookiePrefsLink = document.getElementById('cookiePrefsLink');

  function showCookieBanner(){ cookieBanner.classList.add('show'); }
  function hideCookieBanner(){ cookieBanner.classList.remove('show'); }

  var consent = localStorage.getItem('cookie-consent');
  if (consent === 'accepted') {
    loadGoogleAnalytics();
  } else if (consent !== 'declined') {
    showCookieBanner();
  }

  cookieAccept.addEventListener('click', function(){
    localStorage.setItem('cookie-consent', 'accepted');
    loadGoogleAnalytics();
    hideCookieBanner();
  });

  cookieDecline.addEventListener('click', function(){
    localStorage.setItem('cookie-consent', 'declined');
    hideCookieBanner();
  });

  cookiePrefsLink.addEventListener('click', function(){
    localStorage.removeItem('cookie-consent');
    showCookieBanner();
  });
})();
