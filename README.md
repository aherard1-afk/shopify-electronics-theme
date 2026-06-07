# Northwire Electronics — Custom Shopify Theme

A premium, calm, trustworthy electronics-store theme (Shopify **Online Store 2.0**).
White / gunmetal / soft-charcoal design system with **light + dark mode**, built from
scratch — no Shopify Ignite assets or code are used.

> **Your products are never touched.** A theme only *renders* store data (products,
> prices, images, SKUs, variants, collections, inventory, checkout). All of that is
> pulled live from your store. Installing this theme changes **layout, design, pages,
> navigation, and content** — not your catalog.

---

## What's in here

```
assets/        base.css, components.css, global.js  (design system + interactivity)
config/        settings_schema.json, settings_data.json  (theme editor controls)
layout/        theme.liquid, password.liquid
locales/       en.default.json
sections/      header/footer groups + 30+ sections (hero, best-sellers, filters, etc.)
snippets/      product-card, price, rating, facets, icons, drawers, etc.
templates/     index, product, collection, cart, search, page.* (policies), blog, etc.
_preview/      home.html — a standalone visual preview you can open in any browser
```

---

## See it first (no Shopify needed)

Open **`_preview/home.html`** in any web browser. It uses the real theme CSS/JS with
placeholder products so you can see the look and **toggle light/dark** (sun/moon icon in
the header). This is a design preview only — the real product data appears once installed.

---

## Install on your store (preview privately, publish when ready)

You need the free **Shopify CLI**. This uploads the theme as a **new, unpublished** theme,
so your live store is unaffected until *you* press publish.

```bash
# 1. Install Shopify CLI (one time)
npm install -g @shopify/cli @shopify/theme

# 2. From this folder, log in and push as an UNPUBLISHED theme
cd shopify-electronics-theme
shopify theme push --unpublished --theme "Northwire Electronics"
#    -> opens your browser to authorize, then uploads.

# 3. Preview / live-edit without publishing
shopify theme dev
#    -> gives you a local preview URL bound to your real store data.
```

In Shopify admin: **Online Store → Themes** → your new theme → **Customize** to preview,
or **Actions → Publish** when you're happy.

> Alternative without CLI: zip this folder and use
> **Online Store → Themes → Add theme → Upload zip** (Shopify accepts theme zips).

See **SETUP-CHECKLIST.md** for everything to configure after install.
