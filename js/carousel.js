// ---------------------------------------------------------
// FeaturedCarousel
// Fetches featured games and renders them into Bootstrap 5's
// carousel markup (data-bs-* driven, no custom slide JS needed —
// Bootstrap's own carousel.js handles the sliding).
// ---------------------------------------------------------
class FeaturedCarousel {
  constructor(api, mountEl) {
    this.api = api;
    this.mountEl = mountEl; // the .crt-frame wrapper
  }

  async init() {
    this.#renderLoading();
    try {
      const games = await this.api.getFeaturedGames(6);
      if (!games.length) {
        this.#renderEmpty();
        return;
      }
      this.#renderCarousel(games);
    } catch (err) {
      this.#renderError(err.message);
    }
  }

  #renderLoading() {
    this.mountEl.innerHTML = `
      <div class="carousel-placeholder">
        <div class="pixel-spinner" role="status" aria-label="Loading featured games"></div>
        <span>Loading featured releases…</span>
      </div>`;
  }

  #renderEmpty() {
    this.mountEl.innerHTML = `
      <div class="carousel-placeholder">
        <span>No featured games came back from the API right now.</span>
      </div>`;
  }

  #renderError(message) {
    this.mountEl.innerHTML = `
      <div class="carousel-error">
        <span>⚠ Couldn't load featured games.</span>
        <span>${message}</span>
      </div>`;
  }

  #renderCarousel(games) {
    const indicators = games
      .map(
        (_, i) => `
        <button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="${i}"
          class="${i === 0 ? "active" : ""}" aria-current="${i === 0 ? "true" : "false"}"
          aria-label="Slide ${i + 1}"></button>`
      )
      .join("");

    const slides = games
      .map((game, i) => {
        const bg = game.background_image || "";
        const genres = (game.genres || []).map((g) => g.name).slice(0, 2).join(" · ");
        const rating = game.rating ? `★ ${game.rating.toFixed(1)}` : "Unrated";
        const released = game.released ? game.released.slice(0, 4) : "TBA";

        return `
        <div class="carousel-item ${i === 0 ? "active" : ""}">
          <div class="carousel-slide-bg" style="background-image:url('${bg}')">
            <div class="carousel-slide-content">
              <span class="tag">Featured Release</span>
              <h3>${game.name}</h3>
              <p>${genres || "Genre unlisted"}</p>
              <div class="meta">${rating} &nbsp;·&nbsp; ${released}</div>
            </div>
          </div>
        </div>`;
      })
      .join("");

    this.mountEl.innerHTML = `
      <div id="featuredCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-indicators">${indicators}</div>
        <div class="carousel-inner">${slides}</div>
        <button class="carousel-control-prev" type="button" data-bs-target="#featuredCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#featuredCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>`;
  }
}
