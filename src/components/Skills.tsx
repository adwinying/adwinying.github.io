import Skill from "@/components/Skill";
import Section from "@/components/common/Section";
import skills from "@/data/skills";

export default function Skills() {
  return (
    <Section id="skills" title="Skills" className="bg-white">
      <div
        className="mx-auto mt-10 max-w-4xl space-y-16 md:flex md:items-stretch
          md:space-x-7 md:space-y-0"
      >
        {skills.map(({ title, icon, contents }) => (
          <Skill key={title} title={title} icon={icon} contents={contents} />
        ))}
      </div>
    </Section>
  );
}
