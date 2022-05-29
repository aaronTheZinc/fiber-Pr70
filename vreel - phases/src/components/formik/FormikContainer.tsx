import { Formik } from "formik";
import React from "react";

export const FormikContainer = ({
  children,
  initialValues,
  validationSchema,
}: any) => {
  const onSubmit = async (values, submitProps) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={validationSchema}
    >
      {children}
    </Formik>
  );
};
