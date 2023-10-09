import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection(
    "posts",
    ({ data }) => process.env.NODE_ENV === "development" || !data.draft,
  );

  return rss({
    title: "iAdwin",
    description: "A place to gather and sort thoughts.",
    site: import.meta.env.SITE,
    stylesheet: "/rss/styles.xsl",
    items: posts
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((post) => ({
        title: post.data.title,
        description: post.data.excerpt,
        link: `/${post.slug}`,
        pubDate: post.data.date,
      })),
  });
}
