import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/index.css";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { ApolloProvider } from "@apollo/client";
import { client } from "../components/graphql";
import Navbar from "../components/MenuBar/Navbar";
import AccMenu from "../components/MenuBar/AccMenu";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>VReel</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Navbar />
          <AccMenu />
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
