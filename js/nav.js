// ---------------------------------------------------------
// NavHighlighter — marks the current page's nav link active.
// ---------------------------------------------------------
class NavHighlighter {
  constructor(navSelector = ".gv-nav .nav-link") {
    this.links = document.querySelectorAll(navSelector);
  }

  apply() {
    const current = window.location.pathname.split("/").pop() || "index.html";
    this.links.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === current);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new NavHighlighter().apply();
});
