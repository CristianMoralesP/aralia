(() => {
  if (!window.gsap) return;

  const letters = gsap.utils.toArray(".ch");
  const wordEl  = document.querySelector(".word");
  const titleGlow = document.getElementById("titleGlow");
  const logo = document.getElementById("logo");
  const tagline = document.getElementById("tagline");
  const subtitle = document.querySelector(".subwrap h6");

  if (!letters.length || !wordEl) return;

  // --- Base states (premium: clean, no bounce) ---
  gsap.set(wordEl, { "--shineX": "-55%", "--shineA": 0 });

  gsap.set(letters, {
    opacity: 0,
    y: 26,
    rotateX: 78,
    scale: 1.08,
    transformOrigin: "50% 70%",
    filter: "blur(14px)"
  });

  if (subtitle) gsap.set(subtitle, { opacity: 0, y: 14, filter: "blur(8px)" });
  if (titleGlow) gsap.set(titleGlow, { opacity: 0, x: "-60%" });
  gsap.set([logo, tagline], { opacity: 0, y: 10 });

  // Subtle spacing tightening (luxury feel)
  gsap.set(wordEl, { letterSpacing: "0.12em" });

  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

  // 1) Tighten spacing slightly while the word appears
  tl.to(wordEl, {
    letterSpacing: "0.02em",
    duration: 1.05,
    ease: "power3.out"
  }, 0);

  // 2) Letters reveal: engraved -> filled (clean, premium)
  tl.to(letters, {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: "blur(0px)",
    duration: 1.15,
    stagger: 0.10
  }, 0);

  // 3) Turn letters into gold as they land (keeps your .gold style)
  tl.call(() => letters.forEach(el => el.classList.add("gold")), [], 0.25);

  // 4) Global shine sweep across the word (very subtle)
  tl.to(wordEl, { "--shineA": 1, duration: 0.25, ease: "sine.out" }, 0.55);
  tl.to(wordEl, {
    "--shineX": "55%",
    duration: 1.2,
    ease: "sine.inOut"
  }, 0.58);
  tl.to(wordEl, { "--shineA": 0, duration: 0.35, ease: "sine.out" }, 1.25);

  // 5) Your inner per-letter sweep (keep it, but softer + synced)
  letters.forEach((el, i) => {
    tl.to(el, {
      duration: 0.9,
      ease: "sine.inOut",
      onUpdate: function(){
        const p = this.progress();
        const tx = -140 + (280 * p);
        const op = (p < 0.2) ? (p/0.2) : (p > 0.85 ? (1-p)/0.15 : 1);
        el.style.setProperty("--sweepTX", tx.toFixed(2) + "%");
        el.style.setProperty("--sweepAlpha", op.toFixed(2));
      },
      onComplete: () => el.style.setProperty("--sweepAlpha", "0")
    }, 0.72 + i * 0.07);
  });

  // 6) Background glow behind the word (less dramatic, more premium)
  if (titleGlow){
    tl.to(titleGlow, { opacity: 0.45, duration: 1.4, ease:"sine.out" }, 0.35)
      .to(titleGlow, { opacity: 0.28, duration: 2.0, ease:"sine.inOut" }, 1.2);
  }

  // 7) Subtitle (Apartamentos) appears like a calm reveal
  if (subtitle){
    tl.to(subtitle, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.9,
      ease: "power3.out"
    }, 1.05);
  }

  // 8) Tagline + logo
  tl.to(tagline, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, 1.25)
    .to(logo,    { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 1.38);

  // 9) Premium breathing (very subtle)
  function breathe(){
    gsap.to(letters, {
      duration: 2.2,
      y: (i) => (i % 2 === 0 ? -1 : 1),
      ease: "sine.inOut",
      yoyo: true,
      repeat: 1
    });
    gsap.to(wordEl, {
      duration: 2.4,
      filter: "brightness(1.03)",
      ease: "sine.inOut",
      yoyo: true,
      repeat: 1
    });
    if (titleGlow){
      gsap.to(titleGlow, {
        duration: 2.6,
        opacity: 0.34,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1
      });
    }
  }

  tl.call(() => { breathe(); setInterval(breathe, 5200); }, [], 2.0);
})();