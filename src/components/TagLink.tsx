import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  tag: string;
};

export default function TagLink({ className = "", tag }: Props) {
  return (
    <a
      href={`/tag/${tag}/`}
      className={twMerge(
        "text-sm text-gray-600 underline-offset-1 hover:underline",
        className,
      )}
    >
      {tag}
    </a>
  );
}
