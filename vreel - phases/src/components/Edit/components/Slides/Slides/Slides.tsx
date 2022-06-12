import React, { useEffect, useRef, useState } from "react";
import Slide from "../Slide/Slide";
import { BsPlus } from "react-icons/bs";
import Styles from "./Slides.module.scss";
import SlideActionsBtn from "src/components/Shared/Buttons/SlidesBtn/SlideActionsBtn/SlideActionsBtn";
import clsx from "clsx";
import VreelSlider from "src/components/VreelSlider/VreelSlider";
import MobilePreview from "../Preview/MobilePreview/MobilePreview";
import DesktopPreview from "../Preview/DesktopPreview/DesktopPreview";

const Slides = () => {
  const [preview, setPreview] = useState(false);

  return (
    <div className={Styles.slidesContainer}>
      <div className={Styles.slidesContainer__leftSides}>
        <div className={Styles.slides}>
          <div className={Styles.slides__addSlides}>
            <span>Slides</span>
            <SlideActionsBtn
              Icon={BsPlus}
              title="Add Slide"
              padding="8px 20px"
              bgColor="green"
              actions={() => {}}
            />
          </div>

          {[1, 2, 3].map((_, index) => (
            <Slide key={index} />
          ))}
        </div>
      </div>
      {/* Right side  */}
      <div className={Styles.slidesContainer__rightSlides}>
        <div
          className={clsx(
            Styles.slidesContainer__rightSlides__container,
            preview && Styles.active
          )}
        >
          <div
            className={
              Styles.slidesContainer__rightSlides__container__prevToggleBtn
            }
            onClick={() => setPreview(!preview)}
          >
            {/* <SlidesToggleButton
              secondTitle='Mobile'
              firstTitle='WideScreen'
              width={200}
              height={38}
              bgColor='green'
              firstInnerText='Toggle For Mobile View'
              secondInnertext='Toggle For Desktop View'
            /> */}
          </div>
          <div>{preview ? <DesktopPreview /> : <MobilePreview />}</div>
        </div>
      </div>
    </div>
  );
};

export default Slides;
