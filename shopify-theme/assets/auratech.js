function initAuraTechTheme() {
  document.querySelectorAll("[data-menu-toggle]").forEach((menuToggle) => {
    const header = menuToggle.closest("[data-header]");
    const mobileMenu = header ? header.querySelector("[data-mobile-menu]") : null;

    if (!mobileMenu || menuToggle.dataset.bound === "true") return;

    menuToggle.dataset.bound = "true";
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
      mobileMenu.classList.toggle("is-open", !isOpen);
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
        mobileMenu.classList.remove("is-open");
      });
    });
  });

  document.querySelectorAll(".reviews-track").forEach((reviewTrack) => {
    if (reviewTrack.dataset.cloned === "true") return;

    const cards = Array.from(reviewTrack.children);
    cards.forEach((card) => {
      reviewTrack.appendChild(card.cloneNode(true));
    });
    reviewTrack.dataset.cloned = "true";
  });
}

document.addEventListener("DOMContentLoaded", initAuraTechTheme);
document.addEventListener("shopify:section:load", initAuraTechTheme);
