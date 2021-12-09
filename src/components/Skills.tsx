import skills from "@/data/skills";
import Skill from "@/components/Skill";
import Section from "@/components/common/Section";

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div
        className="md:flex md:items-stretch md:space-x-7 space-y-16
          md:space-y-0 mx-auto mt-10 max-w-4xl"
      >
        {skills.map(({ title, icon, contents }) => (
          <Skill key={title} title={title} icon={icon} contents={contents} />
        ))}
      </div>
    </Section>
  );
}
