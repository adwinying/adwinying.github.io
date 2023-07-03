import TagIcon from "@/components/icons/Tag";

type Props = {
  tags: string[];
};

export default function TagLinks({ tags }: Props) {
  return (
    <>
      <TagIcon className="mr-1 inline-block h-2.5" />

      {tags
        .map((tag) => (
          <a
            key={tag}
            href={`/tag/${tag}/`}
            className="text-sm text-gray-600 underline-offset-1 hover:underline"
          >
            {tag}
          </a>
        ))
        .reduce((acc, tag) => {
          if (acc === null) return tag;

          return (
            <>
              {acc}, {tag}
            </>
          );
        })}
    </>
  );
}
