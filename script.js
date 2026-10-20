/* =========================================
   PIXEL OSTIA — INTERAZIONI E CONTENUTI CONFIGURABILI
   Modifica email, link social, prezzi, durate e inclusioni qui.
   ========================================= */

(() => {
  "use strict";

  document.documentElement.classList.add("js");

  /* DATI DI CONTATTO — sostituire il segnaposto prima della pubblicazione. */
  const SITE_CONFIG = {
    contactEmail: "INSERISCI_QUI_EMAIL_OUTLOOK@outlook.com",
    emailSubject: "Richiesta informazioni — Pixel Ostia",
    socialLinks: {
      // Aggiungere solo profili realmente attivi, es. instagram: "https://instagram.com/tuoprofilo"
    },

    /*
      PREZZI CREAZIONE — unica fonte per le schede della homepage.
      Prima di pubblicare, confermare l'esatto perimetro commerciale delle voci.
      Non duplicare questi importi in altri file senza aggiornare anche questa struttura.
    */
    creationPackages: [
      {
        name: "Starter",
        tag: "Sito essenziale",
        price: "149 €",
        payment: "una tantum",
        idealFor: "Per attività che vogliono una presenza online essenziale e ordinata.",
        includes: [
          "Una pagina vetrina con sezioni essenziali",
          "Design responsive",
          "Pulsante email e collegamenti forniti",
          "Impostazione SEO di base"
        ],
        excludes: "Esclusi dominio, hosting, testi, fotografie, nuove pagine e funzioni non indicate.",
        featured: false
      },
      {
        name: "Business",
        tag: "Il più scelto",
        price: "299 €",
        payment: "una tantum",
        idealFor: "Per un'attività con più contenuti, servizi o una presentazione più personale.",
        includes: [
          "Sito vetrina con struttura più articolata",
          "Design responsive personalizzato",
          "SEO di base e metadati essenziali",
          "Email, social e Google Maps se forniti e richiesti"
        ],
        excludes: "Esclusi dominio, hosting, scrittura estesa dei contenuti, nuove funzioni e servizi esterni a pagamento.",
        featured: true
      },
      {
        name: "Pro",
        tag: "Più spazio",
        price: "499 €",
        payment: "una tantum",
        idealFor: "Per progetti con esigenze di personalizzazione e contenuti più complessi.",
        includes: [
          "Struttura vetrina definita sul progetto",
          "Design responsive più personalizzato",
          "SEO di base e collegamenti utili",
          "Integrazioni concordate compatibili con un sito statico"
        ],
        excludes: "Esclusi dominio, hosting, integrazioni a pagamento, database, pagamenti, autenticazione e funzionalità non concordate.",
        featured: false
      }
    ],

    /*
      PREZZI MANUTENZIONE — unica fonte per le schede della homepage.
      I limiti descrivono interventi sostenibili, non assistenza continuativa.
    */
    maintenancePackages: [
      {
        name: "Essenziale",
        price: "15 €",
        period: "/mese",
        includes: [
          "Controllo tecnico periodico del sito statico",
          "Un piccolo aggiornamento di contenuto al mese",
          "Correzione di link non funzionanti segnalati"
        ],
        excludes: "Non include nuove sezioni, nuove pagine, funzioni, dominio, hosting o interventi su servizi esterni."
      },
      {
        name: "Plus",
        price: "22 €",
        period: "/mese",
        includes: [
          "Controllo tecnico periodico del sito statico",
          "Fino a due piccoli aggiornamenti di contenuto al mese",
          "Aggiornamento di link, orari o contatti forniti"
        ],
        excludes: "Non include nuove sezioni, nuove pagine, funzioni, dominio, hosting o servizi esterni a pagamento."
      },
      {
        name: "Business Care",
        price: "30 €",
        period: "/mese",
        includes: [
          "Controllo tecnico periodico del sito statico",
          "Fino a quattro piccoli aggiornamenti di contenuto al mese",
          "Verifica dei collegamenti principali dopo gli aggiornamenti"
        ],
        excludes: "Non include progettazione di nuove pagine, nuove funzionalità, dominio, hosting o urgenze non concordate."
      }
    ]
  };

  const mailtoUrl = `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(SITE_CONFIG.emailSubject)}`;

  function renderPricing() {
    const creationContainer = document.querySelector("[data-creation-pricing]");
    const maintenanceContainer = document.querySelector("[data-maintenance-pricing]");

    if (creationContainer) {
      creationContainer.innerHTML = SITE_CONFIG.creationPackages.map((item) => `
        <article class="price-card${item.featured ? " price-card--featured" : ""}">
          <p class="price-card__tag">${item.tag}</p>
          <h3>${item.name}</h3>
          <p class="price-card__ideal">${item.idealFor}</p>
          <p class="price"><strong>${item.price}</strong><span>${item.payment}</span></p>
          <ul class="package-list">${item.includes.map((feature) => `<li>${feature}</li>`).join("")}</ul>
          <p class="package-exclusion"><strong>Nota:</strong> ${item.excludes}</p>
          <a class="button ${item.featured ? "button--ghost" : ""}" href="${mailtoUrl}">Richiedi informazioni <span aria-hidden="true">↗</span></a>
        </article>
      `).join("");
    }

    if (maintenanceContainer) {
      maintenanceContainer.innerHTML = SITE_CONFIG.maintenancePackages.map((item) => `
        <article class="maintenance-card">
          <h3>${item.name}</h3>
          <p class="price"><strong>${item.price}</strong><span>${item.period}</span></p>
          <ul class="package-list">${item.includes.map((feature) => `<li>${feature}</li>`).join("")}</ul>
          <p class="package-exclusion"><strong>Non incluso:</strong> ${item.excludes}</p>
        </article>
      `).join("");
    }
  }

  function updateContactLinks() {
    document.querySelectorAll("a[href*='INSERISCI_QUI_EMAIL_OUTLOOK']").forEach((link) => {
      const originalHref = link.getAttribute("href") || "";
      const existingQuery = originalHref.includes("?") ? originalHref.slice(originalHref.indexOf("?")) : `?subject=${encodeURIComponent(SITE_CONFIG.emailSubject)}`;
      link.href = `mailto:${SITE_CONFIG.contactEmail}${existingQuery}`;
      if (link.textContent.includes("INSERISCI_QUI_EMAIL_OUTLOOK")) {
        link.textContent = SITE_CONFIG.contactEmail;
      }
    });
  }

  function updateFooterYear() {
    document.querySelectorAll("[data-current-year]").forEach((element) => {
      element.textContent = String(new Date().getFullYear());
    });
  }

  /* MENU MOBILE — stato, Escape, focus e chiusura dopo una destinazione. */
  function setupMenu() {
    const header = document.querySelector("[data-header]");
    const menuButton = document.querySelector("[data-menu-toggle]");
    const menu = document.querySelector("[data-menu]");
    if (!header || !menuButton || !menu) return;

    const closeMenu = (restoreFocus = false) => {
      menu.classList.remove("is-open");
      header.classList.remove("menu-is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.querySelector(".sr-only").textContent = "Apri il menu";
      if (restoreFocus) menuButton.focus();
    };

    menuButton.addEventListener("click", () => {
      const willOpen = !menu.classList.contains("is-open");
      if (willOpen) {
        menu.classList.add("is-open");
        header.classList.add("menu-is-open");
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.querySelector(".sr-only").textContent = "Chiudi il menu";
        const firstLink = menu.querySelector("a");
        window.setTimeout(() => firstLink?.focus(), 60);
      } else {
        closeMenu();
      }
    });

    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu()));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) closeMenu(true);
      if (event.key === "Tab" && menu.classList.contains("is-open")) {
        const focusableItems = [...menu.querySelectorAll("a[href]")];
        const firstItem = focusableItems[0];
        const lastItem = focusableItems[focusableItems.length - 1];
        if (event.shiftKey && document.activeElement === firstItem) {
          event.preventDefault();
          lastItem.focus();
        } else if (!event.shiftKey && document.activeElement === lastItem) {
          event.preventDefault();
          firstItem.focus();
        }
      }
    });
  }

  /* RIVELAZIONE ALLO SCROLL — i contenuti restano visibili senza JavaScript. */
  function setupReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -20px" });
    items.forEach((element) => observer.observe(element));
  }

  /* MOVIMENTO — preferenza persistente e rispetto di prefers-reduced-motion. */
  function setupMotionControl() {
    const toggle = document.querySelector("[data-motion-toggle]");
    const preferredReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const storedValue = window.localStorage.getItem("pixel-ostia-motion");
    let motionIsOff = storedValue === "off" || (storedValue === null && preferredReduced);

    const applyMotionPreference = () => {
      document.body.classList.toggle("motion-off", motionIsOff);
      if (toggle) {
        toggle.setAttribute("aria-pressed", String(motionIsOff));
        toggle.setAttribute("aria-label", motionIsOff ? "Attiva le animazioni" : "Disattiva le animazioni");
        const label = toggle.querySelector(".motion-toggle__label");
        if (label) label.textContent = motionIsOff ? "Animazioni off" : "Movimento";
      }
    };

    applyMotionPreference();
    toggle?.addEventListener("click", () => {
      motionIsOff = !motionIsOff;
      window.localStorage.setItem("pixel-ostia-motion", motionIsOff ? "off" : "on");
      applyMotionPreference();
      if (motionIsOff) document.querySelectorAll("[data-reveal]").forEach((item) => item.classList.add("is-visible"));
    });
  }

  /* CURSORE — attivo solo per homepage e palestra su puntatori precisi. */
  function setupCustomCursor() {
    const canUseCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const usesBrandCursor = document.body.classList.contains("pixel-site") || document.body.classList.contains("gym-page");
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!canUseCursor || !usesBrandCursor || !dot || !ring) return;

    let ringX = -100;
    let ringY = -100;
    let pointerX = -100;
    let pointerY = -100;
    let animationFrame;
    let ready = false;

    const drawRing = () => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      animationFrame = window.requestAnimationFrame(drawRing);
    };

    window.addEventListener("pointermove", (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      if (!ready && !document.body.classList.contains("motion-off")) {
        ringX = pointerX;
        ringY = pointerY;
        document.body.classList.add("has-custom-cursor");
        ready = true;
        drawRing();
      }
    }, { passive: true });

    document.querySelectorAll("a, button, summary, .project-card").forEach((element) => {
      element.addEventListener("pointerenter", () => ring.classList.add("is-active"));
      element.addEventListener("pointerleave", () => ring.classList.remove("is-active"));
    });

    window.addEventListener("pagehide", () => window.cancelAnimationFrame(animationFrame), { once: true });
  }

  /* TRANSIZIONE PAGINA — solo per link interni a file HTML e senza modificatori. */
  function setupPageTransitions() {
    const wipe = document.querySelector(".page-wipe");
    if (!wipe || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll("a[href$='.html']").forEach((link) => {
      link.addEventListener("click", (event) => {
        const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
        if (isModifiedClick || link.target === "_blank" || document.body.classList.contains("motion-off")) return;
        event.preventDefault();
        wipe.classList.add("is-leaving");
        window.setTimeout(() => { window.location.href = link.href; }, 190);
      });
    });
  }

  renderPricing();
  updateContactLinks();
  updateFooterYear();
  setupMenu();
  setupReveal();
  setupMotionControl();
  setupCustomCursor();
  setupPageTransitions();
})();
