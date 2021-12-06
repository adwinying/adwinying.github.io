import { ReactNode } from "react";

type Props = {
  href: string;
  ariaLabel?: string;
  children?: ReactNode;
};
export default function Link({ href, ariaLabel, children }: Props) {
  return (
    <a
      className="text-blue-400 hover:text-blue-700"
      href={href}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
