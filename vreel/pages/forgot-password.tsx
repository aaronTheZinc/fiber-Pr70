import React, { useEffect, useState } from "react";
import { PrimaryButton, PrimaryInput, SecretInput } from "../components";
import { ApolloProvider, useLazyQuery } from "@apollo/client";
import { client } from "../graphql";
import { LoginQuery } from "../graphql/query";
import ChangePasswordForm from "../components/ChangePassword/ChangePasswordForm";

function ChangePasswordPage(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, { error, data }] = useLazyQuery(LoginQuery);
  function handleLogin() {
    login({
      variables: { email, password },
    });
  }
  useEffect(() => {
    if (error) {
      console.log(error.message);
    } else if (data) {
      console.log("data -> ", data);
    }
  }, [error, data]);
  return (
    <div>
      <ChangePasswordForm />
    </div>
  );
}

export default function Login(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <ChangePasswordPage />
    </ApolloProvider>
  );
}
