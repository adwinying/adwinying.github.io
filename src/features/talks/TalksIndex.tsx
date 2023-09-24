import { cn } from "@/utils/css";

import Footer from "@/components/Footer";
import TalksHeader from "@/features/talks/TalksHeader";

type Props = {
  className?: string;
  talks: {
    id: string;
    data: {
      title: string;
      event: string;
      event_url?: string;
      info: string;
    };
  }[];
};

export default function TalksIndex({ className = "", talks }: Props) {
  return (
    <>
      <TalksHeader />

      <div
        className={cn(
          "mx-auto mb-12 mt-4 w-full max-w-blog px-5",
          "flex flex-grow flex-col space-y-8",
          className,
        )}
      >
        {talks.map((talk) => {
          const date = new Date(talk.id);
          const url = `/talks/${talk.id}`;
          const { title, event, event_url: eventUrl, info } = talk.data;

          return (
            <div key={talk.id} className="flex flex-col space-y-0.5">
              <span className="inline-block text-sm text-gray-600">
                {Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(date)}
                {" | "}
                {eventUrl ? (
                  <a
                    href={eventUrl}
                    className="uderline-offset-1 text-gray-600 hover:underline"
                  >
                    {event}
                  </a>
                ) : (
                  event
                )}
              </span>

              <a href={url}>
                <h2 className="text-3xl font-bold">{title}</h2>
              </a>

              <span className="text-neutral-600">{info}</span>
            </div>
          );
        })}
      </div>

      <Footer />
    </>
  );
}
