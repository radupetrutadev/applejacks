# assets/instagram

Photos for the contact sheet on the home page live here.

Two ways to fill this folder:

1. **Automatically** — `npm run instagram` (see `scripts/fetch-instagram.mjs`).
   It downloads the latest posts and rewrites `data/instagram.json` for you.
2. **By hand** — drop square-ish JPGs in here (1080×1080 is ideal), then point
   each entry in `data/instagram.json` at its file:

   ```json
   { "id": "aj-01", "image": "assets/instagram/applejacksdaily-01.jpg", … }
   ```

Any entry left with `"image": null` renders a generated two-ink plate instead,
so the grid always looks finished — it never shows a broken image.
