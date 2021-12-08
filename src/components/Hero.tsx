import MenuIcon from "@/components/icons/Menu";

export default function Hero() {
  return (
    <header
      className="flex items-center relative h-screen md:h-[calc(100vh-3.75rem)]
      px-3 md:px-6 lg:px-10
      bg-hero-mobile hero:bg-hero bg-cover bg-center bg-no-repeat bg-local"
    >
      {/* Hamburger toggle */}
      <div className="js-nav-toggle md:hidden absolute top-4 right-5 w-9 p-2">
        <MenuIcon className="w-full text-white" />
      </div>

      {/* Hero text */}
      <div className="text-white leading-[5.5rem] text-[5rem] font-light">
        <span className="block text-base">Landing page of</span>
        Adwin Ying
      </div>
    </header>
  );
}
