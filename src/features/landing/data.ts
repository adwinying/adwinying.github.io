import type { ImageMetadata } from "astro";

import type { Icon } from "@/components/icons/Icons";
import projHotelHamlet from "@/features/landing/projects_hotel_hamlet.jpg";
import projPinit from "@/features/landing/projects_pinit.jpg";
import projRoguelike from "@/features/landing/projects_roguelike.jpg";
import projServerProvisioning from "@/features/landing/projects_server_provisioning.jpg";
import projWeatherotg from "@/features/landing/projects_weatherotg.jpg";
import projWebdev from "@/features/landing/projects_webdev.jpg";

export type NavLink = {
  name: string;
  url: string;
};
export const navLinks = [
  {
    name: "About",
    url: "#about",
  },
  {
    name: "Skills",
    url: "#skills",
  },
  {
    name: "Projects",
    url: "#projects",
  },
  {
    name: "Connect",
    url: "#connect",
  },
  {
    name: "Blog",
    url: "/blog",
  },
] satisfies NavLink[];

type Skill = {
  title: string;
  icon: keyof typeof Icon;
  contents: string[];
};
export const skills = [
  {
    title: "Client Side",
    icon: "User",
    contents: [
      "HTML | HTML5",
      "CSS | CSS3",
      "TailwindCSS",
      "Javascript | ES6+",
      "Typescript",
      "jQuery",
      "React | Remix",
      "Vue.js | Vuex",
      "Inertia.js",
    ],
  },
  {
    title: "Server Side",
    icon: "Server",
    contents: [
      "PHP | Laravel",
      "NodeJS | Express",
      "NestJS",
      "Remix",
      "MySQL",
      "PostgreSQL",
      "Redis",
      "Web Sockets (Socket.io)",
    ],
  },
  {
    title: "Others",
    icon: "Code",
    contents: [
      "C",
      "CI/CD (Github Actions | GitlabCI)",
      "Docker + Docker Compose",
      "Vagrant",
      "Ansible",
      "Elastic Stack",
      "LaTeX",
      "Git (Github | Gitlab)",
    ],
  },
] satisfies Skill[];

type Project = {
  title: string;
  tags: string[];
  description: string;
  img: ImageMetadata;
  url: string;
};
export const projects = [
  {
    title: "WeatherOTG",
    tags: [
      "Golang",
      "Templ",
      "HTMX",
      "TailwindCSS",
      "DaisyUI",
      "Github Actions",
      "Fly.io",
    ],
    description: "A simple weather app powered by Golang + HTMX.",
    img: projWeatherotg,
    url: "https://weatherotg.onrender.com",
  },
  {
    title: "PinIt",
    tags: [
      "Typescript",
      "Remix",
      "Remix Auth",
      "React",
      "SQLite",
      "TailwindCSS",
      "zod",
      "ESLint",
      "Prettier",
      "Vitest",
      "Cypress",
      "Github Actions",
      "Fly.io",
    ],
    description: "A full-stack Pintrest clone.",
    img: projPinit,
    url: "https://pinit.fly.dev/",
  },
  {
    title: "Hotel Hamlet",
    tags: [
      "PHP",
      "Laravel",
      "MySQL",
      "Inertia.js",
      "Vue.js",
      "Typescript",
      "TailwindCSS",
      "PHPUnit",
      "Github Actions",
      "Fly.io",
    ],
    description:
      "A full-stack web application with a built-in reservation system.",
    img: projHotelHamlet,
    url: "https://hotel-hamlet.fly.dev/admin",
  },
  {
    title: "Roguelike2",
    tags: [
      "Typescript",
      "React",
      "Vite",
      "Jotai",
      "Immer",
      "react-hot-toast",
      "TailwindCSS",
      "DaisyUI",
      "ESLint",
      "Prettier",
      "Vitest",
    ],
    description: "Web-based roguelike dungeon game.",
    img: projRoguelike,
    url: "https://iadw.in/roguelike2",
  },
  {
    title: "Webdev",
    tags: [
      "Docker Compose",
      "MySQL",
      "PostgreSQL",
      "Redis",
      "Mailhog",
      "Meilisearch",
    ],
    description:
      "A set of commonly used services in web development all bundled in a docker compose file.",
    img: projWebdev,
    url: "https://github.com/adwinying/webdev",
  },
  {
    title: "Server Provisioning",
    tags: ["Terraform", "Ansible", "MergerFS", "Let's Encrypt", "Wireguard"],
    description: "Automated provisioning of homelab servers.",
    img: projServerProvisioning,
    url: "https://github.com/adwinying/server-provisioning",
  },
] satisfies Project[];

export type Connect = {
  title: string;
  icon: keyof typeof Icon;
  url: string;
};
export const connect = [
  {
    title: "LinkedIn",
    icon: "Linkedin",
    url: "https://linkedin.com/in/adwinying",
  },
  {
    title: "Github",
    icon: "Github",
    url: "https://github.com/adwinying",
  },
  {
    title: "Email",
    icon: "Mail",
    url: "mailto:adwinying[at]gmail[dot]com",
  },
] satisfies Connect[];
