import clsx from "clsx";
import React from "react";

function TextError(props: string | any) {
  return <div className={clsx("text-sm text-red-500")}>{props.children}</div>;
}

export default TextError;
