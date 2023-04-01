type Skill = {
  title: string;
  icon: string;
  contents: string[];
};

const skills = [
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

export default skills;