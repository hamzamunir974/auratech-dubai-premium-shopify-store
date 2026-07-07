# AuraTech Dubai Shopify Code Guide

This guide shows how to turn the static prototype into a Shopify Online Store 2.0 theme.

## 1. Create or open a Shopify theme

Use Shopify CLI from a theme folder:

```bash
shopify theme dev --store your-store-name
```

Shopify themes use this structure:

```text
assets/
config/
layout/
locales/
sections/
snippets/
templates/
```

## 2. Move the prototype assets

Copy these files into the Shopify theme:

```text
assets/auratech.css              from styles.css
assets/auratech.js               from script.js
assets/auratech-logo-secondary.png
assets/auratech-logo-icon.png
assets/solar-powerbank.png
assets/gold-smartwatch.png
assets/red-headphones.png
assets/charging-dock.png
assets/car-charger.png
assets/mini-projector.png
assets/mini-speaker.png
assets/creator-kit.png
assets/smart-audio-glasses.png
```

In Liquid, replace static asset paths like this:

```liquid
<img src="{{ 'solar-powerbank.png' | asset_url }}" alt="Solar power bank">
```

## 3. Load CSS and JavaScript in `layout/theme.liquid`

Use this structure:

```liquid
<!doctype html>
<html lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ page_title }}{% if current_tags %} - {{ current_tags | join: ', ' }}{% endif %}{% unless page_title contains shop.name %} - {{ shop.name }}{% endunless %}</title>
    {{ content_for_header }}
    {{ 'auratech.css' | asset_url | stylesheet_tag }}
  </head>
  <body>
    {% section 'announcement-bar' %}
    {% section 'site-header' %}

    <main id="MainContent">
      {{ content_for_layout }}
    </main>

    {% section 'site-footer' %}
    {{ 'auratech.js' | asset_url | script_tag }}
  </body>
</html>
```

## 4. Create homepage template

Create `templates/index.json`:

```json
{
  "sections": {
    "hero": { "type": "hero-section" },
    "categories": { "type": "category-section" },
    "featured": { "type": "featured-products" },
    "trust": { "type": "trust-section" },
    "promo": { "type": "promo-banner" },
    "reviews": { "type": "reviews-section" },
    "newsletter": { "type": "newsletter-section" }
  },
  "order": [
    "hero",
    "categories",
    "featured",
    "trust",
    "promo",
    "reviews",
    "newsletter"
  ]
}
```

## 5. Split the HTML into section files

Create these files in `sections/` and move the matching HTML into each file:

```text
announcement-bar.liquid
site-header.liquid
hero-section.liquid
category-section.liquid
featured-products.liquid
trust-section.liquid
promo-banner.liquid
reviews-section.liquid
newsletter-section.liquid
site-footer.liquid
```

Each section should end with a schema block. Example for `hero-section.liquid`:

```liquid
<section class="hero-section section-padding">
  <div class="hero-section__inner page-width">
    <div class="hero-section__content">
      <p class="section-kicker">{{ section.settings.kicker }}</p>
      <h1>{{ section.settings.heading }}</h1>
      <p>{{ section.settings.text }}</p>
      <div class="hero-section__actions">
        <a class="button button--primary" href="{{ section.settings.primary_link }}">{{ section.settings.primary_label }}</a>
        <a class="button button--secondary" href="{{ section.settings.secondary_link }}">{{ section.settings.secondary_label }}</a>
      </div>
    </div>

    <div class="hero-showcase">
      <article class="hero-product hero-product--large">
        <img src="{{ section.settings.main_image | image_url: width: 900 }}" alt="{{ section.settings.main_image.alt | escape }}">
      </article>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Hero section",
  "settings": [
    { "type": "text", "id": "kicker", "label": "Kicker", "default": "Premium UAE electronics" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Dubai's Premium Destination for Tech" },
    { "type": "textarea", "id": "text", "label": "Text", "default": "Discover smart accessories, audio essentials, charging solutions, and everyday gadgets selected for modern UAE lifestyles." },
    { "type": "text", "id": "primary_label", "label": "Primary button label", "default": "Shop Now" },
    { "type": "url", "id": "primary_link", "label": "Primary button link" },
    { "type": "text", "id": "secondary_label", "label": "Secondary button label", "default": "Explore Deals" },
    { "type": "url", "id": "secondary_link", "label": "Secondary button link" },
    { "type": "image_picker", "id": "main_image", "label": "Main product image" }
  ],
  "presets": [{ "name": "Hero section" }]
}
{% endschema %}
```

## 6. Make the header Shopify-aware

In `site-header.liquid`, use Shopify routes and menus:

```liquid
<a class="brand-logo" href="{{ routes.root_url }}" aria-label="{{ shop.name }}">
  <img class="brand-logo__full" src="{{ 'auratech-logo-secondary.png' | asset_url }}" alt="{{ shop.name }}">
  <img class="brand-logo__icon" src="{{ 'auratech-logo-icon.png' | asset_url }}" alt="" aria-hidden="true">
</a>

<nav class="desktop-nav" aria-label="Main navigation">
  {% for link in linklists.main-menu.links %}
    <a href="{{ link.url }}">{{ link.title }}</a>
  {% endfor %}
</nav>

<form class="header-search" action="{{ routes.search_url }}" method="get" role="search">
  <input type="search" name="q" placeholder="Search tech..." value="{{ search.terms | escape }}">
  <button type="submit" aria-label="Search">Search</button>
</form>

<a class="icon-button icon-button--cart" href="{{ routes.cart_url }}" aria-label="Cart">
  Cart
  <span>{{ cart.item_count }}</span>
</a>
```

## 7. Make product cards real

Create `snippets/product-card.liquid`:

```liquid
<article class="product-card">
  <a href="{{ product.url }}">
    {% if product.featured_image %}
      <img
        src="{{ product.featured_image | image_url: width: 700 }}"
        alt="{{ product.featured_image.alt | default: product.title | escape }}"
        loading="lazy"
      >
    {% endif %}
  </a>

  <div class="product-card__content">
    <p class="product-card__eyebrow">{{ product.type | default: product.vendor }}</p>
    <h3><a href="{{ product.url }}">{{ product.title }}</a></h3>
    <div class="rating">***** <span>4.7</span></div>
    <div class="product-card__bottom">
      <strong>{{ product.price | money }}</strong>
      {% form 'product', product %}
        <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
        <button type="submit" {% unless product.available %}disabled{% endunless %}>
          {% if product.available %}Add to Cart{% else %}Sold Out{% endif %}
        </button>
      {% endform %}
    </div>
  </div>
</article>
```

Then in `sections/featured-products.liquid`:

```liquid
{% assign featured_collection = collections[section.settings.collection] %}

<section class="featured-products section-padding" id="featured-products">
  <div class="section-header section-header--split page-width">
    <div>
      <p class="section-kicker">{{ section.settings.kicker }}</p>
      <h2>{{ section.settings.heading }}</h2>
    </div>
  </div>

  <div class="product-grid page-width">
    {% for product in featured_collection.products limit: section.settings.products_to_show %}
      {% render 'product-card', product: product %}
    {% endfor %}
  </div>
</section>

{% schema %}
{
  "name": "Featured products",
  "settings": [
    { "type": "text", "id": "kicker", "label": "Kicker", "default": "Featured products" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "New Arrivals at AuraTech Dubai" },
    { "type": "collection", "id": "collection", "label": "Collection" },
    { "type": "range", "id": "products_to_show", "min": 3, "max": 12, "step": 1, "default": 6, "label": "Products to show" }
  ],
  "presets": [{ "name": "Featured products" }]
}
{% endschema %}
```

## 8. Make newsletter real

In `newsletter-section.liquid`, replace the static form:

```liquid
{% form 'customer', class: 'newsletter-form' %}
  <input type="hidden" name="contact[tags]" value="newsletter">
  <input type="email" name="contact[email]" placeholder="Enter your email" required>
  <button class="button button--primary" type="submit">Sign Up</button>
{% endform %}
```

## 9. Upload and test

Run:

```bash
shopify theme dev --store your-store-name
```

Check these breakpoints:

```text
320px
375px
430px
768px
1024px
1280px
1440px
```

Then push as an unpublished theme:

```bash
shopify theme push --unpublished
```

## 10. Keep the responsive system

Do not remove these responsive foundations from `auratech.css`:

```css
html,
body {
  overflow-x: hidden;
}

.page-width {
  width: min(var(--page-width), calc(100% - (var(--page-gutter) * 2)));
}

.product-grid {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
}
```

These are what keep the store fluid across phones, tablets, laptops, and wide screens.
