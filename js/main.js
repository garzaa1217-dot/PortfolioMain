(() => {
  "use strict";

  const P = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const initialsOf = (name) => name.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const hueOf = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);

  /* ───────── Bind simple text ───────── */
  $$("[data-bind]").forEach((el) => (el.textContent = P[el.dataset.bind] ?? ""));
  $$("[data-bind-href]").forEach((el) => (el.href = P[el.dataset.bindHref] ?? "#"));
  $("#year").textContent = new Date().getFullYear();
  document.title = `${P.name} — ${P.role}`;

  /* ───────── Hero: split name into animated characters ───────── */
  const heroName = $(".hero-name");
  heroName.setAttribute("aria-label", P.name);
  heroName.innerHTML = [...P.name]
    .map((c, i) => `<span class="char" aria-hidden="true" style="animation-delay:${0.15 + i * 0.035}s">${c === " " ? "&nbsp;" : esc(c)}</span>`)
    .join("");

  /* ───────── Hero: typing prompt ───────── */
  const typed = $("#typed");
  if (reducedMotion) {
    typed.textContent = P.prompts[0];
  } else {
    let pi = 0, ci = 0, deleting = false;
    const tick = () => {
      const text = P.prompts[pi];
      ci += deleting ? -1 : 1;
      typed.textContent = text.slice(0, ci);
      let delay = deleting ? 28 : 55 + Math.random() * 60;
      if (!deleting && ci === text.length) { deleting = true; delay = 2200; }
      else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % P.prompts.length; delay = 400; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 1200);
  }

  /* ───────── Cursor glow + neural particle field ───────── */
  const glow = $(".cursor-glow");
  const mouse = { x: -9999, y: -9999 };
  addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    document.body.classList.add("has-pointer");
    mouse.x = e.clientX; mouse.y = e.clientY;
    glow.style.transform = `translate(${e.clientX - 260}px, ${e.clientY - 260}px)`;
  }, { passive: true });
  document.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });

  const canvas = $("#field");
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, dpr = 1, nodes = [];
  const accentRGB = () => (document.documentElement.dataset.theme === "light" ? "80, 60, 180" : "180, 170, 255");

  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(90, (W * H) / 16000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.4,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    const rgb = accentRGB();
    const LINK = 130, REACH = 180;
    for (const n of nodes) {
      if (!reducedMotion) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        // gentle attraction to cursor
        const dx = mouse.x - n.x, dy = mouse.y - n.y, d = Math.hypot(dx, dy);
        if (d < REACH) { n.x += dx * 0.004; n.y += dy * 0.004; }
      }
    }
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) {
          ctx.strokeStyle = `rgba(${rgb}, ${(1 - d / LINK) * 0.18})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (dm < REACH) {
        ctx.strokeStyle = `rgba(${rgb}, ${(1 - dm / REACH) * 0.45})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
      ctx.fillStyle = `rgba(${rgb}, ${dm < REACH ? 0.9 : 0.45})`;
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
    }
    if (!reducedMotion) requestAnimationFrame(draw);
  };
  resize(); draw();
  addEventListener("resize", () => { resize(); if (reducedMotion) draw(); });

  /* ───────── Scroll reveal ───────── */
  const onReveal = new Map(); // element → callback fired once when it first appears
  const reveal = (el) => {
    el.classList.add("in");
    revealer.unobserve(el);
    onReveal.get(el)?.();
    onReveal.delete(el);
  };
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) reveal(e.target); });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  const observeReveal = (root = document) => $$(".reveal:not(.in)", root).forEach((el) => revealer.observe(el));
  // Fast jumps (anchors, command palette) can skip past an element without it ever
  // intersecting — reveal anything that's already above the fold.
  let revealQueued = false;
  addEventListener("scroll", () => {
    if (revealQueued) return;
    revealQueued = true;
    requestAnimationFrame(() => {
      revealQueued = false;
      $$(".reveal:not(.in)").forEach((el) => {
        if (el.getBoundingClientRect().top < innerHeight) reveal(el);
      });
    });
  }, { passive: true });

  /* ───────── About: stats with count-up ───────── */
  const stats = $("#stats");
  stats.innerHTML = P.stats.map((s) => `<div class="stat"><strong data-to="${s.value}" data-suffix="${esc(s.suffix)}">0${esc(s.suffix)}</strong><span>${esc(s.label)}</span></div>`).join("");
  onReveal.set(stats, () => {
    $$("strong", stats).forEach((el) => {
      const to = +el.dataset.to, suffix = el.dataset.suffix, t0 = performance.now(), dur = reducedMotion ? 0 : 1400;
      const step = (t) => {
        const k = dur ? Math.min(1, (t - t0) / dur) : 1;
        el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });

  /* ───────── About: principle tilt cards ───────── */
  $("#principles").innerHTML = P.principles.map((p, i) => `
    <article class="principle glass reveal" style="transition-delay:${i * 80}ms">
      <div class="glyph" aria-hidden="true">${esc(p.glyph)}</div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.body)}</p>
    </article>`).join("");
  $$(".principle").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
      if (!reducedMotion) card.style.transform = `rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg) translateZ(0)`;
    });
    card.addEventListener("pointerleave", () => (card.style.transform = ""));
  });

  /* ───────── Stack explorer ───────── */
  const cats = ["All", ...P.stackCategories];
  const filters = $("#stack-filters");
  const grid = $("#stack-grid");
  const detail = $("#stack-detail");
  let activeCat = "All";

  filters.innerHTML = cats.map((c) => {
    const n = c === "All" ? P.stack.length : P.stack.filter((t) => t.category === c).length;
    return `<button class="filter" role="tab" aria-selected="${c === "All"}" data-cat="${esc(c)}">${esc(c)}<span class="count">${n}</span></button>`;
  }).join("");

  grid.innerHTML = P.stack.map((t, i) => `
    <li><button class="tool" data-i="${i}" data-cat="${esc(t.category)}" aria-pressed="false" style="--h:${hueOf(t.name)}">
      <span class="tool-top"><span class="tool-mono">${esc(initialsOf(t.name))}</span><span class="tool-cat">${esc(t.category)}</span></span>
      <span class="tool-name">${esc(t.name)}</span>
      <span class="dots" aria-label="Proficiency ${t.level} of 5">${Array.from({ length: 5 }, (_, k) => `<i class="${k < t.level ? "on" : ""}"></i>`).join("")}</span>
    </button></li>`).join("");

  const levelWords = ["", "Learning", "Comfortable", "Proficient", "Advanced", "Expert"];
  const showTool = (i) => {
    const t = P.stack[i];
    $$(".tool", grid).forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.i === i)));
    detail.innerHTML = `
      <div class="detail-anim" style="--h:${hueOf(t.name)}">
        <div class="tool-mono">${esc(initialsOf(t.name))}</div>
        <h3>${esc(t.name)}</h3>
        <span class="tool-cat">${esc(t.category)}</span>
        <p>${esc(t.note)}</p>
        <div class="meter"><span>Proficiency</span><span>${levelWords[t.level]}</span></div>
        <div class="meter-bar"><span></span></div>
      </div>`;
    requestAnimationFrame(() => requestAnimationFrame(() => ($(".meter-bar span", detail).style.width = `${t.level * 20}%`)));
  };

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    activeCat = btn.dataset.cat;
    $$(".filter", filters).forEach((f) => f.setAttribute("aria-selected", String(f === btn)));
    $$(".tool", grid).forEach((t) => t.classList.toggle("dim", activeCat !== "All" && t.dataset.cat !== activeCat));
    const first = P.stack.findIndex((t) => activeCat === "All" || t.category === activeCat);
    if (first >= 0) showTool(first);
  });
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".tool");
    if (btn) showTool(+btn.dataset.i);
  });
  showTool(0);

  /* ───────── Experience timeline ───────── */
  const timeline = $("#timeline");
  timeline.innerHTML = P.experience.map((j, i) => `
    <li class="job reveal ${i === 0 ? "open" : ""}">
      <div class="job-card glass">
        <button class="job-head" aria-expanded="${i === 0}" aria-controls="job-${i}">
          <span><h3>${esc(j.company)}</h3><span class="role">${esc(j.role)} · ${esc(j.location)}</span></span>
          <span class="job-period">${esc(j.period)}</span>
          <span class="chev" aria-hidden="true">+</span>
        </button>
        <div class="job-body" id="job-${i}"><div><div class="job-inner">
          <p>${esc(j.summary)}</p>
          <ul>${j.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
          <div class="tags">${j.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </div></div></div>
      </div>
    </li>`).join("");
  timeline.addEventListener("click", (e) => {
    const head = e.target.closest(".job-head");
    if (!head) return;
    const job = head.closest(".job");
    const open = !job.classList.contains("open");
    job.classList.toggle("open", open);
    head.setAttribute("aria-expanded", String(open));
  });
  const updateTimelineProgress = () => {
    const r = timeline.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height));
    timeline.style.setProperty("--progress", p.toFixed(3));
  };
  addEventListener("scroll", updateTimelineProgress, { passive: true });
  updateTimelineProgress();

  /* ───────── Projects with generative art ───────── */
  $("#projects").innerHTML = P.projects.map((p, i) => `
    <a class="project glass reveal" href="${esc(p.url)}" style="transition-delay:${i * 90}ms">
      <div class="project-art"><canvas data-hue="${p.hue}" data-seed="${i + 1}" aria-hidden="true"></canvas><span class="year">${esc(p.year)}</span></div>
      <div class="project-body">
        <h3><span>${esc(p.title)}</span><span class="arrow" aria-hidden="true">↗</span></h3>
        <p>${esc(p.blurb)}</p>
        <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </div>
    </a>`).join("");

  const paintArt = (cv) => {
    const w = (cv.width = 600), h = (cv.height = 450), c = cv.getContext("2d");
    const hue = +cv.dataset.hue;
    let seed = +cv.dataset.seed * 9301;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    c.fillStyle = `hsl(${hue} 45% 9%)`; c.fillRect(0, 0, w, h);
    for (let k = 0; k < 5; k++) {
      const x = rnd() * w, y = rnd() * h, r = 140 + rnd() * 220;
      const g = c.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `hsla(${hue + k * 28} 85% 62% / 0.75)`);
      g.addColorStop(1, `hsla(${hue + k * 28} 85% 62% / 0)`);
      c.fillStyle = g; c.fillRect(0, 0, w, h);
    }
    // faux UI wireframe on top — a nod to the interface inside
    c.strokeStyle = "rgba(255,255,255,0.35)"; c.fillStyle = "rgba(255,255,255,0.08)"; c.lineWidth = 1.5;
    const rr = (x, y, ww, hh, rad) => { c.beginPath(); c.roundRect(x, y, ww, hh, rad); c.fill(); c.stroke(); };
    rr(90, 80, 420, 290, 18);
    c.fillStyle = "rgba(255,255,255,0.14)";
    rr(112, 104, 120, 14, 7);
    for (let k = 0; k < 3; k++) rr(112, 140 + k * 34, 150 + rnd() * 110, 18, 9);
    c.fillStyle = "rgba(255,255,255,0.1)";
    rr(112, 250, 376, 96, 12);
    c.strokeStyle = "rgba(255,255,255,0.8)"; c.lineWidth = 2.5; c.beginPath();
    for (let x = 0; x <= 340; x += 20) {
      const y = 320 - 50 * (0.3 + 0.7 * rnd()) * (x / 340 + 0.2);
      x ? c.lineTo(130 + x, y) : c.moveTo(130 + x, y);
    }
    c.stroke();
  };
  $$(".project-art canvas").forEach(paintArt);

  /* ───────── Ask me: scripted chat ───────── */
  const log = $("#chat-log");
  const suggest = $("#chat-suggest");
  const initials = P.initials || initialsOf(P.name);
  const addMsg = (who, html) => {
    const el = document.createElement("div");
    el.className = `msg ${who}`;
    el.innerHTML = who === "ai" ? `<span class="avatar">${esc(initials)}</span><div class="bubble">${html}</div>` : `<div class="bubble">${html}</div>`;
    log.appendChild(el);
    return $(".bubble", el);
  };
  addMsg("ai", `Hi — I'm ${esc(P.name.split(" ")[0])}. Ask me something below.`);
  suggest.innerHTML = P.faq.map((f, i) => `<button class="chip" data-i="${i}">${esc(f.q)}</button>`).join("");
  let busy = false;
  suggest.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip || busy || chip.disabled) return;
    busy = true;
    chip.disabled = true;
    const f = P.faq[+chip.dataset.i];
    addMsg("me", esc(f.q));
    const bubble = addMsg("ai", `<span class="thinking"><i></i><i></i><i></i></span>`);
    setTimeout(() => {
      if (reducedMotion) { bubble.textContent = f.a; busy = false; return; }
      bubble.textContent = "";
      const words = f.a.split(" ");
      let k = 0;
      const stream = () => {
        bubble.textContent += (k ? " " : "") + words[k++];
        if (k < words.length) setTimeout(stream, 28 + Math.random() * 40);
        else busy = false;
      };
      stream();
    }, reducedMotion ? 0 : 700);
  });

  /* ───────── Contact ───────── */
  $("#socials").innerHTML = P.socials.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a></li>`).join("");
  const toast = $("#toast");
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
  };
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(P.email); showToast("Email copied to clipboard"); }
    catch { location.href = `mailto:${P.email}`; }
  };
  $("#email-copy").addEventListener("click", copyEmail);

  /* ───────── Theme ───────── */
  const setTheme = (t) => {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem("theme", t); } catch {}
    $$(".project-art canvas").forEach(paintArt);
  };
  const toggleTheme = () => setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
  $("#theme-toggle").addEventListener("click", toggleTheme);

  /* ───────── Active nav link ───────── */
  const navLinks = $$(".nav nav a");
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach((s) => navObserver.observe(s));

  /* ───────── Command palette ───────── */
  const palette = $("#palette");
  const pInput = $("#palette-input");
  const pList = $("#palette-list");
  const go = (id) => () => document.getElementById(id).scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  const commands = [
    { label: "Go to About", kind: "Section", run: go("about") },
    { label: "Go to Stack", kind: "Section", run: go("stack") },
    { label: "Go to Experience", kind: "Section", run: go("experience") },
    { label: "Go to Selected work", kind: "Section", run: go("work") },
    { label: "Ask me anything", kind: "Section", run: go("ask") },
    { label: "Copy email address", kind: "Action", run: copyEmail },
    { label: "Toggle light / dark theme", kind: "Action", run: toggleTheme },
    { label: "Download résumé", kind: "Action", run: () => (location.href = P.resumeUrl) },
    ...P.socials.map((s) => ({ label: `Open ${s.label}`, kind: "Link", run: () => open(s.url, "_blank", "noopener") })),
    ...P.stack.map((t, i) => ({ label: t.name, kind: "Tool", run: () => { go("stack")(); showTool(i); } })),
    ...P.experience.map((j) => ({ label: `${j.company} — ${j.role}`, kind: "Experience", run: go("experience") })),
  ];
  let results = [], sel = 0, lastFocus = null;

  const renderPalette = () => {
    const q = pInput.value.trim().toLowerCase();
    results = commands.filter((c) => !q || c.label.toLowerCase().includes(q) || c.kind.toLowerCase().includes(q));
    sel = Math.min(sel, Math.max(0, results.length - 1));
    pList.innerHTML = results.length
      ? results.map((c, i) => `<li role="option" id="opt-${i}" data-i="${i}" aria-selected="${i === sel}"><span>${esc(c.label)}</span><span class="kind">${esc(c.kind)}</span></li>`).join("")
      : `<li class="empty">No results</li>`;
    pInput.setAttribute("aria-activedescendant", results.length ? `opt-${sel}` : "");
    $(`#opt-${sel}`, pList)?.scrollIntoView({ block: "nearest" });
  };
  const openPalette = () => {
    lastFocus = document.activeElement;
    palette.hidden = false;
    pInput.value = ""; sel = 0; renderPalette();
    pInput.focus();
  };
  const closePalette = () => { palette.hidden = true; lastFocus?.focus?.(); };
  const runSel = (i = sel) => { const c = results[i]; if (!c) return; closePalette(); c.run(); };

  $("#open-palette").addEventListener("click", openPalette);
  palette.addEventListener("click", (e) => {
    if (e.target.dataset.close !== undefined) return closePalette();
    const li = e.target.closest("li[data-i]");
    if (li) runSel(+li.dataset.i);
  });
  pInput.addEventListener("input", () => { sel = 0; renderPalette(); });
  addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      palette.hidden ? openPalette() : closePalette();
      return;
    }
    if (palette.hidden) return;
    if (e.key === "Escape") closePalette();
    else if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % Math.max(1, results.length); renderPalette(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + results.length) % Math.max(1, results.length); renderPalette(); }
    else if (e.key === "Enter") { e.preventDefault(); runSel(); }
    else if (e.key === "Tab") { e.preventDefault(); pInput.focus(); }
  });
  if (!/Mac|iPhone|iPad/.test(navigator.platform)) $("#open-palette kbd").textContent = "Ctrl K";

  observeReveal();
})();
