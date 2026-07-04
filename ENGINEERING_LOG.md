# Engineering Log — GameVault

## Entry 1

**Date:** July 1, 2026
**What I worked on:** Initial project scaffold — set up the three-page structure (Home, Browse Games, Retro Shelf), consistent nav bar, the `GameVaultAPI` wrapper class for the RAWG API, and the ES6 class structure for the carousel, game browser, and retro gallery.
**Decisions made and why:** Chose to fetch one batch of ~40 games from RAWG on the Browse Games page and filter it entirely client-side (search + genre + platform), rather than hitting the API on every keystroke, to satisfy the client-side filtering requirement directly. Decided against using real images for the retro shelf initially, since sourcing box art for 15 games raised copyright and broken-link concerns.
**Problems hit and how I solved them:** None significant at this stage — mostly scaffolding.
**Commit(s) from this session:** "Add base HTML structure for Home, Games, and Retro pages", "Add design system stylesheet", "Add GameVaultAPI class for RAWG API integration", "Add FeaturedCarousel class building Bootstrap carousel from live API data", "Add GameBrowser class with client-side search and genre/platform filtering", "Add curated retro games data and RetroGallery rendering class", "Add nav highlighting, README, and engineering log"

---

## Entry 2

**Date:** July 2, 2026
**What I worked on:** Got a free RAWG API key and pushed the initial project to GitHub. Deployed the site live on Vercel.
**Decisions made and why:** Deployed as a static site with no build step since the project is plain HTML/CSS/JS.
**Problems hit and how I solved them:** Hit intermittent `git push` failures ("Failed to connect to github.com port 443") caused by a local network/connectivity issue, not a code problem. Resolved by retrying the push after confirming basic connectivity with `ping` and `curl`.
**Commit(s) from this session:** Initial push of all base files to `origin/main`; first Vercel deployment.

---

## Entry 3

**Date:** July 3, 2026
**What I worked on:** Reviewed the deployed site and decided the initial visual design (a retro CRT-scanline theme with pixel-style typography) looked generic and templated. Redesigned the entire UI around a PlayStation Store-inspired direction: true-black background, blue accent color, bold typography, and a tile-based grid layout for both the games browser and the retro shelf.
**Decisions made and why:** Replaced the CRT bezel/scanline carousel wrapper with a full-bleed hero banner with a gradient overlay, matching how PS Store presents featured content. Switched game cards to a portrait tile ratio and gave the retro shelf a gradient "box art" tile style instead of the earlier flat cartridge cards.
**Problems hit and how I solved them:** After the redesign, noticed a subtext paragraph on the Retro Shelf page (using Bootstrap's default `text-muted` class) had poor contrast against the new black background. Fixed by defining a custom, higher-contrast color for that specific element.
**Commit(s) from this session:** "Redesign with PlayStation Store-inspired dark UI and tile grids", "Clean up labels and fix low-contrast text on retro shelf page"

---

## Entry 4

**Date:** July 4, 2026
**What I worked on:** Replaced the retro shelf's gradient-only tiles with real cover art fetched from the RAWG API. Wrote the AI-use appendix and finalized the README. Added mobile, tablet, and desktop screenshots to `/evidence`.
**Decisions made and why:** Chose to look up cover art per curated title via the RAWG API rather than hotlinking images from elsewhere, to stay consistent with the API-driven approach used on the Browse Games page and avoid copyright/broken-link issues.
**Problems hit and how I solved them:** The first version of the image lookup queried RAWG by title and used the first search result, which sometimes returned a modern remaster's cover art instead of the original release described in the card's text (e.g. a 1990s game showing 2020s remake art). Caught this by comparing each card's image against its listed release year. Fixed by constraining the API query to a date range around each game's actual release year and selecting the closest match by release date instead of the first result.
**Commit(s) from this session:** "Fetch real cover art for retro shelf via RAWG, with skeleton loading state", "Filter retro cover art lookups by release year to avoid version mismatches", "Fill in AI-use appendix and repo/deployment links", "Add mobile, tablet, and desktop evidence screenshots"

---

## Custom requirement note

Bootstrap carousel (featured section) — implemented in `js/carousel.js`. The `FeaturedCarousel`
class fetches featured games from the RAWG API and builds Bootstrap's carousel DOM structure
dynamically, rendered as a full-bleed hero banner with a dark gradient overlay for text
legibility as the page's signature visual element. See the code comment at the top of that file
for the same explanation in-repo.