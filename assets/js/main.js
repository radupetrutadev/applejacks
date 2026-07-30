/* =============================================================
   APPLE JACKS — main.js
   No framework, no build step. Progressive enhancement only:
   everything below improves a page that already works without it.
   ============================================================= */

(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------
     1. Dictionary
     The page ships in Romanian; English is applied over the top.
  ----------------------------------------------------------- */
  const I18N = {
    ro: {
      'skip': 'Sari la conținut',
      'dateline.motto': 'Prima cafea e cea mai bună',
      'nav.story': 'Povestea', 'nav.menu': 'Meniu', 'nav.feed': 'Urmărește',
      'nav.visit': 'Program',
      'drawer.hours': 'L–V 07:30–16:00 · S–D 09:00–16:00',
      'hero.kicker': 'Cafenea de zi cu zi',
      'hero.ask': 'Ieși la',
      'hero.blurb': 'Espresso scurt, filtre lungi și o bucătărie mică. Deschidem devreme, închidem la patru — pentru că ziua bună se vede de dimineață.',
      'hero.ctaMenu': 'Vezi meniul', 'hero.ctaVisit': 'Cum ajungi', 'hero.scroll': 'derulează',
      'story.kicker': 'Ediția de față',
      'story.title1': 'O cafenea făcută', 'story.title2': 'pentru zilele obișnuite.',
      'story.p1': 'Nu avem pretenția că schimbăm lumea. Avem pretenția că, la 7:30 dimineața, cafeaua ta e caldă, corect extrasă și făcută de cineva care își aduce aminte cum îți place.',
      'story.p2': 'Apple Jacks a pornit dintr-un obicei: cafeaua de dimineață luată în drum, băută pe o bordură, în picioare, cu ochii pe stradă. Am construit un loc în jurul obiceiului ăstuia — mic, luminos, cu prea multe scaune la geam și cu muzica dată exact cât trebuie ca să poți vorbi peste ea.',
      'story.p3': 'Boabele vin de la prăjitorii mici din țară și se schimbă des. Laptele e local. Prăjiturile se termină până la prânz, ceea ce e, cumva, cel mai sincer review pe care îl putem primi.',
      'story.quote': '„Ieși la o cafea?” nu e o întrebare despre cafea.',
      'story.quoteBy': '— ce spunem tuturor, tot timpul',
      'facts.1t': 'Prăjitorie', 'facts.1d': 'rotativă, locală',
      'facts.2t': 'Deschis',
      'facts.3t': 'Locuri la geam', 'facts.3d': 'niciodată destule',
      'facts.4t': 'Cana ta', 'facts.4d': '−3 lei',
      'menu.kicker': 'Lista de prețuri',
      'menu.title1': 'Tot ce', 'menu.title2': 'turnăm',
      'menu.note': 'Prețurile sunt în lei. Laptele vegetal e din partea casei.',
      'feed.kicker': 'Masa de montaj',
      'feed.title1': 'Zilele noastre,', 'feed.title2': 'pe rolă',
      'feed.legend': 'Contact sheet · developat zilnic',
      'feed.legendLink': 'vezi tot pe Instagram →',
      'visit.kicker': 'Ora și locul',
      'visit.title1': 'Deschidem', 'visit.title2': 'devreme',
      'visit.caption': 'Program săptămânal',
      'visit.hoursTitle': 'Program',
      'visit.intro': 'Suntem în două locuri din Craiova. Aceleași boabe, aceiași oameni — două camere cu caractere diferite: una la stradă, în centru, alta cu terasă și mult cer deasupra.',
      'places.title': 'Două case',
      'place.opens': 'Deschide',
      'place.reviews': '200 de recenzii pe Google',
      'place.reviews2': '42 de recenzii pe Google',
      'place.1.blurb': 'În centru, cu geam la stradă. Scaune afară, tabla cu mesaje lângă ușă și cafea la pachet dacă ești doar în trecere.',
      'place.1.tag': 'La pachet',
      'place.2.blurb': 'Casa cu terasă. Mese afară pe platformă, umbrar verde și loc destul cât să rămâi o dimineață întreagă.',
      'place.2.tag': 'Terasă',
      'day.mon': 'Luni', 'day.tue': 'Marți', 'day.wed': 'Miercuri', 'day.thu': 'Joi',
      'day.fri': 'Vineri', 'day.sat': 'Sâmbătă', 'day.sun': 'Duminică',
      'foot.shout': 'Ieși la o cafea?',
      'foot.nav': 'Secțiuni', 'foot.find': 'Ne găsești', 'foot.colophonT': 'Colofon',
      'foot.colophon': 'Cules în Bodoni Moda & Space Grotesk. Tipărit digital, în două culori, pe hârtie imaginară.',
      'foot.top': 'Înapoi sus ↑',
      'status.loading': 'se verifică…',
      'status.open': 'deschis · până la {t}',
      'status.soon': 'închidem în {n} min',
      'status.closed': 'închis · deschidem {d} la {t}',
      'live.open': 'Acum: <b>deschis</b> — mai stăm {r}.',
      'live.closed': 'Acum: <b data-shut>închis</b> — deschidem {d} la {t}.',
      'live.today': 'azi', 'live.tomorrow': 'mâine',
      'rotor': ['o cafea?', 'un flat white?', 'o pauză?', 'puțin aer?'],
      'lightbox.view': 'vezi pe Instagram →'
    },
    en: {
      'skip': 'Skip to content',
      'dateline.motto': 'The first one is always the best',
      'nav.story': 'Story', 'nav.menu': 'Menu', 'nav.feed': 'Follow',
      'nav.visit': 'Hours',
      'drawer.hours': 'Mon–Fri 07:30–16:00 · Sat–Sun 09:00–16:00',
      'hero.kicker': 'An everyday coffee shop',
      'hero.ask': 'Coming out for',
      'hero.blurb': 'Short espresso, long filters and a small kitchen. We open early and close at four — because a good day shows itself in the morning.',
      'hero.ctaMenu': 'See the menu', 'hero.ctaVisit': 'Find us', 'hero.scroll': 'scroll',
      'story.kicker': 'This edition',
      'story.title1': 'A coffee shop built', 'story.title2': 'for ordinary days.',
      'story.p1': 'We make no claim to changing the world. We do claim that at 7:30 in the morning your coffee is hot, properly pulled, and made by someone who remembers how you take it.',
      'story.p2': 'Apple Jacks started as a habit: the morning coffee picked up on the way, drunk standing on a kerb with an eye on the street. We built a room around that habit — small, bright, with too many seats at the window and the music turned exactly low enough to talk over.',
      'story.p3': 'The beans come from small roasters around the country and change often. The milk is local. The pastries are gone by lunch, which is, in a way, the most honest review we get.',
      'story.quote': '“Coming out for a coffee?” was never a question about coffee.',
      'story.quoteBy': '— what we say to everyone, always',
      'facts.1t': 'Roaster', 'facts.1d': 'rotating, local',
      'facts.2t': 'Opens',
      'facts.3t': 'Window seats', 'facts.3d': 'never enough',
      'facts.4t': 'Your own cup', 'facts.4d': '−3 lei',
      'menu.kicker': 'The price list',
      'menu.title1': 'Everything we', 'menu.title2': 'pour',
      'menu.note': 'Prices in lei. Plant milk is on the house.',
      'feed.kicker': 'The light table',
      'feed.title1': 'Our days,', 'feed.title2': 'on a roll',
      'feed.legend': 'Contact sheet · developed daily',
      'feed.legendLink': 'see it all on Instagram →',
      'visit.kicker': 'Time and place',
      'visit.title1': 'We open', 'visit.title2': 'early',
      'visit.caption': 'Weekly opening hours',
      'visit.hoursTitle': 'Opening hours',
      'visit.intro': 'There are two of us in Craiova. Same beans, same people — two rooms with different characters: one on the street in the centre, one with a terrace and a lot of sky above it.',
      'places.title': 'Two rooms',
      'place.opens': 'Opens',
      'place.reviews': '200 reviews on Google',
      'place.reviews2': '42 reviews on Google',
      'place.1.blurb': 'In the centre, window on the street. Seats outside, the message board by the door, and coffee to go if you are only passing.',
      'place.1.tag': 'Takeaway',
      'place.2.blurb': 'The house with the terrace. Tables out on the deck, a green awning, and room enough to stay a whole morning.',
      'place.2.tag': 'Terrace',
      'day.mon': 'Monday', 'day.tue': 'Tuesday', 'day.wed': 'Wednesday', 'day.thu': 'Thursday',
      'day.fri': 'Friday', 'day.sat': 'Saturday', 'day.sun': 'Sunday',
      'foot.shout': 'Coming out for a coffee?',
      'foot.nav': 'Sections', 'foot.find': 'Find us', 'foot.colophonT': 'Colophon',
      'foot.colophon': 'Set in Bodoni Moda & Space Grotesk. Printed digitally, in two inks, on imaginary paper.',
      'foot.top': 'Back to top ↑',
      'status.loading': 'checking…',
      'status.open': 'open · until {t}',
      'status.soon': 'closing in {n} min',
      'status.closed': 'closed · we open {d} at {t}',
      'live.open': 'Right now: <b>open</b> — {r} left.',
      'live.closed': 'Right now: <b data-shut>closed</b> — we open {d} at {t}.',
      'live.today': 'today', 'live.tomorrow': 'tomorrow',
      'rotor': ['a coffee?', 'a flat white?', 'a break?', 'some air?'],
      'lightbox.view': 'view on Instagram →'
    }
  };

  const DAY_KEYS = ['day.sun', 'day.mon', 'day.tue', 'day.wed', 'day.thu', 'day.fri', 'day.sat'];

  const saved = localStorage.getItem('aj:lang');
  let lang = (saved === 'ro' || saved === 'en')
    ? saved
    : ((navigator.language || 'ro').toLowerCase().startsWith('ro') ? 'ro' : 'en');

  const t = (key, vars) => {
    let s = I18N[lang][key];
    if (s == null) return '';
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
    return s;
  };

  /* -----------------------------------------------------------
     2. Opening hours (evaluated in the shop's own timezone)
  ----------------------------------------------------------- */
  const TZ = 'Europe/Bucharest';
  const HOURS = {
    0: [540, 960], 1: [450, 960], 2: [450, 960], 3: [450, 960],
    4: [450, 960], 5: [450, 960], 6: [540, 960]
  };
  const hhmm = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;

  function shopNow() {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: TZ, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type)?.value ?? '';
    const wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[get('weekday')] ?? new Date().getDay();
    const h = parseInt(get('hour'), 10) % 24;
    const m = parseInt(get('minute'), 10);
    return { day: wd, mins: h * 60 + m };
  }

  // The shop trades seven days a week, so "next opening" is either later
  // today or first thing tomorrow — no need to walk the whole week.
  function openState() {
    const { day, mins } = shopNow();
    const [o, c] = HOURS[day];
    if (mins >= o && mins < c) return { open: true, day, closesAt: c, left: c - mins };
    if (mins < o) return { open: false, day, nextDay: day, nextIn: 0, opensAt: o };
    const d = (day + 1) % 7;
    return { open: false, day, nextDay: d, nextIn: 1, opensAt: HOURS[d][0] };
  }

  /* -----------------------------------------------------------
     3. Applying language + all live text
  ----------------------------------------------------------- */
  function paintStatus() {
    const pill = $('#statusPill'), txt = $('#statusText'), live = $('#visitLive');
    if (!pill) return;
    const s = openState();

    if (s.open) {
      pill.dataset.state = 'open';
      txt.textContent = s.left <= 45
        ? t('status.soon', { n: s.left })
        : t('status.open', { t: hhmm(s.closesAt) });
    } else {
      pill.dataset.state = 'closed';
      const dName = s.nextIn === 0 ? t('live.today') : s.nextIn === 1 ? t('live.tomorrow') : t(DAY_KEYS[s.nextDay]).toLowerCase();
      txt.textContent = t('status.closed', { d: dName, t: hhmm(s.opensAt) });
    }

    if (live) {
      if (s.open) {
        const h = Math.floor(s.left / 60), m = s.left % 60;
        const r = h > 0 ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m`;
        live.innerHTML = t('live.open', { r });
      } else {
        const dName = s.nextIn === 0 ? t('live.today') : s.nextIn === 1 ? t('live.tomorrow') : t(DAY_KEYS[s.nextDay]).toLowerCase();
        live.innerHTML = t('live.closed', { d: dName, t: hhmm(s.opensAt) });
      }
    }

    $$('#hoursTable tr').forEach((tr) => {
      tr.dataset.today = String(Number(tr.dataset.day) === s.day);
    });
  }

  function paintDate() {
    const el = $('#dateline-date');
    if (!el) return;
    const now = new Date();
    const fmt = new Intl.DateTimeFormat(lang === 'ro' ? 'ro-RO' : 'en-GB', {
      timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long'
    });
    el.textContent = fmt.format(now);

    const start = new Date(now.getFullYear(), 0, 0);
    const doy = Math.floor((now - start) / 86400000);
    const nr = $('#editionNr');
    if (nr) nr.textContent = String(doy).padStart(3, '0');
  }

  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach((el) => {
      const v = I18N[lang][el.dataset.i18n];
      if (typeof v === 'string') el.textContent = v;
    });
    $$('.lang__opt').forEach((o) => o.classList.toggle('is-on', o.dataset.lang === lang));
    paintDate();
    paintStatus();
    renderMenu();
    renderSheet();
    resetRotor();
  }

  $('#langToggle')?.addEventListener('click', () => {
    lang = lang === 'ro' ? 'en' : 'ro';
    localStorage.setItem('aj:lang', lang);
    applyLang();
  });

  /* -----------------------------------------------------------
     4. Theme
  ----------------------------------------------------------- */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('aj:theme');
  if (savedTheme) root.dataset.theme = savedTheme;
  else root.removeAttribute('data-theme');

  $('#themeToggle')?.addEventListener('click', (e) => {
    const isNight = root.dataset.theme === 'night' ||
      (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    const next = isNight ? 'paper' : 'night';
    root.dataset.theme = next;
    localStorage.setItem('aj:theme', next);
    e.currentTarget.setAttribute('aria-pressed', String(next === 'night'));
  });

  /* -----------------------------------------------------------
     5. Drawer
  ----------------------------------------------------------- */
  const burger = $('#burger'), drawer = $('#drawer');
  const setDrawer = (open) => {
    if (!drawer) return;
    if (open) drawer.hidden = false;
    requestAnimationFrame(() => {
      drawer.dataset.open = String(open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.dataset.locked = String(open);
      if (!open) setTimeout(() => { if (drawer.dataset.open !== 'true') drawer.hidden = true; }, 650);
    });
  };
  burger?.addEventListener('click', () => setDrawer(drawer.dataset.open !== 'true'));
  drawer?.addEventListener('click', (e) => { if (e.target.closest('a')) setDrawer(false); });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.dataset.open === 'true') { setDrawer(false); burger.focus(); }
  });

  /* -----------------------------------------------------------
     6. Scroll: progress bar, auto-hiding masthead, active section
  ----------------------------------------------------------- */
  const bar = $('#progressBar'), masthead = $('.masthead');
  let lastY = 0, ticking = false;

  function onScroll() {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.width = `${Math.min(100, (y / Math.max(1, max)) * 100)}%`;
    if (masthead) {
      const down = y > lastY && y > 320 && drawer?.dataset.open !== 'true';
      masthead.dataset.hidden = String(down);
    }
    lastY = y;
    ticking = false;
  }
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });

  const navLinks = $$('.nav__links a');
  const sections = navLinks.map((a) => $(a.getAttribute('href'))).filter(Boolean);
  if (sections.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navLinks.forEach((a) => a.removeAttribute('aria-current'));
        navLinks.find((a) => a.getAttribute('href') === `#${en.target.id}`)?.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => io.observe(s));
  }

  /* -----------------------------------------------------------
     7. Reveal on enter
  ----------------------------------------------------------- */
  const revealIO = new IntersectionObserver((entries, obs) => {
    entries.forEach((en, i) => {
      if (!en.isIntersecting) return;
      en.target.style.setProperty('--d', `${Math.min(i, 5) * 70}ms`);
      en.target.classList.add('is-in');
      obs.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  const watchReveals = () => $$('[data-reveal]:not(.is-in)').forEach((el) => revealIO.observe(el));
  watchReveals();

  /* -----------------------------------------------------------
     8. Hero: rotating word, parallax, ink mis-registration
  ----------------------------------------------------------- */
  const rotor = $('#rotor');
  let rotorTimer = null;

  function resetRotor() {
    if (!rotor) return;
    clearInterval(rotorTimer);
    const words = I18N[lang].rotor;
    let i = 0;
    rotor.innerHTML = `<span class="hero__ask-word is-on">${words[0]}</span>`;
    if (reduced) return;
    rotorTimer = setInterval(() => {
      const out = rotor.querySelector('.is-on');
      i = (i + 1) % words.length;
      const next = document.createElement('span');
      next.className = 'hero__ask-word';
      next.textContent = words[i];
      rotor.appendChild(next);
      requestAnimationFrame(() => {
        out?.classList.replace('is-on', 'is-out');
        next.classList.add('is-on');
      });
      setTimeout(() => out?.remove(), 800);
    }, 2900);
  }

  if (!reduced) {
    const apple = $('.hero__apple');
    const lines = $$('.hero__line');
    addEventListener('scroll', () => {
      const y = scrollY;
      if (y > innerHeight * 1.2) return;
      apple?.style.setProperty('--par', `${y * 0.22}px`);
      lines.forEach((l, idx) => {
        const k = 1 + idx * 0.6;
        l.style.setProperty('--mx', `${4 + y * 0.02 * k}px`);
        l.style.setProperty('--my', `${3 + y * 0.012 * k}px`);
      });
    }, { passive: true });
  }

  /* -----------------------------------------------------------
     9. Menu
  ----------------------------------------------------------- */
  let MENU = null;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  function renderMenu() {
    if (!MENU) return;
    const tabs = $('.menu__tabs'), panels = $('#menuPanels');
    if (!tabs || !panels) return;

    const current = tabs.querySelector('[aria-selected="true"]')?.dataset.cat || MENU.categories[0].id;

    tabs.innerHTML = MENU.categories.map((c) => `
      <button role="tab" type="button" id="tab-${esc(c.id)}" data-cat="${esc(c.id)}"
              aria-controls="panel-${esc(c.id)}" aria-selected="${c.id === current}"
              tabindex="${c.id === current ? '0' : '-1'}">${esc(c.name[lang])}</button>
    `).join('') + '<i class="menu__tabs-ink" aria-hidden="true"></i>';

    panels.innerHTML = MENU.categories.map((c) => `
      <div class="menu__panel" role="tabpanel" id="panel-${esc(c.id)}"
           aria-labelledby="tab-${esc(c.id)}" data-active="${c.id === current}" ${c.id === current ? '' : 'hidden'}>
        ${c.items.map((it, i) => `
          <div class="dish" style="--i:${i}">
            <h3 class="dish__name">
              <span>${esc(it.name[lang])}</span>
              ${it.tag ? `<span class="dish__tag">${esc(it.tag[lang])}</span>` : ''}
            </h3>
            <p class="dish__price">${esc(it.price)}</p>
            <p class="dish__desc">${esc(it.desc[lang])}</p>
          </div>`).join('')}
      </div>
    `).join('');

    wireTabs();
    moveInk();
  }

  function wireTabs() {
    const btns = $$('.menu__tabs [role="tab"]');
    btns.forEach((b, idx) => {
      b.addEventListener('click', () => selectTab(b));
      b.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        const next = btns[(idx + d + btns.length) % btns.length];
        next.focus(); selectTab(next);
      });
    });
  }

  function selectTab(btn) {
    $$('.menu__tabs [role="tab"]').forEach((b) => {
      const on = b === btn;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    $$('.menu__panel').forEach((p) => {
      const on = p.id === `panel-${btn.dataset.cat}`;
      p.dataset.active = String(on);
      p.hidden = !on;
      if (on) $$('.dish', p).forEach((d, i) => {
        d.style.animation = 'none'; void d.offsetWidth;
        d.style.animation = ''; d.style.setProperty('--i', i);
      });
    });
    moveInk();
  }

  function moveInk() {
    const ink = $('.menu__tabs-ink'), on = $('.menu__tabs [aria-selected="true"]');
    if (!ink || !on) return;
    ink.style.width = `${on.offsetWidth}px`;
    ink.style.transform = `translateX(${on.offsetLeft}px)`;
  }
  addEventListener('resize', moveInk);

  /* -----------------------------------------------------------
     10. Instagram contact sheet
     Real photos when data/instagram.json has them; otherwise a
     deterministic two-ink plate is generated per frame so the grid
     is never a wall of grey boxes.
  ----------------------------------------------------------- */
  let FEED = null;

  const INKS = ['var(--red)', 'var(--ink)', 'var(--green)'];
  const STOCK = ['var(--paper)', 'var(--paper-2)', 'var(--paper-3)'];

  let plateSeq = 0;

  function plate(i, cls = 'frame__media') {
    const a  = INKS[i % 3];
    const b  = INKS[(i + 2) % 3];
    const bg = STOCK[(i + 1) % 3];
    const uid = `p${i}_${plateSeq++}`; // plates get rendered twice (sheet + lightbox)

    const art = [
      /* 0 — a cup, seen from directly above */
      `<circle cx="50" cy="50" r="34" fill="${a}"/><circle cx="50" cy="50" r="24" fill="${bg}"/><circle cx="50" cy="50" r="17" fill="${b}" opacity=".85"/>`,
      /* 1 — rising steam */
      `<circle cx="50" cy="102" r="34" fill="${b}" opacity=".55"/><g fill="none" stroke="${a}" stroke-width="6" stroke-linecap="round"><path d="M26 84 C 10 58, 40 44, 26 16"/><path d="M50 88 C 34 56, 66 40, 50 8"/><path d="M74 84 C 58 58, 88 44, 74 16"/></g>`,
      /* 2 — halftone, punched through by a solid moon */
      `<defs><pattern id="d_${uid}" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="3.1" fill="${a}"/></pattern></defs><rect width="100" height="100" fill="url(#d_${uid})"/><circle cx="58" cy="42" r="29" fill="${b}" opacity=".92"/>`,
      /* 3 — the apple, cropped hard */
      `<g style="--am-body:${a};--am-leaf:${b};--am-stem:${a};--am-bean:${bg}" transform="translate(50 54) scale(1.5) translate(-50 -50)"><use href="#apple-mark"/></g>`,
      /* 4 — pour-over cone */
      `<path d="M12 24 H88 L57 82 H43 Z" fill="${a}"/><path d="M27 39 H73 L55 72 H45 Z" fill="${bg}"/><circle cx="50" cy="94" r="10" fill="${b}"/>`,
      /* 5 — off-register bars */
      `<rect x="8" y="13" width="84" height="21" fill="${a}"/><rect x="15" y="43" width="71" height="21" fill="${b}" opacity=".88"/><rect x="8" y="73" width="58" height="14" fill="${a}" opacity=".6"/>`
    ][i % 6];

    return `<svg class="${cls}" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <filter id="g_${uid}">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.26"/></feComponentTransfer>
        </filter>
      </defs>
      <rect width="100" height="100" fill="${bg}"/>
      ${art}
      <rect width="100" height="100" filter="url(#g_${uid})" style="mix-blend-mode:multiply"/>
    </svg>`;
  }

  function renderSheet() {
    const sheet = $('#sheet');
    if (!sheet || !FEED) return;

    sheet.innerHTML = FEED.items.map((it, i) => {
      const alt = it.alt?.[lang] ?? it.alt?.ro ?? '';
      const cap = it.caption?.[lang] ?? it.caption?.ro ?? '';
      const media = it.image
        ? `<img class="frame__media" src="${esc(it.image)}" alt="${esc(alt)}" loading="lazy" decoding="async" width="1080" height="1080">`
        : plate(i);
      return `<button class="frame${it.image ? '' : ' frame--art'}" type="button"
                data-idx="${i}" aria-label="${esc(alt || cap)}">
        <span class="frame__idx">${String(i + 1).padStart(2, '0')}</span>
        ${media}
        <span class="frame__cap">${esc(cap)}</span>
      </button>`;
    }).join('');
  }

  /* lightbox */
  const box = $('#lightbox'), boxMedia = $('#lightboxMedia'), boxCap = $('#lightboxCap');
  $('#sheet')?.addEventListener('click', (e) => {
    const f = e.target.closest('.frame');
    if (!f || !FEED || !box) return;
    const it = FEED.items[Number(f.dataset.idx)];
    const alt = it.alt?.[lang] ?? '';
    boxMedia.innerHTML = it.image
      ? `<img class="lightbox__img" src="${esc(it.image)}" alt="${esc(alt)}">`
      : plate(Number(f.dataset.idx), 'lightbox__img');
    boxCap.innerHTML = `<span>${esc(it.caption?.[lang] ?? '')}</span>
      <a href="${esc(it.permalink || FEED.url)}" target="_blank" rel="noopener">${esc(t('lightbox.view'))}</a>`;
    box.showModal();
  });
  $('#lightboxClose')?.addEventListener('click', () => box.close());
  box?.addEventListener('click', (e) => { if (e.target === box) box.close(); });

  /* -----------------------------------------------------------
     11. Boot
  ----------------------------------------------------------- */
  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();

  Promise.allSettled([
    fetch('data/menu.json').then((r) => r.json()),
    fetch('data/instagram.json').then((r) => r.json())
  ]).then(([m, f]) => {
    if (m.status === 'fulfilled') MENU = m.value;
    if (f.status === 'fulfilled') FEED = f.value;
    renderMenu();
    renderSheet();
    watchReveals();
  }).catch(() => { /* the static page still stands on its own */ });

  applyLang();
  setInterval(paintStatus, 60_000);
})();
