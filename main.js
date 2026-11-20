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

  $("#year").textContent = new Date().getFullYear();
  $("#founder-link").href = K.founderSite || "#";

  /* ---------- work ---------- */
  const KIND = { ad: "f_ad", film: "f_film", music: "f_music" };
  const grid = $("#work-grid");
  const renderWork = () => {
    grid.innerHTML = (K.work || []).map((w, i) => {
      const action = w.video
        ? `<button class="card-link" type="button" data-play="${esc(w.video)}" data-vertical="${w.format === "9:16"}" aria-label="${esc(T("watch"))}: ${esc(w.title)}"></button>`
        : w.link ? `<a class="card-link" href="${esc(w.link)}" target="_blank" rel="noopener" aria-label="${esc(T("open"))}: ${esc(w.title)}"></a>` : "";
      return `
        <article class="card reveal ${i === 0 ? "feature" : ""}" data-kind="${esc(w.kind)}">
          <div class="card-media">
            <img src="${esc(w.thumb)}" alt="" loading="lazy" />
            ${w.video && fine && !reduce ? `<video src="${esc(w.video)}" muted loop playsinline preload="none"></video>` : ""}
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
    // hover preview for self-hosted clips (desktop only)
    $$(".card", grid).forEach(card => {
      const v = $("video", card); if (!v) return;
      card.addEventListener("mouseenter", () => { v.play().then(() => card.classList.add("playing")).catch(() => {}); });
      card.addEventListener("mouseleave", () => { card.classList.remove("playing"); v.pause(); });
    });
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
  };

  /* ---------- contact ---------- */
  const C = K.contact || {};
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
    renderWork(); renderLists(); renderChannels();
  };
  $("#lang").addEventListener("click", () => {
    lang = lang === "en" ? "bn" : "en";
    try { localStorage.setItem("kolpo-lang", lang); } catch (e) {}
    applyLang();
  });

  /* ---------- video modal ---------- */
  const modal = $("#modal"), frame = $("#modal-frame");
  const closeModal = () => { frame.innerHTML = ""; if (modal.open) modal.close(); };
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-play]"); if (!b) return;
    modal.classList.toggle("vertical", b.dataset.vertical === "true");
    frame.innerHTML = `<video src="${esc(b.dataset.play)}" controls autoplay playsinline></video>`;
    modal.showModal();
  });
  $("#modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  modal.addEventListener("cancel", () => { frame.innerHTML = ""; });

  /* ---------- nav ---------- */
  const nav = $("#nav"); let lastY = scrollY;
  addEventListener("scroll", () => {
    const y = scrollY;
    nav.classList.toggle("solid", y > 40);
    nav.classList.toggle("hide", y > lastY && y > 500);
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

  // reduced motion: keep the hero still
  if (reduce) $$(".hero video").forEach(v => { v.removeAttribute("autoplay"); v.pause(); });

  applyLang();
})();
