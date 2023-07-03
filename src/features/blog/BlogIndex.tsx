import Footer from "@/components/Footer";
import BlogHeader from "@/features/blog/BlogHeader";
import BlogPostEntries from "@/features/blog/BlogPostEntries";

type Props = {
  posts?: {
    slug: string;
    data: {
      title: string;
      excerpt: string;
      date: Date;
      tags?: string[];
    };
  }[];
};

export default function BlogIndex({ posts = [] }: Props) {
  return (
    <>
      <BlogHeader />

      <BlogPostEntries
        className="mx-auto mb-12 mt-4 w-full max-w-blog flex-grow px-5"
        posts={posts
          .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
          .map((post) => ({
            url: `/${post.slug}/`,
            title: post.data.title,
            date: post.data.date,
            tags: post.data.tags ?? [],
          }))}
      />

      <Footer />
    </>
  );
}
