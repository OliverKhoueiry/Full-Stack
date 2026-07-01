# GameVault

**Author:** Oliver — Lebanese University, Faculty of Engineering, Branch 2 (Roumieh)
**Course:** Full Stack Development — Final Project 2026

## About

GameVault is a video game discovery site. It combines a live public API with a
hand-curated retro collection:

- **Home** — hero + a Bootstrap 5 carousel of featured/recent releases pulled from the API.
- **Browse Games** — search + genre/platform filters over a fetched batch of live game data.
- **Retro Shelf** — 15 hand-picked "all-time favorite retro games," each with an original write-up.

## API used

[RAWG Video Games Database API](https://rawg.io/apidocs) — a free, key-based API with data
on 500,000+ games (covers, ratings, genres, platforms, release dates).

**Setup:** Register for a free key at the link above, then paste it into `js/config.js`:

```js
const GV_CONFIG = {
  RAWG_API_KEY: "YOUR_RAWG_API_KEY_HERE",
  RAWG_BASE_URL: "https://api.rawg.io/api",
};
```

## Custom UI requirement — Bootstrap carousel

The assigned requirement was a **Bootstrap carousel for a featured section**. It's implemented
in `js/carousel.js` (`FeaturedCarousel` class): the class fetches 6 recent/trending games from
RAWG, then builds Bootstrap 5's native carousel markup (`data-bs-ride`, indicators, prev/next
controls) dynamically from that data. It's wrapped in a CRT-style bezel (`.crt-frame` in
`css/style.css`) with a scanline overlay as this project's visual signature. Loading, empty, and
error states are handled before the carousel markup is injected — see the comment block at the
top of `carousel.js`.

## Tech stack

- Semantic HTML5, hand-written CSS3 (custom properties / design tokens, Flexbox)
- Bootstrap 5 (carousel, nav, grid, form controls)
- Vanilla JavaScript, ES6 classes only (`GameVaultAPI`, `FeaturedCarousel`, `GameBrowser`,
  `RetroGallery`, `NavHighlighter`) — no jQuery
- RAWG API for live data

## Pages & navigation

3 pages (`index.html`, `games.html`, `retro.html`), consistent nav bar on all three, plain
anchor-based routing (`<a href="page.html">`).

## Deployment

Deploy for free on Vercel, Netlify, or GitHub Pages — this is a static site (no build step
needed), so any of the three works by pointing it at the repo root.

- Live URL: _add after deploying_
- Repo: _add your GitHub repo link_

## Evidence

Mobile / tablet / desktop screenshots go in `/evidence`. Take these after your API key is live
and the carousel is actually rendering game art, not the loading state.

## AI-use appendix

> Fill this in honestly and specifically per the assignment brief — tools, prompts, and at least
> 2 concrete things the AI got wrong and how you found/fixed them. Example structure below;
> replace with your real usage.

**Tools used:**
- Claude — scaffolded the initial HTML/CSS/JS structure, the RAWG API wrapper class, and the
  carousel/filter logic.

**Example prompts used (replace with your actual ones):**
1. "..."
2. "..."
3. "..."

**Things the AI got wrong / had to be fixed (replace with your real findings):**
1. _e.g._ — describe an issue you hit (a RAWG field name that didn't match what was assumed, a
   filter edge case, a CSS specificity conflict) and exactly how you diagnosed and fixed it.
2. _e.g._ — same, for a second issue.
