import { cn } from "@/utils/css";

import Footer from "@/components/Footer";
import BlogHeader from "@/features/blog/BlogHeader";
import BlogPostEntries from "@/features/blog/BlogPostEntries";

type Props = {
  tag: string;
  posts: {
    title: string;
    slug: string;
    date: Date;
    tags: string[];
  }[];
};

export default function TagIndex({ tag, posts = [] }: Props) {
  return (
    <>
      <BlogHeader />

      <div
        className={cn(
          "mb-12 mt-4 flex-grow",
          "mx-auto w-full max-w-blog px-5",
        )}
      >
        <h1 className="mb-6 font-sans text-4xl font-bold">
          Posts Tagged: {tag}
        </h1>

        <BlogPostEntries
          posts={posts
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map((post) => ({
              url: `/${post.slug}/`,
              title: post.title,
              date: post.date,
              tags: post.tags,
            }))}
        />
      </div>

      <Footer />
    </>
  );
}
