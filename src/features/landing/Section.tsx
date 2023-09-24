import type { ReactNode } from "react";
import { cn } from "@/utils/css";

type Props = {
  id: string;
  title?: ReactNode;
  className?: string;
  children?: ReactNode;
};
export default function Section({
  id,
  title,
  className = "",
  children,
}: Props) {
  return (
    <section id={id} className={cn("px-7 py-16 md:py-32", className)}>
      {title && (
        <div className="mb-8 flex justify-center">
          <h2
            className={cn(
              "js-section-title",
              "text-center font-title text-2xl uppercase tracking-wider",
              "after:mx-auto after:-mt-1 after:block after:border-b-2",
              "after:border-black after:transition-all after:duration-300 ",
              className,
            )}
          >
            {title}
          </h2>
        </div>
      )}

      {children}
    </section>
  );
}
