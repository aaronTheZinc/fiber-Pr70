import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const envType = process.env.NODE_ENV;

const BASE_URL =
  envType == "development"
    ? "http://localhost:8080"
    : "https://dev1.vreel.page";

// const BASE_URL = "http://localhost:8080"

console.log("[base url] testingggg thissss ->", BASE_URL);
console.log("env type ->", process.env);
export const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,

  cache: new InMemoryCache(),
});

export { loginUser } from "./query";
export { registerUser } from "./mutations";
