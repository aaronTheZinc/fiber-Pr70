import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import File from "../File/File";
import Players from "../Players/Players";
import UploadImages from "../UploadImages";
import Styles from "./Desktop.module.scss";

const Desktop = () => {
  const { previewItems } = useSelector((state: RootState) => state.showPreview);
  const len = previewItems.payload.length ? true : false;

  return (
    <div className={Styles.filesDesktopVersion}>
      <div className={Styles.grid}>
        <div className={Styles.grid__wrapper}>
          <UploadImages />
        </div>
        <div className={Styles.grid__wrapper}>
          <div className={clsx(Styles.preview)}>
            {len ? (
              <div>
                <Players />
              </div>
            ) : (
              <h3>Preview</h3>
            )}
          </div>
        </div>
      </div>
      <File />
    </div>
  );
};

export default Desktop;
