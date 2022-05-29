import React from "react";
import FileInput from "../FileInput/FileInput";
import { AudioData, ImagesData, VideoData } from "../FilesData";
import Styles from "./File.module.scss";

const File = () => {
  return (
    <div className={Styles.gridContainer}>
      {[
        { type: "image", items: ImagesData },
        { type: "video", items: VideoData },
        { type: "audio", items: AudioData },
      ].map((obj, index) => (
        <div className={Styles.gridItem}>
          <div className={Styles.type}>
            <p className={Styles.advance}>{obj.type}</p>
          </div>
          <div className={Styles.inputContainers}>
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
