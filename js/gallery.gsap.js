(() => {
  if (!window.gsap) return;

  const track = document.getElementById("galleryTrack");
  if (!track) return;

  // Duplicate slides once
  const slides = Array.from(track.children);
  slides.forEach((node) => track.appendChild(node.cloneNode(true)));

  const imgs = track.querySelectorAll("img");
  let loaded = 0;

  const done = () => {
    const halfWidth = track.scrollWidth / 2;
    const pxPerSec = 60;
    const duration = halfWidth / pxPerSec;

    gsap.killTweensOf(track);
    gsap.set(track, { x: 0 });

    gsap.to(track, {
      x: -halfWidth,
      duration,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const v = parseFloat(x);
          return v % -halfWidth;
        }),
      },
    });
  };

  imgs.forEach((img) => {
    if (img.complete) {
      loaded++;
      if (loaded === imgs.length) done();
    } else {
      img.addEventListener(
        "load",
        () => {
          loaded++;
          if (loaded === imgs.length) done();
        },
        { once: true },
      );
      img.addEventListener(
        "error",
        () => {
          loaded++;
          if (loaded === imgs.length) done();
        },
        { once: true },
      );
    }
  });

  let rAF = null;
  window.addEventListener(
    "resize",
    () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => done());
    },
    { passive: true },
  );
})();

// --- FINAL WOW (S5) ---
function playFinalWow() {
  if (!window.gsap) return;

  const section = document.querySelector("#s5");
  if (!section) return;

  const shots = gsap.utils.toArray("#s5 .final-shot");
  const lines = gsap.utils.toArray("#s5 .reveal-line");

  if (section.dataset.played === "1") return;
  section.dataset.played = "1";

  gsap.set(shots, { opacity: 0, y: 20, filter: "blur(8px)" });
  gsap.set(lines, { yPercent: 120 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(
    shots,
    { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.1 },
    0,
  );
  tl.to(lines, { yPercent: 0, duration: 0.85, stagger: 0.12 }, 0.25);
  tl.fromTo(
    "#s5 .final-p",
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.6 },
    0.75,
  );
  tl.fromTo(
    "#s5 .final-cta",
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.6 },
    0.9,
  );
  window.sectionAnimations = {
    "final-wow": playFinalWow,
  };

  function playFinalWow() {
    if (!window.gsap) return;

    const section = document.querySelector("#s5");
    if (!section) return;

    // evita repetir al volver
    if (section.dataset.played === "1") return;
    section.dataset.played = "1";

    const shots = gsap.utils.toArray("#s5 .final-shot");
    const imgs = gsap.utils.toArray("#s5 .final-shot img");
    const lines = gsap.utils.toArray("#s5 .reveal-line");
    const p = section.querySelector(".final-p");
    const cta = section.querySelector(".final-cta");

    // states
    gsap.set(shots, {
      opacity: 0,
      y: 26,
      rotateX: 10,
      transformOrigin: "50% 80%",
      filter: "blur(10px)",
    });

    gsap.set(imgs, { scale: 1.08, filter: "brightness(.90) contrast(1.03)" });

    gsap.set(lines, { yPercent: 120, opacity: 1 });
    if (p) gsap.set(p, { opacity: 0, y: 10, filter: "blur(6px)" });
    if (cta) gsap.set(cta, { opacity: 0, y: 10 });

    // timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1) Photos appear (cinematic)
    tl.to(
      shots,
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.1,
      },
      0,
    );

    // 2) subtle “push in” on images (wow feel)
    tl.to(
      imgs,
      {
        scale: 1.02,
        filter: "brightness(.98) contrast(1.05)",
        duration: 1.2,
        stagger: 0.08,
      },
      0.15,
    );

    // 3) Text reveal line by line
    tl.to(
      lines,
      {
        yPercent: 0,
        duration: 0.85,
        stagger: 0.12,
      },
      0.35,
    );

    // 4) Paragraph + CTA
    if (p) {
      tl.to(p, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0.95);
    }
    if (cta) {
      tl.to(cta, { opacity: 1, y: 0, duration: 0.6 }, 1.05);
    }

    // 5) micro “afterglow” (very subtle premium)
    tl.to(
      imgs,
      {
        filter: "brightness(1.02) contrast(1.06)",
        duration: 0.6,
        stagger: 0.06,
      },
      1.15,
    );
  }
}
