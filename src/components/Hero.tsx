import MenuIcon from "@/components/icons/Menu";

export default function Hero() {
  return (
    <header
      className="relative flex h-screen items-center
        bg-[url('/img/hero_bg_mobile.jpg')] bg-cover bg-local bg-center
        bg-no-repeat px-3 md:h-[calc(100vh-3.75rem)] md:px-6
        hero:bg-[url('/img/hero_bg.jpg')] lg:px-10"
    >
      {/* Hamburger toggle */}
      <div className="js-nav-toggle absolute right-5 top-4 w-9 p-2 md:hidden">
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
