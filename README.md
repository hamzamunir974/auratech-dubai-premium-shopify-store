# AuraTech Dubai Premium Shopify Theme

AuraTech Dubai is a premium Shopify Online Store 2.0 theme for a UAE electronics retailer. It is built for gadgets, mobile accessories, audio products, smartwatches, charging accessories, and tech lifestyle products.

The repository includes both the original static prototype and a real Shopify theme folder that can be uploaded to Shopify.

## What Is Included

- Upload-ready Shopify theme in `shopify-theme/`
- Upload zip: `AuraTech-Dubai-Shopify-Theme-Upload.zip`
- Static prototype: `index.html`, `styles.css`, `script.js`
- Brand and product reference assets
- Shopify sections, templates, snippets, layout, assets, and config files

## Theme Features

- Premium AuraTech Dubai branding
- Responsive desktop, tablet, and mobile layout
- Announcement bar
- Header with navigation, search, account, wishlist drawer, cart, and mobile menu
- Homepage hero, categories, featured products, trust benefits, promo banner, reviews, newsletter, and footer
- Real Shopify product cards connected to Shopify products and collections
- Product page with variant selector, quantity, add to cart, wishlist, and app block area
- Cart page with quantity updates, remove links, subtotal, and checkout
- Search page connected to Shopify product search
- Collection page with real products and pagination
- Newsletter form connected to Shopify customers
- Wishlist drawer and optional wishlist page using browser storage
- App block support for product, collection, cart, and homepage integrations
- Shopify payment icons from enabled payment methods

## Important Limits

A Shopify theme controls the storefront experience. It does not create or configure Shopify Admin settings.

After uploading the theme, Shopify Admin is still required for:

- Products, variants, pricing, inventory, and product images
- Collections and navigation menus
- Payment provider setup
- Shipping, taxes, markets, and currency settings
- Domain connection
- Store policies
- App installation and app configuration
- Analytics pixels and ad account setup

## Upload Steps

1. Open Shopify Admin.
2. Go to `Online Store > Themes`.
3. Click `Add theme > Upload zip file`.
4. Upload `AuraTech-Dubai-Shopify-Theme-Upload.zip` from this repo.
5. After upload, click `Customize`.
6. In the homepage `Featured products` section, select the collection you want to display, or leave it blank to show products from Shopify's All collection.
7. Add your navigation under `Online Store > Navigation` and assign it to the header/footer menus if needed.
8. Add products and publish them to the `Online Store` sales channel.
9. Configure payments, shipping, taxes, markets, policies, apps, and pixels in Shopify Admin.
10. Preview the theme on mobile and desktop before publishing.

## Wishlist Setup

The wishlist drawer works immediately after theme upload. It saves products in the shopper's browser on that device.

For an optional full wishlist page:

1. Go to `Online Store > Pages`.
2. Create a page named `Wishlist`.
3. Assign the template `page.wishlist`.
4. Add the page to navigation if you want a visible wishlist page link.

For account-synced wishlist across devices, install a Shopify wishlist app and place its app block using the theme app sections.

## Developer Structure

```text
auratech-dubai-store/
+-- shopify-theme/
|   +-- assets/
|   +-- config/
|   +-- layout/
|   +-- locales/
|   +-- sections/
|   +-- snippets/
|   +-- templates/
+-- AuraTech-Dubai-Shopify-Theme-Upload.zip
+-- index.html
+-- styles.css
+-- script.js
+-- SHOPIFY_CODE_GUIDE.md
+-- SHOPIFY_UPLOAD_STEPS.md
+-- README.md
```

## Repository

https://github.com/hamzamunir974/auratech-dubai-premium-shopify-store