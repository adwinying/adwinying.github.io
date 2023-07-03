import { twMerge } from "tailwind-merge";

import TagLinks from "@/features/blog/TagLinks";

type Props = {
  className?: string;
  posts: {
    url: string;
    title: string;
    date: Date;
    tags?: string[];
  }[];
};

export default function BlogPostEntries({ className = "", posts }: Props) {
  return (
    <div className={twMerge("flex flex-col space-y-8", className)}>
      {posts.map((post) => {
        const { url, title, date } = post;
        const tags = post.tags ?? [];

        return (
          <div key={post.url} className="flex flex-col space-y-0.5">
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
      })}
    </div>
  );
}
