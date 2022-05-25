import React from "react";
import FileInput from "./FileInput";
import { AudioData, ImagesData, VideoData } from "./FilesData";

const File = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 xl:gap-3">
      {[
        { type: "image", items: ImagesData },
        { type: "video", items: VideoData },
        { type: "audio", items: AudioData },
      ].map((obj, index) => (
        <div className="lg:bg-vreel_gray_dark/80 xl:rounded-md w-full">
          <div className="pt-5 pb-3">
            <p className="text-secondary advance capitalize">{obj.type}</p>
          </div>
          <div className="w-full lg:w-[94%] xl:h-[418px] lg:scroll lg:overflow-auto lg:ml-4 space-y-5 mb-4 pt-2 px-1 sm:px-3 lg:px-0">
            {obj.items.map((item, index) => (
              <FileInput key={index} item={item} type={obj.type} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default File;
