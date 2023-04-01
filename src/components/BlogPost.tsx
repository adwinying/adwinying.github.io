import type { ReactNode } from "react";

import BlogAuthor from "@/components/BlogAuthor";
import TagLinks from "@/components/TagLinks";
import Link from "@/components/common/Link";

type Props = {
  title: string;
  date: Date;
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
    <article className="mx-auto w-full max-w-blog p-5 pb-9">
      <div className="mb-8 font-sans">
        {thumbnail && (
          <img
            className="mb-5 aspect-video w-full object-cover"
            src={thumbnail}
            alt={title}
          />
        )}

        <h1 className="mb-1 text-5xl font-bold text-gray-900">{title}</h1>

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

      <div
        className="prose prose-lg max-w-none font-serif
          prose-headings:font-sans prose-figcaption:text-center
          prose-figcaption:font-sans prose-figcaption:text-sm"
      >
        {children}

        <hr />
      </div>

      <BlogAuthor className="mb-9 mt-14 font-sans text-base" />

      <Link
        href="/blog"
        className="font-sans !text-gray-900 underline underline-offset-2"
      >
        &larr; Back to all posts
      </Link>
    </article>
  );
}
