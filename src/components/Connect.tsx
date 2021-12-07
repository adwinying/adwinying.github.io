import Section from "@/components/common/Section";
import connect from "@/data/connect";
import ButtonIcon from "./common/ButtonIcon";

export default function Connect() {
  return (
    <Section id="connect" title="Connect">
      <div className="max-w-4xl mx-auto text-gray-800 text-center">
        Connect with Adwin through social media or request a resumé through
        email:
      </div>

      <div
        className="max-w-4xl mx-auto my-10 md:my-20
          grid grid-cols-1 md:grid-cols-3 gap-x-7 gap-y-5"
      >
        {connect.map((item) => (
          <ButtonIcon href={item.url} icon={item.icon} className="block w-full">
            {item.title}
          </ButtonIcon>
        ))}
      </div>
    </Section>
  );
}
