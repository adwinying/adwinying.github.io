export default function CommonHead() {
  return (
    <>
      <meta charSet="UTF-8" />

      <meta name="theme-color" content="#ffffff" />
      <link rel="icon" href="/favicon.svg" />
      <link rel="mask-icon" href="/mask-icon.svg" color="#000000" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,500&family=Open+Sans:ital,wght@0,300;0,400;0,700;1,400;1,700&display=swap"
      />

      {import.meta.env.PROD && (
        <script
          async
          defer
          data-website-id="5defccd5-b1c2-4556-8635-cfd36e168899"
          src="https://u.iadw.in/bundle.js"
        />
      )}
    </>
  );
}
