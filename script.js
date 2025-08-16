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

  // IntersectionObserver untuk image-section
  const imageSection = document.querySelector(".image-section");
  if (imageSection) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.9) {
            imageSection.classList.add("animate-appearRight");
            obs.unobserve(imageSection);
          }
        });
      },
      { threshold: 0.9 }
    );
    observer.observe(imageSection);
  }

  // IntersectionObserver untuk About section

  const aboutSection = document.querySelector(".about .introduce");
  if (aboutSection) {
    // Ambil semua elemen urut di dalam .introduce
    const experience = aboutSection.querySelector(".experience");
    const experienceP = experience ? experience.querySelector("p") : null;
    const expRowDad = aboutSection.querySelector(".exp-row-dad");
    const expRows = expRowDad ? expRowDad.querySelectorAll(".exp-row") : [];
    // Ambil div setelah exp-row-dad (yang berisi p)`
    let textLeft1 = null;
    const divs = aboutSection.querySelectorAll(":scope > div");
    divs.forEach((div) => {
      if (
        !div.classList.contains("experience") &&
        !div.classList.contains("exp-row-dad") &&
        !div.classList.contains("text-section")
      ) {
        const p = div.querySelector("p");
        if (p) textLeft1 = p;
      }
    });
    const textSection = aboutSection.querySelector(".text-section h4");
    const textSection2 = aboutSection.querySelector(".text-section div");

    // Daftar urutan animasi e
    const elements = [
      { el: experience, className: "animate-intro-left" },
      { el: experienceP, className: "animate-intro-left2" },
      { el: expRowDad, className: "animate-exp-row-dad" },
      ...Array.from(expRows).map((row) => ({
        el: row,
        className: "animate-exp-row",
      })),
      { el: textLeft1, className: "animate-text-left1" },
      { el: textSection, className: "animate-text-section" },
      { el: textSection2, className: "animate-text-section2" },
    ];

    elements.forEach(({ el, className }) => {
      if (!el) return;
      el.classList.remove(className);
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add(className);
              obs.unobserve(el);
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
    });
  }
});
