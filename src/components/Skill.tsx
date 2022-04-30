import { Skill as SkillType } from "@/data/skills";
import Icons from "@/components/icons/Icons";

type Props = SkillType & {};
export default function Skill({ title, icon, contents }: Props) {
  const SkillIcon = Icons[icon];

  return (
    <div className="relative flex-1 rounded-md border-2 border-black px-6 py-6">
      <div
        className="absolute top-0 left-1/2 flex h-10 w-10 -translate-x-1/2
          -translate-y-1/2 transform items-center justify-center rounded-full
          border-2 border-black bg-white"
      >
        <SkillIcon className="h-5" />
      </div>

      <h3
        className="mt-1 mb-4 text-center font-title text-xl uppercase
          tracking-wider"
      >
        {title}
      </h3>

      <ul className="space-y-3 text-xl font-light">
        {contents.map((content) => (
          <li key={content}>{content}</li>
        ))}
      </ul>
    </div>
  );
}
