function openingAnime() {
  const body = document.querySelector(".js_body");
  body.classList.toggle("is-active");

  gsap.timeline()
    .from(".js_opening-logo",{
      duration: 1.2,
      autoAlpha: 0,
      y: 40,      
    }).from(".js_opening-txt", {
      duration: 2,
      autoAlpha: 0,
      y: 40,
    }).to(".js_opening", {
      autoAlpha: 0,
      duration: 2,
      onComplete: function () {
        body.classList.toggle("is-active");
      },
    })
    .from(".js_copy", {
      duration: 0.6,
      autoAlpha: 0,
      x: -100,
      ease: "power3.out",
    })
    .from(".js_sub-copy", {
      duration: 0.6,
      autoAlpha: 0,
      x: -100,
      ease: "power3.out",
    });
};

openingAnime();


