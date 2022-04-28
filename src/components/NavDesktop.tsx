import navLinks from "@/data/navLinks";

export default function NavDesktop() {
  return (
    <nav
      className="hidden md:flex justify-center items-center h-[3.75rem] bg-white
        space-x-20 font-title tracking-wider uppercase"
    >
      {navLinks.map(({ name, url }) => (
        <a
          key={url}
          href={url}
          className="js-section-link
            after:block after:w-0 hover:after:w-full after:-mt-1 after:mx-auto
            after:border-b-2 after:border-black
            after:transition-all after:duration-300"
        >
          {name}
        </a>
      ))}
    </nav>
  );
}
