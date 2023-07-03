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
  icon: string;
  contents: string[];
};
export const skills = [
  {
    title: "Client Side",
    icon: "user",
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
    icon: "server",
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
    icon: "code",
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
  img: string;
  url: string;
};
export const projects = [
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
    img: "projects_pinit.jpg",
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
    img: "projects_hotel_hamlet.jpg",
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
    img: "projects_roguelike.jpg",
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
    img: "projects_webdev.jpg",
    url: "https://github.com/adwinying/webdev",
  },
  {
    title: "Server Provisioning",
    tags: ["Terraform", "Ansible", "MergerFS", "Let's Encrypt", "Wireguard"],
    description: "Automated provisioning of homelab servers.",
    img: "projects_server_provisioning.jpg",
    url: "https://github.com/adwinying/server-provisioning",
  },
] satisfies Project[];

export type Connect = {
  title: string;
  icon: string;
  url: string;
};
export const connect = [
  {
    title: "LinkedIn",
    icon: "linkedin",
    url: "https://linkedin.com/in/adwinying",
  },
  {
    title: "Github",
    icon: "github",
    url: "https://github.com/adwinying",
  },
  {
    title: "Email",
    icon: "mail",
    url: "mailto:adwinying[at]gmail[dot]com",
  },
] satisfies Connect[];
