import type { ReactNode } from "react";

import SectionTitle from "./SectionTitle";

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
    <section id={id} className={`px-7 py-16 md:py-32 ${className}`}>
      {title && <SectionTitle className="mb-8">{title}</SectionTitle>}

      {children}
    </section>
  );
}
