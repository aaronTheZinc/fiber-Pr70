import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import TextError from "../TextError/TextError";
import Styles from "./Input.module.scss";
import clsx from "clsx";

const Input = (props: any) => {
  const { slideInput, placeholder, name, ...rest } = props;
  const { errors, setFieldValue } = useFormikContext();

  return (
    <div className={Styles.formControl}>
      <Field name={name}>
        {({ field, form }) => {
          return (
            <div>
              <input
                // style={{ backgroundColor: "white" }}
                {...field}
                {...rest}
                placeholder={`${placeholder} `}
                className={clsx(slideInput ? Styles.slideInput : Styles.input)}
              />
            </div>
          );
        }}
      </Field>

      <div className={Styles.error}>
        {errors[name] && <ErrorMessage component={TextError} name={name} />}
      </div>
    </div>
  );
};

export default Input;
