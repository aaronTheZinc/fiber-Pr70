import React, { useState } from "react";
import File from "../File/File";
import { BiUpload } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../../redux/store/store";
import { mobileShowPreview } from "../../../../../redux/actions/actions";
import clsx from "clsx";
import Players from "../Players/Players";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Styles from "./Mobile.module.scss";

const Mobile = () => {
  const { showPreview, mobilePreviewShow } = useSelector(
    (state: RootState) => state
  );
  const { previewItems } = showPreview;
  const { mobilePreview } = mobilePreviewShow;

  let len = previewItems.payload.length ? true : false;

  const dispatch = useAppDispatch();
  return (
    <div className={Styles.filesMobileVersion}>
      <div
        className={clsx(
          Styles.previewMobile,
          mobilePreview ? Styles.active : Styles.deactive
        )}
      >
        <div className={Styles.icons}>
          <div
            className={Styles.hideIcon}
            onClick={() => {
              dispatch(mobileShowPreview());
            }}
          >
            <IoIosCloseCircleOutline />
          </div>
          {len ? (
            <Players mobilePreview={mobilePreview} />
          ) : (
            <div className={Styles.mobilePrevText}>
              Don't Have any {previewItems.type}
            </div>
          )}
        </div>
      </div>

      <div className={Styles.uploadBtn}>
        <button>
          <span>Upload Your Files</span>
          <BiUpload className={Styles.icon} />
        </button>
      </div>
      <File />
    </div>
  );
};

export default Mobile;
