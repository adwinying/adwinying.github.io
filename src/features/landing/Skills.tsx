import Icons from "@/components/icons/Icons";
import Section from "@/features/landing/Section";
import { skills } from "@/features/landing/data";

export default function Skills() {
  return (
    <Section id="skills" title="Skills" className="bg-white">
      <div
        className="mx-auto mt-10 max-w-4xl space-y-16 md:flex md:items-stretch
          md:space-x-7 md:space-y-0"
      >
        {skills.map(({ title, icon, contents }) => {
          const SkillIcon = Icons[icon];

          return (
            <div
              key={title}
              className="relative flex-1 rounded-md border-2 border-black px-6 py-6"
            >
              <div
                className="absolute left-1/2 top-0 flex h-10 w-10 -translate-x-1/2
          -translate-y-1/2 transform items-center justify-center rounded-full
          border-2 border-black bg-white"
              >
                <SkillIcon className="h-5" />
              </div>

              <h3
                className="mb-4 mt-1 text-center font-title text-xl uppercase
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
        })}
      </div>
    </Section>
  );
}
