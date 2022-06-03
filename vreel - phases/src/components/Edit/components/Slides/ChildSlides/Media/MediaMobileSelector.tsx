import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import UploadBtn from "src/components/Shared/Buttons/UploadBtn/UploadBtn";
import { RootState, useAppDispatch } from "src/redux/store/store";
import { IoIosCloseCircleOutline } from "react-icons/io";
import MediaCommon from "./MediaCommon";
import Styles from "./MediaMobileSelector.module.scss";
import { showMediaMobileSelector } from "src/redux/createSlice/createMobileMediaSelector";

const MediaMobileSelector = () => {
  const dispatch = useAppDispatch();
  const {
    mediaMobileSelectorInitState: mediaSelector,
    advancedLogoShow,
    advancedLogoSelector,
    mediaSelectorInitState,
  } = useSelector((state: RootState) => state.mobileMediaSelector);
  const data = advancedLogoShow ? advancedLogoSelector : mediaSelectorInitState;
  return (
    <div
      className={clsx(
        Styles.mediaMobileContainer,
        mediaSelector ? Styles.active : Styles.deActive
      )}
    >
      <div className={Styles.mediaMobileContainer__closer}>
        <button
          className={Styles.mediaMobileContainer__closer__btn}
          onClick={() => dispatch(showMediaMobileSelector())}
        >
          <IoIosCloseCircleOutline />
        </button>
      </div>

      <div className={Styles.mediaMobileContainer__content}>
        <p>Select Slide Media Selector</p>
        <UploadBtn />
      </div>

      <div className={Styles.mediaMobileContainer__mediaFileContainer}>
        {data.map((item: Object, index: number) => (
          <div key={index}>
            <MediaCommon item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaMobileSelector;
