import clsx from "clsx";
import React, { useRef, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";
import InnerSlide from "../ChildSlides/InnerSlide/InnerSlide";
import { innerSlideData, SlidesDataType } from "../SlidesData";
import Styles from "./Slide.module.scss";

const Slide = () => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  const handleHeight = () => {
    if (height === 0) {
      setHeight(ref.current.offsetHeight);
    } else {
      setHeight(0);
    }
  };
  return (
    <div
      className={clsx(
        Styles.slideContainer,
        height ? Styles.activeHeight : Styles.deActiveHeight
      )}
    >
      <button className={Styles.button} onClick={handleHeight}>
        <span>Slides1</span>
        <span>{!height ? <BsPlusCircle /> : <FiMinusCircle />}</span>
      </button>
      <div style={{ height: `${height}px` }} className={Styles.slide}>
        <div className={Styles.slideBody} ref={ref}>
          {innerSlideData.map((item: SlidesDataType, index: number) => (
            <InnerSlide key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide;
