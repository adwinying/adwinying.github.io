import { ReactNode } from "react";
import BlogAuthor from "@/components/BlogAuthor";
import TagLinks from "@/components/TagLinks";
import Link from "@/components/common/Link";

type Props = {
  title: string;
  date: string;
  thumbnail?: string;
  tags?: string[];
  children: ReactNode;
};

export default function BlogPost({
  thumbnail,
  title,
  date,
  tags = [],
  children,
}: Props) {
  return (
    <article className="mx-auto p-5 pb-9 max-w-blog">
      <div className="font-sans mb-8">
        {thumbnail && (
          <img
            className="mb-5 w-full aspect-video object-cover"
            src={thumbnail}
            alt={title}
          />
        )}

        <h1 className="mb-1 font-bold text-5xl text-gray-900">{title}</h1>

        <span className="inline-block text-sm text-gray-600">
          {Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(new Date(date))}
          {" | "}
          <TagLinks tags={tags} />
        </span>
      </div>

      <div
        className="max-w-none font-serif prose prose-lg
          prose-headings:font-sans
          prose-figcaption:text-center prose-figcaption:text-sm
          prose-figcaption:font-sans prose-figcaption:-mt-6
          prose-img:mx-auto"
      >
        {children}

        <hr />
      </div>

      <BlogAuthor className="font-sans text-base mt-14 mb-9" />

      <Link
        href="/blog"
        className="font-sans !text-gray-900 underline underline-offset-2"
      >
        &larr; Back to all posts
      </Link>
    </article>
  );
}
