# Apple Jacks

Website for **Apple Jacks**, the coffee shop behind
[@applejacksdaily](https://www.instagram.com/applejacksdaily/) — two rooms in
Craiova:

- **Apple Jacks daily** — Strada Mihai Viteazul 15
- **Apple Jacks Coffeeholic** — Strada Traian Lalescu 19

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
| **Two locations** | Both shops get a card with its own photo, address, character and Google rating, each linking straight out to Maps. Structured data ships both branches so search engines see two places, not one. |
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

## The two storefront photos

The location cards expect two files, and **they are the one thing still
missing** — the photos were shared in chat, which is not something the build
environment can write to disk. Drop them in and nothing else needs changing:

| file | which shop |
|---|---|
| `assets/locations/mihai-viteazul.jpg` | Apple Jacks daily — portrait, crate wall and the "DACĂ…" chalkboard |
| `assets/locations/traian-lalescu.jpg` | Apple Jacks Coffeeholic — landscape, green awning and the terrace deck |

`.jpeg`, `.png` and `.webp` are tried as well, so only the name has to match.
Easiest route without a clone: open
`assets/locations/` on the branch in GitHub → **Add file › Upload files** →
drag both in (renamed) → commit.

Until a file is there, the card shows a generated two-ink plate instead of a
broken image, so the site is safe to deploy meanwhile. Once present, the photo
is desaturated, washed in red ink and grained so it sits inside the risograph
look, and returns to full colour on hover.

## Content still to confirm

- **The menu.** `data/menu.json` is a plausible specialty-coffee list with RON
  prices — drinks that any shop like this pours, but **not** verified against
  what Apple Jacks actually serves. Edit that one file and the page follows.
- **Closing times per location.** Google confirms both shops open at 07:30; the
  16:00 close comes from the Instagram profile and is applied to both. If the
  two differ, the hours table needs splitting.
- **The Google ratings** (4,9 / 200 and 5,0 / 42) are a snapshot taken in July
  2026 and are hardcoded in `index.html`. They will drift — refresh them or drop
  the `.place__rate` line.
- **The story copy.** Written to fit the shop's voice from its Instagram
  ("Ieși la o cafea?", coffeeholic place, opens 07:30); it is not dictated
  copy. Both languages live in the `I18N` table in `assets/js/main.js`.

Confirmed: the handle, the tagline, both addresses, and the 07:30 opening.

---

## Layout

```
index.html                  markup + the SVG sprite (apple mark, icons)
assets/css/main.css         the whole design system, in numbered sections
assets/css/fonts.css        self-hosted @font-face rules
assets/fonts/               woff2, latin + latin-ext
assets/js/main.js           i18n, opening hours, menu, gallery, motion
assets/img/                 favicon + Open Graph card
assets/instagram/           gallery photos land here
assets/locations/           the two storefront photos land here
data/menu.json              the menu, bilingual
data/instagram.json         the contact-sheet manifest
scripts/fetch-instagram.mjs pulls posts from Instagram
```

To restyle: everything comes from the custom properties at the top of
`main.css`. Change `--red` and `--paper` and the whole site re-prints.
