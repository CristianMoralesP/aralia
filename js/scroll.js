(() => {
  if (!window.gsap) return;

  const pages = document.getElementById("pages");
  const fadeOverlay = document.getElementById("fadeOverlay");
  const card2 = document.getElementById("card2");
  const card3 = document.getElementById("card3");
  const logo  = document.getElementById("logo");

  const S = (window.ARALIA && window.ARALIA.state) ? window.ARALIA.state : { current:0, animating:false };

  function setLogoCompact(isCompact){
    if (!logo) return;
    gsap.to(logo, { scale: isCompact ? 0.5 : 1, duration: 0.9, ease: "power2.inOut" });
  }

  function enterSection(idx){
    if (idx === 1 && card2){
      gsap.to(card2, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power2.out" });
    }
    if (idx === 2 && card3){
      gsap.to(card3, { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", duration: 1.15, ease: "power2.out" });
    }
  }
  function resetSection(idx){
    if (idx === 1 && card2) gsap.set(card2, { opacity: 0, y: 12, filter: "blur(4px)" });
    if (idx === 2 && card3) gsap.set(card3, { opacity: 0, x: 18, scale: 0.985, filter: "blur(6px)" });
  }

  resetSection(1);
  resetSection(2);

  function transitionStyle(from, to){
    const pair = `${from}->${to}`;
    if (pair === "0->1" || pair === "1->0") return { duration: 1.25, ease: "power2.inOut", useFade: false, zoom: false };
    if (pair === "1->2" || pair === "2->1") return { duration: 1.45, ease: "expo.inOut", useFade: true, zoom: true };
    return { duration: 1.25, ease: "power2.inOut", useFade: false, zoom: false };
  }

  function goTo(index){
    if (S.animating) return;
    index = Math.max(0, Math.min(2, index));
    if (index === S.current) return;

    const from = S.current;
    const to = index;
    const style = transitionStyle(from, to);

    S.animating = true;
    S.current = to;

    setLogoCompact(S.current !== 0);

    if (to === 1) enterSection(1);
    if (to === 2) enterSection(2);
    resetSection(from);

    const targetY = -S.current * window.innerHeight;

    const move = () => gsap.to(pages, {
      y: targetY,
      duration: style.duration,
      ease: style.ease,
      onComplete: () => { S.animating = false; window.ARALIA?.updateCursorMode?.(); }
    });

    if (style.useFade && fadeOverlay){
      const t = gsap.timeline();
      if (style.zoom) t.to(pages, { scale: 0.985, duration: 0.35, ease: "sine.inOut" }, 0);
      t.to(fadeOverlay, { opacity: 0.35, duration: 0.35, ease: "sine.inOut" }, 0)
       .add(move, 0.12)
       .to(fadeOverlay, { opacity: 0, duration: 0.55, ease: "sine.out" }, style.duration * 0.55)
       .to(pages, { scale: 1, duration: 0.6, ease: "sine.out" }, style.duration * 0.55);
      return;
    }

    move();
  }

  function onWheel(e){
    if (S.animating) return;
    const dy = e.deltaY || 0;
    if (dy > 10) goTo(S.current + 1);
    if (dy < -10) goTo(S.current - 1);
  }
  window.addEventListener("wheel", onWheel, { passive:true });

  // Touch
  let touchStartY = null;
  window.addEventListener("touchstart", (e) => {
    touchStartY = e.touches?.[0]?.clientY ?? null;
  }, { passive:true });

  window.addEventListener("touchend", (e) => {
    if (touchStartY == null || S.animating) return;
    const endY = e.changedTouches?.[0]?.clientY ?? touchStartY;
    const diff = touchStartY - endY;
    if (diff > 40) goTo(S.current + 1);
    if (diff < -40) goTo(S.current - 1);
    touchStartY = null;
  }, { passive:true });

  window.addEventListener("resize", () => {
    gsap.set(pages, { y: -S.current * window.innerHeight, scale: 1 });
  }, { passive:true });

  window.ARALIA = window.ARALIA || {};
  window.ARALIA.goTo = goTo;
})();