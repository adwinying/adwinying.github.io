import projects from "@/data/projects";
import ButtonIcon from "@/components/common/ButtonIcon";
import Section from "@/components/common/Section";
import Project from "@/components/Project";

export default function Projects() {
  return (
    <Section id="projects" title="Featured Projects">
      <div className="space-y-12 md:space-y-20 mt-10 mb-16 mx-auto max-w-4xl">
        {projects.map(({ title, tags, description, img, url }) => (
          <Project
            key={title}
            title={title}
            tags={tags}
            description={description}
            img={img}
            url={url}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <ButtonIcon href="https://github.com/adwinying" icon="github">
          More Projects @ GitHub
        </ButtonIcon>
      </div>
    </Section>
  );
}
