import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  children?: ReactNode;
};
export default function SectionTitle({ className = "", children }: Props) {
  return (
    <div className="flex justify-center">
      <h2
        className={twMerge(
          "js-section-title",
          "text-center font-title text-2xl uppercase tracking-wider",
          "after:mx-auto after:-mt-1 after:block after:border-b-2",
          "after:border-black after:transition-all after:duration-300 ",
          className,
        )}
      >
        {children}
      </h2>
    </div>
  );
}
