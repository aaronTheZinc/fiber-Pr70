import React, { useEffect, useState } from "react";
import { PrimaryButton, PrimaryInput, SecretInput } from "../components";
import { ApolloProvider, useLazyQuery } from "@apollo/client";
import { client } from "../graphql";
import { LoginQuery } from "../graphql/query";
import LoginForm from "../components/Login/LoginForm";

function LoginPage(): JSX.Element {

  return <LoginForm />
}

export default function Login(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <LoginPage />
    </ApolloProvider>
  );
}
