import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import File from "./File";
import Players from "./Players";
import UploadImages from "./UploadImages";

type Props = {};

const Desktop = (props: Props) => {
  const { previewItems } = useSelector((state: RootState) => state.showPreview);
  const len = previewItems.payload.length ? true : false;

  return (
    <div className="hidden lg:block">
      <div className="pb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="">
          <UploadImages />
        </div>
        <div className="w-full h-[550px] rounded-md flex justify-center items-center">
          {previewItems.payload.length ? (
            <div className="w-full h-full">
              <Players />
            </div>
          ) : (
            <h3 className="text-white">Preview</h3>
          )}
        </div>
      </div>
      <File />
    </div>
  );
};

export default Desktop;
