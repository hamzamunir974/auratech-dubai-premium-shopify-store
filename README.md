# AuraTech Dubai Premium Shopify Storefront

AuraTech Dubai is a premium, responsive Shopify-style storefront concept for a UAE-based electronics and smart gadgets store. The design focuses on a clean luxury tech aesthetic, strong mobile responsiveness, trusted retail messaging, and a structure that can be converted into Shopify Liquid sections.

## Project Overview

This storefront was built as a front-end prototype using:

- HTML
- CSS
- JavaScript
- Local brand and product assets

The design is intended for a premium electronics store selling gadgets, mobile accessories, audio products, smartwatches, charging accessories, and tech lifestyle products.

## Key Features

- Premium AuraTech Dubai branding
- Fully responsive layout for mobile, tablet, laptop, and desktop
- Announcement bar with UAE delivery and trust messaging
- Sticky header with navigation, search, account, wishlist, cart, and mobile menu
- Premium hero section with product showcase
- Category cards for mobiles, laptops, audio, smartwatches, and accessories
- Featured product grid with AED pricing, badges, ratings, wishlist buttons, and add-to-cart buttons
- Trust benefits section
- Promotional banner
- Smooth customer review marquee
- Newsletter signup section
- Footer with store links, care links, payment placeholders, and social placeholders
- CSS variables for colors, spacing, radius, shadows, and typography
- Shopify-ready section class naming

## Brand Direction

The design follows the AuraTech Dubai identity:

- Deep charcoal
- Royal blue
- Electric teal
- Silver metallic
- Pure white
- Clean, premium electronics styling

## Project Structure

```text
auratech-dubai-store/
+-- assets/
|   +-- auratech-logo-secondary.png
|   +-- auratech-logo-icon.png
|   +-- auratech-logo-main.png
|   +-- auratech-logo-dark.png
|   +-- product images
+-- index.html
+-- styles.css
+-- script.js
+-- SHOPIFY_CODE_GUIDE.md
+-- README.md
```

## Local Preview

Open this file in a browser:

```text
index.html
```

No build tools or package installation are required for the static prototype.

## Shopify Conversion

The page is organized so it can later be converted into Shopify Online Store 2.0 sections:

- `announcement-bar`
- `site-header`
- `hero-section`
- `category-section`
- `featured-products`
- `trust-section`
- `promo-banner`
- `reviews-section`
- `newsletter-section`
- `site-footer`

See `SHOPIFY_CODE_GUIDE.md` for the step-by-step Shopify conversion guide, including:

- Theme folder structure
- `theme.liquid` setup
- `index.json` homepage template
- Section file mapping
- Product card snippet
- Shopify product form setup
- Newsletter form setup
- Asset URL conversion

## Responsive Testing Targets

The layout is designed for:

- 320px small phones
- 375px standard phones
- 430px large phones
- 768px tablets
- 1024px small laptops
- 1280px desktops
- 1440px wide screens

## Repository

GitHub:

```text
https://github.com/hamzamunir974/auratech-dubai-premium-shopify-store
```

## Status

This is currently a static HTML, CSS, and JavaScript storefront prototype. The next development step is converting the sections into Shopify Liquid files and connecting real Shopify collections, products, cart routes, search, and newsletter forms.
