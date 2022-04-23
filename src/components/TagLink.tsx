type Props = {
  className?: string;
  tag: string;
};

export default function TagLink({ className, tag }: Props) {
  return (
    <a
      href={`/tag/${tag}`}
      className={`text-gray-600 text-sm hover:underline underline-offset-1 ${className}`}
    >
      {tag}
    </a>
  );
}
