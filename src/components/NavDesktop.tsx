import navLinks from "@/data/navLinks";

export default function NavDesktop() {
  return (
    <nav
      className="hidden h-[3.75rem] items-center justify-center space-x-20
        bg-white font-title uppercase tracking-wider md:flex"
    >
      {navLinks.map(({ name, url }) => (
        <a
          key={url}
          href={url}
          className="js-section-link
            after:mx-auto after:-mt-1 after:block after:w-0 after:border-b-2
            after:border-black after:transition-all after:duration-300
            hover:after:w-full"
        >
          {name}
        </a>
      ))}
    </nav>
  );
}
