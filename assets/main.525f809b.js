import{s as l}from"./vendor.da1192e1.js";function i(){const s=document.querySelector(".js-nav-toggle"),o=document.querySelector(".js-nav");s?.addEventListener("click",t=>{t.preventDefault(),o?.classList.toggle("h-0"),o?.classList.toggle("h-[147px]")})}function r(){document.querySelectorAll(".js-section-link").forEach(o=>{o.addEventListener("click",t=>{t.preventDefault();const n=t.target.getAttribute("href");document.querySelector(n??"")?.scrollIntoView({behavior:"smooth"})})})}function c(){const s=document.querySelectorAll(".js-section-title"),o=new IntersectionObserver(t=>{t.forEach(e=>{e.boundingClientRect.top<=0||(e.isIntersecting?(e.target.classList.add("after:w-full"),e.target.classList.remove("after:w-0")):(e.target.classList.remove("after:w-full"),e.target.classList.add("after:w-0")))})},{rootMargin:"0px 0px -100px 0px",threshold:1});s.forEach(t=>{o.observe(t)})}function a(){i(),r(),c()}l.polyfill();a();
