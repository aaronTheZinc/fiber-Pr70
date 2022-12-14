import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "../styles/main.scss";
import type { AppProps /*, AppContext */ } from "next/app";
import MainLayout from "../components/MainLayout/MainLayout";
import Head from "next/head";
import { CookiesProvider } from "react-cookie";
import { useEffect, useState } from "react";
import MobileDetect from "mobile-detect";
import { AuthContext, AuthProvider } from "../contexts/UserContext";

import { User } from "../types";

function App({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    let md = new MobileDetect(window.navigator.userAgent);

    if (md.mobile() === null) return;

    setIsMobile(true);
  }, [isMobile]);

  useEffect(() => {
    const slideIcons = document.querySelectorAll(".vreel-slide__icon");

    // window.addEventListener("scroll", () => {
    //   console.log("scroll", window.scrollY);
    //   slideIcons.forEach((icon) => {
    //     if (window.scrollY >= 100) {
    //       icon.style.opacity = 0;
    //     }
    //   });
    // });
  }, []);

  return (
    <CookiesProvider>
      <MainLayout isMobile={isMobile}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Anton&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Pragati+Narrow:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
            integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </Head>
        <Component isMobile={isMobile} {...pageProps} />
      </MainLayout>
    </CookiesProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default App;
