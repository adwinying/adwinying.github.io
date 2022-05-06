import navLinks from "@/data/navLinks";

export default function NavMobile() {
  return (
    <div className="js-nav transition-duration-500 relative transition-all ease-in-out">
      <nav
        className="absolute bottom-0 z-10 flex w-full flex-col divide-y
        divide-black bg-white font-title font-medium uppercase tracking-wider
        sm:hidden"
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
    </div>
  );
}
