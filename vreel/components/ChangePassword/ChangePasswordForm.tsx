import React, { useState } from "react";
import { PrimaryButton, PrimaryInput, SecretInput } from "../index";
import registerUser from "../../utils/registerUser";

interface FormDataType {
  email: string;
}

const RegisterForm = (): JSX.Element => {
  const [userFormData, setUserFormData] = useState<FormDataType>({
    email: "",
  });
  const [email, setEmail] = useState<string>("");

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      const { email } = userFormData;

      const body = {
        email,
      };

      console.log("form data", body);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex flex-column justify-content-start align-items-center vreel-forgot-password-form"
    >
      <img src="/vreel-logo.png" alt="Vreel Logo" width="181" height="202" />
      <h1>Forgot Password?</h1>
      <form
        onSubmit={submitForm}
        className="vreel-forgot-password-form__wrapper"
      >
        <PrimaryInput
          setValue={setEmail}
          placeHolder="Email"
          value={email}
          type="email"
        />
        <div>
          <PrimaryButton
            type="submit"
            action={() => {
              if (!email) return alert("enter email");
              setUserFormData({
                email,
              });
            }}
            title="Get Reset Link"
          />
          <p>
            Dont have an account? <a href="/register">Register here!</a>
          </p>
          <p>
            Already have an account? <a href="/login">Log in here!</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
