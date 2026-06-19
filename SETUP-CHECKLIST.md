# Setup checklist — after installing the theme

Work top to bottom. Nothing here changes your products; it configures the new storefront
around them. Items marked **[NEEDS YOUR INPUT]** require store-specific facts only you know.

## 1. Navigation menus (Shopify → Content → Menus)
The header reads your **`main-menu`** linklist; the footer can read custom menus.
Recommended top-level items: Home, Shop, Best Sellers (link to `/#best-sellers`),
New Arrivals, Categories, Brands, Services, FAQs, Contact. Add nested links under
Categories/Brands to get the dropdown mega-menu. *(If `main-menu` is empty, the header
shows a sensible fallback nav automatically.)*

## 2. Theme settings (Customize → Theme settings)
- **Brand:** logo image, logo text, favicon, footer mission line.
- **Colors:** accent color (default muted blue `#3a6ea5`) + hover. Dark mode: optionally
  "match visitor's OS theme on first visit" (light stays default otherwise).
- **Support:** **[NEEDS YOUR INPUT]** support email, phone, hours.
- **Social:** **[NEEDS YOUR INPUT]** Instagram / Facebook / X / YouTube / TikTok URLs
  (only the ones you fill in are shown).
- **Cart:** drawer (default) or page.

## 3. Homepage (Customize → home page)
Sections are pre-arranged in order: Hero → Trust strip → Best sellers → Category grid →
Editorial → Buying paths → Value props → Reviews → Stats → Newsletter → FAQ.
- **Hero:** add 1–3 slides, set images + headline + CTA.
- **Best sellers:** pick the **collection** to feature (e.g. your "Best sellers" or
  "Frontpage" collection). Choose carousel or grid.
- **Category grid / Buying paths:** point each tile at a collection (and optional image).
- **Reviews:** placeholder testimonials are shown and clearly marked. **Replace with real
  reviews or connect a review app before launch** (see §6).

## 4. Collection filters (Settings → Search & discovery → Filters)  **[NEEDS YOUR INPUT]**
The collection sidebar/drawer renders whatever filters you enable here. Recommended:
Price, Vendor (Brand), Product type, Availability — plus variant/metafield filters for
Condition, Color, Storage/Capacity, RAM, Screen size, Compatibility where your products
have that data. Sorting (Featured / Best selling / Price / Newest) works out of the box.

## 5. Customer-service pages (Content → Pages)
Create these pages and assign the matching template (Pages → Add page → "Theme template"):

| Page title              | Handle            | Template          |
|-------------------------|-------------------|-------------------|
| About Us                | `about-us`        | `page.about`      |
| Our Services            | `services`        | `page.services`   |
| Contact                 | `contact`         | `page.contact`    |
| FAQs                    | `faqs`            | `page.faq`        |
| Shipping Policy         | `shipping-policy` | `page.shipping`   |
| Returns & Refunds       | `returns-refunds` | `page.returns`    |
| Warranty / Support      | `warranty`        | `page.warranty`   |
| Privacy Policy          | `privacy-policy`  | `page.privacy`    |
| Terms of Service        | `terms-of-service`| `page.terms`      |

The footer and product tabs already link to these handles. Professional copy is
pre-written, with **[BRACKETED PLACEHOLDERS]** you must fill in:
- **[PROCESSING TIME]**, **[STANDARD / EXPEDITED delivery]**, free-shipping threshold (Shipping)
- **[RETURN WINDOW]**, **[REFUND PROCESSING TIME]**, non-returnable items (Returns)
- **[WARRANTY DURATION]** and coverage specifics (Warranty)
- **[SUPPORT EMAIL]**, business address (Contact / Privacy / Terms)
> Review Privacy & Terms with a qualified professional before publishing.

## 6. Reviews app (optional but recommended)
The product card + homepage stars auto-read metafields from **Judge.me, Loox, Shopify
Product Reviews, or Yotpo**. Install one, then either paste its widget into the
Testimonials section ("Review app embed") or let ratings populate automatically. No fake
reviews are shipped.

## 7. Final pre-launch pass
- [ ] All `[BRACKETED PLACEHOLDERS]` filled in
- [ ] Logo + favicon uploaded
- [ ] Support email/phone/hours + social links set
- [ ] Best-sellers + category collections assigned
- [ ] Filters enabled in Search & discovery
- [ ] Real reviews connected (or placeholders removed)
- [ ] Test add-to-cart, cart drawer, checkout, search, and both light/dark mode on mobile
