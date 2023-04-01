import TagLinks from "@/components/TagLinks";

type Props = {
  url: string;
  title: string;
  date: Date;
  tags?: string[];
};

export default function BlogPostEntry({ url, title, date, tags = [] }: Props) {
  return (
    <div className="flex flex-col space-y-0.5">
      <a href={url}>
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      </a>

      <span className="inline-block text-sm text-gray-600">
        {Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(date)}
        {" | "}
        <TagLinks tags={tags} />
      </span>
    </div>
  );
}
