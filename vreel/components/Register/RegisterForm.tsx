import React, { useState } from "react";
import { PrimaryButton, PrimaryInput, SecretInput } from "../index";
import registerUser from "../../utils/registerUser";

interface FormDataType {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string
}

const RegisterForm = (): JSX.Element => {
  const [userFormData, setUserFormData] = useState<FormDataType>({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      const { email, username, password, passwordConfirm } = userFormData;

      const body = {
        email,
        username,
        password,
        passwordConfirm,
      };

      console.log("form data", body);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{ height: "95vh" }}
      className="d-flex flex-column justify-content-start align-items-center vreel-register-form"
    >
      <img src="/vreel-logo.png" alt="Vreel Logo" width="181" height="202" />
      <h1>Create Your FREE VReel Account</h1>
      <form onSubmit={submitForm} className="vreel-register-form__wrapper">
        <PrimaryInput
          setValue={setEmail}
          placeHolder="Email"
          value={email}
          type="email"
        />
        <PrimaryInput
          setValue={setUsername}
          placeHolder="Username"
          value={username}
          type="text"
        />
        <PrimaryInput
          setValue={setPassword}
          placeHolder="Password"
          value={password}
          type="password"
        />
        <PrimaryInput
          setValue={setPasswordConfirm}
          placeHolder="Confirm Password"
          value={passwordConfirm}
          type="password"
        />
        <SecretInput
          type="password"
          setValue={setPassword}
          placeHolder="Password"
          value={password}
        />

        <div>
          <p>
            By clicking register you agree to VReel’s{" "}
            <a href="#">Privacy policy</a> and <a href="#">Terms of service</a>
          </p>
          <PrimaryButton
            type="submit"
            action={() => {
              if (password !== passwordConfirm) return alert('Passwords must match');
              setUserFormData({
                email,
                username,
                password,
                passwordConfirm,
              });
            }}
            title="Register"
          />
          <p>
            Already have an account? <a href="#">Log in here!</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
