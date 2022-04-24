import BlogPostEntries from "@/components/BlogPostEntries";

type Props = {
  className?: string;
  posts?: {
    frontmatter: {
      title: string;
      slug: string;
      excerpt?: string;
      date: string;
      tags?: string[];
    };
  }[];
};

export default function BlogIndex({ className, posts = [] }: Props) {
  return (
    <div className={`max-w-blog mx-auto px-5 ${className}`}>
      <BlogPostEntries
        posts={posts
          .sort(
            (a, b) =>
              new Date(b.frontmatter.date).getTime() -
              new Date(a.frontmatter.date).getTime()
          )
          .map((post) => ({
            url: `/${post.frontmatter.slug}`,
            title: post.frontmatter.title,
            date: post.frontmatter.date,
            tags: post.frontmatter.tags,
          }))}
      />
    </div>
  );
}
