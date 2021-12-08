import { ReactNode } from "react";

type Props = {
  className?: string;
  children?: ReactNode;
};
export default function SectionTitle({ className, children }: Props) {
  return (
    <div className="flex justify-center">
      <h2
        className={`js-section-title font-title text-2xl text-center tracking-wider uppercase
        after:block after:-mt-1 after:mx-auto
        after:border-b-2 after:border-black
        after:transition-all after:duration-300 ${className}`}
      >
        {children}
      </h2>
    </div>
  );
}
