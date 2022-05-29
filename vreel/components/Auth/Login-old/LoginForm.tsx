import React, { useState, useEffect } from "react";
import { PrimaryButton, PrimaryInput, SecretInput } from "../../index";
import {
  getUserByEmail,
  getUserByToken,
  loginUser,
} from "../../../graphql/query";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

interface FormDataType {
  email: string;
  password: string;
}

const LoginForm = (): JSX.Element => {
  const router = useRouter();

  const [userFormData, setUserFormData] = useState<FormDataType>({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [cookies, setCookie] = useCookies(["userAuthToken"]);

  // const [login, { loading, error, data }] = useQuery(LoginQuery);

  const submitForm = async (e) => {
    try {
      e.preventDefault();

      const { email, password } = userFormData;

      const { token, error } = await loginUser(email, password);

      if (error) return alert(error);

      const { username } = await getUserByToken(token);

      setCookie("userAuthToken", token);

      console.log("data", cookies.userAuthToken);
      router.push(`/${username}`);
    } catch (err) {
      console.error("ERROR WITH LOGIN:", err);
    }
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex flex-column justify-content-center align-items-center vreel-login-form "
    >
      <img
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/")}
        src="/vreel-logo.png"
        alt="Vreel Logo"
        width="181"
        height="202"
      />
      <h1>Log In to Your VReel Account</h1>
      <form onSubmit={submitForm} className="vreel-login-form__wrapper">
        <PrimaryInput
          setValue={setEmail}
          placeHolder="Email"
          value={email}
          type="email"
        />
        <PrimaryInput
          setValue={setPassword}
          placeHolder="Password"
          value={password}
          type="password"
        />
        <SecretInput
          type="password"
          setValue={setPassword}
          placeHolder="Password"
          value={password}
        />

        <div>
          <PrimaryButton
            type="submit"
            action={() => {
              if (!password) return alert("Password is Required");
              setUserFormData({
                email,
                password,
              });
            }}
            title="Log In"
          />
          <p>
            Dont have an account? <a href="/register">Register here!</a>
          </p>
          <p>
            <a href="/forgot-password">Forgot Password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
