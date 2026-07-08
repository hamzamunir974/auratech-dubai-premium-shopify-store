# Shopify Upload Steps

Upload `AuraTech-Dubai-Shopify-Theme-Upload.zip` directly in Shopify Admin.

## Upload the theme

1. Go to Shopify Admin.
2. Open `Online Store > Themes`.
3. Click `Add theme`.
4. Choose `Upload zip file`.
5. Upload:

```text
AuraTech-Dubai-Shopify-Theme-Upload.zip
```

6. After upload, click `Customize`.
7. Preview desktop and mobile.
8. Publish only after products, checkout, shipping, and payment settings are ready.

## Required Shopify Admin Setup

The theme is storefront code. These parts must still be configured in Shopify Admin:

- Add products with variants, images, prices, inventory, and product descriptions.
- Publish products to the `Online Store` sales channel.
- Create collections such as Mobiles, Laptops, Audio, Smartwatches, Accessories, and Deals.
- Set up navigation menus in `Online Store > Navigation`.
- In theme customizer, select the featured products collection on the homepage.
- Set the store currency/markets for UAE selling.
- Configure payments, shipping, delivery, taxes, and checkout settings.
- Add store policies.
- Install and configure any fulfillment, review, chat, upsell, analytics, or ad pixel apps.

## Wishlist

The built-in wishlist drawer works after upload and saves products in the shopper's browser on that device.

Optional wishlist page:

1. Go to `Online Store > Pages`.
2. Create a page called `Wishlist`.
3. Assign template `page.wishlist`.
4. Add it to navigation if needed.

For account-synced wishlist across devices, use a Shopify wishlist app and add its app block through the theme customizer.

## Included Theme Files

- `layout/theme.liquid`
- Homepage, product, collection, cart, search, page, wishlist, and 404 templates
- Reusable sections
- Product card snippet
- CSS and JavaScript assets
- Logo and product reference assets
- App block areas for integrations

Test the theme inside Shopify because real product data, checkout, payments, shipping, apps, and pixels are controlled by Shopify Admin.