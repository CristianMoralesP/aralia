(() => {
  if (!window.gsap) return;

  function playFinalWow() {
    const section = document.querySelector("#s5");
    if (!section) return;
    if (section.dataset.played === "1") return;
    section.dataset.played = "1";

    const shots = gsap.utils.toArray("#s5 .final-shot");
    const imgs = gsap.utils.toArray("#s5 .final-shot img");
    const lines = gsap.utils.toArray("#s5 .reveal-line");
    const p = section.querySelector(".final-p");
    const cta = section.querySelector(".final-cta");

    gsap.set(shots, { opacity: 0, y: 22, filter: "blur(10px)" });
    gsap.set(imgs, { scale: 1.08, filter: "brightness(.90) contrast(1.03)" });
    gsap.set(lines, { yPercent: 120 });
    if (p) gsap.set(p, { opacity: 0, y: 10, filter: "blur(6px)" });
    if (cta) gsap.set(cta, { opacity: 0, y: 10 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(
      shots,
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.1 },
      0,
    );
    tl.to(
      imgs,
      {
        scale: 1.02,
        filter: "brightness(.98) contrast(1.05)",
        duration: 1.2,
        stagger: 0.08,
      },
      0.12,
    );
    tl.to(lines, { yPercent: 0, duration: 0.85, stagger: 0.12 }, 0.3);

    if (p)
      tl.to(p, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0.95);
    if (cta) tl.to(cta, { opacity: 1, y: 0, duration: 0.6 }, 1.05);

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

  // Auto trigger when s5 becomes visible (works with translateY pages)
  const s5 = document.querySelector("#s5");
  if (!s5) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) playFinalWow();
      });
    },
    { threshold: 0.45 },
  );

  io.observe(s5);

  // optional manual trigger for tests
  window.playFinalWow = playFinalWow;
})();
