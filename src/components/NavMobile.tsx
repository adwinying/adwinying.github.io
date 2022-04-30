import navLinks from "@/data/navLinks";

export default function NavMobile() {
  return (
    <nav
      className="js-nav transition-duration-500 flex h-0 flex-col divide-y
        divide-black bg-white font-title font-medium uppercase tracking-wider
        transition-all ease-in-out sm:hidden"
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
