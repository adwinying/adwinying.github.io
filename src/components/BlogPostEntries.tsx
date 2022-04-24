import BlogPostEntry from "@/components/BlogPostEntry";

type Props = {
  className?: string;
  posts: {
    url: string;
    title: string;
    date: string;
    tags?: string[];
  }[];
};

export default function BlogPostEntries({ className, posts }: Props) {
  return (
    <div className={`flex flex-col space-y-8 ${className}`}>
      {posts.map((post) => (
        <BlogPostEntry
          key={post.url}
          url={post.url}
          title={post.title}
          date={post.date}
          tags={post.tags}
        />
      ))}
    </div>
  );
}
