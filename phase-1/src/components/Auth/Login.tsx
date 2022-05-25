import React, { useState } from "react";
import Link from "next/link";
import BtnForm from "../common/BtnForm";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { FormikContainer } from "../formik/FormikContainer";
import FormikControl from "../formik/FormikControl";
import AuthContainer from "../common/AuthContainer";
import { useLazyQuery } from "@apollo/client";
import { LoginQuery } from "../graphql/query";
import { useCookies } from "react-cookie";

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
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div>
          <h4 className="text-white text-3xl md:text-4xl font-extrabold mt-10 mb-5 text-center">
            VREEL Login
          </h4>

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
                  className="max-w-md mx-auto"
                >
                  {userError && (
                    <span className="text-red-500 mb-2 block">{userError}</span>
                  )}
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

                  <div className="w-7/12 mx-auto">
                    <BtnForm title="Login" type="submit" formik={formik} />
                    {/* <button
                        className="bg-secondary p-3 w-full rounded-full font-medium text-lg text-white hover:bg-secondary/70 transition-all duration-300"
                        type="submit"
                        disabled={!formik.isValid || formik.isSubmitting}
                      >
                        Login
                      </button> */}
                  </div>
                </form>
              );
            }}
          </FormikContainer>

          <div className="text-center">
            <p className="text-vreel_gray pt-12 pb-6 mb-0 text-base">
              <span className="text-white font-semibold">Welcome back!</span>{" "}
              Please use your email
              <br /> or phone number to login.
            </p>
            <Link href={""}>
              <span className="text-vreel_red text-base md:text-lg font-medium cursor-pointer">
                Forgot Password?
              </span>
            </Link>
          </div>

          <div className="pt-12">
            <p className="text-vreel_gray pb-5 text-center">
              Don't have an account?
              <div className=" block md:hidden ">
                <br />
              </div>
              <Link href="/register">
                <span className="text-secondary underline font-medium cursor-pointer pt-5 inline-block">
                  Sign Up FREE!
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
