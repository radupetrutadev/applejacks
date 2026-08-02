/* ═══════════════════════════════════════════════════════════════════════
   CATALOG — the only file you edit to change the shop.

   Loaded as a plain script (not fetched) so there is no extra round-trip,
   no CORS, and the page works straight off the filesystem.

   Product fields
     id     stable slug, used as the cart key — never reuse one
     cat    category id from CATEGORIES below
     price  RON, current. `old` is the struck-through price (optional)
     art    which SVG symbol draws it: oil | diffuser | candle | reed |
            sticks | sachet | set
     h      hue 0–360 — tints the art and its panel. Pick it from the scent.
     pop    sort weight for "Recomandate", higher first
   ═══════════════════════════════════════════════════════════════════════ */

window.CATALOG = {
  currency: 'lei',
  freeShipping: 250,
  shipping: { courier: 15, pickup: 0 },

  categories: [
    { id: 'uleiuri-esentiale', name: 'Uleiuri esențiale' },
    { id: 'uleiuri-parfumate', name: 'Uleiuri parfumate' },
    { id: 'difuzoare',         name: 'Difuzoare' },
    { id: 'lumanari',          name: 'Lumânări' },
    { id: 'betisoare',         name: 'Bețișoare' },
    { id: 'odorizante',        name: 'Odorizante' },
    { id: 'seturi',            name: 'Seturi cadou' }
  ],

  products: [
    /* ── uleiuri esențiale · Soul & Scents, India, 100% naturale ────── */
    {
      id: 'ue-lavanda-10', name: 'Ulei esențial Lavandă, S&S India, 10 ml',
      cat: 'uleiuri-esentiale', brand: 'Soul & Scents', price: 34.9, size: '10 ml',
      art: 'oil', h: 265, pop: 98, rating: 4.9, reviews: 214,
      notes: ['floral', 'ierbos', 'calmant'],
      desc: 'Lavandă distilată din flori întregi. Nota clasică de seară: câteva picături în difuzor cu o oră înainte de culcare și camera se liniștește.'
    },
    {
      id: 'ue-eucalipt-10', name: 'Ulei esențial Eucalipt, S&S India, 10 ml',
      cat: 'uleiuri-esentiale', brand: 'Soul & Scents', price: 29.9, size: '10 ml',
      art: 'oil', h: 168, pop: 92, rating: 4.8, reviews: 168,
      notes: ['proaspăt', 'mentolat', 'respirație'],
      desc: 'Limpede și tăios, cu acel aer de dimineață rece. Bun în sezonul rece, în baie sau în camera de lucru.'
    },
    {
      id: 'ue-patchouli-10', name: 'Ulei esențial Patchouli, S&S India, 10 ml',
      cat: 'uleiuri-esentiale', brand: 'Soul & Scents', price: 39.9, size: '10 ml',
      art: 'oil', h: 28, pop: 78, rating: 4.7, reviews: 96,
      notes: ['lemnos', 'pământos', 'cald'],
      desc: 'Adânc, pământos, cu o dulceață care apare abia după câteva minute. Se folosește puțin — o picătură ține mult.'
    },
    {
      id: 'ue-breathe-10', name: 'Ulei esențial Breathe Easy, S&S India, 10 ml',
      cat: 'uleiuri-esentiale', brand: 'Soul & Scents', price: 42.9, size: '10 ml',
      art: 'oil', h: 190, pop: 88, rating: 4.8, reviews: 132, isNew: true,
      notes: ['eucalipt', 'mentă', 'rozmarin'],
      desc: 'Un amestec făcut pentru nasul înfundat: eucalipt, mentă și rozmarin. Difuzat seara, ține camera deschisă până dimineața.'
    },
    {
      id: 'ue-tea-tree-10', name: 'Ulei esențial Arbore de ceai, S&S India, 10 ml',
      cat: 'uleiuri-esentiale', brand: 'Soul & Scents', price: 32.9, size: '10 ml',
      art: 'oil', h: 128, pop: 74, rating: 4.7, reviews: 88,
      notes: ['verde', 'medicinal', 'curat'],
      desc: 'Nota verde-medicinală pe care o recunoști imediat. Clasic în îngrijirea pielii și în amestecurile de curățenie.'
    },
    {
      id: 'ue-menta-10', name: 'Ulei esențial Mentă, S&S India, 10 ml',
      cat: 'uleiuri-esentiale', brand: 'Soul & Scents', price: 29.9, size: '10 ml',
      art: 'oil', h: 152, pop: 80, rating: 4.8, reviews: 121,
      notes: ['rece', 'ascuțit', 'energizant'],
      desc: 'Mentă adevărată, rece la prima adulmecare. Pe birou, la ora trei după-amiaza, face treaba unei cafele.'
    },
    {
      id: 'ue-lemongrass-10', name: 'Ulei esențial Lemongrass, S&S India, 10 ml',
      cat: 'uleiuri-esentiale', brand: 'Soul & Scents', price: 27.9, size: '10 ml',
      art: 'oil', h: 78, pop: 66, rating: 4.6, reviews: 64,
      notes: ['citric', 'ierbos', 'vară'],
      desc: 'Lămâios fără să fie acru, cu un fundal de iarbă proaspăt tăiată. Merge bine în bucătărie.'
    },
    {
      id: 'ue-portocala-10', name: 'Ulei esențial Portocală dulce, S&S India, 10 ml',
      cat: 'uleiuri-esentiale', brand: 'Soul & Scents', price: 24.9, size: '10 ml',
      art: 'oil', h: 32, pop: 70, rating: 4.7, reviews: 103,
      notes: ['citric', 'dulce', 'vesel'],
      desc: 'Presat din coajă, exact ca mirosul care rămâne pe degete. Cel mai ușor de plăcut din toată colecția.'
    },

    /* ── uleiuri parfumate & hidrosolubile · Aroma Land ──────────────── */
    {
      id: 'up-lavanda-10', name: 'Ulei aromaterapie Lavandă, Aroma Land, 10 ml',
      cat: 'uleiuri-parfumate', brand: 'Aroma Land', price: 11.9, size: '10 ml',
      art: 'oil', h: 268, pop: 95, rating: 4.7, reviews: 342,
      notes: ['floral', 'pudrat'],
      desc: 'Ulei hidrosolubil pentru difuzoarele cu apă și pentru vasele ceramice. Câteva picături într-un rezervor plin ajung pentru o seară întreagă.'
    },
    {
      id: 'up-eucalipt-10', name: 'Ulei aromaterapie Eucalipt, Aroma Land, 10 ml',
      cat: 'uleiuri-parfumate', brand: 'Aroma Land', price: 11.9, size: '10 ml',
      art: 'oil', h: 165, pop: 86, rating: 4.6, reviews: 218,
      notes: ['proaspăt', 'rece'],
      desc: 'Varianta hidrosolubilă a clasicului eucalipt, făcută special pentru difuzoarele ultrasonice.'
    },
    {
      id: 'up-vanilie-10', name: 'Ulei aromaterapie Vanilie, Aroma Land, 10 ml',
      cat: 'uleiuri-parfumate', brand: 'Aroma Land', price: 11.9, size: '10 ml',
      art: 'oil', h: 38, pop: 90, rating: 4.8, reviews: 287,
      notes: ['dulce', 'cald', 'gurmand'],
      desc: 'Vanilie rotundă, fără zahăr ars. Aroma care face sufrageria să pară cu două grade mai caldă.'
    },
    {
      id: 'up-scortisoara-10', name: 'Ulei aromaterapie Scorțișoară, Aroma Land, 10 ml',
      cat: 'uleiuri-parfumate', brand: 'Aroma Land', price: 11.9, size: '10 ml',
      art: 'oil', h: 18, pop: 72, rating: 4.6, reviews: 154,
      notes: ['condimentat', 'lemnos'],
      desc: 'Scorțișoară caldă, de sezon rece. Se combină bine cu portocală și cuișoare.'
    },
    {
      id: 'up-iasomie-10', name: 'Ulei aromaterapie Iasomie, Aroma Land, 10 ml',
      cat: 'uleiuri-parfumate', brand: 'Aroma Land', price: 11.9, size: '10 ml',
      art: 'oil', h: 305, pop: 64, rating: 4.5, reviews: 97,
      notes: ['floral', 'intens', 'seară'],
      desc: 'Floral plin, aproape dulce. Puțin ajunge — începe cu două picături.'
    },
    {
      id: 'up-mar-verde-50', name: 'Ulei hidrosolubil Măr verde, Aroma Land, 50 ml',
      cat: 'uleiuri-parfumate', brand: 'Aroma Land', price: 19.9, size: '50 ml',
      art: 'oil', h: 98, pop: 58, rating: 4.5, reviews: 71,
      notes: ['fructat', 'acrișor', 'proaspăt'],
      desc: 'Flacon mare pentru cine difuzează zilnic. Măr verde crocant, fără note de bomboană.'
    },

    /* ── difuzoare ───────────────────────────────────────────────────── */
    {
      id: 'df-conico-100', name: 'Difuzor de aromaterapie Conico, Aroma Land, 100 ml',
      cat: 'difuzoare', brand: 'Aroma Land', price: 132, old: 165, size: '100 ml',
      art: 'diffuser', h: 158, pop: 100, rating: 4.8, reviews: 176,
      specs: { 'Capacitate': '100 ml', 'Autonomie': 'până la 6 ore', 'Lumină': 'LED cald, 7 culori' },
      notes: ['ultrasonic', 'silențios', 'LED'],
      desc: 'Con din ceramică mată peste un difuzor ultrasonic. Nu încălzește uleiul, deci aroma rămâne întreagă. Se oprește singur când rămâne fără apă.'
    },
    {
      id: 'df-oslo', name: 'Difuzor de aromaterapie Oslo cu telecomandă, Aroma Land, 12W',
      cat: 'difuzoare', brand: 'Aroma Land', price: 249, size: '12 W',
      art: 'diffuser', h: 205, pop: 94, rating: 4.7, reviews: 88, isNew: true,
      specs: { 'Putere': '12 W', 'Autonomie': 'până la 12 ore', 'Control': 'telecomandă inclusă' },
      notes: ['telecomandă', 'timer', 'cameră mare'],
      desc: 'Cel mai puternic din gamă, cu telecomandă și temporizator. Acoperă un living întreg fără să-l auzi.'
    },
    {
      id: 'df-relax-500', name: 'Difuzor de aromaterapie Relax, Aroma Land, 500 ml, 8W',
      cat: 'difuzoare', brand: 'Aroma Land', price: 189, size: '500 ml',
      art: 'diffuser', h: 178, pop: 89, rating: 4.7, reviews: 142,
      specs: { 'Capacitate': '500 ml', 'Putere': '8 W', 'Autonomie': 'până la 10 ore' },
      notes: ['rezervor mare', 'toată noaptea'],
      desc: 'Rezervor de jumătate de litru: îl umpli seara și merge până dimineața. Pentru dormitor sau birou.'
    },
    {
      id: 'df-confort-100', name: 'Difuzor de aromaterapie Confort, Aroma Land, 100 ml, USB',
      cat: 'difuzoare', brand: 'Aroma Land', price: 119, size: '100 ml',
      art: 'diffuser', h: 142, pop: 84, rating: 4.6, reviews: 119,
      specs: { 'Capacitate': '100 ml', 'Alimentare': 'USB', 'Autonomie': 'până la 6 ore' },
      notes: ['USB', 'portabil', 'birou'],
      desc: 'Se alimentează prin USB, deci merge la laptop, în mașină sau la o baterie externă. Difuzorul de luat cu tine.'
    },
    {
      id: 'df-ceramic', name: 'Difuzor ceramic pentru uleiuri esențiale, Aroma Land',
      cat: 'difuzoare', brand: 'Aroma Land', price: 49.9, size: 'ceramică',
      art: 'diffuser', h: 42, pop: 62, rating: 4.5, reviews: 76,
      specs: { 'Material': 'ceramică smălțuită', 'Sursă': 'lumânare pastilă' },
      notes: ['fără electricitate', 'clasic'],
      desc: 'Vasul de deasupra, pastila dedesubt, apă și câteva picături de ulei. Metoda veche, care merge oriunde.'
    },
    {
      id: 'df-reed-lavanda', name: 'Reed diffuser Lavandă, Aroma Land, 100 ml',
      cat: 'difuzoare', brand: 'Aroma Land', price: 59.9, size: '100 ml',
      art: 'reed', h: 262, pop: 82, rating: 4.6, reviews: 158,
      specs: { 'Volum': '100 ml', 'Durată': '8–10 săptămâni', 'Bețișoare': '8 incluse' },
      notes: ['fără flacără', 'continuu'],
      desc: 'Îl pui pe raft și îl uiți. Bețișoarele trag parfumul în sus continuu — întorci-le o dată pe săptămână și gata.'
    },
    {
      id: 'df-reed-vanilie', name: 'Reed diffuser Vanilie & Lemn de santal, Aroma Land, 100 ml',
      cat: 'difuzoare', brand: 'Aroma Land', price: 59.9, size: '100 ml',
      art: 'reed', h: 34, pop: 79, rating: 4.7, reviews: 124,
      specs: { 'Volum': '100 ml', 'Durată': '8–10 săptămâni', 'Bețișoare': '8 incluse' },
      notes: ['cald', 'lemnos', 'dulce'],
      desc: 'Vanilie peste lemn de santal — cald fără să fie greu. Cel mai vândut reed din colecție.'
    },

    /* ── lumânări ────────────────────────────────────────────────────── */
    {
      id: 'lm-pahar-lavanda', name: 'Lumânare parfumată în pahar, Lavandă, Aroma Land',
      cat: 'lumanari', brand: 'Aroma Land', price: 34.9, size: 'ardere 30h',
      art: 'candle', h: 266, pop: 87, rating: 4.7, reviews: 203,
      specs: { 'Ardere': 'aprox. 30 ore', 'Ceară': 'parafină rafinată', 'Fitil': 'bumbac' },
      notes: ['floral', 'liniștitor'],
      desc: 'Pahar gros de sticlă, ceară turnată la noi în fabrică. Prima aprindere lasă-o o oră, ca să se topească uniform până la margine.'
    },
    {
      id: 'lm-pahar-vanilie', name: 'Lumânare parfumată în pahar, Vanilie, Aroma Land',
      cat: 'lumanari', brand: 'Aroma Land', price: 34.9, size: 'ardere 30h',
      art: 'candle', h: 40, pop: 91, rating: 4.8, reviews: 256,
      specs: { 'Ardere': 'aprox. 30 ore', 'Ceară': 'parafină rafinată', 'Fitil': 'bumbac' },
      notes: ['dulce', 'cald'],
      desc: 'Vanilie care umple camera în cinci minute și rămâne acolo. Cea mai cerută lumânare a noastră.'
    },
    {
      id: 'lm-bergamota-55', name: 'Lumânare parfumată Bergamotă & Cedru, borcan mare',
      cat: 'lumanari', brand: 'Aroma Land', price: 69.9, size: 'ardere 55h',
      art: 'candle', h: 88, pop: 76, rating: 4.8, reviews: 91, isNew: true,
      specs: { 'Ardere': 'aprox. 55 ore', 'Fitile': '2, din bumbac' },
      notes: ['citric', 'lemnos', 'elegant'],
      desc: 'Borcan mare cu două fitile, pentru camere de peste 20 m². Bergamotă deasupra, cedru dedesubt.'
    },
    {
      id: 'lm-pastile-4', name: 'Set 4 lumânări pastilă parfumate, Aroma Land',
      cat: 'lumanari', brand: 'Aroma Land', price: 14.9, size: '4 buc · 4h',
      art: 'candle', h: 22, pop: 68, rating: 4.5, reviews: 187,
      specs: { 'Bucăți': '4', 'Ardere': 'aprox. 4 ore fiecare' },
      notes: ['pentru difuzor ceramic'],
      desc: 'Pastilele care alimentează difuzoarele ceramice. Ard curat, patru ore fiecare.'
    },
    {
      id: 'lm-led-scortisoara', name: 'Lumânare LED cu parfum de scorțișoară, Aroma Land',
      cat: 'lumanari', brand: 'Aroma Land', price: 39.9, size: 'LED',
      art: 'candle', h: 16, pop: 54, rating: 4.4, reviews: 62,
      specs: { 'Alimentare': '2× AA', 'Flacără': 'LED pâlpâitor' },
      notes: ['fără flacără', 'sigur'],
      desc: 'Flacără LED care pâlpâie ca una adevărată, plus un miez parfumat. Pentru case cu copii sau pisici.'
    },

    /* ── bețișoare & conuri ──────────────────────────────────────────── */
    {
      id: 'bt-exotic-20', name: 'Bețișoare parfumate Exotic, Aroma Land, 20 buc',
      cat: 'betisoare', brand: 'Aroma Land', price: 12.9, size: '20 bucăți',
      art: 'sticks', h: 300, pop: 83, rating: 4.6, reviews: 231,
      specs: { 'Bucăți': '20', 'Ardere': 'aprox. 40 min / bețișor' },
      notes: ['dulce', 'fructat', 'condimentat'],
      desc: 'Colecția Exotic: dulce, fructat și condimentat în același timp. Un bețișor parfumează o cameră medie.'
    },
    {
      id: 'bt-lavanda-20', name: 'Bețișoare parfumate Lavandă, Aroma Land, 20 buc',
      cat: 'betisoare', brand: 'Aroma Land', price: 12.9, size: '20 bucăți',
      art: 'sticks', h: 264, pop: 77, rating: 4.5, reviews: 194,
      specs: { 'Bucăți': '20', 'Ardere': 'aprox. 40 min / bețișor' },
      notes: ['floral', 'clasic'],
      desc: 'Lavanda în forma cea mai simplă. Aprinzi unul la intrare și se simte în tot holul.'
    },
    {
      id: 'bt-conuri-santal', name: 'Conuri parfumate Lemn de santal, Aroma Land, 10 buc',
      cat: 'betisoare', brand: 'Aroma Land', price: 15.9, size: '10 bucăți',
      art: 'sticks', h: 30, pop: 69, rating: 4.6, reviews: 108,
      specs: { 'Bucăți': '10', 'Ardere': 'aprox. 20 min / con' },
      notes: ['lemnos', 'fumuriu'],
      desc: 'Conurile ard mai concentrat decât bețișoarele. Santal fumuriu, pentru seri lungi.'
    },
    {
      id: 'bt-suport', name: 'Suport ceramic pentru bețișoare, Aroma Land',
      cat: 'betisoare', brand: 'Aroma Land', price: 24.9, size: 'ceramică',
      art: 'sticks', h: 200, pop: 48, rating: 4.5, reviews: 44,
      specs: { 'Material': 'ceramică smălțuită', 'Lungime': '24 cm' },
      notes: ['prinde cenușa'],
      desc: 'Jgheab lung, smălțuit, care prinde toată cenușa. Se spală cu o cârpă udă.'
    },

    /* ── odorizante & săculeți ───────────────────────────────────────── */
    {
      id: 'od-saculet-lavanda', name: 'Săculeț parfumat Lavandă pentru dulap, Aroma Land',
      cat: 'odorizante', brand: 'Aroma Land', price: 9.9, size: '20 g',
      art: 'sachet', h: 270, pop: 81, rating: 4.6, reviews: 312,
      specs: { 'Durată': '4–6 săptămâni', 'Greutate': '20 g' },
      notes: ['floral', 'discret'],
      desc: 'Îl pui între rufe și hainele miros a lavandă săptămâni la rând. Cel mai ieftin mod de a schimba un dulap.'
    },
    {
      id: 'od-auto-vanilie', name: 'Odorizant auto Vanilie, Aroma Land',
      cat: 'odorizante', brand: 'Aroma Land', price: 11.9, size: '10 g',
      art: 'sachet', h: 42, pop: 73, rating: 4.4, reviews: 165,
      specs: { 'Durată': '3–4 săptămâni', 'Montare': 'agățat la oglindă' },
      notes: ['dulce', 'discret'],
      desc: 'Se agață la oglindă și ține trei-patru săptămâni. Vanilie, nu „brăduț".'
    },
    {
      id: 'od-potpourri-flori', name: 'Potpourri Flori de câmp, Aroma Land, 200 g',
      cat: 'odorizante', brand: 'Aroma Land', price: 29.9, size: '200 g',
      art: 'sachet', h: 330, pop: 59, rating: 4.5, reviews: 87,
      specs: { 'Greutate': '200 g', 'Durată': '2–3 luni' },
      notes: ['floral', 'ierbos'],
      desc: 'Petale și lemn uscat, într-un bol pe hol. Reîmprospătezi cu câteva picături de ulei parfumat când slăbește.'
    },
    {
      id: 'od-figurina-ipsos', name: 'Figurină parfumată din ipsos, Lavandă, Aroma Land',
      cat: 'odorizante', brand: 'Aroma Land', price: 17.9, size: 'ipsos',
      art: 'sachet', h: 258, pop: 51, rating: 4.4, reviews: 58,
      specs: { 'Material': 'ipsos ceramic', 'Reîncărcabil': 'da, cu ulei parfumat' },
      notes: ['decorativ', 'reîncărcabil'],
      desc: 'Ipsos poros care ține parfumul și îl dă înapoi încet. Când se stinge, torni câteva picături de ulei și revine.'
    },

    /* ── seturi cadou ────────────────────────────────────────────────── */
    {
      id: 'st-somn-linistit', name: 'Set aromaterapie Somn Liniștit — difuzor + 2 uleiuri',
      cat: 'seturi', brand: 'Aroma Land', price: 219, old: 259, size: 'set 3 piese',
      art: 'set', h: 250, pop: 96, rating: 4.9, reviews: 74,
      specs: { 'Conține': 'difuzor Confort, ulei lavandă, ulei mușețel', 'Ambalaj': 'cutie cadou' },
      notes: ['cadou', 'seară', 'somn'],
      desc: 'Tot ce trebuie pentru un dormitor liniștit, într-o cutie: difuzorul Confort și cele două uleiuri care se cer înainte de culcare.'
    },
    {
      id: 'st-aromele-iubirii', name: 'Set cadou Aromele Iubirii — 2 lumânări + ulei',
      cat: 'seturi', brand: 'Aroma Land', price: 89.9, old: 109, size: 'set 3 piese',
      art: 'set', h: 344, pop: 85, rating: 4.7, reviews: 112,
      specs: { 'Conține': '2 lumânări în pahar, 1 ulei parfumat', 'Ambalaj': 'cutie cadou' },
      notes: ['trandafir', 'vanilie', 'cadou'],
      desc: 'Două lumânări și un ulei, în cutie legată cu panglică. Se face cadou fără să mai împachetezi nimic.'
    },
    {
      id: 'st-6-uleiuri', name: 'Set 6 uleiuri esențiale, S&S India, 6 × 10 ml',
      cat: 'seturi', brand: 'Soul & Scents', price: 179, old: 209, size: '6 × 10 ml',
      art: 'set', h: 172, pop: 93, rating: 4.8, reviews: 138,
      specs: { 'Conține': 'lavandă, eucalipt, mentă, portocală, arbore de ceai, lemongrass', 'Puritate': '100% natural' },
      notes: ['starter', 'cadou', '100% natural'],
      desc: 'Cele șase pe care le folosești cel mai des, într-o cutie de lemn. Setul de pornire, dacă abia intri în aromaterapie.'
    }
  ],

  /* județele, pentru adresa de livrare */
  counties: [
    'Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Bistrița-Năsăud', 'Botoșani',
    'Brașov', 'Brăila', 'București', 'Buzău', 'Caraș-Severin', 'Călărași',
    'Cluj', 'Constanța', 'Covasna', 'Dâmbovița', 'Dolj', 'Galați', 'Giurgiu',
    'Gorj', 'Harghita', 'Hunedoara', 'Ialomița', 'Iași', 'Ilfov', 'Maramureș',
    'Mehedinți', 'Mureș', 'Neamț', 'Olt', 'Prahova', 'Satu Mare', 'Sălaj',
    'Sibiu', 'Suceava', 'Teleorman', 'Timiș', 'Tulcea', 'Vaslui', 'Vâlcea',
    'Vrancea'
  ]
};
