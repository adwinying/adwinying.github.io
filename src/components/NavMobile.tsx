import navLinks from "@/data/navLinks";

export default function NavMobile() {
  return (
    <nav
      className="js-nav h-0 flex flex-col sm:hidden divide-y divide-black bg-white
        font-title font-medium tracking-wider uppercase
        transition-all ease-in-out transition-duration-500"
    >
      {navLinks.map(({ name, url }) => (
        <a
          key={url}
          className="js-section-link w-full px-4 py-1.5 text-center"
          href={url}
        >
          {name}
        </a>
      ))}
    </nav>
  );
}
