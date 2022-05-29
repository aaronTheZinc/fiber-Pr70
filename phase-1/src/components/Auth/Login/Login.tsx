import React, { useState } from "react";
import Link from "next/link";
import BtnForm from "../../common/BtnForn/BtnForm";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { FormikContainer } from "../../formik/FormikContainer";
import FormikControl from "../../formik/FormikControl";
import AuthContainer from "../../common/AuthContainer/AuthContainer";
import { useLazyQuery } from "@apollo/client";
import { LoginQuery } from "../../graphql/query";
import { useCookies } from "react-cookie";
import Styles from "./Login.module.scss";

const Login = () => {
  /*  var today = new Date();
  today.setMinutes(today.getMinutes() + 1); */

  const [userError, setUserError] = useState(null);
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  console.log("login cookies", cookies);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Must be a valid email").required("Required"),
    password: Yup.string().required("No password provided."),
    // .min(8, "Password is too short - should be 8 chars minimum."),
    // .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
  const router = useRouter();

  const [loginUser, { loading: loading2, error: error2, data: data2 }] =
    useLazyQuery(LoginQuery);
  console.log(data2);
  console.log(error2);
  return (
    <AuthContainer>
      <div className={Styles.vreelLoginForm}>
        <div>
          <h4>VREEL Login</h4>
          <FormikContainer
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(formik) => {
              return (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setUserError(null);
                    const { email, password } = formik.values;
                    // formik.handleSubmit();
                    try {
                      const user = await loginUser({
                        variables: {
                          email,
                          password,
                        },
                      });
                      if (!user.data) {
                        setUserError("user not found");
                      } else {
                        setCookie("userAuthToken", user.data.login.token, {
                          path: "/",
                          // expires: today,
                          secure: true,
                        });
                      }
                      console.log("main token", user);
                    } catch (error) {
                      console.log(error.message);
                    }
                  }}
                  className=""
                >
                  {userError && <span>{userError}</span>}
                  <FormikControl
                    control="input"
                    type="email"
                    name="email"
                    placeholder="Phone / Email"
                    required={true}
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    required={true}
                  />

                  <div className={Styles.btnCenter}>
                    <BtnForm title="Login" type="submit" formik={formik} />
                  </div>
                </form>
              );
            }}
          </FormikContainer>

          <div className={Styles.formWlc}>
            <p>
              <span>Welcome back!</span>
              Please use your email
              <br /> or phone number to login.
            </p>
            <span>
              <Link href={""}>Forgot Password?</Link>
            </span>
          </div>

          <div className={Styles.signUp}>
            <p>
              Don't have an account?
              <div>
                <br />
              </div>
              <Link href="/register">
                <span className={Styles.signUpBtn}>Sign Up FREE!</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
