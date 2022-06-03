import { ErrorMessage, Field, useFormikContext } from "formik";
import React from "react";
import Styles from "./SlideInput.module.scss";

const SlideInput = ({ placeholder, name, type }: any) => {
  return (
    <input
      className={Styles.slideInput}
      placeholder={placeholder}
      name={name}
      type={type}
    />
  );
};

export default SlideInput;
