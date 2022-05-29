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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>VReel</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <GeneralMenu />
          <AccountMenu />
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
