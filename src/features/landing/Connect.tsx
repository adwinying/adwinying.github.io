import ButtonIcon from "@/components/ButtonIcon";
import Section from "@/features/landing/Section";
import { connect } from "@/features/landing/data";

export default function Connect() {
  return (
    <Section id="connect" title="Connect" className="bg-white">
      <div className="mx-auto max-w-4xl text-center text-gray-800">
        Connect with Adwin through social media or request a resumé through
        email:
      </div>

      <div
        className="mx-auto my-10 grid max-w-4xl grid-cols-1 gap-x-7 gap-y-5
          md:my-20 md:grid-cols-3"
      >
        {connect.map((item) => (
          <ButtonIcon
            key={item.url}
            href={item.url}
            icon={item.icon}
            className="block w-full"
          >
            {item.title}
          </ButtonIcon>
        ))}
      </div>
    </Section>
  );
}
