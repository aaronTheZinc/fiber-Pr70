import React, { useState } from "react";
import File from "./File";
import { BiUpload } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../redux/store/store";
import { mobileShowPreview } from "../../../../redux/actions/actions";
import clsx from "clsx";
import Players from "./Players";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Mobile = () => {
  const { showPreview, mobilePreviewShow } = useSelector(
    (state: RootState) => state
  );
  const { previewItems } = showPreview;
  const { mobilePreview } = mobilePreviewShow;

  let len = previewItems.payload.length ? true : false;

  const dispatch = useAppDispatch();
  return (
    <div className="bg-vreel_blue_dark py-3 block lg:hidden">
      <div
        className={clsx(
          "fixed w-screen h-screen z-50 bg-primary top-0 left-0 transition-all duration-500",
          mobilePreview ? "scale-100" : "scale-0"
        )}
      >
        <div className="w-full h-full">
          <div
            className="absolute top-5 right-5 text-white text-3xl z-50"
            onClick={() => {
              dispatch(mobileShowPreview());
            }}
          >
            <IoIosCloseCircleOutline className="text-4xl" />
          </div>
          {len ? (
            <Players mobilePreview={mobilePreview} />
          ) : (
            <div className="text-white h-full flex justify-center items-center">
              Don't Have any {previewItems.type}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button className="bg-secondary text-white font-bold px-5 sm:px-7 py-3 space-x-3 rounded-full flex justify-center items-center">
          <span className="sm:tracking-widest">Upload Your Files</span>
          <BiUpload className="text-2xl sm:text-3xl" />
        </button>
      </div>
      <File />
    </div>
  );
};

export default Mobile;
