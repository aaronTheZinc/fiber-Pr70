import clsx from "clsx";
import React from "react";
import Styles from "./TextError.module.scss";

function TextError(props: string | any) {
  return <div className={clsx(Styles.TextError)}>{props.children}</div>;
}

export default TextError;
