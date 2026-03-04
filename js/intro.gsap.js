(() => {
  if (!window.gsap) return;

  let breatheTimer = null;

  window.playIntro = function playIntro() {
    const wordEl = document.getElementById("titleVenta");
    const letters = wordEl ? wordEl.querySelectorAll(".ch") : [];
    const titleGlow = document.getElementById("titleGlow");
    const logo = document.getElementById("logo");
    const tagline = document.getElementById("tagline");
    const subtitle = document.getElementById("titleApartamentos"); // <- fijo

    if (!wordEl || !letters.length) return;

    // limpiar loops anteriores
    if (breatheTimer) clearInterval(breatheTimer);
    gsap.killTweensOf([letters, wordEl, titleGlow, logo, tagline, subtitle]);

    // --- Base states ---
    gsap.set(wordEl, {
      "--shineX": "-55%",
      "--shineA": 0,
      letterSpacing: "0.12em",
    });

    gsap.set(letters, {
      opacity: 0,
      y: 26,
      rotateX: 78,
      scale: 1.08,
      transformOrigin: "50% 70%",
      filter: "blur(14px)",
    });

    if (subtitle)
      gsap.set(subtitle, { opacity: 0, y: 14, filter: "blur(8px)" });
    if (titleGlow) gsap.set(titleGlow, { opacity: 0, x: "-60%" });
    gsap.set([logo, tagline], { opacity: 0, y: 10 });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.to(
      wordEl,
      { letterSpacing: "0.02em", duration: 1.05, ease: "power3.out" },
      0,
    );

    tl.to(
      letters,
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.15,
        stagger: 0.1,
      },
      0,
    );

    tl.call(() => letters.forEach((el) => el.classList.add("gold")), [], 0.25);

    tl.to(wordEl, { "--shineA": 1, duration: 0.25, ease: "sine.out" }, 0.55);
    tl.to(
      wordEl,
      { "--shineX": "55%", duration: 1.2, ease: "sine.inOut" },
      0.58,
    );
    tl.to(wordEl, { "--shineA": 0, duration: 0.35, ease: "sine.out" }, 1.25);

    letters.forEach((el, i) => {
      tl.to(
        el,
        {
          duration: 0.9,
          ease: "sine.inOut",
          onUpdate: function () {
            const p = this.progress();
            const tx = -140 + 280 * p;
            const op = p < 0.2 ? p / 0.2 : p > 0.85 ? (1 - p) / 0.15 : 1;
            el.style.setProperty("--sweepTX", tx.toFixed(2) + "%");
            el.style.setProperty("--sweepAlpha", op.toFixed(2));
          },
          onComplete: () => el.style.setProperty("--sweepAlpha", "0"),
        },
        0.72 + i * 0.07,
      );
    });

    if (titleGlow) {
      tl.to(
        titleGlow,
        { opacity: 0.45, duration: 1.4, ease: "sine.out" },
        0.35,
      ).to(
        titleGlow,
        { opacity: 0.28, duration: 2.0, ease: "sine.inOut" },
        1.2,
      );
    }

    if (subtitle) {
      tl.to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
        },
        1.05,
      );
    }

    tl.to(
      tagline,
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
      1.25,
    ).to(logo, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 1.38);

    function breathe() {
      gsap.to(letters, {
        duration: 2.2,
        y: (i) => (i % 2 === 0 ? -1 : 1),
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      });
      gsap.to(wordEl, {
        duration: 2.4,
        filter: "brightness(2.5)",
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      });
      if (titleGlow) {
        gsap.to(titleGlow, {
          duration: 2.6,
          opacity: 0.34,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
        });
      }
    }

    tl.call(
      () => {
        breathe();
        breatheTimer = setInterval(breathe, 5200);
      },
      [],
      2.0,
    );
  };

  // auto-play on first load
  window.addEventListener("load", () => window.playIntro && window.playIntro());
})();
