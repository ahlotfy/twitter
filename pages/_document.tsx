import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>twitter</title>
        <link
          rel="icon"
          href="/favicon.ico?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="https://www.google.com/recaptcha/api.js" defer></script>
        <script
          src="https://www.google.com/recaptcha/api.js?render=reCAPTCHA_site_key"
          defer
        ></script>
      </body>
    </Html>
  );
}
