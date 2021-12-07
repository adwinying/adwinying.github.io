// @ts-ignore
import smoothscroll from "smoothscroll-polyfill";

// toggle mobile nav menu on click
function initMobileNav() {
  const navToggle = document.querySelector(".js-nav-toggle");
  const nav = document.querySelector(".js-nav");

  navToggle?.addEventListener("click", (e) => {
    e.preventDefault();

    nav?.classList.toggle("h-0");
    nav?.classList.toggle("h-[147px]");
  });
}

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
  initMobileNav();
  initSectionLinks();
}

smoothscroll.polyfill();
main();
