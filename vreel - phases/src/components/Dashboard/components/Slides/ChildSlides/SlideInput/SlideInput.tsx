import React from "react";
import Styles from "./SlideInput.module.scss";

type Props = {};

const SlideInput: React.FC<{
  type: any;
  name: string;
  placeholder: string;
  customClass?: string;
}> = ({ type, name, placeholder, customClass }) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      type={type}
      className={Styles.slideInput}
    />
  );
};

export default SlideInput;
