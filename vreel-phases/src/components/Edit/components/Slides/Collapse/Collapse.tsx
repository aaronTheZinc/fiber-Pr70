import clsx from "clsx";
import { title } from "process";
import React, { useEffect, useRef, useState } from "react";
import { BsPlusCircle, BsX } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import {
  addCollupse,
  removeCollupse,
} from "src/redux/createSlice/createMenuSlice";
import { RootState, useAppDispatch } from "src/redux/store/store";

import Styles from "./Collapse.module.scss";
function getChildHeight(
  level: number,
  collupse: any,
  title: string,
  height: number
) {
  const { level1, level2, level3 } = collupse;
  if (level == 3) console.log(collupse);
  console.log(
    title,
    level1.filter((e) => e.level_1 === title).map((e) => e.height)
  );

  if (level == 3 || height == 0) return 0;
  else if (level == 2) {
    return level2
      .filter((e) => e.level_2 == title)
      .map((e) => e.ref.current.offsetHeight)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  } else if (level == 1) {
    return (
      level1
        .filter((e) => e.level_1 == title)
        .map((e) => e.ref.current.offsetHeight)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0) +
      level2
        .filter((e) => e.level_1 == title)
        .map((e) => e.ref.current.offsetHeight)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    );
  }
}
const Collapse = ({
  title,
  level,
  children,
  level_1 = "",
  level_2 = "",
}: any) => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const { collupse } = useSelector((state: RootState) => state.expandMenu);
  const [height, setheight] = useState(0);
  const handleHeight = () => {
    setheight(height == 0 ? ref.current.scrollHeight : 0);
    dispatch(
      height == 0
        ? addCollupse({
            title,
            level,
            ref,
            level_1,
            level_2,
          })
        : removeCollupse({
            title,
            level,
          })
    );
  };

  console.log({
    height,
    level,
    child: getChildHeight(level, collupse, title, height),
  });
  console.log(title, ref?.current?.offsetHeight);

  return (
    <div className={clsx(Styles.slideContainer, Styles.deActiveHeight)}>
      <button className={Styles.button} onClick={handleHeight}>
        <span>
          {title} - <span style={{ fontWeight: "bold" }}>main:{height}</span> -
          <span style={{ fontWeight: "bold" }}>
            child:{getChildHeight(level, collupse, title, height)}
          </span>
        </span>
        <span>{!height ? <BsPlusCircle /> : <FiMinusCircle />}</span>
      </button>
      <div
        style={{
          height: `${
            height + getChildHeight(level, collupse, title, height)
          }px`,
        }}
        className={Styles.slide}
      >
        <div className={Styles.slideBody} ref={ref}>
          {children}
          <button className={Styles.button} onClick={handleHeight}>
            <span>
              <span style={{ fontWeight: "bold" }}>Close</span> {title} -{" "}
              <span>main:{height}</span> -
              <span>
                child:{getChildHeight(level, collupse, title, height)}
              </span>
            </span>
            <span>{<BsX style={{ height: "20px", width: "20px" }} />}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Collapse;
