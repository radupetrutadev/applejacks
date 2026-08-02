# Aroma Land — shop redesign

A new front end for [aromaland-shop.ro](https://www.aromaland-shop.ro/), the
aromatherapy and home-fragrance shop run by **Electric Masters S.R.L.** in
Craiova under the **Aroma Land** brand.

Static HTML, CSS and JavaScript. No framework, no build step, no dependencies,
no third-party requests. Open `index.html` over `http://` and it works.

```bash
npm start          # from the repo root — python3 -m http.server 8080
# then http://localhost:8080/aromaland/
```

It lives in this subfolder so the existing Apple Jacks site at the repo root is
left untouched. On GitHub Pages it serves at `/aromaland/`.

---

## What the redesign is trying to fix

The brief was: modern, less clutter, faster to buy, simple UI, fast, mobile
first. Everything below follows from that, in that order.

### The purchase path is three taps

The old flow is the usual one: category page → product page → add to cart →
cart page → checkout page → done. Six loads. Here nothing navigates at all.

| | |
|---|---|
| **Add from the grid** | Every card has a real add button, always visible — not on hover, because hover does not exist on a phone. It turns into a −/n/+ stepper in place. |
| **One sheet for everything** | Cart and checkout are two views of the same slide-over. `Finalizează comanda` swaps the view; the back arrow returns. No page load, no scroll position lost. |
| **Buy now** | The quick view has `Cumpără acum`, which adds the item and jumps straight to the delivery form — grid to checkout in two taps. |
| **Six fields** | Name, phone, email, county, town, street. Delivery and payment are two radio pairs, both pre-selected with the common choice. No account, ever. |
| **It remembers you** | The cart survives a reload; so do your delivery details, so the second order is a one-tap form. |
| **Pickup skips the address** | Choosing *Ridicare din magazin* hides the whole address block and drops it from validation. |

The free-shipping meter at the top of the cart is the one bit of merchandising
kept: it states plainly how much is left to 250 lei, because that is
information the customer wants anyway.

### Less clutter

There is exactly **one** navigation control: the category chips in the sticky
toolbar. No mega-menu, no hamburger, no sidebar of collapsed filter accordions,
no carousel, no newsletter interstitial, no cookie-wall theatre. Categories were
folded from the original ~18 into 7 that a person can actually scan.

### Search that speaks Romanian

Typing `betisoare` finds *Bețișoare*, `lamaie` would find *Lămâie*, `lavanda`
finds *Lavandă*. Queries and product text are both folded through
`NFD` + combining-mark strip, so diacritics never stand between someone and the
thing they want. Multi-word queries are AND-ed. `/` focuses the field, Escape
clears it.

### Mobile first, literally

Designed at 390px and widened from there. Two columns of products on a phone,
three at 680px, four at 1040px. The cart and quick view are bottom sheets that
hug their content and cap at 90–92dvh. A buy bar pins to the bottom of the
screen the moment the cart is not empty. Tap targets clear 32px (the one
exception, a footer legal link, clears the 24px WCAG 2.2 minimum). Safe-area
insets are respected on notched phones. No horizontal overflow at any width.

---

## Performance

Measured in Chromium against the built page:

| | |
|---|---|
| Requests | **8**, all same-origin |
| Third-party requests | **0** |
| Transfer, uncompressed | ~196 KB, of which **111 KB is fonts** |
| HTML + CSS + JS, gzipped | **27.7 KB** together |
| JS framework | none |
| Blocking JS | none — both scripts are `defer` |

How that is achieved:

- **No photography.** There is none to license, so product imagery is line-art
  SVG in a sprite, tinted per product from a single `--h` hue in the catalog.
  Seven drawings cover 37 products, cost about 4 KB, and are sharp at any DPI.
- **The catalog is a script, not a fetch.** `catalog.js` assigns
  `window.CATALOG`, so there is no round-trip, no CORS, no loading state, and
  the page works off `file://`.
- **Self-hosted fonts**, latin + latin-ext only (latin-ext carries `ă â î ș ț`),
  `font-display: swap`, and the UI face preloaded.
- **`content-visibility: auto`** on cards, so off-screen products cost nothing
  to lay out.
- Theme is resolved in a tiny inline script before first paint — no flash.

### Accessibility

Semantic landmarks and a skip link; the cart and quick view are native
`<dialog>` elements, so focus trapping, inertness and Escape come from the
platform; visible focus rings throughout; `aria-live` on the result count;
labelled controls; and full `prefers-reduced-motion` support.

---

## Editing it

`assets/js/catalog.js` is the only file you need for content. Categories,
products, the free-shipping threshold, shipping prices and the county list all
live there, with the field meanings documented at the top. A product's `h` is
its hue — pick it from the scent and the card, the art and the cart thumbnail
all re-tint together.

To restyle, change the custom properties at the top of `main.css`. `--accent`
and `--paper` carry the whole look.

---

## What is not real yet

**The live site could not be read from this environment.** `aromaland-shop.ro`
is blocked by the session's egress policy (the proxy returns 403 on CONNECT),
so the catalog was reconstructed from public search results rather than scraped.
That means:

| | |
|---|---|
| **Confirmed** | The business, brand, and that Electric Masters S.R.L. has made these in Craiova since 1997. Free shipping over 250 lei, 30-day returns, card via EuPlătesc or ramburs, courier or in-store pickup. The Dedeman / Auchan / Meli Melo partnerships. The category structure. |
| **Real product names** | Difuzor Conico / Oslo / Relax / Confort, Ulei aromaterapie Lavandă & Eucalipt, Ulei esențial Eucalipt / Patchouli / Breathe Easy (S&S India). |
| **One real price** | Difuzor Conico, 132 lei reduced from 165 lei. |
| **Everything else is a placeholder** | All other prices, the ratings, the review counts, the descriptions and the scent notes are plausible, not verified. They are there so the layout can be judged. Replace them from the real catalogue before this goes near a customer. |

Also still to wire:

- **A backend.** `submitOrder()` in `app.js` assembles the complete order
  object — buyer, lines, shipping, payment, totals — and then shows the
  confirmation. Point it at the real endpoint where the comment says so, and
  hand the card path to EuPlătesc.
- **Stock, VAT and invoicing** are not modelled.
- **Contact details in the footer** are placeholders.
- **Legal pages** (`/info/termeni`, `/info/confidentialitate`, ANPC/SOL) are
  linked but not written; the ANPC and SOL links point at the real authorities.
