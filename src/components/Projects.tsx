import Project from "@/components/Project";
import ButtonIcon from "@/components/common/ButtonIcon";
import Section from "@/components/common/Section";
import projects from "@/data/projects";

export default function Projects() {
  return (
    <Section id="projects" title="Featured Projects">
      <div className="mx-auto mb-16 mt-10 max-w-4xl space-y-12 md:space-y-20">
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
