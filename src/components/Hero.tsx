import MenuIcon from "@/components/icons/Menu";

export default function Hero() {
  return (
    <header
      className="relative flex h-screen items-center bg-hero-mobile bg-cover
        bg-local bg-center bg-no-repeat px-3 md:h-[calc(100vh-3.75rem)] md:px-6
        lg:px-10 hero:bg-hero"
    >
      {/* Hamburger toggle */}
      <div className="js-nav-toggle absolute top-4 right-5 w-9 p-2 md:hidden">
        <MenuIcon className="w-full text-white" />
      </div>

      {/* Hero text */}
      <div className="text-[5rem] font-light leading-[5.5rem] text-white">
        <span className="block text-base">Landing page of</span>
        Adwin Ying
      </div>
    </header>
  );
}
