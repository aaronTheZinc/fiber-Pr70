import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const envType = process.env.NEXT_PUBLIC_ENV_TYPE

const BASE_URL = envType == "dev" ? "http://localhost:8080" : "https://dev1.vreel.page/graphql"
console.log("[base url] ->", BASE_URL)
console.log("env type ->", envType)
export const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});

export { loginUser } from "./query";
export { registerUser } from "./mutations";
