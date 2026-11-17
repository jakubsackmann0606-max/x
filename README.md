# Old Williams Pub: website

A one-page site built with plain HTML, CSS and a little JavaScript. There's no build step: open `index.html` in a browser, or upload the folder to any static host (Netlify, Vercel, GitHub Pages, cPanel).

## Things to update

Every placeholder is in **[square brackets]** in `index.html`.

| What | Where |
|---|---|
| Story, year founded | `index.html`, `#about` section |
| Menu items and prices | `index.html`, `#menu` section (one `<li>` per item) |
| Weekly events | `index.html`, `#events` section (one `<article>` per event) |
| Address, phone, email, hours | `index.html`, `#visit` section, **and** the JSON-LD block in `<head>` |
| "Open now" logic | `HOURS` in `js/main.js` (keep it in sync with the listed hours) |
| Map | change `q=` in the map `<iframe>` src to your address |
| Social links | the `href="#"` links in the footer |
| Colours and fonts | `:root` at the top of `css/styles.css` |

## Photos

Images are in `assets/img/`. To swap one, replace the `.webp` **and** `.jpg` files with the same names (or update the paths in `index.html`). The current interior images are AI-generated placeholders. Real photos will look better.

## Booking form

The form only validates and shows a thank-you message for now. To actually receive bookings, point it at a form service (e.g. Formspree, Netlify Forms) or replace it with your booking widget (OpenTable, Resy and similar).
