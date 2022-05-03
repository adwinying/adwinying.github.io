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
      className={`text-blue-400 hover:text-blue-700 ${className}`}
      href={href}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
