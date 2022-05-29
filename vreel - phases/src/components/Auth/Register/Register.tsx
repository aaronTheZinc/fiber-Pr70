import React, { useState } from "react";
import Link from "next/link";
import BtnForm from "../../common/BtnForn/BtnForm";
import { useRouter } from "next/router";
import { FormikContainer } from "../../formik/FormikContainer";
import * as Yup from "yup";
import FormikControl from "../../formik/FormikControl";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/mutations";
import AuthContainer from "../../common/AuthContainer/AuthContainer";
import { LoginQuery } from "../../graphql/query";
import { useCookies } from "react-cookie";
import { FormikRegFormTypes } from "../../formik/Types/FormikTypes";
import Styles from "./Register.module.scss";
import clsx from "clsx";

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
  const [checked, setChecked] = useState(false);

  return (
    <AuthContainer>
      <div className={Styles.vreelLoginForm}>
        <div>
          <h4>Sign up Free!</h4>
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
                  <div className={Styles.error}>
                    {userError && <span>{userError}</span>}
                  </div>
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

                  <div
                    className={Styles.checkbox}
                    onClick={() => setChecked(!checked)}
                  >
                    <div
                      id="check"
                      className={clsx(
                        Styles.formCheckbox,
                        checked && Styles.active
                      )}
                    ></div>
                    <label htmlFor="check">
                      By continuing you accept our Privacy Policy
                    </label>
                  </div>

                  <div className={Styles.btnCenter}>
                    <BtnForm title="Register" type="submit" formik={formik} />
                  </div>
                </form>
              );
            }}
          </FormikContainer>

          <div className={Styles.logIn}>
            <p>
              Already have an account?
              <Link href="/login">
                <span className={Styles.logInBtn}> Log In</span>
              </Link>
            </p>
          </div>
          <div className={Styles.terms}>
            <p>
              By clicking register you agree to VReel’s <br />
              <br />
              <Link href={""}>
                <span>Privacy policy </span>
              </Link>
              and
              <Link href={""}>
                <span> Terms of service</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Register;
