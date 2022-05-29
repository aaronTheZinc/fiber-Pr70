import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import TextError from "../TextError/TextError";
import Styles from "./Input.module.scss";

const Input = (props: any) => {
  const { placeholder, name, info, ...rest } = props;
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
                className={Styles.input}
              />
            </div>
          );
        }}
      </Field>
      {!errors[name] && info && <div className={Styles.info}>{info}</div>}

      <div className={Styles.error}>
        <ErrorMessage component={TextError} name={name} />
      </div>
    </div>
  );
};

export default Input;
