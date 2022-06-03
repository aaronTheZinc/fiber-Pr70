import React from "react";
import {
  showMobilePreview,
  showPreviewActions,
} from "src/redux/createSlice/createMenuSlice";
import {
  isDesktopShow,
  showAdvancedLogo,
  showMediaMobileSelector,
} from "src/redux/createSlice/createMobileMediaSelector";
import { RootState, useAppDispatch } from "src/redux/store/store";
import Styles from "./Media.module.scss";
import { AiOutlineEye } from "react-icons/ai";
import { useSelector } from "react-redux";

type Props = {};

const CommonFile = ({ remove, isDesktopInit, desktop }: any) => {
  const dispatch = useAppDispatch();
  const { getMediaMobileLink, getMediaDesktopLink } = useSelector(
    (state: RootState) => state.mobileMediaSelector
  );

  return (
    <div className={Styles.leftItem}>
      <div className={Styles.leftItem__mediaControl}>
        <div className={Styles.leftItem__mediaControl__mediaImg}>
          <img
            src={
              isDesktopInit && desktop && getMediaDesktopLink.length != 0
                ? getMediaDesktopLink[0].link
                : getMediaMobileLink[0].link
            }
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
        <span>{isDesktopInit ? "Desktop" : "Mobile"}: </span>
        <button onClick={() => dispatch(remove())}>
          <img src="/assets/delete-bin-2-line.svg" alt="Icons delete" />
        </button>
        <button
          onClick={() => {
            dispatch(showMediaMobileSelector());
            dispatch(showAdvancedLogo(false));
            !desktop
              ? dispatch(isDesktopShow(false))
              : dispatch(isDesktopShow(true));
          }}
        >
          <img src="/assets/ball-pen-line.svg" alt="Icons rename" />
        </button>
        <button
          onClick={() => {
            dispatch(
              showPreviewActions({
                type: "image",
                payload: isDesktopInit
                  ? getMediaDesktopLink[0].link
                  : getMediaMobileLink[0].link,
              })
            );
            dispatch(showMobilePreview(true));
          }}
        >
          <AiOutlineEye className={Styles.viewIcon} />
        </button>
      </div>
    </div>
  );
};

export default CommonFile;
