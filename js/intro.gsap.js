(() => {
  const letters = document.querySelectorAll(".ch");
  const titleGlow = document.getElementById("titleGlow");
  const logo = document.getElementById("logo");
  const tagline = document.getElementById("tagline");

  if (!window.gsap || !letters.length) return;

  gsap.set(letters, {
    opacity: 0,
    rotateX: 92,
    y: 28,
    z: -120,
    transformOrigin: "50% 65%",
    filter: "blur(10px)"
  });
  if (titleGlow) gsap.set(titleGlow, { opacity: 0, x: "-60%" });
  gsap.set([logo, tagline], { opacity: 0, y: 10 });

  const tlIntro = gsap.timeline({ defaults:{ ease:"power3.out" } });

  tlIntro.to(letters, {
    opacity: 1,
    rotateX: 0,
    y: 0,
    z: 0,
    filter: "blur(0px)",
    duration: 0.95,
    stagger: { each: 0.18, from: "start" }
  }, 0);

  tlIntro.to(letters, {
    duration: 0.7,
    y: (i)=> (i%2===0 ? -2 : 1),
    ease: "sine.inOut",
    stagger: 0.06
  }, 0.55);

  tlIntro.to(letters, {
    duration: 0.8,
    y: 0,
    ease: "expo.out",
    stagger: 0.05
  }, 0.78);

  letters.forEach((el,i)=>{
    tlIntro.call(() => {
      el.classList.add("gold");
      gsap.fromTo(el, {}, {
        duration: 1.25,
        ease: "sine.inOut",
        onUpdate: function(){
          const p = this.progress();
          const tx = -140 + (280 * p);
          const op = (p < 0.18) ? (p/0.18) : (p > 0.86 ? (1-p)/0.14 : 1);
          el.style.setProperty("--sweepTX", tx.toFixed(2) + "%");
          el.style.setProperty("--sweepAlpha", op.toFixed(2));
        },
        onComplete: () => el.style.setProperty("--sweepAlpha", "0")
      });
    }, [], i*0.18 + 0.10);
  });

  if (titleGlow){
    tlIntro.to(titleGlow, { opacity: 0.65, duration: 1.6, ease:"sine.out" }, 0.45)
           .to(titleGlow, { opacity: 0.35, duration: 2.2, ease:"sine.inOut" }, 1.6);
  }

  tlIntro.to(tagline, { opacity: 1, y: 0, duration: 1.0 }, 1.35)
         .to(logo,    { opacity: 1, y: 0, duration: 1.1 }, 1.55);

  function breathe(){
    gsap.to(letters, {
      duration: 1.6,
      filter: "brightness(1.03)",
      ease: "sine.inOut",
      yoyo: true,
      repeat: 1
    });
    if (titleGlow){
      gsap.to(titleGlow, {
        duration: 1.8,
        opacity: 0.55,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1
      });
    }
  }

  tlIntro.call(() => { breathe(); setInterval(breathe, 4200); }, [], 2.2);
})();