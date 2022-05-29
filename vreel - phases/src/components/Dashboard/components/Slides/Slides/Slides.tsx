import React from "react";
import Slide from "../Slide/Slide";
import { BsPlusCircle } from "react-icons/bs";
import Styles from "./Slides.module.scss";

const Slides = () => {
  return (
    <div className={Styles.slidesContainer}>
      <div className={Styles.slides}>
        {[1, 2, 3].map((_, index) => (
          <Slide key={index} />
        ))}
      </div>
    </div>
  );
};

export default Slides;
