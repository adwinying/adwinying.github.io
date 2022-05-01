import TagLink from "@/components/TagLink";
import TagIcon from "@/components/icons/Tag";

type Props = {
  tags: string[];
};

export default function TagLinks({ tags }: Props) {
  return (
    <>
      <TagIcon className="mr-1 inline-block h-2.5" />
      {tags
        .map((tag) => <TagLink key={tag} tag={tag} />)
        .reduce((acc, tag) =>
          acc === null ? (
            tag
          ) : (
            <>
              {acc}, {tag}
            </>
          )
        )}
    </>
  );
}
