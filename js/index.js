gsap.timeline() 
  .from(".js_copy", {
    duration: 1,
    opacity: 0,
    x: -100,
    ease: "power3.out",
  })
  .from(".js_sub-copy", {
    duration: 1,
    opacity: 0,
    x: -100,
    ease: "power3.out",
  })
