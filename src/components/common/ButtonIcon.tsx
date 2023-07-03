import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import Icons from "@/components/icons/Icons";

type Props = {
  href: string;
  icon: string;
  className?: string;
  children?: ReactNode;
};
export default function ButtonIcon({
  href,
  icon,
  className = "",
  children,
}: Props) {
  const Icon = Icons[icon];

  return (
    <a
      className={twMerge(
        "rounded-lg border-2 px-4 py-2 text-lg font-light sm:px-5 sm:text-2xl",
        "border-gray-800 bg-white hover:bg-gray-800 hover:text-gray-50",
        "transition-all duration-200",
        className,
      )}
      href={href}
    >
      <span className="flex items-center space-x-2 sm:space-x-3">
        <Icon className="w-6 hover:text-gray-50" />
        <span>{children}</span>
      </span>
    </a>
  );
}
