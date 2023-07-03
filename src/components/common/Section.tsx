import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import SectionTitle from "@/components/common/SectionTitle";

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
    <section id={id} className={twMerge("px-7 py-16 md:py-32", className)}>
      {title && <SectionTitle className="mb-8">{title}</SectionTitle>}

      {children}
    </section>
  );
}
