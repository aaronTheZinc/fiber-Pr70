import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import SlideActionsBtn from "src/components/Shared/Buttons/SlidesBtn/SlideActionsBtn/SlideActionsBtn";
import {
  removeFromParent,
  setParent,
} from "src/redux/createSlice/createHeightSlice";
import { RootState, useAppDispatch } from "src/redux/store/store";
import InnerSlide from "../ChildSlides/InnerSlide/InnerSlide";
import { innerSlideData, SlidesDataType } from "../SlidesData";
import Styles from "./Slide.module.scss";

const Slide = () => {
  const [height, setHeight] = useState(0);
  const wrapperRef = useRef(null);
  const [collapse, setCollapse] = useState<boolean>(false);
  const parent = useSelector((state: RootState) => state.nestedHeight.parent);
  const dispatch = useAppDispatch();
  const [currentParent, setCurrentParent] = useState<{
    index: number;
    height: number;
    title: string;
  } | null>(null);
  const handleSetHeight = () => {
    setCollapse((collapse) => !collapse);
    dispatch(removeFromParent({ index: currentParent?.index }));

    if (height === 0) {
      dispatch(
        setParent({
          index: currentParent?.index,
          height: currentParent?.height + wrapperRef.current.offsetHeight,
          title: "Slides",
        })
      );
      dispatch(
        setParent({
          index: currentParent?.index,
          height: currentParent?.height + wrapperRef.current.offsetHeight,
          title: "Slides",
        })
      );

      setHeight(wrapperRef.current.offsetHeight);
    } else {
      dispatch(
        setParent({
          index: currentParent?.index,
          height: currentParent?.height - wrapperRef.current.offsetHeight,
          title: "Slides",
        })
      );

      setHeight(0);
    }
  };
  useEffect(() => {
    setCurrentParent(parent.find((obj) => obj.title === "Slides"));
  }, [handleSetHeight, collapse]);
  return (
    <div
      className={clsx(
        Styles.slideContainer,
        height ? Styles.activeHeight : Styles.deActiveHeight
      )}
    >
      <button className={Styles.button} onClick={handleSetHeight}>
        <span>Slides1</span>
        <span>{!height ? <BsPlusCircle /> : <FiMinusCircle />}</span>
      </button>
      <div
        style={{
          height: `${height}px`,
          overflow: "hidden",
          width: "100%",
          transition: "all 1.5s ease",
        }}
        className={Styles.slide}
      >
        <div className={Styles.slideBody} ref={wrapperRef}>
          {innerSlideData.map((item: SlidesDataType, index: number) => (
            <InnerSlide
              key={index}
              item={item}
              height={height}
              setHeight={setHeight}
            />
          ))}

          <div className={Styles.delBtn}>
            <SlideActionsBtn
              title="Delete Slide"
              bgColor="red"
              padding="8px 30px"
              actions={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
