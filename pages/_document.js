import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Smart Contracts Audit GPT-3" key="title"/>
        <meta property="og:description" content="by Ignacio Souto" key="description"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
