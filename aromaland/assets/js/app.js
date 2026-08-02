/* ═══════════════════════════════════════════════════════════════════════
   AROMA LAND — shop logic. No framework, no dependencies.

   The whole point of this file is the distance between "I want that" and
   "order placed": add straight from the grid, one sheet for cart and
   checkout, nothing that needs an account or a page load.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var C = window.CATALOG;
  if (!C) return;

  /* ── helpers ──────────────────────────────────────────────────────── */
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Romanian search has to survive missing diacritics: "lamaie" must find
     "lămâie", "betisoare" must find "bețișoare". */
  function fold(s) {
    return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  var nf0 = new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 0 });
  var nf2 = new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  function money(n) {
    n = Math.round(n * 100) / 100;
    return (Number.isInteger(n) ? nf0 : nf2).format(n) + ' lei';
  }

  /* 1 produs · 5 produse · 24 de produse */
  function plural(n) {
    if (n === 1) return '1 produs';
    var r = n % 100;
    return n + (r === 0 || r >= 20 ? ' de produse' : ' produse');
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function store(k, v) {
    try {
      if (v === undefined) { var r = localStorage.getItem(k); return r ? JSON.parse(r) : null; }
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) { return null; }
  }

  var byId = {};
  C.products.forEach(function (p) { byId[p.id] = p; });
  var catName = {};
  C.categories.forEach(function (c) { catName[c.id] = c.name; });

  /* Pre-fold the searchable text once, not on every keystroke. */
  C.products.forEach(function (p) {
    p._s = fold([p.name, catName[p.cat], p.brand, (p.notes || []).join(' '), p.desc].join(' '));
  });

  /* ── state ────────────────────────────────────────────────────────── */
  var state = {
    cat: 'all',
    q: '',
    sort: 'pop',
    ship: 'courier',
    cart: store('al.cart') || {},   /* { id: qty } */
    view: 'cart'
  };

  /* drop ids that no longer exist in the catalog */
  Object.keys(state.cart).forEach(function (id) { if (!byId[id]) delete state.cart[id]; });

  /* ── elements ─────────────────────────────────────────────────────── */
  var el = {
    grid: $('#grid'), chips: $('#chips'), count: $('#count'), empty: $('#empty'),
    sort: $('#sort'), q: $('#q'), qClear: $('#qClear'), hdr: $('#hdr'),
    cartBtn: $('#cartBtn'), cartCount: $('#cartCount'),
    mbar: $('#mbar'), mbarN: $('#mbarN'), mbarSum: $('#mbarSum'),
    sheet: $('#cart'), sheetTitle: $('#sheetTitle'), sheetBack: $('#sheetBack'),
    sheetFoot: $('#sheetFoot'), sheetCta: $('#sheetCta'),
    lines: $('#lines'), cartEmpty: $('#cartEmpty'), meter: $('#meter'), totals: $('#totals'),
    form: $('#checkout'), county: $('#f-county'),
    qv: $('#qv'), qvIn: $('#qvIn'), toast: $('#toast')
  };

  /* ── cart maths ───────────────────────────────────────────────────── */
  function items() {
    return Object.keys(state.cart).map(function (id) {
      return { p: byId[id], q: state.cart[id] };
    });
  }
  function nItems() {
    return items().reduce(function (n, it) { return n + it.q; }, 0);
  }
  function subtotal() {
    return items().reduce(function (s, it) { return s + it.p.price * it.q; }, 0);
  }
  function shippingCost() {
    if (state.ship === 'pickup') return 0;
    if (!nItems()) return 0;
    return subtotal() >= C.freeShipping ? 0 : C.shipping.courier;
  }
  function total() { return subtotal() + shippingCost(); }

  function persist() { store('al.cart', state.cart); }

  /* ── product grid ─────────────────────────────────────────────────── */
  function matching() {
    var q = fold(state.q.trim());
    var list = C.products.filter(function (p) {
      if (state.cat !== 'all' && p.cat !== state.cat) return false;
      if (!q) return true;
      return q.split(/\s+/).every(function (w) { return p._s.indexOf(w) > -1; });
    });

    var sorters = {
      pop:  function (a, b) { return b.pop - a.pop; },
      new:  function (a, b) { return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.pop - a.pop; },
      asc:  function (a, b) { return a.price - b.price; },
      desc: function (a, b) { return b.price - a.price; }
    };
    return list.sort(sorters[state.sort] || sorters.pop);
  }

  function priceHtml(p) {
    return '<div class="price"><span class="price__now">' + money(p.price) + '</span>' +
      (p.old ? '<s class="price__old">' + money(p.old) + '</s>' : '') + '</div>';
  }

  function slotHtml(id) {
    var q = state.cart[id] || 0;
    if (!q) {
      return '<button class="add" type="button" data-add="' + id + '" aria-label="Adaugă în coș">' +
        '<svg aria-hidden="true"><use href="#i-plus"/></svg></button>';
    }
    return '<div class="stepper">' +
      '<button type="button" data-dec="' + id + '" aria-label="Scade cantitatea">' +
        '<svg aria-hidden="true"><use href="#' + (q === 1 ? 'i-trash' : 'i-minus') + '"/></svg></button>' +
      '<span class="stepper__n">' + q + '</span>' +
      '<button type="button" data-inc="' + id + '" aria-label="Crește cantitatea">' +
        '<svg aria-hidden="true"><use href="#i-plus"/></svg></button>' +
      '</div>';
  }

  function cardHtml(p) {
    var sale = p.old && p.old > p.price;
    var tags = '';
    if (sale) tags += '<span class="tag tag--sale">−' + Math.round((1 - p.price / p.old) * 100) + '%</span>';
    else if (p.isNew) tags += '<span class="tag tag--new">Nou</span>';
    else if (p.pop >= 90) tags += '<span class="tag">Bestseller</span>';

    return '<article class="card' + (sale ? ' card--sale' : '') + '" style="--h:' + p.h + '">' +
      '<div class="card__art">' +
        '<svg class="art" viewBox="0 0 120 120" aria-hidden="true"><use href="#art-' + p.art + '"/></svg>' +
        (tags ? '<div class="tags">' + tags + '</div>' : '') +
      '</div>' +
      '<div class="card__body">' +
        '<p class="card__cat">' + esc(catName[p.cat]) + '</p>' +
        '<h3 class="card__name"><button type="button" data-qv="' + p.id + '">' + esc(p.name) + '</button></h3>' +
        '<p class="card__notes">' + esc((p.notes || []).join(' · ')) + '</p>' +
      '</div>' +
      '<div class="card__foot">' + priceHtml(p) +
        '<div data-slot="' + p.id + '">' + slotHtml(p.id) + '</div>' +
      '</div>' +
    '</article>';
  }

  function renderGrid() {
    var list = matching();
    el.grid.innerHTML = list.map(cardHtml).join('');
    el.grid.hidden = !list.length;
    el.empty.hidden = !!list.length;
    el.count.textContent = list.length
      ? plural(list.length) + (state.q ? ' pentru „' + state.q + '”' : '')
      : '';
  }

  function renderChips() {
    var counts = { all: C.products.length };
    C.products.forEach(function (p) { counts[p.cat] = (counts[p.cat] || 0) + 1; });

    var all = [{ id: 'all', name: 'Toate' }].concat(C.categories);
    el.chips.innerHTML = all.map(function (c) {
      return '<button class="chip" type="button" role="tab" data-cat="' + c.id + '" ' +
        'aria-selected="' + (state.cat === c.id) + '">' + esc(c.name) +
        '<span class="chip__n">' + (counts[c.id] || 0) + '</span></button>';
    }).join('');
  }

  /* only the one card's button/stepper — cheaper than a full re-render */
  function refreshSlot(id) {
    var slot = el.grid.querySelector('[data-slot="' + id + '"]');
    if (slot) slot.innerHTML = slotHtml(id);
    var qvSlot = el.qv.querySelector('[data-slot="' + id + '"]');
    if (qvSlot) qvSlot.innerHTML = slotHtml(id);
  }

  /* ── cart chrome (badge, mobile bar) ──────────────────────────────── */
  function renderChrome() {
    var n = nItems();
    el.cartCount.textContent = n;
    el.cartCount.hidden = !n;
    el.cartBtn.setAttribute('aria-label', n ? 'Deschide coșul, ' + plural(n) : 'Deschide coșul');

    el.mbar.hidden = !n;
    el.mbarN.textContent = plural(n);
    el.mbarSum.textContent = money(subtotal());
  }

  function bump() {
    el.cartBtn.classList.remove('is-bump');
    void el.cartBtn.offsetWidth;
    el.cartBtn.classList.add('is-bump');
  }

  /* ── cart mutations ───────────────────────────────────────────────── */
  function setQty(id, q) {
    if (q <= 0) delete state.cart[id];
    else state.cart[id] = Math.min(q, 99);
    persist();
    refreshSlot(id);
    renderChrome();
    if (el.sheet.open) renderSheet();
  }

  function add(id) {
    setQty(id, (state.cart[id] || 0) + 1);
    bump();
    toast('Adăugat în coș · ' + byId[id].name.split(',')[0]);
  }

  /* ── toast ────────────────────────────────────────────────────────── */
  var toastT;
  function toast(msg) {
    if (el.sheet.open) return;   /* the cart itself is already the feedback */
    el.toast.innerHTML = '<svg aria-hidden="true"><use href="#i-check"/></svg>' + esc(msg);
    el.toast.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { el.toast.classList.remove('is-on'); }, 2400);
  }

  /* ── the sheet: cart → checkout → done ────────────────────────────── */
  function renderMeter() {
    var s = subtotal(), left = C.freeShipping - s;
    var pct = Math.max(0, Math.min(100, (s / C.freeShipping) * 100));
    var done = left <= 0;
    el.meter.className = 'meter' + (done ? ' meter--done' : '');
    el.meter.innerHTML =
      '<p class="meter__txt">' + (done
        ? '<strong>Livrare gratuită</strong> — ai depășit ' + money(C.freeShipping) + '.'
        : 'Mai adaugă <strong>' + money(left) + '</strong> și livrarea e gratuită.') + '</p>' +
      '<div class="meter__bar"><div class="meter__fill" style="width:' + pct + '%"></div></div>';
  }

  function renderLines() {
    var list = items();
    el.cartEmpty.hidden = !!list.length;
    el.meter.hidden = !list.length;
    el.lines.innerHTML = list.map(function (it) {
      var p = it.p;
      return '<li class="line" style="--h:' + p.h + '">' +
        '<div class="line__art"><svg class="art" viewBox="0 0 120 120" aria-hidden="true">' +
          '<use href="#art-' + p.art + '"/></svg></div>' +
        '<div><p class="line__name">' + esc(p.name) + '</p>' +
          '<p class="line__meta">' + esc(p.size || '') + ' · ' + money(p.price) + '</p></div>' +
        '<div class="line__right">' +
          '<span class="line__price">' + money(p.price * it.q) + '</span>' +
          '<div class="stepper">' +
            '<button type="button" data-dec="' + p.id + '" aria-label="Scade cantitatea pentru ' + esc(p.name) + '">' +
              '<svg aria-hidden="true"><use href="#' + (it.q === 1 ? 'i-trash' : 'i-minus') + '"/></svg></button>' +
            '<span class="stepper__n">' + it.q + '</span>' +
            '<button type="button" data-inc="' + p.id + '" aria-label="Crește cantitatea pentru ' + esc(p.name) + '">' +
              '<svg aria-hidden="true"><use href="#i-plus"/></svg></button>' +
          '</div>' +
        '</div>' +
      '</li>';
    }).join('');
  }

  function renderTotals() {
    var ship = shippingCost();
    var free = ship === 0 && state.ship === 'courier' && nItems();
    el.totals.innerHTML =
      '<div><dt>Produse</dt><dd>' + money(subtotal()) + '</dd></div>' +
      '<div' + (free ? ' class="is-free"' : '') + '><dt>Livrare</dt><dd>' +
        (state.ship === 'pickup' ? 'Ridicare' : ship === 0 ? 'Gratuit' : money(ship)) + '</dd></div>' +
      '<div class="is-total"><dt>Total</dt><dd>' + money(total()) + '</dd></div>';
  }

  function renderSheet() {
    renderMeter();
    renderLines();
    renderTotals();

    var n = nItems();
    $$('[data-view]', el.sheet).forEach(function (s) { s.hidden = s.dataset.view !== state.view; });
    el.sheetBack.hidden = state.view !== 'checkout';
    el.sheetFoot.hidden = state.view === 'done';
    el.meter.hidden = state.view !== 'cart' || !n;

    el.sheetTitle.textContent =
      state.view === 'cart' ? 'Coșul tău' :
      state.view === 'checkout' ? 'Date de livrare' : 'Gata';

    el.sheetCta.textContent = state.view === 'checkout' ? 'Trimite comanda' : 'Finalizează comanda';
    el.sheetCta.disabled = !n;
  }

  function openSheet(view) {
    state.view = view || 'cart';
    renderSheet();
    if (!el.sheet.open) {
      el.sheet.showModal();
      document.body.classList.add('is-locked');
    }
    /* Focus the first field on desktop only — on a phone this would throw up
       the keyboard mid-animation and hide the form behind it. */
    if (state.view === 'checkout' && matchMedia('(pointer: fine)').matches) {
      setTimeout(function () {
        var first = $('#f-name');
        if (first && !first.value) first.focus();
      }, 320);
    }
  }

  function closeSheet() { el.sheet.close(); }

  el.sheet.addEventListener('close', function () {
    document.body.classList.remove('is-locked');
    state.view = 'cart';
  });

  /* ── quick view ───────────────────────────────────────────────────── */
  function openQv(id) {
    var p = byId[id];
    if (!p) return;
    var sale = p.old && p.old > p.price;
    var specs = p.specs || {};
    if (p.size && !specs['Gramaj'] && !specs['Volum'] && !specs['Capacitate']) specs = Object.assign({ 'Variantă': p.size }, specs);
    if (p.brand) specs = Object.assign({}, specs, { 'Brand': p.brand });

    el.qvIn.innerHTML =
      '<div class="qv__art" style="--h:' + p.h + '">' +
        '<button class="iconbtn qv__close" type="button" data-close-qv aria-label="Închide">' +
          '<svg aria-hidden="true"><use href="#i-close"/></svg></button>' +
        '<svg class="art" viewBox="0 0 120 120" aria-hidden="true"><use href="#art-' + p.art + '"/></svg>' +
      '</div>' +
      '<div class="qv__side">' +
        '<p class="card__cat">' + esc(catName[p.cat]) + '</p>' +
        '<h2 class="qv__name" id="qvTitle">' + esc(p.name) + '</h2>' +
        '<p class="qv__rate"><svg aria-hidden="true"><use href="#i-star"/></svg>' +
          String(p.rating).replace('.', ',') + ' · ' + p.reviews + ' recenzii</p>' +
        '<p class="qv__desc">' + esc(p.desc) + '</p>' +
        '<div class="qv__notes">' + (p.notes || []).map(function (n) {
          return '<span>' + esc(n) + '</span>';
        }).join('') + '</div>' +
        '<div class="qv__specs">' + Object.keys(specs).map(function (k) {
          return '<div><span>' + esc(k) + '</span><strong>' + esc(specs[k]) + '</strong></div>';
        }).join('') + '</div>' +
        '<div class="qv__price"><span class="price__now"' + (sale ? ' style="color:var(--sale)"' : '') + '>' +
          money(p.price) + '</span>' +
          (sale ? '<s class="price__old">' + money(p.old) + '</s>' : '') + '</div>' +
        '<div class="qv__cta">' +
          '<button class="btn btn--ghost btn--lg" type="button" data-add="' + p.id + '">Adaugă în coș</button>' +
          '<button class="btn btn--primary btn--lg" type="button" data-buy="' + p.id + '">Cumpără acum</button>' +
        '</div>' +
      '</div>';

    el.qv.showModal();
    document.body.classList.add('is-locked');
  }

  el.qv.addEventListener('close', function () {
    if (!el.sheet.open) document.body.classList.remove('is-locked');
  });

  /* ── checkout ─────────────────────────────────────────────────────── */
  function fillCounties() {
    el.county.innerHTML = '<option value="" disabled selected>Alege județul</option>' +
      C.counties.map(function (c) { return '<option>' + esc(c) + '</option>'; }).join('');
  }

  function prefill() {
    var b = store('al.buyer');
    if (!b) return;
    ['name', 'phone', 'email', 'city', 'street'].forEach(function (k) {
      var f = el.form.elements[k];
      if (f && b[k]) f.value = b[k];
    });
    if (b.county) el.county.value = b.county;
  }

  var RULES = {
    name:   function (v) { return v.trim().length >= 3 || 'Scrie numele complet.'; },
    phone:  function (v) {
      var d = v.replace(/\D/g, '');
      return (d.length >= 10 && d.length <= 12) || 'Un număr de telefon valid, te rugăm.';
    },
    email:  function (v) { return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()) || 'Adresa de email nu pare validă.'; },
    county: function (v) { return !!v || 'Alege județul.'; },
    city:   function (v) { return v.trim().length >= 2 || 'Scrie localitatea.'; },
    street: function (v) { return v.trim().length >= 5 || 'Strada, numărul, și blocul dacă e cazul.'; }
  };

  function fieldOf(input) { return input.closest('.field'); }

  function showError(name, msg) {
    var input = el.form.elements[name];
    if (!input) return;
    var f = fieldOf(input);
    var err = el.form.querySelector('[data-err="' + name + '"]');
    if (f) f.classList.toggle('is-bad', !!msg);
    if (err) err.textContent = msg || '';
  }

  function validateTerms() {
    var terms = el.form.elements.terms;
    var ok = terms.checked;
    terms.closest('.field').classList.toggle('is-bad', !ok);
    el.form.querySelector('[data-err="terms"]').textContent =
      ok ? '' : 'Trebuie să accepți termenii ca să trimitem comanda.';
    return ok;
  }

  function validate(only) {
    var bad = null;
    var names = only ? [only] : Object.keys(RULES);

    names.forEach(function (name) {
      var input = el.form.elements[name];
      if (!input || !RULES[name]) return;
      /* address fields don't apply when picking up from the shop */
      if (state.ship === 'pickup' && ['county', 'city', 'street'].indexOf(name) > -1) {
        showError(name, '');
        return;
      }
      var res = RULES[name](input.value);
      var msg = res === true ? '' : res;
      showError(name, msg);
      if (msg && !bad) bad = input;
    });

    if (only === 'terms') { validateTerms(); return null; }
    if (!only && !validateTerms() && !bad) bad = el.form.elements.terms;
    return bad;
  }

  function submitOrder() {
    var bad = validate();
    if (bad) {
      bad.focus();
      bad.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    var d = {};
    ['name', 'phone', 'email', 'county', 'city', 'street'].forEach(function (k) {
      d[k] = (el.form.elements[k] || {}).value || '';
    });
    store('al.buyer', d);

    /* No backend in this build — a real deployment POSTs the payload here.
       Everything the order needs is already assembled. */
    var order = {
      id: 'AL-' + (Math.floor(Math.random() * 90000) + 10000),
      buyer: d,
      shipping: state.ship,
      payment: (el.form.elements.pay.value || 'card'),
      note: (el.form.elements.note || {}).value || '',
      lines: items().map(function (it) {
        return { id: it.p.id, name: it.p.name, qty: it.q, price: it.p.price };
      }),
      subtotal: subtotal(), shippingCost: shippingCost(), total: total()
    };

    $('#orderId').textContent = order.id;
    state.cart = {};
    persist();
    renderGrid();
    renderChrome();
    state.view = 'done';
    renderSheet();
  }

  /* ── wiring ───────────────────────────────────────────────────────── */

  /* one delegated click handler for the whole document */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-add],[data-inc],[data-dec],[data-qv],[data-buy],[data-cat],[data-filter],[data-close-sheet],[data-close-qv]');
    if (!t) return;
    var d = t.dataset;

    if (d.add)  { add(d.add); return; }
    if (d.inc)  { setQty(d.inc, (state.cart[d.inc] || 0) + 1); return; }
    if (d.dec)  { setQty(d.dec, (state.cart[d.dec] || 0) - 1); return; }

    if (d.qv)   { openQv(d.qv); return; }
    if (d.buy)  {
      if (!state.cart[d.buy]) setQty(d.buy, 1);
      el.qv.close();
      openSheet('checkout');
      return;
    }

    if (d.cat !== undefined) {
      state.cat = d.cat;
      renderChips();
      renderGrid();
      var chip = el.chips.querySelector('[data-cat="' + d.cat + '"]');
      if (chip) chip.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      return;
    }

    if (d.filter) {
      state.cat = d.filter;
      state.q = '';
      el.q.value = '';
      el.qClear.hidden = true;
      renderChips();
      renderGrid();
      $('#produse').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (d.closeSheet !== undefined) { closeSheet(); return; }
    if (d.closeQv !== undefined) { el.qv.close(); return; }
  });

  el.cartBtn.addEventListener('click', function () { openSheet('cart'); });
  $('#mbarBtn').addEventListener('click', function () { openSheet('cart'); });
  $('#sheetClose').addEventListener('click', closeSheet);
  el.sheetBack.addEventListener('click', function () { openSheet('cart'); });
  $('#resetBtn').addEventListener('click', function () {
    state.cat = 'all'; state.q = ''; el.q.value = ''; el.qClear.hidden = true;
    renderChips(); renderGrid();
  });

  el.sheetCta.addEventListener('click', function () {
    if (!nItems()) return;
    if (state.view === 'cart') openSheet('checkout');
    else submitOrder();
  });

  /* shipping choice changes the total live */
  el.form.addEventListener('change', function (e) {
    if (e.target.name === 'ship') {
      state.ship = e.target.value;
      $('#fsAddress').hidden = state.ship === 'pickup';
      renderTotals();
    }
  });

  /* validate a field once the user has left it, never while they type */
  el.form.addEventListener('blur', function (e) {
    var n = e.target.name;
    if (RULES[n]) validate(n);
  }, true);

  el.form.addEventListener('input', function (e) {
    var f = fieldOf(e.target);
    if (!f || !f.classList.contains('is-bad')) return;
    if (e.target.name === 'terms') validateTerms();
    else if (RULES[e.target.name]) validate(e.target.name);
  });

  el.form.addEventListener('submit', function (e) { e.preventDefault(); submitOrder(); });

  /* search */
  var qT;
  el.q.addEventListener('input', function () {
    el.qClear.hidden = !el.q.value;
    clearTimeout(qT);
    qT = setTimeout(function () {
      state.q = el.q.value;
      renderGrid();
    }, 90);
  });
  el.qClear.addEventListener('click', function () {
    el.q.value = ''; state.q = ''; el.qClear.hidden = true; renderGrid(); el.q.focus();
  });
  $('#searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    el.q.blur();
    $('#produse').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  $('#searchToggle').addEventListener('click', function () {
    var on = el.hdr.classList.toggle('is-searching');
    this.setAttribute('aria-expanded', on);
    if (on) el.q.focus();
  });

  el.sort.addEventListener('change', function () { state.sort = el.sort.value; renderGrid(); });

  /* keyboard: "/" focuses search, Esc clears it */
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
      e.preventDefault();
      el.hdr.classList.add('is-searching');
      el.q.focus();
      el.q.select();
    } else if (e.key === 'Escape' && document.activeElement === el.q) {
      el.q.value = ''; state.q = ''; el.qClear.hidden = true; renderGrid(); el.q.blur();
    }
  });

  /* theme */
  var themeBtn = $('#themeBtn');
  function isDark() {
    var t = document.documentElement.dataset.theme;
    return t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function syncThemeIcon() {
    /* which glyph shows is CSS's job; only the label needs updating */
    themeBtn.setAttribute('aria-label', isDark() ? 'Treci pe tema deschisă' : 'Treci pe tema închisă');
  }
  themeBtn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    store('al.theme', next);
    syncThemeIcon();
  });

  /* footer category links */
  $('#ftrCats').innerHTML = C.categories.map(function (c) {
    return '<li><a href="#produse" data-filter="' + c.id + '">' + esc(c.name) + '</a></li>';
  }).join('');

  $('#year').textContent = new Date().getFullYear();

  /* ── go ───────────────────────────────────────────────────────────── */
  fillCounties();
  prefill();
  renderChips();
  renderGrid();
  renderChrome();
  syncThemeIcon();
})();
