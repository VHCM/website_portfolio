// Ano no rodapé
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Scroll suave para elementos com data-scroll-to
document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const target = btn.getAttribute("data-scroll-to");
    const el = document.querySelector(target);
    if (el) {
      // respeitar header fixo: calcular offset
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const header = document.querySelector('header');
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 12; // pequeno espaçamento
      if (prefersReduced) {
        window.scrollTo(0, top);
      } else {
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  });
});

// Menu mobile abrir/fechar
const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileBtn && mobileMenu) {
  // Toggle com animação: usamos a classe `open` e o atributo aria-hidden
  const setMenuOpen = (open) => {
    if (open) {
      mobileMenu.classList.add("open");
      mobileMenu.setAttribute("aria-hidden", "false");
      mobileBtn.setAttribute("aria-expanded", "true");
    } else {
      mobileMenu.classList.remove("open");
      mobileMenu.setAttribute("aria-hidden", "true");
      mobileBtn.setAttribute("aria-expanded", "false");
    }
  };

  mobileBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("open");
    setMenuOpen(!isOpen);
  });

  mobileMenu.querySelectorAll("[data-mobile-link]").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  // Fechar com Escape
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && mobileMenu.classList.contains("open")) {
      setMenuOpen(false);
    }
  });
}

// Copiar e-mail pro clipboard
const copyBtn = document.getElementById("copy-email-btn");
const emailEl = document.getElementById("contact-email");

if (copyBtn && emailEl) {
  copyBtn.addEventListener("click", async () => {
    const email = emailEl.textContent.trim();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // fallback para ambientes sem clipboard API (ex: file://)
        const ta = document.createElement("textarea");
        ta.value = email;
        // tornar textarea não visível
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      // feedback: alterar label e mostrar toast
      const labelSpan = copyBtn.querySelector(".copy-label") || copyBtn.querySelector("span:nth-child(2)");
      const original = labelSpan ? labelSpan.textContent : "";
      if (labelSpan) {
        labelSpan.textContent = "Copiado!";
        setTimeout(() => (labelSpan.textContent = original), 1500);
      }
      showToast("E-mail copiado para a área de transferência");
    } catch (err) {
      alert("Não foi possível copiar o e-mail :(");
    }
  });
}

// Toast helper
function showToast(text, ms = 1800) {
  const t = document.createElement("div");
  t.className = "site-toast";
  t.textContent = text;
  document.body.appendChild(t);
  // small delay for transition
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => document.body.removeChild(t), 300);
  }, ms);
}

// Formulário de contato -> mailto
const form = document.getElementById("contact-form");

if (form && emailEl) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject =
      document.getElementById("subject").value.trim() || "Contato pelo portfólio";
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    const mailto = `mailto:${encodeURIComponent(
      emailEl.textContent.trim()
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`
    )}`;
    // abrir cliente de email
    window.location.href = mailto;
  });
}

// IntersectionObserver para animações de entrada
(() => {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  // aplicar observer a seções principais e cards
  document.querySelectorAll("section, .grid > div, .flex.flex-col.gap-4 > div").forEach((el) => {
    // calcular delay de stagger se o elemento estiver dentro um grid/parent
    el.classList.add("section-reveal");
    obs.observe(el);
  });
})();

// aplicar stagger nos elementos observados: calcular após carregamento completo
// para evitar posições incorretas causadas por imagens/loading. Recalcula no resize (debounced).
function applyStagger() {
  const els = Array.from(document.querySelectorAll('.section-reveal'));
  // ordenar por offsetTop para garantir ordem visual
  els.sort((a, b) => (a.getBoundingClientRect().top + window.scrollY) - (b.getBoundingClientRect().top + window.scrollY));
  els.forEach((el, i) => {
    const delay = Math.min(80 * i, 600); // 80ms por item, cap 600ms
    el.style.setProperty('--reveal-delay', `${delay}ms`);
  });
}

// run after load to ensure images/backgrounds don't shift positions
if (document.readyState === 'complete') {
  applyStagger();
} else {
  window.addEventListener('load', applyStagger);
}

// debounce helper for resize
let _staggerResizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(_staggerResizeTimer);
  _staggerResizeTimer = setTimeout(() => {
    applyStagger();
  }, 150);
});

// Filtro de skills
const skillButtons = document.querySelectorAll("[data-skill-filter]");
const skillCards = document.querySelectorAll("[data-skill-category]");

if (skillButtons.length && skillCards.length) {
  skillButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-skill-filter");

      // reset estilos
      skillButtons.forEach((b) => {
        b.classList.remove("bg-primary", "text-white");
        b.classList.add(
          "bg-slate-200",
          "dark:bg-slate-800",
          "text-slate-700",
          "dark:text-slate-300"
        );
      });

      if (filter === "all") {
        btn.classList.add("bg-primary", "text-white");
        btn.classList.remove(
          "bg-slate-200",
          "dark:bg-slate-800",
          "text-slate-700",
          "dark:text-slate-300"
        );
        skillCards.forEach((card) => (card.style.display = ""));
      } else {
        btn.classList.add("bg-primary", "text-white");
        btn.classList.remove(
          "bg-slate-200",
          "dark:bg-slate-800",
          "text-slate-700",
          "dark:text-slate-300"
        );
        skillCards.forEach((card) => {
          const cat = card.getAttribute("data-skill-category");
          card.style.display = cat === filter ? "" : "none";
        });
      }
    });
  });
}

// Filtro de projetos
const projectButtons = document.querySelectorAll("[data-project-filter]");
const projectCards = document.querySelectorAll("[data-project-category]");

if (projectButtons.length && projectCards.length) {
  projectButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-project-filter");

      // reset estilos
      projectButtons.forEach((b) => {
        b.classList.remove("bg-primary", "text-white");
        b.classList.add(
          "bg-slate-200",
          "dark:bg-slate-800",
          "text-slate-700",
          "dark:text-slate-300"
        );
      });

      if (filter === "all") {
        btn.classList.add("bg-primary", "text-white");
        btn.classList.remove(
          "bg-slate-200",
          "dark:bg-slate-800",
          "text-slate-700",
          "dark:text-slate-300"
        );
        projectCards.forEach((card) => (card.style.display = ""));
      } else {
        btn.classList.add("bg-primary", "text-white");
        btn.classList.remove(
          "bg-slate-200",
          "dark:bg-slate-800",
          "text-slate-700",
          "dark:text-slate-300"
        );
        projectCards.forEach((card) => {
          const cat = card.getAttribute("data-project-category");
          card.style.display = cat === filter ? "" : "none";
        });
      }
    });
  });
}

// Fundo 3D reativo ao mouse (parallax simples)
(function () {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;
  const container = document.getElementById('bg-3d');
  if (!container || prefersReduced || isTouch) return;

  const layers = Array.from(container.querySelectorAll('.bg-3d__layer'));
  if (!layers.length) return;

  let mouseX = 0;
  let mouseY = 0;
  let rafId = null;

  function onPointerMove(e) {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    // center as -0.5..0.5
    mouseX = (x - 0.5);
    mouseY = (y - 0.5);
    if (!rafId) rafId = requestAnimationFrame(updateLayers);
  }

  function updateLayers() {
    rafId = null;
    layers.forEach((layer) => {
      const depth = parseFloat(layer.getAttribute('data-depth')) || 0.05;
      const moveX = -mouseX * depth * 60; // scale movement
      const moveY = -mouseY * depth * 40;
      const rotateX = mouseY * depth * 6; // small tilt
      const rotateY = -mouseX * depth * 6;
      layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  }

  // gentle reset when leaving
  function onPointerLeave() {
    mouseX = 0; mouseY = 0;
    if (!rafId) rafId = requestAnimationFrame(() => {
      layers.forEach((layer) => (layer.style.transform = 'translate3d(0,0,0) rotateX(0deg) rotateY(0deg)'));
      rafId = null;
    });
  }

  // use pointermove for better device support
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerleave', onPointerLeave);
  window.addEventListener('pointercancel', onPointerLeave);

  // cleanup on unload
  window.addEventListener('unload', () => {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerleave', onPointerLeave);
    window.removeEventListener('pointercancel', onPointerLeave);
    if (rafId) cancelAnimationFrame(rafId);
  });
})();
