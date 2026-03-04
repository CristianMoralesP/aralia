(() => {
  const i18n = {
    es: {
      htmlLang: "es",
      docTitle: "Aralia — Inicio",
      langSwitchLabel: "Seleccionar idioma",
      mapTitle: "Mapa — Estadio El Campín",
      mapWrapLabel: "Mapa",
      tagline: "Edificio Inteligente · Sostenible",
      h2: "Presentación",
      p2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.",
      h3: "Ubicación",
      p3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta."
    },
    en: {
      htmlLang: "en",
      docTitle: "Aralia — Home",
      langSwitchLabel: "Select language",
      mapTitle: "Map — El Campín Stadium",
      mapWrapLabel: "Map",
      tagline: "Smart building · sustainable",
      h2: "Introduction",
      p2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.",
      h3: "Location",
      p3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta."
    },
    fr: {
      htmlLang: "fr",
      docTitle: "Aralia — Accueil",
      langSwitchLabel: "Choisir la langue",
      mapTitle: "Carte — Stade El Campín",
      mapWrapLabel: "Carte",
      tagline: "Immeuble intelligent · durable",
      h2: "Présentation",
      p2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.",
      h3: "Emplacement",
      p3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta."
    }
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
    mapWrap: document.querySelector(".map-wrap")
  };

  function setLanguage(lang){
    const t = i18n[lang] || i18n.es;

    document.documentElement.lang = t.htmlLang;
    document.title = t.docTitle;

    if (els.tagline) els.tagline.textContent = t.tagline;
    if (els.h2) els.h2.textContent = t.h2;
    if (els.p2) els.p2.textContent = t.p2;
    if (els.h3) els.h3.textContent = t.h3;
    if (els.p3) els.p3.textContent = t.p3;

    if (els.langSwitch) els.langSwitch.setAttribute("aria-label", t.langSwitchLabel);
    if (els.mapFrame) els.mapFrame.setAttribute("title", t.mapTitle);
    if (els.mapWrap) els.mapWrap.setAttribute("aria-label", t.mapWrapLabel);

    els.langBtns.forEach(b => b.classList.toggle("is-active", b.dataset.lang === lang));
    try { localStorage.setItem("aralia_lang", lang); } catch(e) {}
  }

  let initialLang = "es";
  try {
    const saved = localStorage.getItem("aralia_lang");
    if (saved && i18n[saved]) initialLang = saved;
  } catch(e) {}
  setLanguage(initialLang);

  els.langBtns.forEach(btn => btn.addEventListener("click", () => setLanguage(btn.dataset.lang)));

  window.ARALIA = window.ARALIA || {};
  window.ARALIA.setLanguage = setLanguage;
})();