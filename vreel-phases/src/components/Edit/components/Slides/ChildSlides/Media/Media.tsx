import React from "react";
import Styles from "./Media.module.scss";
import SlidesToggleButton from "../../../../../Shared/Buttons/SlidesBtn/SlidesToggleButton/SlidesToggleButton";
import MediaMobileSelector from "./MediaMobileSelector";
import { RootState, useAppDispatch } from "src/redux/store/store";
import { useSelector } from "react-redux";
import { AiOutlineEye } from "react-icons/ai";
import {
  isDesktopShow,
  removeDesktopMediaPreview,
  removeMediaPreview,
  showAdvancedLogo,
  showMediaMobileSelector,
} from "src/redux/createSlice/createMobileMediaSelector";
import {
  showMobilePreview,
  showPreviewActions,
} from "src/redux/createSlice/createMenuSlice";

const Media = () => {
  const dispatch = useAppDispatch();
  const { getMediaMobileLink, getMediaDesktopLink, isDesktopInit } =
    useSelector((state: RootState) => state.mobileMediaSelector);

  const bgColor = getMediaMobileLink?.link.length ? "green" : "transparent";

  return (
    <div className={Styles.mediaContainer}>
      <MediaMobileSelector />
      <div className={Styles.mediaContainer__container}>
        {!getMediaMobileLink?.link.length ? (
          <div
            className={Styles.rightItem}
            onClick={() => {
              dispatch(showMediaMobileSelector());
              dispatch(showAdvancedLogo(false));
              dispatch(isDesktopShow(false));
            }}
          >
            <img src="/assets/icons/mobile.svg" alt="Mobile Icon" />
            <p>Select Mobile File</p>
          </div>
        ) : (
          // <CommonFile remove={removeMediaPreview} desktop={false} />
          <div className={Styles.leftItem}>
            <div className={Styles.leftItem__mediaControl}>
              <div className={Styles.leftItem__mediaControl__mediaImg}>
                <img
                  src={getMediaMobileLink.link}
                  alt="Show  Images in media"
                />
              </div>
              <div className={Styles.leftItem__mediaControl__playBtn}>
                <button>
                  <img src="/assets/icons/play-one.svg" alt="Play Icon" />
                </button>
                <span>Filmewhere</span>
              </div>
            </div>

            <div className={Styles.iconContainer}>
              <span>Mobile: </span>
              <button onClick={() => dispatch(removeMediaPreview())}>
                <img src="/assets/delete-bin-2-line.svg" alt="Icons delete" />
              </button>
              <button
                onClick={() => {
                  dispatch(showMediaMobileSelector());
                  dispatch(showAdvancedLogo(false));
                  dispatch(isDesktopShow(false));
                }}
              >
                <img src="/assets/ball-pen-line.svg" alt="Icons rename" />
              </button>
              <button
                onClick={() => {
                  dispatch(
                    showPreviewActions({
                      type: "image",
                      payload: getMediaDesktopLink.link,
                    })
                  );
                  dispatch(showMobilePreview(true));
                }}
              >
                <AiOutlineEye className={Styles.viewIcon} />
              </button>
            </div>
          </div>
        )}

        <div
          className={Styles.rightItem}
          onClick={() => {
            dispatch(showMediaMobileSelector());
            dispatch(showAdvancedLogo(false));
            dispatch(isDesktopShow(true));
          }}
        >
          <img src="/assets/icons/tv.svg" alt="Tv Icon" />
          <p>Select Desktop File</p>
        </div>
      </div>

      <div className={Styles.toggleBtnContainer}>
        <SlidesToggleButton
          bgColor={bgColor}
          width={78}
          height={23}
          firstTitle="On"
          secondTitle="Off"
          name="media_sound"
        />
        <span>Media File Sound</span>
      </div>
    </div>
  );
};

export default Media;
