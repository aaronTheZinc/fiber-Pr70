import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  DefaultOptions,
} from "@apollo/client";

const envType = process.env.NEXT_PUBLIC_ENVIRONMENT;

const BASE_URL =
  envType == "dev" ? "http://localhost:8080" : "https://dev1.vreel.page";

// const BASE_URL = "http://localhost:8080"

console.log("[base url] testingggg thissss ->", BASE_URL);
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
  cache: new InMemoryCache(),
});

export { loginUser } from "./query";
export { registerUser } from "./mutations";
