// @ts-ignore
import smoothscroll from "smoothscroll-polyfill";

// smooth scroll to anchor on link click
function initSectionLinks() {
  const links = document.querySelectorAll(".js-section-link");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const linkEl = e.target as HTMLAnchorElement;
      const targetHref = linkEl.getAttribute("href");
      const targetEl = document.querySelector(targetHref ?? "");

      targetEl?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function main() {
  initSectionLinks();
}

smoothscroll.polyfill();
main();
