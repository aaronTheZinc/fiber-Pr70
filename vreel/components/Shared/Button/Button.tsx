import React from "react";

interface ButtonProps {
  title: string;
  type?: string;
  action: () => void;
}

export const PrimaryButton = ({ type, title, action }: ButtonProps): JSX.Element => {
  return (
      <button className="vreel-btn__primary" type={type} onClick={action}>{title}</button>
  );
};
