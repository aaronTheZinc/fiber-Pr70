import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import Styles from "./Players.module.scss";

type Props = {
  mobilePreview?: boolean;
};

const Players = ({ mobilePreview }: Props) => {
  const { previewItems } = useSelector((state: RootState) => state.showPreview);

  return (
    <>
      {previewItems.type === "image" && (
        <img
          src={previewItems.payload}
          alt="Images"
          className={Styles.imgSizing}
        />
      )}

      <div className={Styles.players}>
        {previewItems.type === "video" && (
          <ReactPlayer
            url={previewItems.payload}
            playing={mobilePreview ? mobilePreview : false}
            controls={true}
            muted={mobilePreview ? mobilePreview : true}
            width="100%"
            height="100%"
          />
        )}
        {previewItems.type === "audio" && (
          <ReactPlayer
            url={previewItems.payload}
            playing={mobilePreview ? mobilePreview : false}
            controls
            muted={mobilePreview ? mobilePreview : false}
          />
        )}
      </div>
    </>
  );
};

export default Players;
