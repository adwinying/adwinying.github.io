import ProfileImage from "@/assets/avatar.png";
import Link from "@/components/common/Link";
import Section from "@/components/common/Section";

export default function About() {
  return (
    <Section id="about" title="About Adwin">
      <div className="mx-auto mb-4 w-44">
        <img
          src={ProfileImage.src}
          width={ProfileImage.width}
          height={ProfileImage.height}
          alt="Profile avatar"
        />
      </div>

      <div className="mx-auto max-w-lg text-center">
        <p className="mb-2 italic">Tokyo, Japan</p>
        <p className="text-gray-800">
          Self-taught full-stack web dev. Speaks English, 中文, Bahasa Melayu,
          日本語. Hobbies include cooking and traveling. Occasionally wrecks
          servers through&nbsp;
          <Link href="https://www.reddit.com/r/selfhosted/">self-hosting</Link>
          &nbsp;and&nbsp;
          <Link href="https://www.reddit.com/r/homelab/">homelab-ing</Link>.
        </p>
      </div>
    </Section>
  );
}
