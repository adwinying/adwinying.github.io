import BlogPostEntries from "@/components/BlogPostEntries";

type Props = {
  className?: string;
  tag: string;
  posts: {
    title: string;
    slug: string;
    date: string;
    tags: string[];
  }[];
};

export default function TagIndex({ className, tag, posts = [] }: Props) {
  return (
    <div className={`max-w-blog mx-auto px-5 ${className}`}>
      <h1 className="mb-6 font-sans font-bold text-4xl">Posts Tagged: {tag}</h1>

      <BlogPostEntries
        posts={posts
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((post) => ({
            url: `/${post.slug}`,
            title: post.title,
            date: post.date,
            tags: post.tags,
          }))}
      />
    </div>
  );
}
