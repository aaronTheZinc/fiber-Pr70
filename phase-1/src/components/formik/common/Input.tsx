import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import TextError from "./TextError";
import clsx from "clsx";

const Input = (props: any) => {
  const { placeholder, name, info, ...rest } = props;
  const { errors, setFieldValue } = useFormikContext();

  return (
    <div className="form-control  text-left">
      <Field name={name}>
        {({ field, form }) => {
          return (
            <div className=" w-full">
              <input
                style={{ backgroundColor: "white" }}
                {...field}
                {...rest}
                placeholder={`${placeholder} `}
                className={clsx(
                  "placeholder-black px-8 text-primary bg-white py-3 rounded-2xl outline-none w-full",
                  `form-input-gc form-range`
                )}
              />
            </div>
          );
        }}
      </Field>
      {!errors[name] && info && (
        <div className="text-gray-400 py-2 pl-8">{info}</div>
      )}

      <div className="py-2 pb-3 pl-8">
        <ErrorMessage component={TextError} name={name} />
      </div>
    </div>
  );
};

export default Input;
