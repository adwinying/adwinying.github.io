import Header from "@/components/Header";
import RssIcon from "@/components/icons/Rss";

export default function BlogHeader() {
  return (
    <Header>
      <a href="/blog" className="font-sans text-3xl font-normal text-gray-900">
        Blog
      </a>

      <a href="/blog/rss.xml" target="_parent">
        <RssIcon className="mt-1 h-5" />
      </a>
    </Header>
  );
}
