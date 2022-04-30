import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Header({ children }: Props) {
  return (
    <header className="container mx-auto flex items-center space-x-3 px-5 py-7">
      <a
        href="/"
        className="font-title text-3xl tracking-wider"
        aria-label="iAdwin"
      >
        iA
      </a>

      {children && <span className="h-9 border-r-[2.5px] border-black" />}

      {children}
    </header>
  );
}
