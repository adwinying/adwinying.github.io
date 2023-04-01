import BlogPostEntries from "@/components/BlogPostEntries";

type Props = {
  className?: string;
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

export default function BlogIndex({ className = "", posts = [] }: Props) {
  return (
    <div className={`mx-auto max-w-blog px-5 ${className}`}>
      <BlogPostEntries
        posts={posts
          .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
          .map((post) => ({
            url: `/${post.slug}/`,
            title: post.data.title,
            date: post.data.date,
            tags: post.data.tags,
          }))}
      />
    </div>
  );
}