import "@sass/main.scss";
// import '../styles/main.scss';
import Head from "next/head";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { ApolloProvider } from "@apollo/client";
import { client } from "../components/graphql";
import GeneralMenu from "../components/Shared/Menu/GeneralMenu/GeneralMenu";
import AccountMenu from "../components/Shared/Menu/AccountMenu/AccountMenu";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>VReel</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CookiesProvider>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <GeneralMenu />
            <AccountMenu />
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                duration: 3000,
              }}
            />
            <Component {...pageProps} />
          </Provider>
        </ApolloProvider>
      </CookiesProvider>
    </>
  );
}

export default MyApp;
