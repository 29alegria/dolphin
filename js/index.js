function openingAnime() {
  const body = document.querySelector(".js_body");
  body.classList.toggle("is-active");

  gsap.timeline()
    .from(".js_opening-logo",{
      duration: 2,
      autoAlpha: 0,
      y: 40,
    })
    .to(".js_opening-logo", {
      duration:0.6,
      scale: 0.8,
      y: 40,

    })
    .from(".js_opening-txt", {
      duration: 2,
      autoAlpha: 0,
      y: 40,
    }).to(".js_opening", {
      autoAlpha: 0,
      duration: 1.5,
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
    })
  // 1行目の下線
    .to(".js_copy .line1", {
      duration: 1,
      backgroundSize: "100% 8px",
      ease: "power1.out"
    })
    // 前のアニメーション完了後、少し遅らせて2行目の下線
    .to(".js_copy .line2", {
      duration: 1,
      backgroundSize: "100% 8px",
      ease: "power1.out"
    }, "+=0.2"); // 0.2秒遅延など好みで調整
};

openingAnime();


