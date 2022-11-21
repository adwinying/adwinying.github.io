export type Project = {
  title: string;
  tags: string[];
  description: string;
  img: string;
  url: string;
};

const projects: Project[] = [
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
];

export default projects;
