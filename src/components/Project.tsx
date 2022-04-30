import { Project as ProjectType } from "@/data/projects";
import Link from "@/components/common/Link";
import LinkIcon from "@/components/icons/Link";

type Props = ProjectType & {};
export default function Project({ title, tags, description, img, url }: Props) {
  return (
    <div className="md:flex md:items-center md:space-x-7">
      <div className="w-full md:w-1/3">
        <img
          className="w-full rounded-md border-[3px] border-black"
          src={`img/${img}`}
          alt={title}
        />
      </div>

      <div className="w-full py-5 text-center md:w-2/3 md:py-0 md:text-left">
        <h3
          className="mb-1.5 flex items-center justify-center
            space-x-1 text-2xl font-light md:justify-start"
        >
          <span>{title}</span>
          <Link href={url} ariaLabel="Preview">
            <LinkIcon className="w-6 p-1" />
          </Link>
        </h3>

        <div
          className="mb-3 flex flex-wrap justify-center gap-x-1.5
            gap-y-1 md:justify-start"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-800 px-3 py-1 text-sm text-white"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-800">{description}</p>
      </div>
    </div>
  );
}
