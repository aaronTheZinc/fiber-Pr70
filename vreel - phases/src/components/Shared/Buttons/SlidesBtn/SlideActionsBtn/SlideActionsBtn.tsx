import React from "react";
import Styles from "./SlideActionsBtn.module.scss";

const SlideActionsBtn: React.FC<{
  title: string;
  bgColor: string;
  padding: string;
  Icon?: any;
  width?: string;
  actions: Function;
}> = ({ title, bgColor, Icon, padding, actions, width }) => {
  const style = {
    backgroundColor: bgColor,
    padding: padding,
    width: width,
  };
  return (
    <button style={style} className={Styles.deletBtn} onClick={() => actions()}>
      <span>
        {Icon && (
          <span className={Styles.icon}>
            <Icon />
          </span>
        )}
        <span>{title}</span>
      </span>
    </button>
  );
};

export default SlideActionsBtn;
