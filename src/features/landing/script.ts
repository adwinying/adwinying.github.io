// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import smoothscroll from "smoothscroll-polyfill";

// toggle mobile nav menu on click
function initMobileNav() {
  const navToggle = document.querySelector(".js-nav-toggle");
  const navWrapper = document.querySelector(".js-nav") as HTMLDivElement;
  const nav = navWrapper?.querySelector("nav") as HTMLDivElement;
  const navHeight = nav?.getBoundingClientRect().height;
  const navHeightInPx = `${navHeight}px`;

  navToggle?.addEventListener("click", (e) => {
    e.preventDefault();

    navWrapper.style.paddingBottom =
      navWrapper.style.paddingBottom === navHeightInPx ? "0px" : navHeightInPx;
  });
}

// smooth scroll to anchor on link click
function initSectionLinks() {
  const links = document.querySelectorAll(".js-section-link");

  links.forEach((link) => {
    const linkEl = link as HTMLAnchorElement;
    const targetHref = linkEl.getAttribute("href");

    const isHashedLink = targetHref?.substring(0, 1) === "#";
    if (!isHashedLink) return;

    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetEl = document.querySelector(targetHref ?? "");
      targetEl?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// animate section title when visible in viewport
function initSectionTitle() {
  const titles = document.querySelectorAll(".js-section-title");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.boundingClientRect.top <= 0) return;

        if (entry.isIntersecting) {
          entry.target.classList.add("after:w-full");
          entry.target.classList.remove("after:w-0");
        } else {
          entry.target.classList.remove("after:w-full");
          entry.target.classList.add("after:w-0");
        }
      });
    },
    {
      rootMargin: "0px 0px -200px 0px",
      threshold: 1.0,
    },
  );

  titles.forEach((title) => {
    observer.observe(title);
  });
}

function main() {
  initMobileNav();
  initSectionLinks();
  initSectionTitle();
}

document.addEventListener("astro:page-load", () => {
  smoothscroll.polyfill();
  main();
});
