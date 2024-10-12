import { Html, Head, Main, NextScript } from 'next/document';
import { supabaseUrl } from '@/frontend/utils/constants';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Fitness Tracker for Social Sharing" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fitness Tracker</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.min.css"
          rel="stylesheet"
        />
        <script
          async
          defer
          data-website-id={process.env.NEXT_PUBLIC_HOTJAR_ID}
          src="https://static.hotjar.com/c/hotjar-322569.js"
        ></script>
        <script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          async
          defer
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}