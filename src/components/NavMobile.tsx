import navLinks from "@/data/navLinks";

export default function NavMobile() {
  return (
    <nav
      className="flex flex-col sm:hidden divide-y divide-black
        font-title font-medium tracking-wider uppercase
        transition-all ease-in-out transition-duration-500"
    >
      {navLinks.map(({ name, url }) => (
        <a
          className="js-section-link w-full px-4 py-1.5 text-center"
          href={url}
        >
          {name}
        </a>
      ))}
    </nav>
  );
}
