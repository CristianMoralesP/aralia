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
      h2: "Arquitectura impecable",
      p2: "La fachada del edificio destaca por su diseño de vidrio y líneas. Ventanales de piso a techo, conectan interior y ciudad.",
      h3: "Ubicación",
      p3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.",
      // ES
      s2: {
        title: "Arquitectura que inspira",
        presentationText:
          "La fachada del edificio destaca por su diseño contemporáneo en vidrio y líneas modernas, permitiendo que la luz natural inunde cada espacio interior.",
        chips: ["Ascensor", "Parqueadero"],
        destinoTitle: "Destino turístico sostenible",
        destinoItems: [
          "A 20 minutos del Aeropuerto El Dorado",
          "Estadio El Campín",
          "Movistar Arena",
          "Universidad Nacional",
          "Teatros, librerías y espacios culturales",
          "Centros comerciales",
        ],
      },
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
      // EN
      s2: {
        title: "Architecture that inspires",
        presentationText:
          "The building’s facade stands out with a contemporary glass design and modern lines, allowing natural light to flood every interior space.",
        chips: ["Elevator", "Parking"],
        destinoTitle: "Sustainable tourist destination",
        destinoItems: [
          "20 minutes from El Dorado Airport",
          "El Campín Stadium",
          "Movistar Arena",
          "National University",
          "Theaters, bookstores and cultural spots",
          "Shopping centers",
        ],
      },
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
      // FR
      s2: {
        title: "Une architecture inspirante",
        presentationText:
          "La façade du bâtiment se distingue par son design contemporain en verre et ses lignes modernes, permettant à la lumière naturelle d’inonder chaque espace intérieur.",
        chips: ["Ascenseur", "Parking"],
        destinoTitle: "Destination touristique durable",
        destinoItems: [
          "À 20 minutes de l’aéroport El Dorado",
          "Stade El Campín",
          "Movistar Arena",
          "Université Nationale",
          "Théâtres, librairies et lieux culturels",
          "Centres commerciaux",
        ],
      },
    },
  };

  function get(obj, path) {
    return path
      .split(".")
      .reduce((a, k) => (a && a[k] != null ? a[k] : undefined), obj);
  }

  function applyI18n(t) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const val = get(t, el.dataset.i18n);
      if (val == null) return;
      el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-list]").forEach((el) => {
      const arr = get(t, el.dataset.i18nList);
      if (!Array.isArray(arr)) return;

      el.innerHTML = "";
      arr.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        el.appendChild(li);
      });
    });
  }

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
    const t = i18n[lang] || i18n.es;

    // ✅ NO romper animaciones: no recrees el DOM si no hace falta
    // (de momento lo dejamos como lo tienes; luego lo hacemos "in place")
    renderWordAsLetters(els.titleVenta, t.venta);
    els.titleApartamentos.textContent = t.apartamentos;

    els.tagline.textContent = t.tagline;

    // Estos IDs ya no son necesarios si en S2 usas data-i18n (pero no estorban)
    if (els.h2) els.h2.textContent = t.h2;
    if (els.p2) els.p2.textContent = t.p2;

    // ✅ NUEVO: aplica traducciones por atributos data-i18n / data-i18n-list
    applyI18n(t);

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
  function get(obj, path) {
    return path
      .split(".")
      .reduce((a, k) => (a && a[k] != null ? a[k] : undefined), obj);
  }

  function applyI18n(t) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const val = get(t, el.dataset.i18n);
      if (val == null) return;
      el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-list]").forEach((el) => {
      const arr = get(t, el.dataset.i18nList);
      if (!Array.isArray(arr)) return;

      el.innerHTML = "";
      arr.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        el.appendChild(li);
      });
    });
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
