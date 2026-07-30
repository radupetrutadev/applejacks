# Apple Jacks

Website for **Apple Jacks**, the daily coffee shop behind
[@applejacksdaily](https://www.instagram.com/applejacksdaily/).

Static HTML, CSS and JavaScript. No framework, no build step, no dependencies —
open `index.html` and it works.

---

## The design

The site is built as a **two-ink risograph broadsheet**: cream newsprint stock,
espresso-black ink, apple-red ink, and a green that only ever shows up on a
leaf. Everything follows from that idea rather than from a layout template.

- **Masthead + dateline.** A newspaper strip that prints today's date, the
  edition number (day of the year) and a live open/closed lamp.
- **Mis-registration.** The hero wordmark is printed twice — once in ink, once
  in red, a few pixels off — and the offset drifts as you scroll, the way a
  two-pass riso print never quite lines up.
- **Overprint.** The apple sits behind the type in `mix-blend-mode: multiply`,
  so the letterforms and the fruit share ink instead of stacking.
- **Grain.** An SVG `feTurbulence` layer over the whole page, multiplied down,
  gives the paper its tooth. No texture images.
- **Type.** Bodoni Moda for the display voice, Space Grotesk for reading, Space
  Mono for every label, price and timestamp.

### It also does the useful things

| | |
|---|---|
| **Bilingual** | Romanian by default, English one tap away. Persisted to `localStorage`; falls back to the browser's language. |
| **Live opening status** | Computed in `Europe/Bucharest`, not the visitor's timezone, so the lamp is right whoever is looking. Updates every minute and highlights today's row in the hours table. |
| **Night shift** | A dark "press ink" theme that respects `prefers-color-scheme` and can be overridden by the toggle. |
| **Mobile first** | Fluid type throughout, a full-screen drawer, horizontally scrollable menu tabs, and a hero that re-anchors the apple so it never sits under the text. |
| **Accessible** | Semantic landmarks, a skip link, real tab semantics with arrow-key support, visible focus rings, and full `prefers-reduced-motion` support. |
| **Fast** | Zero third-party requests. Self-hosted fonts (280 KB, latin + latin-ext only). No JS framework. Works with JavaScript disabled, just without the menu and gallery. |

---

## Running it

```bash
npm start           # python3 -m http.server 8080
# then open http://localhost:8080
```

Any static server works. So does opening `index.html` directly, except that
`fetch()` of the JSON data files needs `http://`, so the menu and gallery stay
empty on `file://`.

## Deploying

It is a static site — push it anywhere. For GitHub Pages, enable Pages on the
default branch, root folder. `.nojekyll` is already committed so the `assets/`
folder is served as-is.

---

## Instagram

The contact-sheet section is driven by `data/instagram.json`. Each entry can
carry a local image; any entry with `"image": null` renders a **generated
two-ink plate** instead, keyed deterministically off its index — so the grid
always looks finished and never shows a broken image.

**The plates that ship in this repo are placeholders.** I could not download the
real photos: this build environment's network policy blocks `instagram.com`
outright, so nothing from the account could be fetched. Two ways to put the real
pictures in:

```bash
npm run instagram              # 12 most recent posts
npm run instagram -- --count 20
```

That downloads the images into `assets/instagram/` and rewrites
`data/instagram.json` with real captions and permalinks. Instagram throttles
anonymous callers hard; if you get a 401/403, log in on instagram.com in a
browser, copy the `sessionid` cookie, and re-run:

```bash
IG_SESSIONID=… npm run instagram
```

Or do it by hand — drop square JPEGs into `assets/instagram/` and point each
manifest entry at its file. See `assets/instagram/README.md`.

---

## Content still to confirm

These are marked `TODO(owner)` in the source and should be checked with the shop
before the site goes public:

- **The address.** Not published anywhere I could reach, so `index.html` shows a
  visible "still being confirmed" note with a link to DM the shop, rather than
  an invented street. Replace it in the `.card--address` block and in
  `visit.addressLine` in `assets/js/main.js`.
- **The menu.** `data/menu.json` is a plausible specialty-coffee list with RON
  prices — drinks that any shop like this pours, but **not** verified against
  what Apple Jacks actually serves. Edit that one file and the page follows.
- **The story copy.** Written to fit the shop's voice from its Instagram
  ("Ieși la o cafea?", coffeeholic place, opens 07:30); it is not dictated
  copy. Both languages live in the `I18N` table in `assets/js/main.js`.

Confirmed from public sources: the handle, the tagline, and the opening hours
(Mon–Fri 07:30–16:00, Sat–Sun 09:00–16:00).

---

## Layout

```
index.html                  markup + the SVG sprite (apple mark, icons, map)
assets/css/main.css         the whole design system, in numbered sections
assets/css/fonts.css        self-hosted @font-face rules
assets/fonts/               woff2, latin + latin-ext
assets/js/main.js           i18n, opening hours, menu, gallery, motion
assets/img/                 favicon + Open Graph card
assets/instagram/           photos land here
data/menu.json              the menu, bilingual
data/instagram.json         the contact-sheet manifest
scripts/fetch-instagram.mjs pulls posts from Instagram
```

To restyle: everything comes from the custom properties at the top of
`main.css`. Change `--red` and `--paper` and the whole site re-prints.
