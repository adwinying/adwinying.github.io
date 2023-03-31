type NavLink = {
  name: string;
  url: string;
};

const navLinks = [
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

export default navLinks;
