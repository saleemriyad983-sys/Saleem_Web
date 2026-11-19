/* =====================================================================
 *  main.js — rendering, language switching, animations, dialogs, form.
 *  You normally do NOT need to edit this file; edit js/data.js and
 *  js/i18n.js instead.
 * ===================================================================== */
(function () {
  'use strict';

  var D = window.SITE_DATA;
  var T = window.I18N;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ------------------------------------------------------------------
   * Language helpers
   * ------------------------------------------------------------------ */
  var lang = 'en';
  try {
    var saved = localStorage.getItem('lang');
    if (saved === 'ar' || saved === 'en') lang = saved;
  } catch (e) { /* storage blocked: stay with default */ }

  /** Pick the current-language value from {en, ar}; plain values pass through. */
  function L(v) {
    if (v && typeof v === 'object' && !Array.isArray(v)) return v[lang] != null ? v[lang] : (v.en != null ? v.en : '');
    return v == null ? '' : v;
  }
  /** Look up an interface string by dotted key, e.g. t('nav.home'). */
  function t(key) {
    var v = key.split('.').reduce(function (o, k) { return o ? o[k] : undefined; }, T[lang]);
    return v == null ? key : v;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  /** Only allow http(s), mailto and relative URLs. */
  function safeUrl(u) {
    if (!u) return '';
    u = String(u).trim();
    if (/^(https?:|mailto:)/i.test(u) || !/^[a-z][a-z0-9+.-]*:/i.test(u)) return u;
    return '';
  }

  /* ------------------------------------------------------------------
   * Icons (inline SVG, no external dependency)
   * ------------------------------------------------------------------ */
  var ICONS = {
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
    send: '<path d="m22 2-7 20-4-9-9-4 20-7zM22 2 11 13"/>',
    expand: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
    grad: '<path d="M22 10 12 5 2 10l10 5 10-5zM6 12v5c3 3 9 3 12 0v-5"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/>'
  };
  function icon(name) {
    return '<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (ICONS[name] || ICONS.link) + '</svg>';
  }

  /* ------------------------------------------------------------------
   * Images (placeholder + automatic fallback when a file is missing)
   * ------------------------------------------------------------------ */
  var PH = D.settings.placeholders;
  function imgSrc(src, kind) { return src ? src : PH[kind]; }
  function setImg(el, src, kind, alt) {
    el.dataset.fallback = kind;
    el.alt = alt || '';
    el.src = imgSrc(src, kind);
  }
  document.addEventListener('error', function (e) {
    var el = e.target;
    if (el && el.tagName === 'IMG' && el.dataset.fallback) {
      var fb = PH[el.dataset.fallback];
      if (fb && el.getAttribute('src') !== fb) el.src = fb;
    }
  }, true);

  /* ------------------------------------------------------------------
   * Static translation pass (data-i18n, data-bind, aria, placeholders)
   * ------------------------------------------------------------------ */
  function applyStatic() {
    var p = D.profile;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = t('meta.title');
    var md = $('meta[name="description"]'); if (md) md.setAttribute('content', t('meta.description'));
    var ot = $('meta[property="og:title"]'); if (ot) ot.setAttribute('content', t('meta.title'));
    var od = $('meta[property="og:description"]'); if (od) od.setAttribute('content', t('meta.description'));

    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    $$('[data-i18n-placeholder]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder'))); });
    $$('[data-bind]').forEach(function (el) { el.textContent = L(p[el.getAttribute('data-bind')]); });
    $$('[data-icon]').forEach(function (el) { if (!el.firstChild) el.innerHTML = icon(el.getAttribute('data-icon')); });

    $$('.lang-switch button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    var burger = $('#burger');
    burger.setAttribute('aria-label', t($('#navLinks').classList.contains('open') ? 'nav.closeMenu' : 'nav.menu'));

    setImg($('#heroPhoto'), p.photo, 'profile', t('hero.photoAlt'));
    setImg($('#aboutPhoto'), p.photo, 'profile', t('hero.photoAlt'));
    $('#year').textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------
   * Dynamic renderers
   * ------------------------------------------------------------------ */
  var firstRender = true;
  function revealAttrs(i) { return firstRender ? ' reveal" style="--i:' + (i % 6) : ''; }

  function socialIcons(cls) {
    return D.social.map(function (s) {
      var url = safeUrl(s.url);
      if (url) return '<li><a class="social-btn" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(s.label) + '">' + icon(s.icon) + '</a></li>';
      return '<li><span class="social-btn" aria-disabled="true" role="img" aria-label="' + esc(s.label + ' — ' + t('contact.linkMissing')) + '" title="' + esc(t('contact.linkMissing')) + '">' + icon(s.icon) + '</span></li>';
    }).join('');
  }

  function renderHero() {
    $('#heroSocial').innerHTML = socialIcons();
    var pos = [[2, 6], [8, 78], [46, -6], [50, 88], [84, 12], [88, 70]];
    $('#heroFloats').innerHTML = D.profile.floatingTech.slice(0, 6).map(function (txt, i) {
      var p = pos[i % pos.length];
      return '<span style="top:' + p[0] + '%;left:' + p[1] + '%;--d:' + (i * 0.7) + 's">' + esc(txt) + '</span>';
    }).join('');
  }

  function renderAbout() {
    var p = D.profile;
    $('#aboutEdu').innerHTML = p.education.map(function (e) {
      return '<li><strong>' + esc(L(e.degree)) + '</strong><span>' + esc(L(e.school)) + '</span><br><small>' + esc(L(e.period)) + '</small></li>';
    }).join('');
    $('#aboutExp').innerHTML = p.experience.map(function (e) {
      return '<li><strong>' + esc(L(e.role)) + '</strong><span>' + esc(L(e.org)) + '</span><br><small>' + esc(L(e.period)) + '</small><p>' + esc(L(e.desc)) + '</p></li>';
    }).join('');
    $('#aboutInterests').innerHTML = p.interests.map(function (i) { return '<li>' + esc(L(i)) + '</li>'; }).join('');
    $('#statsGrid').innerHTML = p.stats.map(function (s, i) {
      var num = /^\d+$/.test(String(s.value));
      return '<li class="stat' + revealAttrs(i) + '"><b' + (num ? ' data-count="' + s.value + '"' : '') + '>' + esc(s.value) + '</b><span>' + esc(L(s.label)) + '</span></li>';
    }).join('');
  }

  function renderSkills() {
    $('#skillsGrid').innerHTML = D.skills.map(function (cat, ci) {
      var items = cat.items.map(function (s) {
        var lvl = s.level ? Math.max(1, Math.min(5, Math.round(s.level))) : 0;
        var dots = '';
        if (lvl) {
          dots = '<span class="dots" role="img" aria-label="' + esc(t('skills.level').replace('{n}', lvl)) + '">';
          for (var i = 1; i <= 5; i++) dots += '<i class="' + (i <= lvl ? 'on' : '') + '"></i>';
          dots += '</span>';
        }
        return '<li class="skill"><span class="skill-badge" aria-hidden="true">' + esc(s.abbr || s.name.slice(0, 2)) + '</span><span class="skill-name">' + esc(s.name) + '</span>' + dots + '</li>';
      }).join('');
      return '<article class="skill-card glass' + revealAttrs(ci) + '" data-tilt><h3>' + esc(L(cat.title)) + '</h3><ul class="skill-list">' + items + '</ul></article>';
    }).join('');
  }

  var activeCat = 'all';
  function renderFilters() {
    var cats = [{ id: 'all', label: t('projects.all') }].concat(D.projectCategories.map(function (c) { return { id: c.id, label: L(c.label) }; }));
    $('#projectFilters').innerHTML = cats.map(function (c) {
      return '<button type="button" class="filter" data-cat="' + esc(c.id) + '" aria-pressed="' + (c.id === activeCat) + '">' + esc(c.label) + '</button>';
    }).join('');
  }
  function catLabel(id) {
    var c = D.projectCategories.filter(function (x) { return x.id === id; })[0];
    return c ? L(c.label) : '';
  }
  function linkBtn(url, labelKey, ico, cls) {
    var u = safeUrl(url);
    if (u) return '<a class="btn ' + cls + ' btn-sm" href="' + esc(u) + '" target="_blank" rel="noopener noreferrer">' + esc(t(labelKey)) + icon(ico) + '</a>';
    return '<button type="button" class="btn ' + cls + ' btn-sm" disabled title="' + esc(t('projects.noLink')) + '">' + esc(t(labelKey)) + icon(ico) + '</button>';
  }
  function renderProjects() {
    var list = D.projects.filter(function (p) { return activeCat === 'all' || p.category === activeCat; });
    if (!list.length) { $('#projectsGrid').innerHTML = '<p class="empty">' + esc(t('projects.empty')) + '</p>'; return; }
    $('#projectsGrid').innerHTML = list.map(function (p, i) {
      return '<article class="card' + (firstRender ? ' reveal" style="--i:' + (i % 6) : '') + '" data-tilt>' +
        '<button type="button" class="card-media" data-open-project="' + esc(p.id) + '" aria-label="' + esc(t('projects.details') + ': ' + L(p.title)) + '">' +
        '<img src="' + esc(imgSrc(p.image, 'project')) + '" data-fallback="project" alt="" loading="lazy" decoding="async" width="800" height="500">' +
        '<span class="expand-ico">' + icon('expand') + '</span></button>' +
        '<div class="card-body"><span class="tag">' + esc(catLabel(p.category)) + '</span>' +
        '<h3>' + esc(L(p.title)) + '</h3><p>' + esc(L(p.description)) + '</p>' +
        '<ul class="chips">' + p.tech.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
        '<div class="card-actions">' + linkBtn(p.links && p.links.demo, 'projects.demo', 'external', 'btn-primary') +
        linkBtn(p.links && p.links.source, 'projects.source', 'github', 'btn-ghost') +
        '<button type="button" class="btn btn-ghost btn-sm" data-open-project="' + esc(p.id) + '">' + esc(t('projects.details')) + '<span class="flip">' + icon('arrow') + '</span></button>' +
        '</div></div></article>';
    }).join('');
  }

  function renderCerts() {
    if (!D.certificates.length) { $('#certGrid').innerHTML = '<p class="empty">' + esc(t('certs.empty')) + '</p>'; return; }
    $('#certGrid').innerHTML = D.certificates.map(function (c, i) {
      return '<article class="card' + (firstRender ? ' reveal" style="--i:' + (i % 6) : '') + '" data-tilt>' +
        '<button type="button" class="card-media" data-open-cert="' + esc(c.id) + '" aria-label="' + esc(t('certs.view') + ': ' + L(c.title)) + '">' +
        '<img src="' + esc(imgSrc(c.image, 'certificate')) + '" data-fallback="certificate" alt="" loading="lazy" decoding="async" width="800" height="566">' +
        '<span class="expand-ico">' + icon('expand') + '</span></button>' +
        '<div class="card-body"><h3>' + esc(L(c.title)) + '</h3>' +
        '<p class="meta">' + esc(L(c.issuer)) + ' · ' + esc(L(c.date)) + '</p><p>' + esc(L(c.description)) + '</p>' +
        '<div class="card-actions"><button type="button" class="btn btn-ghost btn-sm" data-open-cert="' + esc(c.id) + '">' + esc(t('certs.view')) + icon('expand') + '</button></div>' +
        '</div></article>';
    }).join('');
  }

  function renderContact() {
    var em = D.profile.email;
    $('#contactEmail').innerHTML = em
      ? '<a href="mailto:' + esc(em) + '">' + esc(em) + '</a>'
      : '<span class="ph">' + esc(t('contact.emailMissing')) + '</span>';
    $('#contactSocial').innerHTML = D.social.map(function (s) {
      var url = safeUrl(s.url);
      if (url) return '<li><a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + icon(s.icon) + '<span>' + esc(s.label) + '</span></a></li>';
      return '<li><span class="off" aria-disabled="true">' + icon(s.icon) + '<span>' + esc(s.label) + '</span><small>' + esc(t('contact.linkMissing')) + '</small></span></li>';
    }).join('');
  }

  function renderFooter() {
    $('#footerSocial').innerHTML = socialIcons();
    $('#footerLinks').innerHTML = $$('.nav-link').map(function (a) {
      return '<a href="' + a.getAttribute('href') + '">' + esc(a.textContent) + '</a>';
    }).join('');
  }

  function renderAll() {
    applyStatic();
    renderHero(); renderAbout(); renderSkills(); renderFilters(); renderProjects(); renderCerts(); renderContact(); renderFooter();
    refreshErrors();
    startTyping();
    observeReveals();
    countUps();
    firstRender = false;
    requestAnimationFrame(moveIndicator);
  }

  /* ------------------------------------------------------------------
   * Language switching
   * ------------------------------------------------------------------ */
  function setLang(next) {
    if (next === lang) return;
    lang = next;
    try { localStorage.setItem('lang', lang); } catch (e) {}
    var root = document.documentElement;
    if (reduceMotion) { renderAll(); refreshDialogs(); return; }
    root.classList.add('lang-switching');
    setTimeout(function () {
      renderAll(); refreshDialogs();
      requestAnimationFrame(function () { root.classList.remove('lang-switching'); setTimeout(moveIndicator, 60); });
    }, 190);
  }
  $$('.lang-switch button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });

  /* ------------------------------------------------------------------
   * Typing animation
   * ------------------------------------------------------------------ */
  var typeTimer;
  function startTyping() {
    clearTimeout(typeTimer);
    var el = $('#typed');
    var roles = D.profile.roles[lang] || D.profile.roles.en || [];
    if (!roles.length) { el.textContent = L(D.profile.title); return; }
    if (reduceMotion) { el.textContent = roles[0]; return; }
    var r = 0, c = 0, del = false;
    (function tick() {
      var w = roles[r];
      el.textContent = w.slice(0, c);
      if (!del && c === w.length) { del = true; typeTimer = setTimeout(tick, 1700); return; }
      if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
      c += del ? -1 : 1;
      typeTimer = setTimeout(tick, del ? 32 : 70);
    })();
  }

  /* ------------------------------------------------------------------
   * Scroll reveal, count-up, nav indicator, active section
   * ------------------------------------------------------------------ */
  var revealIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        var el = en.target;
        el.classList.add('in');
        revealIO.unobserve(el);
        // once shown, drop the reveal transition so hover/tilt transforms stay snappy
        setTimeout(function () { el.classList.remove('reveal', 'in'); el.style.removeProperty('--i'); }, 1100);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;

  function observeReveals() {
    $$('.reveal:not(.in)').forEach(function (el) {
      if (revealIO) revealIO.observe(el); else el.classList.add('in');
    });
  }

  var countIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      countIO.unobserve(en.target);
      var el = en.target, end = parseInt(el.dataset.count, 10), start = performance.now(), dur = 1200;
      if (reduceMotion) { el.textContent = end; return; }
      (function step(now) {
        var k = Math.min(1, (now - start) / dur);
        el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      })(start);
    });
  }, { threshold: 0.6 }) : null;
  function countUps() {
    $$('[data-count]').forEach(function (el) {
      if (countIO) { el.textContent = '0'; countIO.observe(el); }
    });
  }

  var navList = $('#navLinks'), indicator = $('.nav-indicator'), currentSection = 'home';
  function moveIndicator() {
    var a = $('.nav-link.active', navList);
    if (!a || window.innerWidth <= 860) { indicator.style.opacity = 0; return; }
    var ar = a.getBoundingClientRect(), nr = navList.getBoundingClientRect();
    indicator.style.width = ar.width + 'px';
    indicator.style.transform = 'translateX(' + (ar.left - nr.left) + 'px)';
    indicator.style.opacity = 1;
  }
  function setActive(id) {
    currentSection = id;
    $$('.nav-link').forEach(function (a) {
      var on = a.dataset.section === id;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    moveIndicator();
  }
  var sections = $$('main section[id]');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      $('.nav').classList.toggle('scrolled', window.scrollY > 30);
      var mark = window.innerHeight * 0.38, found = sections[0].id;
      sections.forEach(function (s) { if (s.getBoundingClientRect().top <= mark) found = s.id; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) found = sections[sections.length - 1].id;
      if (found !== currentSection) setActive(found);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { moveIndicator(); });

  /* ------------------------------------------------------------------
   * Mobile menu
   * ------------------------------------------------------------------ */
  var burger = $('#burger');
  function toggleMenu(open) {
    navList.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', t(open ? 'nav.closeMenu' : 'nav.menu'));
    burger.innerHTML = icon(open ? 'x' : 'menu');
  }
  burger.addEventListener('click', function () { toggleMenu(!navList.classList.contains('open')); });
  navList.addEventListener('click', function (e) { if (e.target.closest('a')) toggleMenu(false); });
  document.addEventListener('click', function (e) {
    // composedPath is captured at dispatch, so it still works after the burger icon is swapped out
    var inside = e.composedPath().indexOf($('.nav')) !== -1;
    if (!inside && navList.classList.contains('open')) toggleMenu(false);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && navList.classList.contains('open')) { toggleMenu(false); burger.focus(); } });

  /* ------------------------------------------------------------------
   * Card tilt (fine pointers only, never with reduced motion)
   * ------------------------------------------------------------------ */
  if (finePointer && !reduceMotion) {
    document.addEventListener('pointermove', function (e) {
      var el = e.target.closest && e.target.closest('[data-tilt]');
      if (!el) return;
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = 'perspective(900px) rotateX(' + (-y * 7).toFixed(2) + 'deg) rotateY(' + (x * 7).toFixed(2) + 'deg) translateZ(0)';
    });
    document.addEventListener('pointerout', function (e) {
      var el = e.target.closest && e.target.closest('[data-tilt]');
      if (el && !el.contains(e.relatedTarget)) el.style.transform = '';
    });
  }

  /* ------------------------------------------------------------------
   * Projects: filter + dialogs
   * ------------------------------------------------------------------ */
  $('#projectFilters').addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]');
    if (!b) return;
    activeCat = b.dataset.cat;
    renderFilters(); renderProjects();
  });

  var projectDlg = $('#projectDialog'), certDlg = $('#certDialog');
  var openState = { type: null, id: null }, lastFocus = null;

  function fillProject(id) {
    var p = D.projects.filter(function (x) { return x.id === id; })[0];
    if (!p) return false;
    setImg($('#pdImg'), p.image, 'project', L(p.title));
    $('#pdCat').textContent = catLabel(p.category);
    $('#pdTitle').textContent = L(p.title);
    $('#pdDesc').textContent = L(p.details) || L(p.description);
    $('#pdTech').innerHTML = p.tech.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
    $('#pdActions').innerHTML = linkBtn(p.links && p.links.demo, 'projects.demo', 'external', 'btn-primary') + linkBtn(p.links && p.links.source, 'projects.source', 'github', 'btn-ghost');
    return true;
  }
  function fillCert(id) {
    var c = D.certificates.filter(function (x) { return x.id === id; })[0];
    if (!c) return false;
    setImg($('#cdImg'), c.image, 'certificate', L(c.title));
    $('#cdTitle').textContent = L(c.title);
    $('#cdIssuer').textContent = L(c.issuer);
    $('#cdDate').textContent = L(c.date);
    $('#cdDesc').textContent = L(c.description);
    return true;
  }
  function openDlg(dlg, type, id, filler) {
    if (!filler(id)) return;
    lastFocus = document.activeElement;
    openState = { type: type, id: id };
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    document.documentElement.classList.add('dlg-open');
  }
  function refreshDialogs() {
    if (openState.type === 'project' && projectDlg.open) fillProject(openState.id);
    if (openState.type === 'cert' && certDlg.open) fillCert(openState.id);
  }
  [projectDlg, certDlg].forEach(function (dlg) {
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.closest('[data-close]')) dlg.close(); });
    dlg.addEventListener('close', function () {
      document.documentElement.classList.remove('dlg-open');
      openState = { type: null, id: null };
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    });
  });
  document.addEventListener('click', function (e) {
    var pb = e.target.closest('[data-open-project]');
    if (pb) { openDlg(projectDlg, 'project', pb.dataset.openProject, fillProject); return; }
    var cb = e.target.closest('[data-open-cert]');
    if (cb) openDlg(certDlg, 'cert', cb.dataset.openCert, fillCert);
  });

  /* ------------------------------------------------------------------
   * Contact form (validation + honest delivery)
   * ------------------------------------------------------------------ */
  var form = $('#contactForm'), statusEl = $('#formStatus');
  var fieldErrors = {};         // name -> error key (kept so messages re-translate)
  var statusState = null;       // { kind, key }

  function validate() {
    var E = form.elements;
    var v = {
      name: E.name.value.trim(), email: E.email.value.trim(),
      subject: E.subject.value.trim(), message: E.message.value.trim()
    };
    fieldErrors = {};
    if (!v.name) fieldErrors.name = 'required';
    if (!v.email) fieldErrors.email = 'required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) fieldErrors.email = 'email';
    if (!v.subject) fieldErrors.subject = 'required';
    if (!v.message) fieldErrors.message = 'required';
    else if (v.message.length < 10) fieldErrors.message = 'short';
    return v;
  }
  function refreshErrors() {
    ['name', 'email', 'subject', 'message'].forEach(function (f) {
      var key = fieldErrors[f];
      var input = form.elements[f];
      input.closest('.field').classList.toggle('invalid', !!key);
      input.setAttribute('aria-invalid', key ? 'true' : 'false');
      $('#c' + f.charAt(0).toUpperCase() + f.slice(1) + 'Err').textContent = key ? t('contact.err.' + key) : '';
    });
    if (statusState) setStatus(statusState.kind, statusState.key);
  }
  function setStatus(kind, key) {
    statusState = kind ? { kind: kind, key: key } : null;
    statusEl.className = 'form-status' + (kind ? ' ' + kind : '');
    statusEl.textContent = kind ? t(key) : '';
  }
  form.addEventListener('input', function (e) {
    var n = e.target.name;
    if (fieldErrors[n]) { delete fieldErrors[n]; refreshErrors(); }
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    setStatus(null);
    var v = validate();
    refreshErrors();
    var firstBad = ['name', 'email', 'subject', 'message'].filter(function (f) { return fieldErrors[f]; })[0];
    if (firstBad) { form.elements[firstBad].focus(); return; }
    if (form.elements.website.value) return; // honeypot filled → bot

    var endpoint = D.settings.contactFormEndpoint;
    if (endpoint) {
      var btn = $('#sendBtn'), label = $('#sendLabel');
      btn.disabled = true; label.textContent = t('contact.sending');
      fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
        .then(function (r) {
          if (!r.ok) throw new Error('bad status');
          setStatus('ok', 'contact.status.sent'); form.reset();
        })
        .catch(function () { setStatus('bad', 'contact.status.failed'); })
        .then(function () { btn.disabled = false; label.textContent = t('contact.send'); });
    } else if (D.profile.email) {
      setStatus('info', 'contact.status.mailto');
      var href = 'mailto:' + encodeURIComponent(D.profile.email).replace('%40', '@') +
        '?subject=' + encodeURIComponent(v.subject) +
        '&body=' + encodeURIComponent(v.message + '\n\n— ' + v.name + ' (' + v.email + ')');
      window.location.href = href;
    } else {
      setStatus('info', 'contact.status.notConfigured');
    }
  });

  /* ------------------------------------------------------------------
   * Back to top, smooth in-page links
   * ------------------------------------------------------------------ */
  $('#toTop').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

  /* ------------------------------------------------------------------
   * Hero particles (paused when off-screen or tab hidden)
   * ------------------------------------------------------------------ */
  function initParticles() {
    var c = $('#particles');
    if (!c || reduceMotion || !c.getContext) return;
    var ctx = c.getContext('2d'), w = 0, h = 0, pts = [], raf = 0, visible = true;
    function resize() {
      var r = c.parentElement.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(70, (w * h) / 17000));
      pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28, r: Math.random() * 1.4 + .5 });
    }
    function draw() {
      raf = 0;
      if (!visible || document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fillStyle = 'rgba(120,200,255,.7)'; ctx.fill();
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < 12000) {
            ctx.strokeStyle = 'rgba(76,201,255,' + (0.16 * (1 - d / 12000)).toFixed(3) + ')';
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    function kick() { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(draw); }
    resize(); kick();
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { resize(); kick(); }, 150); });
    document.addEventListener('visibilitychange', kick);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; kick(); }).observe(c.parentElement);
    }
  }

  /* ------------------------------------------------------------------
   * Boot
   * ------------------------------------------------------------------ */
  renderAll();
  toggleMenu(false);
  setActive('home');
  onScroll();
  initParticles();

  var loader = $('#loader'), loaderHidden = false;
  function hideLoader() { if (loaderHidden) return; loaderHidden = true; loader.classList.add('done'); }
  var bootStart = performance.now();
  window.addEventListener('load', function () { setTimeout(hideLoader, Math.max(0, 500 - (performance.now() - bootStart))); });
  setTimeout(hideLoader, 3000); // never let the loader get stuck
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { moveIndicator(); });
})();
