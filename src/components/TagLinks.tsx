import TagLink from "@/components/TagLink";

type Props = {
  tags: string[];
};

export default function TagLinks({ tags }: Props) {
  return (
    <>
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
