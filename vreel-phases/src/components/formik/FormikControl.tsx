import React from "react";
import Textarea from "./common/Textarea/Textarea";

import { Input } from "./index";
import { FormikControlPropsTypes } from "./Types/FormikTypes";
const FormikControl = ({ control, ...rest }: FormikControlPropsTypes) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    default:
      return null;
  }
};
export default FormikControl;
