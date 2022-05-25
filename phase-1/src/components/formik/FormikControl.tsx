import React from "react";
import { Input } from "./index";
import { FormikControlPropsTypes } from "./Types/FormikTypes";
const FormikControl = ({ control, ...rest }: FormikControlPropsTypes) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    default:
      return null;
  }
};
export default FormikControl;
