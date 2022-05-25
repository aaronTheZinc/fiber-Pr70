import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  DefaultOptions,
} from "@apollo/client";

const envType = process.env.NEXT_PUBLIC_ENVIRONMENT;

let BASE_URL = "";
const current_env = process.env.ENVIRONMENT;
if (current_env === "dev") {
  BASE_URL = "http://localhost:3000";
} else if (current_env === "staging") {
  BASE_URL = "https://staging.vreel.page";
} else {
  BASE_URL = "https://dev1.vreel.page";
}
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
