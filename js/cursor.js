(() => {
  if (!window.gsap) return;

  const dot  = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  const glowC= document.getElementById("cursorGlow");
  if (!dot || !ring || !glowC) return;

  const pointer = { x: window.innerWidth/2, y: window.innerHeight/2 };
  const state = { dx:pointer.x, dy:pointer.y, rx:pointer.x, ry:pointer.y, gx:pointer.x, gy:pointer.y };

  let showGlow = true;
  let cursorActivated = false;

  function activateCursor(){
    if (cursorActivated) return;
    cursorActivated = true;
    gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
    gsap.to(glowC, { opacity: showGlow ? 0.35 : 0, duration: 0.35 });
  }

  window.addEventListener("pointermove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    activateCursor();
  }, { passive:true });

  function updateCursorMode(){
    const current = window.ARALIA?.state?.current ?? 0;
    showGlow = (current === 0);
    gsap.to(glowC, { opacity: showGlow ? 0.35 : 0, duration: 0.5, ease: "sine.inOut" });
  }

  function loop(){
    state.dx += (pointer.x - state.dx) * 0.35;
    state.dy += (pointer.y - state.dy) * 0.35;

    state.rx += (pointer.x - state.rx) * 0.18;
    state.ry += (pointer.y - state.ry) * 0.18;

    state.gx += (pointer.x - state.gx) * 0.10;
    state.gy += (pointer.y - state.gy) * 0.10;

    gsap.set(dot,  { x: state.dx, y: state.dy });
    gsap.set(ring, { x: state.rx, y: state.ry });
    if (showGlow) gsap.set(glowC, { x: state.gx, y: state.gy });

    requestAnimationFrame(loop);
  }

  loop();
  gsap.to(glowC, { scale: 1.08, duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut" });

  window.ARALIA = window.ARALIA || {};
  window.ARALIA.updateCursorMode = updateCursorMode;

  updateCursorMode();
})();