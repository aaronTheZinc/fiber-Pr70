import React, { useState, useEffect } from "react";
import { PrimaryButton, PrimaryInput, SecretInput } from "../../index";
import {
  getUserByEmail,
  getUserByToken,
  loginUser,
} from "../../../graphql/query";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import AuthContainer from "@common/AuthContainer/AuthContainer";

const LoginForm = (): JSX.Element => {
  return (
    <AuthContainer>
      <div>Auth container com</div>
    </AuthContainer>
  );
};

export default LoginForm;
