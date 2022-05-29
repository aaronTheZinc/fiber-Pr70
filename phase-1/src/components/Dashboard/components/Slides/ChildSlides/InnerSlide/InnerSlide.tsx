import React, { useRef, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";
import InputForm from "../../../../../common/InputForm/InputForm";
import CallToActions from "../CallToActions/CallToActions";
import SlideInput from "../SlideInput/SlideInput";
import { SlidesDataType } from "../../SlidesData";
import Styles from "./InnerSlide.module.scss";
import clsx from "clsx";

const InnerSlide: React.FC<{ item: SlidesDataType }> = ({ item }) => {
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
    <div className={clsx(Styles.slideContainer, Styles.activeHeight)}>
      <button className={Styles.button} onClick={handleHeight}>
        <span>{item.title}</span>
        <span>{!height ? <BsPlusCircle /> : <FiMinusCircle />}</span>
      </button>
      <div style={{ height: `${height}px` }} className={Styles.slide}>
        <div className={Styles.slideBody} ref={ref}>
          {item.title === "Title" && (
            <div className={Styles.innerSlide}>
              <SlideInput type="text" placeholder="Header" name="header" />
              <textarea placeholder="Description" />
            </div>
          )}
          {item.title === "Call to action" && <CallToActions />}
        </div>
      </div>
    </div>
  );
};

export default InnerSlide;
