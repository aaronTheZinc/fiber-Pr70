import clsx from "clsx";
import React, { useState } from "react";
import Styles from "./SlidesToggleButton.module.scss";

const SlidesToggleButton: React.FC<{
  bgColor: string;
  height: number;
  width: number;
  firstInnerText?: string;
  secondInnertext?: string;
  firstTitle: string;
  secondTitle: string;
}> = ({
  bgColor,
  height,
  width,
  firstInnerText,
  secondInnertext,
  firstTitle,
  secondTitle,
}) => {
  const [on, setOn] = useState(false);

  return (
    <div
      className={Styles.toggleBtn}
      style={{
        backgroundColor: `${bgColor}`,
        boxShadow: `inset 5px 5px 5px 6px ${bgColor}`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={() => setOn(!on)}
    >
      {firstInnerText && (
        <span
          className={clsx(
            Styles.toggleBtn__switchText,
            on ? Styles.active : Styles.deactive
          )}
          style={{ width: `${width / 3}px` }}
        >
          {on ? firstInnerText : secondInnertext}
        </span>
      )}
      <button className={clsx(on ? Styles.on : Styles.off)}>
        {on ? firstTitle : secondTitle}
      </button>
    </div>
  );
};

export default SlidesToggleButton;
