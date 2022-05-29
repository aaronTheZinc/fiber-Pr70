import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql";
import LoginForm from "../components/Auth/Login/LoginForm";

export default function LoginPage(): JSX.Element {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
