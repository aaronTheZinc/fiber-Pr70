import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql";
import registerUser from "../utils/registerUser";
import RegisterForm from "../components/Auth/Register/RegisterForm";

function RegisterPage(): JSX.Element {

  useEffect(() => {}, []);

  return (
    <div className="container">
      <RegisterForm />
    </div>
  );
}

export default function Register(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <RegisterPage />
    </ApolloProvider>
  );
}
