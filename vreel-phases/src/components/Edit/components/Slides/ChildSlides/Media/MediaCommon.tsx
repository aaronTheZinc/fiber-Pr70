import React from "react";
import { useSelector } from "react-redux";
import { showPreviewActions } from "src/redux/createSlice/createMenuSlice";
import {
  getMediaDesktopSelector,
  getMediaSelector,
  showMediaMobileSelector,
} from "src/redux/createSlice/createMobileMediaSelector";
import { RootState, useAppDispatch } from "src/redux/store/store";
import Styles from "./MediaCommon.module.scss";

type Props = {
  item: any;
};

const MediaCommon = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const { isDesktopInit } = useSelector(
    (state: RootState) => state.mobileMediaSelector
  );

  return (
    <div className={Styles.viewImageContainer}>
      <div
        onClick={() => {
          if (!isDesktopInit) {
            dispatch(
              getMediaSelector({
                id: item.id,
                type: item.type,
                link: item.link,
              })
            );
          } else {
            dispatch(
              getMediaDesktopSelector({
                id: item.id,
                type: item.type,
                link: item.link,
              })
            );
          }
          dispatch(showMediaMobileSelector());
        }}
      >
        <img src={item.link} alt="Gallery Images" />
      </div>
      <div className={Styles.playIcons}>
        <button>
          <img src="/assets/icons/play-one.svg" alt="Play Icon" />
        </button>
        <span>Filmewhere</span>
      </div>
    </div>
  );
};

export default MediaCommon;
