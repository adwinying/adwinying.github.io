import rss from "@astrojs/rss";

const postImportResult = import.meta.glob("/src/posts/*.md", { eager: true });
const posts = Object.values(postImportResult);
const filteredPosts = posts.filter(
  ({ frontmatter }) =>
    process.env.NODE_ENV === "development" || !frontmatter.draft
);

export const get = () =>
  rss({
    title: "iAdwin",
    description: "A place to gather and sort thoughts.",
    site: import.meta.env.SITE,
    stylesheet: "/rss/styles.xsl",
    items: filteredPosts
      .sort(
        (a, b) =>
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime()
      )
      .map((post) => ({
        title: post.frontmatter.title,
        description: post.frontmatter.excerpt,
        link: `/${post.frontmatter.slug}`,
        pubDate: post.frontmatter.date,
      })),
  });

export default null;
