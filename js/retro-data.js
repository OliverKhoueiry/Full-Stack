// ---------------------------------------------------------
// Curated "All-Time Favorite Retro Games" — 15 real items,
// hand-written descriptions. Rendered as cartridge cards
// (no external images, by design — see README).
// ---------------------------------------------------------
const RETRO_GAMES = [
  {
    title: "Super Mario Bros.",
    year: 1985,
    platform: "NES",
    genre: "Platformer",
    color: "#ffb84d",
    description:
      "The game that proved a side-scroller could be tight, generous, and endlessly replayable. Every level teaches you a new trick before it tests you on it.",
  },
  {
    title: "The Legend of Zelda",
    year: 1986,
    platform: "NES",
    genre: "Action-Adventure",
    color: "#4dd9c7",
    description:
      "No hand-holding, no map markers — just a battery save, an overworld full of secrets, and the first real taste of an open world on a console.",
  },
  {
    title: "Tetris",
    year: 1984,
    platform: "Various",
    genre: "Puzzle",
    color: "#ff4d8d",
    description:
      "Seven shapes, one grid, and a difficulty curve that never lies to you. Still the cleanest proof that a great game needs almost nothing to work.",
  },
  {
    title: "Sonic the Hedgehog",
    year: 1991,
    platform: "Sega Genesis",
    genre: "Platformer",
    color: "#ffb84d",
    description:
      "Speed as a design philosophy — loops, ramps, and momentum physics built around the idea that platforming could feel like flying, not just jumping.",
  },
  {
    title: "Street Fighter II",
    year: 1991,
    platform: "Arcade",
    genre: "Fighting",
    color: "#ff4d8d",
    description:
      "Defined the fighting-game grammar almost everyone still uses: special-move inputs, distinct character kits, and rivalries born entirely in the arcade.",
  },
  {
    title: "Chrono Trigger",
    year: 1995,
    platform: "SNES",
    genre: "RPG",
    color: "#4dd9c7",
    description:
      "A time-travel RPG with no filler — every era you visit changes the ones around it, and the multiple endings actually reward paying attention.",
  },
  {
    title: "Doom",
    year: 1993,
    platform: "MS-DOS",
    genre: "FPS",
    color: "#ffb84d",
    description:
      "Not the first shooter, but the one that made the genre a genre — fast movement, tight corridors, and a soundtrack that still slaps on modding rigs today.",
  },
  {
    title: "Metal Gear Solid",
    year: 1998,
    platform: "PlayStation",
    genre: "Stealth-Action",
    color: "#4dd9c7",
    description:
      "Turned 'avoid being seen' into a full genre, then spent its cutscenes arguing about nuclear deterrence — cinematic ambition nobody expected from a game.",
  },
  {
    title: "Final Fantasy VII",
    year: 1997,
    platform: "PlayStation",
    genre: "RPG",
    color: "#ff4d8d",
    description:
      "Pre-rendered backgrounds and blocky polygon models somehow added up to one of the most emotionally effective stories the medium had told at the time.",
  },
  {
    title: "GoldenEye 007",
    year: 1997,
    platform: "Nintendo 64",
    genre: "FPS",
    color: "#ffb84d",
    description:
      "Proved console shooters could work without a mouse, then quietly invented the four-player split-screen deathmatch night as we know it.",
  },
  {
    title: "Pokémon Red & Blue",
    year: 1996,
    platform: "Game Boy",
    genre: "RPG",
    color: "#4dd9c7",
    description:
      "A trading-and-battling loop simple enough for a playground, deep enough that competitive teams are still being theorycrafted decades later.",
  },
  {
    title: "Castlevania: Symphony of the Night",
    year: 1997,
    platform: "PlayStation",
    genre: "Metroidvania",
    color: "#ff4d8d",
    description:
      "The game the 'Metroidvania' label is half-named after — an inverted castle, RPG stats bolted onto platforming, and backtracking that never feels like a chore.",
  },
  {
    title: "Half-Life",
    year: 1998,
    platform: "PC",
    genre: "FPS",
    color: "#ffb84d",
    description:
      "No cutscenes, no loading-screen exposition dumps — the story happens entirely in real time around you, which was radical for a shooter in 1998.",
  },
  {
    title: "Star Fox 64",
    year: 1997,
    platform: "Nintendo 64",
    genre: "Rail Shooter",
    color: "#4dd9c7",
    description:
      "On-rails flight combat with branching paths and a voice cast so quotable ('Do a barrel roll!') that the lines outlived the cartridge.",
  },
  {
    title: "Diablo",
    year: 1996,
    platform: "PC",
    genre: "Action RPG",
    color: "#ff4d8d",
    description:
      "Randomized dungeons and loot drops turned 'one more run' into a genre unto itself — the ancestor of basically every loot-based ARPG since.",
  },
];

class RetroGallery {
  constructor(api, games, mountEl) {
    this.api = api;
    this.games = games;
    this.mountEl = mountEl;
  }

  async init() {
    this.#renderSkeleton();

    // Look up real cover art for each curated title via the RAWG API,
    // constrained to a window around the game's actual release year so
    // we don't accidentally grab a modern remaster/remake's cover art
    // instead of the original release the text is describing.
    await Promise.allSettled(
      this.games.map(async (game) => {
        try {
          const dateRange = `${game.year - 1}-01-01,${game.year + 1}-12-31`;
          const results = await this.api.getGames({
            search: game.title,
            pageSize: 5,
            dates: dateRange,
          });
          const match = this.#closestByYear(results, game.year);
          // If nothing matches within the year window, leave it unset
          // (falls back to the gradient tile) rather than risk showing
          // a mismatched version.
          game.image = match?.background_image || null;
        } catch {
          game.image = null;
        }
      })
    );

    this.render();
  }

  #closestByYear(results, targetYear) {
    let best = null;
    let bestDiff = Infinity;

    for (const r of results) {
      if (!r.released) continue;
      const year = parseInt(r.released.slice(0, 4), 10);
      if (Number.isNaN(year)) continue;
      const diff = Math.abs(year - targetYear);
      if (diff < bestDiff) {
        best = r;
        bestDiff = diff;
      }
    }
    return best;
  }

  #renderSkeleton() {
    this.mountEl.innerHTML = this.games
      .map(
        () => `
        <div class="col-sm-6 col-lg-4">
          <div class="cartridge">
            <div class="art">
              <div class="pixel-spinner"></div>
            </div>
            <div class="body">
              <div class="skeleton-line" style="width:60%"></div>
              <div class="skeleton-line" style="width:40%"></div>
            </div>
          </div>
        </div>`
      )
      .join("");
  }

  render() {
    this.mountEl.innerHTML = this.games
      .map((game) => {
        const initial = game.title.trim().charAt(0).toUpperCase();
        const artStyle = game.image
          ? `background-image:url('${game.image}'); --cart-color:${game.color}`
          : `--cart-color:${game.color}`;

        return `
        <div class="col-sm-6 col-lg-4">
          <div class="cartridge">
            <div class="art" style="${artStyle}">
              ${game.image ? "" : `<span class="initial" aria-hidden="true">${initial}</span>`}
              <span class="cart-label">${game.genre}</span>
            </div>
            <div class="body">
              <h4>${game.title}</h4>
              <div class="cart-meta">${game.year} &nbsp;·&nbsp; ${game.platform}</div>
              <p>${game.description}</p>
            </div>
          </div>
        </div>`;
      })
      .join("");
  }
}
