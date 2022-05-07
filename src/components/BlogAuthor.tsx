import Link from "@/components/common/Link";
import ChainIcon from "@/components/icons/Chain";

type Props = {
  className?: string;
};

export default function BlogAuthor({ className = "" }: Props) {
  return (
    <div
      className={`flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-x-5 sm:space-y-0 ${className}`}
    >
      <div className="w-28 sm:w-32">
        <img
          src="/img/avatar.png"
          srcSet="/img/avatar.png, /img/avatar-2x.png 2x"
          alt="Adwin Ying's avatar"
        />
      </div>

      <div className="flex flex-1 flex-col space-y-1">
        <span className="text-2xl font-bold">Adwin Ying</span>

        <p className="text-gray-800">
          Self-taught full-stack web dev based in Tokyo.{" "}
          <br className="hidden sm:block" />
          Occasionally wrecks servers through&nbsp;
          <Link href="https://www.reddit.com/r/selfhosted/">self-hosting</Link>
          &nbsp;and&nbsp;
          <Link href="https://www.reddit.com/r/homelab/">homelab-ing</Link>.
        </p>

        <Link href="/" className="flex space-x-1">
          <ChainIcon className="w-4" />
          <span>https://iAdw.in</span>
        </Link>
      </div>
    </div>
  );
}