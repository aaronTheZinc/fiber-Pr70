import React from "react";

interface ButtonProps {
  title: string;
  action: () => void;
}

export const PrimaryButton = ({ title, action }: ButtonProps): JSX.Element => {
  return (
      <button className="vreel-btn__primary" onClick={action}>{title}</button>
  );
};
