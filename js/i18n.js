(() => {
  const i18n = {
    es: {
      htmlLang: "es",
      docTitle: "Aralia — Inicio",
      langSwitchLabel: "Seleccionar idioma",
      mapTitle: "Mapa — Estadio El Campín",
      mapWrapLabel: "Mapa",
      tagline: "Edificio Inteligente · Sostenible",
      venta: "VENTA",
      apartamentos: "APARTAMENTOS",
      h2: "Presentación",
      p2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.",
      h3: "Ubicación",
      p3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.",
    },
    en: {
      htmlLang: "en",
      docTitle: "Aralia — Home",
      langSwitchLabel: "Select language",
      mapTitle: "Map — El Campín Stadium",
      mapWrapLabel: "Map",
      tagline: "Smart building · sustainable",
      venta: "SALE",
      apartamentos: "APARTMENTS",
      h2: "Introduction",
      p2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.",
      h3: "Location",
      p3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.",
    },
    fr: {
      htmlLang: "fr",
      docTitle: "Aralia — Accueil",
      langSwitchLabel: "Choisir la langue",
      mapTitle: "Carte — Stade El Campín",
      mapWrapLabel: "Carte",
      tagline: "Immeuble intelligent · durable",
      venta: "VENTE",
      apartamentos: "APPARTEMENTS",
      h2: "Présentation",
      p2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.",
      h3: "Emplacement",
      p3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.",
    },
  };

  const els = {
    tagline: document.getElementById("tagline"),
    h2: document.getElementById("h2"),
    p2: document.getElementById("p2"),
    h3: document.getElementById("h3"),
    p3: document.getElementById("p3"),
    langSwitch: document.getElementById("langSwitch"),
    langBtns: Array.from(document.querySelectorAll(".lang button")),
    mapFrame: document.getElementById("mapFrame"),
    mapWrap: document.querySelector(".map-wrap"),
    titleVenta: document.getElementById("titleVenta"),
    titleApartamentos: document.getElementById("titleApartamentos"),
  };

  function setLanguage(lang) {
    const t = i18n[lang];

    renderWordAsLetters(els.titleVenta, t.venta);
    els.titleApartamentos.textContent = t.apartamentos;

    els.tagline.textContent = t.tagline;
    els.h2.textContent = t.h2;
    els.p2.textContent = t.p2;

    // guardar idioma
    localStorage.setItem("lang", lang);

    // active button
    els.langBtns.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });
  }

  function renderWordAsLetters(el, text) {
    el.innerHTML = [...text]
      .map((letter) => `<span class="ch venta">${letter}</span>`)
      .join("");
  }

  let initialLang = "es";
  try {
    const saved = localStorage.getItem("aralia_lang");

    if (saved && i18n[saved]) {
      initialLang = saved;
    } else {
      const nav = (navigator.language || "es").slice(0, 2).toLowerCase();
      initialLang = i18n[nav] ? nav : "es";
      localStorage.setItem("aralia_lang", initialLang); // guardar primera elección
    }
  } catch (e) {}

  setLanguage(initialLang);

  els.langBtns.forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  window.ARALIA = window.ARALIA || {};
  window.ARALIA.setLanguage = setLanguage;
})();
