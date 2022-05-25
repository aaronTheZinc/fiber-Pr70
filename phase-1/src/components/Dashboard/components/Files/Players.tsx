import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
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
          className="w-full h-full object-cover rounded-md"
        />
      )}

      <div className="w-full h-screen lg:h-full flex justify-center items-start lg:overflow-hidden lg:rounded-md px-1 lg:px-0">
        {previewItems.type === "video" && (
          <ReactPlayer
            url={previewItems.payload}
            playing={mobilePreview ? mobilePreview : false}
            controls
            muted={mobilePreview ? mobilePreview : false}
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
