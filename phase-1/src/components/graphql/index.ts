import { ApolloClient, InMemoryCache, DefaultOptions } from "@apollo/client";

const BASE_URL = "http://192.168.0.106:8080"
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  defaultOptions: defaultOptions,
  cache: new InMemoryCache()
})