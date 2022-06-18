export type Project = {
  title: string;
  tags: string[];
  description: string;
  img: string;
  url: string;
};

const projects: Project[] = [
  {
    title: "Hotel Hamlet",
    tags: [
      "PHP",
      "Laravel",
      "MySQL",
      "Inertia.js",
      "Vue.js",
      "TypeScript",
      "TailwindCSS",
      "PHPUnit",
      "Github Actions",
      "Heroku",
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
  {
    title: "PinIt",
    tags: ["Node.js", "Express.js", "MongoDB", "Vue.js", "ESlint", "Heroku"],
    description: "A Node.js-based Pintrest clone.",
    img: "projects_pinit.jpg",
    url: "http://pins.nodeapp.iadw.in/",
  },
];

export default projects;
