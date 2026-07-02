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
  RAWG_API_KEY: "7af822651bdf467094f11824b4425fd8",
  RAWG_BASE_URL: "https://api.rawg.io/api",
};
```

## Custom UI requirement — Bootstrap carousel

The assigned requirement was a **Bootstrap carousel for a featured section**. It's implemented
in `js/carousel.js` (`FeaturedCarousel` class): the class fetches 6 recent/trending games from
RAWG, then builds Bootstrap 5's native carousel markup (`data-bs-ride`, indicators, prev/next
controls) dynamically from that data, rendered as a full-bleed hero banner with a dark gradient
overlay for text legibility. Loading, empty, and error states are handled before the carousel
markup is injected — see the comment block at the top of `carousel.js`.

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

- Live URL: https://full-stack-xi-two.vercel.app
- Repo: https://github.com/OliverKhoueiry/Full-Stack

## Evidence

Mobile / tablet / desktop screenshots go in `/evidence`. Take these after your API key is live
and the carousel is actually rendering game art, not the loading state.

## AI-Use Appendix
Tools used and purpose of use
Claude (Anthropic) was used throughout the development of this project to accelerate implementation of well-defined, repetitive front-end structures, while all architectural decisions, testing, debugging verification, and final design judgments were made by the author. Specifically, Claude was used to: (1) scaffold the initial HTML structure and ES6 class architecture for the RAWG API wrapper (GameVaultAPI), the Bootstrap carousel builder (FeaturedCarousel), the search/filter logic (GameBrowser), and the curated content renderer (RetroGallery); (2) propose and implement a visual redesign of the site's styling; and (3) assist in diagnosing and resolving functional bugs identified by the author during manual testing of the deployed site.

Representative prompts

An initial scaffolding request describing the project's technical requirements, including the mandated Bootstrap carousel component, RAWG API integration, client-side search and filtering functionality, and a curated collection of fifteen retro games.
A revision request to replace the initial visual design, which was assessed by the author as generic and stylistically indicative of unmodified AI output, with a design direction modeled on a specific, named reference interface (the PlayStation Store).
A follow-up request to replace the retro collection's placeholder visual elements with cover art retrieved dynamically from the RAWG API.

Identified errors and corrective actions

Generic initial visual design. The first design iteration—featuring a retro CRT-scanline aesthetic and pixel-styled typography—was identified by the author as visually templated and unrepresentative of deliberate design intent. This was determined through direct visual inspection of the rendered output rather than through any automated check. The issue was resolved by directing a full redesign around a specific, named visual reference, which produced a more distinctive and intentional result better aligned with the project's design requirements.
Incorrect API-sourced imagery. When cover art retrieval was implemented for the retro collection, the initial approach queried the RAWG API by game title and used the first returned result without further validation. This occasionally returned artwork from a later remaster or re-release rather than the original title being described in the accompanying text—for example, displaying contemporary cover art alongside descriptive text referencing a title's original 1990s release. This discrepancy was identified by the author through manual comparison of each card's image against its listed release year and platform. The defect was corrected by constraining API queries to a date range surrounding each title's documented release year and selecting the result with the closest matching release date, rather than accepting the first result returned.
Insufficient text contrast. Following the visual redesign, descriptive text on the Retro Shelf page inherited Bootstrap's default muted-gray text color, which produced insufficient contrast against the page's near-black background and compromised readability. This was identified through visual review of the deployed site. The issue was resolved by defining and applying a custom text color with adequate contrast for that specific element.
