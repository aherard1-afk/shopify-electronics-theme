/* ==========================================================================
   NORTHWIRE ELECTRONICS — Global JS
   Vanilla, dependency-free, progressive-enhancement. Reduced-motion aware.
   ========================================================================== */
(function () {
  "use strict";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var money = function (cents) {
    try { return (window.Shopify && Shopify.formatMoney) ? Shopify.formatMoney(cents) : "$" + (cents / 100).toFixed(2); }
    catch (e) { return "$" + (cents / 100).toFixed(2); }
  };

  /* ---------- THEME TOGGLE (persisted) ---------- */
  function initTheme() {
    var root = document.documentElement;
    var stored = null;
    try { stored = localStorage.getItem("nw-theme"); } catch (e) {}
    if (stored) root.setAttribute("data-theme", stored);
    $$("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("nw-theme", next); } catch (e) {}
        btn.setAttribute("aria-pressed", String(next === "dark"));
      });
    });
  }

  /* ---------- STICKY HEADER SHRINK ---------- */
  function initStickyHeader() {
    var header = $("[data-sticky-header]");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("is-stuck", window.scrollY > 12); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- DRAWERS / MODALS (focus-trapped) ---------- */
  var openLayer = null, lastFocused = null;
  function trapFocus(e, container) {
    if (e.key !== "Tab") return;
    var f = $$('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])', container)
            .filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function openLayerEl(el) {
    if (!el) return;
    lastFocused = document.activeElement;
    var backdrop = el.previousElementSibling && el.previousElementSibling.matches("[data-backdrop]") ? el.previousElementSibling : null;
    el.setAttribute("data-open", "true");
    if (backdrop) backdrop.setAttribute("data-open", "true");
    el.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    openLayer = el;
    var focusable = $("[data-autofocus]", el) || $("button,a,input", el);
    if (focusable) setTimeout(function () { focusable.focus(); }, 60);
  }
  function closeLayer() {
    if (!openLayer) return;
    var backdrop = openLayer.previousElementSibling && openLayer.previousElementSibling.matches("[data-backdrop]") ? openLayer.previousElementSibling : null;
    openLayer.setAttribute("data-open", "false");
    if (backdrop) backdrop.setAttribute("data-open", "false");
    openLayer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
    openLayer = null;
  }
  function initLayers() {
    document.addEventListener("click", function (e) {
      var opener = e.target.closest("[data-open-layer]");
      if (opener) { e.preventDefault(); openLayerEl(document.getElementById(opener.getAttribute("data-open-layer"))); return; }
      if (e.target.closest("[data-close-layer]") || e.target.matches("[data-backdrop]")) { e.preventDefault(); closeLayer(); }
    });
    document.addEventListener("keydown", function (e) {
      if (!openLayer) return;
      if (e.key === "Escape") closeLayer();
      else trapFocus(e, openLayer);
    });
  }

  /* ---------- ACCORDIONS ---------- */
  function initAccordions() {
    $$("[data-accordion-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!expanded));
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        if (panel) panel.setAttribute("data-open", String(!expanded));
      });
    });
  }

  /* ---------- FILTER GROUP COLLAPSE ---------- */
  function initFilterGroups() {
    $$("[data-filter-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!expanded));
        var body = btn.nextElementSibling;
        if (body) body.hidden = expanded;
      });
    });
  }

  /* ---------- HERO SLIDER ---------- */
  function initHero() {
    $$("[data-hero]").forEach(function (hero) {
      var slides = $$("[data-hero-slide]", hero);
      if (slides.length < 2) return;
      var dots = $$("[data-hero-dot]", hero);
      var i = 0, timer = null;
      var autoplay = hero.getAttribute("data-autoplay") === "true" && !prefersReduced;
      var delay = parseInt(hero.getAttribute("data-delay") || "6000", 10);
      function show(n) {
        i = (n + slides.length) % slides.length;
        slides.forEach(function (s, idx) { s.style.opacity = idx === i ? "1" : "0"; s.style.zIndex = idx === i ? "1" : "0"; s.setAttribute("aria-hidden", String(idx !== i)); });
        dots.forEach(function (d, idx) { d.setAttribute("aria-current", String(idx === i)); });
      }
      function next() { show(i + 1); }
      function start() { if (autoplay) { stop(); timer = setInterval(next, delay); } }
      function stop() { if (timer) clearInterval(timer); timer = null; }
      $$("[data-hero-next]", hero).forEach(function (b) { b.addEventListener("click", function () { next(); start(); }); });
      $$("[data-hero-prev]", hero).forEach(function (b) { b.addEventListener("click", function () { show(i - 1); start(); }); });
      dots.forEach(function (d, idx) { d.addEventListener("click", function () { show(idx); start(); }); });
      var pause = $("[data-hero-pause]", hero);
      if (pause) pause.addEventListener("click", function () {
        if (timer) { stop(); pause.textContent = "Play"; }
        else { autoplay = true; start(); pause.textContent = "Pause"; }
      });
      hero.addEventListener("mouseenter", stop);
      hero.addEventListener("mouseleave", start);
      show(0); start();
    });
  }

  /* ---------- CAROUSEL ARROWS ---------- */
  function initCarousels() {
    $$("[data-carousel]").forEach(function (car) {
      var track = $("[data-carousel-track]", car);
      if (!track) return;
      var step = function () { return Math.max(240, track.clientWidth * 0.8); };
      var prev = $("[data-carousel-prev]", car), next = $("[data-carousel-next]", car);
      if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
      if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    });
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  function initReveal() {
    if (prefersReduced || !("IntersectionObserver" in window)) { $$(".reveal").forEach(function (el) { el.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  }

  /* ---------- CART ---------- */
  function bumpCartCount(count) {
    $$("[data-cart-count]").forEach(function (el) {
      el.textContent = count;
      el.hidden = count < 1;
      el.classList.add("is-bumped");
      setTimeout(function () { el.classList.remove("is-bumped"); }, 250);
    });
  }
  function toast(msg) {
    var t = $("[data-toast]");
    if (!t) return;
    $("[data-toast-msg]", t).textContent = msg;
    t.setAttribute("data-open", "true");
    clearTimeout(t._hide);
    t._hide = setTimeout(function () { t.setAttribute("data-open", "false"); }, 2600);
  }
  function refreshCartDrawer() {
    fetch("/?section_id=cart-drawer", { headers: { "X-Requested-With": "fetch" } })
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var tmp = document.createElement("div");
        tmp.innerHTML = html;
        var fresh = $("[data-cart-drawer-content]", tmp);
        var current = $("[data-cart-drawer-content]");
        if (fresh && current) current.innerHTML = fresh.innerHTML;
      }).catch(function () {});
  }
  function addToCart(form, btn) {
    var data = new FormData(form);
    btn.setAttribute("data-loading", "true");
    btn.disabled = true;
    fetch("/cart/add.js", { method: "POST", headers: { Accept: "application/json" }, body: data })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
      .then(function (res) {
        btn.removeAttribute("data-loading");
        btn.disabled = false;
        if (!res.ok) { toast(res.body && res.body.description ? res.body.description : "Could not add to cart"); return; }
        btn.setAttribute("data-success", "true");
        var label = btn.querySelector("[data-btn-label]") || btn;
        var orig = label.textContent;
        label.textContent = "Added ✓";
        setTimeout(function () { btn.removeAttribute("data-success"); label.textContent = orig; }, 1600);
        fetch("/cart.js").then(function (r) { return r.json(); }).then(function (c) { bumpCartCount(c.item_count); });
        refreshCartDrawer();
        var drawer = document.getElementById("cart-drawer");
        if (drawer && !form.hasAttribute("data-no-drawer")) openLayerEl(drawer);
        else toast("Added to cart");
      })
      .catch(function () { btn.removeAttribute("data-loading"); btn.disabled = false; toast("Network error — please retry"); });
  }
  function initCart() {
    document.addEventListener("submit", function (e) {
      var form = e.target.closest('[data-add-to-cart], form[action$="/cart/add"]');
      if (!form) return;
      e.preventDefault();
      addToCart(form, form.querySelector('[data-atc-btn]') || form.querySelector('[type="submit"]'));
    });
    // qty change + remove in cart drawer/page
    document.addEventListener("click", function (e) {
      var change = e.target.closest("[data-qty-change]");
      if (change) {
        var input = change.parentElement.querySelector("input");
        var delta = parseInt(change.getAttribute("data-qty-change"), 10);
        var val = Math.max(0, (parseInt(input.value, 10) || 0) + delta);
        updateLine(change.closest("[data-line]"), val);
      }
      var remove = e.target.closest("[data-line-remove]");
      if (remove) { e.preventDefault(); updateLine(remove.closest("[data-line]"), 0); }
    });
  }
  function updateLine(lineEl, qty) {
    if (!lineEl) return;
    var key = lineEl.getAttribute("data-line");
    lineEl.style.opacity = "0.5";
    fetch("/cart/change.js", {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ id: key, quantity: qty })
    }).then(function (r) { return r.json(); }).then(function (c) {
      bumpCartCount(c.item_count);
      refreshCartDrawer();
      if (document.body.getAttribute("data-template") === "cart") window.location.reload();
    }).catch(function () { lineEl.style.opacity = "1"; });
  }

  /* ---------- QUICK VIEW ---------- */
  function initQuickView() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-quick-view]");
      if (!btn) return;
      e.preventDefault();
      var handle = btn.getAttribute("data-quick-view");
      var modal = document.getElementById("quick-view");
      if (!modal) return;
      var content = $("[data-quick-view-content]", modal);
      content.innerHTML = '<div style="padding:60px;text-align:center" class="text-muted">Loading…</div>';
      openLayerEl(modal);
      fetch("/products/" + handle + "?section_id=quick-view")
        .then(function (r) { return r.text(); })
        .then(function (html) {
          var tmp = document.createElement("div"); tmp.innerHTML = html;
          var inner = $("[data-quick-view-inner]", tmp);
          content.innerHTML = inner ? inner.innerHTML : '<div style="padding:40px">Unable to load product.</div>';
          var f = $("[data-product-form]", content);
          if (f) updateVariantForm(f);
        }).catch(function () { content.innerHTML = '<div style="padding:40px">Unable to load product.</div>'; });
    });
  }

  /* ---------- PRODUCT GALLERY ---------- */
  function initGallery() {
    $$("[data-gallery]").forEach(function (g) {
      var main = $("[data-gallery-main]", g);
      $$("[data-gallery-thumb]", g).forEach(function (thumb) {
        thumb.addEventListener("click", function () {
          if (main) { main.src = thumb.getAttribute("data-full") || thumb.src; main.alt = thumb.alt; }
          $$("[data-gallery-thumb]", g).forEach(function (t) { t.setAttribute("aria-current", "false"); });
          thumb.setAttribute("aria-current", "true");
        });
      });
    });
  }

  /* ---------- VARIANT SELECTION (delegated, works for injected quick-view) ---------- */
  function updateVariantForm(form) {
    var data = $("[data-variant-json]", form);
    if (!data) return;
    var variants;
    try { variants = JSON.parse(data.textContent || "[]"); } catch (e) { return; }
    var idInput = $("[data-variant-id]", form);
    var chosen = $$("[data-option-index]", form).map(function (group) {
      var checked = group.querySelector("input:checked");
      return checked ? checked.value : null;
    });
    $$(".variant-opt", form).forEach(function (lbl) {
      lbl.classList.toggle("is-selected", !!lbl.querySelector("input:checked"));
    });
    var match = variants.find(function (v) { return v.options.every(function (o, idx) { return o === chosen[idx]; }); });
    if (match && idInput) {
      idInput.value = match.id;
      var price = $("[data-product-price]", form) || $("[data-product-price]");
      if (price) price.textContent = money(match.price);
      var atc = $("[data-atc-btn]", form);
      if (atc) {
        var label = atc.querySelector("[data-btn-label]") || atc;
        if (match.available) { atc.disabled = false; label.textContent = "Add to cart"; }
        else { atc.disabled = true; label.textContent = "Sold out"; }
      }
    }
  }
  function initVariants() {
    document.addEventListener("change", function (e) {
      if (!e.target.closest("[data-option-index]")) return;
      var form = e.target.closest("[data-product-form]");
      if (form) updateVariantForm(form);
    });
    $$("[data-product-form]").forEach(updateVariantForm);
  }

  /* ---------- STICKY ADD-TO-CART (mobile, product page) ---------- */
  function initStickyAtc() {
    var bar = $("[data-sticky-atc]");
    var anchor = $("[data-atc-anchor]");
    if (!bar || !anchor || !("IntersectionObserver" in window)) return;
    document.body.classList.add("has-sticky-atc");
    var io = new IntersectionObserver(function (entries) {
      bar.classList.toggle("is-visible", !entries[0].isIntersecting);
    }, { threshold: 0 });
    io.observe(anchor);
  }

  /* ---------- RECENTLY VIEWED ---------- */
  function initRecentlyViewed() {
    var KEY = "nw-recent";
    var current = document.body.getAttribute("data-product-handle");
    var list = [];
    try { list = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) {}
    if (current) {
      list = list.filter(function (h) { return h !== current; });
      list.unshift(current);
      list = list.slice(0, 8);
      try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
    }
    var holder = $("[data-recently-viewed]");
    if (!holder) return;
    var handles = list.filter(function (h) { return h !== current; }).slice(0, 4);
    if (!handles.length) { holder.closest("[data-recent-section]") && (holder.closest("[data-recent-section]").hidden = true); return; }
    var track = $("[data-carousel-track]", holder) || holder;
    Promise.all(handles.map(function (h) {
      return fetch("/products/" + h + "?section_id=product-card-ajax").then(function (r) { return r.ok ? r.text() : ""; }).catch(function () { return ""; });
    })).then(function (cards) {
      var html = cards.join("");
      if (html.trim()) track.innerHTML = html; else holder.closest("[data-recent-section]") && (holder.closest("[data-recent-section]").hidden = true);
    });
  }

  /* ---------- MOBILE FILTER SUBMIT-ON-CHANGE (optional auto) ---------- */
  function initFilterForm() {
    var clearBtns = $$("[data-clear-filters]");
    clearBtns.forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = b.getAttribute("href") || window.location.pathname;
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme(); initStickyHeader(); initLayers(); initAccordions(); initFilterGroups();
    initHero(); initCarousels(); initReveal(); initCart(); initQuickView(); initGallery();
    initVariants(); initStickyAtc(); initRecentlyViewed(); initFilterForm();
  });
})();
