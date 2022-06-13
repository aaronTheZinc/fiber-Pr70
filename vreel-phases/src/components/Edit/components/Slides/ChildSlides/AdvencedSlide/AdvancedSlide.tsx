import React, { useRef, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";
import Styles from "./AdvancedSlide.module.scss";
import clsx from "clsx";
import SlideActionsBtn from "src/components/Shared/Buttons/SlidesBtn/SlideActionsBtn/SlideActionsBtn";
import SlidesToggleButton from "src/components/Shared/Buttons/SlidesBtn/SlidesToggleButton/SlidesToggleButton";
import {
  isDesktopShow,
  showAdvancedLogo,
  showMediaMobileSelector,
} from "src/redux/createSlice/createMobileMediaSelector";
import { useAppDispatch } from "src/redux/store/store";
import FormikControl from "src/components/formik/FormikControl";
import { FormikContainer } from "src/components/formik/FormikContainer";
import LogoBtn from "src/components/Shared/Buttons/SlidesBtn/AdvancedLogoBtn/LogoBtn";

const InnerSlide: React.FC<{
  height: number;
  setHeight: Function;
  parentHeight: number;
  setParentHeight: Function;
}> = ({ height: hp, setHeight: setHp, parentHeight, setParentHeight }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  const handleHeight = () => {
    if (height === 0) {
      setHeight(ref.current.offsetHeight);
      setHp(hp + ref.current.offsetHeight);
      setParentHeight(parentHeight + ref.current.offsetHeight);
    } else {
      setHeight(0);
      setHp(hp - ref.current.offsetHeight);
      setParentHeight(parentHeight - ref.current.offsetHeight);
    }
  };
  const dispatch = useAppDispatch();

  const initialValues = {
    header: "",
    info: "",
  };

  return (
    <div>
      <div className={clsx(Styles.slideContainer, Styles.activeHeight)}>
        <button className={Styles.button} onClick={handleHeight}>
          <span>More Info</span>
          <span>{!height ? <BsPlusCircle /> : <FiMinusCircle />}</span>
        </button>
        <div style={{ height: `${height}px` }} className={Styles.slide}>
          <div className={Styles.slideBody} ref={ref}>
            <div className={Styles.innerSlide}>
              <FormikContainer initialValues={initialValues}>
                {(formik) => {
                  return (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        // handleLogin(formik.values);
                      }}
                    >
                      <FormikControl
                        control="input"
                        type="text"
                        name="header"
                        placeholder="Header"
                        required={true}
                        slideInput={true}
                      />
                      <FormikControl
                        control="textarea"
                        type="text"
                        name="info"
                        placeholder="Info"
                        required={true}
                      />
                    </form>
                  );
                }}
              </FormikContainer>
              <div className={Styles.moreInfoBtn}>
                {["b", "i", "u", "To Slide", "Link"].map((item, index) => (
                  <button key={index}>
                    <span
                      className={clsx(
                        item === "b" && Styles.bold,
                        item === "i" && Styles.italic,
                        item === "u" && Styles.underline
                      )}
                    >
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.moreInfo}>
        <div className={Styles.moreInfo__flex}>
          <div className={Styles.moreInfo__flex__left}>
            <LogoBtn />
          </div>
          <div className={Styles.moreInfo__flex__right}>
            {["Add Collaborator", "Add NFT", "Add Creadits", "Add....."].map(
              (item, index) => (
                <div
                  className={Styles.moreInfo__flex__right__button}
                  key={index}
                >
                  <SlideActionsBtn
                    title={item}
                    bgColor="#ff7a00"
                    Icon={BsPlusCircle}
                    width="100%"
                    padding="6px"
                    actions={() => {}}
                  />
                </div>
              )
            )}
          </div>
        </div>

        <div className={Styles.moreInfo__toggleBtn}>
          {/* <SlidesToggleButton
            bgColor="green"
            firstTitle="Light"
            secondTitle="Dark"
            width={114}
            height={33}
            firstInnerText="Switch for Dark Mode"
            secondInnertext="Switch For Light Mode"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default InnerSlide;
