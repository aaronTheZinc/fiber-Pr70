import React, { useState } from "react";
import { PrimaryButton, PrimaryInput, SecretInput } from "../index";
import registerUser from "../../utils/registerUser";

const LoginForm = (): JSX.Element => {
  const [userFormData, setUserFormData] = useState<object>({
    email: "",
    password: ""
  });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = userFormData;

      const body = {
        email,
        password
      };

      console.log("form data", body);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex flex-column justify-content-start align-items-center vreel-login-form"
    >
      <img src="/vreel-logo.png" alt="Vreel Logo" width="181" height="202" />
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
              if (!password) return alert('Passwords must match');
              setUserFormData({
                email,
                password
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
