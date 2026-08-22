console.log("Script cargado correctamente");

/* ============================================
   LOADER – ahora usa DOMContentLoaded
================================================ */
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  const siteLogo = document.getElementById("site-logo");
  const navbar = document.querySelector(".navbar");

  function updateLogoState() {
    if (!siteLogo || !navbar) return;
    const shouldFix = window.scrollY >= navbar.offsetTop;
    siteLogo.classList.toggle("is-fixed", shouldFix);
  }

  if (window.AOS) {
    AOS.init({
      once: true,
      duration: 700,
      offset: 120
    });
  }

  setYear();
  startHeroSlider();
  updateLogoState();

  window.addEventListener("scroll", updateLogoState, { passive: true });
});

/* ============================================
   AÑO FOOTER
================================================ */
function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

/* ============================================
   HERO SLIDER – versiones optimizadas
================================================ */
const hero = document.querySelector(".hero");

const fondos = [
  "https://res.cloudinary.com/dph6jbszd/image/upload/f_auto,q_auto,w_1600/v1787421152/393D549D-E655-40BA-806B-D4810A7D6577_2_jqbeks.jpg",
  "https://res.cloudinary.com/dph6jbszd/image/upload/f_auto,q_auto,w_1600/v1787421144/542f5b38-3e59-437f-b2dd-f1eb328e4932_kzsnvq.jpg",
  "https://res.cloudinary.com/dph6jbszd/image/upload/f_auto,q_auto,w_1600/v1787421143/IMG_0058_Original_kl5jcm.jpg",
  "https://res.cloudinary.com/dph6jbszd/image/upload/f_auto,q_auto,w_1600/v1787421143/f1e15bb0-7607-4fd0-8c1f-998eafe05447_gzxjep.jpg"
];


let fondoIndex = 0;

function preloadHeroImage(src) {
  if (navigator.connection?.saveData || window.matchMedia("(prefers-reduced-data: reduce)").matches) return;
  const img = new Image();
  img.src = src;
}

function startHeroSlider() {
  if (!hero) return;
  preloadHeroImage(fondos[1]);
  setInterval(() => {
    fondoIndex = (fondoIndex + 1) % fondos.length;
    hero.style.backgroundImage = `url('${fondos[fondoIndex]}')`;
    preloadHeroImage(fondos[(fondoIndex + 1) % fondos.length]);
  }, 7000);
}

/* Menú responsive + botón subir + lightbox (igual que tu código) */

/* =========================================================
   MENÚ RESPONSIVE
========================================================= */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const abierto = navMenu.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", String(abierto));
  });

  navMenu.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================================================
   SCROLL SUAVE
========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const destino = anchor.getAttribute("href");

    if (destino && destino.length > 1) {
      const el = document.querySelector(destino);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

function getReservationMessage(activityName = "actividad") {
  const baseMessage = activityName === "kayak"
    ? "Hola Abra Ancha, quiero reservar kayak para el día ..."
    : activityName === "rafting"
      ? "Hola Abra Ancha, quiero reservar rafting para el día ..."
      : "Hola Abra Ancha, quiero consultar disponibilidad de la actividad.";

  return encodeURIComponent(baseMessage);
}

/* =========================================================
   BOTONERA FLOTANTE
========================================================= */
const toggleBtn = document.getElementById("toggle-btn");
const socialMenu = document.getElementById("social-list");
const linkContacto = document.getElementById("link-contacto");

if (toggleBtn && socialMenu) {
  toggleBtn.addEventListener("click", () => {
    const oculto = socialMenu.hasAttribute("hidden");
    if (oculto) socialMenu.removeAttribute("hidden");
    else socialMenu.setAttribute("hidden", "");
    toggleBtn.setAttribute("aria-expanded", String(oculto));
  });
}

if (linkContacto && socialMenu) {
  linkContacto.addEventListener("click", e => {
    e.preventDefault();
    if (socialMenu.hasAttribute("hidden")) {
      socialMenu.removeAttribute("hidden");
      toggleBtn?.setAttribute("aria-expanded", "true");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });

    const msg = getReservationMessage();
    window.open(`https://wa.me/5492942676327?text=${msg}`, "_blank", "noopener");
  });
}

document.querySelectorAll(".btn-whatsapp").forEach(button => {
  button.addEventListener("click", e => {
    const activityName = button.dataset.activity || "actividad";
    const url = `https://wa.me/5492942676327?text=${getReservationMessage(activityName)}`;
    window.open(url, "_blank", "noopener");
  });
});

/* =========================================================
   PESTAÑAS DE ACTIVIDADES
========================================================= */
const activityTabs = document.querySelectorAll(".activity-tab");
const activityPanels = document.querySelectorAll(".activity-panel");

activityTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.activity;

    activityTabs.forEach(btn => {
      const active = btn === tab;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", String(active));
    });

    activityPanels.forEach(panel => {
      const active = panel.dataset.panel === target;
      panel.classList.toggle("active", active);
    });
  });
});

/* =========================================================
   CUENTA REGRESIVA - PRÓXIMAMENTE
========================================================= */
const countdownEls = document.querySelectorAll("[data-countdown]");
const countdownContainer = document.querySelector(".countdown");

if (countdownContainer) {
  const targetDate = new Date(countdownContainer.dataset.targetDate).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      countdownEls.forEach(el => {
        el.textContent = "00";
      });
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector('[data-countdown="days"]').textContent = String(days).padStart(2, "0");
    document.querySelector('[data-countdown="hours"]').textContent = String(hours).padStart(2, "0");
    document.querySelector('[data-countdown="minutes"]').textContent = String(minutes).padStart(2, "0");
    document.querySelector('[data-countdown="seconds"]').textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* =========================================================
   BOTÓN SUBIR
========================================================= */
const btnUp = document.getElementById("btnUp");

window.addEventListener("scroll", () => {
  if (!btnUp) return;
  const visible = window.scrollY > 400;
  btnUp.classList.toggle("show", visible);
});

btnUp?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =========================================================
   LIGHTBOX – GALERÍA + OPINIONES
========================================================= */
const lightboxGroups = document.querySelectorAll("[data-lightbox-group]");

if (lightboxGroups.length > 0) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const btnPrev = document.getElementById("lightbox-prev");
  const btnNext = document.getElementById("lightbox-next");

  let activeGroup = null;
  let currentIndex = 0;

  function getActiveItems() {
    if (!activeGroup) return [];
    return Array.from(activeGroup.querySelectorAll("img"));
  }

  function showImage() {
    const items = getActiveItems();
    if (!items.length) return;

    const item = items[currentIndex % items.length];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt || "Imagen ampliada de Abra Ancha Rafting";
  }

  lightboxGroups.forEach(group => {
    const items = Array.from(group.querySelectorAll("img"));

    if (!items.length) return;

    items.forEach((img, index) => {
      img.addEventListener("click", () => {
        activeGroup = group;
        currentIndex = index;
        showImage();
        lightbox.classList.remove("hidden");
        lightbox.setAttribute("aria-hidden", "false");
      });
    });
  });

  btnNext?.addEventListener("click", () => {
    const items = getActiveItems();
    if (!items.length) return;

    currentIndex = (currentIndex + 1) % items.length;
    showImage();
  });

  btnPrev?.addEventListener("click", () => {
    const items = getActiveItems();
    if (!items.length) return;

    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showImage();
  });

  lightboxClose?.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      lightbox.classList.add("hidden");
      lightbox.setAttribute("aria-hidden", "true");
    }
  });
}
