import BlogPostEntries from "@/components/BlogPostEntries";

type Props = {
  className?: string;
  tag: string;
  posts: {
    title: string;
    slug: string;
    date: Date;
    tags: string[];
  }[];
};

export default function TagIndex({ className = "", tag, posts = [] }: Props) {
  return (
    <div className={`mx-auto w-full max-w-blog px-5 ${className}`}>
      <h1 className="mb-6 font-sans text-4xl font-bold">Posts Tagged: {tag}</h1>

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
  );
}
