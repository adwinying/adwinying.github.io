import { ReactNode } from "react";

type Props = {
  href: string;
  ariaLabel?: string;
  className?: string;
  children?: ReactNode;
};
export default function Link({
  href,
  ariaLabel,
  className = "",
  children,
}: Props) {
  return (
    <a
      className={`text-sky-500 hover:text-sky-700 ${className}`}
      href={href}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
