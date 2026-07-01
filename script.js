/* ===========================================================
   AMC tvoj coffeeshop — interactions
   =========================================================== */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  if (toggle && links) {
    var closeMenu = function () {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Otvoriť menu");
    };

    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Zavrieť menu" : "Otvoriť menu");
    });

    // Close menu after clicking a link (mobile)
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---- Reveal on scroll ---- */
  var revealTargets = document.querySelectorAll(
    ".section__head, .about__text, .about__media, .menu__card, .gallery__item, .contact__info, .contact__map, .menu__alt"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Current year in footer ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ===========================================================
     Coverflow gallery carousel — swipe / drag / arrows / dots
     =========================================================== */
  var root = document.getElementById("galleryCarousel");
  if (root) {
    var viewport = root.querySelector(".carousel__viewport");
    var track = root.querySelector(".carousel__track");
    var cards = Array.prototype.slice.call(root.querySelectorAll(".carousel__card"));
    var dotsWrap = root.querySelector(".carousel__dots");
    var n = cards.length;

    var index = 0;      // active card
    var drag = 0;       // live drag offset in px
    var dragging = false, startX = 0, startY = 0, lockedH = false;
    var step = 1, base = 0, autoTimer = null, autoDir = 1;

    // build dots
    var dots = [];
    for (var d = 0; d < n; d++) {
      var b = document.createElement("button");
      b.className = "carousel__dot";
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Fotka " + (d + 1));
      (function (i) { b.addEventListener("click", function () { go(i); restartAuto(); }); })(d);
      dotsWrap.appendChild(b);
      dots.push(b);
    }

    function measure() {
      base = cards[0].offsetLeft;
      step = n > 1 ? (cards[1].offsetLeft - cards[0].offsetLeft) : cards[0].offsetWidth;
    }

    function frac() { return index - drag / step; }

    function render(animate) {
      var f = frac();
      var vpC = viewport.clientWidth / 2;
      var centerAt = base + f * step + cards[0].offsetWidth / 2;
      var ease = "transform .55s cubic-bezier(.22,.61,.36,1)";
      track.style.transition = animate ? ease : "none";
      track.style.transform = "translateX(" + (vpC - centerAt) + "px)";

      cards.forEach(function (c, i) {
        var off = i - f;
        var a = Math.abs(off);
        var s = Math.max(0.72, 1 - a * 0.16);
        var r = Math.max(-42, Math.min(42, -off * 22));
        var o = Math.max(0.28, 1 - a * 0.44);
        c.style.transition = animate ? (ease + ", opacity .55s") : "none";
        c.style.transform = "scale(" + s + ") rotateY(" + r + "deg)";
        c.style.opacity = o;
        c.style.zIndex = String(100 - Math.round(a * 10));
        c.classList.toggle("is-active", Math.round(f) === i);
      });

      var act = ((index % n) + n) % n;
      dots.forEach(function (dot, i) { dot.classList.toggle("is-active", i === act); });
    }

    function go(i, animate) {
      index = Math.max(0, Math.min(n - 1, i));
      drag = 0;
      render(animate !== false);
    }

    // pointer / touch drag
    function onDown(x, y) { dragging = true; lockedH = false; startX = x; startY = y; stopAuto(); viewport.classList.add("is-grabbing"); }
    function onMove(x, y, ev) {
      if (!dragging) return;
      var dx = x - startX, dy = y - startY;
      if (!lockedH) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        lockedH = Math.abs(dx) > Math.abs(dy);
        if (!lockedH) { dragging = false; viewport.classList.remove("is-grabbing"); return; } // vertical scroll
      }
      if (ev && ev.cancelable) ev.preventDefault();
      drag = dx;
      render(false);
    }
    function onUp() {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove("is-grabbing");
      go(Math.round(frac()));
      restartAuto();
    }

    viewport.addEventListener("pointerdown", function (e) { onDown(e.clientX, e.clientY); });
    window.addEventListener("pointermove", function (e) { onMove(e.clientX, e.clientY, e); }, { passive: false });
    window.addEventListener("pointerup", onUp);
    // touch fallback for older browsers
    viewport.addEventListener("touchstart", function (e) { onDown(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    viewport.addEventListener("touchmove", function (e) { onMove(e.touches[0].clientX, e.touches[0].clientY, e); }, { passive: false });
    viewport.addEventListener("touchend", onUp);

    // click a side card to focus it
    cards.forEach(function (c, i) {
      c.addEventListener("click", function () { if (!lockedH && i !== index) { go(i); restartAuto(); } });
    });

    // arrows
    var prev = root.querySelector(".carousel__arrow--prev");
    var next = root.querySelector(".carousel__arrow--next");
    if (prev) prev.addEventListener("click", function () { go(index - 1); restartAuto(); });
    if (next) next.addEventListener("click", function () { go(index + 1); restartAuto(); });

    // keyboard
    root.setAttribute("tabindex", "0");
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { go(index - 1); restartAuto(); }
      else if (e.key === "ArrowRight") { go(index + 1); restartAuto(); }
    });

    // autoplay (ping-pong, pauses on hover/interaction & when tab hidden)
    function tick() {
      if (index >= n - 1) autoDir = -1;
      else if (index <= 0) autoDir = 1;
      go(index + autoDir);
    }
    function startAuto() { if (!autoTimer && n > 1) autoTimer = setInterval(tick, 4500); }
    function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
    function restartAuto() { stopAuto(); startAuto(); }
    root.addEventListener("mouseenter", stopAuto);
    root.addEventListener("mouseleave", startAuto);
    root.addEventListener("focusin", stopAuto);
    root.addEventListener("focusout", startAuto);
    document.addEventListener("visibilitychange", function () { document.hidden ? stopAuto() : startAuto(); });

    // init (wait for layout / first image)
    function init() { measure(); go(0, false); }
    if (document.readyState === "complete") init();
    else window.addEventListener("load", init);
    window.addEventListener("resize", function () { measure(); render(false); });
    // re-measure once the first images decode
    cards.forEach(function (c) { var im = c.querySelector("img"); if (im && !im.complete) im.addEventListener("load", function () { measure(); render(false); }); });

    render(false);
    startAuto();
  }
})();
