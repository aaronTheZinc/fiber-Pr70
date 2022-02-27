import React from "react";
import { ApolloProvider} from "@apollo/client";
import { client } from "../graphql";
import LoginForm from "../components/Login/LoginForm";

function LoginPage(): JSX.Element {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default function Login(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <LoginPage />
    </ApolloProvider>
  );
}
