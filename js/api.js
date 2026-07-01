// ---------------------------------------------------------
// GameVaultAPI
// Thin wrapper around the RAWG Video Games Database API.
// https://api.rawg.io/docs/
// ---------------------------------------------------------
class GameVaultAPI {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  /**
   * Builds a query string from a params object, always injecting the API key.
   */
  #buildUrl(path, params = {}) {
    const url = new URL(`${this.baseUrl}${path}`);
    url.searchParams.set("key", this.apiKey);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
    return url.toString();
  }

  async #get(path, params) {
    const url = this.#buildUrl(path, params);
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          "API key missing or invalid. Add a free RAWG key in js/config.js."
        );
      }
      throw new Error(`RAWG API request failed (status ${response.status}).`);
    }

    return response.json();
  }

  /**
   * Fetches a batch of games. Used both for the homepage carousel
   * and as the "raw" dataset the games page filters client-side.
   */
  async getGames({ pageSize = 40, ordering = "-rating", dates, search } = {}) {
    const data = await this.#get("/games", {
      page_size: pageSize,
      ordering,
      dates,
      search,
    });
    return data.results || [];
  }

  /** Games flagged as recent/high-anticipation, for the hero carousel. */
  async getFeaturedGames(count = 6) {
    const currentYear = new Date().getFullYear();
    const games = await this.getGames({
      pageSize: count,
      ordering: "-added",
      dates: `${currentYear - 1}-01-01,${currentYear + 1}-12-31`,
    });
    return games.slice(0, count);
  }

  async getGenres() {
    const data = await this.#get("/genres", { page_size: 40 });
    return data.results || [];
  }

  async getPlatforms() {
    const data = await this.#get("/platforms", { page_size: 40 });
    return data.results || [];
  }
}
