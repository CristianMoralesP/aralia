(() => {
  if (!window.gsap) return;

  const track = document.getElementById("galleryTrack");
  if (!track) return;

  // Duplicate slides once
  const slides = Array.from(track.children);
  slides.forEach(node => track.appendChild(node.cloneNode(true)));

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
        x: gsap.utils.unitize(x => {
          const v = parseFloat(x);
          return (v % -halfWidth);
        })
      }
    });
  };

  imgs.forEach(img => {
    if (img.complete) {
      loaded++;
      if (loaded === imgs.length) done();
    } else {
      img.addEventListener("load", () => {
        loaded++;
        if (loaded === imgs.length) done();
      }, { once:true });
      img.addEventListener("error", () => {
        loaded++;
        if (loaded === imgs.length) done();
      }, { once:true });
    }
  });

  let rAF = null;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => done());
  }, { passive:true });
})();