(() => {
  const K = window.KOLPO || {};
  const $ = (q, r = document) => r.querySelector(q);
  const $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

  let lang = "en";
  try { if (localStorage.getItem("kolpo-lang") === "bn") lang = "bn"; } catch (e) {}
  const T = key => (K.i18n?.[lang]?.[key] ?? K.i18n?.en?.[key] ?? "");
  const L = obj => (obj ? obj[lang] ?? obj.en : "");
  const C = K.contact || {};

  $("#year").textContent = new Date().getFullYear();
  $("#founder-link").href = K.founderSite || "#";

  /* ---------- video modal ----------
     The video is created and play() is called inside the tap itself, so phones allow sound.
     A spinner shows until the first frame is ready; the page behind cannot scroll. */
  const modal = $("#modal"), frame = $("#modal-frame");
  const openVideo = (src, vertical, poster) => {
    modal.classList.toggle("vertical", !!vertical);
    frame.innerHTML = `<span class="spinner" aria-label="${esc(T("loading"))}"></span>`;
    frame.classList.add("loading");
    const v = document.createElement("video");
    v.src = src; v.controls = true; v.playsInline = true; v.setAttribute("playsinline", ""); v.preload = "auto";
    if (poster) v.poster = poster;
    const ready = () => frame.classList.remove("loading");
    v.addEventListener("playing", ready, { once: true });
    v.addEventListener("loadeddata", ready, { once: true });
    v.addEventListener("error", ready, { once: true });
    frame.appendChild(v);
    if (!modal.open) modal.showModal();
    document.documentElement.classList.add("modal-open");
    const p = v.play();
    if (p && p.catch) p.catch(() => { v.muted = true; v.play().catch(() => {}); });
  };
  const cleanup = () => { frame.innerHTML = ""; frame.classList.remove("loading"); document.documentElement.classList.remove("modal-open"); };
  const closeModal = () => { if (modal.open) modal.close(); cleanup(); };
  modal.addEventListener("close", cleanup);
  modal.addEventListener("cancel", cleanup);   // Esc key / Android back
  $("#modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-play]"); if (!b) return;
    e.preventDefault();
    openVideo(b.dataset.play, b.dataset.vertical === "true", b.dataset.poster);
  });

  /* ---------- hero reel: a rotating stack of the latest ads ---------- */
  const wall = $("#reel-wall"), glow = $("#hero-glow");
  const R = K.reel || [];
  let active = 0, timer = null, resumeAt = 0;
  const renderReel = () => {
    wall.innerHTML = `
      <div class="reel-stage">${R.map((r, i) => `
        <button class="reel" type="button" data-i="${i}" aria-label="${esc(r.title)} · ${esc(L(r.niche))}">
          <video src="${esc(r.loop)}" poster="${esc(r.poster)}" muted loop playsinline autoplay preload="auto" aria-hidden="true"></video>
          <span class="reel-label"><b>${esc(r.title)}</b><small>${esc(L(r.niche))}</small></span>
          <span class="reel-play"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>${esc(T("tap_watch"))}</span>
        </button>`).join("")}
      </div>
      <div class="reel-dots" role="tablist" aria-label="Choose an ad">${R.map((r, i) => `
        <button type="button" role="tab" data-dot="${i}" aria-label="${esc(r.title)}"><span>${esc(L(r.niche))}</span><i></i></button>`).join("")}
      </div>`;
    layoutReel();
    playLoops(wall);
  };
  // muted loops: start them in code as well, since some browsers ignore autoplay on inserted videos
  const playLoops = root => { $$("video", root).forEach(v => { v.muted = true; v.play().catch(() => {}); }); };
  const layoutReel = () => {
    const n = R.length;
    $$(".reel", wall).forEach((el, i) => {
      let d = i - active; if (d > n / 2) d -= n; if (d < -n / 2 + 0.5) d += n;   // -1, 0, 1, 2 for 4 items
      const a = Math.abs(d);
      el.style.setProperty("--d", d);
      el.style.zIndex = 10 - a;
      el.classList.toggle("is-active", d === 0);
      el.classList.toggle("is-hidden", a >= 2);
      el.tabIndex = a >= 2 ? -1 : 0;
    });
    $$("[data-dot]", wall).forEach((b, i) => {
      b.setAttribute("aria-selected", i === active);
      b.classList.toggle("on", i === active);
    });
    if (R[active]) glow.style.setProperty("--glow", R[active].glow);
  };
  const go = (i, user) => {
    active = (i + R.length) % R.length; layoutReel();
    if (user) resumeAt = Date.now() + 9000;           // a person is choosing: pause auto-play for a while
    const dot = $$("[data-dot]", wall)[active]; if (dot) { const bar = $("i", dot); bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = ""; }
  };
  const startAuto = () => {
    clearInterval(timer);
    // "reduce motion" on: still change ads, but slower (CSS then swaps them without the 3D slide)
    timer = setInterval(() => { if (Date.now() > resumeAt && !document.hidden && heroVisible) go(active + 1); }, reduce ? 6500 : 4000);
  };
  wall.addEventListener("click", e => {
    const dot = e.target.closest("[data-dot]");
    if (dot) { go(+dot.dataset.dot, true); return; }
    const tile = e.target.closest(".reel"); if (!tile || dragged) return;
    const i = +tile.dataset.i;
    if (i !== active) { go(i, true); return; }      // tap a side card: bring it to the front
    const r = R[i]; openVideo(r.video, true, r.poster);  // tap the front card: watch the full ad
  });
  // swipe on touch screens, drag with a mouse
  let x0 = null, dragged = false;
  wall.addEventListener("pointerdown", e => { x0 = e.clientX; dragged = false; });
  wall.addEventListener("pointermove", e => { if (x0 !== null && Math.abs(e.clientX - x0) > 12) dragged = true; });
  wall.addEventListener("pointerup", e => {
    if (x0 === null) return;
    const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1), true);
    setTimeout(() => { dragged = false; }, 0);
  });
  wall.addEventListener("pointercancel", () => { x0 = null; });
  wall.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") go(active + 1, true);
    if (e.key === "ArrowLeft") go(active - 1, true);
  });
  // gentle 3D tilt that follows the mouse (desktop)
  if (fine && !reduce) {
    const hero = $(".hero");
    hero.addEventListener("pointermove", e => {
      const r = hero.getBoundingClientRect();
      wall.style.setProperty("--tx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      wall.style.setProperty("--ty", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
    hero.addEventListener("pointerleave", () => { wall.style.setProperty("--tx", 0); wall.style.setProperty("--ty", 0); });
  }
  // pause the loops when the hero is off screen
  let heroVisible = true;
  new IntersectionObserver(([en]) => {
    heroVisible = en.isIntersecting;
    $$("video", wall).forEach(v => { if (heroVisible) v.play().catch(() => {}); else v.pause(); });
  }, { threshold: 0.05 }).observe($(".hero"));

  /* ---------- work ---------- */
  const KIND = { ad: "f_ad", film: "f_film", music: "f_music" };
  const grid = $("#work-grid");
  let cardIO = null;
  const renderWork = () => {
    grid.innerHTML = (K.work || []).map((w, i) => {
      const action = w.video
        ? `<button class="card-link" type="button" data-play="${esc(w.video)}" data-vertical="${w.format === "9:16"}" data-poster="${esc(w.thumb)}" aria-label="${esc(T("watch"))}: ${esc(w.title)}"></button>`
        : w.link ? `<a class="card-link" href="${esc(w.link)}" target="_blank" rel="noopener" aria-label="${esc(T("open"))}: ${esc(w.title)}"></a>` : "";
      const prev = w.preview || "";
      return `
        <article class="card reveal ${i === 0 ? "feature" : ""}" data-kind="${esc(w.kind)}">
          <div class="card-media">
            <img src="${esc(w.thumb)}" alt="" loading="lazy" />
            ${prev ? `<video class="${fine ? "" : "touch"}" data-src="${esc(prev)}" muted loop playsinline preload="none" aria-hidden="true"></video>` : ""}
            <span class="play" aria-hidden="true">${w.video
              ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>`
              : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M9 7h8v8"/></svg>`}</span>
          </div>
          <div class="card-body">
            <p class="card-meta">${w.concept ? `<span class="badge amber">${esc(T("concept"))}</span>` : `<span class="badge">${esc(T(KIND[w.kind]))}</span>`}<span class="badge">${esc(w.format)}${w.length ? " · " + esc(w.length) : ""}</span></p>
            <h3>${esc(w.title)}</h3>
            <p class="card-line">${esc(L(w.line))}</p>
            <p class="card-credit">${esc(L(w.credit))}</p>
          </div>
          ${action}
        </article>`;
    }).join("");
    const start = (card, v) => { if (!v.src) v.src = v.dataset.src; v.play().then(() => card.classList.add("playing")).catch(() => {}); };
    const stop = (card, v) => { card.classList.remove("playing"); v.pause(); };
    if (cardIO) cardIO.disconnect();
    if (fine) {
      // desktop: preview plays on hover
      $$(".card", grid).forEach(card => {
        const v = $("video", card); if (!v) return;
        card.addEventListener("mouseenter", () => start(card, v));
        card.addEventListener("mouseleave", () => stop(card, v));
      });
    } else {
      // phones: the preview plays by itself while the card is on screen
      cardIO = new IntersectionObserver(es => es.forEach(en => {
        const v = $("video", en.target); if (!v) return;
        en.isIntersecting ? start(en.target, v) : stop(en.target, v);
      }), { threshold: 0.6 });
      $$(".card", grid).forEach(c => cardIO.observe(c));
    }
    applyFilter(currentFilter);
    observeReveals();
  };
  let currentFilter = "all";
  const applyFilter = f => $$(".card", grid).forEach(c => c.classList.toggle("hidden", f !== "all" && c.dataset.kind !== f));
  $$(".filters button").forEach(btn => {
    if (btn.dataset.filter !== "all" && !(K.work || []).some(w => w.kind === btn.dataset.filter)) btn.remove();
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      $$(".filters button").forEach(b => b.setAttribute("aria-selected", b === btn));
      applyFilter(currentFilter);
    });
  });

  /* ---------- photo → ad compare slider ---------- */
  const cmp = $("#compare");
  if (cmp) {
    const range = $(".compare-range", cmp);
    const cv = $("video", cmp);
    new IntersectionObserver(([en]) => { if (en.isIntersecting) { cv.muted = true; cv.play().catch(() => {}); } else cv.pause(); }, { threshold: 0.2 }).observe(cmp);
    const set = v => cmp.style.setProperty("--pos", v + "%");
    range.addEventListener("input", () => { set(range.value); cmp.classList.add("touched"); });
    // a small hint: the handle sweeps once when the slider first comes into view
    new IntersectionObserver(([en], obs) => {
      if (!en.isIntersecting || reduce) return; obs.disconnect();
      const t0 = performance.now();
      const step = t => {
        if (cmp.classList.contains("touched")) return;
        const p = Math.min(1, (t - t0) / 1800), v = 50 + Math.sin(p * Math.PI * 2) * 28;
        set(v.toFixed(1)); range.value = v;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 }).observe(cmp);
  }
  const setOfferLink = () => { const a = $("#offer-wa"); if (a && C.whatsapp) a.href = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(T("offer_wa"))}`; };

  /* ---------- making of, services, process ---------- */
  const renderLists = () => {
    $("#making-list").innerHTML = (K.making || []).map(m => `
      <li class="frame-step reveal">
        <div class="frame-img"><img src="${esc(m.img)}" alt="${esc(L(m.t))}" loading="lazy" /></div>
        <h3>${esc(L(m.t))}</h3><p>${esc(L(m.d))}</p>
      </li>`).join("");
    $("#making-stats").innerHTML = (K.makingStats || []).map(s => `
      <div class="reveal"><dt data-count="${esc(s.n)}">${esc(s.n)}</dt><dd>${esc(L(s.l))}</dd></div>`).join("");
    $("#services-list").innerHTML = (K.services || []).map(s => `
      <article class="service reveal">
        <span class="tag">${esc(s.tag)}</span>
        <h3>${esc(L(s.t))}</h3>
        <p>${esc(L(s.d))}</p>
        <ul>${(L(s.items) || []).map(i => `<li>${esc(i)}</li>`).join("")}</ul>
        <a class="price" href="#contact">${s.price ? `${esc(T("from"))} ${esc(s.price)}` : esc(T("quote"))}</a>
      </article>`).join("");
    $("#process-list").innerHTML = (K.process || []).map((p, i) => `
      <li class="reveal"><span class="num">0${i + 1}</span><h3>${esc(L(p.t))}</h3><p>${esc(L(p.d))}</p></li>`).join("");
    observeCounts();
  };

  /* ---------- numbers count up when they come into view ---------- */
  const countIO = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return; countIO.unobserve(en.target);
    const el = en.target, end = parseInt(el.dataset.count, 10);
    if (isNaN(end) || end === 0 || reduce) return;
    const t0 = performance.now(), dur = 1100;
    const tick = t => { const p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
    el.textContent = "0"; requestAnimationFrame(tick);
  }), { threshold: 0.6 });
  function observeCounts() { $$("[data-count]").forEach(el => countIO.observe(el)); }

  /* ---------- contact ---------- */
  const renderChannels = () => {
    const ch = [];
    if (C.whatsapp) ch.push(`<a class="channel" href="https://wa.me/${esc(C.whatsapp)}" target="_blank" rel="noopener"><span><small>${esc(T("wa_label"))}</small><strong>${esc(C.whatsappLabel)}</strong></span><span class="act">↗</span></a>`);
    if (C.email) ch.push(`<button class="channel" type="button" data-copy="${esc(C.email)}"><span><small>${esc(T("email_label"))}</small><strong>${esc(C.email)}</strong></span><span class="act">Copy</span></button>`);
    if ((K.socials || []).length) ch.push(`<div class="socials">${K.socials.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join("")}</div>`);
    $("#channels").innerHTML = ch.join("");
  };
  $("#channels").addEventListener("click", async e => {
    const b = e.target.closest("[data-copy]"); if (!b) return;
    try { await navigator.clipboard.writeText(b.dataset.copy); $(".act", b).textContent = "Copied ✓"; }
    catch { location.href = "mailto:" + b.dataset.copy; }
  });
  const form = $("#brief"), note = $("#form-note");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(form), name = (d.get("name") || "").trim();
    if (!name) { note.textContent = T("note_name"); form.name.focus(); return; }
    const text = `Hi Kolpo Films! I'm ${name}${d.get("brand") ? " from " + d.get("brand") : ""}.\nI need: ${d.getAll("need").join(", ") || "-"}\n\n${d.get("msg") || ""}`;
    const via = e.submitter?.dataset.via || "whatsapp";
    if (via === "whatsapp") window.open(`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    else location.href = `mailto:${C.email}?subject=${encodeURIComponent("Project brief: " + name)}&body=${encodeURIComponent(text)}`;
    note.textContent = T("note_ok");
  });

  /* ---------- language ---------- */
  const applyLang = () => {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(el => { const v = T(el.dataset.i18n); if (v) el.innerHTML = v; });
    $$("[data-i18n-ph]").forEach(el => { el.placeholder = T(el.dataset.i18nPh); });
    $$("[data-i18n-from]").forEach(el => { const [, n] = el.dataset.i18nFrom.split("."); el.textContent = L(K.services?.[+n]?.t); });
    renderReel(); renderWork(); renderLists(); renderChannels(); setOfferLink();
  };
  $("#lang").addEventListener("click", () => {
    lang = lang === "en" ? "bn" : "en";
    try { localStorage.setItem("kolpo-lang", lang); } catch (e) {}
    applyLang();
  });

  /* ---------- nav ---------- */
  const nav = $("#nav"); let lastY = scrollY;
  const cue = $(".scroll-cue");
  addEventListener("scroll", () => {
    const y = scrollY;
    nav.classList.toggle("solid", y > 40);
    nav.classList.toggle("hide", y > lastY && y > 500);
    if (cue) cue.classList.toggle("gone", y > 80);
    lastY = y;
  }, { passive: true });
  const menuBtn = $(".menu-btn"), menu = $("#mobile-menu");
  const setMenu = open => { menuBtn.setAttribute("aria-expanded", open); menu.hidden = !open; document.body.style.overflow = open ? "hidden" : ""; };
  menuBtn.addEventListener("click", () => setMenu(menu.hidden));
  menu.addEventListener("click", e => { if (e.target.tagName === "A") setMenu(false); });
  const links = $$(".nav-links a");
  const spy = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$("section[id]").forEach(s => spy.observe(s));

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  function observeReveals() {
    $$(".reveal:not(.in)").forEach((el, i) => {
      if (el.closest(".hero")) el.style.transitionDelay = (i * 110) + "ms";
      io.observe(el);
    });
  }

  applyLang();
  startAuto();   // with "reduce motion" on, the stack does not rotate by itself; the short muted loops still play
})();
