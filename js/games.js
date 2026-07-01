// ---------------------------------------------------------
// GameBrowser
// Fetches one batch of "raw" results from RAWG, then does all
// search/genre/platform filtering CLIENT-SIDE over that array
// (per the assignment's client-side feature requirement).
// ---------------------------------------------------------
class GameBrowser {
  constructor(api, els) {
    this.api = api;
    this.els = els; // { grid, count, searchInput, genreSelect, platformSelect, state }
    this.allGames = [];
    this.genres = [];
    this.platforms = [];
  }

  async init() {
    this.#bindEvents();
    this.#setState("loading");

    try {
      const [games, genres, platforms] = await Promise.all([
        this.api.getGames({ pageSize: 40, ordering: "-rating" }),
        this.api.getGenres(),
        this.api.getPlatforms(),
      ]);

      this.allGames = games;
      this.genres = genres;
      this.platforms = platforms;

      this.#populateSelect(this.els.genreSelect, genres, "All genres");
      this.#populateSelect(this.els.platformSelect, platforms, "All platforms");

      if (!games.length) {
        this.#setState("empty");
      } else {
        this.#setState("ready");
        this.#render(this.allGames);
      }
    } catch (err) {
      this.#setState("error", err.message);
    }
  }

  #bindEvents() {
    this.els.searchInput.addEventListener("input", () => this.#applyFilters());
    this.els.genreSelect.addEventListener("change", () => this.#applyFilters());
    this.els.platformSelect.addEventListener("change", () => this.#applyFilters());
  }

  #populateSelect(selectEl, items, defaultLabel) {
    const options = [`<option value="">${defaultLabel}</option>`]
      .concat(items.map((item) => `<option value="${item.slug}">${item.name}</option>`))
      .join("");
    selectEl.innerHTML = options;
  }

  #applyFilters() {
    const query = this.els.searchInput.value.trim().toLowerCase();
    const genreSlug = this.els.genreSelect.value;
    const platformSlug = this.els.platformSelect.value;

    const filtered = this.allGames.filter((game) => {
      const matchesQuery = !query || game.name.toLowerCase().includes(query);

      const matchesGenre =
        !genreSlug || (game.genres || []).some((g) => g.slug === genreSlug);

      const matchesPlatform =
        !platformSlug ||
        (game.platforms || []).some((p) => p.platform && p.platform.slug === platformSlug);

      return matchesQuery && matchesGenre && matchesPlatform;
    });

    if (!filtered.length) {
      this.#setState("no-results");
    } else {
      this.#setState("ready");
      this.#render(filtered);
    }
  }

  #render(games) {
    this.els.count.textContent = `${games.length} game${games.length === 1 ? "" : "s"} found`;
    this.els.grid.innerHTML = games.map((game) => this.#cardTemplate(game)).join("");
  }

  #cardTemplate(game) {
    const bg = game.background_image || "";
    const rating = game.rating ? `★ ${game.rating.toFixed(1)}` : "Unrated";
    const chips = (game.genres || [])
      .slice(0, 3)
      .map((g) => `<span class="chip">${g.name}</span>`)
      .join("");
    const platformChip = (game.platforms || [])[0]?.platform?.name;

    return `
      <div class="col-sm-6 col-lg-4 col-xl-3">
        <div class="game-card">
          <div class="thumb" style="background-image:url('${bg}')" role="img" aria-label="${game.name} cover art"></div>
          <div class="body">
            <h4>${game.name}</h4>
            <span class="rating">${rating}${platformChip ? " · " + platformChip : ""}</span>
            <div class="chips">${chips}</div>
          </div>
        </div>
      </div>`;
  }

  #setState(state, message = "") {
    const { grid, state: stateEl, count } = this.els;

    const templates = {
      loading: `<div class="pixel-spinner" role="status" aria-label="Loading games"></div><span>Fetching games from RAWG…</span>`,
      error: `<span>⚠ Something went wrong.</span><span>${message}</span>`,
      empty: `<span>No games came back from the API.</span><span>Try again in a moment.</span>`,
      "no-results": `<span>No matches for that search / filter combo.</span><span>Try clearing a filter.</span>`,
    };

    if (state === "ready") {
      stateEl.classList.add("d-none");
      grid.classList.remove("d-none");
      count.classList.remove("d-none");
      return;
    }

    grid.classList.add("d-none");
    count.classList.add("d-none");
    stateEl.classList.remove("d-none");
    stateEl.classList.toggle("error", state === "error");
    stateEl.innerHTML = templates[state] || "";
  }
}
