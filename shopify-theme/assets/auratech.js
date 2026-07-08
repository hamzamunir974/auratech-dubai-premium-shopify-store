const AURATECH_WISHLIST_KEY = "auratech:wishlist";

function readWishlist() {
  try {
    const parsed = JSON.parse(localStorage.getItem(AURATECH_WISHLIST_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeWishlist(items) {
  try {
    localStorage.setItem(AURATECH_WISHLIST_KEY, JSON.stringify(items));
  } catch (error) {
    return;
  }
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"]/g, (character) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;"
    }[character];
  });
}

function updateWishlistButtons() {
  const wishlist = readWishlist();
  const handles = new Set(wishlist.map((item) => item.handle));

  document.querySelectorAll("[data-wishlist-button]").forEach((button) => {
    const handle = button.dataset.productHandle;
    if (!handle) return;

    const isSaved = handles.has(handle);
    button.classList.toggle("is-active", isSaved);
    button.setAttribute("aria-pressed", String(isSaved));
    button.setAttribute("aria-label", `${isSaved ? "Remove" : "Add"} ${button.dataset.productTitle || "product"} ${isSaved ? "from" : "to"} wishlist`);
    if (button.classList.contains("main-product__wishlist")) {
      button.textContent = isSaved ? "Saved to Wishlist" : "Save to Wishlist";
    } else {
      button.textContent = isSaved ? "x" : "+";
    }
  });
}

function toggleWishlistItem(button) {
  const item = {
    handle: button.dataset.productHandle,
    title: button.dataset.productTitle,
    url: button.dataset.productUrl,
    image: button.dataset.productImage,
    price: button.dataset.productPrice,
    variantId: button.dataset.variantId,
    available: button.dataset.productAvailable === "true"
  };

  if (!item.handle) return;

  const wishlist = readWishlist();
  const exists = wishlist.some((savedItem) => savedItem.handle === item.handle);
  const nextWishlist = exists
    ? wishlist.filter((savedItem) => savedItem.handle !== item.handle)
    : [item, ...wishlist];

  writeWishlist(nextWishlist);
  updateWishlistButtons();
  renderWishlistPage();
}

function wishlistCardTemplate(item) {
  const title = escapeHtml(item.title);
  const price = escapeHtml(item.price);
  const image = escapeHtml(item.image);
  const url = escapeHtml(item.url || "/collections/all");
  const variantId = escapeHtml(item.variantId);
  const disabled = item.available ? "" : "disabled";
  const buttonLabel = item.available ? "Add to Cart" : "Sold Out";

  return `
    <article class="product-card wishlist-item" data-wishlist-item="${escapeHtml(item.handle)}">
      <button class="product-card__wishlist is-active" type="button" data-wishlist-remove="${escapeHtml(item.handle)}" aria-label="Remove ${title} from wishlist">x</button>
      <a href="${url}" aria-label="${title}">
        <img src="${image}" alt="${title}" loading="lazy" width="700" height="594">
      </a>
      <div class="product-card__content">
        <p class="product-card__eyebrow">Saved item</p>
        <h3><a href="${url}">${title}</a></h3>
        <div class="product-card__bottom">
          <strong>${price}</strong>
          <button type="button" data-wishlist-add-to-cart="${variantId}" ${disabled}>${buttonLabel}</button>
        </div>
      </div>
    </article>`;
}

function renderWishlistPage() {
  const wishlist = readWishlist();
  const grids = document.querySelectorAll("[data-wishlist-grid]");
  const emptyStates = document.querySelectorAll("[data-wishlist-empty]");

  grids.forEach((grid) => {
    if (wishlist.length === 0) {
      grid.hidden = true;
      grid.innerHTML = "";
      return;
    }

    grid.hidden = false;
    grid.innerHTML = wishlist.map(wishlistCardTemplate).join("");
  });

  emptyStates.forEach((empty) => {
    empty.hidden = wishlist.length > 0;
  });
}

function openWishlistDrawer() {
  const drawer = document.querySelector("[data-wishlist-drawer]");
  if (!drawer) return;
  renderWishlistPage();
  drawer.hidden = false;
  document.documentElement.classList.add("wishlist-drawer-open");
}

function closeWishlistDrawer() {
  const drawer = document.querySelector("[data-wishlist-drawer]");
  if (!drawer) return;
  drawer.hidden = true;
  document.documentElement.classList.remove("wishlist-drawer-open");
}

async function addWishlistItemToCart(variantId) {
  if (!variantId) return;

  try {
    const response = await fetch("/cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ items: [{ id: Number(variantId), quantity: 1 }] })
    });

    if (!response.ok) throw new Error("Cart add failed");
    window.location.href = "/cart";
  } catch (error) {
    window.location.href = `/cart/add?id=${encodeURIComponent(variantId)}&quantity=1`;
  }
}

function initMobileMenu() {
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
}

function initReviewMarquee() {
  document.querySelectorAll(".reviews-track").forEach((reviewTrack) => {
    if (reviewTrack.dataset.cloned === "true") return;

    const cards = Array.from(reviewTrack.children);
    cards.forEach((card) => {
      reviewTrack.appendChild(card.cloneNode(true));
    });
    reviewTrack.dataset.cloned = "true";
  });
}

function bindThemeEvents() {
  if (document.documentElement.dataset.themeBound === "true") return;
  document.documentElement.dataset.themeBound = "true";

  document.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-wishlist-open]");
    if (openButton) {
      event.preventDefault();
      openWishlistDrawer();
      return;
    }

    const closeButton = event.target.closest("[data-wishlist-close]");
    if (closeButton) {
      event.preventDefault();
      closeWishlistDrawer();
      return;
    }

    const wishlistButton = event.target.closest("[data-wishlist-button]");
    if (wishlistButton) {
      event.preventDefault();
      toggleWishlistItem(wishlistButton);
      return;
    }

    const removeButton = event.target.closest("[data-wishlist-remove]");
    if (removeButton) {
      const handle = removeButton.dataset.wishlistRemove;
      writeWishlist(readWishlist().filter((item) => item.handle !== handle));
      updateWishlistButtons();
      renderWishlistPage();
      return;
    }

    const cartButton = event.target.closest("[data-wishlist-add-to-cart]");
    if (cartButton) {
      addWishlistItemToCart(cartButton.dataset.wishlistAddToCart);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeWishlistDrawer();
  });
}

function initAuraTechTheme() {
  initMobileMenu();
  initReviewMarquee();
  bindThemeEvents();
  updateWishlistButtons();
  renderWishlistPage();
}

function resetThemeEditorBindings() {
  document.documentElement.removeAttribute("data-theme-bound");
  document.querySelectorAll("[data-menu-toggle]").forEach((toggle) => {
    delete toggle.dataset.bound;
  });
}

window.addEventListener("storage", (event) => {
  if (event.key === AURATECH_WISHLIST_KEY) {
    updateWishlistButtons();
    renderWishlistPage();
  }
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAuraTechTheme);
} else {
  initAuraTechTheme();
}

document.addEventListener("shopify:section:load", () => {
  resetThemeEditorBindings();
  initAuraTechTheme();
});