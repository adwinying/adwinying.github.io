import { Skill as SkillType } from "@/data/skills";
import Icons from "@/components/icons/Icons";

type Props = SkillType & {};
export default function Skill({ title, icon, contents }: Props) {
  const SkillIcon = Icons[icon];

  return (
    <div className="flex-1 relative px-6 py-6 rounded-md border-2 border-black">
      <div
        className="flex justify-center items-center absolute top-0 left-1/2
          w-10 h-10 bg-white rounded-full border-2 border-black transform
          -translate-x-1/2 -translate-y-1/2"
      >
        <SkillIcon className="h-5" />
      </div>

      <h3
        className="mt-1 mb-4 font-title text-xl text-center tracking-wider
          uppercase"
      >
        {title}
      </h3>

      <ul className="space-y-3 text-xl font-light">
        {contents.map((content) => (
          <li>{content}</li>
        ))}
      </ul>
    </div>
  );
}
