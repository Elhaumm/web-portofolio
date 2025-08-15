// navbar scrollY ilang

// window.addEventListener("scroll", () => {
//   const navbar = document.getElementById("navbar");
//   if (window.scrollY > 0) {
//     navbar.classList.add("hidden");
//   } else {
//     navbar.classList.remove("hidden");
//   }
// });

// warna navbar berubah saat bertabrakan dengan warna lain

// Parallax effect e

document.addEventListener("DOMContentLoaded", () => {
  const parallaxEls = document.querySelectorAll("*");
  const initialTransforms = new Map();

  parallaxEls.forEach((el) => {
    const style = getComputedStyle(el).transform;
    initialTransforms.set(el, style === "none" ? "" : style);
  });

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    parallaxEls.forEach((el) => {
      const speedY = parseFloat(
        getComputedStyle(el).getPropertyValue("--parallax-speed-y")
      );
      const speedX = parseFloat(
        getComputedStyle(el).getPropertyValue("--parallax-speed-x")
      );
      let transform = initialTransforms.get(el) || "";

      if (!isNaN(speedY) && speedY !== 0) {
        transform += ` translateY(${scrollY * (speedY / 100)}px)`;
      }

      if (!isNaN(speedX) && speedX !== 0) {
        transform += ` translateX(${scrollY * (speedX / 100)}px)`;
      }
      el.style.transform = transform.trim();
    });
  });
});
