import React, { useState } from "react";
import Link from "next/link";
import BtnForm from "../common/BtnForm";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useRouter } from "next/router";
import { FormikContainer } from "../formik/FormikContainer";
import * as Yup from "yup";
import FormikControl from "../formik/FormikControl";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import AuthContainer from "../common/AuthContainer";
import { LoginQuery } from "../graphql/query";
import { useCookies } from "react-cookie";
import { FormikRegFormTypes } from "../formik/Types/FormikTypes";

const initialValues: FormikRegFormTypes = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
// in layout change commit
/* const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
 */
const validationSchema = Yup.object({
  username: Yup.string().required("required"),
  email: Yup.string().email("Must be a valid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  /*   .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."), */
  confirmPassword: Yup.string()
    .required("required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const [userError, setUserError] = useState(null);
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  console.log("signUp ", cookies);
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const [loginUser, { loading: loading2, error: error2, data: data2 }] =
    useLazyQuery(LoginQuery);
  console.log("token", data2);
  console.log(data);
  /*   console.log("error", error);
  console.log("registerDAta", data);
  console.log("loading", loading); */

  // =================== handle Register Form ===================//
  const handleRegisterForm = async (formik) => {
    // formik.handleSubmit();
    setUserError(null);
    const { username, email, password } = formik.values;
    try {
      await createUser({
        variables: {
          username,
          email,
          password,
          account_type: "stander",
        },
      });

      const user = await loginUser({
        variables: {
          email,
          password,
        },
      });
      console.log("main token", user);
      if (user.data.login.token) {
        setCookie("userAuthToken", user.data.login.token);
        router.push(`/${username}`);
      }

      // formik.resetForm();
    } catch (error) {
      setUserError(error.message);
    }
  };

  const router = useRouter();
  return (
    <AuthContainer>
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div>
          <h4 className="text-white text-3xl md:text-4xl font-extrabold mt-10 mb-5 text-center">
            Sign up Free!
          </h4>

          <FormikContainer
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(formik) => {
              return (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRegisterForm(formik);
                  }}
                >
                  {userError && (
                    <span className="text-red-500 mb-2 block">{userError}</span>
                  )}
                  <FormikControl
                    control="input"
                    type="text"
                    name="username"
                    placeholder="Vreel.Page/ Username"
                    required={true}
                  />
                  <FormikControl
                    control="input"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />

                  <label className="inline-flex justify-center text-center items-center w-full mb-3">
                    <input
                      type="checkbox"
                      className="form-checkbox rounded-full h-5 w-5 text-secondary"
                    />
                    <span className="my-2 ml-2 text-white/90 text-xs">
                      By continuing you accept our Privacy Policy
                    </span>
                  </label>

                  <div className="w-9/12 mx-auto">
                    <BtnForm title="Register" type="submit" formik={formik} />
                  </div>
                </form>
              );
            }}
          </FormikContainer>

          <div className="py-5 md:pt-5">
            <p className="text-center text-white">
              Already have an account?
              <Link href="/login">
                <span className="text-secondary underline font-medium cursor-pointer">
                  Log In
                </span>
              </Link>
            </p>
          </div>
          <div className="pt-0 md:pt-5 text-center">
            <p className="text-white">
              By clicking register you agree to VReel’s <br />
              <Link href={""}>
                <span className="text-secondary cursor-pointer underline">
                  Privacy policy
                </span>
              </Link>
              and
              <Link href={""}>
                <span className="text-secondary cursor-pointer underline">
                  Terms of service
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Register;
