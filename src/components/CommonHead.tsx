type Props = {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
};
export default function commonHead(props: Props) {
  const title = props.title ? `${props.title} - iAdwin` : "iAdwin";
  const description = props.description ?? "The landing page of Adwin Ying.";

  return (
    <>
      <meta charSet="UTF-8" />
      <title>{title}</title>

      <meta name="title" content="iAdwin" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="author" content="Adwin Ying" />
      <meta content="http://iAdw.in" property="og:url" />

      <meta name="theme-color" content="#ffffff" />
      <link rel="icon" href="/favicon.svg" />
      <link rel="mask-icon" href="/mask-icon.svg" color="#000000" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      <link rel="canonical" href="https://iAdw.in" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,500&family=Open+Sans:ital,wght@0,300;0,400;1,300;1,400&display=swap"
      />
    </>
  );
}
