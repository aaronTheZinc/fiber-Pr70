import { Field, useFormikContext } from "formik";
import React from "react";
import Styles from "./Textarea.module.scss";

const Textarea = (props: any) => {
  const { placeholder, name, ...rest } = props;
  return (
    <div className={""}>
      <Field name={name}>
        {({ field, form }) => {
          return (
            <div>
              <textarea
                // style={{ backgroundColor: "white" }}
                {...field}
                {...rest}
                placeholder={`${placeholder} `}
                className={Styles.textarea}
              />
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default Textarea;
