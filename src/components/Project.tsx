import { Project as ProjectType } from "@/data/projects";
import Link from "@/components/common/Link";
import LinkIcon from "@/components/icons/Link";

type Props = ProjectType & {};
export default function Project({ title, tags, description, img, url }: Props) {
  return (
    <div className="md:flex md:space-x-7 md:items-center">
      <div className="w-full md:w-1/3">
        <img
          className="w-full border-[3px] border-black rounded-md"
          src={`img/${img}`}
          alt={title}
        />
      </div>

      <div className="w-full md:w-2/3 py-5 md:py-0 text-center md:text-left">
        <h3
          className="flex justify-center md:justify-start items-center
            space-x-1 mb-1.5 text-2xl font-light"
        >
          <span>{title}</span>
          <Link href={url} ariaLabel="Preview">
            <LinkIcon className="w-6 p-1" />
          </Link>
        </h3>

        <div
          className="flex flex-wrap gap-x-1.5 gap-y-1 justify-center
            md:justify-start mb-3"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full"
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
