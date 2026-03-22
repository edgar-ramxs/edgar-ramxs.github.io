const animateSections = () => {
  const sections = document.querySelectorAll<HTMLElement>("main#master .section");
  sections.forEach((section, index) => {
    section.classList.add("fade-up");
    section.style.animationDelay = `${Math.min(index * 0.08, 0.5)}s`;
  });
};

const run = () => {
  requestAnimationFrame(() => {
    animateSections();
  });
};

window.addEventListener("DOMContentLoaded", run);
window.addEventListener("astro:page-load", run);
