import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
  render() {
    return (
      <Html>
        <Head>
        <meta property="og:keywords" name="keywords" content="" />
          <meta property="og:author" name="author" content="" />
          <link rel="icon" href="/favicon.png" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}

          {/* LinkedIn Insight Tag*/}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
