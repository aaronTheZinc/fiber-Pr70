import React, { CSSProperties, ReactNode } from "react";
import { expandMenu } from "src/redux/createSlice/createMenuSlice";
import { useAppDispatch } from "src/redux/store/store";
import Styles from "./SectionContainer.module.scss";
import { HiOutlineMenu } from "react-icons/hi";

const SectionContainer: React.FC<{
  children: ReactNode;
  title: string;
  parentSwiper?: any;
}> = ({ children, title, parentSwiper }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={Styles.sectionContainer}>
      <div className={Styles.sectionContainer__buttonTopContainer}>
        <h2>{title}</h2>
        <div onClick={() => dispatch(expandMenu())}>
          <HiOutlineMenu
            className={Styles.sectionContainer__buttonTopContainer__menu}
          />
        </div>
      </div>
      <div
        className={Styles.sectionContainer__childrenContainer}
        style={
          {
            "--pheight": `${
              parentSwiper?.activeIndex !==
              parseInt(parentSwiper?.slides?.length) - 1
                ? 40
                : 0
            }px`,
          } as CSSProperties
        }
      >
        <div className={Styles.sectionContainer__childrenContainer__content}>
          {children}
        </div>
      </div>

      {parentSwiper?.activeIndex !==
        parseInt(parentSwiper?.slides?.length) - 1 && (
        <div
          className={Styles.sectionContainer__buttonBottomContainer}
          onClick={() => parentSwiper.slideNext()}
          style={
            {
              "--height": `${
                parentSwiper?.activeIndex !==
                parseInt(parentSwiper?.slides?.length) - 1
                  ? 40
                  : 0
              }px`,
            } as CSSProperties
          }
        >
          <img src="/assets/icons/carrot-down.svg" alt="Carrot Down images" />
        </div>
      )}
    </div>
  );
};

export default SectionContainer;
