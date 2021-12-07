import { ReactNode } from "react";
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
      className={`px-4 sm:px-5 py-2 bg-white text-lg sm:text-2xl font-light
        hover:bg-gray-800 hover:text-gray-50
        transition-all duration-200
        border-2 border-gray-800 rounded-lg ${className}`}
      href={href}
    >
      <span className="flex items-center space-x-2 sm:space-x-3">
        <Icon className="w-6 hover:text-gray-50" />
        <span>{children}</span>
      </span>
    </a>
  );
}
